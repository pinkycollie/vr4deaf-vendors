import { type NextRequest, NextResponse } from "next/server"
import { STATES_CONFIG, getStatesByStatus } from "@/lib/states/config"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const active = searchParams.get("active")

    let states = Object.values(STATES_CONFIG)

    // Filter by status if provided
    if (status) {
      states = getStatesByStatus(status as any)
    }

    // Filter by active status if provided
    if (active !== null) {
      const isActive = active === "true"
      states = states.filter((state) => state.isActive === isActive)
    }

    return NextResponse.json({
      states,
      total: states.length,
      filters: {
        status,
        active: active !== null ? active === "true" : null,
      },
    })
  } catch (error) {
    console.error("States API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
