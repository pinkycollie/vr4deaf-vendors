"use client"

import { useState } from "react"
import { Vibrate } from "lucide-react"
import { useHapticFeedback } from "@/contexts/haptic-feedback-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AccessibilitySettings() {
  const { isSupported, isEnabled, setEnabled, triggerFeedback } = useHapticFeedback()
  const [open, setOpen] = useState(false)

  const handleToggleHaptic = (checked: boolean) => {
    setEnabled(checked)

    // Provide immediate feedback when enabling
    if (checked) {
      triggerFeedback("success")
    }
  }

  const handleTestVibration = () => {
    triggerFeedback("success")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Accessibility Settings">
          <Vibrate className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>Customize your accessibility preferences for a better experience.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="haptic-feedback">Haptic Feedback</Label>
              <p className="text-sm text-muted-foreground">
                {isSupported
                  ? "Receive vibration feedback for notifications on your mobile device."
                  : "Haptic feedback is not supported on your device."}
              </p>
            </div>
            <Switch
              id="haptic-feedback"
              checked={isEnabled && isSupported}
              onCheckedChange={handleToggleHaptic}
              disabled={!isSupported}
            />
          </div>

          {isSupported && isEnabled && (
            <Button variant="outline" onClick={handleTestVibration} className="w-full">
              Test Vibration
            </Button>
          )}

          {!isSupported && (
            <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-950">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Haptic feedback requires a mobile device that supports vibration. This feature may not be available on
                all devices or browsers.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
