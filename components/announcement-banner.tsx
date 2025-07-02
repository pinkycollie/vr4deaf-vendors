"use client"

import { useState } from "react"
import { X, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-texas-red-600 to-texas-blue-600 text-white">
      <div className="container flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-semibold text-sm">🚀 VR4DEAF Platform Now Live!</span>
            <span className="text-sm opacity-90">
              AI-powered vocational rehabilitation services for deaf individuals across all 50 states
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="hidden sm:flex bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <Link href="/states" className="flex items-center gap-1">
              Find Your State <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/10"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close announcement</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
