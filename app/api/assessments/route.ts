import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const assessmentData = await request.json()

    // Save assessment to database
    const assessment = {
      id: `assessment_${Date.now()}`,
      userId: session.user.id,
      data: assessmentData,
      createdAt: new Date().toISOString(),
      status: "completed",
    }

    // Here you would save to your database
    // await db.assessments.create(assessment)

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      message: "Assessment saved successfully",
    })
  } catch (error) {
    console.error("Assessment save error:", error)
    return NextResponse.json({ error: "Failed to save assessment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || session.user.id

    // Fetch assessments from database
    // const assessments = await db.assessments.findMany({ where: { userId } })

    const mockAssessments = [
      {
        id: "assessment_1",
        userId,
        createdAt: new Date().toISOString(),
        status: "completed",
        readinessScore: 85,
      },
    ]

    return NextResponse.json({ assessments: mockAssessments })
  } catch (error) {
    console.error("Assessment fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch assessments" }, { status: 500 })
  }
}
