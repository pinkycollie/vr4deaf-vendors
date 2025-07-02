import type { UserProfile, VRMatch, AccountProvisioningResult } from "./types"

export class NotificationService {
  async notifyVROffice(match: VRMatch, profile: UserProfile): Promise<void> {
    const emailContent = `
    New VR4DEAF Client Referral - High Priority Match
    
    Office: ${match.officeName}
    Match Score: ${match.matchScore}/100
    
    Client Information:
    - Name: ${profile.firstName} ${profile.lastName}
    - Email: ${profile.email}
    - Phone: ${profile.phone}
    - Location: ${profile.zipCode}, ${profile.stateCode}
    - Hearing Status: ${profile.hearingStatus}
    - Service Interest: ${profile.serviceInterest}
    - VR Experience: ${profile.vrClient ? "Previous VR client" : "New to VR"}
    - ASL Preferred: ${profile.aslPreferred ? "Yes" : "No"}
    - Ticket to Work: ${profile.ticketToWork ? "Yes" : "No"}
    
    Match Reasons:
    ${match.reasonsForMatch.map((reason) => `- ${reason}`).join("\n")}
    
    Client Goals: ${profile.goals || "Not specified"}
    
    Next Steps:
    1. Contact client within 48 hours
    2. Schedule initial assessment
    3. Update VR4DEAF system with status
    
    VR4DEAF Account: Created (services locked pending VR approval)
    
    Contact VR4DEAF Support: support@vr4deaf.org
    `

    // In production, this would use a real email service
    console.log(`Email sent to ${match.contactInfo.email}:`, emailContent)

    // Also send SMS notification for urgent cases
    if (match.matchScore > 90) {
      await this.sendSMSNotification(
        match.contactInfo.phone,
        `High-priority VR4DEAF referral: ${profile.firstName} ${profile.lastName}. Please check email for details.`,
      )
    }
  }

  async sendWelcomeEmail(
    profile: UserProfile,
    account: AccountProvisioningResult,
    vrMatches: VRMatch[],
  ): Promise<void> {
    const emailContent = `
    Welcome to VR4DEAF, ${profile.firstName}!
    
    Your AI-powered journey to employment success has begun.
    
    Account Details:
    - Username: ${account.username}
    - Temporary Password: ${account.temporaryPassword}
    - Access Level: ${account.accessLevel}
    - Login: https://vr4deaf.org/login
    
    What Happens Next:
    ${
      vrMatches.length > 0
        ? `
    ✅ We've matched you with ${vrMatches.length} VR office(s) in your area
    ✅ Your top match: ${vrMatches[0]?.officeName} (${vrMatches[0]?.matchScore}/100 compatibility)
    ✅ They will contact you within 48 hours
    ✅ Your account services will unlock once VR approves funding
    `
        : `
    ⚠️  VR4DEAF is not yet available in ${profile.stateCode}
    ✅ We've created a basic account for you
    ✅ You'll be notified when we launch in your state
    ✅ Meanwhile, explore our alternative services
    `
    }
    
    Your VR Matches:
    ${vrMatches
      .map(
        (match, index) => `
    ${index + 1}. ${match.officeName}
       📍 ${match.contactInfo.address}
       📞 ${match.contactInfo.phone}
       ✉️ ${match.contactInfo.email}
       🎯 Match Score: ${match.matchScore}/100
       ⏱️ Est. Wait Time: ${match.estimatedWaitTime}
    `,
      )
      .join("\n")}
    
    Available Services (${account.accessLevel} access):
    ${account.servicesEnabled.map((service) => `- ${service.replace("-", " ")}`).join("\n")}
    
    Need Help?
    - ASL Support: Available 24/7 via our accessibility widget
    - Email: support@vr4deaf.org
    - Phone: (817) 886-2798
    
    Welcome to your future!
    The VR4DEAF Team
    `

    console.log(`Welcome email sent to ${profile.email}:`, emailContent)
  }

  async sendFallbackNotification(profile: UserProfile, fallbackService: string): Promise<void> {
    const emailContent = `
    Alternative Pathway Available - ${fallbackService}
    
    Hi ${profile.firstName},
    
    While VR funding wasn't approved for your current request, we have great news!
    
    We've automatically enrolled you in ${fallbackService}, which offers:
    
    ${
      fallbackService === "360 Job Magician"
        ? `
    - AI-powered job search and matching
    - Resume optimization and interview prep
    - Direct employer connections
    - Skills training recommendations
    - Career coaching support
    `
        : fallbackService === "360 Business Magician"
          ? `
    - Automated business formation (LLC, EIN, licensing)
    - AI-powered business planning
    - Funding and grant assistance
    - Business coaching and mentorship
    - Compliance and tax support
    `
          : `
    - Advanced AI automation tools
    - Custom business solutions
    - Industry-specific plugins
    - Enterprise-grade features
    - Priority support
    `
    }
    
    Your ${fallbackService} account is ready:
    - Login: https://${fallbackService.toLowerCase().replace(" ", "")}.com/login
    - Use the same credentials as your VR4DEAF account
    
    This is not the end of your VR journey - you can reapply for VR services at any time!
    
    Questions? We're here to help.
    The VR4DEAF Team
    `

    console.log(`Fallback notification sent to ${profile.email}:`, emailContent)
  }

  private async sendSMSNotification(phone: string, message: string): Promise<void> {
    // In production, integrate with Twilio or similar
    console.log(`SMS sent to ${phone}: ${message}`)
  }
}
