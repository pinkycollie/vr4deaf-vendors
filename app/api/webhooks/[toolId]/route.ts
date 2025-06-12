import { type NextRequest, NextResponse } from "next/server"
import { webhookConfigs } from "../../../../webhook-config"
import { verifyWebhookSignature, extractSignatureFromHeader, getSigningKey } from "../../../../lib/webhook-security"
import { WebhookLogger } from "../../../../lib/webhook-logger"
import { RateLimiter } from "../../../../lib/rate-limiter"
import { DeafAssessmentHandler } from "../../../../lib/webhooks/deaf-assessment-handler"

// Rate limiters
const webhookLimiter = RateLimiter.createWebhookLimiter()
const globalLimiter = RateLimiter.createGlobalLimiter()

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return "unknown"
}

// Webhook validation and processing
async function validateWebhookData(toolId: string, data: any) {
  const config = webhookConfigs.find((c) => c.id === toolId)
  if (!config) {
    throw new Error(`Unknown tool ID: ${toolId}`)
  }

  if (!config.isActive) {
    throw new Error(`Webhook for ${toolId} is currently disabled`)
  }

  // Validate required fields
  const missingFields = config.expectedFields.filter((field) => !(field in data))
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
  }

  return config
}

// Verify webhook signature from WrapifAI
async function verifySignature(request: NextRequest, toolId: string, body: string): Promise<boolean> {
  const signatureHeader = request.headers.get("x-wrapifai-signature") || request.headers.get("x-signature")

  if (!signatureHeader) {
    console.warn(`No signature header found for webhook ${toolId}`)
    return false
  }

  const signingKey = getSigningKey(toolId)
  if (!signingKey) {
    console.warn(`No signing key configured for webhook ${toolId}`)
    return false
  }

  const signature = extractSignatureFromHeader(signatureHeader)
  if (!signature) {
    console.warn(`Invalid signature format for webhook ${toolId}`)
    return false
  }

  return verifyWebhookSignature(body, signature, signingKey)
}

// Store webhook data
async function storeWebhookData(toolId: string, data: any, config: any) {
  console.log(`Storing webhook data for ${toolId}:`, data)
  return { success: true, id: `webhook_${Date.now()}` }
}

// Process specific tool data
async function processToolData(toolId: string, data: any) {
  switch (toolId) {
    case "deaf-individual-assessment":
      console.log("Processing deaf individual assessment:", data.clientId)
      const result = await DeafAssessmentHandler.processAssessmentData(data)
      console.log("Assessment processing result:", result)
      return result
    case "benefits-optimization":
      console.log("Processing benefits optimization:", data.clientId)
      break
    case "vr-counselor-matchmaker":
      console.log("Processing counselor matching:", data.clientId)
      break
    case "workplace-accommodation-planner":
      console.log("Processing accommodation planning:", data.employerId)
      break
    default:
      console.log(`Generic processing for ${toolId}`)
  }
}

export async function POST(request: NextRequest, { params }: { params: { toolId: string } }) {
  const startTime = Date.now()
  const { toolId } = params
  const ip = getClientIP(request)
  const userAgent = request.headers.get("user-agent") || "unknown"

  let responseStatus = 200
  let signatureVerified = false
  let error: string | undefined
  let body = ""
  let data: any

  try {
    // Rate limiting check
    const [globalLimit, toolLimit] = await Promise.all([
      globalLimiter.checkLimit(ip),
      webhookLimiter.checkLimit(ip, toolId),
    ])

    if (!globalLimit.allowed || !toolLimit.allowed) {
      responseStatus = 429
      error = "Rate limit exceeded"

      const response = NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded",
          retryAfter: Math.ceil((toolLimit.resetTime - Date.now()) / 1000),
        },
        { status: 429 },
      )

      // Add rate limit headers
      response.headers.set("X-RateLimit-Limit", webhookLimiter["config"].maxRequests.toString())
      response.headers.set("X-RateLimit-Remaining", toolLimit.remaining.toString())
      response.headers.set("X-RateLimit-Reset", toolLimit.resetTime.toString())

      return response
    }

    // Get raw body for signature verification
    body = await request.text()

    try {
      data = JSON.parse(body)
    } catch (parseError) {
      responseStatus = 400
      error = "Invalid JSON payload"
      throw new Error("Invalid JSON payload")
    }

    // Verify webhook signature from WrapifAI
    signatureVerified = await verifySignature(request, toolId, body)
    if (!signatureVerified) {
      responseStatus = 401
      error = "Invalid signature"
      throw new Error("Invalid signature")
    }

    // Validate webhook data
    const config = await validateWebhookData(toolId, data)

    // Store the webhook data
    const result = await storeWebhookData(toolId, data, config)

    // Process tool-specific logic
    await processToolData(toolId, data)

    console.log(`Webhook processed successfully for ${config.title}`)

    const response = NextResponse.json({
      success: true,
      message: `Webhook processed for ${config.title}`,
      webhookId: result.id,
      timestamp: new Date().toISOString(),
      signatureVerified: true,
    })

    return response
  } catch (catchError) {
    console.error("Webhook processing error:", catchError)

    if (!error) {
      error = catchError instanceof Error ? catchError.message : "Unknown error"
      responseStatus = responseStatus === 200 ? 400 : responseStatus
    }

    return NextResponse.json(
      {
        success: false,
        error,
        timestamp: new Date().toISOString(),
      },
      { status: responseStatus },
    )
  } finally {
    // Log the webhook request
    const responseTime = Date.now() - startTime

    await WebhookLogger.log({
      toolId,
      method: "POST",
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      payload: data || body,
      responseStatus,
      responseTime,
      signatureVerified,
      ipAddress: ip,
      userAgent,
      error,
      processed: responseStatus >= 200 && responseStatus < 300,
    })
  }
}

// GET endpoint to retrieve webhook configuration
export async function GET(request: NextRequest, { params }: { params: { toolId: string } }) {
  const startTime = Date.now()
  const { toolId } = params
  const ip = getClientIP(request)
  const userAgent = request.headers.get("user-agent") || "unknown"

  let responseStatus = 200
  let error: string | undefined

  try {
    const config = webhookConfigs.find((c) => c.id === toolId)

    if (!config) {
      responseStatus = 404
      error = `Tool ${toolId} not found`
      throw new Error(error)
    }

    return NextResponse.json({
      toolId: config.id,
      title: config.title,
      webhookUrl: config.webhookUrl,
      category: config.category,
      expectedFields: config.expectedFields,
      isActive: config.isActive,
      signingKeyConfigured: !!getSigningKey(toolId),
    })
  } catch (catchError) {
    if (!error) {
      error = "Failed to retrieve webhook configuration"
      responseStatus = 500
    }

    return NextResponse.json({ error }, { status: responseStatus })
  } finally {
    // Log the GET request
    const responseTime = Date.now() - startTime

    await WebhookLogger.log({
      toolId,
      method: "GET",
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      payload: null,
      responseStatus,
      responseTime,
      signatureVerified: false, // GET requests don't need signature verification
      ipAddress: ip,
      userAgent,
      error,
      processed: responseStatus >= 200 && responseStatus < 300,
    })
  }
}
