import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Calculator,
  DollarSign,
  MessageSquare,
  MapPin,
  Languages,
  BarChart3,
  Network,
  TrendingUp,
  Shield,
  Building,
  PiggyBank,
  Headphones,
  Heart,
  Monitor,
  Lightbulb,
  Megaphone,
  UserPlus,
  Eye,
  FileText,
  Database,
  Zap,
  CheckCircle,
  Star,
  Target,
} from "lucide-react"
import Link from "next/link"

const tierData = [
  {
    id: "tier1",
    title: "TIER 1 - IMMEDIATE PRIORITY",
    subtitle: "Launch Phase",
    progress: 85,
    status: "In Development",
    color: "bg-green-500",
    tools: [
      {
        icon: Users,
        title: "Deaf Individual Assessment Tool",
        description:
          "AI-powered comprehensive assessment evaluating ASL proficiency, cultural identity, vocational interests, and workplace accommodation needs for deaf individuals.",
        link: "/tools/deaf-individual-assessment",
        status: "active",
      },
      {
        icon: Calculator,
        title: "Workplace Accommodation Calculator",
        description:
          "Cost-benefit analysis tool for employers to understand accommodation expenses and ROI, with pre-populated deaf-specific accommodation options.",
      },
      {
        icon: DollarSign,
        title: "Benefits Optimization Calculator",
        description:
          "Comprehensive tool analyzing Social Security benefits, work incentives, and financial planning for deaf individuals entering the workforce.",
      },
      {
        icon: MessageSquare,
        title: "Deaf Cultural Communication Assessment Tool",
        description:
          "Assessment platform evaluating communication preferences, ASL proficiency, and cultural identity to inform service delivery approaches.",
      },
      {
        icon: MapPin,
        title: "Community Resource Locator",
        description:
          "Geographic mapping system identifying deaf-accessible services, interpreters, and community organizations by location and service type.",
      },
    ],
  },
  {
    id: "tier2",
    title: "TIER 2 - EARLY EXPANSION",
    subtitle: "Months 3-6",
    progress: 45,
    status: "Planning",
    color: "bg-blue-500",
    tools: [
      {
        icon: Languages,
        title: "Interpreter Service Coordinator",
        description:
          "Centralized platform for scheduling, managing, and quality-assuring ASL interpreter services across multiple providers and service types.",
      },
      {
        icon: BarChart3,
        title: "Vocational Interest & Aptitude Analyzer",
        description:
          "Culturally adapted assessment tools measuring career interests and aptitudes specifically normed for deaf populations.",
      },
      {
        icon: Network,
        title: "Provider Network Performance Analyzer",
        description:
          "Quality metrics dashboard tracking service provider performance, client outcomes, and cultural competency indicators.",
      },
      {
        icon: TrendingUp,
        title: "Outcome Tracking Dashboard",
        description:
          "Comprehensive analytics platform monitoring employment outcomes, career advancement, and long-term success metrics for deaf VR clients.",
      },
      {
        icon: Shield,
        title: "ADA Compliance Checker",
        description:
          "Automated assessment tool evaluating workplace and digital accessibility compliance with ADA requirements and best practices.",
      },
    ],
  },
  {
    id: "tier3",
    title: "TIER 3 - GROWTH PHASE",
    subtitle: "Months 6-12",
    progress: 20,
    status: "Research",
    color: "bg-orange-500",
    tools: [
      {
        icon: Building,
        title: "Employer Certification Tool",
        description:
          "Certification program and assessment platform recognizing employers as deaf-friendly workplaces with verified accommodation practices.",
      },
      {
        icon: PiggyBank,
        title: "Financial Independence Pathway Planner",
        description:
          "Long-term financial planning tool creating personalized roadmaps for achieving financial independence while managing disability benefits.",
      },
      {
        icon: Headphones,
        title: "Assistive Technology Needs Assessment",
        description:
          "Comprehensive evaluation platform determining optimal assistive technology solutions based on individual needs and workplace requirements.",
      },
      {
        icon: Heart,
        title: "Mental Health Screener",
        description:
          "Culturally appropriate mental health assessment tools designed specifically for deaf individuals with appropriate referral pathways.",
      },
      {
        icon: Monitor,
        title: "Remote Work Readiness Evaluator",
        description:
          "Assessment platform evaluating readiness for remote work including technology skills, communication tools, and workspace setup.",
      },
    ],
  },
  {
    id: "tier4",
    title: "TIER 4 - ADVANCED FEATURES",
    subtitle: "Year 2+",
    progress: 5,
    status: "Conceptual",
    color: "bg-purple-500",
    tools: [
      {
        icon: Lightbulb,
        title: "Innovation Opportunity Identifier",
        description:
          "AI-powered platform identifying emerging career opportunities and entrepreneurship possibilities in the deaf community.",
      },
      {
        icon: Megaphone,
        title: "Community Advocacy Campaign Generator",
        description:
          "Tool for creating and managing advocacy campaigns for deaf rights, accessibility improvements, and policy changes.",
      },
      {
        icon: UserPlus,
        title: "Professional Network Builder",
        description:
          "Networking platform connecting deaf professionals, mentors, and career opportunities within the deaf community ecosystem.",
      },
      {
        icon: Eye,
        title: "Digital Accessibility Auditor",
        description:
          "Automated testing platform evaluating websites, applications, and digital content for deaf accessibility compliance.",
      },
      {
        icon: FileText,
        title: "Success Story Documentation System",
        description:
          "Platform for collecting, documenting, and sharing success stories to inspire and guide other deaf individuals in their career journeys.",
      },
    ],
  },
]

const integrationData = {
  apiConnections: [
    { icon: Database, title: "Government Benefits Databases", description: "SSA, state benefits systems" },
    { icon: Building, title: "VR Agency Systems", description: "State VR databases and case management" },
    { icon: Users, title: "Employer Databases", description: "Job boards and employer networks" },
    { icon: Headphones, title: "Assistive Technology Catalogs", description: "AT vendor and product databases" },
    { icon: MapPin, title: "Community Organization Directories", description: "Deaf community resource databases" },
  ],
  dataSources: [
    { icon: BarChart3, title: "Bureau of Labor Statistics", description: "Employment data and trends" },
    { icon: DollarSign, title: "ADA Accommodation Cost Databases", description: "Accommodation pricing and ROI data" },
    { icon: Network, title: "State VR Agency Provider Lists", description: "Certified service provider directories" },
    { icon: Users, title: "Deaf Community Organizations", description: "Community resource and service directories" },
    { icon: Zap, title: "Assistive Technology Vendors", description: "Product catalogs and compatibility data" },
  ],
  qualityFeatures: [
    { icon: Star, title: "User Feedback Integration", description: "Continuous improvement through user input" },
    { icon: CheckCircle, title: "Outcome Validation", description: "Evidence-based effectiveness tracking" },
    {
      icon: MessageSquare,
      title: "Cultural Competency Verification",
      description: "Deaf community standards compliance",
    },
    { icon: Shield, title: "Compliance Monitoring", description: "Legal and regulatory adherence tracking" },
    { icon: Target, title: "Performance Optimization", description: "Continuous system enhancement and tuning" },
  ],
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">VR4Deaf.org Tools & Platform</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive vocational rehabilitation tools designed by and for the deaf community, following our DEAF
              FIRST philosophy of empowerment and self-determination [^2].
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="tier1" className="space-y-8">
          {/* Tier Navigation */}
          <TabsList className="grid w-full grid-cols-4 h-auto p-1">
            {tierData.map((tier) => (
              <TabsTrigger
                key={tier.id}
                value={tier.id}
                className="flex flex-col items-center p-4 data-[state=active]:bg-white"
              >
                <div className="text-sm font-medium">{tier.title.split(" - ")[1]}</div>
                <div className="text-xs text-muted-foreground mt-1">{tier.subtitle}</div>
                <Badge variant="outline" className="mt-2 text-xs">
                  {tier.status}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tier Content */}
          {tierData.map((tier) => (
            <TabsContent key={tier.id} value={tier.id} className="space-y-6">
              {/* Tier Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{tier.title}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {tier.subtitle} • {tier.status}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{tier.progress}%</div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={tier.progress} className="h-2" />
                  </div>
                </CardHeader>
              </Card>

              {/* Tools Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tier.tools.map((tool, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${tier.color} bg-opacity-10`}>
                          <tool.icon className={`h-6 w-6 ${tier.color.replace("bg-", "text-")}`} />
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed mb-4">{tool.description}</CardDescription>
                      {tool.link && (
                        <Link href={tool.link}>
                          <Button variant="outline" size="sm" className="w-full">
                            Access Tool
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Separator className="my-12" />

        {/* Integration Strategy */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tool Integration Strategy</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive integration approach ensures seamless connectivity with existing systems while
              maintaining the highest standards of cultural competency and accessibility [^2].
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* API Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>API Connections</span>
                </CardTitle>
                <CardDescription>Essential system integrations for comprehensive service delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationData.apiConnections.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Data Sources</span>
                </CardTitle>
                <CardDescription>Critical data integration for informed decision-making</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationData.dataSources.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quality Assurance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Quality Assurance</span>
                </CardTitle>
                <CardDescription>Continuous improvement and compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationData.qualityFeatures.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Vocational Rehabilitation?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join us in building the future of deaf-centered vocational rehabilitation services. Our tools are designed
              to empower, not accommodate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Request Demo
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
