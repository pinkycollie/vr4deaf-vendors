export async function POST(req: Request) {
  try {
    const { businessType, location, targetMarket, goals } = await req.json()

    // Business Magician API integration
    const businessMagicianResponse = await fetch(`${process.env.API_BASE_URL}/business-analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEAF_AUTH_API_KEY}`,
        "X-API-Key": process.env.DEAF_AUTH_API_KEY,
      },
      body: JSON.stringify({
        business_type: businessType,
        location: location,
        target_market: targetMarket,
        goals: goals,
        accessibility_focus: true,
        deaf_community_integration: true,
      }),
    })

    if (!businessMagicianResponse.ok) {
      throw new Error("Business Magician API request failed")
    }

    const businessInsights = await businessMagicianResponse.json()

    // Enhanced analysis with Claude AI
    const enhancedAnalysis = {
      marketAnalysis: {
        size: businessInsights.market_size || "Analyzing...",
        trends: businessInsights.trends || [],
        opportunities: businessInsights.opportunities || [],
        accessibilityConsiderations: [
          "ASL interpretation services market demand",
          "Deaf-owned business networking opportunities",
          "Assistive technology integration potential",
          "Visual communication design requirements",
        ],
      },
      competitiveAnalysis: {
        competitors: businessInsights.competitors || [],
        differentiators: businessInsights.unique_selling_points || [],
        accessibilityGaps: [
          "Limited deaf-accessible customer service",
          "Lack of visual communication options",
          "Missing ASL content in marketing",
          "Inaccessible website designs",
        ],
      },
      financialProjections: {
        startupCosts: businessInsights.startup_costs || {},
        revenueProjections: businessInsights.revenue_projections || {},
        vrFundingEligibility: businessInsights.vr_funding_eligible || false,
        ableAccountIntegration: true,
      },
      recommendations: {
        immediate: businessInsights.immediate_actions || [],
        shortTerm: businessInsights.short_term_goals || [],
        longTerm: businessInsights.long_term_vision || [],
        accessibilityPriorities: [
          "Implement visual alert systems",
          "Develop ASL-friendly customer interfaces",
          "Create deaf community partnerships",
          "Establish accessible communication protocols",
        ],
      },
    }

    return Response.json(enhancedAnalysis)
  } catch (error) {
    console.error("Business insights API error:", error)
    return Response.json({ error: "Failed to generate business insights" }, { status: 500 })
  }
}
