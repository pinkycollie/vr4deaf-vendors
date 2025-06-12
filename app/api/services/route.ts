import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const location = searchParams.get("location")

    // Mock VR services data
    const services = [
      {
        id: "service_1",
        name: "ASL Interpreter Services",
        category: "communication",
        description: "Professional ASL interpreters for workplace and training",
        location: "Texas",
        contact: "interpreters@vr4deaf.com",
        phone: "555-0101",
        website: "https://vr4deaf.com/interpreters",
        culturallyResponsive: true,
        deafSpecialized: true,
      },
      {
        id: "service_2",
        name: "Deaf Career Counseling",
        category: "counseling",
        description: "Career counseling specifically for deaf individuals",
        location: "Texas",
        contact: "counseling@vr4deaf.com",
        phone: "555-0102",
        website: "https://vr4deaf.com/counseling",
        culturallyResponsive: true,
        deafSpecialized: true,
      },
      {
        id: "service_3",
        name: "Assistive Technology Training",
        category: "technology",
        description: "Training on assistive technology for deaf workers",
        location: "Texas",
        contact: "tech@vr4deaf.com",
        phone: "555-0103",
        website: "https://vr4deaf.com/technology",
        culturallyResponsive: true,
        deafSpecialized: true,
      },
    ]

    let filteredServices = services

    if (category) {
      filteredServices = filteredServices.filter((service) =>
        service.category.toLowerCase().includes(category.toLowerCase()),
      )
    }

    if (location) {
      filteredServices = filteredServices.filter((service) =>
        service.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    return NextResponse.json({ services: filteredServices })
  } catch (error) {
    console.error("Services fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
