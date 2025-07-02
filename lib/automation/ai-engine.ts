import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { UserProfile, VRMatch, AIAnalysisResult } from "./types"
import { getStateConfig } from "@/lib/states/config"
import { getVROfficesByState } from "@/lib/states/vr-offices"

export class AIAutomationEngine {
  private model = openai("gpt-4o")

  async analyzeUserProfile(profile: UserProfile): Promise<AIAnalysisResult> {
    const stateConfig = getStateConfig(profile.stateCode)

    const prompt = `
    Analyze this user profile for VR4DEAF platform and provide recommendations:
    
    User Profile:
    - Name: ${profile.firstName} ${profile.lastName}
    - Location: ${profile.zipCode}, ${profile.stateCode}
    - Hearing Status: ${profile.hearingStatus}
    - Service Interest: ${profile.serviceInterest}
    - VR Client: ${profile.vrClient ? "Yes" : "No"}
    - Ticket to Work: ${profile.ticketToWork ? "Yes" : "No"}
    - ASL Preferred: ${profile.aslPreferred ? "Yes" : "No"}
    - Goals: ${profile.goals || "Not specified"}
    
    State Information:
    - State: ${stateConfig?.name || "Unknown"}
    - VR4DEAF Active: ${stateConfig?.isActive ? "Yes" : "No"}
    - Max Funding: $${stateConfig?.funding.maxJobSeeker || 0}
    - ASL Support Available: ${stateConfig?.features.aslSupport ? "Yes" : "No"}
    
    Provide analysis in JSON format:
    {
      "confidence": 0-1,
      "recommendations": ["specific recommendations"],
      "riskFactors": ["potential issues"],
      "nextActions": ["immediate next steps"],
      "vrEligibilityScore": 0-100,
      "urgencyLevel": "low|medium|high",
      "specialConsiderations": ["any special needs"]
    }
    `

    try {
      const { text } = await generateText({
        model: this.model,
        prompt,
        temperature: 0.3,
      })

      const analysis = JSON.parse(text)

      return {
        confidence: analysis.confidence,
        recommendations: analysis.recommendations,
        riskFactors: analysis.riskFactors,
        nextActions: analysis.nextActions,
        metadata: {
          vrEligibilityScore: analysis.vrEligibilityScore,
          urgencyLevel: analysis.urgencyLevel,
          specialConsiderations: analysis.specialConsiderations,
        },
      }
    } catch (error) {
      console.error("AI Analysis Error:", error)
      return {
        confidence: 0.5,
        recommendations: ["Manual review required"],
        riskFactors: ["AI analysis failed"],
        nextActions: ["Route to human specialist"],
        metadata: { error: error.message },
      }
    }
  }

  async findBestVRMatch(profile: UserProfile): Promise<VRMatch[]> {
    const vrOffices = getVROfficesByState(profile.stateCode)
    const stateConfig = getStateConfig(profile.stateCode)

    if (!stateConfig?.isActive) {
      return []
    }

    const prompt = `
    Find the best VR office matches for this user:
    
    User Profile:
    - Location: ${profile.zipCode}, ${profile.stateCode}
    - Hearing Status: ${profile.hearingStatus}
    - Service Interest: ${profile.serviceInterest}
    - ASL Preferred: ${profile.aslPreferred}
    - VR Experience: ${profile.vrClient ? "Has VR experience" : "New to VR"}
    
    Available VR Offices:
    ${vrOffices
      .map(
        (office) => `
    - ${office.name} (${office.id})
      Address: ${office.address}, ${office.city}
      Specialties: ${office.specialties.join(", ")}
      ASL Support: ${office.accessibility.aslInterpreters ? "Yes" : "No"}
      Services: ${office.services.join(", ")}
    `,
      )
      .join("\n")}
    
    Rank offices by match quality (1-100 score) considering:
    - Geographic proximity
    - Specialty alignment
    - ASL support needs
    - Service type match
    - Office capacity/wait times
    
    Return JSON array of top 3 matches:
    [
      {
        "officeId": "office_id",
        "matchScore": 85,
        "reasonsForMatch": ["specific reasons"],
        "estimatedDistance": 15.2
      }
    ]
    `

    try {
      const { text } = await generateText({
        model: this.model,
        prompt,
        temperature: 0.2,
      })

      const matches = JSON.parse(text)

      return matches
        .map((match: any) => {
          const office = vrOffices.find((o) => o.id === match.officeId)
          if (!office) return null

          return {
            officeId: office.id,
            officeName: office.name,
            distance: match.estimatedDistance || 0,
            matchScore: match.matchScore,
            specialties: office.specialties,
            aslSupport: office.accessibility.aslInterpreters,
            estimatedWaitTime: "2-3 weeks", // This would come from real data
            contactInfo: {
              phone: office.phone,
              email: office.email,
              address: `${office.address}, ${office.city}, ${profile.stateCode} ${office.zipCode}`,
            },
            reasonsForMatch: match.reasonsForMatch,
          }
        })
        .filter(Boolean)
    } catch (error) {
      console.error("VR Matching Error:", error)
      return []
    }
  }

  async generateAccountRecommendations(
    profile: UserProfile,
    vrMatches: VRMatch[],
  ): Promise<{
    accessLevel: "locked" | "basic" | "full"
    servicesEnabled: string[]
    reasoning: string
  }> {
    const stateConfig = getStateConfig(profile.stateCode)

    const prompt = `
    Determine account access level and services for this user:
    
    User Profile:
    - Service Interest: ${profile.serviceInterest}
    - VR Client: ${profile.vrClient}
    - State Active: ${stateConfig?.isActive}
    - VR Matches Found: ${vrMatches.length}
    
    Available Services:
    - job-search-tools
    - resume-builder
    - interview-prep
    - business-formation
    - funding-calculator
    - vr-application-help
    - asl-support
    - training-resources
    
    Rules:
    - If state not active: locked account with basic info only
    - If VR matches found: locked account with VR-fundable services
    - If no VR matches: basic account with limited services
    - Full access only after VR approval
    
    Return JSON:
    {
      "accessLevel": "locked|basic|full",
      "servicesEnabled": ["service1", "service2"],
      "reasoning": "explanation"
    }
    `

    try {
      const { text } = await generateText({
        model: this.model,
        prompt,
        temperature: 0.1,
      })

      return JSON.parse(text)
    } catch (error) {
      console.error("Account Recommendations Error:", error)
      return {
        accessLevel: "locked",
        servicesEnabled: ["basic-info"],
        reasoning: "Error in AI analysis, defaulting to locked account",
      }
    }
  }
}
