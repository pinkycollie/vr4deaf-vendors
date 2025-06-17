"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function ContrastToggle() {
  const [isHighContrast, setIsHighContrast] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Check if high contrast mode is already enabled
    const isHighContrastEnabled = document.documentElement.classList.contains("high-contrast-mode")
    setIsHighContrast(isHighContrastEnabled)
  }, [])

  const toggleHighContrast = () => {
    const newState = !isHighContrast
    setIsHighContrast(newState)
    document.documentElement.classList.toggle("high-contrast-mode", newState)
  }

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 z-20">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>

      <Button
        variant={isHighContrast ? "default" : "outline"}
        size="sm"
        onClick={toggleHighContrast}
        aria-pressed={isHighContrast}
        aria-label="Toggle high contrast mode"
      >
        {isHighContrast ? "High Contrast: On" : "High Contrast: Off"}
      </Button>
    </div>
  )
}
