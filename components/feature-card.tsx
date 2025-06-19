import { Lock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type LucideIcon, BarChart, Calendar, ClipboardCheck, FileText, MessageSquare, Users } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  locked: boolean
}

export function FeatureCard({ icon, title, description, locked }: FeatureCardProps) {
  // Map string icon names to Lucide components
  const iconMap: Record<string, LucideIcon> = {
    "clipboard-check": ClipboardCheck,
    "file-text": FileText,
    users: Users,
    calendar: Calendar,
    "bar-chart": BarChart,
    "message-square": MessageSquare,
  }

  const IconComponent = iconMap[icon] || Users

  return (
    <Card className={locked ? "border-gray-200" : "border-primary"}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <IconComponent className={`h-8 w-8 ${locked ? "text-gray-400" : "text-primary"}`} />
        <CardTitle className={`text-xl ${locked ? "text-gray-500" : ""}`}>{title}</CardTitle>
        {locked && <Lock className="h-4 w-4 text-gray-400 ml-auto" />}
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${locked ? "text-gray-400" : "text-gray-500"}`}>{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant={locked ? "outline" : "default"}
          className="w-full justify-center gap-1"
          disabled={locked}
        >
          {locked ? (
            <span>Sign in to access</span>
          ) : (
            <Link href={`/features/${title.toLowerCase().replace(/\s+/g, "-")}`}>Access Feature</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
