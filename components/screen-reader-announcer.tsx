"use client"

import { useEffect, useState } from "react"

interface AnnouncerProps {
  message: string
  priority?: "polite" | "assertive"
}

export default function ScreenReaderAnnouncer({ message, priority = "polite" }: AnnouncerProps) {
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    if (message) {
      setAnnouncement(message)
      const timer = setTimeout(() => setAnnouncement(""), 1000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div aria-live={priority} aria-atomic="true" className="sr-only" role="status">
      {announcement}
    </div>
  )
}
