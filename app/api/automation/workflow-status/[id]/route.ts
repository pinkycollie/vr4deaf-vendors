import { type NextRequest, NextResponse } from "next/server"

// In production, this would query the actual workflow database
const mockWorkflows: Record<string, any> = {}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Mock workflow status for demo
    const workflow = {
      id,
      status: "in-progress",
      currentStep: 3,
      totalSteps: 7,
      steps: [
        { name: "AI Profile Analysis", status: "completed", duration: 1200 },
        { name: "VR Office Matching", status: "completed", duration: 2100 },
        { name: "Account Creation", status: "completed", duration: 800 },
        { name: "VR Office Notification", status: "in-progress", duration: null },
        { name: "User Welcome Email", status: "pending", duration: null },
        { name: "VR Response Monitoring", status: "pending", duration: null },
        { name: "Funding Decision Processing", status: "pending", duration: null },
      ],
      results: {
        aiAnalysis: {
          confidence: 0.92,
          vrEligibilityScore: 85,
          urgencyLevel: "medium",
        },
        vrMatches: [
          {
            officeName: "Fort Worth VR Office",
            matchScore: 94,
            distance: 5.2,
            estimatedWaitTime: "2-3 weeks",
          },
          {
            officeName: "Dallas VR Office",
            matchScore: 87,
            distance: 12.8,
            estimatedWaitTime: "3-4 weeks",
          },
        ],
        account: {
          username: "john.doe.1234567890",
          accessLevel: "locked",
          servicesEnabled: ["basic-info", "vr-application-help", "asl-support"],
        },
      },
      estimatedCompletion: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes from now
      lastUpdated: new Date(),
    }

    return NextResponse.json(workflow)
  } catch (error) {
    console.error("Workflow Status API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
