import { Resend } from "resend"

// Initialize Resend (recommended provider)
const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  template?: string
  templateData?: Record<string, any>
  from?: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

export class EmailService {
  private provider: "resend" | "sendgrid" | "mailgun" | "ses"

  constructor(provider: "resend" | "sendgrid" | "mailgun" | "ses" = "resend") {
    this.provider = provider
  }

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      switch (this.provider) {
        case "resend":
          return await this.sendWithResend(emailData)
        case "sendgrid":
          return await this.sendWithSendGrid(emailData)
        case "mailgun":
          return await this.sendWithMailgun(emailData)
        case "ses":
          return await this.sendWithSES(emailData)
        default:
          throw new Error(`Unsupported email provider: ${this.provider}`)
      }
    } catch (error) {
      console.error("Email sending failed:", error)
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  private async sendWithResend(emailData: EmailData) {
    const { data, error } = await resend.emails.send({
      from: emailData.from || "VR4Deaf <noreply@vr4deaf.org>",
      to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
      reply_to: emailData.replyTo,
      attachments: emailData.attachments,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, messageId: data?.id }
  }

  private async sendWithSendGrid(emailData: EmailData) {
    // SendGrid implementation
    const sgMail = require("@sendgrid/mail")
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: emailData.to,
      from: emailData.from || "noreply@vr4deaf.org",
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      replyTo: emailData.replyTo,
      attachments: emailData.attachments,
    }

    const response = await sgMail.send(msg)
    return { success: true, messageId: response[0].headers["x-message-id"] }
  }

  private async sendWithMailgun(emailData: EmailData) {
    // Mailgun implementation
    const formData = require("form-data")
    const Mailgun = require("mailgun.js")
    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    })

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: emailData.from || "VR4Deaf <noreply@vr4deaf.org>",
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      "h:Reply-To": emailData.replyTo,
    })

    return { success: true, messageId: response.id }
  }

  private async sendWithSES(emailData: EmailData) {
    // AWS SES implementation
    const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")

    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })

    const command = new SendEmailCommand({
      Source: emailData.from || "noreply@vr4deaf.org",
      Destination: {
        ToAddresses: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
      },
      Message: {
        Subject: { Data: emailData.subject },
        Body: {
          Text: emailData.text ? { Data: emailData.text } : undefined,
          Html: emailData.html ? { Data: emailData.html } : undefined,
        },
      },
      ReplyToAddresses: emailData.replyTo ? [emailData.replyTo] : undefined,
    })

    const response = await sesClient.send(command)
    return { success: true, messageId: response.MessageId }
  }

  // Template-based email sending
  async sendTemplateEmail(
    template: string,
    to: string | string[],
    templateData: Record<string, any>,
    options?: Partial<EmailData>,
  ) {
    const emailContent = await this.renderTemplate(template, templateData)

    return this.sendEmail({
      to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      ...options,
    })
  }

  private async renderTemplate(template: string, data: Record<string, any>) {
    // Template rendering logic
    const templates = {
      welcome: {
        subject: `Welcome to VR4Deaf, ${data.firstName}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6;">Welcome to VR4Deaf!</h1>
            <p>Dear ${data.firstName},</p>
            <p>Welcome to VR4Deaf - the premier vocational rehabilitation platform designed specifically for the deaf community.</p>
            <p>Your assessment link: <a href="${data.assessmentLink}" style="color: #3b82f6;">Start Your Assessment</a></p>
            <p>Best regards,<br>The VR4Deaf Team</p>
          </div>
        `,
        text: `Welcome to VR4Deaf, ${data.firstName}! Start your assessment: ${data.assessmentLink}`,
      },
      "assessment-complete": {
        subject: "Your VR Assessment Results Are Ready",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6;">Assessment Complete!</h1>
            <p>Dear ${data.firstName},</p>
            <p>Your vocational rehabilitation assessment is complete with a readiness score of ${data.readinessScore}%.</p>
            <p><a href="${data.resultsLink}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Your Results</a></p>
            <p>Next steps: ${data.recommendations}</p>
            <p>Best regards,<br>The VR4Deaf Team</p>
          </div>
        `,
        text: `Assessment complete! Score: ${data.readinessScore}%. View results: ${data.resultsLink}`,
      },
      "service-match": {
        subject: "VR Services Matched to Your Needs",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6;">Services Matched for You</h1>
            <p>Dear ${data.firstName},</p>
            <p>Based on your assessment, we've found ${data.serviceCount} VR services that match your needs:</p>
            <ul>
              ${data.services.map((service: any) => `<li><strong>${service.name}</strong> - ${service.description}</li>`).join("")}
            </ul>
            <p><a href="${data.servicesLink}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View All Services</a></p>
            <p>Best regards,<br>The VR4Deaf Team</p>
          </div>
        `,
        text: `Services matched! View ${data.serviceCount} services: ${data.servicesLink}`,
      },
    }

    return templates[template as keyof typeof templates] || { subject: "", html: "", text: "" }
  }
}

// Export singleton instance
export const emailService = new EmailService()
