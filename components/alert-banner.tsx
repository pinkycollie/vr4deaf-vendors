"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, Clock, FileText, X } from "lucide-react"
import Link from "next/link"

interface AlertBannerProps {
  type: "credential_expiring" | "report_due" | "client_update" | "system"
  priority: "high" | "medium" | "low"
  title: string
  message: string
  actionUrl?: string
  actionText?: string
  onDismiss?: () => void
  daysUntilDue?: number
}

export function AlertBanner({
  type,
  priority,
  title,
  message,
  actionUrl,
  actionText,
  onDismiss,
  daysUntilDue,
}: AlertBannerProps) {
  const getIcon = () => {
    switch (type) {
      case "credential_expiring":
        return <AlertTriangle className="h-4 w-4" />
      case "report_due":
        return <Calendar className="h-4 w-4" />
      case "client_update":
        return <Clock className="h-4 w-4" />
      case "system":
        return <FileText className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getVariant = () => {
    if (priority === "high" || (daysUntilDue && daysUntilDue <= 1)) {
      return "destructive"
    }
    return "default"
  }

  return (
    <Alert variant={getVariant()}>
      {getIcon()}
      <AlertTitle className="flex justify-between items-center">
        {title}
        {onDismiss && (
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <span>{message}</span>
        {actionUrl && actionText && (
          <Button size="sm" variant="outline" asChild>
            <Link href={actionUrl}>{actionText}</Link>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
