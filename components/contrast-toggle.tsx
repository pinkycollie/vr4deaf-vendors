"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Contrast } from "lucide-react"

export default function ContrastToggle() {
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("high-contrast")
    if (saved) {
      setHighContrast(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("high-contrast", JSON.stringify(highContrast))
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setHighContrast(!highContrast)}
      aria-pressed={highContrast}
      aria-label={`${highContrast ? "Disable" : "Enable"} high contrast mode`}
    >
      <Contrast className="h-4 w-4 mr-2" />
      {highContrast ? "Normal" : "High"} Contrast
    </Button>
  )
}
