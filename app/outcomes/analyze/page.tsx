"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, FileText, BarChart3, TrendingUp, AlertCircle, CheckCircle, Target } from "lucide-react"
import Link from "next/link"

export default function OutcomeAnalyzer() {
  const [analysisType, setAnalysisType] = useState("")
  const [clientData, setClientData] = useState("")
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const runAnalysis = async () => {
    setIsAnalyzing(true)

    // Simulate analysis processing
    setTimeout(() => {
      const mockResults = {
        type: analysisType,
        summary: {
          totalClients: 15,
          placementRate: 87.5,
          retentionRate: 92.3,
          avgSalaryIncrease: 12.8,
          avgSatisfaction: 8.4,
        },
        insights: [
          {
            type: "success",
            title: "Strong Placement Performance",
            message: "Your placement rate of 87.5% exceeds the TWS-VRS target of 80%",
            recommendation: "Continue current assessment and matching strategies",
          },
          {
            type: "warning",
            title: "Salary Growth Opportunity",
            message: "Average salary increase of 12.8% is good but could be improved",
            recommendation: "Focus on career advancement planning and skills development",
          },
          {
            type: "info",
            title: "Retention Excellence",
            message: "92.3% retention rate demonstrates effective post-placement support",
            recommendation: "Document and share successful retention strategies",
          },
        ],
        recommendations: [
          "Implement quarterly career development check-ins",
          "Expand employer education on advancement opportunities",
          "Create peer mentorship program for career growth",
          "Develop salary negotiation training for clients",
        ],
      }

      setAnalysisResults(mockResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getInsightIcon = (type: string) => {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">VR Outcome Analyzer</h1>
          <p className="text-gray-600 mt-2">
            Upload client data or enter information to generate insights and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Analysis Configuration</CardTitle>
              <CardDescription>Set up your outcome analysis parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="analysisType">Analysis Type</Label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placement">Placement Rate Analysis</SelectItem>
                    <SelectItem value="retention">Retention Analysis</SelectItem>
                    <SelectItem value="salary">Salary Progression Analysis</SelectItem>
                    <SelectItem value="satisfaction">Client Satisfaction Analysis</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Outcome Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientData">Client Data Input</Label>
                <Textarea
                  id="clientData"
                  placeholder="Paste client outcome data (CSV format) or enter individual client information..."
                  value={clientData}
                  onChange={(e) => setClientData(e.target.value)}
                  rows={8}
                />
                <p className="text-xs text-gray-500">
                  Include: Client ID, Disability Type, Services, Placement Date, Salary, Retention Status
                </p>
              </div>

              <div className="space-y-2">
                <Label>File Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload CSV or Excel file</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>

              <Button onClick={runAnalysis} className="w-full" disabled={!analysisType || isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {isAnalyzing && (
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-blue-500 animate-pulse mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analyzing Your Data</h3>
                  <p className="text-gray-600">Processing client outcomes and generating insights...</p>
                </CardContent>
              </Card>
            )}

            {analysisResults && (
              <>
                {/* Summary Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Summary</CardTitle>
                    <CardDescription>Key performance indicators from your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{analysisResults.summary.placementRate}%</div>
                        <div className="text-sm text-blue-700">Placement Rate</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {analysisResults.summary.retentionRate}%
                        </div>
                        <div className="text-sm text-green-700">Retention Rate</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {analysisResults.summary.avgSalaryIncrease}%
                        </div>
                        <div className="text-sm text-purple-700">Salary Growth</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {analysisResults.summary.avgSatisfaction}/10
                        </div>
                        <div className="text-sm text-orange-700">Satisfaction</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>AI-generated insights from your outcome data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.insights.map((insight: any, index: number) => (
                        <Alert key={index}>
                          {getInsightIcon(insight.type)}
                          <AlertTitle>{insight.title}</AlertTitle>
                          <AlertDescription>
                            <p className="mb-2">{insight.message}</p>
                            <p className="text-sm font-medium">Recommendation: {insight.recommendation}</p>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Action Recommendations</CardTitle>
                    <CardDescription>Specific steps to improve your VR outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResults.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                            {index + 1}
                          </div>
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Export Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Export Results</CardTitle>
                    <CardDescription>Save your analysis for reporting and planning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Export PDF Report
                      </Button>
                      <Button variant="outline">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Export to Excel
                      </Button>
                      <Button variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Create Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!analysisResults && !isAnalyzing && (
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-gray-600">
                    Configure your analysis parameters and input client data to get started.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
