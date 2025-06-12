"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, CheckCircle, AlertTriangle, Clock, Download, Eye, CalendarDays } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CredentialsPage() {
  const [uploadProgress, setUploadProgress] = useState(0)

  const credentials = [
    {
      id: "CRED-001",
      type: "Business License",
      fileName: "business-license-2024.pdf",
      status: "approved",
      uploadDate: "2024-01-15",
      expiryDate: "2025-01-15",
      verifiedBy: "TWS-VRS Compliance Team",
      required: true,
    },
    {
      id: "CRED-002",
      type: "ASL Certification",
      fileName: "asl-interpreter-cert.pdf",
      status: "approved",
      uploadDate: "2024-01-10",
      expiryDate: "2026-01-10",
      verifiedBy: "Registry of Interpreters for the Deaf",
      required: true,
    },
    {
      id: "CRED-003",
      type: "Professional Liability Insurance",
      fileName: "liability-insurance-2024.pdf",
      status: "expiring",
      uploadDate: "2024-01-05",
      expiryDate: "2024-02-15",
      verifiedBy: "Insurance Provider",
      required: true,
    },
    {
      id: "CRED-004",
      type: "Background Check",
      fileName: "background-check-2024.pdf",
      status: "approved",
      uploadDate: "2024-01-08",
      expiryDate: "2025-01-08",
      verifiedBy: "Texas DPS",
      required: true,
    },
    {
      id: "CRED-005",
      type: "CRC Certification",
      fileName: "crc-certification.pdf",
      status: "pending",
      uploadDate: "2024-01-20",
      expiryDate: "2027-01-20",
      verifiedBy: "Pending Review",
      required: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "expiring":
        return "destructive"
      case "expired":
        return "destructive"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "expiring":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "expired":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const requiredCredentials = credentials.filter((cred) => cred.required)
  const approvedRequired = requiredCredentials.filter((cred) => cred.status === "approved").length
  const compliancePercentage = (approvedRequired / requiredCredentials.length) * 100

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
              <Link href="/credentials" className="text-blue-600 font-medium">
                Credentials
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
            <h1 className="text-3xl font-bold text-gray-900">Credentials & Compliance</h1>
            {/* Expiration Alerts */}
            <div className="space-y-4 mb-8">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Insurance Expiring Soon</AlertTitle>
                <AlertDescription>
                  Your Professional Liability Insurance expires in 15 days (February 15, 2024). Please upload your
                  renewed insurance documentation to maintain compliance.
                </AlertDescription>
              </Alert>

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertTitle>Background Check Renewal Due</AlertTitle>
                <AlertDescription>
                  Your background check will expire in 45 days (March 15, 2024). Schedule your renewal to avoid service
                  interruption.
                </AlertDescription>
              </Alert>
            </div>
            <p className="text-gray-600 mt-2">Manage your certifications and compliance documents</p>
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload New Credential
          </Button>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Your current compliance with TWS-VRS requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Compliance</span>
                    <span className="text-sm text-gray-500">
                      {approvedRequired}/{requiredCredentials.length} Required
                    </span>
                  </div>
                  <Progress value={compliancePercentage} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">
                    {compliancePercentage === 100
                      ? "✅ Fully compliant with all requirements"
                      : `${requiredCredentials.length - approvedRequired} required credential(s) need attention`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{approvedRequired}</div>
                    <div className="text-sm text-green-700">Approved</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {credentials.filter((c) => c.status === "expiring").length}
                    </div>
                    <div className="text-sm text-orange-700">Expiring Soon</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Upload</CardTitle>
              <CardDescription>Upload new credentials quickly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag files here or click to browse</p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>

              <div className="space-y-2 text-xs text-gray-500">
                <p>• Accepted formats: PDF, JPG, PNG</p>
                <p>• Maximum file size: 10MB</p>
                <p>• Documents must be current and legible</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credentials Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Credentials</CardTitle>
                <CardDescription>Complete list of your uploaded credentials and certifications</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <CalendarDays className="w-4 h-4 mr-2" />
                Export Expiration Dates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Credential Type</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Verified By</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credentials.map((credential) => (
                  <TableRow key={credential.id}>
                    <TableCell className="font-medium">{credential.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-gray-400" />
                        {credential.fileName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(credential.status)}
                        <Badge variant={getStatusColor(credential.status)}>{credential.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{credential.uploadDate}</TableCell>
                    <TableCell>
                      <span className={credential.status === "expiring" ? "text-red-600 font-medium" : ""}>
                        {credential.expiryDate}
                      </span>
                    </TableCell>
                    <TableCell>{credential.verifiedBy}</TableCell>
                    <TableCell>
                      {credential.required ? (
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
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
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

        {/* Required Credentials Checklist */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Required Credentials Checklist</CardTitle>
            <CardDescription>Ensure you have all required credentials for VR vendor status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Business License",
                  description: "Valid business license in Texas",
                  status: "approved",
                  required: true,
                },
                {
                  title: "Professional Liability Insurance",
                  description: "Minimum $1M coverage for VR services",
                  status: "expiring",
                  required: true,
                },
                {
                  title: "Background Check",
                  description: "Criminal background check within 12 months",
                  status: "approved",
                  required: true,
                },
                {
                  title: "ASL Certification",
                  description: "RID or equivalent ASL interpretation certification",
                  status: "approved",
                  required: true,
                },
                {
                  title: "VR Training Certificate",
                  description: "TWS-VRS approved training completion",
                  status: "pending",
                  required: true,
                },
                {
                  title: "HIPAA Compliance Training",
                  description: "Current HIPAA privacy and security training",
                  status: "missing",
                  required: true,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <div className="mt-1">{getStatusIcon(item.status)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={getStatusColor(item.status)} className="text-xs">
                        {item.status}
                      </Badge>
                      {item.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                  {item.status === "missing" && (
                    <Button size="sm" variant="outline">
                      Upload
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
