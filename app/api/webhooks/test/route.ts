import { type NextRequest, NextResponse } from "next/server"
import { webhookConfigs } from "../../../../webhook-config"

export async function POST(request: NextRequest) {
  try {
    const { toolId, testPayload, useSignature } = await request.json()

    if (!toolId) {
      return NextResponse.json({ error: "toolId is required" }, { status: 400 })
    }

    const config = webhookConfigs.find((c) => c.id === toolId)
    if (!config) {
      return NextResponse.json({ error: `Tool ${toolId} not found` }, { status: 404 })
    }

    // Create test payload with expected fields if not provided
    const payload = testPayload || {
      ...config.expectedFields.reduce(
        (acc, field) => {
          acc[field] = `test_${field}_${Date.now()}`
          return acc
        },
        {} as Record<string, any>,
      ),
      testMode: true,
      timestamp: new Date().toISOString(),
    }

    // Make request to the webhook endpoint
    const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/webhooks/${toolId}`

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "VR4Deaf-Test-Client/1.0",
    }

    // Add test signature if requested
    if (useSignature) {
      headers["x-wrapifai-signature"] = "sha256=test_signature_for_testing"
    }

    const startTime = Date.now()

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    const responseTime = Date.now() - startTime
    const responseData = await response.json()

    return NextResponse.json({
      success: true,
      testResult: {
        status: response.status,
        statusText: response.statusText,
        responseTime,
        responseData,
        requestPayload: payload,
        requestHeaders: headers,
      },
    })
  } catch (error) {
    console.error("Webhook test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Test failed",
      },
      { status: 500 },
    )
  }
}
