"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Bot, Briefcase, Building, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function DualAudienceHero() {
  const [activeAudience, setActiveAudience] = useState<"users" | "agencies">("users")
  const [currentEmploymentType, setCurrentEmploymentType] = useState(0)
  const employmentTypes = ["Employment", "Self-Employment", "Business"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmploymentType((prev) => (prev + 1) % employmentTypes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const userBenefits = [
    "AI-powered job matching with deaf-friendly employers",
    "Free services when VR approves your funding",
    "ASL support and culturally competent guidance",
    "Business startup assistance and coaching",
    "Skills training and certification programs",
  ]

  const agencyBenefits = [
    "Specialized vendor for deaf VR clients",
    "85% job placement success rate",
    "AI-enhanced service delivery and reporting",
    "Cost-effective outcomes with measurable ROI",
    "Comprehensive compliance and documentation",
  ]

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-texas-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-texas-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        {/* Audience Selector */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg mb-6">
            <Button
              variant={activeAudience === "users" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveAudience("users")}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              For Deaf Individuals
            </Button>
            <Button
              variant={activeAudience === "agencies" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveAudience("agencies")}
              className="flex items-center gap-2"
            >
              <Building className="h-4 w-4" />
              For VR Agencies
            </Button>
          </div>
        </div>

        <Tabs value={activeAudience} className="w-full">
          <TabsContent value="users" className="space-y-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="px-3 py-1 border-texas-red-300 bg-texas-red-50 text-texas-red-700">
                  <Bot className="mr-1 h-3 w-3" /> AI-Powered
                </Badge>
                <Badge
                  variant="outline"
                  className="px-3 py-1 border-texas-blue-300 bg-texas-blue-50 text-texas-blue-700"
                >
                  ASL-Friendly
                </Badge>
                <Badge variant="outline" className="px-3 py-1 border-green-300 bg-green-50 text-green-700">
                  VR Funded
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Your AI-Powered Path to{" "}
                <span className="bg-gradient-to-r from-texas-red-600 to-texas-blue-600 bg-clip-text text-transparent">
                  {employmentTypes[currentEmploymentType]}
                </span>{" "}
                Success
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                The first AI platform designed specifically for deaf individuals seeking employment, self-employment,
                and business opportunities. Get matched with VR services and unlock your career potential.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="border-texas-blue-200 bg-texas-blue-50 dark:bg-texas-blue-900/20">
                  <CardContent className="pt-6 text-center">
                    <Briefcase className="h-8 w-8 text-texas-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium">Job Placement</h3>
                    <p className="text-sm text-muted-foreground">AI-powered matching with deaf-friendly employers</p>
                  </CardContent>
                </Card>
                <Card className="border-texas-red-200 bg-texas-red-50 dark:bg-texas-red-900/20">
                  <CardContent className="pt-6 text-center">
                    <Bot className="h-8 w-8 text-texas-red-600 mx-auto mb-2" />
                    <h3 className="font-medium">Self-Employment</h3>
                    <p className="text-sm text-muted-foreground">Business startup assistance and coaching</p>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CardContent className="pt-6 text-center">
                    <Building className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium">Skills Training</h3>
                    <p className="text-sm text-muted-foreground">Industry certifications with ASL support</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-card border rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">What You Get:</h3>
                <div className="grid gap-3 md:grid-cols-2 text-left">
                  {userBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-texas-red-600 hover:bg-texas-red-700">
                  <Link href="#contact">
                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agencies" className="space-y-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="px-3 py-1 border-blue-300 bg-blue-50 text-blue-700">
                  Certified Vendor
                </Badge>
                <Badge variant="outline" className="px-3 py-1 border-green-300 bg-green-50 text-green-700">
                  85% Success Rate
                </Badge>
                <Badge variant="outline" className="px-3 py-1 border-purple-300 bg-purple-50 text-purple-700">
                  AI-Enhanced
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Specialized VR Vendor for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Deaf Community Services
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Partner with VR4DEAF to deliver exceptional outcomes for your deaf VR clients. Our AI-powered platform
                provides specialized services with proven results and comprehensive reporting.
              </p>

              <div className="grid gap-6 md:grid-cols-3 mb-8">
                <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-blue-600">85%</div>
                    <CardTitle className="text-lg">Job Placement Rate</CardTitle>
                    <CardDescription>90-day retention success</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-green-600">$3,200</div>
                    <CardTitle className="text-lg">Avg. Cost Per Placement</CardTitle>
                    <CardDescription>Below industry average</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-purple-600">1</div>
                    <CardTitle className="text-lg">State Active</CardTitle>
                    <CardDescription>Expanding nationwide</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="bg-card border rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Agency Benefits:</h3>
                <div className="grid gap-3 md:grid-cols-2 text-left">
                  {agencyBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Request Partnership Info
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/vendor-services">View Services & Pricing</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
