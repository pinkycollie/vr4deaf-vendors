"use client"

import { useState } from "react"
import { Vibrate, Bell, AlertTriangle, Info, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useHapticFeedback } from "@/contexts/haptic-feedback-context"
import { useToast } from "@/hooks/use-toast"
import { AccessibilitySettings } from "@/components/accessibility-settings"
import { NotificationPopup } from "@/components/notification-popup"

export function HapticFeedbackDemo() {
  const { isSupported, isEnabled, triggerFeedback } = useHapticFeedback()
  const { toast } = useToast()
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<"success" | "error" | "info" | "warning">("success")

  const triggerToast = (type: "success" | "error" | "info" | "warning") => {
    const variants: Record<string, any> = {
      success: { variant: "default", icon: <CheckCircle className="h-4 w-4" /> },
      error: { variant: "destructive", icon: <AlertTriangle className="h-4 w-4" /> },
      info: { variant: "default", icon: <Info className="h-4 w-4" /> },
      warning: { variant: "default", icon: <Bell className="h-4 w-4" /> },
    }

    toast({
      variant: variants[type].variant,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      description: `This is a ${type} notification with haptic feedback.`,
      enableHaptic: true,
    })
  }

  const triggerPopup = (type: "success" | "error" | "info" | "warning") => {
    setPopupType(type)
    setShowPopup(true)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="relative">
          <div className="absolute right-4 top-4">
            <AccessibilitySettings />
          </div>
          <CardTitle>Haptic Feedback Settings</CardTitle>
          <CardDescription>
            Customize how your device provides tactile feedback for notifications and interactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-2">
                <Vibrate className="h-5 w-5 text-primary" />
                <span className="font-medium">Haptic Feedback Status:</span>
                <span>
                  {!isSupported ? (
                    <span className="text-yellow-600 dark:text-yellow-400">Not supported on this device</span>
                  ) : isEnabled ? (
                    <span className="text-green-600 dark:text-green-400">Enabled</span>
                  ) : (
                    <span className="text-muted-foreground">Disabled</span>
                  )}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {isSupported
                  ? "Your device supports haptic feedback. Use the settings icon above to customize your experience."
                  : "Haptic feedback requires a mobile device that supports vibration. Try accessing this page on a mobile device."}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <p className="text-sm text-muted-foreground mb-2 w-full">
            Test different notification types with haptic feedback:
          </p>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button onClick={() => triggerToast("success")} variant="outline" className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Success Toast
            </Button>
            <Button onClick={() => triggerToast("error")} variant="outline" className="w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Error Toast
            </Button>
            <Button onClick={() => triggerPopup("success")} variant="outline" className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Success Popup
            </Button>
            <Button onClick={() => triggerPopup("error")} variant="outline" className="w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Error Popup
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Haptic Feedback</CardTitle>
          <CardDescription>Understanding how tactile feedback enhances accessibility for Deaf users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Haptic feedback provides tactile sensations through vibration, creating a more inclusive experience for
              Deaf and hard-of-hearing users who may not rely on auditory cues.
            </p>

            <h3 className="font-medium text-lg">Benefits for Deaf Users:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provides confirmation of actions without requiring visual attention</li>
              <li>Offers non-auditory alerts for important notifications</li>
              <li>Creates a more immersive and responsive user experience</li>
              <li>Reduces dependency on visual-only feedback</li>
              <li>Enhances overall accessibility of digital interfaces</li>
            </ul>

            <p className="text-sm text-muted-foreground mt-4">
              VR4Deaf implements different vibration patterns for different types of notifications, making it easier to
              distinguish between success, error, warning, and informational alerts.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification popup for demo */}
      <NotificationPopup
        title={`${popupType.charAt(0).toUpperCase() + popupType.slice(1)} Notification`}
        message={`This is a ${popupType} notification with haptic feedback.`}
        type={popupType}
        show={showPopup}
        onClose={() => setShowPopup(false)}
        enableHaptic={true}
      />
    </div>
  )
}
