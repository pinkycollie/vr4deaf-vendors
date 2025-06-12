export const WEBHOOK_ENDPOINTS = {
  // Assessment webhooks
  ASSESSMENT_COMPLETE: "https://vr4deaf.mbtquniverse.com/api/webhooks/assessment-complete",
  ASSESSMENT_STARTED: "https://vr4deaf.mbtquniverse.com/api/webhooks/assessment-started",

  // Subscription webhooks
  SUBSCRIPTION_CREATED: "https://vr4deaf.mbtquniverse.com/api/webhooks/subscription",
  SUBSCRIPTION_UPDATED: "https://vr4deaf.mbtquniverse.com/api/webhooks/subscription",
  SUBSCRIPTION_CANCELLED: "https://vr4deaf.mbtquniverse.com/api/webhooks/subscription",

  // Service provider webhooks
  PROVIDER_REGISTERED: "https://vr4deaf.mbtquniverse.com/api/webhooks/provider-registered",
  SERVICE_REQUESTED: "https://vr4deaf.mbtquniverse.com/api/webhooks/service-requested",

  // User journey webhooks
  USER_ONBOARDED: "https://vr4deaf.mbtquniverse.com/api/webhooks/user-onboarded",
  GOAL_ACHIEVED: "https://vr4deaf.mbtquniverse.com/api/webhooks/goal-achieved",
}

export const SUBSCRIPTION_ROUTES = {
  BASIC: "/#/assessment?plan=basic",
  PREMIUM: "/#/assessment?plan=premium",
  ENTERPRISE: "/#/assessment?plan=enterprise",
  PROVIDER: "/#/provider-dashboard?plan=provider",
}

export function generateAssessmentLink(userId: string, planId: string, subscriptionId?: string): string {
  const baseUrl = "https://vr4deaf.mbtquniverse.com"
  const params = new URLSearchParams({
    user: userId,
    plan: planId,
    ...(subscriptionId && { subscription: subscriptionId }),
    timestamp: Date.now().toString(),
  })

  return `${baseUrl}/#/assessment?${params.toString()}`
}

export function generateProviderDashboardLink(providerId: string, planId: string): string {
  const baseUrl = "https://vr4deaf.mbtquniverse.com"
  const params = new URLSearchParams({
    provider: providerId,
    plan: planId,
    timestamp: Date.now().toString(),
  })

  return `${baseUrl}/#/provider-dashboard?${params.toString()}`
}
