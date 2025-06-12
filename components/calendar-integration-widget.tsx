"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ExternalLink, RefreshCw, Settings } from "lucide-react"
import Link from "next/link"

interface CalendarService {
  name: string
  connected: boolean
  lastSync?: string
  eventCount: number
  icon: string
}

export function CalendarIntegrationWidget() {
  const [services] = useState<CalendarService[]>([
    {
      name: "Google Calendar",
      connected: true,
      lastSync: "2 hours ago",
      eventCount: 12,
      icon: "📅",
    },
    {
      name: "Outlook",
      connected: false,
      lastSync: undefined,
      eventCount: 0,
      icon: "📆",
    },
    {
      name: "Apple Calendar",
      connected: true,
      lastSync: "2 hours ago",
      eventCount: 8,
      icon: "🗓️",
    },
  ])

  const connectedServices = services.filter((s) => s.connected)
  const totalEvents = services.reduce((sum, s) => sum + s.eventCount, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>Calendar Sync</span>
            </CardTitle>
            <CardDescription>Your VR deadlines synced across calendars</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/calendar-sync">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{connectedServices.length}</div>
              <div className="text-sm text-blue-700">Connected</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalEvents}</div>
              <div className="text-sm text-green-700">Events Synced</div>
            </div>
          </div>

          {/* Connected Services */}
          <div className="space-y-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{service.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{service.name}</div>
                    {service.connected && service.lastSync && (
                      <div className="text-xs text-gray-500">Last sync: {service.lastSync}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {service.connected ? (
                    <>
                      <Badge variant="default" className="text-xs">
                        {service.eventCount} events
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full">
              <CalendarDays className="w-4 h-4 mr-2" />
              Export All Deadlines
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
