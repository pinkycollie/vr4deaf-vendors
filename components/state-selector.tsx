"use client"

import { useState } from "react"
import { Check, ChevronDown, MapPin, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { getStateConfig, getStatesByStatus, STATE_STATUSES } from "@/lib/states/config"
import type { StateConfig } from "@/lib/states/types"

interface StateSelectorProps {
  selectedState?: string
  onStateChange: (stateCode: string) => void
  showDetails?: boolean
}

export default function StateSelector({ selectedState, onStateChange, showDetails = false }: StateSelectorProps) {
  const [open, setOpen] = useState(false)

  const activeStates = getStatesByStatus("active")
  const betaStates = getStatesByStatus("beta")
  const comingSoonStates = getStatesByStatus("coming-soon")
  const planningStates = getStatesByStatus("planning")

  const selectedStateConfig = selectedState ? getStateConfig(selectedState) : null

  const getStatusBadge = (stateCode: string) => {
    const status = STATE_STATUSES.find((s) => s.code === stateCode)
    if (!status) return null

    const variants = {
      active: "default",
      beta: "secondary",
      "coming-soon": "outline",
      planning: "outline",
    } as const

    const colors = {
      active: "bg-green-600 hover:bg-green-700",
      beta: "bg-blue-600 hover:bg-blue-700",
      "coming-soon": "border-orange-500 text-orange-700",
      planning: "border-gray-500 text-gray-700",
    }

    return (
      <Badge variant={variants[status.status]} className={colors[status.status]}>
        {status.status === "active" && "Live"}
        {status.status === "beta" && "Beta"}
        {status.status === "coming-soon" && "Coming Soon"}
        {status.status === "planning" && "Planning"}
      </Badge>
    )
  }

  const StateGroup = ({
    title,
    states,
    description,
  }: { title: string; states: StateConfig[]; description: string }) => (
    <CommandGroup heading={title}>
      <div className="px-2 py-1 text-xs text-muted-foreground">{description}</div>
      {states.map((state) => (
        <CommandItem
          key={state.code}
          value={state.code}
          onSelect={(value) => {
            onStateChange(value.toUpperCase())
            setOpen(false)
          }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Check className={`h-4 w-4 ${selectedState === state.code ? "opacity-100" : "opacity-0"}`} />
            <span>{state.name}</span>
          </div>
          {getStatusBadge(state.code)}
        </CommandItem>
      ))}
    </CommandGroup>
  )

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {selectedStateConfig ? selectedStateConfig.name : "Select state..."}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search states..." />
            <CommandList>
              <CommandEmpty>No state found.</CommandEmpty>

              {activeStates.length > 0 && (
                <StateGroup
                  title="🟢 Active States"
                  states={activeStates}
                  description="VR4DEAF is fully operational in these states"
                />
              )}

              {betaStates.length > 0 && (
                <StateGroup title="🔵 Beta States" states={betaStates} description="Limited beta access available" />
              )}

              {comingSoonStates.length > 0 && (
                <StateGroup
                  title="🟡 Coming Soon"
                  states={comingSoonStates}
                  description="Launching in the next 6 months"
                />
              )}

              {planningStates.length > 0 && (
                <StateGroup
                  title="⚪ In Planning"
                  states={planningStates}
                  description="Currently in development phase"
                />
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {showDetails && selectedStateConfig && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {selectedStateConfig.name} VR Services
              </CardTitle>
              {getStatusBadge(selectedStateConfig.code)}
            </div>
            <CardDescription>{selectedStateConfig.vrProgram.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Deaf Population</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedStateConfig.demographics.deafPopulation.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">VR Offices</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedStateConfig.demographics.vrOfficeCount} locations
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Avg. Wait Time</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedStateConfig.demographics.averageWaitTime}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Available Services</div>
              <div className="flex flex-wrap gap-2">
                {selectedStateConfig.features.aslSupport && <Badge variant="outline">ASL Support</Badge>}
                {selectedStateConfig.features.ticketToWork && <Badge variant="outline">Ticket to Work</Badge>}
                {selectedStateConfig.features.selfEmploymentServices && (
                  <Badge variant="outline">Self-Employment</Badge>
                )}
                {selectedStateConfig.features.businessServices && <Badge variant="outline">Business Services</Badge>}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Funding Limits</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="font-medium">Job Seeker</div>
                  <div className="text-muted-foreground">
                    ${selectedStateConfig.funding.maxJobSeeker.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Self-Employment</div>
                  <div className="text-muted-foreground">
                    ${selectedStateConfig.funding.maxSelfEmployment.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Small Business</div>
                  <div className="text-muted-foreground">
                    ${selectedStateConfig.funding.maxSmallBusiness.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {!selectedStateConfig.isActive && (
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Not Available Yet</div>
                <div className="text-xs text-muted-foreground">
                  VR4DEAF is not yet available in {selectedStateConfig.name}.
                  {STATE_STATUSES.find((s) => s.code === selectedStateConfig.code)?.estimatedLaunch &&
                    ` Expected launch: ${STATE_STATUSES.find((s) => s.code === selectedStateConfig.code)?.estimatedLaunch}`}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
