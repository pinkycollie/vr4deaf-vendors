import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, ExternalLink, Clock, Users, DollarSign } from "lucide-react"
import type { StateConfig, VROffice } from "@/lib/states/types"
import Link from "next/link"

interface StateSpecificServicesProps {
  stateConfig: StateConfig
  vrOffices: VROffice[]
}

export default function StateSpecificServices({ stateConfig, vrOffices }: StateSpecificServicesProps) {
  const getStatusBadge = () => {
    if (stateConfig.isActive) {
      return <Badge className="bg-green-600">Active</Badge>
    }
    return <Badge variant="outline">Coming Soon</Badge>
  }

  return (
    <div className="space-y-12">
      {/* State Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">{stateConfig.name} VR Services</h1>
          {getStatusBadge()}
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{stateConfig.vrProgram.name}</p>
      </div>

      {/* State Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-sm font-medium">Deaf Population</div>
                <div className="text-2xl font-bold">{stateConfig.demographics.deafPopulation.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium">VR Offices</div>
                <div className="text-lg">{stateConfig.demographics.vrOfficeCount} locations</div>
              </div>
              <div>
                <div className="text-sm font-medium">Average Wait Time</div>
                <div className="text-lg">{stateConfig.demographics.averageWaitTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Funding Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-sm font-medium">Job Seeker Services</div>
                <div className="text-2xl font-bold">${stateConfig.funding.maxJobSeeker.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Self-Employment</div>
                <div className="text-lg">${stateConfig.funding.maxSelfEmployment.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Small Business</div>
                <div className="text-lg">${stateConfig.funding.maxSmallBusiness.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Available Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {stateConfig.features.aslSupport && <Badge variant="outline">ASL Support</Badge>}
                {stateConfig.features.ticketToWork && <Badge variant="outline">Ticket to Work</Badge>}
                {stateConfig.features.selfEmploymentServices && <Badge variant="outline">Self-Employment</Badge>}
                {stateConfig.features.businessServices && <Badge variant="outline">Business Services</Badge>}
              </div>

              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link href={stateConfig.vrProgram.website} target="_blank" rel="noopener">
                    Visit State VR Program <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VR Offices */}
      {vrOffices.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">VR Offices in {stateConfig.name}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vrOffices.map((office) => (
              <Card key={office.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{office.name}</CardTitle>
                  <CardDescription>
                    {office.city}, {stateConfig.code}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      {office.address}
                      <br />
                      {office.city}, {stateConfig.code} {office.zipCode}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${office.phone}`} className="text-sm hover:underline">
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${office.email}`} className="text-sm hover:underline">
                      {office.email}
                    </a>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Specialties</div>
                    <div className="flex flex-wrap gap-1">
                      {office.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Accessibility</div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className={office.accessibility.aslInterpreters ? "text-green-600" : "text-gray-400"}>
                        ASL Interpreters
                      </div>
                      <div className={office.accessibility.videoRelay ? "text-green-600" : "text-gray-400"}>
                        Video Relay
                      </div>
                      <div className={office.accessibility.ttyServices ? "text-green-600" : "text-gray-400"}>
                        TTY Services
                      </div>
                      <div className={office.accessibility.wheelchairAccessible ? "text-green-600" : "text-gray-400"}>
                        Wheelchair Access
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* State-Specific Information */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started in {stateConfig.name}</CardTitle>
          <CardDescription>Steps to access VR services in {stateConfig.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3">Eligibility Requirements</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Have a physical or mental disability that affects ability to work</li>
                <li>• Need VR services to prepare for, find, keep, or advance in employment</li>
                <li>• Be able to benefit from VR services to achieve employment outcome</li>
                <li>• Be present in {stateConfig.name} and eligible to work in the US</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Application Process</h4>
              <ol className="text-sm space-y-1 text-muted-foreground list-decimal list-inside">
                <li>Contact your local VR office or apply online</li>
                <li>Complete the VR application and provide required documentation</li>
                <li>Participate in eligibility determination process</li>
                <li>Work with counselor to develop Individualized Plan for Employment (IPE)</li>
                <li>Begin receiving approved VR services</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h5 className="font-medium mb-2">VR4DEAF Integration</h5>
            <p className="text-sm text-muted-foreground">
              {stateConfig.isActive
                ? `VR4DEAF is fully integrated with ${stateConfig.name}'s VR system. Our AI platform can help you navigate the application process, find the nearest office, and maximize your funding opportunities.`
                : `VR4DEAF is coming soon to ${stateConfig.name}. Join our waitlist to be notified when we launch and get early access to our AI-powered VR navigation tools.`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Information */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Privacy</CardTitle>
          <CardDescription>{stateConfig.name}-specific compliance requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">Data Protection</h5>
              <div className="flex flex-wrap gap-2">
                {stateConfig.compliance.specificRequirements.map((req, index) => (
                  <Badge key={index} variant="outline">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            {stateConfig.compliance.dataResidency && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Data Residency:</strong> {stateConfig.name} requires that certain data be stored within state
                  boundaries. VR4DEAF maintains compliant data storage infrastructure to meet these requirements.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
