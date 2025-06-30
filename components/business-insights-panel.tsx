"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, DollarSign, Users, Brain, Sparkles } from "lucide-react"

interface BusinessInsight {
  marketAnalysis: {
    size: string
    trends: string[]
    opportunities: string[]
    accessibilityConsiderations: string[]
  }
  competitiveAnalysis: {
    competitors: string[]
    differentiators: string[]
    accessibilityGaps: string[]
  }
  financialProjections: {
    startupCosts: Record<string, number>
    revenueProjections: Record<string, number>
    vrFundingEligibility: boolean
    ableAccountIntegration: boolean
  }
  recommendations: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
    accessibilityPriorities: string[]
  }
}

export default function BusinessInsightsPanel() {
  const [insights, setInsights] = useState<BusinessInsight | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateInsights = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/business-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: "service",
          location: "nationwide",
          targetMarket: "deaf_community",
          goals: ["accessibility", "growth", "compliance"],
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setInsights(data)
      }
    } catch (error) {
      console.error("Failed to generate insights:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <Sparkles className="h-4 w-4 text-blue-600" />
            Business Intelligence Dashboard
            <Badge variant="secondary" className="ml-auto">
              Claude AI + Business Magician
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {!insights ? (
            <div className="text-center py-8">
              <Button
                onClick={generateInsights}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? "Generating Insights..." : "Generate AI Business Insights"}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">Powered by Claude AI and Business Magician API</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Market Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Market Size: {insights.marketAnalysis.size}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Accessibility Opportunities:</p>
                    <div className="space-y-1">
                      {insights.marketAnalysis.accessibilityConsiderations.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Projections */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    Financial Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">VR Funding Eligible</span>
                    <Badge variant={insights.financialProjections.vrFundingEligibility ? "default" : "secondary"}>
                      {insights.financialProjections.vrFundingEligibility ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ABLE Account Integration</span>
                    <Badge variant={insights.financialProjections.ableAccountIntegration ? "default" : "secondary"}>
                      {insights.financialProjections.ableAccountIntegration ? "Available" : "N/A"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Competitive Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    Competitive Edge
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Accessibility Gaps in Market:</p>
                    <div className="space-y-1">
                      {insights.competitiveAnalysis.accessibilityGaps.map((gap, index) => (
                        <div key={index} className="text-xs bg-yellow-50 border border-yellow-200 rounded px-2 py-1">
                          {gap}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Accessibility Priorities:</p>
                    <div className="space-y-2">
                      {insights.recommendations.accessibilityPriorities.map((priority, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-xs">{priority}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
