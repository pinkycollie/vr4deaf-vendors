import type { StateConfig, StateStatus } from "./types"

export const STATE_STATUSES: StateStatus[] = [
  { code: "TX", status: "active", priority: 1 },
  { code: "CA", status: "beta", priority: 2, estimatedLaunch: "2024-Q2", betaSignupUrl: "/beta/california" },
  { code: "FL", status: "coming-soon", priority: 3, estimatedLaunch: "2024-Q3" },
  { code: "NY", status: "coming-soon", priority: 4, estimatedLaunch: "2024-Q3" },
  { code: "IL", status: "coming-soon", priority: 5, estimatedLaunch: "2024-Q4" },
  { code: "PA", status: "planning", priority: 6, estimatedLaunch: "2025-Q1" },
  { code: "OH", status: "planning", priority: 7, estimatedLaunch: "2025-Q1" },
  { code: "GA", status: "planning", priority: 8, estimatedLaunch: "2025-Q2" },
  { code: "NC", status: "planning", priority: 9, estimatedLaunch: "2025-Q2" },
  { code: "MI", status: "planning", priority: 10, estimatedLaunch: "2025-Q2" },
]

export const STATES_CONFIG: Record<string, StateConfig> = {
  TX: {
    code: "TX",
    name: "Texas",
    fullName: "State of Texas",
    isActive: true,
    launchDate: "2024-01-15",
    vrProgram: {
      name: "Texas Workforce Solutions - Vocational Rehabilitation Services",
      website: "https://www.twc.texas.gov/programs/vocational-rehabilitation",
      phone: "(800) 628-5115",
      email: "vr@twc.state.tx.us",
      eligibilityUrl: "https://www.twc.texas.gov/programs/vocational-rehabilitation/eligibility",
    },
    funding: {
      maxJobSeeker: 5000,
      maxSelfEmployment: 15000,
      maxSmallBusiness: 25000,
      currency: "USD",
    },
    compliance: {
      dataResidency: false,
      specificRequirements: ["HIPAA", "Texas Government Code Chapter 552"],
    },
    features: {
      aslSupport: true,
      ticketToWork: true,
      selfEmploymentServices: true,
      businessServices: true,
    },
    demographics: {
      deafPopulation: 285000,
      vrOfficeCount: 28,
      averageWaitTime: "2-3 weeks",
    },
  },
  CA: {
    code: "CA",
    name: "California",
    fullName: "State of California",
    isActive: false,
    vrProgram: {
      name: "California Department of Rehabilitation",
      website: "https://www.dor.ca.gov/",
      phone: "(916) 324-1313",
      email: "info@dor.ca.gov",
      eligibilityUrl: "https://www.dor.ca.gov/Home/DORServices",
    },
    funding: {
      maxJobSeeker: 6000,
      maxSelfEmployment: 18000,
      maxSmallBusiness: 30000,
      currency: "USD",
    },
    compliance: {
      dataResidency: true,
      specificRequirements: ["HIPAA", "CCPA", "California Unruh Civil Rights Act"],
    },
    features: {
      aslSupport: true,
      ticketToWork: true,
      selfEmploymentServices: true,
      businessServices: true,
    },
    demographics: {
      deafPopulation: 420000,
      vrOfficeCount: 45,
      averageWaitTime: "3-4 weeks",
    },
  },
  FL: {
    code: "FL",
    name: "Florida",
    fullName: "State of Florida",
    isActive: false,
    vrProgram: {
      name: "Florida Division of Vocational Rehabilitation",
      website: "https://www.rehabworks.org/",
      phone: "(850) 245-3399",
      email: "info@rehabworks.org",
      eligibilityUrl: "https://www.rehabworks.org/services/eligibility",
    },
    funding: {
      maxJobSeeker: 4500,
      maxSelfEmployment: 12000,
      maxSmallBusiness: 20000,
      currency: "USD",
    },
    compliance: {
      dataResidency: false,
      specificRequirements: ["HIPAA", "Florida Sunshine Law"],
    },
    features: {
      aslSupport: true,
      ticketToWork: true,
      selfEmploymentServices: true,
      businessServices: false,
    },
    demographics: {
      deafPopulation: 195000,
      vrOfficeCount: 22,
      averageWaitTime: "2-4 weeks",
    },
  },
  NY: {
    code: "NY",
    name: "New York",
    fullName: "State of New York",
    isActive: false,
    vrProgram: {
      name: "New York State Office of Vocational and Educational Services for Individuals with Disabilities",
      website: "https://www.acces.nysed.gov/vr",
      phone: "(518) 474-2714",
      email: "vesidinfo@nysed.gov",
      eligibilityUrl: "https://www.acces.nysed.gov/vr/vocational-rehabilitation-services",
    },
    funding: {
      maxJobSeeker: 5500,
      maxSelfEmployment: 16000,
      maxSmallBusiness: 28000,
      currency: "USD",
    },
    compliance: {
      dataResidency: true,
      specificRequirements: ["HIPAA", "NY SHIELD Act", "New York Human Rights Law"],
    },
    features: {
      aslSupport: true,
      ticketToWork: true,
      selfEmploymentServices: true,
      businessServices: true,
    },
    demographics: {
      deafPopulation: 180000,
      vrOfficeCount: 35,
      averageWaitTime: "3-5 weeks",
    },
  },
}

// Add remaining states with basic configurations
const ADDITIONAL_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CO",
  "CT",
  "DE",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

// Generate basic configs for remaining states
ADDITIONAL_STATES.forEach((stateCode) => {
  if (!STATES_CONFIG[stateCode]) {
    STATES_CONFIG[stateCode] = {
      code: stateCode,
      name: stateCode, // This would be replaced with full state names
      fullName: `State of ${stateCode}`,
      isActive: false,
      vrProgram: {
        name: `${stateCode} Vocational Rehabilitation Services`,
        website: `https://vr.${stateCode.toLowerCase()}.gov`,
        phone: "(000) 000-0000",
        email: `info@vr.${stateCode.toLowerCase()}.gov`,
        eligibilityUrl: `https://vr.${stateCode.toLowerCase()}.gov/eligibility`,
      },
      funding: {
        maxJobSeeker: 4000,
        maxSelfEmployment: 10000,
        maxSmallBusiness: 18000,
        currency: "USD",
      },
      compliance: {
        dataResidency: false,
        specificRequirements: ["HIPAA"],
      },
      features: {
        aslSupport: true,
        ticketToWork: true,
        selfEmploymentServices: false,
        businessServices: false,
      },
      demographics: {
        deafPopulation: 50000,
        vrOfficeCount: 10,
        averageWaitTime: "2-4 weeks",
      },
    }
  }
})

export const getStateConfig = (stateCode: string): StateConfig | null => {
  return STATES_CONFIG[stateCode.toUpperCase()] || null
}

export const getActiveStates = (): StateConfig[] => {
  return Object.values(STATES_CONFIG).filter((state) => state.isActive)
}

export const getStatesByStatus = (status: StateStatus["status"]): StateConfig[] => {
  const statusCodes = STATE_STATUSES.filter((s) => s.status === status).map((s) => s.code)
  return Object.values(STATES_CONFIG).filter((state) => statusCodes.includes(state.code))
}

// Export for compatibility
export const stateConfigs = STATES_CONFIG
