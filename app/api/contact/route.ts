import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message, vrClient, ticketToWork } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        {
          error: {
            code: "MISSING_FIELDS",
            message: "Required fields are missing",
            details: {
              missing_fields: [!name && "name", !email && "email", !service && "service", !message && "message"].filter(
                Boolean,
              ),
            },
          },
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: { code: "INVALID_EMAIL", message: "Invalid email format" } }, { status: 400 })
    }

    // Validate service type
    const validServices = ["job-seeker", "self-employment", "small-business"]
    if (!validServices.includes(service)) {
      return NextResponse.json({ error: { code: "INVALID_SERVICE", message: "Invalid service type" } }, { status: 400 })
    }

    // Generate unique contact ID
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // In production, save to database and send email notifications
    console.log("New contact submission:", {
      id: contactId,
      name,
      email,
      phone,
      service,
      message,
      vrClient,
      ticketToWork,
      timestamp: new Date().toISOString(),
    })

    // Calculate estimated response time based on service type and VR status
    const baseHours = vrClient ? 12 : 24 // VR clients get priority
    const estimatedResponse = new Date(Date.now() + baseHours * 60 * 60 * 1000)

    return NextResponse.json({
      id: contactId,
      status: "submitted",
      message: `Thank you for your inquiry, ${name}. We'll contact you within ${baseHours} hours.`,
      estimatedResponse: estimatedResponse.toISOString(),
      priority: vrClient ? "high" : "normal",
    })
  } catch (error) {
    console.error("Contact API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
