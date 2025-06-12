import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const location = searchParams.get("location")

    const providers = [
      {
        id: "provider_1",
        name: "Texas Deaf Services",
        type: "VR Agency",
        specialties: ["vocational-rehabilitation", "job-placement"],
        location: "Austin, TX",
        contact: "info@texasdeafservices.org",
        phone: "555-0201",
        website: "https://texasdeafservices.org",
        certifications: ["CRCR", "ASL-Fluent"],
        culturalCompetency: "High",
        deafCommunityConnected: true,
        services: ["Vocational Assessment", "Job Training", "Workplace Accommodations", "Career Counseling"],
      },
      {
        id: "provider_2",
        name: "Deaf Professional Network",
        type: "Employment Agency",
        specialties: ["job-placement", "career-development"],
        location: "Dallas, TX",
        contact: "careers@deafprofessional.net",
        phone: "555-0202",
        website: "https://deafprofessional.net",
        certifications: ["CRC", "LCDC"],
        culturalCompetency: "High",
        deafCommunityConnected: true,
        services: ["Job Matching", "Resume Building", "Interview Preparation", "Workplace Advocacy"],
      },
    ]

    let filteredProviders = providers

    if (specialty) {
      filteredProviders = filteredProviders.filter((provider) =>
        provider.specialties.some((s) => s.includes(specialty)),
      )
    }

    if (location) {
      filteredProviders = filteredProviders.filter((provider) =>
        provider.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    return NextResponse.json({ providers: filteredProviders })
  } catch (error) {
    console.error("Providers fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 })
  }
}
