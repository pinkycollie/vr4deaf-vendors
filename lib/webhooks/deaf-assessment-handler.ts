import { WebhookLogger } from "../webhook-logger"

export interface DeafAssessmentData {
  clientId: string
  assessmentId: string
  eventType: "assessment_started" | "assessment_completed" | "section_completed"
  timestamp: string
  data: {
    // Section 1: Deaf Cultural Communication Assessment
    culturalAssessment?: {
      aslProficiency: string
      communicationPreferences: string[]
      videoAssessment?: {
        uploaded: boolean
        fileUrl?: string
        analysisResults?: any
      }
      culturalIdentityLevel: string
    }

    // Section 2: Vocational Interest & Aptitude Analyzer
    vocationalAssessment?: {
      interests: string[]
      skillLevelRating: number
      aptitudeScores: {
        [category: string]: number
      }
    }

    // Section 3: Workplace Accommodation Calculator
    accommodationAssessment?: {
      jobRoleDescription: string
      currentAccommodations?: string[]
      neededAccommodations?: string[]
      workplaceType: string
      accommodationPriority: string[]
    }

    // Overall Results (when assessment is completed)
    overallResults?: {
      recommendedServices: string[]
      priorityLevel: "high" | "medium" | "low"
      counselorMatchingCriteria: {
        communicationPreference: string
        culturalCompetencyRequired: boolean
        specializations: string[]
      }
      accommodationSummary: {
        estimatedCost: number
        implementationTimeline: string
        priorityAccommodations: string[]
      }
    }
  }
}

export class DeafAssessmentHandler {
  static async processAssessmentData(data: DeafAssessmentData): Promise<{
    success: boolean
    processedData: any
    nextSteps: string[]
  }> {
    try {
      console.log(`Processing deaf assessment for client: ${data.clientId}`)

      // Log the assessment event
      await WebhookLogger.log({
        toolId: "deaf-individual-assessment",
        method: "POST",
        url: "/api/webhooks/deaf-individual-assessment",
        payload: data,
        responseStatus: 200,
        responseTime: 0,
        signatureVerified: true,
        ipAddress: "wrapifai-webhook",
        userAgent: "WrapifAI-Webhook/1.0",
        processed: true,
      })

      const processedData = await this.analyzeAssessmentData(data)
      const nextSteps = await this.generateNextSteps(data, processedData)

      // Store assessment results
      await this.storeAssessmentResults(data.clientId, processedData)

      // Trigger follow-up actions
      await this.triggerFollowUpActions(data, processedData)

      return {
        success: true,
        processedData,
        nextSteps,
      }
    } catch (error) {
      console.error("Error processing deaf assessment:", error)
      throw error
    }
  }

  private static async analyzeAssessmentData(data: DeafAssessmentData) {
    const analysis = {
      clientProfile: {
        communicationStyle: this.analyzeCommunicationStyle(data.data.culturalAssessment),
        vocationalFit: this.analyzeVocationalFit(data.data.vocationalAssessment),
        accommodationNeeds: this.analyzeAccommodationNeeds(data.data.accommodationAssessment),
      },
      recommendations: {
        services: [],
        accommodations: [],
        counselorCriteria: {},
      },
      riskFactors: [],
      strengths: [],
    }

    // Analyze communication style and cultural identity
    if (data.data.culturalAssessment) {
      const cultural = data.data.culturalAssessment

      if (cultural.aslProficiency === "native" || cultural.aslProficiency === "fluent") {
        analysis.strengths.push("Strong ASL communication skills")
        analysis.recommendations.counselorCriteria = {
          ...analysis.recommendations.counselorCriteria,
          aslFluencyRequired: true,
        }
      }

      if (cultural.culturalIdentityLevel === "strong_deaf_identity") {
        analysis.strengths.push("Strong deaf cultural identity")
        analysis.recommendations.counselorCriteria = {
          ...analysis.recommendations.counselorCriteria,
          culturalCompetencyRequired: true,
        }
      }
    }

    // Analyze vocational interests and aptitudes
    if (data.data.vocationalAssessment) {
      const vocational = data.data.vocationalAssessment

      if (vocational.skillLevelRating >= 4) {
        analysis.strengths.push("High self-assessed skill level")
      } else if (vocational.skillLevelRating <= 2) {
        analysis.riskFactors.push("Low confidence in current skills")
        analysis.recommendations.services.push("Skills development training")
      }
    }

    // Analyze accommodation needs
    if (data.data.accommodationAssessment) {
      const accommodation = data.data.accommodationAssessment

      if (accommodation.neededAccommodations?.length > 0) {
        analysis.recommendations.accommodations = accommodation.neededAccommodations
      }
    }

    return analysis
  }

  private static analyzeCommunicationStyle(cultural: any) {
    if (!cultural) return "unknown"

    const preferences = cultural.communicationPreferences || []
    const aslLevel = cultural.aslProficiency || "unknown"

    if (preferences.includes("ASL") && (aslLevel === "native" || aslLevel === "fluent")) {
      return "visual-primary"
    } else if (preferences.includes("spoken") && preferences.includes("written")) {
      return "multimodal"
    } else if (preferences.includes("written")) {
      return "text-primary"
    }

    return "mixed"
  }

  private static analyzeVocationalFit(vocational: any) {
    if (!vocational) return { fit: "unknown", confidence: 0 }

    const interests = vocational.interests || []
    const skillLevel = vocational.skillLevelRating || 0

    return {
      fit: interests.length > 0 ? "identified" : "exploring",
      confidence: skillLevel,
      primaryInterests: interests.slice(0, 3),
    }
  }

  private static analyzeAccommodationNeeds(accommodation: any) {
    if (!accommodation) return { complexity: "unknown", cost: "unknown" }

    const needed = accommodation.neededAccommodations || []
    const jobType = accommodation.workplaceType || "unknown"

    let complexity = "low"
    if (needed.length > 3) complexity = "high"
    else if (needed.length > 1) complexity = "medium"

    return {
      complexity,
      accommodationCount: needed.length,
      workplaceType: jobType,
      priorityItems: accommodation.accommodationPriority || [],
    }
  }

  private static async generateNextSteps(data: DeafAssessmentData, analysis: any): Promise<string[]> {
    const steps = []

    // Always include counselor matching as first step
    steps.push("Schedule consultation with matched VR counselor")

    // Add service-specific steps based on analysis
    if (analysis.recommendations.services.includes("Skills development training")) {
      steps.push("Enroll in skills assessment and training program")
    }

    if (analysis.recommendations.accommodations.length > 0) {
      steps.push("Develop workplace accommodation implementation plan")
    }

    if (analysis.riskFactors.length > 0) {
      steps.push("Address identified barriers and risk factors")
    }

    // Add follow-up assessment if needed
    if (data.eventType === "assessment_completed") {
      steps.push("Schedule 30-day follow-up assessment")
    }

    return steps
  }

  private static async storeAssessmentResults(clientId: string, processedData: any) {
    // Store in database (implementation depends on your database setup)
    console.log(`Storing assessment results for client ${clientId}:`, processedData)

    // This would typically save to your database
    // await db.assessmentResults.create({
    //   clientId,
    //   data: processedData,
    //   timestamp: new Date()
    // })
  }

  private static async triggerFollowUpActions(data: DeafAssessmentData, analysis: any) {
    // Trigger counselor matching
    if (data.eventType === "assessment_completed") {
      console.log("Triggering counselor matching for client:", data.clientId)
      // This would call your counselor matching service
    }

    // Send notification to VR office
    console.log("Notifying VR office of new assessment completion")

    // Schedule follow-up communications
    console.log("Scheduling follow-up communications")
  }
}
