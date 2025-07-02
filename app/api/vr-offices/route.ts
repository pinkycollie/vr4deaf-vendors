import { type NextRequest, NextResponse } from "next/server"

// Sample VR office data - in production, this would come from a database
const vrOffices = [
  {
    id: "tx-dallas-001",
    name: "Dallas VR Office",
    address: "123 Main St, Dallas, TX 75201",
    phone: "(214) 555-0123",
    email: "dallas@twc.state.tx.us",
    website: "https://twc.texas.gov/offices/dallas",
    coordinates: { lat: 32.7767, lng: -96.797 },
    services: ["job-placement", "training", "counseling", "assistive-technology"],
    specialties: ["deaf-services", "asl-interpretation"],
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
  },
  {
    id: "tx-fortworth-001",
    name: "Fort Worth VR Office",
    address: "456 West Ave, Fort Worth, TX 76104",
    phone: "(817) 555-0456",
    email: "fortworth@twc.state.tx.us",
    website: "https://twc.texas.gov/offices/fortworth",
    coordinates: { lat: 32.7555, lng: -97.3308 },
    services: ["job-placement", "training", "counseling", "self-employment"],
    specialties: ["deaf-services", "business-development"],
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
  },
  {
    id: "tx-houston-001",
    name: "Houston VR Office",
    address: "789 East Blvd, Houston, TX 77002",
    phone: "(713) 555-0789",
    email: "houston@twc.state.tx.us",
    website: "https://twc.texas.gov/offices/houston",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    services: ["job-placement", "training", "counseling", "assistive-technology"],
    specialties: ["deaf-services", "asl-interpretation", "technology-training"],
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed",
    },
  },
]

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Mock geocoding function - in production, use a real geocoding service
async function geocodeZipCode(zipCode: string): Promise<{ lat: number; lng: number } | null> {
  // Mock coordinates for common Texas ZIP codes
  const mockCoordinates: { [key: string]: { lat: number; lng: number } } = {
    "75201": { lat: 32.7767, lng: -96.797 }, // Dallas
    "76104": { lat: 32.7555, lng: -97.3308 }, // Fort Worth
    "77002": { lat: 29.7604, lng: -95.3698 }, // Houston
    "78701": { lat: 30.2672, lng: -97.7431 }, // Austin
  }

  return mockCoordinates[zipCode] || null
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const zipCode = searchParams.get("zipCode")
    const radius = Number.parseInt(searchParams.get("radius") || "25")
    const state = searchParams.get("state")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!zipCode) {
      return NextResponse.json(
        { error: { code: "MISSING_PARAMETER", message: "zipCode parameter is required" } },
        { status: 400 },
      )
    }

    // Get coordinates for the ZIP code
    const coordinates = await geocodeZipCode(zipCode)
    if (!coordinates) {
      return NextResponse.json(
        { error: { code: "INVALID_ZIPCODE", message: "Invalid or unsupported ZIP code" } },
        { status: 400 },
      )
    }

    // Filter offices by state if provided
    let filteredOffices = vrOffices
    if (state) {
      filteredOffices = vrOffices.filter((office) => office.address.includes(state.toUpperCase()))
    }

    // Calculate distances and filter by radius
    const officesWithDistance = filteredOffices
      .map((office) => ({
        ...office,
        distance: calculateDistance(coordinates.lat, coordinates.lng, office.coordinates.lat, office.coordinates.lng),
      }))
      .filter((office) => office.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)
      .map(({ coordinates, ...office }) => office) // Remove coordinates from response

    return NextResponse.json({
      offices: officesWithDistance,
      total: officesWithDistance.length,
      radius,
      searchLocation: { zipCode, coordinates },
    })
  } catch (error) {
    console.error("VR Offices API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
