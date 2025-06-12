"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Phone, Mail, Users, Ear, Eye, GraduationCap, Briefcase, Heart, AlertTriangle, CheckCircle } from "lucide-react"

export default function OhioDeafServices() {
  const coreServices = [
    {
      title: "Vocational Rehabilitation Services",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Comprehensive employment preparation and job placement services",
      services: [
        "Career counseling and guidance",
        "Vocational assessment and evaluation",
        "Job training and skill development",
        "Job placement assistance",
        "Post-employment support services",
        "Workplace accommodation consultation",
      ],
      eligibility: "Individuals with hearing loss that impacts employment",
      cost: "No cost for most services",
    },
    {
      title: "Communication Services",
      icon: <Users className="w-5 h-5" />,
      description: "Professional interpretation and communication support",
      services: [
        "American Sign Language (ASL) interpreters",
        "Oral interpreters and transliterators",
        "Communication Access Realtime Translation (CART)",
        "Video Remote Interpreting (VRI)",
        "Tactile interpreting for deafblind individuals",
        "Support Service Providers (SSPs)",
      ],
      eligibility: "VR clients requiring communication access",
      cost: "Covered for VR-related activities",
    },
    {
      title: "Assistive Technology",
      icon: <Ear className="w-5 h-5" />,
      description: "Technology and devices to support employment goals",
      services: [
        "Hearing aids and cochlear implant support",
        "FM and infrared assistive listening systems",
        "Alerting devices (visual/vibrotactile)",
        "Computer software and hardware adaptations",
        "Workplace communication devices",
        "Assistive technology training",
      ],
      eligibility: "Based on employment need assessment",
      cost: "Varies - see current fee schedule",
    },
    {
      title: "Educational Support",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Support for post-secondary education and training",
      services: [
        "College and university interpreter services",
        "Note-taking services",
        "Assistive technology for students",
        "Academic accommodation consultation",
        "Tuition assistance (when appropriate)",
        "Educational counseling and planning",
      ],
      eligibility: "VR clients pursuing education for employment",
      cost: "Varies based on program and individual circumstances",
    },
  ]

  const specializedPrograms = [
    {
      title: "Deafblind Services",
      icon: <Eye className="w-5 h-5" />,
      description: "Specialized support for individuals with combined hearing and vision loss",
      features: [
        "Support Service Providers (SSPs)",
        "Tactile communication training",
        "Orientation and mobility services",
        "Assistive technology for dual sensory loss",
        "Independent living skills training",
        "Specialized job coaching",
      ],
      contact: "Specialized deafblind counselors available",
    },
    {
      title: "Transition Services",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Support for students transitioning from school to work",
      features: [
        "Pre-employment transition services",
        "Work-based learning experiences",
        "Job exploration counseling",
        "Workplace readiness training",
        "Self-advocacy skill development",
        "Post-secondary education exploration",
      ],
      contact: "Transition counselors in each region",
    },
    {
      title: "Mental Health Support",
      icon: <Heart className="w-5 h-5" />,
      description: "Culturally appropriate mental health services",
      features: [
        "Deaf-competent mental health professionals",
        "ASL-accessible counseling services",
        "Crisis intervention support",
        "Substance abuse treatment referrals",
        "Trauma-informed care",
        "Peer support programs",
      ],
      contact: "Referrals through VR counselors",
    },
  ]

  const regionalOffices = [
    {
      region: "Central Ohio",
      cities: "Columbus, Delaware, Marion",
      phone: "(614) 438-1255",
      email: "centralvr@ood.ohio.gov",
      specialties: ["Urban deaf services", "ASL interpreter coordination", "College support"],
    },
    {
      region: "Northeast Ohio",
      cities: "Cleveland, Akron, Youngstown",
      phone: "(216) 787-0915",
      email: "northeastvr@ood.ohio.gov",
      specialties: ["Industrial job placement", "Deafblind services", "Technology training"],
    },
    {
      region: "Southwest Ohio",
      cities: "Cincinnati, Dayton, Hamilton",
      phone: "(513) 852-1282",
      email: "southwestvr@ood.ohio.gov",
      specialties: ["Manufacturing support", "Healthcare careers", "Transition services"],
    },
    {
      region: "Northwest Ohio",
      cities: "Toledo, Lima, Findlay",
      phone: "(419) 245-2876",
      email: "northwestvr@ood.ohio.gov",
      specialties: ["Agricultural careers", "Rural services", "Transportation support"],
    },
    {
      region: "Southeast Ohio",
      cities: "Athens, Portsmouth, Zanesville",
      phone: "(740) 593-5240",
      email: "southeastvr@ood.ohio.gov",
      specialties: ["Rural outreach", "Mining industry", "Distance services"],
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Ohio Deaf, Deafblind & Hard of Hearing Services</h1>
        <p className="text-muted-foreground">
          Comprehensive vocational rehabilitation services specifically designed for the deaf community
        </p>
        <Badge variant="outline" className="bg-blue-50">
          Ohio Department of Development - Bureau of Vocational Rehabilitation
        </Badge>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800">Official Page Unavailable</AlertTitle>
        <AlertDescription className="text-orange-700">
          The official Ohio deaf services page is showing a 404 error. This comprehensive backup provides all essential
          service information for deaf, deafblind, and hard of hearing individuals.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Core Services</TabsTrigger>
          <TabsTrigger value="specialized">Specialized Programs</TabsTrigger>
          <TabsTrigger value="regional">Regional Offices</TabsTrigger>
          <TabsTrigger value="apply">How to Apply</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {coreServices.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {service.icon}
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Services Include:</h4>
                    <ul className="text-sm space-y-1">
                      {service.services.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="p-2 bg-blue-50 rounded">
                      <strong>Eligibility:</strong> {service.eligibility}
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <strong>Cost:</strong> {service.cost}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specialized" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {specializedPrograms.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {program.icon}
                    {program.title}
                  </CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Program Features:</h4>
                    <ul className="text-sm space-y-1">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-xs">
                    <strong>Contact:</strong> {program.contact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional VR Offices Serving Deaf Clients</CardTitle>
              <CardDescription>Ohio VR has specialized deaf services coordinators in each region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                {regionalOffices.map((office, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{office.region}</h3>
                      <p className="text-sm text-muted-foreground">Serving: {office.cities}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{office.email}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {office.specialties.map((specialty, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>How to Apply for Services</CardTitle>
                <CardDescription>Step-by-step process for accessing Ohio VR deaf services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Contact Your Regional Office</h4>
                      <p className="text-sm text-muted-foreground">
                        Call or email your regional VR office to request an appointment
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Initial Interview</h4>
                      <p className="text-sm text-muted-foreground">
                        Meet with a VR counselor (interpreter provided if needed)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Eligibility Determination</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete assessments to determine eligibility and service needs
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Develop Your Plan</h4>
                      <p className="text-sm text-muted-foreground">
                        Create an Individualized Plan for Employment (IPE)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold">Begin Services</h4>
                      <p className="text-sm text-muted-foreground">
                        Start receiving VR services toward your employment goal
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documentation</CardTitle>
                <CardDescription>What to bring to your first appointment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-700">Required:</h4>
                    <ul className="text-sm space-y-1 mt-1">
                      <li>• Photo identification</li>
                      <li>• Social Security card</li>
                      <li>• Proof of legal work authorization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700">Helpful (if available):</h4>
                    <ul className="text-sm space-y-1 mt-1">
                      <li>• Medical records related to hearing loss</li>
                      <li>• Audiological reports</li>
                      <li>• Educational transcripts</li>
                      <li>• Previous work history</li>
                      <li>• SSI/SSDI award letters</li>
                      <li>• Insurance information</li>
                    </ul>
                  </div>
                </div>
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    Don't have all documents? You can still apply! Services can begin while gathering additional
                    documentation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-green-800">Emergency Contact Information</h3>
            <p className="text-sm text-green-700">
              If you need immediate VR assistance or have questions about deaf services:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-4">
              <Button variant="outline" size="sm" className="border-green-600 text-green-700">
                <Phone className="w-4 h-4 mr-2" />
                1-800-282-4536
              </Button>
              <Button variant="outline" size="sm" className="border-green-600 text-green-700">
                <Mail className="w-4 h-4 mr-2" />
                BVR@ood.ohio.gov
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
