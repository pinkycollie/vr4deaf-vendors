import { Badge } from "@/components/ui/badge"

interface NotificationBadgeProps {
  count: number
  variant?: "default" | "destructive" | "outline" | "secondary"
  className?: string
}

export function NotificationBadge({ count, variant = "destructive", className = "" }: NotificationBadgeProps) {
  if (count === 0) return null

  return (
    <Badge
      variant={variant}
      className={`absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs ${className}`}
    >
      {count > 99 ? "99+" : count}
    </Badge>
  )
}
