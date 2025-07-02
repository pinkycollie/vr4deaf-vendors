export interface StateConfig {
  code: string
  name: string
  fullName: string
  isActive: boolean
  launchDate?: string
  vrProgram: {
    name: string
    website: string
    phone: string
    email: string
    eligibilityUrl: string
  }
  funding: {
    maxJobSeeker: number
    maxSelfEmployment: number
    maxSmallBusiness: number
    currency: string
  }
  compliance: {
    dataResidency: boolean
    specificRequirements: string[]
  }
  features: {
    aslSupport: boolean
    ticketToWork: boolean
    selfEmploymentServices: boolean
    businessServices: boolean
  }
  demographics: {
    deafPopulation: number
    vrOfficeCount: number
    averageWaitTime: string
  }
}

export interface VROffice {
  id: string
  stateCode: string
  name: string
  address: string
  city: string
  zipCode: string
  phone: string
  email: string
  website?: string
  coordinates: {
    lat: number
    lng: number
  }
  services: string[]
  specialties: string[]
  hours: {
    [key: string]: string
  }
  staff?: {
    name: string
    title: string
    specialties: string[]
    email?: string
    phone?: string
  }[]
  accessibility: {
    aslInterpreters: boolean
    videoRelay: boolean
    ttyServices: boolean
    wheelchairAccessible: boolean
  }
}

export interface StateStatus {
  code: string
  status: "active" | "coming-soon" | "planning" | "beta"
  priority: number
  estimatedLaunch?: string
  betaSignupUrl?: string
}
