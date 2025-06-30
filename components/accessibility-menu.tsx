"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Accessibility, X, Volume2, Eye, MousePointer } from "lucide-react"

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    textToSpeech: false,
    fontSize: [100],
  })

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))

    // Apply settings
    const root = document.documentElement
    root.classList.toggle("high-contrast", settings.highContrast)
    root.classList.toggle("large-text", settings.largeText)
    root.classList.toggle("reduced-motion", settings.reducedMotion)
    root.style.fontSize = `${settings.fontSize[0]}%`
  }, [settings])

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40"
        aria-label="Open accessibility menu"
      >
        <Accessibility className="h-4 w-4 mr-2" />
        Accessibility
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Accessibility Options
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close accessibility menu">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">High Contrast</span>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  <span className="text-sm">Large Text</span>
                </div>
                <Switch
                  checked={settings.largeText}
                  onCheckedChange={(checked) => updateSetting("largeText", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <span className="text-sm">Reduced Motion</span>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Font Size: {settings.fontSize[0]}%</label>
                <Slider
                  value={settings.fontSize}
                  onValueChange={(value) => updateSetting("fontSize", value)}
                  min={75}
                  max={150}
                  step={25}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
