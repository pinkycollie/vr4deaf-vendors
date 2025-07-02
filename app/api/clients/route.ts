import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth-utils"
import bcrypt from "bcrypt"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { userId, userType, organizationId } = authResult.user

    let clients
    if (userType === "vendor") {
      // Vendors see clients in their organization
      clients = await sql`
        SELECT 
          c.*,
          u.name as user_name,
          u.email as user_email,
          s.name as state_name,
          COUNT(m.id) as total_milestones,
          COUNT(CASE WHEN m.status = 'completed' THEN 1 END) as completed_milestones,
          SUM(CASE WHEN m.status = 'completed' THEN m.fee ELSE 0 END) as earned_revenue,
          SUM(m.fee) as total_potential_revenue
        FROM clients c
        JOIN users u ON c.user_id = u.id
        JOIN states s ON c.state_id = s.id
        LEFT JOIN milestones m ON c.id = m.client_id
        WHERE c.organization_id = ${organizationId}
        GROUP BY c.id, u.name, u.email, s.name
        ORDER BY c.created_at DESC
      `
    } else if (userType === "client") {
      // Clients see only their own data
      clients = await sql`
        SELECT 
          c.*,
          u.name as user_name,
          u.email as user_email,
          s.name as state_name,
          COUNT(m.id) as total_milestones,
          COUNT(CASE WHEN m.status = 'completed' THEN 1 END) as completed_milestones,
          SUM(CASE WHEN m.status = 'completed' THEN m.fee ELSE 0 END) as earned_revenue,
          SUM(m.fee) as total_potential_revenue
        FROM clients c
        JOIN users u ON c.user_id = u.id
        JOIN states s ON c.state_id = s.id
        LEFT JOIN milestones m ON c.id = m.client_id
        WHERE c.user_id = ${userId}
        GROUP BY c.id, u.name, u.email, s.name
      `
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json({ clients })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyToken(request)
    if (!authResult.success || authResult.user.userType !== "vendor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { organizationId } = authResult.user
    const clientData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "serviceType", "stateId", "disabilityType", "businessIdea"]
    for (const field of requiredFields) {
      if (!clientData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create user account for client
    const hashedPassword = await bcrypt.hash(clientData.temporaryPassword || "TempPass123!", 12)

    const users = await sql`
      INSERT INTO users (name, email, password_hash, user_type, organization_id, created_at, updated_at)
      VALUES (${clientData.name}, ${clientData.email}, ${hashedPassword}, 'client', ${organizationId}, NOW(), NOW())
      RETURNING id
    `

    const userId = users[0].id

    // Create client record
    const clients = await sql`
      INSERT INTO clients (
        user_id, organization_id, service_type, state_id, disability_type, 
        business_idea, accommodation_needs, support_level, vr_counselor, 
        cbtac_provider, target_audience, industry, created_at, updated_at
      )
      VALUES (
        ${userId}, ${organizationId}, ${clientData.serviceType}, ${clientData.stateId},
        ${clientData.disabilityType}, ${clientData.businessIdea}, ${clientData.accommodationNeeds},
        ${clientData.supportLevel}, ${clientData.vrCounselor}, ${clientData.cbtacProvider},
        ${clientData.targetAudience}, ${clientData.industry}, NOW(), NOW()
      )
      RETURNING id
    `

    const clientId = clients[0].id

    // Create initial milestones based on service type
    if (clientData.serviceType === "vr-vendor") {
      await createVRMilestones(clientId)
    } else {
      await createAIMilestones(clientId)
    }

    return NextResponse.json({
      success: true,
      clientId,
      message: "Client created successfully",
    })
  } catch (error) {
    console.error("Error creating client:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function createVRMilestones(clientId: number) {
  const vrMilestones = [
    { name: "SSESP", description: "Self-Employment Feasibility Study", fee: 153, order: 1 },
    { name: "Start-Up", description: "Business plan development and initial setup", fee: 765, order: 2 },
    { name: "Maintenance", description: "Ongoing business support and development", fee: 1530, order: 3 },
    { name: "Stability", description: "Business stabilization and growth planning", fee: 2295, order: 4 },
    { name: "Closure", description: "Successful transition to independent operation", fee: 3032, order: 5 },
  ]

  for (const milestone of vrMilestones) {
    await sql`
      INSERT INTO milestones (
        client_id, name, description, fee, status, milestone_order, 
        vr_approval_required, created_at, updated_at
      )
      VALUES (
        ${clientId}, ${milestone.name}, ${milestone.description}, ${milestone.fee},
        'not-started', ${milestone.order}, true, NOW(), NOW()
      )
    `
  }
}

async function createAIMilestones(clientId: number) {
  const aiMilestones = [
    { name: "Discovery", description: "AI-Powered Idea Validation & Planning", fee: 0, order: 1 },
    { name: "Planning", description: "AI-Assisted Business Planning", fee: 0, order: 2 },
    { name: "Launch", description: "Business Setup & Launch", fee: 0, order: 3 },
    { name: "Growth", description: "Scaling & Optimization", fee: 0, order: 4 },
  ]

  for (const milestone of aiMilestones) {
    await sql`
      INSERT INTO milestones (
        client_id, name, description, fee, status, milestone_order, 
        vr_approval_required, created_at, updated_at
      )
      VALUES (
        ${clientId}, ${milestone.name}, ${milestone.description}, ${milestone.fee},
        'not-started', ${milestone.order}, false, NOW(), NOW()
      )
    `
  }
}
