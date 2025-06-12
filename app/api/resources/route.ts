import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const language = searchParams.get("language") || "en"

    const resources = [
      {
        id: "resource_1",
        title: "Deaf Employment Rights Guide",
        category: "legal",
        type: "guide",
        description: "Comprehensive guide to employment rights for deaf individuals",
        url: "https://vr4deaf.com/resources/employment-rights",
        language: "en",
        aslAvailable: true,
        downloadable: true,
        tags: ["ADA", "workplace-rights", "accommodations"],
      },
      {
        id: "resource_2",
        title: "ASL Interview Preparation Videos",
        category: "training",
        type: "video",
        description: "Video series on job interview preparation in ASL",
        url: "https://vr4deaf.com/resources/interview-prep",
        language: "asl",
        aslAvailable: true,
        downloadable: false,
        tags: ["interviews", "job-search", "communication"],
      },
      {
        id: "resource_3",
        title: "Workplace Accommodation Request Templates",
        category: "templates",
        type: "document",
        description: "Templates for requesting workplace accommodations",
        url: "https://vr4deaf.com/resources/accommodation-templates",
        language: "en",
        aslAvailable: true,
        downloadable: true,
        tags: ["accommodations", "templates", "workplace"],
      },
    ]

    let filteredResources = resources

    if (category) {
      filteredResources = filteredResources.filter((resource) => resource.category === category)
    }

    if (language) {
      filteredResources = filteredResources.filter(
        (resource) => resource.language === language || resource.aslAvailable,
      )
    }

    return NextResponse.json({ resources: filteredResources })
  } catch (error) {
    console.error("Resources fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}
