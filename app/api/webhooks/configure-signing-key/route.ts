import { type NextRequest, NextResponse } from "next/server"
import { setSigningKey } from "../../../../lib/webhook-security"
import { webhookConfigs } from "../../../../webhook-config"

export async function POST(request: NextRequest) {
  try {
    const { toolId, signingKey } = await request.json()

    if (!toolId || !signingKey) {
      return NextResponse.json({ error: "toolId and signingKey are required" }, { status: 400 })
    }

    // Verify tool exists
    const config = webhookConfigs.find((c) => c.id === toolId)
    if (!config) {
      return NextResponse.json({ error: `Tool ${toolId} not found` }, { status: 404 })
    }

    // Store the signing key securely
    setSigningKey(toolId, signingKey)

    // Update config to mark signing key as set
    config.signingKeySet = true

    console.log(`Signing key configured for ${config.title}`)

    return NextResponse.json({
      success: true,
      message: `Signing key configured for ${config.title}`,
      toolId,
    })
  } catch (error) {
    console.error("Error configuring signing key:", error)
    return NextResponse.json({ error: "Failed to configure signing key" }, { status: 500 })
  }
}
