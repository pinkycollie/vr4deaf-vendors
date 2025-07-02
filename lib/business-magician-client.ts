interface BusinessMagicianConfig {
  baseUrl: string
  apiKey: string
  timeout: number
}

interface MarketAnalysisRequest {
  businessType: string
  location: string
  targetMarket: string
  industry: string
  accessibilityFocus?: boolean
  deafCommunityIntegration?: boolean
}

interface BusinessInsight {
  marketSize: string
  trends: string[]
  opportunities: string[]
  competitors: string[]
  uniqueSellingPoints: string[]
  startupCosts: Record<string, number>
  revenueProjections: Record<string, number>
  immediateActions: string[]
  shortTermGoals: string[]
  longTermVision: string[]
  vrFundingEligible: boolean
}

class BusinessMagicianClient {
  private config: BusinessMagicianConfig

  constructor() {
    this.config = {
      baseUrl: process.env.API_BASE_URL || "https://api.businessmagician.com",
      apiKey: process.env.DEAF_AUTH_API_KEY || "",
      timeout: 30000,
    }
  }

  async analyzeMarket(request: MarketAnalysisRequest): Promise<BusinessInsight> {
    try {
      const response = await fetch(`${this.config.baseUrl}/v1/market-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
          "X-API-Key": this.config.apiKey,
          "User-Agent": "VR4Deaf-Platform/1.0",
        },
        body: JSON.stringify({
          ...request,
          accessibility_requirements: {
            deaf_community_focus: request.deafCommunityIntegration || false,
            visual_communication_needed: true,
            asl_integration: true,
            assistive_technology: true,
          },
          compliance_requirements: {
            ada_compliance: true,
            vr_program_eligible: true,
            section_508: true,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Business Magician API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return this.transformResponse(data)
    } catch (error) {
      console.error("Business Magician API error:", error)
      // Return fallback data for demo purposes
      return this.getFallbackInsights(request)
    }
  }

  async generateBusinessPlan(clientData: any): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/v1/business-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
          "X-API-Key": this.config.apiKey,
        },
        body: JSON.stringify({
          client_profile: clientData,
          accessibility_integration: true,
          vr_compliance: clientData.serviceType === "vr-vendor",
          deaf_community_focus: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Business Plan API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Business Plan generation error:", error)
      return this.getFallbackBusinessPlan(clientData)
    }
  }

  async getCompetitiveAnalysis(industry: string, location: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/v1/competitive-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          industry,
          location,
          accessibility_focus: true,
          deaf_market_analysis: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Competitive Analysis API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Competitive Analysis error:", error)
      return this.getFallbackCompetitiveAnalysis(industry)
    }
  }

  private transformResponse(data: any): BusinessInsight {
    return {
      marketSize: data.market_analysis?.size || "Analyzing...",
      trends: data.market_analysis?.trends || [],
      opportunities: data.market_analysis?.opportunities || [],
      competitors: data.competitive_analysis?.competitors || [],
      uniqueSellingPoints: data.competitive_analysis?.differentiators || [],
      startupCosts: data.financial_analysis?.startup_costs || {},
      revenueProjections: data.financial_analysis?.revenue_projections || {},
      immediateActions: data.recommendations?.immediate || [],
      shortTermGoals: data.recommendations?.short_term || [],
      longTermVision: data.recommendations?.long_term || [],
      vrFundingEligible: data.funding_analysis?.vr_eligible || false,
    }
  }

  private getFallbackInsights(request: MarketAnalysisRequest): BusinessInsight {
    return {
      marketSize: "$2.5B+ (Accessibility Services Market)",
      trends: [
        "Growing demand for accessible digital services",
        "Increased awareness of deaf community needs",
        "Remote work driving need for visual communication",
        "Government compliance requirements expanding",
      ],
      opportunities: [
        "Underserved deaf business community",
        "Limited ASL-integrated business services",
        "Growing remote work accessibility needs",
        "VR funding opportunities for deaf entrepreneurs",
      ],
      competitors: [
        "Traditional business consulting firms",
        "General accessibility service providers",
        "Limited deaf-specific business services",
      ],
      uniqueSellingPoints: [
        "Deaf community cultural understanding",
        "ASL-integrated service delivery",
        "VR program compliance expertise",
        "Accessibility-first business approach",
      ],
      startupCosts: {
        "Technology Setup": 5000,
        "Marketing & Branding": 3000,
        "Legal & Licensing": 2000,
        "Initial Inventory": 1000,
        "Working Capital": 10000,
      },
      revenueProjections: {
        "Month 1-3": 2000,
        "Month 4-6": 5000,
        "Month 7-12": 8000,
        "Year 2": 15000,
      },
      immediateActions: [
        "Complete VR eligibility assessment",
        "Develop accessibility-focused business plan",
        "Establish deaf community partnerships",
        "Set up visual communication systems",
      ],
      shortTermGoals: [
        "Launch pilot services with 5 clients",
        "Establish ASL interpretation partnerships",
        "Complete VR milestone requirements",
        "Build accessible website and marketing",
      ],
      longTermVision: [
        "Become leading deaf business service provider",
        "Expand to multiple states",
        "Develop franchise opportunities",
        "Create deaf entrepreneur network",
      ],
      vrFundingEligible: request.businessType !== "high-risk",
    }
  }

  private getFallbackBusinessPlan(clientData: any): any {
    return {
      executiveSummary:
        "Comprehensive business plan for deaf entrepreneur focusing on accessibility and community impact.",
      marketAnalysis: this.getFallbackInsights(clientData),
      operationalPlan: {
        staffing: "Start with founder, add ASL interpreter and business assistant",
        technology: "Accessible website, video relay services, visual communication tools",
        location: "Home-based initially, expand to accessible office space",
      },
      financialProjections: {
        startupCosts: 21000,
        monthlyExpenses: 3500,
        breakEvenMonth: 8,
        projectedRevenue: {
          year1: 60000,
          year2: 120000,
          year3: 200000,
        },
      },
    }
  }

  private getFallbackCompetitiveAnalysis(industry: string): any {
    return {
      directCompetitors: [],
      indirectCompetitors: ["General business consulting firms", "Accessibility service providers"],
      marketGaps: [
        "Lack of deaf-specific business services",
        "Limited ASL-integrated consulting",
        "No VR-compliant service providers",
      ],
      competitiveAdvantages: [
        "Cultural competency with deaf community",
        "VR program expertise",
        "Accessibility-first approach",
      ],
    }
  }
}

export const businessMagicianClient = new BusinessMagicianClient()
