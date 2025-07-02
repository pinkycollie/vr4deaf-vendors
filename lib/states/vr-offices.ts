import type { VROffice } from "./types"

export const VR_OFFICES: Record<string, VROffice[]> = {
  TX: [
    {
      id: "tx-dallas-001",
      stateCode: "TX",
      name: "Dallas VR Office",
      address: "1100 Commerce St, Suite 500",
      city: "Dallas",
      zipCode: "75242",
      phone: "(214) 290-1000",
      email: "dallas.vr@twc.state.tx.us",
      website: "https://twc.texas.gov/offices/dallas",
      coordinates: { lat: 32.7767, lng: -96.797 },
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
      accessibility: {
        aslInterpreters: true,
        videoRelay: true,
        ttyServices: true,
        wheelchairAccessible: true,
      },
    },
    {
      id: "tx-fortworth-001",
      stateCode: "TX",
      name: "Fort Worth VR Office",
      address: "1150 South Fwy, Suite 229",
      city: "Fort Worth",
      zipCode: "76104",
      phone: "(817) 886-2798",
      email: "fortworth.vr@twc.state.tx.us",
      coordinates: { lat: 32.7555, lng: -97.3308 },
      services: ["job-placement", "training", "counseling", "self-employment"],
      specialties: ["deaf-services", "business-development", "entrepreneurship"],
      hours: {
        monday: "8:00 AM - 5:00 PM",
        tuesday: "8:00 AM - 5:00 PM",
        wednesday: "8:00 AM - 5:00 PM",
        thursday: "8:00 AM - 5:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      accessibility: {
        aslInterpreters: true,
        videoRelay: true,
        ttyServices: true,
        wheelchairAccessible: true,
      },
    },
    {
      id: "tx-houston-001",
      stateCode: "TX",
      name: "Houston VR Office",
      address: "1117 East 11th Street",
      city: "Houston",
      zipCode: "77009",
      phone: "(713) 718-3500",
      email: "houston.vr@twc.state.tx.us",
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
      accessibility: {
        aslInterpreters: true,
        videoRelay: true,
        ttyServices: true,
        wheelchairAccessible: true,
      },
    },
  ],
  CA: [
    {
      id: "ca-losangeles-001",
      stateCode: "CA",
      name: "Los Angeles Department of Rehabilitation",
      address: "3580 Wilshire Blvd, Suite 900",
      city: "Los Angeles",
      zipCode: "90010",
      phone: "(213) 736-6500",
      email: "la.office@dor.ca.gov",
      coordinates: { lat: 34.0522, lng: -118.2437 },
      services: ["job-placement", "training", "counseling", "assistive-technology"],
      specialties: ["deaf-services", "asl-interpretation", "independent-living"],
      hours: {
        monday: "8:00 AM - 5:00 PM",
        tuesday: "8:00 AM - 5:00 PM",
        wednesday: "8:00 AM - 5:00 PM",
        thursday: "8:00 AM - 5:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      accessibility: {
        aslInterpreters: true,
        videoRelay: true,
        ttyServices: true,
        wheelchairAccessible: true,
      },
    },
    {
      id: "ca-sanfrancisco-001",
      stateCode: "CA",
      name: "San Francisco Department of Rehabilitation",
      address: "120 Howard Street, Suite 300",
      city: "San Francisco",
      zipCode: "94105",
      phone: "(415) 904-5600",
      email: "sf.office@dor.ca.gov",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      services: ["job-placement", "training", "counseling", "self-employment"],
      specialties: ["deaf-services", "technology-training", "business-development"],
      hours: {
        monday: "8:00 AM - 5:00 PM",
        tuesday: "8:00 AM - 5:00 PM",
        wednesday: "8:00 AM - 5:00 PM",
        thursday: "8:00 AM - 5:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      accessibility: {
        aslInterpreters: true,
        videoRelay: true,
        ttyServices: true,
        wheelchairAccessible: true,
      },
    },
  ],
  FL: [
    {
      id: "fl-miami-001",
      stateCode: "FL",
      name: "Miami Division of Vocational Rehabilitation",
      address: "401 NW 2nd Ave, Suite N-950",
      city: "Miami",
      zipCode: "33128",
      phone: "(305) 377-5300",
      email: "miami.dvr@rehabworks.org",
      coordinates: { lat: 25.7617, lng: -80.1918 },
      services: ["job-placement", "training", "counseling"],
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
      accessibility: {
        aslInterpreters: true,
        videoRelay: false,
        ttyServices: true,
        wheelchairAccessible: true,
      },
    },
  ],
}

export const getVROfficesByState = (stateCode: string): VROffice[] => {
  return VR_OFFICES[stateCode.toUpperCase()] || []
}

export const getVROfficeById = (id: string): VROffice | null => {
  for (const offices of Object.values(VR_OFFICES)) {
    const office = offices.find((office) => office.id === id)
    if (office) return office
  }
  return null
}

export const searchVROffices = (stateCode: string, zipCode: string, radius = 25): VROffice[] => {
  const offices = getVROfficesByState(stateCode)
  // In a real implementation, this would calculate distances based on coordinates
  return offices.slice(0, 5) // Return first 5 for demo
}
