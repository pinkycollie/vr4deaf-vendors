"use client"

import { useEffect, useState } from "react"

interface AnnouncerProps {
  messages: string[]
  ariaLive?: "polite" | "assertive"
}

export default function ScreenReaderAnnouncer({ messages, ariaLive = "polite" }: AnnouncerProps) {
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    // Get the last message from the array
    const message = messages[messages.length - 1]

    if (message && message !== currentMessage) {
      setCurrentMessage(message)
    }
  }, [messages, currentMessage])

  return (
    <div aria-live={ariaLive} aria-atomic="true" className="sr-only">
      {currentMessage}
    </div>
  )
}
