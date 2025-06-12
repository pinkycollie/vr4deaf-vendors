"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  Download,
  RefreshCw,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  ExternalLink,
  Calendar,
  Smartphone,
  Monitor,
} from "lucide-react"
import Link from "next/link"

export default function CalendarSyncPage() {
  const [syncEnabled, setSyncEnabled] = useState(true)
  const [reminderSettings, setReminderSettings] = useState({
    credentials: "7",
    reports: "3",
    clients: "1",
  })

  const upcomingDeadlines = [
    {
      id: "DEAD-001",
      title: "Professional Liability Insurance Renewal",
      type: "credential",
      dueDate: "2024-02-15",
      priority: "high",
      category: "Credentials",
      reminderDays: 7,
      synced: true,
    },
    {
      id: "DEAD-002",
      title: "Monthly VR Services Report",
      type: "report",
      dueDate: "2024-02-05",
      priority: "high",
      category: "Reports",
      reminderDays: 3,
      synced: true,
    },
    {
      id: "DEAD-003",
      title: "Sarah Johnson - 60 Day Progress Review",
      type: "client",
      dueDate: "2024-02-08",
      priority: "medium",
      category: "Client Reviews",
      reminderDays: 1,
      synced: true,
    },
    {
      id: "DEAD-004",
      title: "Background Check Renewal",
      type: "credential",
      dueDate: "2024-03-15",
      priority: "medium",
      category: "Credentials",
      reminderDays: 7,
      synced: false,
    },
    {
      id: "DEAD-005",
      title: "Quarterly Client Outcomes Report",
      type: "report",
      dueDate: "2024-04-15",
      priority: "medium",
      category: "Reports",
      reminderDays: 3,
      synced: true,
    },
  ]

  const calendarServices = [
    {
      name: "Google Calendar",
      icon: Calendar,
      connected: true,
      lastSync: "2024-02-01 10:30 AM",
      events: 12,
    },
    {
      name: "Microsoft Outlook",
      icon: Monitor,
      connected: false,
      lastSync: null,
      events: 0,
    },
    {
      name: "Apple Calendar",
      icon: Smartphone,
      connected: true,
      lastSync: "2024-02-01 10:30 AM",
      events: 8,
    },
  ]

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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const generateICSFile = (deadline: any) => {
    const startDate = new Date(deadline.dueDate)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour duration

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VR4Deaf Vendor Portal//Calendar Sync//EN
BEGIN:VEVENT
UID:${deadline.id}@vr4deaf.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${deadline.title}
DESCRIPTION:VR Deadline - ${deadline.category}\\nPriority: ${deadline.priority}\\nReminder set for ${deadline.reminderDays} days before
CATEGORIES:${deadline.category}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P${deadline.reminderDays}D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${deadline.title}
END:VALARM
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${deadline.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  const generateAllEventsICS = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VR4Deaf Vendor Portal//Calendar Sync//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:VR Deadlines
X-WR-CALDESC:Vocational Rehabilitation deadlines and reminders
`

    upcomingDeadlines.forEach((deadline) => {
      const startDate = new Date(deadline.dueDate)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

      const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      }

      icsContent += `BEGIN:VEVENT
UID:${deadline.id}@vr4deaf.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${deadline.title}
DESCRIPTION:VR Deadline - ${deadline.category}\\nPriority: ${deadline.priority}\\nReminder set for ${deadline.reminderDays} days before
CATEGORIES:${deadline.category}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P${deadline.reminderDays}D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${deadline.title}
END:VALARM
END:VEVENT
`
    })

    icsContent += "END:VCALENDAR"

    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "vr_deadlines_all.ics"
    link.click()
    URL.revokeObjectURL(url)
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
              <Link href="/credentials" className="text-gray-600 hover:text-blue-600">
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
            <h1 className="text-3xl font-bold text-gray-900">Calendar Integration</h1>
            <p className="text-gray-600 mt-2">Sync VR deadlines with your external calendar applications</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={generateAllEventsICS}>
              <Download className="w-4 h-4 mr-2" />
              Export All Events
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
          </div>
        </div>

        {/* Sync Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-blue-600">{upcomingDeadlines.length}</p>
                </div>
                <CalendarDays className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Synced Events</p>
                  <p className="text-3xl font-bold text-green-600">
                    {upcomingDeadlines.filter((d) => d.synced).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Connected Services</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {calendarServices.filter((s) => s.connected).length}
                  </p>
                </div>
                <ExternalLink className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Sync</p>
                  <p className="text-lg font-bold text-gray-900">2 hours ago</p>
                </div>
                <RefreshCw className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deadlines" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
            <TabsTrigger value="services">Calendar Services</TabsTrigger>
            <TabsTrigger value="settings">Sync Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="deadlines">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>VR deadlines that can be synced to your calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Reminder</TableHead>
                      <TableHead>Sync Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingDeadlines.map((deadline) => (
                      <TableRow key={deadline.id}>
                        <TableCell className="font-medium">{deadline.title}</TableCell>
                        <TableCell>{deadline.category}</TableCell>
                        <TableCell>{new Date(deadline.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getPriorityIcon(deadline.priority)}
                            <Badge variant={getPriorityColor(deadline.priority)}>{deadline.priority}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>{deadline.reminderDays} days before</TableCell>
                        <TableCell>
                          {deadline.synced ? (
                            <Badge variant="default">Synced</Badge>
                          ) : (
                            <Badge variant="secondary">Not Synced</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => generateICSFile(deadline)}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
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

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calendarServices.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-8 w-8 text-blue-500" />
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                        </div>
                        {service.connected ? (
                          <Badge variant="default">Connected</Badge>
                        ) : (
                          <Badge variant="secondary">Not Connected</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {service.connected ? (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              <strong>Last Sync:</strong> {service.lastSync}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Events Synced:</strong> {service.events}
                            </p>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Sync Now
                              </Button>
                              <Button size="sm" variant="outline">
                                Disconnect
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">Connect to sync VR deadlines automatically</p>
                            <Button className="w-full">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Connect {service.name}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Manual Calendar Export</CardTitle>
                <CardDescription>Download calendar files for manual import</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" onClick={generateAllEventsICS}>
                    <Download className="w-4 h-4 mr-2" />
                    Download All Events (.ics)
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Credentials Only (.ics)
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Reports Only (.ics)
                  </Button>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">How to Import:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                      • <strong>Google Calendar:</strong> Settings → Import & Export → Import
                    </li>
                    <li>
                      • <strong>Outlook:</strong> File → Open & Export → Import/Export
                    </li>
                    <li>
                      • <strong>Apple Calendar:</strong> File → Import → Select .ics file
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sync Preferences</CardTitle>
                  <CardDescription>Configure how deadlines are synced to your calendar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-sync">Automatic Sync</Label>
                      <p className="text-sm text-gray-500">Automatically sync new deadlines</p>
                    </div>
                    <Switch id="auto-sync" checked={syncEnabled} onCheckedChange={setSyncEnabled} />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Default Reminder Settings</h4>

                    <div className="space-y-2">
                      <Label htmlFor="credential-reminder">Credential Expiration Reminders</Label>
                      <Select
                        value={reminderSettings.credentials}
                        onValueChange={(value) => setReminderSettings({ ...reminderSettings, credentials: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day before</SelectItem>
                          <SelectItem value="3">3 days before</SelectItem>
                          <SelectItem value="7">1 week before</SelectItem>
                          <SelectItem value="14">2 weeks before</SelectItem>
                          <SelectItem value="30">1 month before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-reminder">Report Deadline Reminders</Label>
                      <Select
                        value={reminderSettings.reports}
                        onValueChange={(value) => setReminderSettings({ ...reminderSettings, reports: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day before</SelectItem>
                          <SelectItem value="3">3 days before</SelectItem>
                          <SelectItem value="7">1 week before</SelectItem>
                          <SelectItem value="14">2 weeks before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="client-reminder">Client Review Reminders</Label>
                      <Select
                        value={reminderSettings.clients}
                        onValueChange={(value) => setReminderSettings({ ...reminderSettings, clients: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day before</SelectItem>
                          <SelectItem value="3">3 days before</SelectItem>
                          <SelectItem value="7">1 week before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar Categories</CardTitle>
                  <CardDescription>Organize events by category in your calendar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Credentials", color: "bg-red-500", enabled: true },
                      { name: "Reports", color: "bg-blue-500", enabled: true },
                      { name: "Client Reviews", color: "bg-green-500", enabled: true },
                      { name: "Training", color: "bg-purple-500", enabled: false },
                      { name: "Meetings", color: "bg-orange-500", enabled: false },
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Switch checked={category.enabled} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button className="w-full">Save Settings</Button>
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
