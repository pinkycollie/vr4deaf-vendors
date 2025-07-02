import { NextResponse } from "next/server"
import { google } from "googleapis"

// Initialize Google Calendar API
async function getGoogleCalendarClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  })

  const calendar = google.calendar({ version: "v3", auth })
  return calendar
}

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json()

    // Get Google Calendar client
    const calendar = await getGoogleCalendarClient()

    // Find available time slot (simplified - in a real app, you'd implement more sophisticated scheduling)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 3) // Schedule 3 days from now
    startDate.setHours(10, 0, 0, 0) // 10:00 AM

    const endDate = new Date(startDate)
    endDate.setHours(11, 0, 0, 0) // 11:00 AM

    // Create calendar event
    const event = {
      summary: `VR Consultation with ${name}`,
      description: `Initial consultation for VR services.\n\nContact Info:\nEmail: ${email}\nPhone: ${phone}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "America/Chicago", // Adjust for your timezone
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "America/Chicago", // Adjust for your timezone
      },
      attendees: [
        { email: email },
        { email: process.env.COUNSELOR_EMAIL }, // VR counselor's email
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
    }

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
      sendUpdates: "all", // Send email notifications to attendees
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error scheduling consultation:", error)
    return NextResponse.json({ success: false, message: "Failed to schedule consultation" }, { status: 500 })
  }
}
