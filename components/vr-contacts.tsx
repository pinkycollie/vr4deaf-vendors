"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Search, ExternalLink } from "lucide-react"

interface VROffice {
  state: string
  name: string
  address: string
  phone: string
  email: string
  website?: string
  programs: string[]
  specialServices: string[]
}

const vrOffices: VROffice[] = [
  {
    state: "TX",
    name: "Texas Workforce Commission - Vocational Rehabilitation Services",
    address: "4900 N. Lamar Blvd, Austin, TX 78751",
    phone: "(800) 628-5115",
    email: "vr.info@twc.texas.gov",
    website: "https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-services",
    programs: ["CBTAC", "Self-Employment", "Supported Employment"],
    specialServices: ["Deaf Services", "Blind Services", "Mental Health"],
  },
  {
    state: "FL",
    name: "Florida Division of Vocational Rehabilitation",
    address: "4070 Esplanade Way, Tallahassee, FL 32399",
    phone: "(850) 245-3399",
    email: "info@vr.fldoe.org",
    website: "https://www.rehabworks.org",
    programs: ["Business Enterprise Program", "Supported Employment", "Transition Services"],
    specialServices: ["Deaf/Hard of Hearing", "Blind/Visually Impaired", "Autism Services"],
  },
  {
    state: "CA",
    name: "California Department of Rehabilitation",
    address: "721 Capitol Mall, Sacramento, CA 95814",
    phone: "(916) 324-1313",
    email: "info@dor.ca.gov",
    website: "https://www.dor.ca.gov",
    programs: ["Independent Living", "Supported Employment", "Business Services"],
    specialServices: ["Deaf Services", "Assistive Technology", "Mental Health"],
  },
  {
    state: "NY",
    name: "New York State Office of Vocational and Educational Services for Individuals with Disabilities",
    address: "One Commerce Plaza, Albany, NY 12234",
    phone: "(518) 474-2714",
    email: "vesidinfo@nysed.gov",
    website: "https://www.acces.nysed.gov/vr",
    programs: ["Vocational Rehabilitation", "Supported Employment", "Business Enterprise"],
    specialServices: ["Deaf Services", "Blind Services", "Developmental Disabilities"],
  },
  {
    state: "IL",
    name: "Illinois Department of Human Services - Division of Rehabilitation Services",
    address: "100 S. Grand Ave. East, Springfield, IL 62762",
    phone: "(217) 782-2093",
    email: "dhs.drs@illinois.gov",
    website: "https://www.dhs.state.il.us/page.aspx?item=29737",
    programs: ["Vocational Rehabilitation", "Independent Living", "Supported Employment"],
    specialServices: ["Deaf/Hard of Hearing", "Blind/Visually Impaired", "Mental Health"],
  },
]

export default function VRContacts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const filteredOffices = vrOffices.filter(
    (office) =>
      office.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.programs.some((program) => program.toLowerCase().includes(searchTerm.toLowerCase())) ||
      office.specialServices.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            VR Office Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by state, program, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredOffices.map((office, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{office.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {office.state}
                      </Badge>
                    </div>
                    {office.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={office.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${office.phone}`} className="hover:underline">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${office.email}`} className="hover:underline">
                          {office.email}
                        </a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Programs</h4>
                        <div className="flex flex-wrap gap-1">
                          {office.programs.map((program, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Special Services</h4>
                        <div className="flex flex-wrap gap-1">
                          {office.specialServices.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
