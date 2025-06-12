"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, Users, BarChart3 } from "lucide-react"

export function EndpointDocumentation() {
  const endpoints = {
    auth: [
      { method: "GET", path: "/login", description: "Vendor login page", auth: false },
      { method: "POST", path: "/auth/signin", description: "Authenticate vendor", auth: false },
      { method: "POST", path: "/auth/signout", description: "Sign out vendor", auth: true },
      { method: "GET", path: "/auth/callback", description: "OAuth callback handler", auth: false },
      { method: "POST", path: "/auth/forgot-password", description: "Password reset request", auth: false },
      { method: "POST", path: "/auth/reset-password", description: "Reset password", auth: false },
    ],
    dashboard: [
      { method: "GET", path: "/", description: "Main vendor dashboard", auth: true },
      { method: "GET", path: "/dashboard", description: "Dashboard redirect", auth: true },
      { method: "GET", path: "/dashboard/stats", description: "Dashboard statistics", auth: true },
      { method: "GET", path: "/dashboard/alerts", description: "Critical alerts", auth: true },
    ],
    vendor: [
      { method: "GET", path: "/vendor-signup", description: "Vendor registration form", auth: false },
      { method: "POST", path: "/vendor-signup", description: "Submit vendor application", auth: false },
      { method: "GET", path: "/vendor/profile", description: "Vendor profile management", auth: true },
      { method: "PUT", path: "/vendor/profile", description: "Update vendor profile", auth: true },
      { method: "GET", path: "/vendor/status", description: "Application status", auth: true },
    ],
    clients: [
      { method: "GET", path: "/clients", description: "Client management dashboard", auth: true },
      { method: "GET", path: "/clients/new", description: "Add new client form", auth: true },
      { method: "POST", path: "/clients", description: "Create new client", auth: true },
      { method: "GET", path: "/clients/:id", description: "Client details", auth: true },
      { method: "PUT", path: "/clients/:id", description: "Update client information", auth: true },
      { method: "DELETE", path: "/clients/:id", description: "Remove client", auth: true },
      { method: "GET", path: "/clients/:id/progress", description: "Client progress tracking", auth: true },
    ],
    applications: [
      { method: "GET", path: "/applications", description: "VR applications dashboard", auth: true },
      { method: "GET", path: "/applications/new", description: "New application form", auth: true },
      { method: "POST", path: "/applications", description: "Submit VR application", auth: true },
      { method: "GET", path: "/applications/:id", description: "Application details", auth: true },
      { method: "PUT", path: "/applications/:id", description: "Update application", auth: true },
      { method: "GET", path: "/applications/:id/status", description: "Application status", auth: true },
    ],
    credentials: [
      { method: "GET", path: "/credentials", description: "Credentials management", auth: true },
      { method: "POST", path: "/credentials/upload", description: "Upload credential document", auth: true },
      { method: "GET", path: "/credentials/:id", description: "Credential details", auth: true },
      { method: "PUT", path: "/credentials/:id", description: "Update credential", auth: true },
      { method: "DELETE", path: "/credentials/:id", description: "Remove credential", auth: true },
      { method: "GET", path: "/credentials/expiring", description: "Expiring credentials", auth: true },
    ],
    reports: [
      { method: "GET", path: "/reports", description: "VR reporting dashboard", auth: true },
      { method: "GET", path: "/reports/generate", description: "Report generation form", auth: true },
      { method: "POST", path: "/reports/generate", description: "Generate new report", auth: true },
      { method: "GET", path: "/reports/:id", description: "View report", auth: true },
      { method: "GET", path: "/reports/:id/download", description: "Download report", auth: true },
      { method: "GET", path: "/reports/templates", description: "Report templates", auth: true },
    ],
    outcomes: [
      { method: "GET", path: "/outcomes", description: "Outcome tracking dashboard", auth: true },
      { method: "GET", path: "/outcomes/analyze", description: "Outcome analysis tool", auth: true },
      { method: "POST", path: "/outcomes/analyze", description: "Run outcome analysis", auth: true },
      { method: "GET", path: "/outcomes/reports", description: "Automated outcome reports", auth: true },
      { method: "GET", path: "/outcomes/goals", description: "Goal setting and tracking", auth: true },
      { method: "POST", path: "/outcomes/goals", description: "Create new goal", auth: true },
      { method: "GET", path: "/outcomes/comparison", description: "Outcome comparison tool", auth: true },
      { method: "GET", path: "/outcomes/feedback", description: "Employer feedback integration", auth: true },
      { method: "GET", path: "/outcomes/prediction", description: "Outcome prediction models", auth: true },
    ],
    careerDevelopment: [
      { method: "GET", path: "/career-development", description: "Career development hub", auth: true },
      { method: "GET", path: "/career-development/checkins", description: "Quarterly check-ins", auth: true },
      { method: "POST", path: "/career-development/checkins", description: "Schedule check-in", auth: true },
      { method: "GET", path: "/career-development/checkins/:id", description: "Check-in details", auth: true },
      { method: "PUT", path: "/career-development/checkins/:id", description: "Update check-in", auth: true },
      { method: "GET", path: "/career-development/mentorship", description: "Peer mentorship program", auth: true },
      { method: "POST", path: "/career-development/mentorship", description: "Create mentorship match", auth: true },
      { method: "GET", path: "/career-development/mentorship/:id", description: "Mentorship details", auth: true },
      { method: "GET", path: "/career-development/training", description: "Training programs", auth: true },
      { method: "POST", path: "/career-development/training", description: "Enroll in training", auth: true },
      {
        method: "GET",
        path: "/career-development/employer-education",
        description: "Employer education portal",
        auth: true,
      },
    ],
    salaryNegotiation: [
      { method: "GET", path: "/salary-negotiation", description: "Salary negotiation training", auth: true },
      { method: "GET", path: "/salary-negotiation/calculator", description: "Salary range calculator", auth: true },
      { method: "POST", path: "/salary-negotiation/calculate", description: "Calculate salary range", auth: true },
      { method: "GET", path: "/salary-negotiation/training", description: "Training modules", auth: true },
      { method: "GET", path: "/salary-negotiation/resources", description: "Negotiation resources", auth: true },
      { method: "GET", path: "/salary-negotiation/practice", description: "Practice sessions", auth: true },
      { method: "POST", path: "/salary-negotiation/practice", description: "Join practice session", auth: true },
    ],
    notifications: [
      { method: "GET", path: "/notifications", description: "Notifications center", auth: true },
      { method: "PUT", path: "/notifications/:id/read", description: "Mark notification as read", auth: true },
      { method: "DELETE", path: "/notifications/:id", description: "Dismiss notification", auth: true },
      { method: "GET", path: "/notifications/settings", description: "Notification preferences", auth: true },
      { method: "PUT", path: "/notifications/settings", description: "Update preferences", auth: true },
    ],
    calendar: [
      { method: "GET", path: "/calendar-sync", description: "Calendar integration", auth: true },
      { method: "POST", path: "/calendar-sync/connect", description: "Connect calendar service", auth: true },
      { method: "DELETE", path: "/calendar-sync/disconnect", description: "Disconnect service", auth: true },
      { method: "POST", path: "/calendar-sync/export", description: "Export calendar events", auth: true },
      { method: "GET", path: "/calendar-sync/settings", description: "Sync settings", auth: true },
      { method: "PUT", path: "/calendar-sync/settings", description: "Update sync settings", auth: true },
    ],
    api: [
      { method: "GET", path: "/api/health", description: "API health check", auth: false },
      { method: "GET", path: "/api/vendor/profile", description: "Get vendor profile", auth: true },
      { method: "PUT", path: "/api/vendor/profile", description: "Update vendor profile", auth: true },
      { method: "GET", path: "/api/clients", description: "List clients", auth: true },
      { method: "POST", path: "/api/clients", description: "Create client", auth: true },
      { method: "GET", path: "/api/clients/:id", description: "Get client", auth: true },
      { method: "PUT", path: "/api/clients/:id", description: "Update client", auth: true },
      { method: "DELETE", path: "/api/clients/:id", description: "Delete client", auth: true },
      { method: "GET", path: "/api/applications", description: "List applications", auth: true },
      { method: "POST", path: "/api/applications", description: "Create application", auth: true },
      { method: "GET", path: "/api/credentials", description: "List credentials", auth: true },
      { method: "POST", path: "/api/credentials", description: "Upload credential", auth: true },
      { method: "GET", path: "/api/reports", description: "List reports", auth: true },
      { method: "POST", path: "/api/reports", description: "Generate report", auth: true },
      { method: "GET", path: "/api/outcomes/stats", description: "Outcome statistics", auth: true },
      { method: "POST", path: "/api/outcomes/analyze", description: "Analyze outcomes", auth: true },
      { method: "GET", path: "/api/notifications", description: "Get notifications", auth: true },
      { method: "POST", path: "/api/calendar/export", description: "Export calendar", auth: true },
    ],
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800"
      case "POST":
        return "bg-blue-100 text-blue-800"
      case "PUT":
        return "bg-orange-100 text-orange-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>VR4Deaf Vendor Portal - API Endpoints</span>
        </CardTitle>
        <CardDescription>Complete endpoint documentation for vendors.vr4deaf.org</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Base URL Structure</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Production:</strong> https://vendors.vr4deaf.org
            </div>
            <div>
              <strong>Staging:</strong> https://staging-vendors.vr4deaf.org
            </div>
            <div>
              <strong>Development:</strong> https://dev-vendors.vr4deaf.org
            </div>
          </div>
        </div>

        <Tabs defaultValue="auth" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="auth" className="text-xs">
              <Lock className="h-3 w-3 mr-1" />
              Auth
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="vendor" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Vendor
            </TabsTrigger>
            <TabsTrigger value="clients" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="applications" className="text-xs">
              Applications
            </TabsTrigger>
            <TabsTrigger value="credentials" className="text-xs">
              Credentials
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs">
              Reports
            </TabsTrigger>
            <TabsTrigger value="outcomes" className="text-xs">
              Outcomes
            </TabsTrigger>
          </TabsList>

          {Object.entries(endpoints).map(([category, categoryEndpoints]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="space-y-3">
                {categoryEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getMethodColor(endpoint.method)} font-mono text-xs`}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                      <span className="text-sm text-gray-600">{endpoint.description}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {endpoint.auth ? (
                        <Badge variant="destructive" className="text-xs">
                          <Lock className="h-3 w-3 mr-1" />
                          Auth Required
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Public
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}

          <TabsContent value="careerDevelopment" className="mt-6">
            <div className="space-y-3">
              {endpoints.careerDevelopment.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getMethodColor(endpoint.method)} font-mono text-xs`}>{endpoint.method}</Badge>
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                    <span className="text-sm text-gray-600">{endpoint.description}</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Auth Required
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="salaryNegotiation" className="mt-6">
            <div className="space-y-3">
              {endpoints.salaryNegotiation.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getMethodColor(endpoint.method)} font-mono text-xs`}>{endpoint.method}</Badge>
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                    <span className="text-sm text-gray-600">{endpoint.description}</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Auth Required
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="space-y-3">
              {endpoints.notifications.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getMethodColor(endpoint.method)} font-mono text-xs`}>{endpoint.method}</Badge>
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                    <span className="text-sm text-gray-600">{endpoint.description}</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Auth Required
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="space-y-3">
              {endpoints.calendar.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getMethodColor(endpoint.method)} font-mono text-xs`}>{endpoint.method}</Badge>
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                    <span className="text-sm text-gray-600">{endpoint.description}</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Auth Required
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="api" className="mt-6">
            <div className="space-y-3">
              {endpoints.api.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getMethodColor(endpoint.method)} font-mono text-xs`}>{endpoint.method}</Badge>
                    <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                    <span className="text-sm text-gray-600">{endpoint.description}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {endpoint.auth ? (
                      <Badge variant="destructive" className="text-xs">
                        <Lock className="h-3 w-3 mr-1" />
                        Auth Required
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Public
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Complete URL Structure for vendors.vr4deaf.org</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm font-mono">
            <div className="space-y-1">
              <div className="font-semibold text-blue-700">Authentication</div>
              <div>vendors.vr4deaf.org/login</div>
              <div>vendors.vr4deaf.org/auth/signin</div>
              <div>vendors.vr4deaf.org/auth/signout</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-green-700">Core Features</div>
              <div>vendors.vr4deaf.org/</div>
              <div>vendors.vr4deaf.org/dashboard</div>
              <div>vendors.vr4deaf.org/vendor-signup</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-purple-700">Client Management</div>
              <div>vendors.vr4deaf.org/clients</div>
              <div>vendors.vr4deaf.org/clients/new</div>
              <div>vendors.vr4deaf.org/applications</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-orange-700">Compliance</div>
              <div>vendors.vr4deaf.org/credentials</div>
              <div>vendors.vr4deaf.org/reports</div>
              <div>vendors.vr4deaf.org/notifications</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-red-700">Career Development</div>
              <div>vendors.vr4deaf.org/career-development</div>
              <div>vendors.vr4deaf.org/salary-negotiation</div>
              <div>vendors.vr4deaf.org/outcomes</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-indigo-700">Integration</div>
              <div>vendors.vr4deaf.org/calendar-sync</div>
              <div>vendors.vr4deaf.org/api/*</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
