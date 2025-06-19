"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, Filter, Info, MapPin, MessageSquare, Search, User, Users } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ProfileHeader } from "@/components/profile-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Mock data for VR counselors
const counselors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior VR Counselor",
    agency: "Texas Workforce Commission",
    location: "Austin, TX",
    specialties: ["Deaf/HoH", "Career Assessment", "Job Placement"],
    languages: ["ASL", "English"],
    availability: "Available for new clients",
    image: "/counselor-sarah.png",
    bio: "Sarah has been working with Deaf job seekers for over 10 years. She specializes in career assessment, job placement, and workplace accommodations. Sarah is fluent in ASL and has a deep understanding of Deaf culture.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "VR Counselor",
    agency: "Workforce Solutions for Tarrant County",
    location: "Fort Worth, TX",
    specialties: ["Deaf/HoH", "Technology", "Education"],
    languages: ["ASL", "English", "Spanish"],
    availability: "Limited availability",
    image: "/counselor-michael.png",
    bio: "Michael specializes in helping Deaf individuals in the technology and education sectors. With a background in IT and education, he provides valuable insights for job seekers in these fields. Michael is trilingual in ASL, English, and Spanish.",
  },
  {
    id: 3,
    name: "Jennifer Lee",
    title: "VR Counselor",
    agency: "Texas Workforce Commission",
    location: "Houston, TX",
    specialties: ["Deaf/HoH", "Healthcare", "Resume Building"],
    languages: ["ASL", "English"],
    availability: "Available for new clients",
    image: "/counselor-jennifer.png",
    bio: "Jennifer focuses on helping Deaf job seekers in the healthcare industry. She has extensive experience with resume building, interview preparation, and workplace accommodations specific to healthcare settings.",
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Senior VR Counselor",
    agency: "Workforce Solutions Capital Area",
    location: "Austin, TX",
    specialties: ["Deaf/HoH", "Business", "Entrepreneurship"],
    languages: ["ASL", "English"],
    availability: "Limited availability",
    image: "/counselor-david.png",
    bio: "David specializes in supporting Deaf entrepreneurs and business professionals. He has helped many Deaf individuals start their own businesses or advance in corporate careers. David is passionate about creating more opportunities for Deaf professionals in leadership roles.",
  },
  {
    id: 5,
    name: "Maria Garcia",
    title: "VR Counselor",
    agency: "Texas Workforce Commission",
    location: "San Antonio, TX",
    specialties: ["Deaf/HoH", "Youth Transition", "Education"],
    languages: ["ASL", "English", "Spanish"],
    availability: "Available for new clients",
    image: "/counselor-maria.png",
    bio: "Maria specializes in youth transition services, helping young Deaf adults move from education to employment. She works closely with schools and colleges to ensure smooth transitions. Maria is trilingual in ASL, English, and Spanish.",
  },
]

export default function CounselorConnectClient() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState("")
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestFormData, setRequestFormData] = useState({
    preferredContact: "video",
    preferredTime: "morning",
    message: "",
    agreeToTerms: false,
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Filter counselors based on search and filters
  const filteredCounselors = counselors.filter((counselor) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase()))

    // Location filter
    const matchesLocation = selectedLocation === "" || counselor.location.includes(selectedLocation)

    // Specialties filter
    const matchesSpecialties =
      selectedSpecialties.length === 0 ||
      selectedSpecialties.every((specialty) => counselor.specialties.includes(specialty))

    // Languages filter
    const matchesLanguages =
      selectedLanguages.length === 0 || selectedLanguages.every((language) => counselor.languages.includes(language))

    // Availability filter
    const matchesAvailability = selectedAvailability === "" || counselor.availability.includes(selectedAvailability)

    return matchesSearch && matchesLocation && matchesSpecialties && matchesLanguages && matchesAvailability
  })

  const handleSpecialtyToggle = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    } else {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
    }
  }

  const handleLanguageToggle = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language])
    } else {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language))
    }
  }

  const handleCounselorSelect = (counselor: any) => {
    setSelectedCounselor(counselor)
    setShowRequestForm(true)
  }

  const handleRequestFormChange = (field: string, value: any) => {
    setRequestFormData({
      ...requestFormData,
      [field]: value,
    })
  }

  const handleSubmitRequest = () => {
    // In a real application, this would send the request to the server
    // For now, we'll just show a success dialog
    setShowRequestForm(false)
    setShowSuccessDialog(true)
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    setSelectedCounselor(null)
    setRequestFormData({
      preferredContact: "video",
      preferredTime: "morning",
      message: "",
      agreeToTerms: false,
    })
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedLocation("")
    setSelectedSpecialties([])
    setSelectedLanguages([])
    setSelectedAvailability("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Connect with VR Counselors</h1>
                <p className="text-gray-500">
                  Find and connect with Vocational Rehabilitation counselors who specialize in working with Deaf job
                  seekers
                </p>
              </div>
            </div>
          </div>

          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <AlertTitle className="text-blue-800 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Why Connect with a VR Counselor?
            </AlertTitle>
            <AlertDescription className="text-blue-700">
              <p className="mb-2">
                Vocational Rehabilitation (VR) counselors can provide free services to help you prepare for, find, and
                keep a job. By connecting with a VR counselor, you may be eligible for:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Career counseling and guidance</li>
                <li>Job training and education</li>
                <li>Job placement assistance</li>
                <li>Assistive technology and accommodations</li>
                <li>Full access to all VR4DEAF: JOB features at no cost</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters - Desktop */}
            <div className="hidden lg:block space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <CardDescription>Refine your counselor search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="Austin">Austin, TX</SelectItem>
                        <SelectItem value="Houston">Houston, TX</SelectItem>
                        <SelectItem value="San Antonio">San Antonio, TX</SelectItem>
                        <SelectItem value="Fort Worth">Fort Worth, TX</SelectItem>
                        <SelectItem value="Dallas">Dallas, TX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Specialties</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specialty-career"
                          checked={selectedSpecialties.includes("Career Assessment")}
                          onCheckedChange={(checked) => handleSpecialtyToggle("Career Assessment", checked as boolean)}
                        />
                        <Label htmlFor="specialty-career">Career Assessment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specialty-job"
                          checked={selectedSpecialties.includes("Job Placement")}
                          onCheckedChange={(checked) => handleSpecialtyToggle("Job Placement", checked as boolean)}
                        />
                        <Label htmlFor="specialty-job">Job Placement</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specialty-tech"
                          checked={selectedSpecialties.includes("Technology")}
                          onCheckedChange={(checked) => handleSpecialtyToggle("Technology", checked as boolean)}
                        />
                        <Label htmlFor="specialty-tech">Technology</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specialty-education"
                          checked={selectedSpecialties.includes("Education")}
                          onCheckedChange={(checked) => handleSpecialtyToggle("Education", checked as boolean)}
                        />
                        <Label htmlFor="specialty-education">Education</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specialty-healthcare"
                          checked={selectedSpecialties.includes("Healthcare")}
                          onCheckedChange={(checked) => handleSpecialtyToggle("Healthcare", checked as boolean)}
                        />
                        <Label htmlFor="specialty-healthcare">Healthcare</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specialty-business"
                          checked={selectedSpecialties.includes("Business")}
                          onCheckedChange={(checked) => handleSpecialtyToggle("Business", checked as boolean)}
                        />
                        <Label htmlFor="specialty-business">Business</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="specialty-youth"
                          checked={selectedSpecialties.includes("Youth Transition")}
                          onCheckedChange={(checked) => handleSpecialtyToggle("Youth Transition", checked as boolean)}
                        />
                        <Label htmlFor="specialty-youth">Youth Transition</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Languages</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="language-asl"
                          checked={selectedLanguages.includes("ASL")}
                          onCheckedChange={(checked) => handleLanguageToggle("ASL", checked as boolean)}
                        />
                        <Label htmlFor="language-asl">ASL</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="language-english"
                          checked={selectedLanguages.includes("English")}
                          onCheckedChange={(checked) => handleLanguageToggle("English", checked as boolean)}
                        />
                        <Label htmlFor="language-english">English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="language-spanish"
                          checked={selectedLanguages.includes("Spanish")}
                          onCheckedChange={(checked) => handleLanguageToggle("Spanish", checked as boolean)}
                        />
                        <Label htmlFor="language-spanish">Spanish</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Availability</SelectItem>
                        <SelectItem value="Available">Available for new clients</SelectItem>
                        <SelectItem value="Limited">Limited availability</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" onClick={clearAllFilters} className="w-full">
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Not sure which counselor is right for you? Our VURI AI Assistant can help match you with the best
                    counselor for your needs.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/vuri" className="flex items-center justify-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Chat with VURI
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Mobile Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search by name, location, or specialty"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Refine your counselor search</SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="location-mobile">Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger id="location-mobile">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Locations</SelectItem>
                            <SelectItem value="Austin">Austin, TX</SelectItem>
                            <SelectItem value="Houston">Houston, TX</SelectItem>
                            <SelectItem value="San Antonio">San Antonio, TX</SelectItem>
                            <SelectItem value="Fort Worth">Fort Worth, TX</SelectItem>
                            <SelectItem value="Dallas">Dallas, TX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Specialties</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="specialty-career-mobile"
                              checked={selectedSpecialties.includes("Career Assessment")}
                              onCheckedChange={(checked) =>
                                handleSpecialtyToggle("Career Assessment", checked as boolean)
                              }
                            />
                            <Label htmlFor="specialty-career-mobile">Career Assessment</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="specialty-job-mobile"
                              checked={selectedSpecialties.includes("Job Placement")}
                              onCheckedChange={(checked) => handleSpecialtyToggle("Job Placement", checked as boolean)}
                            />
                            <Label htmlFor="specialty-job-mobile">Job Placement</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="specialty-tech-mobile"
                              checked={selectedSpecialties.includes("Technology")}
                              onCheckedChange={(checked) => handleSpecialtyToggle("Technology", checked as boolean)}
                            />
                            <Label htmlFor="specialty-tech-mobile">Technology</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="specialty-education-mobile"
                              checked={selectedSpecialties.includes("Education")}
                              onCheckedChange={(checked) => handleSpecialtyToggle("Education", checked as boolean)}
                            />
                            <Label htmlFor="specialty-education-mobile">Education</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="specialty-healthcare-mobile"
                              checked={selectedSpecialties.includes("Healthcare")}
                              onCheckedChange={(checked) => handleSpecialtyToggle("Healthcare", checked as boolean)}
                            />
                            <Label htmlFor="specialty-healthcare-mobile">Healthcare</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="specialty-business-mobile"
                              checked={selectedSpecialties.includes("Business")}
                              onCheckedChange={(checked) => handleSpecialtyToggle("Business", checked as boolean)}
                            />
                            <Label htmlFor="specialty-business-mobile">Business</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="specialty-youth-mobile"
                              checked={selectedSpecialties.includes("Youth Transition")}
                              onCheckedChange={(checked) =>
                                handleSpecialtyToggle("Youth Transition", checked as boolean)
                              }
                            />
                            <Label htmlFor="specialty-youth-mobile">Youth Transition</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Languages</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="language-asl-mobile"
                              checked={selectedLanguages.includes("ASL")}
                              onCheckedChange={(checked) => handleLanguageToggle("ASL", checked as boolean)}
                            />
                            <Label htmlFor="language-asl-mobile">ASL</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="language-english-mobile"
                              checked={selectedLanguages.includes("English")}
                              onCheckedChange={(checked) => handleLanguageToggle("English", checked as boolean)}
                            />
                            <Label htmlFor="language-english-mobile">English</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="language-spanish-mobile"
                              checked={selectedLanguages.includes("Spanish")}
                              onCheckedChange={(checked) => handleLanguageToggle("Spanish", checked as boolean)}
                            />
                            <Label htmlFor="language-spanish-mobile">Spanish</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability-mobile">Availability</Label>
                        <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                          <SelectTrigger id="availability-mobile">
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any Availability</SelectItem>
                            <SelectItem value="Available">Available for new clients</SelectItem>
                            <SelectItem value="Limited">Limited availability</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline" onClick={clearAllFilters}>
                          Clear All Filters
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button>Apply Filters</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">
                    {filteredCounselors.length} {filteredCounselors.length === 1 ? "Counselor" : "Counselors"} Found
                  </h2>
                </div>

                {filteredCounselors.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No counselors found</h3>
                      <p className="text-gray-500 text-center mb-4">
                        Try adjusting your filters or search query to find more counselors.
                      </p>
                      <Button variant="outline" onClick={clearAllFilters}>
                        Clear All Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredCounselors.map((counselor) => (
                      <Card key={counselor.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <div className="flex-shrink-0">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={counselor.image || "/placeholder.svg"} alt={counselor.name} />
                                  <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 space-y-2">
                                <div>
                                  <h3 className="text-lg font-medium">{counselor.name}</h3>
                                  <p className="text-gray-500">{counselor.title}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {counselor.location}
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {counselor.agency}
                                  </Badge>
                                  <Badge
                                    variant={counselor.availability.includes("Available") ? "default" : "secondary"}
                                    className="flex items-center gap-1"
                                  >
                                    <Calendar className="h-3 w-3" />
                                    {counselor.availability}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 line-clamp-2">{counselor.bio}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="p-4 bg-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm font-medium">Specialties: </span>
                                  <span className="text-sm text-gray-500">{counselor.specialties.join(", ")}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Languages: </span>
                                  <span className="text-sm text-gray-500">{counselor.languages.join(", ")}</span>
                                </div>
                              </div>
                              <Button onClick={() => handleCounselorSelect(counselor)}>Request Connection</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Connection Request Form */}
      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Connection with {selectedCounselor?.name}</DialogTitle>
            <DialogDescription>
              Fill out this form to request a connection with this VR counselor. They will contact you within 2 business
              days.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <RadioGroup
                value={requestFormData.preferredContact}
                onValueChange={(value) => handleRequestFormChange("preferredContact", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="contact-video" />
                  <Label htmlFor="contact-video">Video Call (ASL)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vrs" id="contact-vrs" />
                  <Label htmlFor="contact-vrs">Video Relay Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="contact-text" />
                  <Label htmlFor="contact-text">Text Message</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Preferred Time for Contact</Label>
              <RadioGroup
                value={requestFormData.preferredTime}
                onValueChange={(value) => handleRequestFormChange("preferredTime", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="time-morning" />
                  <Label htmlFor="time-morning">Morning (9am - 12pm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="afternoon" id="time-afternoon" />
                  <Label htmlFor="time-afternoon">Afternoon (12pm - 5pm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evening" id="time-evening" />
                  <Label htmlFor="time-evening">Evening (5pm - 8pm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="time-any" />
                  <Label htmlFor="time-any">Any time</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Share any specific questions or information you'd like the counselor to know"
                value={requestFormData.message}
                onChange={(e) => handleRequestFormChange("message", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={requestFormData.agreeToTerms}
                onCheckedChange={(checked) => handleRequestFormChange("agreeToTerms", checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm text-gray-500 font-normal">
                  I agree to share my contact information and profile details with this VR counselor
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest} disabled={!requestFormData.agreeToTerms}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Connection Request Sent
            </DialogTitle>
            <DialogDescription>Your request has been sent successfully to {selectedCounselor?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-4 bg-green-50">
              <p className="text-sm text-green-800">
                The counselor will contact you within 2 business days using your preferred contact method. Please make
                sure your contact information is up to date in your profile.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">What happens next?</h4>
              <ol className="list-decimal pl-5 text-sm text-gray-500 space-y-1">
                <li>The counselor will review your profile and request</li>
                <li>They will contact you to schedule an initial meeting</li>
                <li>During the meeting, they will assess your needs and eligibility for VR services</li>
                <li>If eligible, they will work with you to develop an Individualized Plan for Employment (IPE)</li>
                <li>You'll gain access to all VR4DEAF: JOB features and services</li>
              </ol>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseSuccessDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="border-t bg-gray-100">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">VR4DEAF: JOB</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm font-medium hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <User className="h-5 w-5" />
            <span className="text-sm text-gray-500">© 2025 VR4DEAF: JOB. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
