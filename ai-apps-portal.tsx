"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Users,
  Calculator,
  DollarSign,
  MessageSquare,
  MapPin,
  Languages,
  BarChart3,
  Network,
  Shield,
  Building,
  PiggyBank,
  Headphones,
  Heart,
  Monitor,
  UserPlus,
  Eye,
  FileText,
  Star,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { useState } from "react"

const aiApps = [
  // Assessment & Evaluation Tools
  {
    id: "deaf-individual-assessment",
    title: "Deaf Individual Comprehensive Assessment Tool",
    description:
      "Complete evaluation of deaf individual's vocational needs, communication preferences, and career readiness",
    category: "assessment",
    icon: Users,
    tags: ["Assessment", "VR Planning", "Cultural Identity"],
    embedUrl: "https://wrapifai.com/embed/deaf-individual-assessment",
    featured: true,
  },
  {
    id: "asl-proficiency-evaluator",
    title: "ASL Proficiency & Cultural Identity Evaluator",
    description: "Assess ASL skills and cultural identity to inform service delivery approaches",
    category: "assessment",
    icon: MessageSquare,
    tags: ["ASL", "Cultural Assessment", "Communication"],
    embedUrl: "https://wrapifai.com/embed/asl-proficiency-evaluator",
  },
  {
    id: "deaf-cultural-competency",
    title: "Deaf Cultural Competency Assessment",
    description: "Evaluate service provider cultural competency in working with deaf clients",
    category: "assessment",
    icon: Heart,
    tags: ["Cultural Competency", "Provider Training", "Quality Assurance"],
    embedUrl: "https://wrapifai.com/embed/deaf-cultural-competency",
  },
  {
    id: "assistive-technology-evaluator",
    title: "Assistive Technology Evaluator",
    description: "Comprehensive assessment of assistive technology needs for workplace and daily life",
    category: "assessment",
    icon: Headphones,
    tags: ["Assistive Technology", "Workplace", "Accessibility"],
    embedUrl: "https://wrapifai.com/embed/assistive-technology-evaluator",
  },

  // Career Development & Planning
  {
    id: "deaf-career-explorer",
    title: "Deaf Career Explorer",
    description: "Explore career opportunities with deaf-friendly employers and growth potential",
    category: "career",
    icon: Briefcase,
    tags: ["Career Planning", "Job Search", "Deaf-Friendly Employers"],
    embedUrl: "https://wrapifai.com/embed/deaf-career-explorer",
    featured: true,
  },
  {
    id: "deaf-education-transition",
    title: "Deaf Education Transition Planner",
    description: "Support transition from education to employment for deaf students",
    category: "career",
    icon: GraduationCap,
    tags: ["Transition Planning", "Education", "Pre-ETS"],
    embedUrl: "https://wrapifai.com/embed/deaf-education-transition",
  },
  {
    id: "deaf-professional-network",
    title: "Deaf Professional Network & Advocacy Builder",
    description: "Build professional networks and advocacy campaigns within the deaf community",
    category: "career",
    icon: UserPlus,
    tags: ["Networking", "Advocacy", "Professional Development"],
    embedUrl: "https://wrapifai.com/embed/deaf-professional-network",
  },

  // Workplace & Accommodation Tools
  {
    id: "workplace-accommodation-planner",
    title: "Workplace Accommodation Planner",
    description: "Plan and implement effective workplace accommodations for deaf employees",
    category: "workplace",
    icon: Building,
    tags: ["Accommodations", "ADA Compliance", "Workplace"],
    embedUrl: "https://wrapifai.com/embed/workplace-accommodation-planner",
    featured: true,
  },
  {
    id: "accommodation-implementation",
    title: "Accommodation Implementation Guide",
    description: "Step-by-step guidance for implementing workplace accommodations",
    category: "workplace",
    icon: CheckCircle,
    tags: ["Implementation", "Best Practices", "Employer Guide"],
    embedUrl: "https://wrapifai.com/embed/accommodation-implementation",
  },
  {
    id: "deaf-employee-integration",
    title: "Deaf Employee Integration Assistant",
    description: "Support successful integration of deaf employees into workplace teams",
    category: "workplace",
    icon: Users,
    tags: ["Integration", "Team Building", "Workplace Culture"],
    embedUrl: "https://wrapifai.com/embed/deaf-employee-integration",
  },
  {
    id: "deaf-workplace-certification",
    title: "Deaf-Inclusive Workplace Certification Tool",
    description: "Certify workplaces as deaf-inclusive with comprehensive evaluation",
    category: "workplace",
    icon: Star,
    tags: ["Certification", "Workplace Assessment", "Best Practices"],
    embedUrl: "https://wrapifai.com/embed/deaf-workplace-certification",
  },
  {
    id: "roi-calculator",
    title: "ROI Calculator for Accommodating Deaf Employees",
    description: "Calculate return on investment for deaf employee accommodations",
    category: "workplace",
    icon: Calculator,
    tags: ["ROI", "Cost-Benefit", "Business Case"],
    embedUrl: "https://wrapifai.com/embed/roi-calculator",
  },

  // Financial & Benefits Planning
  {
    id: "benefits-optimization",
    title: "Benefits Optimization Planner",
    description: "Optimize Social Security benefits while pursuing employment goals",
    category: "financial",
    icon: DollarSign,
    tags: ["Benefits", "Social Security", "Work Incentives"],
    embedUrl: "https://wrapifai.com/embed/benefits-optimization",
    featured: true,
  },
  {
    id: "financial-independence",
    title: "Financial Independence Planner",
    description: "Create pathways to financial independence for deaf individuals",
    category: "financial",
    icon: PiggyBank,
    tags: ["Financial Planning", "Independence", "Long-term Goals"],
    embedUrl: "https://wrapifai.com/embed/financial-independence",
  },
  {
    id: "vr-funding-eligibility",
    title: "VR Funding Eligibility Checker",
    description: "Check eligibility for various VR funding sources and programs",
    category: "financial",
    icon: CheckCircle,
    tags: ["VR Funding", "Eligibility", "Program Access"],
    embedUrl: "https://wrapifai.com/embed/vr-funding-eligibility",
  },
  {
    id: "emergency-financial",
    title: "Emergency Financial Assistance Finder",
    description: "Locate emergency financial assistance resources for deaf individuals",
    category: "financial",
    icon: AlertTriangle,
    tags: ["Emergency Aid", "Crisis Support", "Financial Assistance"],
    embedUrl: "https://wrapifai.com/embed/emergency-financial",
  },

  // Service Coordination & Resources
  {
    id: "vr-counselor-matchmaker",
    title: "Deaf Client VR Counselor Matchmaker",
    description: "Match deaf clients with culturally competent VR counselors",
    category: "services",
    icon: Users,
    tags: ["Counselor Matching", "Cultural Competency", "Service Coordination"],
    embedUrl: "https://wrapifai.com/embed/vr-counselor-matchmaker",
    featured: true,
  },
  {
    id: "interpreter-scheduling",
    title: "Sign Language Interpreter Scheduling Assistant",
    description: "Schedule and coordinate ASL interpreter services efficiently",
    category: "services",
    icon: Languages,
    tags: ["Interpreter Services", "Scheduling", "ASL"],
    embedUrl: "https://wrapifai.com/embed/interpreter-scheduling",
  },
  {
    id: "community-resource-finder",
    title: "Deaf Community Resource Finder",
    description: "Locate deaf community resources and services by geographic area",
    category: "services",
    icon: MapPin,
    tags: ["Community Resources", "Geographic Search", "Service Directory"],
    embedUrl: "https://wrapifai.com/embed/community-resource-finder",
  },
  {
    id: "service-quality-tracker",
    title: "Service Quality Tracker",
    description: "Track and monitor quality of VR services and outcomes",
    category: "services",
    icon: BarChart3,
    tags: ["Quality Assurance", "Outcome Tracking", "Performance"],
    embedUrl: "https://wrapifai.com/embed/service-quality-tracker",
  },

  // Compliance & Accessibility
  {
    id: "ada-compliance-checker",
    title: "ADA Compliance Checker",
    description: "Evaluate ADA compliance for workplaces and digital accessibility",
    category: "compliance",
    icon: Shield,
    tags: ["ADA Compliance", "Legal Requirements", "Accessibility"],
    embedUrl: "https://wrapifai.com/embed/ada-compliance-checker",
  },
  {
    id: "accessibility-evaluator",
    title: "Deaf Community Accessibility Evaluator",
    description: "Comprehensive accessibility evaluation for deaf community needs",
    category: "compliance",
    icon: Eye,
    tags: ["Accessibility", "Community Assessment", "Universal Design"],
    embedUrl: "https://wrapifai.com/embed/accessibility-evaluator",
  },
]

const categories = [
  { id: "all", label: "All Tools", icon: Star, count: aiApps.length },
  {
    id: "assessment",
    label: "Assessment & Evaluation",
    icon: Users,
    count: aiApps.filter((app) => app.category === "assessment").length,
  },
  {
    id: "career",
    label: "Career Development",
    icon: Briefcase,
    count: aiApps.filter((app) => app.category === "career").length,
  },
  {
    id: "workplace",
    label: "Workplace & Accommodations",
    icon: Building,
    count: aiApps.filter((app) => app.category === "workplace").length,
  },
  {
    id: "financial",
    label: "Financial & Benefits",
    icon: DollarSign,
    count: aiApps.filter((app) => app.category === "financial").length,
  },
  {
    id: "services",
    label: "Service Coordination",
    icon: Network,
    count: aiApps.filter((app) => app.category === "services").length,
  },
  {
    id: "compliance",
    label: "Compliance & Accessibility",
    icon: Shield,
    count: aiApps.filter((app) => app.category === "compliance").length,
  },
]

export default function AIAppsPortal() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredApps = aiApps.filter((app) => {
    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredApps = aiApps.filter((app) => app.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">VR4Deaf.org AI Apps Portal</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Comprehensive AI-powered tools for vocational rehabilitation services designed by and for the deaf
              community [^2]. All tools feature built-in SEO optimization and seamless integration.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Tools */}
        {selectedCategory === "all" && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured AI Tools</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-shadow border-2 border-blue-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <app.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{app.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">{app.description}</CardDescription>
                    <Button className="w-full" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Launch Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {/* Category Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <category.icon
                    className={`h-5 w-5 ${selectedCategory === category.id ? "text-blue-600" : "text-gray-600"}`}
                  />
                  <span className="font-medium text-sm">{category.label}</span>
                </div>
                <div className="text-xs text-gray-500">{category.count} tools</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {selectedCategory === "all" ? "All AI Tools" : categories.find((c) => c.id === selectedCategory)?.label}
              <span className="text-gray-500 ml-2">({filteredApps.length})</span>
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <app.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    {app.featured && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{app.title}</CardTitle>
                  <CardDescription className="text-sm">{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {app.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Information */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold mb-4">Seamless Integration</h3>
                <p className="text-lg mb-4 opacity-90">All AI tools are built with WrapifAI technology, featuring:</p>
                <ul className="space-y-2 opacity-90">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Built-in SEO optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Responsive embed capabilities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Real-time data integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Cultural competency compliance [^2]</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Developer Resources</h3>
                <p className="text-lg mb-4 opacity-90">Ready to integrate these tools into your platform?</p>
                <div className="space-y-3">
                  <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                    <FileText className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                  <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Monitor className="h-4 w-4 mr-2" />
                    Embed Code Generator
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
