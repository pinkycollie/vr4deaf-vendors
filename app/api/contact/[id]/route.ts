import { type NextRequest, NextResponse } from "next/server"

// Mock contact status data - in production, this would come from a database
const contactStatuses: { [key: string]: any } = {}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Mock status data
    const mockStatus = {
      id,
      status: "in-progress",
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      assignedTo: "Sarah Johnson",
      notes: "Initial assessment completed. Scheduling follow-up consultation.",
      nextSteps: ["Review VR eligibility", "Schedule consultation call", "Prepare service recommendations"],
    }

    return NextResponse.json(mockStatus)
  } catch (error) {
    console.error("Contact Status API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
