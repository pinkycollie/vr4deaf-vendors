"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Download, FileText, BarChart3, TrendingUp, Users, DollarSign, CalendarDays } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState("")

  const recentReports = [
    {
      id: "RPT-2024-001",
      title: "Monthly VR Services Report - January 2024",
      type: "Monthly Summary",
      generatedDate: "2024-02-01",
      status: "submitted",
      submittedTo: "TWS-VRS Austin Office",
      dueDate: "2024-02-05",
    },
    {
      id: "RPT-2024-002",
      title: "Client Outcomes Report - Q4 2023",
      type: "Quarterly Outcomes",
      generatedDate: "2024-01-15",
      status: "approved",
      submittedTo: "TWS-VRS Regional Office",
      dueDate: "2024-01-31",
    },
    {
      id: "RPT-2024-003",
      title: "Self-Employment Services Progress",
      type: "Program Specific",
      generatedDate: "2024-01-20",
      status: "draft",
      submittedTo: "Pending Review",
      dueDate: "2024-01-25",
    },
  ]

  const reportMetrics = [
    { title: "Total Clients Served", value: "24", change: "+12%", icon: Users },
    { title: "Successful Placements", value: "18", change: "+25%", icon: TrendingUp },
    { title: "Service Hours Delivered", value: "1,247", change: "+8%", icon: BarChart3 },
    { title: "Revenue Generated", value: "$45,230", change: "+15%", icon: DollarSign },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default"
      case "approved":
        return "outline"
      case "draft":
        return "secondary"
      case "overdue":
        return "destructive"
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
              <Link href="/applications" className="text-gray-600 hover:text-blue-600">
                Applications
              </Link>
              <Link href="/clients" className="text-gray-600 hover:text-blue-600">
                Clients
              </Link>
              <Link href="/reports" className="text-blue-600 font-medium">
                Reports
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">VR Reporting Dashboard</h1>
            <p className="text-gray-600 mt-2">Generate and manage reports for TWS-VRS compliance</p>
          </div>
        </div>

        {/* Report Deadline Alerts */}
        <div className="space-y-4 mb-8">
          <Alert variant="destructive">
            <Calendar className="h-4 w-4" />
            <AlertTitle>Report Due Tomorrow</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>Monthly VR Services Report for January 2024 is due tomorrow (February 5, 2024).</span>
              <Button size="sm" variant="outline">
                Generate Now
              </Button>
            </AlertDescription>
          </Alert>

          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>Upcoming Deadline</AlertTitle>
            <AlertDescription>
              Quarterly Client Outcomes Report is due in 10 days (February 15, 2024). Start preparing your submission
              early.
            </AlertDescription>
          </Alert>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {reportMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-green-600">{metric.change} from last period</p>
                    </div>
                    <IconComponent className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generate New Report */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>Create reports for TWS-VRS submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Summary</SelectItem>
                    <SelectItem value="quarterly">Quarterly Outcomes</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                    <SelectItem value="self-employment">Self-Employment Services</SelectItem>
                    <SelectItem value="client-outcomes">Client Outcomes</SelectItem>
                    <SelectItem value="financial">Financial Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateRange">Reporting Period</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="current-quarter">Current Quarter</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input type="date" id="startDate" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input type="date" id="endDate" />
              </div>

              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full">
                <CalendarDays className="w-4 h-4 mr-2" />
                Add Deadline to Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Your submitted and pending VR reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-gray-500">Generated: {report.generatedDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                      </TableCell>
                      <TableCell>{report.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" title="Add to Calendar">
                            <CalendarDays className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Required VR Reports</CardTitle>
            <CardDescription>Standard reports required by TWS-VRS for vendor compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Monthly Service Summary",
                  description: "Summary of all VR services provided during the month",
                  frequency: "Monthly",
                  dueDate: "5th of following month",
                  required: true,
                },
                {
                  title: "Client Outcomes Report",
                  description: "Detailed outcomes for clients who completed services",
                  frequency: "Quarterly",
                  dueDate: "15 days after quarter end",
                  required: true,
                },
                {
                  title: "Self-Employment Progress",
                  description: "Progress tracking for supported self-employment clients",
                  frequency: "Bi-weekly",
                  dueDate: "Every other Friday",
                  required: false,
                },
                {
                  title: "Financial Reconciliation",
                  description: "Financial summary and invoice reconciliation",
                  frequency: "Monthly",
                  dueDate: "10th of following month",
                  required: true,
                },
                {
                  title: "Compliance Certification",
                  description: "Annual certification of compliance with VR standards",
                  frequency: "Annual",
                  dueDate: "December 31st",
                  required: true,
                },
                {
                  title: "Accessibility Audit",
                  description: "Assessment of service accessibility for deaf clients",
                  frequency: "Semi-annual",
                  dueDate: "June 30th & December 31st",
                  required: false,
                },
              ].map((template, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{template.title}</h4>
                      {template.required && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <p>
                        <strong>Frequency:</strong> {template.frequency}
                      </p>
                      <p>
                        <strong>Due:</strong> {template.dueDate}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      <Calendar className="w-3 h-3 mr-1" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
