"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3 } from "lucide-react"
import Link from "next/link"

interface OutcomeMetric {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  target: string
  status: "above" | "below" | "meeting"
}

export function OutcomeMetricsWidget() {
  const metrics: OutcomeMetric[] = [
    {
      label: "Placement Rate",
      value: "87.5%",
      change: "+5.2%",
      trend: "up",
      target: "80%",
      status: "above",
    },
    {
      label: "90-Day Retention",
      value: "92.3%",
      change: "+2.1%",
      trend: "up",
      target: "85%",
      status: "above",
    },
    {
      label: "Avg. Salary Growth",
      value: "12.8%",
      change: "+1.5%",
      trend: "up",
      target: "10%",
      status: "above",
    },
    {
      label: "Client Satisfaction",
      value: "8.4/10",
      change: "+0.3",
      trend: "up",
      target: "8.0",
      status: "above",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "above":
        return "default"
      case "meeting":
        return "secondary"
      case "below":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
      default:
        return <TrendingUp className="h-3 w-3 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>VR Outcomes</span>
            </CardTitle>
            <CardDescription>Key performance indicators for employment outcomes</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/outcomes">View Details</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <Badge variant={getStatusColor(metric.status)} className="text-xs">
                    {metric.status === "above"
                      ? "Above Target"
                      : metric.status === "meeting"
                        ? "Meeting Target"
                        : "Below Target"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{metric.value}</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className="text-xs text-gray-600">{metric.change}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Target: {metric.target}</div>
              </div>
            </div>
          ))}

          <div className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/outcomes/analyze">
                <BarChart3 className="w-4 h-4 mr-2" />
                Run New Analysis
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
