"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Edit, Save, User, Info } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ProfileHeader } from "@/components/profile-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLink } from "lucide-react"

export default function UserProfileClient() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    birthDate: "1990-01-15",
  })

  // Communication Preferences State
  const [communicationPrefs, setCommunicationPrefs] = useState({
    preferredLanguage: "asl",
    needsInterpreter: true,
    communicationMethods: ["video", "text", "email"],
    captioningNeeded: true,
    preferredNotifications: "email",
    additionalAccommodations: "",
  })

  // Vocational Background State
  const [vocationalBackground, setVocationalBackground] = useState({
    currentEmploymentStatus: "unemployed",
    desiredJobTypes: ["full-time", "remote"],
    educationLevel: "bachelors",
    yearsOfExperience: "1-3",
    skills: ["customer-service", "computer", "communication"],
    industries: ["technology", "education"],
    workHistory: [
      {
        company: "Previous Employer",
        position: "Customer Service Representative",
        startDate: "2018-06",
        endDate: "2021-03",
        description: "Handled customer inquiries and resolved issues.",
      },
    ],
    certifications: ["Microsoft Office Specialist"],
    accommodationsNeeded: "Video relay service for phone calls, captioning for meetings",
  })

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    })
  }

  const handleCommunicationPrefsChange = (field: string, value: any) => {
    setCommunicationPrefs({
      ...communicationPrefs,
      [field]: value,
    })
  }

  const handleCommunicationMethodToggle = (method: string, checked: boolean) => {
    if (checked) {
      setCommunicationPrefs({
        ...communicationPrefs,
        communicationMethods: [...communicationPrefs.communicationMethods, method],
      })
    } else {
      setCommunicationPrefs({
        ...communicationPrefs,
        communicationMethods: communicationPrefs.communicationMethods.filter((m) => m !== method),
      })
    }
  }

  const handleVocationalChange = (field: string, value: any) => {
    setVocationalBackground({
      ...vocationalBackground,
      [field]: value,
    })
  }

  const handleJobTypeToggle = (type: string, checked: boolean) => {
    if (checked) {
      setVocationalBackground({
        ...vocationalBackground,
        desiredJobTypes: [...vocationalBackground.desiredJobTypes, type],
      })
    } else {
      setVocationalBackground({
        ...vocationalBackground,
        desiredJobTypes: vocationalBackground.desiredJobTypes.filter((t) => t !== type),
      })
    }
  }

  const handleSkillToggle = (skill: string, checked: boolean) => {
    if (checked) {
      setVocationalBackground({
        ...vocationalBackground,
        skills: [...vocationalBackground.skills, skill],
      })
    } else {
      setVocationalBackground({
        ...vocationalBackground,
        skills: vocationalBackground.skills.filter((s) => s !== skill),
      })
    }
  }

  const handleIndustryToggle = (industry: string, checked: boolean) => {
    if (checked) {
      setVocationalBackground({
        ...vocationalBackground,
        industries: [...vocationalBackground.industries, industry],
      })
    } else {
      setVocationalBackground({
        ...vocationalBackground,
        industries: vocationalBackground.industries.filter((i) => i !== industry),
      })
    }
  }

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call to save profile
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccessMessage(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }, 1500)
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
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/abstract-geometric-shapes.png" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">My Profile</h1>
                  <p className="text-gray-500">Manage your personal information and preferences</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {showSuccessMessage && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-md">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Profile saved successfully</span>
                  </div>
                )}
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Alert className="mb-8 border-amber-200 bg-amber-50">
            <AlertTitle className="text-amber-800 flex items-center gap-2">
              <Info className="h-4 w-4" />
              VR Client Disclosure
            </AlertTitle>
            <AlertDescription className="text-amber-700">
              <p className="mb-2">
                Some profile features are only available to active Vocational Rehabilitation clients. To unlock all
                features, you must either:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Be an active client with a state VR agency</li>
                <li>Have your VR counselor register you in our system</li>
                <li>Subscribe to Job Magician for full access without VR enrollment</li>
              </ul>
              <div className="flex justify-end">
                <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100" asChild>
                  <a
                    href="https://job-orb.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    View Job Magician Subscription
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="communication">Communication Preferences</TabsTrigger>
              <TabsTrigger value="vocational">Vocational Background</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Date of Birth</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={personalInfo.birthDate}
                        onChange={(e) => handlePersonalInfoChange("birthDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={personalInfo.address}
                      onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={personalInfo.city}
                        onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={personalInfo.state}
                        onValueChange={(value) => handlePersonalInfoChange("state", value)}
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={personalInfo.zipCode}
                        onChange={(e) => handlePersonalInfoChange("zipCode", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communication" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Preferences</CardTitle>
                  <CardDescription>Set your preferred communication methods and accessibility needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Preferred Language</Label>
                      <RadioGroup
                        value={communicationPrefs.preferredLanguage}
                        onValueChange={(value) => handleCommunicationPrefsChange("preferredLanguage", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="asl" id="language-asl" />
                          <Label htmlFor="language-asl">American Sign Language (ASL)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="english" id="language-english" />
                          <Label htmlFor="language-english">Written English</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="language-both" />
                          <Label htmlFor="language-both">Both ASL and English</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="needs-interpreter">Do you need an ASL interpreter for meetings?</Label>
                        <Switch
                          id="needs-interpreter"
                          checked={communicationPrefs.needsInterpreter}
                          onCheckedChange={(checked) => handleCommunicationPrefsChange("needsInterpreter", checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        If enabled, we'll arrange for an ASL interpreter during video meetings and appointments.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Communication Methods (Select all that apply)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="comm-video"
                            checked={communicationPrefs.communicationMethods.includes("video")}
                            onCheckedChange={(checked) => handleCommunicationMethodToggle("video", checked as boolean)}
                          />
                          <Label htmlFor="comm-video">Video Call (ASL)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="comm-text"
                            checked={communicationPrefs.communicationMethods.includes("text")}
                            onCheckedChange={(checked) => handleCommunicationMethodToggle("text", checked as boolean)}
                          />
                          <Label htmlFor="comm-text">Text/Chat</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="comm-email"
                            checked={communicationPrefs.communicationMethods.includes("email")}
                            onCheckedChange={(checked) => handleCommunicationMethodToggle("email", checked as boolean)}
                          />
                          <Label htmlFor="comm-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="comm-vrs"
                            checked={communicationPrefs.communicationMethods.includes("vrs")}
                            onCheckedChange={(checked) => handleCommunicationMethodToggle("vrs", checked as boolean)}
                          />
                          <Label htmlFor="comm-vrs">Video Relay Service</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="captioning-needed">Do you need captioning for video content?</Label>
                        <Switch
                          id="captioning-needed"
                          checked={communicationPrefs.captioningNeeded}
                          onCheckedChange={(checked) => handleCommunicationPrefsChange("captioningNeeded", checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        If enabled, we'll ensure all video content includes captions.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred-notifications">Preferred Notification Method</Label>
                      <Select
                        value={communicationPrefs.preferredNotifications}
                        onValueChange={(value) => handleCommunicationPrefsChange("preferredNotifications", value)}
                      >
                        <SelectTrigger id="preferred-notifications">
                          <SelectValue placeholder="Select notification method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="text">Text Message</SelectItem>
                          <SelectItem value="app">Mobile App Notification</SelectItem>
                          <SelectItem value="all">All Methods</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional-accommodations">Additional Accommodation Needs</Label>
                      <Textarea
                        id="additional-accommodations"
                        placeholder="Please describe any other communication accommodations you need"
                        value={communicationPrefs.additionalAccommodations}
                        onChange={(e) => handleCommunicationPrefsChange("additionalAccommodations", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vocational" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vocational Background</CardTitle>
                  <CardDescription>Share your work experience, skills, and employment goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="employment-status">Current Employment Status</Label>
                      <Select
                        value={vocationalBackground.currentEmploymentStatus}
                        onValueChange={(value) => handleVocationalChange("currentEmploymentStatus", value)}
                      >
                        <SelectTrigger id="employment-status">
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed-full">Employed (Full-time)</SelectItem>
                          <SelectItem value="employed-part">Employed (Part-time)</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Desired Job Types (Select all that apply)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="job-full-time"
                            checked={vocationalBackground.desiredJobTypes.includes("full-time")}
                            onCheckedChange={(checked) => handleJobTypeToggle("full-time", checked as boolean)}
                          />
                          <Label htmlFor="job-full-time">Full-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="job-part-time"
                            checked={vocationalBackground.desiredJobTypes.includes("part-time")}
                            onCheckedChange={(checked) => handleJobTypeToggle("part-time", checked as boolean)}
                          />
                          <Label htmlFor="job-part-time">Part-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="job-remote"
                            checked={vocationalBackground.desiredJobTypes.includes("remote")}
                            onCheckedChange={(checked) => handleJobTypeToggle("remote", checked as boolean)}
                          />
                          <Label htmlFor="job-remote">Remote</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="job-hybrid"
                            checked={vocationalBackground.desiredJobTypes.includes("hybrid")}
                            onCheckedChange={(checked) => handleJobTypeToggle("hybrid", checked as boolean)}
                          />
                          <Label htmlFor="job-hybrid">Hybrid</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="job-contract"
                            checked={vocationalBackground.desiredJobTypes.includes("contract")}
                            onCheckedChange={(checked) => handleJobTypeToggle("contract", checked as boolean)}
                          />
                          <Label htmlFor="job-contract">Contract/Freelance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="job-internship"
                            checked={vocationalBackground.desiredJobTypes.includes("internship")}
                            onCheckedChange={(checked) => handleJobTypeToggle("internship", checked as boolean)}
                          />
                          <Label htmlFor="job-internship">Internship</Label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="education-level">Highest Education Level</Label>
                        <Select
                          value={vocationalBackground.educationLevel}
                          onValueChange={(value) => handleVocationalChange("educationLevel", value)}
                        >
                          <SelectTrigger id="education-level">
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high-school">High School Diploma/GED</SelectItem>
                            <SelectItem value="some-college">Some College</SelectItem>
                            <SelectItem value="associates">Associate's Degree</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                            <SelectItem value="doctorate">Doctorate</SelectItem>
                            <SelectItem value="vocational">Vocational/Technical Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="years-experience">Years of Work Experience</Label>
                        <Select
                          value={vocationalBackground.yearsOfExperience}
                          onValueChange={(value) => handleVocationalChange("yearsOfExperience", value)}
                        >
                          <SelectTrigger id="years-experience">
                            <SelectValue placeholder="Select years of experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No experience</SelectItem>
                            <SelectItem value="<1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Skills (Select all that apply)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="skill-customer-service"
                            checked={vocationalBackground.skills.includes("customer-service")}
                            onCheckedChange={(checked) => handleSkillToggle("customer-service", checked as boolean)}
                          />
                          <Label htmlFor="skill-customer-service">Customer Service</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="skill-computer"
                            checked={vocationalBackground.skills.includes("computer")}
                            onCheckedChange={(checked) => handleSkillToggle("computer", checked as boolean)}
                          />
                          <Label htmlFor="skill-computer">Computer Skills</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="skill-communication"
                            checked={vocationalBackground.skills.includes("communication")}
                            onCheckedChange={(checked) => handleSkillToggle("communication", checked as boolean)}
                          />
                          <Label htmlFor="skill-communication">Communication</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="skill-management"
                            checked={vocationalBackground.skills.includes("management")}
                            onCheckedChange={(checked) => handleSkillToggle("management", checked as boolean)}
                          />
                          <Label htmlFor="skill-management">Management</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="skill-technical"
                            checked={vocationalBackground.skills.includes("technical")}
                            onCheckedChange={(checked) => handleSkillToggle("technical", checked as boolean)}
                          />
                          <Label htmlFor="skill-technical">Technical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="skill-creative"
                            checked={vocationalBackground.skills.includes("creative")}
                            onCheckedChange={(checked) => handleSkillToggle("creative", checked as boolean)}
                          />
                          <Label htmlFor="skill-creative">Creative</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Industries (Select all that apply)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="industry-technology"
                            checked={vocationalBackground.industries.includes("technology")}
                            onCheckedChange={(checked) => handleIndustryToggle("technology", checked as boolean)}
                          />
                          <Label htmlFor="industry-technology">Technology</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="industry-healthcare"
                            checked={vocationalBackground.industries.includes("healthcare")}
                            onCheckedChange={(checked) => handleIndustryToggle("healthcare", checked as boolean)}
                          />
                          <Label htmlFor="industry-healthcare">Healthcare</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="industry-education"
                            checked={vocationalBackground.industries.includes("education")}
                            onCheckedChange={(checked) => handleIndustryToggle("education", checked as boolean)}
                          />
                          <Label htmlFor="industry-education">Education</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="industry-retail"
                            checked={vocationalBackground.industries.includes("retail")}
                            onCheckedChange={(checked) => handleIndustryToggle("retail", checked as boolean)}
                          />
                          <Label htmlFor="industry-retail">Retail</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="industry-finance"
                            checked={vocationalBackground.industries.includes("finance")}
                            onCheckedChange={(checked) => handleIndustryToggle("finance", checked as boolean)}
                          />
                          <Label htmlFor="industry-finance">Finance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="industry-government"
                            checked={vocationalBackground.industries.includes("government")}
                            onCheckedChange={(checked) => handleIndustryToggle("government", checked as boolean)}
                          />
                          <Label htmlFor="industry-government">Government</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Work History</Label>
                        <Button variant="outline" size="sm" className="h-8">
                          <Edit className="mr-2 h-3 w-3" />
                          Add Job
                        </Button>
                      </div>
                      {vocationalBackground.workHistory.map((job, index) => (
                        <Card key={index} className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{job.position}</h4>
                                <p className="text-sm text-gray-500">{job.company}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(job.startDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })}{" "}
                                  -
                                  {job.endDate
                                    ? new Date(job.endDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                      })
                                    : "Present"}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8">
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <p className="text-sm mt-2">{job.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Certifications & Licenses</Label>
                        <Button variant="outline" size="sm" className="h-8">
                          <Edit className="mr-2 h-3 w-3" />
                          Add Certification
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {vocationalBackground.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center justify-between rounded-md border p-3">
                            <span>{cert}</span>
                            <Button variant="ghost" size="sm" className="h-8">
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accommodations-needed">Workplace Accommodations Needed</Label>
                      <Textarea
                        id="accommodations-needed"
                        placeholder="Describe any accommodations you need in the workplace"
                        value={vocationalBackground.accommodationsNeeded}
                        onChange={(e) => handleVocationalChange("accommodationsNeeded", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

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
