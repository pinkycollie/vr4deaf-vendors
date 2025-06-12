"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TrendingUp, Users, Target, AlertCircle, CheckCircle, BarChart3, Download } from "lucide-react"
import Link from "next/link"

export default function OutcomeTrackingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-year")
  const [selectedService, setSelectedService] = useState("all")
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  // Sample client outcome data
  const clientOutcomes = [
    {
      id: "VR-2024-001",
      name: "Sarah Johnson",
      disability: "Deaf/Hard of Hearing",
      services: ["ASL Interpretation", "Job Coaching"],
      startDate: "2023-06-15",
      placementDate: "2023-12-10",
      employer: "Austin Tech Solutions",
      position: "Software Developer",
      startingSalary: 65000,
      currentSalary: 68000,
      retentionStatus: "employed",
      monthsEmployed: 8,
      satisfactionScore: 9,
    },
    {
      id: "VR-2024-002",
      name: "Michael Chen",
      disability: "Visual Impairment",
      services: ["Assistive Technology", "Skills Training"],
      startDate: "2023-08-01",
      placementDate: "2024-01-15",
      employer: "DataFlow Analytics",
      position: "Data Analyst",
      startingSalary: 58000,
      currentSalary: 58000,
      retentionStatus: "employed",
      monthsEmployed: 3,
      satisfactionScore: 8,
    },
    {
      id: "VR-2024-003",
      name: "Emily Rodriguez",
      disability: "Intellectual Disability",
      services: ["Supported Employment"],
      startDate: "2023-05-01",
      placementDate: "2023-09-20",
      employer: "Community Market",
      position: "Customer Service Associate",
      startingSalary: 32000,
      currentSalary: 34000,
      retentionStatus: "employed",
      monthsEmployed: 12,
      satisfactionScore: 10,
    },
    {
      id: "VR-2024-004",
      name: "Robert Taylor",
      disability: "Deaf/Hard of Hearing",
      services: ["Self-Employment Services"],
      startDate: "2023-04-01",
      placementDate: "2023-11-01",
      employer: "Self-Employed",
      position: "Freelance Graphic Designer",
      startingSalary: 45000,
      currentSalary: 52000,
      retentionStatus: "self-employed",
      monthsEmployed: 10,
      satisfactionScore: 9,
    },
    {
      id: "VR-2024-005",
      name: "Lisa Park",
      disability: "Physical Disability",
      services: ["Job Coaching", "Workplace Accommodations"],
      startDate: "2023-07-01",
      placementDate: "2023-12-15",
      employer: "Regional Hospital",
      position: "Medical Records Specialist",
      startingSalary: 42000,
      currentSalary: 43500,
      retentionStatus: "employed",
      monthsEmployed: 6,
      satisfactionScore: 8,
    },
  ]

  const generateOutcomeAnalysis = () => {
    const totalClients = clientOutcomes.length
    const placedClients = clientOutcomes.filter((c) => c.placementDate).length
    const retainedClients = clientOutcomes.filter(
      (c) => c.retentionStatus === "employed" || c.retentionStatus === "self-employed",
    ).length

    const placementRate = (placedClients / totalClients) * 100
    const retentionRate = (retainedClients / placedClients) * 100

    const avgStartingSalary = clientOutcomes.reduce((sum, c) => sum + c.startingSalary, 0) / totalClients
    const avgCurrentSalary = clientOutcomes.reduce((sum, c) => sum + c.currentSalary, 0) / totalClients
    const salaryGrowth = ((avgCurrentSalary - avgStartingSalary) / avgStartingSalary) * 100

    const avgSatisfaction = clientOutcomes.reduce((sum, c) => sum + c.satisfactionScore, 0) / totalClients

    const avgTimeToPlacement =
      clientOutcomes.reduce((sum, c) => {
        const start = new Date(c.startDate)
        const placement = new Date(c.placementDate)
        const months = (placement.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)
        return sum + months
      }, 0) / placedClients

    // Generate recommendations based on analysis
    const recommendations = []

    if (placementRate < 80) {
      recommendations.push({
        type: "warning",
        title: "Placement Rate Below Target",
        message: `Current placement rate of ${placementRate.toFixed(1)}% is below the 80% target. Consider reviewing service delivery methods.`,
        action: "Review client assessment and service matching processes",
      })
    }

    if (retentionRate < 85) {
      recommendations.push({
        type: "warning",
        title: "Retention Rate Needs Improvement",
        message: `Retention rate of ${retentionRate.toFixed(1)}% could be improved. Focus on post-placement support.`,
        action: "Implement enhanced follow-up services and workplace support",
      })
    }

    if (avgTimeToPlacement > 6) {
      recommendations.push({
        type: "info",
        title: "Time to Placement Optimization",
        message: `Average time to placement is ${avgTimeToPlacement.toFixed(1)} months. Consider streamlining processes.`,
        action: "Analyze service delivery timeline and identify bottlenecks",
      })
    }

    if (salaryGrowth > 5) {
      recommendations.push({
        type: "success",
        title: "Excellent Salary Progression",
        message: `Clients show ${salaryGrowth.toFixed(1)}% salary growth, indicating successful career advancement.`,
        action: "Document and replicate successful advancement strategies",
      })
    }

    setAnalysisResults({
      totalClients,
      placedClients,
      retainedClients,
      placementRate,
      retentionRate,
      avgStartingSalary,
      avgCurrentSalary,
      salaryGrowth,
      avgSatisfaction,
      avgTimeToPlacement,
      recommendations,
    })
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "info":
        return <Target className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getRecommendationVariant = (type: string) => {
    switch (type) {
      case "success":
        return "default"
      case "warning":
        return "destructive"
      case "info":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-900">
                VR4Deaf Vendor Portal
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/clients" className="text-gray-600 hover:text-blue-600">
                Clients
              </Link>
              <Link href="/outcomes" className="text-blue-600 font-medium">
                Outcomes
              </Link>
              <Link href="/reports" className="text-gray-600 hover:text-blue-600">
                Reports
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">VR Outcome Tracking</h1>
            <p className="text-gray-600 mt-2">
              Analyze employment outcomes and generate insights for service improvement
            </p>
          </div>
          <Button onClick={generateOutcomeAnalysis}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Analysis
          </Button>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Outcome Analysis</TabsTrigger>
            <TabsTrigger value="clients">Client Outcomes</TabsTrigger>
            <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Analysis Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Parameters</CardTitle>
                  <CardDescription>Configure your outcome analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="period">Analysis Period</Label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-year">Current Year</SelectItem>
                        <SelectItem value="last-year">Last Year</SelectItem>
                        <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Type</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="asl-interpretation">ASL Interpretation</SelectItem>
                        <SelectItem value="job-coaching">Job Coaching</SelectItem>
                        <SelectItem value="supported-employment">Supported Employment</SelectItem>
                        <SelectItem value="self-employment">Self-Employment Services</SelectItem>
                        <SelectItem value="assistive-technology">Assistive Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disability">Disability Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Disabilities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Disabilities</SelectItem>
                        <SelectItem value="deaf-hoh">Deaf/Hard of Hearing</SelectItem>
                        <SelectItem value="visual">Visual Impairment</SelectItem>
                        <SelectItem value="intellectual">Intellectual Disability</SelectItem>
                        <SelectItem value="physical">Physical Disability</SelectItem>
                        <SelectItem value="mental-health">Mental Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={generateOutcomeAnalysis} className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Run Analysis
                  </Button>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className="lg:col-span-2 space-y-6">
                {analysisResults && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Placement Rate</p>
                              <p className="text-2xl font-bold text-green-600">
                                {analysisResults.placementRate.toFixed(1)}%
                              </p>
                            </div>
                            <Target className="h-6 w-6 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
                              <p className="text-2xl font-bold text-blue-600">
                                {analysisResults.retentionRate.toFixed(1)}%
                              </p>
                            </div>
                            <Users className="h-6 w-6 text-blue-500" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Salary Growth</p>
                              <p className="text-2xl font-bold text-purple-600">
                                {analysisResults.salaryGrowth.toFixed(1)}%
                              </p>
                            </div>
                            <TrendingUp className="h-6 w-6 text-purple-500" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Avg. Satisfaction</p>
                              <p className="text-2xl font-bold text-orange-600">
                                {analysisResults.avgSatisfaction.toFixed(1)}/10
                              </p>
                            </div>
                            <CheckCircle className="h-6 w-6 text-orange-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Detailed Analysis Results</CardTitle>
                        <CardDescription>Comprehensive breakdown of employment outcomes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-blue-900 mb-2">Employment Metrics</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Total Clients Served:</span>
                                  <span className="font-medium">{analysisResults.totalClients}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Successfully Placed:</span>
                                  <span className="font-medium">{analysisResults.placedClients}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Currently Retained:</span>
                                  <span className="font-medium">{analysisResults.retainedClients}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Avg. Time to Placement:</span>
                                  <span className="font-medium">
                                    {analysisResults.avgTimeToPlacement.toFixed(1)} months
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold text-green-900 mb-2">Salary Analysis</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Avg. Starting Salary:</span>
                                  <span className="font-medium">
                                    ${analysisResults.avgStartingSalary.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Avg. Current Salary:</span>
                                  <span className="font-medium">
                                    ${analysisResults.avgCurrentSalary.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Salary Increase:</span>
                                  <span className="font-medium">
                                    $
                                    {(
                                      analysisResults.avgCurrentSalary - analysisResults.avgStartingSalary
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Growth Percentage:</span>
                                  <span className="font-medium">{analysisResults.salaryGrowth.toFixed(1)}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Client Outcome Details</CardTitle>
                    <CardDescription>Individual client employment outcomes and progression</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientOutcomes.map((client) => (
                    <div key={client.id} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-semibold">{client.name}</h4>
                          <p className="text-sm text-gray-600">{client.disability}</p>
                          <p className="text-xs text-gray-500">ID: {client.id}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Employment</p>
                          <p className="text-sm">{client.position}</p>
                          <p className="text-xs text-gray-600">{client.employer}</p>
                          <Badge variant="default" className="text-xs mt-1">
                            {client.monthsEmployed} months
                          </Badge>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Salary Progression</p>
                          <p className="text-sm">
                            ${client.startingSalary.toLocaleString()} → ${client.currentSalary.toLocaleString()}
                          </p>
                          <p className="text-xs text-green-600">
                            +
                            {(((client.currentSalary - client.startingSalary) / client.startingSalary) * 100).toFixed(
                              1,
                            )}
                            %
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Satisfaction</p>
                          <p className="text-sm">{client.satisfactionScore}/10</p>
                          <Badge
                            variant={client.retentionStatus === "employed" ? "default" : "secondary"}
                            className="text-xs mt-1"
                          >
                            {client.retentionStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              {analysisResults && analysisResults.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Insights & Recommendations</CardTitle>
                    <CardDescription>
                      Based on your outcome data analysis, here are actionable recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.recommendations.map((rec: any, index: number) => (
                        <Alert key={index} variant={getRecommendationVariant(rec.type)}>
                          {getRecommendationIcon(rec.type)}
                          <AlertTitle>{rec.title}</AlertTitle>
                          <AlertDescription>
                            <p className="mb-2">{rec.message}</p>
                            <p className="text-sm font-medium">Recommended Action: {rec.action}</p>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Benchmarking & Goals</CardTitle>
                  <CardDescription>Compare your outcomes against VR industry standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">TWS-VRS Performance Targets</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm">Employment Placement Rate</span>
                          <Badge variant="outline">≥ 80%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm">90-Day Retention Rate</span>
                          <Badge variant="outline">≥ 85%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm">Client Satisfaction</span>
                          <Badge variant="outline">≥ 8.0/10</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm">Time to Placement</span>
                          <Badge variant="outline">≤ 6 months</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Your Performance</h4>
                      <div className="space-y-3">
                        {analysisResults && (
                          <>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                              <span className="text-sm">Employment Placement Rate</span>
                              <Badge variant={analysisResults.placementRate >= 80 ? "default" : "destructive"}>
                                {analysisResults.placementRate.toFixed(1)}%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                              <span className="text-sm">90-Day Retention Rate</span>
                              <Badge variant={analysisResults.retentionRate >= 85 ? "default" : "destructive"}>
                                {analysisResults.retentionRate.toFixed(1)}%
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                              <span className="text-sm">Client Satisfaction</span>
                              <Badge variant={analysisResults.avgSatisfaction >= 8 ? "default" : "destructive"}>
                                {analysisResults.avgSatisfaction.toFixed(1)}/10
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                              <span className="text-sm">Time to Placement</span>
                              <Badge variant={analysisResults.avgTimeToPlacement <= 6 ? "default" : "destructive"}>
                                {analysisResults.avgTimeToPlacement.toFixed(1)} months
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Improvement Strategies</CardTitle>
                  <CardDescription>Evidence-based strategies for improving VR outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-green-700">Best Practices for Deaf/HoH Clients</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Provide qualified ASL interpreters for all job interviews</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Educate employers on deaf culture and communication preferences</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Implement visual workplace accommodation assessments</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Establish peer mentorship programs with deaf professionals</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-700">Retention Enhancement Strategies</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>Conduct 30, 60, and 90-day follow-up assessments</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>Provide ongoing workplace support and advocacy</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>Facilitate employer-employee communication training</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>Monitor accommodation effectiveness and adjust as needed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
