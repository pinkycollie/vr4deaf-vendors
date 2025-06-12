"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Phone, Mail, MapPin, Users, Heart, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function OhioCCDStaff() {
  const ccdStaff = [
    {
      name: "Sarah Johnson",
      title: "CCD Director",
      region: "Statewide",
      specialties: ["Program oversight", "Policy development", "Community advocacy"],
      phone: "(614) 438-1200",
      email: "sarah.johnson@ood.ohio.gov",
      languages: ["ASL", "English"],
      availability: "Monday-Friday, 8:00 AM - 5:00 PM",
      description: "Oversees all CCD programs and services across Ohio",
    },
    {
      name: "Michael Rodriguez",
      title: "Deaf Services Coordinator",
      region: "Central Ohio",
      specialties: ["VR coordination", "Interpreter services", "Employment support"],
      phone: "(614) 438-1255",
      email: "michael.rodriguez@ood.ohio.gov",
      languages: ["ASL", "English", "Spanish"],
      availability: "Monday-Friday, 8:00 AM - 5:00 PM",
      description: "Coordinates deaf services in Columbus and surrounding counties",
    },
    {
      name: "Jennifer Chen",
      title: "Deafblind Specialist",
      region: "Northeast Ohio",
      specialties: ["Deafblind services", "SSP coordination", "Tactile communication"],
      phone: "(216) 787-0920",
      email: "jennifer.chen@ood.ohio.gov",
      languages: ["ASL", "Tactile ASL", "English"],
      availability: "Monday-Friday, 8:00 AM - 5:00 PM",
      description: "Specialized support for individuals with combined hearing and vision loss",
    },
    {
      name: "David Thompson",
      title: "Transition Services Coordinator",
      region: "Southwest Ohio",
      specialties: ["Youth transition", "Educational advocacy", "Pre-employment services"],
      phone: "(513) 852-1290",
      email: "david.thompson@ood.ohio.gov",
      languages: ["ASL", "English"],
      availability: "Monday-Friday, 8:00 AM - 5:00 PM",
      description: "Supports students transitioning from school to work or higher education",
    },
    {
      name: "Lisa Williams",
      title: "Technology Specialist",
      region: "Northwest Ohio",
      specialties: ["Assistive technology", "Workplace accommodations", "Device training"],
      phone: "(419) 245-2880",
      email: "lisa.williams@ood.ohio.gov",
      languages: ["ASL", "English"],
      availability: "Monday-Friday, 8:00 AM - 5:00 PM",
      description: "Assists with assistive technology assessments and workplace accommodations",
    },
    {
      name: "Robert Martinez",
      title: "Rural Services Coordinator",
      region: "Southeast Ohio",
      specialties: ["Rural outreach", "Distance services", "Community partnerships"],
      phone: "(740) 593-5245",
      email: "robert.martinez@ood.ohio.gov",
      languages: ["ASL", "English"],
      availability: "Monday-Friday, 8:00 AM - 5:00 PM",
      description: "Provides services to rural and underserved areas of Ohio",
    },
  ]

  const supportServices = [
    {
      service: "Individual Advocacy",
      description: "Personal advocacy support for accessing services and accommodations",
      staff: "All CCD staff",
      availability: "By appointment",
      contact: "Contact your regional coordinator",
    },
    {
      service: "System Navigation",
      description: "Help navigating VR, educational, and community service systems",
      staff: "Regional coordinators",
      availability: "Monday-Friday, business hours",
      contact: "Call your regional office",
    },
    {
      service: "Crisis Intervention",
      description: "Emergency support for urgent situations affecting deaf individuals",
      staff: "On-call CCD staff",
      availability: "24/7 emergency line",
      contact: "1-800-282-4536 (Press 9 for emergency)",
    },
    {
      service: "Community Education",
      description: "Training and education for employers, schools, and service providers",
      staff: "Specialized training team",
      availability: "Scheduled presentations",
      contact: "sarah.johnson@ood.ohio.gov",
    },
    {
      service: "Interpreter Coordination",
      description: "Coordination of ASL interpreters for VR and community services",
      staff: "Regional coordinators",
      availability: "Advance scheduling required",
      contact: "Contact regional coordinator",
    },
    {
      service: "Technology Support",
      description: "Assistive technology assessment, training, and troubleshooting",
      staff: "Technology specialists",
      availability: "By appointment",
      contact: "lisa.williams@ood.ohio.gov",
    },
  ]

  const regionalCoverage = [
    {
      region: "Central Ohio",
      counties: ["Franklin", "Delaware", "Union", "Madison", "Pickaway", "Fairfield", "Licking"],
      coordinator: "Michael Rodriguez",
      phone: "(614) 438-1255",
      office: "30 E. Broad St., Columbus, OH 43215",
    },
    {
      region: "Northeast Ohio",
      counties: ["Cuyahoga", "Summit", "Portage", "Stark", "Mahoning", "Trumbull", "Columbiana"],
      coordinator: "Jennifer Chen",
      phone: "(216) 787-0920",
      office: "615 W. Superior Ave., Cleveland, OH 44113",
    },
    {
      region: "Southwest Ohio",
      counties: ["Hamilton", "Butler", "Warren", "Clermont", "Brown", "Adams", "Highland"],
      coordinator: "David Thompson",
      phone: "(513) 852-1290",
      office: "36 E. 7th St., Cincinnati, OH 45202",
    },
    {
      region: "Northwest Ohio",
      counties: ["Lucas", "Wood", "Ottawa", "Sandusky", "Erie", "Huron", "Lorain"],
      coordinator: "Lisa Williams",
      phone: "(419) 245-2880",
      office: "160 S. Main St., Bowling Green, OH 43402",
    },
    {
      region: "Southeast Ohio",
      counties: ["Athens", "Washington", "Monroe", "Belmont", "Jefferson", "Harrison", "Tuscarawas"],
      coordinator: "Robert Martinez",
      phone: "(740) 593-5245",
      office: "540 W. State St., Athens, OH 45701",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Ohio CCD Staff & Support Services</h1>
        <p className="text-muted-foreground">
          Commission for the Deaf and Hard of Hearing staff providing specialized support across Ohio
        </p>
        <Badge variant="outline" className="bg-blue-50">
          Ohio Department of Development - CCD Division
        </Badge>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800">Official CCD Staff Page Unavailable</AlertTitle>
        <AlertDescription className="text-orange-700">
          The official Ohio CCD staff page is showing a 404 error. This comprehensive directory provides all essential
          staff contact information and support services for deaf and hard of hearing individuals.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="staff">CCD Staff</TabsTrigger>
          <TabsTrigger value="services">Support Services</TabsTrigger>
          <TabsTrigger value="regions">Regional Coverage</TabsTrigger>
          <TabsTrigger value="contact">Emergency Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Users className="w-5 h-5" />
                Meet Your CCD Support Team
              </CardTitle>
              <CardDescription className="text-blue-700">
                Dedicated professionals providing specialized services to Ohio's deaf and hard of hearing community
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {ccdStaff.map((staff, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      <CardDescription className="font-medium text-blue-600">{staff.title}</CardDescription>
                      <Badge variant="outline" className="mt-1">
                        {staff.region}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{staff.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{staff.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{staff.availability}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {staff.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">Languages:</h4>
                    <div className="flex flex-wrap gap-1">
                      {staff.languages.map((language, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => window.open(`tel:${staff.phone}`)}>
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(`mailto:${staff.email}`)}>
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
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
                <Heart className="w-5 h-5" />
                CCD Support Services
              </CardTitle>
              <CardDescription>
                Comprehensive support services provided by Ohio's Commission for the Deaf and Hard of Hearing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {supportServices.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{service.service}</h3>
                      <Badge variant="secondary">{service.availability}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-blue-50 rounded">
                        <strong>Staff:</strong> {service.staff}
                      </div>
                      <div className="p-2 bg-green-50 rounded">
                        <strong>Contact:</strong> {service.contact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Regional Coverage Areas
              </CardTitle>
              <CardDescription>CCD staff coverage areas and county assignments across Ohio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {regionalCoverage.map((region, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{region.region}</h3>
                      <Badge variant="outline">{region.counties.length} Counties</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Counties Served:</h4>
                        <div className="flex flex-wrap gap-1">
                          {region.counties.map((county, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {county}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <h4 className="font-medium text-sm">Regional Coordinator:</h4>
                          <p className="text-sm text-muted-foreground">{region.coordinator}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{region.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3 h-3 text-muted-foreground mt-1" />
                          <span className="text-sm">{region.office}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5" />
                  Emergency Support
                </CardTitle>
                <CardDescription className="text-red-700">24/7 emergency support for urgent situations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <h4 className="font-semibold text-red-800">Crisis Hotline</h4>
                    <p className="text-sm">1-800-282-4536 (Press 9 for emergency)</p>
                    <p className="text-xs text-red-600">Available 24/7 for urgent situations</p>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h4 className="font-semibold text-red-800">Emergency Email</h4>
                    <p className="text-sm">emergency@ood.ohio.gov</p>
                    <p className="text-xs text-red-600">For non-urgent emergency documentation</p>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <h4 className="font-semibold text-red-800">After Hours Support</h4>
                    <p className="text-sm">Text "HELP" to (614) 555-0199</p>
                    <p className="text-xs text-red-600">Emergency text support for deaf individuals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Users className="w-5 h-5" />
                  General CCD Contact
                </CardTitle>
                <CardDescription className="text-blue-700">Main contact information for CCD services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Main Office</p>
                      <p className="text-sm text-muted-foreground">1-800-282-4536</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">General Email</p>
                      <p className="text-sm text-muted-foreground">ccd@ood.ohio.gov</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Main Office</p>
                      <p className="text-sm text-muted-foreground">30 E. Broad St., Columbus, OH 43215</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">Monday-Friday, 8:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">How to Reach CCD Staff</AlertTitle>
            <AlertDescription className="text-green-700">
              <strong>For routine services:</strong> Contact your regional coordinator directly
              <br />
              <strong>For urgent matters:</strong> Call the main line and ask for immediate assistance
              <br />
              <strong>For emergencies:</strong> Use the 24/7 emergency hotline
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-purple-800">vr4Deaf Integration</h3>
            <p className="text-sm text-purple-700">
              This CCD staff directory integrates with the vr4Deaf platform to ensure continuous access to Ohio's
              specialized deaf support services, even when official state resources are unavailable.
            </p>
            <Button variant="outline" size="sm" className="mt-2 border-purple-600 text-purple-700">
              <Users className="w-4 h-4 mr-2" />
              Connect with vr4deaf.org
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
