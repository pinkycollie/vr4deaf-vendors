"use client"

import type React from "react"

import { useState } from "react"
import { Briefcase, Building, Check, Download, Search, Star, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface SpecialistDirectoryProps {
  onClose: () => void
}

interface Specialist {
  id: number
  name: string
  title: string
  company?: string
  location: string
  rating: number
  specialties: string[]
  certifications: string[]
  image: string
  type: "job" | "business"
}

// Sample specialist data
const sampleSpecialists: Specialist[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Job Placement Specialist",
    company: "Career Connect",
    location: "Fort Worth, TX",
    rating: 4.9,
    specialties: ["Deaf Employment", "Resume Building", "Interview Coaching"],
    certifications: ["Certified Career Counselor", "ASL Proficient"],
    image: "/placeholder.svg?height=100&width=100",
    type: "job",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Vocational Rehabilitation Counselor",
    company: "Workforce Solutions",
    location: "Dallas, TX",
    rating: 4.7,
    specialties: ["Disability Employment", "Job Accommodation", "Skills Assessment"],
    certifications: ["Certified Rehabilitation Counselor", "ASL Level 3"],
    image: "/placeholder.svg?height=100&width=100",
    type: "job",
  },
  {
    id: 3,
    name: "Jamal Williams",
    title: "Employment Specialist",
    company: "Inclusive Careers",
    location: "Arlington, TX",
    rating: 4.8,
    specialties: ["Deaf Job Placement", "Workplace Accessibility", "Employer Training"],
    certifications: ["Certified Employment Specialist", "ASL Fluent"],
    image: "/placeholder.svg?height=100&width=100",
    type: "job",
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    title: "Business Development Consultant",
    company: "Entrepreneur Success",
    location: "Fort Worth, TX",
    rating: 4.9,
    specialties: ["Small Business Formation", "Business Planning", "Funding Acquisition"],
    certifications: ["Certified Business Advisor", "ASL Proficient"],
    image: "/placeholder.svg?height=100&width=100",
    type: "business",
  },
  {
    id: 5,
    name: "David Thompson",
    title: "Small Business Specialist",
    company: "SCORE Fort Worth",
    location: "Fort Worth, TX",
    rating: 4.6,
    specialties: ["Business Strategy", "Financial Planning", "Marketing"],
    certifications: ["Certified SCORE Mentor", "ASL Basics"],
    image: "/placeholder.svg?height=100&width=100",
    type: "business",
  },
  {
    id: 6,
    name: "Maria Sanchez",
    title: "Entrepreneurship Coach",
    company: "Launch Pad Consulting",
    location: "Dallas, TX",
    rating: 4.8,
    specialties: ["Deaf Entrepreneurship", "Business Automation", "Growth Strategy"],
    certifications: ["Certified Business Coach", "ASL Fluent"],
    image: "/placeholder.svg?height=100&width=100",
    type: "business",
  },
]

export default function SpecialistDirectory({ onClose }: SpecialistDirectoryProps) {
  const [location, setLocation] = useState("")
  const [activeTab, setActiveTab] = useState<"job" | "business">("job")
  const [searchResults, setSearchResults] = useState<Specialist[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null)
  const [referralGenerated, setReferralGenerated] = useState(false)

  const handleSearch = () => {
    if (location.trim() === "") return

    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Filter specialists by type and location (case insensitive partial match)
      const results = sampleSpecialists.filter(
        (specialist) =>
          specialist.type === activeTab && specialist.location.toLowerCase().includes(location.toLowerCase()),
      )

      setSearchResults(results)
      setHasSearched(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist)
  }

  const handleGenerateReferral = () => {
    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setReferralGenerated(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleBackToResults = () => {
    setSelectedSpecialist(null)
    setReferralGenerated(false)
  }

  return (
    <div className="flex flex-col h-[500px] max-h-[80vh]">
      <div className="flex items-center justify-between p-4 bg-orange-600 text-white">
        <div className="flex items-center gap-2">
          {activeTab === "job" ? <Briefcase className="h-5 w-5" /> : <Building className="h-5 w-5" />}
          <h3 className="font-semibold">Specialist Directory</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-orange-700">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      {!selectedSpecialist ? (
        <>
          <div className="p-4">
            <Tabs defaultValue="job" onValueChange={(value) => setActiveTab(value as "job" | "business")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="job" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Job Specialists</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>Business Specialists</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="job" className="mt-4">
                <p className="text-sm mb-4">
                  Find certified job placement specialists in your area who are experienced in working with deaf
                  individuals.
                </p>
              </TabsContent>

              <TabsContent value="business" className="mt-4">
                <p className="text-sm mb-4">
                  Connect with business consultants and coaches who can help you start or grow your business.
                </p>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter city or state"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={location.trim() === "" || isLoading}>
                {isLoading ? (
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex-1 overflow-y-auto p-4">
            {hasSearched && searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p>No specialists found in this location.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try a different location or contact support for assistance.
                </p>
              </div>
            ) : hasSearched ? (
              <div className="space-y-4">
                <h4 className="font-medium">
                  {activeTab === "job" ? "Job Specialists" : "Business Specialists"} in {location}
                </h4>
                {searchResults.map((specialist) => (
                  <div
                    key={specialist.id}
                    className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                    onClick={() => handleSpecialistSelect(specialist)}
                  >
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={specialist.image || "/placeholder.svg"}
                          alt={specialist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold">{specialist.name}</h5>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm ml-1">{specialist.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{specialist.title}</p>
                        {specialist.company && <p className="text-sm">{specialist.company}</p>}
                        <p className="text-sm">{specialist.location}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {specialist.certifications.slice(0, 2).map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {activeTab === "job" ? (
                  <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-20" />
                ) : (
                  <Building className="h-12 w-12 mx-auto mb-2 opacity-20" />
                )}
                <p>Enter your location to find specialists in your area</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {!referralGenerated ? (
            <>
              <Button variant="ghost" size="sm" className="mb-4" onClick={handleBackToResults}>
                ← Back to results
              </Button>

              <div className="flex gap-4 items-start mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={selectedSpecialist.image || "/placeholder.svg"}
                    alt={selectedSpecialist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{selectedSpecialist.name}</h4>
                  <p className="text-muted-foreground">{selectedSpecialist.title}</p>
                  {selectedSpecialist.company && <p>{selectedSpecialist.company}</p>}
                  <p>{selectedSpecialist.location}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1">{selectedSpecialist.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Specialties</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecialist.specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Certifications</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecialist.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        <Check className="h-3 w-3 mr-1" /> {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Request a Referral</h5>
                  <p className="text-sm mb-4">
                    Generate a referral contract to connect with this specialist. 360 Business Magician will track your
                    referral and earn a commission when services are provided.
                  </p>
                  <Button onClick={handleGenerateReferral} className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Generating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">Generate Referral Contract</span>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <Check className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <h4 className="text-xl font-medium text-green-800 mb-2">Referral Generated!</h4>
                <p className="text-green-700 mb-4">
                  Your referral to {selectedSpecialist.name} has been successfully generated. You'll receive a
                  confirmation email with the contract details.
                </p>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" /> Download Contract
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">Next Steps</h5>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>The specialist will contact you within 1-2 business days</li>
                  <li>Review and sign the contract when you receive it</li>
                  <li>Schedule your initial consultation</li>
                  <li>360 Business Magician will track your referral automatically</li>
                </ol>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={handleBackToResults}>
                  Back to Directory
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
