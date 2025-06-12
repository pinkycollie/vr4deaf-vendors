import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { template, to, templateData, ...emailOptions } = await request.json()

    let result
    if (template) {
      result = await emailService.sendTemplateEmail(template, to, templateData, emailOptions)
    } else {
      result = await emailService.sendEmail({ to, ...emailOptions })
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: "Email sent successfully",
      })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
