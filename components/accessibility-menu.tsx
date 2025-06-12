"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings } from "lucide-react"
import { useTheme } from "next-themes"

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const toggleHighContrast = (checked: boolean) => {
    setHighContrast(checked)
    if (checked) {
      document.documentElement.classList.add("high-contrast-mode")
    } else {
      document.documentElement.classList.remove("high-contrast-mode")
    }
  }

  const toggleLargeText = (checked: boolean) => {
    setLargeText(checked)
    if (checked) {
      document.documentElement.classList.add("large-text-mode")
    } else {
      document.documentElement.classList.remove("large-text-mode")
    }
  }

  const toggleReducedMotion = (checked: boolean) => {
    setReducedMotion(checked)
    if (checked) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-14 w-14 shadow-lg"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
      >
        <Settings className="h-6 w-6" aria-hidden="true" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-16 left-0 w-72 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Accessibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="cursor-pointer">
                High contrast
              </Label>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="large-text" className="cursor-pointer">
                Large text
              </Label>
              <Switch
                id="large-text"
                checked={largeText}
                onCheckedChange={toggleLargeText}
                aria-label="Toggle large text mode"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="cursor-pointer">
                Reduced motion
              </Label>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={toggleReducedMotion}
                aria-label="Toggle reduced motion mode"
              />
            </div>

            <div className="space-y-2">
              <Label className="block mb-2">Theme</Label>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex-1"
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex-1"
                >
                  Dark
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
