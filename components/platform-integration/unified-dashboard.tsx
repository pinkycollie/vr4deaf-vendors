"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Accessibility,
  BarChart3,
} from "lucide-react"
import { PlatformAnalyticsEngine } from "@/lib/platform-integration/analytics-engine"

export default function UnifiedDashboard() {
  const [platformHealth, setPlatformHealth] = useState<Record<string, "healthy" | "warning" | "critical">>({})
  const [accessibilityReport, setAccessibilityReport] = useState<any>(null)
  const [culturalMetrics, setCulturalMetrics] = useState<any>(null)
  const [activeUsers, setActiveUsers] = useState<Record<string, number>>({})

  useEffect(() => {
    const analytics = PlatformAnalyticsEngine.getInstance()

    // Initialize monitoring
    analytics.initializeMonitoring()

    // Set up real-time updates
    const handleAnalyticsUpdate = (event: CustomEvent) => {
      updateDashboardData()
    }

    window.addEventListener("platformAnalyticsUpdate", handleAnalyticsUpdate as EventListener)

    // Initial data load
    updateDashboardData()

    // Cleanup
    return () => {
      window.removeEventListener("platformAnalyticsUpdate", handleAnalyticsUpdate as EventListener)
    }
  }, [])

  const updateDashboardData = () => {
    const analytics = PlatformAnalyticsEngine.getInstance()

    setPlatformHealth(analytics.getPlatformHealth())
    setAccessibilityReport(analytics.generateAccessibilityReport())
    setCulturalMetrics(analytics.getCulturalMetrics())
  }

  const getHealthIcon = (status: "healthy" | "warning" | "critical") => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getHealthColor = (status: "healthy" | "warning" | "critical") => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">VR4DEAF Platform Dashboard</h1>
            <p className="text-gray-600">Unified monitoring across all platforms</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Main Platform
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View AI Tools
            </Button>
          </div>
        </div>

        {/* Platform Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(platformHealth).map(([platform, status]) => (
            <Card key={platform} className="border-l-4 border-l-texas-red">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {platform.replace(/([A-Z])/g, " $1").trim()}
                </CardTitle>
                {getHealthIcon(status)}
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Badge className={getHealthColor(status)}>{status.toUpperCase()}</Badge>
                  <span className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="cultural">Cultural Metrics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Object.values(activeUsers).reduce((a, b) => a + b, 0)}</div>
                  <p className="text-xs text-muted-foreground">Across all platforms</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245ms</div>
                  <p className="text-xs text-muted-foreground">Across all endpoints</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cross-Platform Transitions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Accessibility className="h-5 w-5 mr-2" />
                  Accessibility Compliance Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                {accessibilityReport && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Score</span>
                      <Badge
                        className={
                          accessibilityReport.overallScore >= 95
                            ? "bg-green-100 text-green-800"
                            : accessibilityReport.overallScore >= 90
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {accessibilityReport.overallScore.toFixed(1)}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Platform Scores</h4>
                      {Object.entries(accessibilityReport.platformScores).map(([platform, score]) => (
                        <div key={platform} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{platform.replace(/([A-Z])/g, " $1").trim()}</span>
                          <span className="text-sm font-mono">{score}%</span>
                        </div>
                      ))}
                    </div>

                    {accessibilityReport.recommendations.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Recommendations</h4>
                        <ul className="text-sm space-y-1">
                          {accessibilityReport.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cultural" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cultural Competency Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                {culturalMetrics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Deaf Users</span>
                        <span className="font-mono">{culturalMetrics.totalDeafUsers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">ASL Preference</span>
                        <span className="font-mono">{culturalMetrics.aslPreference}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Culturally Competent Interactions</span>
                        <span className="font-mono">{culturalMetrics.culturallyCompetentInteractions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Accommodation Success Rate</span>
                        <span className="font-mono">{culturalMetrics.accommodationSuccessRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Performance charts and detailed metrics will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
