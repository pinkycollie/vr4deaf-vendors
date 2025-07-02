import type { Metadata } from "next"
import { Bot, Briefcase, Building, Users, Zap, Shield, Globe, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Platform Overview | VR4DEAF Documentation",
  description: "Comprehensive overview of the VR4DEAF AI-powered vocational rehabilitation platform",
}

export default function PlatformOverviewPage() {
  const coreFeatures = [
    {
      icon: <Bot className="h-6 w-6 text-texas-red-600" />,
      title: "AI-Powered VR Matching",
      description:
        "Advanced AI algorithms match users with optimal VR offices, services, and opportunities based on comprehensive profile analysis.",
      capabilities: [
        "Intelligent VR office matching",
        "Service recommendation engine",
        "Funding optimization analysis",
        "Outcome prediction modeling",
      ],
    },
    {
      icon: <Briefcase className="h-6 w-6 text-texas-blue-600" />,
      title: "Workforce Development Integration",
      description:
        "Seamless integration with workforce development systems, job boards, and employer networks nationwide.",
      capabilities: [
        "Real-time job market analysis",
        "Employer partnership network",
        "Skills gap identification",
        "Career pathway mapping",
      ],
    },
    {
      icon: <Building className="h-6 w-6 text-green-600" />,
      title: "VR Program Compliance",
      description: "Built-in compliance with all state VR programs, funding requirements, and federal regulations.",
      capabilities: [
        "Multi-state VR integration",
        "Automated compliance tracking",
        "Funding requirement alignment",
        "Outcome reporting automation",
      ],
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Deaf-Centered Design",
      description:
        "Every aspect designed with deaf culture, communication preferences, and accessibility needs in mind.",
      capabilities: [
        "ASL-first interface design",
        "Visual communication tools",
        "Cultural competency integration",
        "Community-driven features",
      ],
    },
  ]

  const vrServices = [
    {
      category: "Employment Services",
      icon: <Briefcase className="h-5 w-5" />,
      services: [
        "AI-powered job matching",
        "Resume building and optimization",
        "Interview preparation and coaching",
        "Workplace accommodation guidance",
        "Employer relationship management",
        "Follow-up and retention support",
      ],
    },
    {
      category: "Self-Employment Support",
      icon: <Building className="h-5 w-5" />,
      services: [
        "Business concept development",
        "Feasibility study assistance",
        "Business plan creation",
        "Funding application support",
        "Legal compliance guidance",
        "Ongoing business mentorship",
      ],
    },
    {
      category: "Skills Development",
      icon: <GraduationCap className="h-5 w-5" />,
      services: [
        "Industry certification programs",
        "Digital literacy training",
        "Soft skills development",
        "Leadership training",
        "Technical skills assessment",
        "Career advancement planning",
      ],
    },
    {
      category: "Support Services",
      icon: <Shield className="h-5 w-5" />,
      services: [
        "VR application assistance",
        "Funding optimization",
        "Rights and advocacy education",
        "Crisis intervention support",
        "Peer mentorship programs",
        "Family support services",
      ],
    },
  ]

  const aiCapabilities = [
    {
      name: "Profile Analysis",
      description: "Comprehensive analysis of user skills, interests, goals, and barriers to employment",
      accuracy: "94%",
    },
    {
      name: "VR Office Matching",
      description: "Intelligent matching with VR offices based on specialties, location, and success rates",
      accuracy: "91%",
    },
    {
      name: "Job Recommendations",
      description: "Personalized job recommendations based on skills, preferences, and market demand",
      accuracy: "88%",
    },
    {
      name: "Funding Optimization",
      description: "Analysis and optimization of VR funding requests for maximum approval likelihood",
      accuracy: "96%",
    },
    {
      name: "Outcome Prediction",
      description: "Predictive modeling for employment outcomes and service effectiveness",
      accuracy: "89%",
    },
    {
      name: "Risk Assessment",
      description: "Early identification of potential barriers and intervention recommendations",
      accuracy: "92%",
    },
  ]

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">VR4DEAF Platform Overview</h1>
        <p className="text-xl text-muted-foreground">
          The first AI-powered vocational rehabilitation platform designed specifically for deaf individuals,
          integrating workforce development, VR services, and employment support across all 50 states.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="services">VR Services</TabsTrigger>
          <TabsTrigger value="ai">AI Capabilities</TabsTrigger>
          <TabsTrigger value="integration">System Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {coreFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {feature.icon}
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Multi-State Coverage
              </CardTitle>
              <CardDescription>
                Comprehensive coverage across all 50 states with state-specific VR program integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-sm text-muted-foreground">States Active</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">18</div>
                  <div className="text-sm text-muted-foreground">States in Development</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">20</div>
                  <div className="text-sm text-muted-foreground">States Planned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {vrServices.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.icon}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>VR Funding Integration</CardTitle>
              <CardDescription>
                All services are designed to align with VR funding requirements and maximize approval rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-medium mb-2">Job Seeker Services</h4>
                  <p className="text-sm text-muted-foreground">Up to $5,000 - $15,000 per individual</p>
                  <Badge variant="outline" className="mt-1">
                    VR Funded
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Self-Employment Support</h4>
                  <p className="text-sm text-muted-foreground">Up to $15,000 - $25,000 for business startup</p>
                  <Badge variant="outline" className="mt-1">
                    VR Funded
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Training Programs</h4>
                  <p className="text-sm text-muted-foreground">Up to $10,000 - $20,000 for certification</p>
                  <Badge variant="outline" className="mt-1">
                    VR Funded
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-8">
          <div className="grid gap-4">
            {aiCapabilities.map((capability, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{capability.name}</h3>
                    <Badge variant="outline">{capability.accuracy} Accuracy</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Processing Pipeline
              </CardTitle>
              <CardDescription>
                Advanced machine learning pipeline for real-time analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-texas-red-100 flex items-center justify-center text-texas-red-600 font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Data Ingestion</h4>
                    <p className="text-sm text-muted-foreground">Collect and normalize user profile data</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-texas-blue-100 flex items-center justify-center text-texas-blue-600 font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">AI Analysis</h4>
                    <p className="text-sm text-muted-foreground">Apply machine learning models for insights</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Recommendation Engine</h4>
                    <p className="text-sm text-muted-foreground">Generate personalized recommendations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Continuous Learning</h4>
                    <p className="text-sm text-muted-foreground">Update models based on outcomes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>VR System Integration</CardTitle>
                <CardDescription>Direct integration with state VR management systems</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time case status updates</li>
                  <li>• Automated progress reporting</li>
                  <li>• Funding request optimization</li>
                  <li>• Outcome tracking and analytics</li>
                  <li>• Compliance monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workforce Development APIs</CardTitle>
                <CardDescription>Integration with workforce development systems</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Job board aggregation</li>
                  <li>• Skills assessment platforms</li>
                  <li>• Training provider networks</li>
                  <li>• Employer partnership systems</li>
                  <li>• Labor market data feeds</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Infrastructure</CardTitle>
                <CardDescription>Comprehensive accessibility and ASL support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• ASL video interpretation</li>
                  <li>• Real-time captioning</li>
                  <li>• Visual interface design</li>
                  <li>• Screen reader optimization</li>
                  <li>• Mobile accessibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security & Compliance</CardTitle>
                <CardDescription>Enterprise-grade security and privacy protection</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• HIPAA compliance</li>
                  <li>• State data residency requirements</li>
                  <li>• End-to-end encryption</li>
                  <li>• Audit trail logging</li>
                  <li>• Privacy by design</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
