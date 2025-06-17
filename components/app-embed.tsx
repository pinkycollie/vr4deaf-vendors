"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react"

interface AppEmbedProps {
  title: string
  description: string
  embedUrl: string
  tags: string[]
  category: string
}

export function AppEmbed({ title, description, embedUrl, tags, category }: AppEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={embedUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`transition-all duration-300 ${isExpanded ? "h-96" : "h-64"}`}>
          <iframe src={embedUrl} className="w-full h-full border-0 rounded-lg" title={title} loading="lazy" />
        </div>
      </CardContent>
    </Card>
  )
}
