"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Download, AlertTriangle, Phone, Mail, MapPin, FileText, Users } from "lucide-react"

export default function OhioVRExtension() {
  const [resourceStatus, setResourceStatus] = useState<"checking" | "available" | "unavailable">("checking")

  const checkResourceAvailability = async () => {
    setResourceStatus("checking")
    // Simulate checking the official resource
    setTimeout(() => {
      setResourceStatus("unavailable") // Based on the 400 error shown
    }, 1000)
  }

  const ohioVRResources = [
    {
      title: "2024 VR Fee Schedule (Updated)",
      description: "Current fee schedule for vocational rehabilitation services - September 2024",
      status: "available",
      directUrl:
        "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fdam.assets.ohio.gov%2Fraw%2Fupload%2Food.ohio.gov%2FProvider%2520Training%2FOOD_VR_Fee_Schedule_2024_-_Final_9.9.2024.docx&wdOrigin=BROWSELINK",
      alternativeUrl: "https://ood.ohio.gov/individuals-with-disabilities/vocational-rehabilitation",
      category: "fees",
      isNew: true,
    },
    {
      title: "Deaf, Deafblind & Hard of Hearing Services",
      description: "Comprehensive services specifically for deaf and hard of hearing individuals",
      status: "available",
      directUrl: "https://ood.ohio.gov/information-for-individuals/services/deaf-deafblind-hard-of-hearing",
      alternativeUrl: "https://ood.ohio.gov/individuals-with-disabilities/vocational-rehabilitation/services",
      category: "deaf-services",
      isNew: true,
    },
    {
      title: "VR Services Guide",
      description: "Comprehensive guide to available VR services in Ohio",
      status: "available",
      alternativeUrl: "https://ood.ohio.gov/individuals-with-disabilities/vocational-rehabilitation/services",
      category: "services",
    },
    {
      title: "Application Process",
      description: "Step-by-step guide for applying to Ohio VR services",
      status: "available",
      alternativeUrl: "https://ood.ohio.gov/individuals-with-disabilities/vocational-rehabilitation/apply",
      category: "application",
    },
  ]

  const contactInfo = {
    phone: "1-800-282-4536",
    email: "BVR@ood.ohio.gov",
    address: "30 E. Broad St., Columbus, OH 43215",
    website: "https://ood.ohio.gov",
  }

  const deafSpecificServices = [
    {
      service: "ASL Interpreter Services",
      description: "Professional interpreters for VR appointments, job interviews, and workplace training",
      cost: "Covered by VR (see 2024 fee schedule)",
      eligibility: "VR clients with hearing loss",
      details: "Includes certified ASL interpreters, CART services, and Communication Access Realtime Translation",
    },
    {
      service: "Assistive Technology Assessment",
      description:
        "Comprehensive evaluation for hearing aids, cochlear implants, FM systems, and workplace accommodations",
      cost: "Assessment covered - devices vary (see fee schedule)",
      eligibility: "Based on VR assessment and employment goals",
      details: "Includes hearing aid evaluations, assistive listening devices, and workplace technology",
    },
    {
      service: "Deaf-Blind Services",
      description: "Specialized support for individuals with combined vision and hearing loss",
      cost: "Covered by VR specialized programs",
      eligibility: "Individuals with dual sensory impairments",
      details: "Includes tactile interpreting, support service providers, and specialized training",
    },
    {
      service: "Job Coaching & Placement",
      description: "Specialized employment support with deaf-aware job coaches and employers",
      cost: "Covered by VR",
      eligibility: "VR clients in employment phase",
      details: "Deaf-culturally competent job coaches, employer education, and workplace advocacy",
    },
    {
      service: "Communication Training",
      description: "Workplace communication skills, self-advocacy, and ADA accommodation training",
      cost: "Covered by VR",
      eligibility: "All VR clients",
      details: "Includes workplace communication strategies, ADA rights education, and self-advocacy skills",
    },
    {
      service: "Post-Secondary Education Support",
      description: "College and university accommodations, interpreter services, and academic support",
      cost: "Varies - see 2024 fee schedule",
      eligibility: "VR clients pursuing higher education",
      details: "Tuition assistance, interpreter services, note-taking, and assistive technology for students",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Ohio VR Resources for Deaf Community</h1>
        <p className="text-muted-foreground">
          Comprehensive vocational rehabilitation resources and support for deaf individuals in Ohio
        </p>
        <Badge variant="outline" className="bg-blue-50">
          vr4Deaf Ohio Extension
        </Badge>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800">Mixed Resource Status</AlertTitle>
        <AlertDescription className="text-orange-700">
          ✅ 2024 Fee Schedule is available | ❌ Deaf Services page shows 404 error. Complete deaf services information
          provided below as backup.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="services">Deaf Services</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Info</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <FileText className="w-5 h-5" />
                Featured: 2024 Fee Schedule Now Available
              </CardTitle>
              <CardDescription className="text-green-700">
                The updated Ohio VR Fee Schedule for 2024 is now accessible. Click below for detailed fee information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  window.open(
                    "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fdam.assets.ohio.gov%2Fraw%2Fupload%2Food.ohio.gov%2FProvider%2520Training%2FOOD_VR_Fee_Schedule_2024_-_Final_9.9.2024.docx&wdOrigin=BROWSELINK",
                    "_blank",
                  )
                }
                className="bg-green-600 hover:bg-green-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open 2024 Fee Schedule
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ohioVRResources.map((resource, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge variant={resource.status === "available" ? "default" : "destructive"} className="ml-2">
                      {resource.status}
                    </Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant={resource.status === "available" ? "default" : "outline"}
                      size="sm"
                      onClick={() => window.open(resource.directUrl || resource.alternativeUrl, "_blank")}
                      disabled={resource.status === "unavailable"}
                      className={resource.isNew ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {resource.isNew ? "New Resource" : resource.status === "available" ? "Access" : "Alternative"}
                    </Button>
                    {resource.category === "fees" && (
                      <Button variant="outline" size="sm" onClick={checkResourceAvailability}>
                        <Download className="w-4 h-4 mr-2" />
                        Check Status
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Specialized Services for Deaf Clients
              </CardTitle>
              <CardDescription>
                Ohio VR provides specialized services tailored to the deaf and hard of hearing community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {deafSpecificServices.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{service.service}</h3>
                      <Badge variant="secondary">{service.cost}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <p className="text-xs text-blue-600">Eligibility: {service.eligibility}</p>
                    <p className="text-xs text-gray-600 italic">{service.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{contactInfo.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Alternative Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open("https://ood.ohio.gov", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ohio Department of Development
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open("https://www.rsa.ed.gov", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Federal RSA Resources
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open("https://www.nad.org", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  National Association of the Deaf
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                Emergency VR Support
              </CardTitle>
              <CardDescription className="text-red-700">
                When official resources are unavailable, use these emergency contacts and procedures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="p-3 bg-white rounded border">
                  <h4 className="font-semibold text-red-800">VR Counselor Emergency Line</h4>
                  <p className="text-sm">1-800-282-4536 (Press 0 for immediate assistance)</p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h4 className="font-semibold text-red-800">ASL Interpreter Emergency</h4>
                  <p className="text-sm">Contact your assigned VR counselor or call main line</p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h4 className="font-semibold text-red-800">Document Access Issues</h4>
                  <p className="text-sm">Request documents via email: BVR@ood.ohio.gov</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-blue-800">vr4Deaf Integration</h3>
            <p className="text-sm text-blue-700">
              This Ohio extension integrates with the vr4Deaf platform to provide seamless access to state-specific VR
              resources, alternative document access, and emergency support for deaf clients.
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit vr4deaf.org
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
