"use client"

import { Button } from "@/components/ui/button"
import { CalendarDays, Download } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  dueDate: string
  category: string
  priority: string
  reminderDays: number
  description?: string
}

interface CalendarExportProps {
  event?: CalendarEvent
  events?: CalendarEvent[]
  buttonText?: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
}

export function CalendarExport({
  event,
  events,
  buttonText = "Export to Calendar",
  variant = "outline",
  size = "sm",
}: CalendarExportProps) {
  const generateICSFile = (eventData: CalendarEvent) => {
    const startDate = new Date(eventData.dueDate)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour duration

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VR4Deaf Vendor Portal//Calendar Export//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${eventData.id}@vr4deaf.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description || `VR Deadline - ${eventData.category}\\nPriority: ${eventData.priority}`}
CATEGORIES:${eventData.category}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P${eventData.reminderDays}D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${eventData.title}
END:VALARM
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${eventData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }

  const generateMultipleEventsICS = (eventsList: CalendarEvent[]) => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VR4Deaf Vendor Portal//Calendar Export//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:VR Deadlines
X-WR-CALDESC:Vocational Rehabilitation deadlines and reminders
`

    eventsList.forEach((eventData) => {
      const startDate = new Date(eventData.dueDate)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

      const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      }

      icsContent += `BEGIN:VEVENT
UID:${eventData.id}@vr4deaf.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description || `VR Deadline - ${eventData.category}\\nPriority: ${eventData.priority}`}
CATEGORIES:${eventData.category}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P${eventData.reminderDays}D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${eventData.title}
END:VALARM
END:VEVENT
`
    })

    icsContent += "END:VCALENDAR"

    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "vr_deadlines.ics"
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExport = () => {
    if (event) {
      generateICSFile(event)
    } else if (events && events.length > 0) {
      generateMultipleEventsICS(events)
    }
  }

  const getGoogleCalendarUrl = (eventData: CalendarEvent) => {
    const startDate = new Date(eventData.dueDate)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventData.title,
      dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
      details: eventData.description || `VR Deadline - ${eventData.category}\nPriority: ${eventData.priority}`,
      location: "VR4Deaf Vendor Portal",
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const getOutlookUrl = (eventData: CalendarEvent) => {
    const startDate = new Date(eventData.dueDate)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: eventData.title,
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
      body: eventData.description || `VR Deadline - ${eventData.category}\nPriority: ${eventData.priority}`,
    })

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
  }

  return (
    <div className="relative group">
      <Button variant={variant} size={size} onClick={handleExport}>
        <CalendarDays className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>

      {/* Quick Calendar Links (shown on hover) */}
      {event && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 min-w-48">
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
          >
            Add to Google Calendar
          </a>
          <a
            href={getOutlookUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
          >
            Add to Outlook
          </a>
          <button onClick={handleExport} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
            <Download className="w-3 h-3 inline mr-2" />
            Download .ics file
          </button>
        </div>
      )}
    </div>
  )
}
