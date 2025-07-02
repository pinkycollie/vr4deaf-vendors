import { type NextRequest, NextResponse } from "next/server"
import { GoogleAuth } from "google-auth-library"
import { businessMagicianClient } from "@/lib/business-magician-client"
import { vrEligibilityService } from "@/lib/vr-eligibility-service"
import { liveBlocksClient } from "@/lib/liveblocks-client"
import { googleWorkspaceClient } from "@/lib/google-workspace-client"

interface RouteConfig {
  service: string
  endpoint: string
  method: string
  auth: boolean
  rateLimit?: number
}

const serviceRoutes: Record<string, RouteConfig> = {
  "idea-generator": {
    service: "generator-360magicians-com",
    endpoint: "/api/generate",
    method: "POST",
    auth: false,
    rateLimit: 10, // requests per minute
  },
  "vr-assessment": {
    service: "vr4deaf-assessment",
    endpoint: "/api/assess",
    method: "POST",
    auth: true,
    rateLimit: 5,
  },
  "opportunity-matcher": {
    service: "opportunity-engine",
    endpoint: "/api/match",
    method: "POST",
    auth: true,
    rateLimit: 20,
  },
  "workspace-integration": {
    service: "google-workspace-bridge",
    endpoint: "/api/sync",
    method: "POST",
    auth: true,
    rateLimit: 30,
  },
  "liveblocks-command": {
    service: "liveblocks-command-center",
    endpoint: "/api/command",
    method: "POST",
    auth: true,
    rateLimit: 50,
  },
}

export async function POST(request: NextRequest) {
  try {
    const { service, action, payload, context } = await request.json()

    // Route validation
    const routeConfig = serviceRoutes[service]
    if (!routeConfig) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    // Rate limiting check
    const rateLimitResult = await checkRateLimit(request, routeConfig.rateLimit)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded", retryAfter: rateLimitResult.retryAfter },
        { status: 429 },
      )
    }

    // Authentication check
    if (routeConfig.auth) {
      const authResult = await authenticateRequest(request)
      if (!authResult.success) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    // Handle specific business logic based on action
    switch (action) {
      case "call-for-action":
        return await handleCallForAction(payload, context)
      case "vr-eligibility-check":
        return await handleVREligibilityCheck(payload)
      case "opportunity-generation":
        return await handleOpportunityGeneration(payload)
      case "workspace-sync":
        return await handleWorkspaceSync(payload)
      case "liveblocks-update":
        return await handleLiveblocksUpdate(payload)
      default:
        return await routeToMicroservice(service, action, payload, context)
    }
  } catch (error) {
    console.error("Cloud Run Router Error:", error)
    return NextResponse.json({ error: "Internal server error", requestId: generateRequestId() }, { status: 500 })
  }
}

async function handleCallForAction(payload: any, context: any) {
  try {
    // Analyze context to determine if business-related
    const contextAnalysis = await businessMagicianClient.analyzeContext(context)

    if (contextAnalysis.isBusinessRelated) {
      // Step 1: Generate VR eligibility form
      const vrForm = await vrEligibilityService.generateEligibilityForm(payload)

      // Step 2: Create Liveblocks room for real-time collaboration
      const collaborationRoom = await liveBlocksClient.createRoom({
        id: `vr-assessment-${generateRequestId()}`,
        defaultAccesses: ["room:write"],
        metadata: {
          type: "vr-assessment",
          userId: payload.userId,
          businessContext: contextAnalysis.summary,
        },
      })

      // Step 3: Notify Google Workspace for business specialist assignment
      await googleWorkspaceClient.createTask({
        title: `VR Assessment Required - ${payload.businessIdea}`,
        description: `New VR eligibility assessment for business idea: ${payload.businessIdea}`,
        assignee: await getAvailableBusinessSpecialist(),
        priority: "high",
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        metadata: {
          roomId: collaborationRoom.id,
          clientId: payload.userId,
          assessmentType: "initial",
        },
      })

      return NextResponse.json({
        success: true,
        vrForm,
        collaborationRoom: collaborationRoom.id,
        nextSteps: [
          "Complete VR eligibility assessment",
          "Business specialist will be assigned within 24 hours",
          "Real-time collaboration available in command center",
        ],
        estimatedProcessingTime: "2-5 business days",
      })
    } else {
      // Non-business context - route to general opportunity engine
      const opportunities = await generateGeneralOpportunities(payload, context)
      return NextResponse.json({
        success: true,
        opportunities,
        type: "general",
      })
    }
  } catch (error) {
    console.error("Call for Action Error:", error)
    return NextResponse.json({ error: "Failed to process call for action" }, { status: 500 })
  }
}

async function handleVREligibilityCheck(payload: any) {
  try {
    const assessment = await vrEligibilityService.assessEligibility(payload)

    // Generate personalized opportunities based on assessment
    const opportunities = await businessMagicianClient.generateOpportunities({
      eligibilityScore: assessment.score,
      disabilityType: payload.disabilityType,
      location: payload.location,
      interests: payload.interests,
      skills: payload.skills,
    })

    // Create follow-up tasks in Google Workspace
    if (assessment.eligible) {
      await googleWorkspaceClient.createWorkflow({
        name: `VR Services Workflow - ${payload.name}`,
        steps: [
          { name: "Initial Consultation", duration: "1 week" },
          { name: "Business Plan Development", duration: "2-4 weeks" },
          { name: "Funding Application", duration: "1-2 weeks" },
          { name: "Implementation Support", duration: "ongoing" },
        ],
        assignedSpecialist: await getVRSpecialist(payload.location),
      })
    }

    return NextResponse.json({
      assessment,
      opportunities,
      nextSteps: assessment.eligible
        ? ["Schedule VR counselor meeting", "Begin business plan development", "Explore funding options"]
        : ["Explore alternative support programs", "Skill development opportunities", "Community resources"],
    })
  } catch (error) {
    console.error("VR Eligibility Check Error:", error)
    return NextResponse.json({ error: "Assessment failed" }, { status: 500 })
  }
}

async function handleOpportunityGeneration(payload: any) {
  try {
    const opportunities = await Promise.all([
      businessMagicianClient.generateJobOpportunities(payload),
      businessMagicianClient.generateSelfEmploymentOpportunities(payload),
      businessMagicianClient.generateBusinessOpportunities(payload),
      businessMagicianClient.generateContractOpportunities(payload),
    ])

    // Rank and filter opportunities
    const rankedOpportunities = await rankOpportunities(opportunities.flat(), payload)

    // Update Liveblocks with real-time opportunities
    await liveBlocksClient.updateRoom(payload.roomId, {
      opportunities: rankedOpportunities,
      lastUpdated: new Date().toISOString(),
    })

    return NextResponse.json({
      opportunities: rankedOpportunities,
      categories: {
        jobs: opportunities[0],
        selfEmployment: opportunities[1],
        business: opportunities[2],
        contracts: opportunities[3],
      },
      totalCount: rankedOpportunities.length,
    })
  } catch (error) {
    console.error("Opportunity Generation Error:", error)
    return NextResponse.json({ error: "Failed to generate opportunities" }, { status: 500 })
  }
}

async function handleWorkspaceSync(payload: any) {
  try {
    // Sync client data with Google Workspace
    const syncResult = await googleWorkspaceClient.syncClientData({
      clientId: payload.clientId,
      data: payload.data,
      syncType: payload.syncType || "full",
    })

    // Update shared documents and calendars
    if (payload.includeDocuments) {
      await googleWorkspaceClient.updateSharedDocuments(payload.clientId, payload.documents)
    }

    if (payload.includeCalendar) {
      await googleWorkspaceClient.syncCalendarEvents(payload.clientId, payload.events)
    }

    return NextResponse.json({
      success: true,
      syncResult,
      documentsUpdated: payload.includeDocuments ? payload.documents.length : 0,
      eventsUpdated: payload.includeCalendar ? payload.events.length : 0,
    })
  } catch (error) {
    console.error("Workspace Sync Error:", error)
    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}

async function handleLiveblocksUpdate(payload: any) {
  try {
    const updateResult = await liveBlocksClient.updateRoom(payload.roomId, payload.data)

    // Broadcast to connected users
    await liveBlocksClient.broadcastEvent(payload.roomId, {
      type: payload.eventType || "data-update",
      data: payload.data,
      timestamp: new Date().toISOString(),
      userId: payload.userId,
    })

    return NextResponse.json({
      success: true,
      updateResult,
      connectedUsers: await liveBlocksClient.getConnectedUsers(payload.roomId),
    })
  } catch (error) {
    console.error("Liveblocks Update Error:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}

async function routeToMicroservice(service: string, action: string, payload: any, context: any) {
  const routeConfig = serviceRoutes[service]
  const serviceUrl = `https://${routeConfig.service}-${process.env.GOOGLE_CLOUD_PROJECT}.a.run.app`

  const response = await fetch(`${serviceUrl}${routeConfig.endpoint}`, {
    method: routeConfig.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getServiceToken()}`,
      "X-Request-ID": generateRequestId(),
    },
    body: JSON.stringify({ action, payload, context }),
  })

  if (!response.ok) {
    throw new Error(`Microservice error: ${response.status} ${response.statusText}`)
  }

  return NextResponse.json(await response.json())
}

async function checkRateLimit(
  request: NextRequest,
  limit?: number,
): Promise<{ allowed: boolean; retryAfter?: number }> {
  // Implementation would use Redis or similar for distributed rate limiting
  return { allowed: true }
}

async function authenticateRequest(request: NextRequest): Promise<{ success: boolean; user?: any }> {
  // Implementation would verify JWT tokens or service-to-service auth
  return { success: true }
}

async function getAvailableBusinessSpecialist(): Promise<string> {
  // Query Google Workspace for available specialists
  return "specialist@vr4deaf.org"
}

async function getVRSpecialist(location: string): Promise<string> {
  // Find VR specialist based on location
  return `vr-specialist-${location}@vr4deaf.org`
}

async function getServiceToken(): Promise<string> {
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  })
  const client = await auth.getClient()
  const token = await client.getAccessToken()
  return token.token || ""
}

async function rankOpportunities(opportunities: any[], userProfile: any): Promise<any[]> {
  // AI-powered ranking based on user profile, skills, and preferences
  return opportunities.sort((a, b) => b.matchScore - a.matchScore)
}

async function generateGeneralOpportunities(payload: any, context: any): Promise<any[]> {
  // Generate non-business opportunities
  return []
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
