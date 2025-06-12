import { type NextRequest, NextResponse } from "next/server"
import { WebhookLogger } from "../../../../lib/webhook-logger"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const toolId = searchParams.get("toolId") || undefined

    const stats = await WebhookLogger.getStats(toolId)

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching webhook stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
