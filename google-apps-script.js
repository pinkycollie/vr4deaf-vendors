// This code should be deployed as a Google Apps Script Web App

// Process incoming requests
function doPost(e) {
  try {
    // Parse the request data
    const data = JSON.parse(e.postData.contents)
    const action = data.action

    // Route to the appropriate function based on the action
    if (action === "sendNotification") {
      return sendNotification(data.data)
    } else if (action === "updateReferralStatus") {
      return updateReferralStatus(data.data)
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "Unknown action",
        }),
      ).setMimeType(ContentService.MimeType.JSON)
    }
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

// Send email notifications for new referrals
function sendNotification(data) {
  // Send notification to counselors
  const counselors = getCounselors()
  const counselorSubject = "New VR Interest Form Submission"
  const counselorBody = `
    A new client has submitted an interest form:
    
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Disability Types: ${data.disabilityType.join(", ")}
    Employment Status: ${data.employmentStatus}
    
    Please log in to the system to view the full details and take appropriate action.
  `

  for (const counselor of counselors) {
    MailApp.sendEmail({
      to: counselor.email,
      subject: counselorSubject,
      body: counselorBody,
    })
  }

  // Send confirmation to client
  const clientSubject = "Thank You for Your Interest in VR Services"
  const clientBody = `
    Thank you for your interest in Texas Workforce Solutions-Vocational Rehabilitation Services.
    
    We have received your interest form and a VR staff member will contact you within 3-5 business days to discuss your interest in VR services.
    
    If you have any questions, please call our toll-free number at 1-800-123-4567.
    
    Regards,
    Texas Workforce Solutions-VR Services Team
  `

  MailApp.sendEmail({
    to: data.email,
    subject: clientSubject,
    body: clientBody,
  })

  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
    }),
  ).setMimeType(ContentService.MimeType.JSON)
}

// Update referral status in Google Sheets
function updateReferralStatus(data) {
  const ss = SpreadsheetApp.openById("your-google-sheet-id")
  const sheet = ss.getSheetByName("Referrals")
  const dataRange = sheet.getDataRange()
  const values = dataRange.getValues()

  // Find the row with the matching email
  for (let i = 1; i < values.length; i++) {
    if (values[i][3] === data.email) {
      // Assuming email is in column D (index 3)
      // Update status in column Q (index 16)
      sheet.getRange(i + 1, 17).setValue(data.status)

      // If status is "scheduled", create calendar event
      if (data.status === "scheduled" && data.appointmentDate) {
        createCalendarEvent(data)
      }

      break
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
    }),
  ).setMimeType(ContentService.MimeType.JSON)
}

// Create a calendar event for a scheduled appointment
function createCalendarEvent(data) {
  const calendar = CalendarApp.getCalendarById("your-google-calendar-id")

  const startTime = new Date(data.appointmentDate)
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000) // 1 hour appointment

  const event = calendar.createEvent(`VR Consultation with ${data.name}`, startTime, endTime, {
    description: `Initial consultation for VR services.\n\nContact Info:\nEmail: ${data.email}\nPhone: ${data.phone}`,
    guests: data.email,
    sendInvites: true,
  })

  return event.getId()
}

// Get list of counselors from the Counselors sheet
function getCounselors() {
  const ss = SpreadsheetApp.openById("your-google-sheet-id")
  const sheet = ss.getSheetByName("Counselors")
  const dataRange = sheet.getDataRange()
  const values = dataRange.getValues()

  const counselors = []

  // Skip header row
  for (let i = 1; i < values.length; i++) {
    counselors.push({
      name: values[i][0],
      email: values[i][1],
    })
  }

  return counselors
}
