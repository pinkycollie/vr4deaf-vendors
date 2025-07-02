import { type NextRequest, NextResponse } from "next/server"

// Mock AI responses based on message content
function generateVuriResponse(message: string, context?: any): any {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("vr") || lowerMessage.includes("funding") || lowerMessage.includes("vocational")) {
    return {
      message:
        "I can help you with VR funding information. VR services can cover job training, assistive technology, and employment support for deaf individuals. What specific area would you like to know about?",
      actions: [
        { type: "quick_reply", text: "What VR covers", action: "vr-covers" },
        { type: "quick_reply", text: "How to apply", action: "vr-apply" },
        { type: "quick_reply", text: "Find VR office", action: "vr-office" },
      ],
      context: { topic: "vr-funding", userIntent: "information-seeking" },
    }
  }

  if (lowerMessage.includes("job") || lowerMessage.includes("employment") || lowerMessage.includes("work")) {
    return {
      message:
        "I can help you with employment services! VR4DEAF offers AI-powered job search, resume building, and interview preparation specifically designed for deaf individuals. Are you looking for employment assistance or self-employment support?",
      actions: [
        { type: "quick_reply", text: "Job search help", action: "job-search" },
        { type: "quick_reply", text: "Resume building", action: "resume-help" },
        { type: "quick_reply", text: "Self-employment", action: "self-employment" },
      ],
      context: { topic: "employment", userIntent: "service-inquiry" },
    }
  }

  if (lowerMessage.includes("office") || lowerMessage.includes("location") || lowerMessage.includes("find")) {
    return {
      message:
        "I can help you find the nearest VR office! Please provide your ZIP code and I'll locate VR offices in your area with their contact information and services.",
      actions: [
        { type: "redirect", text: "Open Office Locator", url: "/api/vr-offices" },
        { type: "quick_reply", text: "Texas offices", action: "texas-offices" },
      ],
      context: { topic: "office-location", userIntent: "location-search" },
    }
  }

  if (lowerMessage.includes("mbtq") || lowerMessage.includes("universe")) {
    return {
      message:
        "MBTQ Universe provides additional AI-powered business solutions that complement VR4DEAF services. They offer advanced automation tools, business intelligence, and specialized plugins for various industries. Would you like to explore their services?",
      actions: [
        { type: "redirect", text: "Visit MBTQ Universe", url: "https://mbtquniverse.com" },
        { type: "quick_reply", text: "Learn about plugins", action: "mbtq-plugins" },
      ],
      context: { topic: "mbtq-universe", userIntent: "external-service" },
    }
  }

  // Default response
  return {
    message:
      "Hello! I'm Vuri, your AI assistant for VR4DEAF. I can help you with VR funding information, finding VR offices, employment services, and connecting you with MBTQ Universe for additional solutions. What would you like to know about?",
    actions: [
      { type: "quick_reply", text: "VR funding info", action: "vr-funding" },
      { type: "quick_reply", text: "Find VR office", action: "office-locator" },
      { type: "quick_reply", text: "Employment services", action: "employment" },
      { type: "quick_reply", text: "Business services", action: "business" },
    ],
    context: { topic: "general", userIntent: "greeting" },
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context, sessionId, userProfile } = body

    if (!message) {
      return NextResponse.json({ error: { code: "MISSING_MESSAGE", message: "Message is required" } }, { status: 400 })
    }

    // Generate or use existing session ID
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Generate AI response
    const response = generateVuriResponse(message, context)

    // Add session ID to response
    response.sessionId = currentSessionId
    response.timestamp = new Date().toISOString()

    // In production, save conversation to database
    console.log("Vuri conversation:", {
      sessionId: currentSessionId,
      userMessage: message,
      aiResponse: response.message,
      context: response.context,
      timestamp: response.timestamp,
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Vuri Chat API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
