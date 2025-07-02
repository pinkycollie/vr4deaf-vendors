import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get("state")
    const serviceType = searchParams.get("serviceType")
    const disabilityType = searchParams.get("disabilityType")

    if (!state || !serviceType) {
      return NextResponse.json(
        {
          error: {
            code: "MISSING_PARAMETERS",
            message: "State and serviceType parameters are required",
          },
        },
        { status: 400 },
      )
    }

    // Mock eligibility assessment
    const isTexas = state.toLowerCase() === "tx"
    const validServiceTypes = ["job-seeker", "self-employment", "small-business"]

    if (!validServiceTypes.includes(serviceType)) {
      return NextResponse.json(
        { error: { code: "INVALID_SERVICE_TYPE", message: "Invalid service type" } },
        { status: 400 },
      )
    }

    // Calculate eligibility based on state and service type
    const eligible = isTexas // Currently only operating in Texas
    let confidence = isTexas ? 0.95 : 0.1

    // Adjust confidence based on disability type
    if (disabilityType === "hearing" || disabilityType === "deaf") {
      confidence = Math.min(confidence + 0.05, 1.0)
    }

    const requirements = [
      "Have a physical or mental disability that affects ability to work",
      "Need VR services to prepare for, find, keep, or advance in employment",
      "Be able to benefit from VR services to achieve employment outcome",
    ]

    const nextSteps = eligible
      ? [
          "Contact your local VR office",
          "Complete VR application (Form VR-1)",
          "Schedule eligibility assessment",
          "Develop Individualized Plan for Employment (IPE)",
        ]
      : [
          "Contact us when VR4DEAF expands to your state",
          "Explore alternative funding sources",
          "Consider relocating to Texas for services",
        ]

    // Estimate funding amounts based on service type
    const fundingEstimates: { [key: string]: { min: number; max: number } } = {
      "job-seeker": { min: 500, max: 5000 },
      "self-employment": { min: 1000, max: 15000 },
      "small-business": { min: 2000, max: 25000 },
    }

    return NextResponse.json({
      eligible,
      confidence,
      state,
      serviceType,
      requirements,
      nextSteps,
      estimatedFunding: eligible
        ? {
            ...fundingEstimates[serviceType],
            currency: "USD",
            note: "Actual funding depends on individual assessment and available resources",
          }
        : null,
      additionalInfo: {
        vrOfficeRequired: true,
        assessmentRequired: true,
        timeframe: "2-4 weeks for initial assessment",
      },
    })
  } catch (error) {
    console.error("Funding Eligibility API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
