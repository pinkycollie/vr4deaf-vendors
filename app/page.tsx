import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Award, BarChart3, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Bell, AlertTriangle, Calendar } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarDays } from "lucide-react"

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-900">VR4Deaf Vendor Portal</h1>
              <Badge variant="secondary">TWS-VRS Certified</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <Link href="/applications" className="text-gray-600 hover:text-blue-600">
                  Applications
                </Link>
                <Link href="/clients" className="text-gray-600 hover:text-blue-600">
                  Clients
                </Link>
                <Link href="/credentials" className="text-gray-600 hover:text-blue-600">
                  Credentials
                </Link>
                <Link href="/reports" className="text-gray-600 hover:text-blue-600">
                  Reports
                </Link>
              </nav>
              <Button variant="outline" size="sm" asChild className="relative">
                <Link href="/notifications">
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    5
                  </Badge>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Acme Rehabilitation Services</h2>
          <p className="text-gray-600">
            Manage your VR services, clients, and compliance reporting in one unified platform.
          </p>
        </div>

        {/* Critical Alerts */}
        <div className="space-y-4 mb-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Urgent: Insurance Expiring Soon</AlertTitle>
            <AlertDescription>
              Your Professional Liability Insurance expires in 15 days (Feb 15, 2024).
              <Link href="/credentials" className="underline ml-1">
                Update now
              </Link>
            </AlertDescription>
          </Alert>

          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertTitle>Report Due Tomorrow</AlertTitle>
            <AlertDescription>
              Monthly VR Services Report for January 2024 is due tomorrow (Feb 5, 2024).
              <Link href="/reports" className="underline ml-1">
                Generate report
              </Link>
            </AlertDescription>
          </Alert>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Clients</p>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-3xl font-bold text-orange-600">3</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Credentials Status</p>
                  <p className="text-3xl font-bold text-green-600">Valid</p>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Reports</p>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Client Applications</CardTitle>
              <CardDescription>Latest VR service applications requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    service: "ASL Interpretation",
                    status: "pending",
                    date: "2024-01-15",
                    priority: "high",
                  },
                  {
                    name: "Michael Chen",
                    service: "Job Coaching",
                    status: "approved",
                    date: "2024-01-14",
                    priority: "medium",
                  },
                  {
                    name: "Emily Rodriguez",
                    service: "Assistive Technology",
                    status: "review",
                    date: "2024-01-13",
                    priority: "low",
                  },
                ].map((application, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{application.name}</h4>
                      <p className="text-sm text-gray-600">{application.service}</p>
                      <p className="text-xs text-gray-500">{application.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          application.priority === "high"
                            ? "destructive"
                            : application.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {application.priority}
                      </Badge>
                      <div className="flex items-center">
                        {application.status === "approved" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {application.status === "pending" && <Clock className="h-4 w-4 text-orange-500" />}
                        {application.status === "review" && <AlertCircle className="h-4 w-4 text-blue-500" />}
                        <span className="ml-1 text-sm capitalize">{application.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/applications">View All Applications</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/vendor-signup">New Vendor Registration</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/credentials/upload">Upload Credentials</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/clients/new">Add New Client</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/reports/generate">Generate VR Report</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/calendar-sync">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Sync Calendar
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ASL Certification</span>
                    <Badge variant="default">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Background Check</span>
                    <Badge variant="default">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Insurance</span>
                    <Badge variant="secondary">Expires 30 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">VR Training</span>
                    <Badge variant="default">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Calendar Sync</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
