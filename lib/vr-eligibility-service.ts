import { neon } from "@neondatabase/serverless"
import { businessMagicianClient } from "./business-magician-client"

const sql = neon(process.env.DATABASE_URL!)

interface VREligibilityPayload {
  name: string
  email: string
  phone: string
  location: string
  disabilityType: string
  disabilityDocumentation: boolean
  employmentHistory: any[]
  educationLevel: string
  businessIdea: string
  previousBusinessExperience: boolean
  financialNeed: string
  supportSystem: string[]
  accommodationNeeds: string[]
  goals: string[]
}

interface VREligibilityAssessment {
  eligible: boolean
  score: number
  factors: {
    disabilityImpact: number
    businessViability: number
    supportReadiness: number
    financialFeasibility: number
  }
  recommendations: string[]
  nextSteps: string[]
  estimatedTimeline: string
  potentialFunding: number
}

class VREligibilityService {
  async generateEligibilityForm(payload: any): Promise<any> {
    try {
      // Generate dynamic form based on business context
      const businessContext = await businessMagicianClient.analyzeContext(payload.context)

      const baseForm = {
        sections: [
          {
            id: "personal-info",
            title: "Personal Information",
            fields: [
              { name: "name", type: "text", required: true, label: "Full Name" },
              { name: "email", type: "email", required: true, label: "Email Address" },
              { name: "phone", type: "tel", required: true, label: "Phone Number" },
              {
                name: "location",
                type: "select",
                required: true,
                label: "State/Location",
                options: await this.getStateOptions(),
              },
            ],
          },
          {
            id: "disability-info",
            title: "Disability Information",
            fields: [
              {
                name: "disabilityType",
                type: "select",
                required: true,
                label: "Primary Disability Type",
                options: [
                  { value: "deaf-hoh", label: "Deaf/Hard of Hearing" },
                  { value: "blind-vi", label: "Blind/Visually Impaired" },
                  { value: "mobility", label: "Mobility Impairment" },
                  { value: "cognitive", label: "Cognitive Disability" },
                  { value: "mental-health", label: "Mental Health Condition" },
                  { value: "multiple", label: "Multiple Disabilities" },
                  { value: "other", label: "Other" },
                ],
              },
              {
                name: "disabilityDocumentation",
                type: "radio",
                required: true,
                label: "Do you have documentation of your disability?",
                options: [
                  { value: "yes", label: "Yes, I have current documentation" },
                  { value: "expired", label: "Yes, but it may be outdated" },
                  { value: "no", label: "No, I need assistance obtaining documentation" },
                ],
              },
              {
                name: "accommodationNeeds",
                type: "checkbox",
                label: "What accommodations do you typically need?",
                options: [
                  { value: "asl-interpreter", label: "ASL Interpreter" },
                  { value: "captioning", label: "Real-time Captioning" },
                  { value: "assistive-technology", label: "Assistive Technology" },
                  { value: "flexible-schedule", label: "Flexible Schedule" },
                  { value: "accessible-workspace", label: "Accessible Workspace" },
                  { value: "transportation", label: "Transportation Support" },
                  { value: "other", label: "Other (please specify)" },
                ],
              },
            ],
          },
          {
            id: "business-info",
            title: "Business Information",
            fields: [
              {
                name: "businessIdea",
                type: "textarea",
                required: true,
                label: "Describe your business idea",
                placeholder: "Please provide details about your business concept, target market, and goals...",
              },
              {
                name: "businessType",
                type: "select",
                required: true,
                label: "Business Type",
                options: businessContext.suggestedBusinessTypes || [
                  { value: "service", label: "Service Business" },
                  { value: "retail", label: "Retail Business" },
                  { value: "consulting", label: "Consulting" },
                  { value: "technology", label: "Technology/Software" },
                  { value: "manufacturing", label: "Manufacturing" },
                  { value: "food-service", label: "Food Service" },
                  { value: "other", label: "Other" },
                ],
              },
              {
                name: "previousBusinessExperience",
                type: "radio",
                required: true,
                label: "Do you have previous business experience?",
                options: [
                  { value: "yes-owner", label: "Yes, I've owned a business before" },
                  { value: "yes-management", label: "Yes, I've managed a business" },
                  { value: "some", label: "Some business experience" },
                  { value: "no", label: "No previous business experience" },
                ],
              },
            ],
          },
          {
            id: "financial-info",
            title: "Financial Information",
            fields: [
              {
                name: "currentEmployment",
                type: "select",
                required: true,
                label: "Current Employment Status",
                options: [
                  { value: "unemployed", label: "Unemployed" },
                  { value: "underemployed", label: "Underemployed" },
                  { value: "employed-seeking-change", label: "Employed but seeking career change" },
                  { value: "student", label: "Student" },
                  { value: "retired", label: "Retired" },
                  { value: "other", label: "Other" },
                ],
              },
              {
                name: "financialNeed",
                type: "select",
                required: true,
                label: "Estimated startup funding needed",
                options: [
                  { value: "under-5k", label: "Under $5,000" },
                  { value: "5k-15k", label: "$5,000 - $15,000" },
                  { value: "15k-50k", label: "$15,000 - $50,000" },
                  { value: "50k-100k", label: "$50,000 - $100,000" },
                  { value: "over-100k", label: "Over $100,000" },
                  { value: "unsure", label: "I'm not sure" },
                ],
              },
            ],
          },
          {
            id: "support-info",
            title: "Support System",
            fields: [
              {
                name: "supportSystem",
                type: "checkbox",
                label: "What support do you have available?",
                options: [
                  { value: "family", label: "Family support" },
                  { value: "friends", label: "Friends/peer network" },
                  { value: "mentors", label: "Business mentors" },
                  { value: "disability-orgs", label: "Disability organizations" },
                  { value: "professional", label: "Professional advisors" },
                  { value: "none", label: "Limited support system" },
                ],
              },
              {
                name: "goals",
                type: "checkbox",
                label: "What are your primary goals?",
                options: [
                  { value: "financial-independence", label: "Financial independence" },
                  { value: "flexible-work", label: "Flexible work arrangement" },
                  { value: "community-impact", label: "Community impact" },
                  { value: "skill-utilization", label: "Utilize my skills and talents" },
                  { value: "accessibility-advocacy", label: "Promote accessibility" },
                  { value: "wealth-building", label: "Build long-term wealth" },
                ],
              },
            ],
          },
        ],
        metadata: {
          estimatedTime: "15-20 minutes",
          saveProgress: true,
          accessibilityFeatures: [
            "Screen reader compatible",
            "Keyboard navigation",
            "High contrast mode",
            "ASL video instructions available",
          ],
        },
      }

      // Store form session for progress tracking
      await this.createFormSession(payload.userId, baseForm)

      return baseForm
    } catch (error) {
      console.error("Error generating VR eligibility form:", error)
      throw new Error("Failed to generate eligibility form")
    }
  }

  async assessEligibility(payload: VREligibilityPayload): Promise<VREligibilityAssessment> {
    try {
      // Calculate eligibility score based on multiple factors
      const factors = await this.calculateEligibilityFactors(payload)
      const score = this.calculateOverallScore(factors)
      const eligible = score >= 70 // 70% threshold for eligibility

      // Generate AI-powered recommendations
      const recommendations = await this.generateRecommendations(payload, factors)

      // Determine next steps based on assessment
      const nextSteps = await this.generateNextSteps(payload, eligible, factors)

      // Estimate timeline and potential funding
      const timeline = this.estimateTimeline(payload, factors)
      const potentialFunding = this.calculatePotentialFunding(payload, factors)

      const assessment: VREligibilityAssessment = {
        eligible,
        score,
        factors,
        recommendations,
        nextSteps,
        estimatedTimeline: timeline,
        potentialFunding,
      }

      // Store assessment results
      await this.storeAssessment(payload, assessment)

      // Trigger follow-up workflows if eligible
      if (eligible) {
        await this.triggerEligibleWorkflow(payload, assessment)
      }

      return assessment
    } catch (error) {
      console.error("Error assessing VR eligibility:", error)
      throw new Error("Failed to assess eligibility")
    }
  }

  private async calculateEligibilityFactors(payload: VREligibilityPayload): Promise<any> {
    // Disability impact assessment (0-100)
    const disabilityImpact = this.assessDisabilityImpact(payload)

    // Business viability assessment using Business Magician API
    const businessViability = await businessMagicianClient.assessBusinessViability({
      businessIdea: payload.businessIdea,
      experience: payload.previousBusinessExperience,
      market: payload.location,
    })

    // Support readiness assessment
    const supportReadiness = this.assessSupportReadiness(payload)

    // Financial feasibility assessment
    const financialFeasibility = this.assessFinancialFeasibility(payload)

    return {
      disabilityImpact,
      businessViability: businessViability.score || 75,
      supportReadiness,
      financialFeasibility,
    }
  }

  private calculateOverallScore(factors: any): number {
    // Weighted scoring algorithm
    const weights = {
      disabilityImpact: 0.3,
      businessViability: 0.35,
      supportReadiness: 0.2,
      financialFeasibility: 0.15,
    }

    return Math.round(
      factors.disabilityImpact * weights.disabilityImpact +
        factors.businessViability * weights.businessViability +
        factors.supportReadiness * weights.supportReadiness +
        factors.financialFeasibility * weights.financialFeasibility,
    )
  }

  private assessDisabilityImpact(payload: VREligibilityPayload): number {
    let score = 0

    // Documentation availability
    if (payload.disabilityDocumentation) score += 30

    // Accommodation needs complexity
    const accommodationComplexity = payload.accommodationNeeds.length
    score += Math.min(accommodationComplexity * 10, 40)

    // Employment history impact
    if (payload.employmentHistory.length === 0) score += 30

    return Math.min(score, 100)
  }

  private assessSupportReadiness(payload: VREligibilityPayload): number {
    let score = 0

    // Support system strength
    score += payload.supportSystem.length * 15

    // Goal clarity
    score += payload.goals.length * 10

    // Education level impact
    const educationLevels = {
      "high-school": 20,
      "some-college": 30,
      associates: 40,
      bachelors: 50,
      masters: 60,
      doctorate: 70,
    }
    score += educationLevels[payload.educationLevel as keyof typeof educationLevels] || 20

    return Math.min(score, 100)
  }

  private assessFinancialFeasibility(payload: VREligibilityPayload): number {
    let score = 50 // Base score

    // Financial need assessment
    const needLevels = {
      "under-5k": 90,
      "5k-15k": 80,
      "15k-50k": 70,
      "50k-100k": 60,
      "over-100k": 40,
      unsure: 50,
    }
    score = needLevels[payload.financialNeed as keyof typeof needLevels] || 50

    return score
  }

  private async generateRecommendations(payload: VREligibilityPayload, factors: any): Promise<string[]> {
    const recommendations: string[] = []

    if (factors.disabilityImpact < 70) {
      recommendations.push("Consider obtaining updated disability documentation")
      recommendations.push("Connect with disability advocacy organizations for support")
    }

    if (factors.businessViability < 70) {
      recommendations.push("Develop a more detailed business plan")
      recommendations.push("Consider market research to validate your business idea")
      recommendations.push("Explore business mentorship programs")
    }

    if (factors.supportReadiness < 70) {
      recommendations.push("Build a stronger support network")
      recommendations.push("Consider business education or training programs")
    }

    if (factors.financialFeasibility < 70) {
      recommendations.push("Explore alternative funding sources")
      recommendations.push("Consider starting with a smaller-scale version of your business")
    }

    // Add accessibility-specific recommendations
    if (payload.disabilityType === "deaf-hoh") {
      recommendations.push("Explore ASL interpretation services for business meetings")
      recommendations.push("Consider visual communication tools for customer service")
    }

    return recommendations
  }

  private async generateNextSteps(payload: VREligibilityPayload, eligible: boolean, factors: any): Promise<string[]> {
    if (eligible) {
      return [
        "Schedule appointment with VR counselor",
        "Gather required documentation",
        "Begin developing detailed business plan",
        "Explore VR funding opportunities",
        "Connect with CBTAC provider in your area",
      ]
    } else {
      return [
        "Address eligibility gaps identified in assessment",
        "Explore alternative support programs",
        "Consider skill development opportunities",
        "Build business knowledge and experience",
        "Reapply when ready",
      ]
    }
  }

  private estimateTimeline(payload: VREligibilityPayload, factors: any): string {
    const baseTimeline = 6 // months
    let adjustment = 0

    if (factors.disabilityImpact < 70) adjustment += 2
    if (factors.businessViability < 70) adjustment += 3
    if (factors.supportReadiness < 70) adjustment += 1

    const totalMonths = baseTimeline + adjustment
    return `${totalMonths} months`
  }

  private calculatePotentialFunding(payload: VREligibilityPayload, factors: any): number {
    const baseFunding = 15000 // Base VR funding amount

    // Adjust based on business complexity and needs
    const needMultipliers = {
      "under-5k": 0.5,
      "5k-15k": 1.0,
      "15k-50k": 2.0,
      "50k-100k": 3.0,
      "over-100k": 4.0,
      unsure: 1.0,
    }

    const multiplier = needMultipliers[payload.financialNeed as keyof typeof needMultipliers] || 1.0
    return Math.round(baseFunding * multiplier)
  }

  private async createFormSession(userId: string, form: any): Promise<void> {
    await sql`
      INSERT INTO vr_form_sessions (user_id, form_data, created_at, expires_at)
      VALUES (${userId}, ${JSON.stringify(form)}, NOW(), NOW() + INTERVAL '7 days')
      ON CONFLICT (user_id) DO UPDATE SET
        form_data = ${JSON.stringify(form)},
        updated_at = NOW()
    `
  }

  private async storeAssessment(payload: VREligibilityPayload, assessment: VREligibilityAssessment): Promise<void> {
    await sql`
      INSERT INTO vr_assessments (
        email, assessment_data, eligible, score, created_at
      )
      VALUES (
        ${payload.email}, ${JSON.stringify({ payload, assessment })}, 
        ${assessment.eligible}, ${assessment.score}, NOW()
      )
    `
  }

  private async triggerEligibleWorkflow(
    payload: VREligibilityPayload,
    assessment: VREligibilityAssessment,
  ): Promise<void> {
    // Trigger automated workflow for eligible candidates
    // This would integrate with Google Workspace and Liveblocks
    console.log("Triggering eligible workflow for:", payload.email)
  }

  private async getStateOptions(): Promise<Array<{ value: string; label: string }>> {
    const states = await sql`SELECT id, name, abbreviation FROM states ORDER BY name`
    return states.map((state: any) => ({
      value: state.id,
      label: `${state.name} (${state.abbreviation})`,
    }))
  }
}

export const vrEligibilityService = new VREligibilityService()
