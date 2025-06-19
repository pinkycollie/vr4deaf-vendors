"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useHapticFeedback } from "@/contexts/haptic-feedback-context"
import type { VibrationPatternType } from "@/utils/haptic-feedback"

interface NotificationPopupProps {
  title: string
  message: string
  type?: "success" | "error" | "info" | "warning"
  duration?: number
  onClose?: () => void
  show: boolean
  enableHaptic?: boolean
}

export function NotificationPopup({
  title,
  message,
  type = "success",
  duration = 5000,
  onClose,
  show,
  enableHaptic = true,
}: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { triggerFeedback } = useHapticFeedback()

  useEffect(() => {
    setIsVisible(show)

    if (show) {
      // Trigger haptic feedback when notification appears
      if (enableHaptic) {
        triggerFeedback(type as VibrationPatternType)
      }

      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, duration)

        return () => clearTimeout(timer)
      }
    }
  }, [show, duration, onClose, enableHaptic, triggerFeedback, type])

  if (!isVisible) return null

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-500 text-green-900 dark:bg-green-950 dark:text-green-100"
      case "error":
        return "bg-red-50 border-red-500 text-red-900 dark:bg-red-950 dark:text-red-100"
      case "warning":
        return "bg-yellow-50 border-yellow-500 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100"
      case "info":
        return "bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-950 dark:text-blue-100"
      default:
        return "bg-green-50 border-green-500 text-green-900 dark:bg-green-950 dark:text-green-100"
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top-5 fade-in-20">
      <div className={`rounded-lg border p-4 shadow-md ${getTypeStyles()}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
