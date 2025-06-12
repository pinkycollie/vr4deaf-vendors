"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  AlertTriangle,
  Calendar,
  FileX,
  CheckCircle,
  Clock,
  X,
  Filter,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all")

  const notifications = [
    {
      id: "NOTIF-001",
      type: "credential_expiring",
      title: "Professional Liability Insurance Expiring",
      message: "Your Professional Liability Insurance will expire in 15 days (February 15, 2024)",
      priority: "high",
      category: "credentials",
      timestamp: "2024-01-31T10:30:00Z",
      read: false,
      actionUrl: "/credentials",
      actionText: "Update Insurance",
      daysUntilDue: 15,
    },
    {
      id: "NOTIF-002",
      type: "report_due",
      title: "Monthly Report Due Tomorrow",
      message: "Monthly VR Services Report for January 2024 is due tomorrow",
      priority: "high",
      category: "reports",
      timestamp: "2024-02-04T09:00:00Z",
      read: false,
      actionUrl: "/reports",
      actionText: "Generate Report",
      daysUntilDue: 1,
    },
    {
      id: "NOTIF-003",
      type: "credential_expiring",
      title: "Background Check Renewal Needed",
      message: "Your background check will expire in 45 days (March 15, 2024)",
      priority: "medium",
      category: "credentials",
      timestamp: "2024-01-30T14:15:00Z",
      read: false,
      actionUrl: "/credentials",
      actionText: "Schedule Renewal",
      daysUntilDue: 45,
    },
    {
      id: "NOTIF-004",
      type: "client_update",
      title: "Client Progress Update Required",
      message: "Sarah Johnson's 60-day progress review is due",
      priority: "medium",
      category: "clients",
      timestamp: "2024-01-29T16:45:00Z",
      read: true,
      actionUrl: "/clients",
      actionText: "Update Progress",
      daysUntilDue: 3,
    },
    {
      id: "NOTIF-005",
      type: "system",
      title: "New VR Guidelines Available",
      message: "TWS-VRS has published updated guidelines for self-employment services",
      priority: "low",
      category: "system",
      timestamp: "2024-01-28T11:20:00Z",
      read: true,
      actionUrl: "/resources",
      actionText: "View Guidelines",
      daysUntilDue: null,
    },
    {
      id: "NOTIF-006",
      type: "credential_approved",
      title: "ASL Certification Approved",
      message: "Your ASL Interpreter certification has been verified and approved",
      priority: "low",
      category: "credentials",
      timestamp: "2024-01-25T13:30:00Z",
      read: true,
      actionUrl: "/credentials",
      actionText: "View Details",
      daysUntilDue: null,
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

  const getPriorityIcon = (type: string, priority: string) => {
    if (priority === "high") {
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    }

    switch (type) {
      case "credential_expiring":
      case "credential_approved":
        return <FileX className="h-4 w-4 text-orange-500" />
      case "report_due":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "client_update":
        return <Clock className="h-4 w-4 text-purple-500" />
      case "system":
        return <Bell className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getUrgencyText = (daysUntilDue: number | null) => {
    if (!daysUntilDue) return ""
    if (daysUntilDue <= 1) return "Due tomorrow"
    if (daysUntilDue <= 7) return `Due in ${daysUntilDue} days`
    if (daysUntilDue <= 30) return `Due in ${daysUntilDue} days`
    return `Due in ${daysUntilDue} days`
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "unread") return !notif.read
    if (filter === "high") return notif.priority === "high"
    return notif.category === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.read).length

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
            <div className="flex items-center space-x-4">
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
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">Stay updated on credentials, reports, and important deadlines</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                  <p className="text-3xl font-bold text-gray-900">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
                </div>
                <MarkAsUnread className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-3xl font-bold text-red-600">{highPriorityCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Due This Week</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {notifications.filter((n) => n.daysUntilDue && n.daysUntilDue <= 7).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        {highPriorityCount > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Critical Alerts</h2>
            <div className="space-y-4">
              {notifications
                .filter((n) => n.priority === "high" && !n.read)
                .map((notification) => (
                  <Alert key={notification.id} variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>{notification.title}</AlertTitle>
                    <AlertDescription className="flex justify-between items-center">
                      <span>{notification.message}</span>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={notification.actionUrl}>{notification.actionText}</Link>
                      </Button>
                    </AlertDescription>
                  </Alert>
                ))}
            </div>
          </div>
        )}

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>Manage your notifications and alerts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={filter} onValueChange={setFilter} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="high">High Priority</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
              </TabsList>

              <TabsContent value={filter} className="mt-6">
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        !notification.read ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-1">{getPriorityIcon(notification.type, notification.priority)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-medium ${!notification.read ? "text-blue-900" : "text-gray-900"}`}>
                                {notification.title}
                              </h4>
                              <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                                {notification.priority}
                              </Badge>
                              {notification.daysUntilDue && notification.daysUntilDue <= 7 && (
                                <Badge variant="destructive" className="text-xs">
                                  {getUrgencyText(notification.daysUntilDue)}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                {new Date(notification.timestamp).toLocaleDateString()} at{" "}
                                {new Date(notification.timestamp).toLocaleTimeString()}
                              </p>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={notification.actionUrl}>{notification.actionText}</Link>
                                </Button>
                                {!notification.read && (
                                  <Button size="sm" variant="ghost">
                                    Mark as Read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="ml-2">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8">
                      <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                      <p className="text-gray-500">
                        {filter === "all" ? "You're all caught up!" : `No ${filter} notifications at this time.`}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
