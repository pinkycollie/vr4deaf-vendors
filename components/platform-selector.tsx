"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, User, Bot, Users, Shield, Zap } from "lucide-react"

type UserType = "vendor" | "client" | "ai-client" | null

export default function PlatformSelector() {
  const [selectedType, setSelectedType] = useState<UserType>(null)

  const handleSelection = (type: UserType) => {
    setSelectedType(type)
    // In a real app, this would redirect to the appropriate dashboard
    console.log(`Redirecting to ${type} dashboard`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            VR4Deaf Business Development Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional business development support for the deaf and hard-of-hearing community
          </p>
          <p className="text-lg font-medium">Choose your access level:</p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* VR Vendor/CBTAC */}
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 border-blue-200 hover:border-blue-400">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">VR Vendor/CBTAC</CardTitle>
              <CardDescription>Professional service providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Multi-client management</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>VR compliance tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span>Milestone-based billing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Team collaboration tools</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleSelection("vendor")}>
                Access Vendor Dashboard
              </Button>
              <p className="text-xs text-center text-muted-foreground">For Texas & Florida VR programs</p>
            </CardContent>
          </Card>

          {/* VR Client */}
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 border-green-200 hover:border-green-400">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">VR Client Portal</CardTitle>
              <CardDescription>Track your VR program progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-green-600" />
                  <span>Personal progress tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-green-600" />
                  <span>Connect with your team</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-green-600" />
                  <span>Milestone visibility</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure communication</span>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleSelection("client")}>
                Access Client Portal
              </Button>
              <p className="text-xs text-center text-muted-foreground">For current VR program participants</p>
            </CardContent>
          </Card>

          {/* AI-Powered Planning */}
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 border-purple-200 hover:border-purple-400">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                <Bot className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">AI-Powered Planning</CardTitle>
              <CardDescription>Intelligent business development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Bot className="h-4 w-4 text-purple-600" />
                  <span>AI-generated business plans</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span>Instant recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span>Accessibility integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Nationwide availability</span>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => handleSelection("ai-client")}>
                Start AI Planning
              </Button>
              <p className="text-xs text-center text-muted-foreground">Available nationwide</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            🎯 VR Vendor/CBTAC Compliant • 🤖 AI-Powered Innovation • ♿ Accessibility-First Design
          </p>
          <p className="text-xs text-muted-foreground">Empowering deaf and hard-of-hearing entrepreneurs nationwide</p>
        </div>
      </div>
    </div>
  )
}
