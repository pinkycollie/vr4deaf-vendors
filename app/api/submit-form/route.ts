import { NextResponse } from "next/server"
import { google } from "googleapis"

// Initialize Google Sheets API
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  const sheets = google.sheets({ version: "v4", auth })
  return sheets
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Get Google Sheets client
    const sheets = await getGoogleSheetsClient()

    // Format data for Google Sheets
    const values = [
      [
        new Date().toISOString(), // Timestamp
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.address,
        data.city,
        data.state,
        data.zipCode,
        data.dateOfBirth,
        data.disabilityType.join(", "),
        data.disabilityDescription,
        data.employmentStatus,
        data.employmentGoals,
        data.howDidYouHear || "Not specified",
        data.additionalComments || "None",
        "pending", // Initial status
      ],
    ]

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Referrals!A:Q", // Adjust based on your sheet structure
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    // Send email notification using Google Apps Script
    await fetch(process.env.GOOGLE_APPS_SCRIPT_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "sendNotification",
        data: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          disabilityType: data.disabilityType,
          employmentStatus: data.employmentStatus,
        },
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json({ success: false, message: "Failed to submit form" }, { status: 500 })
  }
}
