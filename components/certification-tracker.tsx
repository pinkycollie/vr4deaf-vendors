"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Award, Calendar, AlertTriangle, CheckCircle, Clock, RefreshCw } from "lucide-react"

interface Certification {
  id: string
  name: string
  status: "active" | "expiring" | "expired" | "pending"
  expiryDate: string
  ceuRequired: number
  ceuCompleted: number
  priority: "high" | "medium" | "low"
  required: boolean
}

interface CertificationTrackerProps {
  certifications: Certification[]
  showAlerts?: boolean
  compact?: boolean
}

export function CertificationTracker({
  certifications,
  showAlerts = true,
  compact = false,
}: CertificationTrackerProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "expiring":
        return "destructive"
      case "expired":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "expiring":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "expired":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  const expiringCertifications = certifications.filter((cert) => {
    const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate)
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0 && !dismissedAlerts.includes(cert.id)
  })

  const activeCertifications = certifications.filter((cert) => cert.status === "active").length
  const totalCertifications = certifications.length

  if (compact) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Certifications</p>
                <p className="text-sm text-gray-500">
                  {activeCertifications}/{totalCertifications} Active
                </p>
              </div>
            </div>
            {expiringCertifications.length > 0 && (
              <Badge variant="destructive">{expiringCertifications.length} Expiring</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Expiring Alerts */}
      {showAlerts && expiringCertifications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Certification Alerts</h3>
          {expiringCertifications.map((cert) => {
            const daysUntilExpiry = getDaysUntilExpiry(cert.expiryDate)
            return (
              <Alert key={cert.id} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{cert.name} Expiring Soon</AlertTitle>
                <AlertDescription className="flex justify-between items-center">
                  <div>
                    <p>
                      Your certification expires in {daysUntilExpiry} days ({cert.expiryDate})
                    </p>
                    <p className="text-sm mt-1">
                      CEU Progress: {cert.ceuCompleted}/{cert.ceuRequired} completed
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDismissedAlerts([...dismissedAlerts, cert.id])}
                    >
                      Dismiss
                    </Button>
                    <Button size="sm">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Renew
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )
          })}
        </div>
      )}

      {/* Certification Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Certification Overview</span>
          </CardTitle>
          <CardDescription>Track your professional certifications and renewal status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{activeCertifications}</div>
              <div className="text-sm text-green-700">Active Certifications</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{expiringCertifications.length}</div>
              <div className="text-sm text-orange-700">Expiring Soon</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((activeCertifications / totalCertifications) * 100)}%
              </div>
              <div className="text-sm text-blue-700">Compliance Rate</div>
            </div>
          </div>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(cert.status)}
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-gray-500">Expires: {cert.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(cert.status)}>{cert.status}</Badge>
                    {cert.required && (
                      <Badge variant="outline" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CEU Progress</span>
                    <span>
                      {cert.ceuCompleted}/{cert.ceuRequired}
                    </span>
                  </div>
                  <Progress value={(cert.ceuCompleted / cert.ceuRequired) * 100} className="h-2" />
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">{cert.ceuRequired - cert.ceuCompleted} CEUs remaining</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                    {cert.status === "expiring" && (
                      <Button size="sm">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Renew
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
