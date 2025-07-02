import { type NextRequest, NextResponse } from "next/server"

// Sample detailed office data
const detailedOffices: { [key: string]: any } = {
  "tx-dallas-001": {
    id: "tx-dallas-001",
    name: "Dallas VR Office",
    address: "123 Main St, Dallas, TX 75201",
    phone: "(214) 555-0123",
    email: "dallas@twc.state.tx.us",
    website: "https://twc.texas.gov/offices/dallas",
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
    staff: [
      {
        name: "Sarah Johnson",
        title: "Senior VR Counselor",
        specialties: ["deaf-employment", "assistive-technology"],
        email: "sarah.johnson@twc.state.tx.us",
        phone: "(214) 555-0124",
      },
      {
        name: "Michael Chen",
        title: "Job Placement Specialist",
        specialties: ["job-coaching", "employer-relations"],
        email: "michael.chen@twc.state.tx.us",
        phone: "(214) 555-0125",
      },
    ],
    programs: [
      {
        name: "Deaf Employment Initiative",
        description: "Specialized program for deaf job seekers",
        eligibility: ["Hearing impairment", "VR eligibility"],
      },
      {
        name: "Assistive Technology Program",
        description: "Technology support for workplace accommodations",
        eligibility: ["Documented disability", "Employment goal"],
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const office = detailedOffices[id]
    if (!office) {
      return NextResponse.json({ error: { code: "OFFICE_NOT_FOUND", message: "VR office not found" } }, { status: 404 })
    }

    return NextResponse.json(office)
  } catch (error) {
    console.error("VR Office Detail API Error:", error)
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Internal server error" } }, { status: 500 })
  }
}
