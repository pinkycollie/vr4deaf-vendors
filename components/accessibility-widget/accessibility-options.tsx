"use client"

import { useState } from "react"
import { Accessibility, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface AccessibilityOptionsProps {
  onClose: () => void
}

export default function AccessibilityOptions({ onClose }: AccessibilityOptionsProps) {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [fontSize, setFontSize] = useState([100])

  const applySettings = () => {
    // In a real implementation, this would apply the settings to the site
    // For now, we'll just show a success message
    alert("Accessibility settings applied!")
    onClose()
  }

  return (
    <div className="flex flex-col h-[500px] max-h-[80vh]">
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <div className="flex items-center gap-2">
          <Accessibility className="h-5 w-5" />
          <h3 className="font-semibold">Accessibility Options</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-blue-700">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm mb-4">
          Customize your experience with these accessibility options. Changes will be saved for your next visit.
        </p>

        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Visual Settings</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex-1">
                High Contrast Mode
              </Label>
              <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="large-text" className="flex-1">
                Large Text
              </Label>
              <Switch id="large-text" checked={largeText} onCheckedChange={setLargeText} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="font-size">Font Size</Label>
                <span className="text-sm">{fontSize[0]}%</span>
              </div>
              <Slider id="font-size" min={50} max={200} step={10} value={fontSize} onValueChange={setFontSize} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Motion & Animation</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduce-motion" className="flex-1">
                Reduce Motion
              </Label>
              <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={setReduceMotion} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Assistive Technology</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="text-to-speech" className="flex-1">
                Text to Speech
              </Label>
              <Switch id="text-to-speech" checked={textToSpeech} onCheckedChange={setTextToSpeech} />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                For ASL support and deaf-specific accessibility features, please use the Vuri AI Assistant.
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Additional Resources</h4>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                ASL Videos
              </Button>
              <Button variant="outline" size="sm">
                Accessibility Guide
              </Button>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
              <Button variant="outline" size="sm">
                MBTQ Universe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="p-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={applySettings} className="gap-2">
          <Check className="h-4 w-4" /> Apply Settings
        </Button>
      </div>
    </div>
  )
}
