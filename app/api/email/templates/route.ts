import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const templates = [
    {
      id: "welcome",
      name: "Welcome Email",
      description: "Sent when a user signs up",
      variables: ["firstName", "assessmentLink"],
    },
    {
      id: "assessment-complete",
      name: "Assessment Complete",
      description: "Sent when assessment is finished",
      variables: ["firstName", "readinessScore", "resultsLink", "recommendations"],
    },
    {
      id: "service-match",
      name: "Service Match",
      description: "Sent when services are matched to user",
      variables: ["firstName", "serviceCount", "services", "servicesLink"],
    },
    {
      id: "assessment-reminder",
      name: "Assessment Reminder",
      description: "Reminder to complete assessment",
      variables: ["firstName", "assessmentLink", "daysRemaining"],
    },
    {
      id: "provider-notification",
      name: "Provider Notification",
      description: "Notify providers of new referrals",
      variables: ["providerName", "clientName", "serviceType", "dashboardLink"],
    },
  ]

  return NextResponse.json({ templates })
}
