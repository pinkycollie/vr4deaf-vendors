"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"

import { useToast } from "@/hooks/use-toast"

interface WaitingListNotificationProps {
  show: boolean
  onClose: () => void
}

export function WaitingListNotification({ show, onClose }: WaitingListNotificationProps) {
  const { toast } = useToast()

  useEffect(() => {
    if (show) {
      const { dismiss } = toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Successfully Added to Waiting List!</span>
          </div>
        ),
        description: "Thank you for joining our waiting list. You will be notified when space becomes available.",
        className: "bg-green-50 border-green-500 text-green-900 dark:bg-green-950 dark:text-green-100",
      })

      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        dismiss()
        onClose()
      }, 5000)

      return () => {
        clearTimeout(timer)
        dismiss()
      }
    }
  }, [show, toast, onClose])

  return null
}
