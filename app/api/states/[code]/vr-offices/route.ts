import { type NextRequest, NextResponse } from "next/server"
import { getVROfficesByState, searchVROffices } from "@/lib/states/vr-offices"

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code } = params
    const { searchParams } = new URL(request.url)
    const zipCode = searchParams.get("zipCode")
    const radius = Number.parseInt(searchParams.get("radius") || "25")

    let offices = getVROfficesByState(code)

    // If zipCode is provided, search within radius
    if (zipCode) {
      offices = searchVROffices(code, zipCode, radius)
    }

    return NextResponse.json({
      offices,
      total: offices.length,
      stateCode: code.toUpperCase(),
      searchParams: {
        zipCode,
        radius: zipCode ? radius : null,
      },
    })
  } catch (error) {
    console.error("State VR Offices API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
