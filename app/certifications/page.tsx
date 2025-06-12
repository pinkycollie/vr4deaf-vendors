"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Award,
  Clock,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Shield,
  FileText,
  Bell,
  CalendarDays,
} from "lucide-react"
import Link from "next/link"

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const certifications = [
    {
      id: "CERT-001",
      name: "ASL Interpreter Certification",
      category: "Language Services",
      level: "Professional",
      issuingBody: "Registry of Interpreters for the Deaf (RID)",
      certificationNumber: "RID-2024-001234",
      issueDate: "2022-01-15",
      expiryDate: "2026-01-15",
      status: "active",
      renewalRequired: true,
      renewalPeriod: "4 years",
      ceuRequired: 80,
      ceuCompleted: 65,
      lastRenewal: "2022-01-15",
      nextRenewal: "2026-01-15",
      priority: "high",
      required: true,
      documents: ["rid-certificate.pdf", "ceu-transcript.pdf"],
    },
    {
      id: "CERT-002",
      name: "Certified Rehabilitation Counselor (CRC)",
      category: "Counseling",
      level: "Professional",
      issuingBody: "Commission on Rehabilitation Counselor Certification",
      certificationNumber: "CRC-2023-005678",
      issueDate: "2023-03-10",
      expiryDate: "2028-03-10",
      status: "active",
      renewalRequired: true,
      renewalPeriod: "5 years",
      ceuRequired: 100,
      ceuCompleted: 45,
      lastRenewal: "2023-03-10",
      nextRenewal: "2028-03-10",
      priority: "medium",
      required: true,
      documents: ["crc-certificate.pdf"],
    },
    {
      id: "CERT-003",
      name: "Certified Vocational Evaluation Specialist (CVE)",
      category: "Assessment",
      level: "Specialist",
      issuingBody: "Vocational Evaluation and Career Assessment Professionals",
      certificationNumber: "CVE-2023-009876",
      issueDate: "2023-06-20",
      expiryDate: "2025-06-20",
      status: "expiring",
      renewalRequired: true,
      renewalPeriod: "2 years",
      ceuRequired: 40,
      ceuCompleted: 38,
      lastRenewal: "2023-06-20",
      nextRenewal: "2025-06-20",
      priority: "high",
      required: false,
      documents: ["cve-certificate.pdf", "ceu-log.pdf"],
    },
    {
      id: "CERT-004",
      name: "Assistive Technology Professional (ATP)",
      category: "Technology",
      level: "Professional",
      issuingBody: "Rehabilitation Engineering and Assistive Technology Society",
      certificationNumber: "ATP-2024-001122",
      issueDate: "2024-01-05",
      expiryDate: "2027-01-05",
      status: "active",
      renewalRequired: true,
      renewalPeriod: "3 years",
      ceuRequired: 60,
      ceuCompleted: 12,
      lastRenewal: "2024-01-05",
      nextRenewal: "2027-01-05",
      priority: "low",
      required: false,
      documents: ["atp-certificate.pdf"],
    },
    {
      id: "CERT-005",
      name: "Deaf Culture and Community Specialist",
      category: "Cultural Competency",
      level: "Specialist",
      issuingBody: "National Association of the Deaf",
      certificationNumber: "DCCS-2023-004455",
      issueDate: "2023-09-15",
      expiryDate: "2025-09-15",
      status: "active",
      renewalRequired: true,
      renewalPeriod: "2 years",
      ceuRequired: 30,
      ceuCompleted: 25,
      lastRenewal: "2023-09-15",
      nextRenewal: "2025-09-15",
      priority: "medium",
      required: true,
      documents: ["dccs-certificate.pdf", "cultural-training.pdf"],
    },
  ]

  const renewalAlerts = [
    {
      id: "ALERT-001",
      certificationId: "CERT-003",
      certificationName: "Certified Vocational Evaluation Specialist (CVE)",
      type: "expiring_soon",
      daysUntilExpiry: 45,
      message: "Your CVE certification expires in 45 days. Start renewal process now.",
      priority: "high",
      actionRequired: "Submit renewal application and complete 2 remaining CEUs",
    },
    {
      id: "ALERT-002",
      certificationId: "CERT-001",
      certificationName: "ASL Interpreter Certification",
      type: "ceu_deadline",
      daysUntilExpiry: 365,
      message: "You need 15 more CEUs to meet renewal requirements.",
      priority: "medium",
      actionRequired: "Complete 15 CEUs before renewal deadline",
    },
    {
      id: "ALERT-003",
      certificationId: "CERT-005",
      certificationName: "Deaf Culture and Community Specialist",
      type: "renewal_reminder",
      daysUntilExpiry: 180,
      message: "Renewal period opens in 6 months. Plan your CEU completion.",
      priority: "low",
      actionRequired: "Complete 5 remaining CEUs",
    },
  ]

  const certificationCategories = [
    {
      name: "Language Services",
      count: 1,
      required: 1,
      description: "ASL interpretation and communication services",
    },
    {
      name: "Counseling",
      count: 1,
      required: 1,
      description: "Rehabilitation counseling and guidance",
    },
    {
      name: "Assessment",
      count: 1,
      required: 0,
      description: "Vocational evaluation and assessment",
    },
    {
      name: "Technology",
      count: 1,
      required: 0,
      description: "Assistive technology and adaptive equipment",
    },
    {
      name: "Cultural Competency",
      count: 1,
      required: 1,
      description: "Deaf culture and community understanding",
    },
  ]

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
      case "suspended":
        return "destructive"
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
      case "suspended":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const activeCertifications = certifications.filter((cert) => cert.status === "active").length
  const expiringCertifications = certifications.filter((cert) => cert.status === "expiring").length
  const totalCeuRequired = certifications.reduce((sum, cert) => sum + cert.ceuRequired, 0)
  const totalCeuCompleted = certifications.reduce((sum, cert) => sum + cert.ceuCompleted, 0)
  const ceuProgress = (totalCeuCompleted / totalCeuRequired) * 100

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
              <Link href="/credentials" className="text-gray-600 hover:text-blue-600">
                Credentials
              </Link>
              <Link href="/certifications" className="text-blue-600 font-medium">
                Certifications
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
            <h1 className="text-3xl font-bold text-gray-900">Certification Management</h1>
            <p className="text-gray-600 mt-2">Track and manage your professional certifications and renewals</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Certificate
            </Button>
            <Button>
              <Award className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </div>

        {/* Renewal Alerts */}
        {renewalAlerts.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Renewal Alerts</h2>
            {renewalAlerts.map((alert) => (
              <Alert key={alert.id} variant={alert.priority === "high" ? "destructive" : "default"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{alert.certificationName}</AlertTitle>
                <AlertDescription className="flex justify-between items-center">
                  <div>
                    <p>{alert.message}</p>
                    <p className="text-sm mt-1">
                      <strong>Action Required:</strong> {alert.actionRequired}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Renew
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certifications">All Certifications</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
            <TabsTrigger value="ceu-tracking">CEU Tracking</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Overview Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Certifications</p>
                      <p className="text-3xl font-bold text-green-600">{activeCertifications}</p>
                    </div>
                    <Award className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                      <p className="text-3xl font-bold text-orange-600">{expiringCertifications}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">CEU Progress</p>
                      <p className="text-3xl font-bold text-blue-600">{Math.round(ceuProgress)}%</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Compliance Status</p>
                      <p className="text-3xl font-bold text-green-600">100%</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certification Categories */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Certification Categories</CardTitle>
                <CardDescription>Overview of certifications by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificationCategories.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{category.name}</h4>
                        <Badge variant={category.count >= category.required ? "default" : "destructive"}>
                          {category.count}/{category.required}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{category.description}</p>
                      <div className="mt-2">
                        <Progress
                          value={category.required > 0 ? (category.count / category.required) * 100 : 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Certification Activity</CardTitle>
                <CardDescription>Latest updates and actions on your certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Certificate Uploaded",
                      certification: "Assistive Technology Professional (ATP)",
                      date: "2024-01-05",
                      status: "completed",
                    },
                    {
                      action: "CEU Completed",
                      certification: "ASL Interpreter Certification",
                      date: "2024-01-03",
                      status: "completed",
                    },
                    {
                      action: "Renewal Reminder Sent",
                      certification: "Certified Vocational Evaluation Specialist",
                      date: "2024-01-01",
                      status: "pending",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.certification}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Certifications</CardTitle>
                <CardDescription>Complete list of your professional certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certification</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>CEU Progress</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certifications.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{cert.name}</div>
                            <div className="text-sm text-gray-500">{cert.issuingBody}</div>
                            <div className="text-xs text-gray-400">#{cert.certificationNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{cert.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(cert.status)}
                            <Badge variant={getStatusColor(cert.status)}>{cert.status}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={cert.status === "expiring" ? "text-red-600 font-medium" : ""}>
                            {cert.expiryDate}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{cert.ceuCompleted}</span>
                              <span>{cert.ceuRequired}</span>
                            </div>
                            <Progress value={(cert.ceuCompleted / cert.ceuRequired) * 100} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {cert.required ? (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Optional
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renewals" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Renewals</CardTitle>
                  <CardDescription>Certifications requiring renewal in the next 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications
                      .filter((cert) => {
                        const expiryDate = new Date(cert.expiryDate)
                        const today = new Date()
                        const monthsUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)
                        return monthsUntilExpiry <= 12
                      })
                      .map((cert) => {
                        const expiryDate = new Date(cert.expiryDate)
                        const today = new Date()
                        const daysUntilExpiry = Math.ceil(
                          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
                        )

                        return (
                          <div key={cert.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{cert.name}</h4>
                              <Badge variant={daysUntilExpiry <= 90 ? "destructive" : "default"}>
                                {daysUntilExpiry} days
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{cert.issuingBody}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">
                                CEU Progress: {cert.ceuCompleted}/{cert.ceuRequired}
                              </span>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <CalendarDays className="w-4 h-4 mr-1" />
                                  Schedule
                                </Button>
                                <Button size="sm">
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  Renew
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Renewal Calendar</CardTitle>
                  <CardDescription>Visual timeline of certification renewals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert) => {
                      const expiryDate = new Date(cert.expiryDate)
                      const today = new Date()
                      const daysUntilExpiry = Math.ceil(
                        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
                      )

                      return (
                        <div key={cert.id} className="flex items-center space-x-4">
                          <div className="w-20 text-sm text-gray-500">{cert.expiryDate}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  daysUntilExpiry <= 90
                                    ? "bg-red-500"
                                    : daysUntilExpiry <= 180
                                      ? "bg-orange-500"
                                      : "bg-green-500"
                                }`}
                              />
                              <span className="font-medium">{cert.name}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Bell className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ceu-tracking" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>CEU Progress Tracking</CardTitle>
                  <CardDescription>Track continuing education units for each certification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{cert.name}</h4>
                            <p className="text-sm text-gray-600">Renewal: {cert.nextRenewal}</p>
                          </div>
                          <Badge variant={cert.ceuCompleted >= cert.ceuRequired ? "default" : "secondary"}>
                            {cert.ceuCompleted}/{cert.ceuRequired} CEUs
                          </Badge>
                        </div>
                        <Progress value={(cert.ceuCompleted / cert.ceuRequired) * 100} className="h-3 mb-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {cert.ceuRequired - cert.ceuCompleted} CEUs remaining
                          </span>
                          <Button size="sm" variant="outline">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Log CEUs
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CEU Summary</CardTitle>
                  <CardDescription>Overall continuing education progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{totalCeuCompleted}</div>
                      <div className="text-sm text-blue-700">Total CEUs Completed</div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-600">{totalCeuRequired}</div>
                      <div className="text-sm text-gray-700">Total CEUs Required</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{Math.round(ceuProgress)}%</span>
                      </div>
                      <Progress value={ceuProgress} className="h-3" />
                    </div>

                    <Button className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Find CEU Opportunities
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>VR Vendor Certification Requirements</CardTitle>
                <CardDescription>Required and recommended certifications for VR service providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      category: "Required Certifications",
                      certifications: [
                        {
                          name: "ASL Interpreter Certification",
                          description: "RID or equivalent certification for ASL interpretation services",
                          renewalPeriod: "4 years",
                          ceuRequired: "80 CEUs",
                          status: "held",
                        },
                        {
                          name: "Certified Rehabilitation Counselor (CRC)",
                          description: "Professional certification for rehabilitation counseling",
                          renewalPeriod: "5 years",
                          ceuRequired: "100 CEUs",
                          status: "held",
                        },
                        {
                          name: "Deaf Culture and Community Specialist",
                          description: "Specialized training in deaf culture and community",
                          renewalPeriod: "2 years",
                          ceuRequired: "30 CEUs",
                          status: "held",
                        },
                      ],
                    },
                    {
                      category: "Recommended Certifications",
                      certifications: [
                        {
                          name: "Certified Vocational Evaluation Specialist (CVE)",
                          description: "Specialized certification for vocational assessment",
                          renewalPeriod: "2 years",
                          ceuRequired: "40 CEUs",
                          status: "held",
                        },
                        {
                          name: "Assistive Technology Professional (ATP)",
                          description: "Certification for assistive technology services",
                          renewalPeriod: "3 years",
                          ceuRequired: "60 CEUs",
                          status: "held",
                        },
                        {
                          name: "Certified Employment Support Professional",
                          description: "Certification for supported employment services",
                          renewalPeriod: "3 years",
                          ceuRequired: "45 CEUs",
                          status: "not_held",
                        },
                      ],
                    },
                  ].map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">{section.category}</h3>
                      <div className="space-y-4">
                        {section.certifications.map((cert, certIndex) => (
                          <div key={certIndex} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{cert.name}</h4>
                              <Badge variant={cert.status === "held" ? "default" : "outline"}>
                                {cert.status === "held" ? "Held" : "Not Held"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                              <div>
                                <strong>Renewal:</strong> {cert.renewalPeriod}
                              </div>
                              <div>
                                <strong>CEUs:</strong> {cert.ceuRequired}
                              </div>
                            </div>
                            {cert.status === "not_held" && (
                              <Button size="sm" variant="outline" className="w-full mt-3">
                                <Award className="w-4 h-4 mr-1" />
                                Pursue Certification
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
