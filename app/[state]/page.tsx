import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, DollarSign, Users, Calendar, Mail } from "lucide-react"
import Link from "next/link"
import GroqChatInterface from "@/components/groq-chat-interface"

interface StateData {
  state: string
  abbreviation: string
  videoUrl: string
  summary: string
  vrOffices: Array<{
    name: string
    address: string
    phone: string
    aslServices: boolean
    specializations: string[]
  }>
  fundingLimits: {
    jobTraining: string
    equipment: string
    selfEmployment: string
  }
  resources: Array<{
    name: string
    url: string
  }>
  successStories: Array<{
    name: string
    outcome: string
    timeline: string
    funding: string
  }>
}

async function getStateData(state: string): Promise<StateData | null> {
  try {
    const stateData = await import(`@/data/${state}.json`)
    return stateData.default
  } catch (error) {
    return null
  }
}

export default async function StatePage({ params }: { params: { state: string } }) {
  const stateData = await getStateData(params.state)

  if (!stateData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600 text-white">VR4DEAF • {stateData.abbreviation}</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">{stateData.state} VR Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{stateData.summary}</p>
          </div>

          {/* ASL Video Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  ASL Welcome Message
                </CardTitle>
                <CardDescription>Watch our ASL introduction to VR services in {stateData.state}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">ASL Video Coming Soon</p>
                    <p className="text-sm text-gray-400">
                      Professional ASL interpretation of {stateData.state} VR services
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* VR Offices Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">VR Offices in {stateData.state}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {stateData.vrOffices.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    {office.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {office.phone}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{office.address}</p>

                  {office.aslServices && (
                    <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      ASL Services Available
                    </Badge>
                  )}

                  <div className="space-y-2">
                    <p className="font-medium text-sm">Specializations:</p>
                    <div className="flex flex-wrap gap-2">
                      {office.specializations.map((spec, specIndex) => (
                        <Badge key={specIndex} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Information */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">VR Funding Limits</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <CardTitle>Job Training</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">{stateData.fundingLimits.jobTraining}</p>
                <p className="text-sm text-muted-foreground">
                  Maximum funding for skills training and certification programs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <CardTitle>Equipment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">{stateData.fundingLimits.equipment}</p>
                <p className="text-sm text-muted-foreground">Assistive technology and workplace equipment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <CardTitle>Self-Employment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-2">{stateData.fundingLimits.selfEmployment}</p>
                <p className="text-sm text-muted-foreground">Business startup and entrepreneurship support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories from {stateData.state}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {stateData.successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <CardDescription>{story.outcome}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {story.timeline}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {story.funding} VR funding
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Ask VURI About {stateData.state} VR Services</h2>
          <GroqChatInterface
            context={`VR services in ${stateData.state}`}
            placeholder={`Ask about VR services, job opportunities, or funding in ${stateData.state}...`}
            title={`VURI - ${stateData.state} VR Assistant`}
          />
        </div>
      </section>

      {/* Resources & Actions */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Get Started Today</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stateData.resources.map((resource, index) => (
              <Button key={index} asChild className="h-auto p-4 text-left justify-start">
                <Link href={resource.url}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {resource.name.includes("email") || resource.name.includes("Coordinator") ? (
                        <Mail className="h-4 w-4" />
                      ) : resource.name.includes("Book") || resource.name.includes("Consultation") ? (
                        <Calendar className="h-4 w-4" />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                      <span className="font-medium text-sm">{resource.name}</span>
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-2xl font-bold mb-4">VR4DEAF • {stateData.state}</h3>
          <p className="text-gray-400 mb-6">
            Empowering deaf individuals through AI-powered vocational rehabilitation services
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <span>Powered by MBTQ Universe</span>
            <span>•</span>
            <span>Built with PinkSync Technology</span>
            <span>•</span>
            <span>© 2025 VR4DEAF.org</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function generateStaticParams() {
  // Generate static params for all 50 states
  const states = [
    "alabama",
    "alaska",
    "arizona",
    "arkansas",
    "california",
    "colorado",
    "connecticut",
    "delaware",
    "florida",
    "georgia",
    "hawaii",
    "idaho",
    "illinois",
    "indiana",
    "iowa",
    "kansas",
    "kentucky",
    "louisiana",
    "maine",
    "maryland",
    "massachusetts",
    "michigan",
    "minnesota",
    "mississippi",
    "missouri",
    "montana",
    "nebraska",
    "nevada",
    "new-hampshire",
    "new-jersey",
    "new-mexico",
    "new-york",
    "north-carolina",
    "north-dakota",
    "ohio",
    "oklahoma",
    "oregon",
    "pennsylvania",
    "rhode-island",
    "south-carolina",
    "south-dakota",
    "tennessee",
    "texas",
    "utah",
    "vermont",
    "virginia",
    "washington",
    "west-virginia",
    "wisconsin",
    "wyoming",
  ]

  return states.map((state) => ({
    state: state,
  }))
}
