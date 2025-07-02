import { type NextRequest, NextResponse } from "next/server"

const services = [
  {
    id: "resume-builder-ai",
    name: "AI-Powered Resume Builder",
    category: "job-seeker",
    description: "Create professional resumes with AI assistance tailored for deaf job seekers",
    vrEligible: true,
    aslSupport: true,
    pricing: {
      free: true,
      vrFunded: true,
      premium: "$29/month",
    },
    features: ["AI optimization", "ATS compatibility", "ASL video integration"],
    location: "nationwide",
  },
  {
    id: "job-placement-service",
    name: "Job Placement Assistance",
    category: "job-seeker",
    description: "Personalized job matching and placement support",
    vrEligible: true,
    aslSupport: true,
    pricing: {
      free: false,
      vrFunded: true,
      premium: "$99/month",
    },
    features: ["Job matching", "Interview coaching", "Employer relations"],
    location: "texas",
  },
  {
    id: "business-formation",
    name: "Automated Business Formation",
    category: "self-employment",
    description: "LLC creation, EIN registration, and business licensing automation",
    vrEligible: true,
    aslSupport: true,
    pricing: {
      free: false,
      vrFunded: "partial",
      premium: "$299 setup + $49/month",
    },
    features: ["LLC formation", "EIN registration", "Business licensing"],
    location: "nationwide",
  },
  {
    id: "business-coaching",
    name: "Deaf Entrepreneurship Coaching",
    category: "small-business",
    description: "Specialized business coaching for deaf entrepreneurs",
    vrEligible: true,
    aslSupport: true,
    pricing: {
      free: false,
      vrFunded: "partial",
      premium: "$150/hour",
    },
    features: ["Business strategy", "Financial planning", "Growth coaching"],
    location: "texas",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const location = searchParams.get("location")
    const vrEligible = searchParams.get("vrEligible") === "true"
    const aslSupport = searchParams.get("aslSupport") === "true"

    let filteredServices = services

    // Filter by category
    if (category) {
      filteredServices = filteredServices.filter((service) => service.category === category)
    }

    // Filter by VR eligibility
    if (vrEligible) {
      filteredServices = filteredServices.filter((service) => service.vrEligible === true)
    }

    // Filter by ASL support
    if (aslSupport) {
      filteredServices = filteredServices.filter((service) => service.aslSupport === true)
    }

    // Filter by location
    if (location) {
      const locationLower = location.toLowerCase()
      filteredServices = filteredServices.filter(
        (service) =>
          service.location === "nationwide" ||
          service.location.includes(locationLower) ||
          locationLower.includes(service.location),
      )
    }

    return NextResponse.json({
      services: filteredServices,
      total: filteredServices.length,
      filters: {
        category,
        location,
        vrEligible,
        aslSupport,
      },
    })
  } catch (error) {
    console.error("Services API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
