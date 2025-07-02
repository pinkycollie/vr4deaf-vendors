"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface WorkflowTrackerProps {
  workflowId: string
}

export default function WorkflowTracker({ workflowId }: WorkflowTrackerProps) {
  const [workflow, setWorkflow] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkflowStatus = async () => {
      try {
        const response = await fetch(`/api/automation/workflow-status/${workflowId}`)
        const data = await response.json()
        setWorkflow(data)
      } catch (error) {
        console.error("Error fetching workflow status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflowStatus()

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchWorkflowStatus, 5000)
    return () => clearInterval(interval)
  }, [workflowId])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading workflow status...</span>
        </CardContent>
      </Card>
    )
  }

  if (!workflow) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Workflow not found</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      "in-progress": "secondary",
      failed: "destructive",
      pending: "outline",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>
  }

  const progressPercentage = (workflow.currentStep / workflow.totalSteps) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Automated Journey Progress</CardTitle>
            {getStatusBadge(workflow.status)}
          </div>
          <CardDescription>
            Step {workflow.currentStep} of {workflow.totalSteps} • Est. completion:{" "}
            {new Date(workflow.estimatedCompletion).toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="mb-4" />
          <div className="space-y-3">
            {workflow.steps.map((step: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                {getStatusIcon(step.status)}
                <div className="flex-1">
                  <div className="font-medium">{step.name}</div>
                  {step.duration && (
                    <div className="text-sm text-muted-foreground">
                      Completed in {(step.duration / 1000).toFixed(1)}s
                    </div>
                  )}
                </div>
                {getStatusBadge(step.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      {workflow.results && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* AI Analysis Results */}
          {workflow.results.aiAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Confidence Score</div>
                    <div className="text-2xl font-bold text-green-600">
                      {(workflow.results.aiAnalysis.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">VR Eligibility Score</div>
                    <div className="text-xl font-semibold">{workflow.results.aiAnalysis.vrEligibilityScore}/100</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Priority Level</div>
                    <Badge variant={workflow.results.aiAnalysis.urgencyLevel === "high" ? "destructive" : "secondary"}>
                      {workflow.results.aiAnalysis.urgencyLevel}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* VR Matches */}
          {workflow.results.vrMatches && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">VR Office Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflow.results.vrMatches.map((match: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{match.officeName}</div>
                        <Badge variant="outline">{match.matchScore}/100</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {match.distance} miles • {match.estimatedWaitTime}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Account Info */}
          {workflow.results.account && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Account Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm font-medium">Username</div>
                    <div className="font-mono text-sm">{workflow.results.account.username}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Access Level</div>
                    <Badge variant={workflow.results.account.accessLevel === "locked" ? "outline" : "default"}>
                      {workflow.results.account.accessLevel}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Services Enabled</div>
                    <div className="text-sm">{workflow.results.account.servicesEnabled.length} services</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
