import { type NextRequest, NextResponse } from "next/server"
import { WebhookLogger } from "../../../../lib/webhook-logger"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      toolId: searchParams.get("toolId") || undefined,
      status: searchParams.get("status") ? Number.parseInt(searchParams.get("status")!) : undefined,
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 50,
      offset: searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0,
      startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined,
      endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined,
    }

    const result = await WebhookLogger.getLogs(filters)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching webhook logs:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
