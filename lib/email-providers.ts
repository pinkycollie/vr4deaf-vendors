// Email provider configurations for vr4deaf.org

export const EMAIL_PROVIDERS = {
  // Recommended: Resend (Developer-friendly, great deliverability)
  RESEND: {
    name: "Resend",
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: "noreply@vr4deaf.org",
    supportEmail: "support@vr4deaf.org",
    adminEmail: "admin@vr4deaf.org",
    baseUrl: "https://api.resend.com",
    features: ["transactional", "marketing", "webhooks", "analytics"],
    pricing: "Free tier: 3,000 emails/month, then $20/month",
  },

  // Alternative: SendGrid (Enterprise-grade)
  SENDGRID: {
    name: "SendGrid",
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: "noreply@vr4deaf.org",
    supportEmail: "support@vr4deaf.org",
    adminEmail: "admin@vr4deaf.org",
    baseUrl: "https://api.sendgrid.com/v3",
    features: ["transactional", "marketing", "templates", "analytics", "a/b-testing"],
    pricing: "Free tier: 100 emails/day, then $19.95/month",
  },

  // Alternative: Mailgun (Reliable delivery)
  MAILGUN: {
    name: "Mailgun",
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN || "mg.vr4deaf.org",
    fromEmail: "noreply@vr4deaf.org",
    supportEmail: "support@vr4deaf.org",
    adminEmail: "admin@vr4deaf.org",
    baseUrl: "https://api.mailgun.net/v3",
    features: ["transactional", "tracking", "webhooks", "validation"],
    pricing: "Free tier: 5,000 emails/month, then $35/month",
  },

  // Budget option: Amazon SES
  AWS_SES: {
    name: "Amazon SES",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || "us-east-1",
    fromEmail: "noreply@vr4deaf.org",
    supportEmail: "support@vr4deaf.org",
    adminEmail: "admin@vr4deaf.org",
    features: ["transactional", "bulk", "tracking"],
    pricing: "$0.10 per 1,000 emails",
  },
}

export const EMAIL_TEMPLATES = {
  WELCOME: "welcome",
  ASSESSMENT_COMPLETE: "assessment-complete",
  ASSESSMENT_REMINDER: "assessment-reminder",
  SERVICE_MATCH: "service-match",
  PROVIDER_NOTIFICATION: "provider-notification",
  SUBSCRIPTION_CONFIRMATION: "subscription-confirmation",
  PASSWORD_RESET: "password-reset",
}
