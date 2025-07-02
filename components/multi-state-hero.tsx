"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Bot, Briefcase, Building, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import StateSelector from "./state-selector"
import { getStateConfig } from "@/lib/states/config"

export default function MultiStateHero() {
  const [selectedState, setSelectedState] = useState("TX")
  const stateConfig = getStateConfig(selectedState)

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-texas-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-texas-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container grid gap-8 md:grid-cols-2 md:gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="px-3 py-1 border-texas-red-300 bg-texas-red-50 text-texas-red-700">
              <Bot className="mr-1 h-3 w-3" /> AI-Powered
            </Badge>
            <Badge variant="outline" className="px-3 py-1 border-texas-blue-300 bg-texas-blue-50 text-texas-blue-700">
              ASL-Friendly
            </Badge>
            <Badge variant="outline" className="px-3 py-1 border-texas-red-300 bg-texas-red-50 text-texas-red-700">
              Multi-State Platform
            </Badge>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-texas-red-600 to-texas-blue-600 bg-clip-text text-transparent">
                VR4DEAF
              </span>{" "}
              Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              The first AI-powered platform built specifically for Deaf individuals seeking employment, self-employment,
              and business growth across all 50 states.
            </p>

            <div className="bg-muted/50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">Select Your State</span>
              </div>
              <StateSelector selectedState={selectedState} onStateChange={setSelectedState} showDetails={false} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border border-texas-blue-200">
              <Briefcase className="h-8 w-8 text-texas-blue-600 mb-2" />
              <h3 className="font-medium text-center">Job Seekers</h3>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border border-texas-red-200">
              <Bot className="h-8 w-8 text-texas-red-600 mb-2" />
              <h3 className="font-medium text-center">Self-Employment</h3>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border border-texas-blue-200">
              <Building className="h-8 w-8 text-texas-blue-600 mb-2" />
              <h3 className="font-medium text-center">Small Business</h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {stateConfig?.isActive ? (
              <Button size="lg" asChild className="bg-texas-red-600 hover:bg-texas-red-700">
                <Link href={`/states/${selectedState.toLowerCase()}`}>
                  Access {stateConfig.name} Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" variant="outline" className="border-texas-red-600 text-texas-red-600">
                Coming Soon to {stateConfig?.name || "Your State"}
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-texas-blue-600 text-texas-blue-600 hover:bg-texas-blue-50"
            >
              <Link href="#multi-state-info">Learn More</Link>
            </Button>
          </div>

          {stateConfig && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{stateConfig.name} VR Services</h4>
                <Badge variant={stateConfig.isActive ? "default" : "outline"}>
                  {stateConfig.isActive ? "Active" : "Coming Soon"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{stateConfig.vrProgram.name}</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-medium">Max Job Seeker Funding:</span>
                  <div className="text-muted-foreground">${stateConfig.funding.maxJobSeeker.toLocaleString()}</div>
                </div>
                <div>
                  <span className="font-medium">VR Offices:</span>
                  <div className="text-muted-foreground">{stateConfig.demographics.vrOfficeCount} locations</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
          <div className="relative w-full h-full">
            <iframe
              src="https://www.youtube.com/embed/oIp-PaqMaCE?autoplay=0&controls=1&rel=0"
              title="VR4DEAF Multi-State Platform"
              className="absolute inset-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
