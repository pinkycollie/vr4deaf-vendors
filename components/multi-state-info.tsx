import { CheckCircle, Clock, MapPin, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getStatesByStatus } from "@/lib/states/config"

export default function MultiStateInfo() {
  const activeStates = getStatesByStatus("active")
  const betaStates = getStatesByStatus("beta")
  const comingSoonStates = getStatesByStatus("coming-soon")
  const planningStates = getStatesByStatus("planning")

  const totalStates = 50
  const launchedStates = activeStates.length + betaStates.length
  const progressPercentage = (launchedStates / totalStates) * 100

  const rolloutPhases = [
    {
      phase: "Phase 1: Foundation States",
      states: ["Texas", "California", "Florida", "New York"],
      status: "In Progress",
      timeline: "Q2-Q3 2025",
      description: "Establishing core infrastructure and proving platform effectiveness",
    },
    {
      phase: "Phase 2: High-Population States",
      states: ["Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
      status: "Planning",
      timeline: "Q4 2025-Q1 2026",
      description: "Expanding to states with large deaf populations and strong VR programs",
    },
    {
      phase: "Phase 3: Regional Expansion",
      states: ["Virginia", "Washington", "Arizona", "Massachusetts", "Tennessee", "Indiana"],
      status: "Planning",
      timeline: "Q2-Q3 2026",
      description: "Regional coverage to ensure nationwide accessibility",
    },
    {
      phase: "Phase 4: Complete Coverage",
      states: ["All remaining states and territories"],
      status: "Planning",
      timeline: "Q4 2026-Q1 2027",
      description: "Full 50-state coverage with specialized territory support",
    },
  ]

  return (
    <section id="multi-state-info" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Nationwide VR4DEAF Rollout</h2>
          <p className="text-lg text-muted-foreground">
            We're systematically expanding VR4DEAF across all 50 states, ensuring every deaf individual has access to
            AI-powered vocational rehabilitation services. The platform launched a few months ago in early 2025.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-800 dark:text-green-100 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                {activeStates.length}
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-200">States Active</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 dark:text-blue-100 flex items-center gap-2">
                <Users className="h-5 w-5" />
                {betaStates.length}
              </CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-200">States in Beta</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-800 dark:text-orange-100 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {comingSoonStates.length}
              </CardTitle>
              <CardDescription className="text-orange-700 dark:text-orange-200">Coming Soon</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-gray-200 bg-gray-50 dark:bg-gray-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {planningStates.length}
              </CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-200">In Planning</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>National Rollout Progress</CardTitle>
            <CardDescription>
              {launchedStates} of {totalStates} states launched ({progressPercentage.toFixed(1)}% complete)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Started: February 2025</span>
              <span>Target Completion: Q1 2027</span>
            </div>
          </CardContent>
        </Card>

        {/* Rollout Phases */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center mb-8">Rollout Timeline</h3>

          {rolloutPhases.map((phase, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{phase.phase}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={phase.status === "In Progress" ? "default" : "outline"}>{phase.status}</Badge>
                    <Badge variant="outline">{phase.timeline}</Badge>
                  </div>
                </div>
                <CardDescription>{phase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(phase.states) ? (
                    phase.states.map((state, stateIndex) => (
                      <Badge key={stateIndex} variant="outline" className="text-xs">
                        {state}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {phase.states}
                    </Badge>
                  )}
                </div>
              </CardContent>

              {/* Progress indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-texas-red-500 to-texas-blue-500 rounded-l-lg" />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Want VR4DEAF in Your State?</CardTitle>
              <CardDescription>
                Join our waitlist to be notified when VR4DEAF launches in your state and get early access to beta
                features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-2 bg-texas-red-600 text-white rounded-lg hover:bg-texas-red-700 transition-colors">
                  Join State Waitlist
                </button>
                <button className="px-6 py-2 border border-texas-blue-600 text-texas-blue-600 rounded-lg hover:bg-texas-blue-50 transition-colors">
                  Request Beta Access
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
