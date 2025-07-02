import { type NextRequest, NextResponse } from "next/server"
import { WorkflowEngine } from "@/lib/automation/workflow-engine"
import type { UserProfile } from "@/lib/automation/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "zipCode", "service", "hearingStatus"]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: {
            code: "MISSING_FIELDS",
            message: "Required fields are missing",
            details: { missing_fields: missingFields },
          },
        },
        { status: 400 },
      )
    }

    // Create user profile
    const profile: UserProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      zipCode: body.zipCode,
      stateCode: body.stateCode || "TX", // Default to TX for now
      hearingStatus: body.hearingStatus,
      serviceInterest: body.service,
      goals: body.goals,
      vrClient: body.vrClient || false,
      ticketToWork: body.ticketToWork || false,
      aslPreferred: body.aslPreferred || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Start automated workflow
    const workflowEngine = new WorkflowEngine()
    const workflow = await workflowEngine.startUserJourney(profile)

    return NextResponse.json({
      success: true,
      workflowId: workflow.id,
      userId: profile.id,
      status: workflow.status,
      message: "Automated journey started successfully",
      nextSteps: [
        "AI analysis in progress",
        "VR office matching initiated",
        "Account creation queued",
        "You'll receive updates via email and SMS",
      ],
      estimatedCompletion: "2-5 minutes for initial setup",
    })
  } catch (error) {
    console.error("Start Journey API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
