import { type NextRequest, NextResponse } from "next/server"
import { getStateConfig } from "@/lib/states/config"

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code } = params
    const stateConfig = getStateConfig(code)

    if (!stateConfig) {
      return NextResponse.json(
        { error: { code: "STATE_NOT_FOUND", message: "State configuration not found" } },
        { status: 404 },
      )
    }

    return NextResponse.json(stateConfig)
  } catch (error) {
    console.error("State Detail API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
