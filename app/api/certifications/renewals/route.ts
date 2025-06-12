import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const vendorId = searchParams.get("vendorId")
  const daysAhead = Number.parseInt(searchParams.get("daysAhead") || "365")

  // Mock renewal data
  const renewals = [
    {
      id: "RENEWAL-001",
      certificationId: "CERT-003",
      certificationName: "Certified Vocational Evaluation Specialist (CVE)",
      vendorId: "VENDOR-001",
      currentExpiryDate: "2025-06-20",
      daysUntilExpiry: 45,
      status: "action_required",
      renewalPeriod: "2 years",
      ceuRequired: 40,
      ceuCompleted: 38,
      ceuRemaining: 2,
      renewalFee: 250,
      renewalDeadline: "2025-05-20",
      remindersSent: 2,
      lastReminderDate: "2024-01-15",
      nextReminderDate: "2024-02-15",
      renewalSteps: [
        {
          step: 1,
          title: "Complete remaining CEUs",
          description: "Complete 2 remaining CEU hours",
          status: "pending",
          dueDate: "2025-05-01",
        },
        {
          step: 2,
          title: "Submit renewal application",
          description: "Submit online renewal application with documentation",
          status: "not_started",
          dueDate: "2025-05-15",
        },
        {
          step: 3,
          title: "Pay renewal fee",
          description: "Pay $250 renewal fee",
          status: "not_started",
          dueDate: "2025-05-20",
        },
      ],
    },
    {
      id: "RENEWAL-002",
      certificationId: "CERT-001",
      certificationName: "ASL Interpreter Certification",
      vendorId: "VENDOR-001",
      currentExpiryDate: "2026-01-15",
      daysUntilExpiry: 365,
      status: "planning",
      renewalPeriod: "4 years",
      ceuRequired: 80,
      ceuCompleted: 65,
      ceuRemaining: 15,
      renewalFee: 400,
      renewalDeadline: "2025-12-15",
      remindersSent: 0,
      lastReminderDate: null,
      nextReminderDate: "2024-07-15",
      renewalSteps: [
        {
          step: 1,
          title: "Complete remaining CEUs",
          description: "Complete 15 remaining CEU hours",
          status: "in_progress",
          dueDate: "2025-10-01",
        },
        {
          step: 2,
          title: "Submit renewal application",
          description: "Submit online renewal application with documentation",
          status: "not_started",
          dueDate: "2025-11-15",
        },
        {
          step: 3,
          title: "Pay renewal fee",
          description: "Pay $400 renewal fee",
          status: "not_started",
          dueDate: "2025-12-15",
        },
      ],
    },
  ]

  let filteredRenewals = renewals

  if (vendorId) {
    filteredRenewals = filteredRenewals.filter((renewal) => renewal.vendorId === vendorId)
  }

  // Filter by days ahead
  filteredRenewals = filteredRenewals.filter((renewal) => renewal.daysUntilExpiry <= daysAhead)

  return NextResponse.json({
    success: true,
    data: filteredRenewals,
    total: filteredRenewals.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { certificationId, action } = body

    if (action === "start_renewal") {
      // Mock starting renewal process
      return NextResponse.json({
        success: true,
        message: "Renewal process started",
        data: {
          renewalId: `RENEWAL-${Date.now()}`,
          status: "in_progress",
          startedAt: new Date().toISOString(),
        },
      })
    }

    if (action === "schedule_reminder") {
      // Mock scheduling reminder
      return NextResponse.json({
        success: true,
        message: "Reminder scheduled",
        data: {
          reminderDate: body.reminderDate,
          scheduledAt: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action",
      },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process renewal request",
      },
      { status: 500 },
    )
  }
}
