export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  zipCode: string
  stateCode: string
  hearingStatus: "deaf" | "hard-of-hearing" | "deafblind" | "late-deafened"
  serviceInterest: "job-seeker" | "self-employment" | "small-business" | "training"
  goals?: string
  vrClient: boolean
  ticketToWork: boolean
  aslPreferred: boolean
  createdAt: Date
  updatedAt: Date
}

export interface VRMatch {
  officeId: string
  officeName: string
  distance: number
  matchScore: number
  specialties: string[]
  aslSupport: boolean
  estimatedWaitTime: string
  contactInfo: {
    phone: string
    email: string
    address: string
  }
  reasonsForMatch: string[]
}

export interface AutomationWorkflow {
  id: string
  userId: string
  type: "vr-matching" | "account-creation" | "funding-approval" | "fallback-routing"
  status: "pending" | "in-progress" | "completed" | "failed" | "requires-intervention"
  steps: WorkflowStep[]
  currentStep: number
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowStep {
  id: string
  name: string
  type: "ai-analysis" | "api-call" | "notification" | "decision" | "wait" | "human-intervention"
  status: "pending" | "in-progress" | "completed" | "failed" | "skipped"
  input?: any
  output?: any
  error?: string
  executedAt?: Date
  duration?: number
}

export interface AIAnalysisResult {
  confidence: number
  recommendations: string[]
  riskFactors: string[]
  nextActions: string[]
  metadata: Record<string, any>
}

export interface AccountProvisioningResult {
  accountId: string
  username: string
  temporaryPassword: string
  accessLevel: "locked" | "basic" | "full"
  servicesEnabled: string[]
  expiresAt?: Date
}
