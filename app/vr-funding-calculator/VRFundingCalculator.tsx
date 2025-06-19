"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calculator, CheckCircle, ChevronRight, HelpCircle, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FormData {
  disability: string
  disabilityType: string[]
  employmentBarrier: string
  employmentGoal: string
  age: string
  texasResident: string
  currentlyEmployed: string
  receivingBenefits: string[]
  educationLevel: string
  veteranStatus: string
}

interface EligibilityResult {
  eligible: boolean
  score: number
  services: string[]
  nextSteps: string[]
  fundingTypes: string[]
}

export default function VRFundingCalculator() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(10)
  const [formData, setFormData] = useState<FormData>({
    disability: "",
    disabilityType: [],
    employmentBarrier: "",
    employmentGoal: "",
    age: "",
    texasResident: "",
    currentlyEmployed: "",
    receivingBenefits: [],
    educationLevel: "",
    veteranStatus: "",
  })
  const [result, setResult] = useState<EligibilityResult | null>(null)

  const totalSteps = 5

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      setProgress(((step + 1) / totalSteps) * 100)
    } else {
      calculateEligibility()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress(((step - 1) / totalSteps) * 100)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    const currentValues = formData[field] as string[]
    let newValues: string[]

    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((item) => item !== value)
    }

    setFormData({
      ...formData,
      [field]: newValues,
    })
  }

  const calculateEligibility = () => {
    // This is a simplified eligibility calculation for demonstration purposes
    // In a real application, this would be more complex and based on actual VR eligibility criteria

    let score = 0
    let eligible = false
    let services: string[] = []
    let nextSteps: string[] = []
    let fundingTypes: string[] = []

    // Basic eligibility criteria
    if (formData.disability === "yes") score += 30
    if (formData.employmentBarrier === "yes") score += 30
    if (formData.texasResident === "yes") score += 20

    // Additional factors that may influence eligibility or services
    if (formData.disabilityType.includes("deaf") || formData.disabilityType.includes("hearing")) score += 10
    if (formData.age === "14-24") score += 5 // Youth may have access to additional services
    if (formData.receivingBenefits.includes("ssi") || formData.receivingBenefits.includes("ssdi")) score += 5
    if (formData.veteranStatus === "yes") score += 5

    // Determine eligibility based on score
    if (score >= 70 && formData.disability === "yes" && formData.employmentBarrier === "yes") {
      eligible = true
    }

    // Determine potential services based on inputs
    if (eligible) {
      services = [
        "Vocational counseling and guidance",
        "Job placement assistance",
        "Assistive technology assessment and training",
      ]

      if (formData.disabilityType.includes("deaf") || formData.disabilityType.includes("hearing")) {
        services.push("Sign language interpreter services")
        services.push("Communication devices")
      }

      if (formData.age === "14-24") {
        services.push("Pre-employment transition services")
        services.push("Summer Earn & Learn program")
      }

      if (formData.educationLevel === "high-school" || formData.educationLevel === "some-college") {
        services.push("Educational training support")
      }

      if (formData.currentlyEmployed === "no") {
        services.push("Job search assistance")
        services.push("Resume development")
        services.push("Interview preparation")
      } else {
        services.push("Job retention services")
        services.push("Workplace accommodations")
      }

      if (formData.veteranStatus === "yes") {
        services.push("Veteran-specific employment resources")
      }

      // Determine funding types
      fundingTypes = ["Basic VR services funding"]

      if (formData.disabilityType.includes("deaf") || formData.disabilityType.includes("hearing")) {
        fundingTypes.push("Deaf and Hard of Hearing specialized services funding")
      }

      if (formData.age === "14-24") {
        fundingTypes.push("Youth transition services funding")
      }

      if (formData.educationLevel === "high-school" || formData.educationLevel === "some-college") {
        fundingTypes.push("Educational support funding")
      }

      if (formData.veteranStatus === "yes") {
        fundingTypes.push("Veteran vocational rehabilitation support")
      }

      // Next steps for eligible individuals
      nextSteps = [
        "Complete the Start My VR online referral form",
        "Schedule an initial meeting with a VR counselor",
        "Gather documentation of your disability",
        "Prepare to discuss your employment goals and barriers",
        "Be ready to participate in assessments to determine specific needs",
      ]
    } else {
      // Next steps for potentially ineligible individuals
      nextSteps = [
        "Contact a VR counselor to discuss your specific situation",
        "Explore alternative employment resources through Workforce Solutions",
        "Consider connecting with a Center for Independent Living for additional support",
        "Gather more documentation about your disability and employment barriers",
      ]
    }

    setResult({
      eligible,
      score,
      services,
      nextSteps,
      fundingTypes,
    })

    // Move to results step
    setStep(totalSteps + 1)
    setProgress(100)
  }

  const resetCalculator = () => {
    setFormData({
      disability: "",
      disabilityType: [],
      employmentBarrier: "",
      employmentGoal: "",
      age: "",
      texasResident: "",
      currentlyEmployed: "",
      receivingBenefits: [],
      educationLevel: "",
      veteranStatus: "",
    })
    setResult(null)
    setStep(1)
    setProgress(10)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">VR4DEAF: JOB</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/texas-vr-resources" className="text-sm font-medium hover:underline">
              VR Resources
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Services
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
            <Link href="/auth/login" className="text-sm font-medium text-primary hover:underline">
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/texas-vr-resources" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Texas VR Resources
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">VR Funding Eligibility Calculator</h1>
            </div>
            <p className="text-gray-500 mt-2">
              Estimate your eligibility for vocational rehabilitation funding and services in Texas
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {step > totalSteps ? totalSteps : step} of {totalSteps}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="max-w-3xl mx-auto">
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Disability Information</CardTitle>
                  <CardDescription>
                    Please provide information about your disability status to help us determine your eligibility.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="disability">
                      Do you have a documented disability that creates a barrier to employment?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 inline-block ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              A documented disability means you have medical or psychological documentation of a
                              condition that substantially limits one or more major life activities.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <RadioGroup
                      value={formData.disability}
                      onValueChange={(value) => handleInputChange("disability", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="disability-yes" />
                        <Label htmlFor="disability-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="disability-no" />
                        <Label htmlFor="disability-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unsure" id="disability-unsure" />
                        <Label htmlFor="disability-unsure">Unsure</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.disability === "yes" && (
                    <div className="space-y-2">
                      <Label>What type of disability do you have? (Select all that apply)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-deaf"
                            checked={formData.disabilityType.includes("deaf")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "deaf", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-deaf">Deaf</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-hearing"
                            checked={formData.disabilityType.includes("hearing")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "hearing", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-hearing">Hard of Hearing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-visual"
                            checked={formData.disabilityType.includes("visual")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "visual", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-visual">Visual Impairment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-physical"
                            checked={formData.disabilityType.includes("physical")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "physical", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-physical">Physical Disability</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-intellectual"
                            checked={formData.disabilityType.includes("intellectual")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "intellectual", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-intellectual">Intellectual Disability</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-learning"
                            checked={formData.disabilityType.includes("learning")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "learning", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-learning">Learning Disability</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-mental"
                            checked={formData.disabilityType.includes("mental")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "mental", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-mental">Mental Health Condition</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disability-other"
                            checked={formData.disabilityType.includes("other")}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("disabilityType", "other", checked as boolean)
                            }
                          />
                          <Label htmlFor="disability-other">Other</Label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="employmentBarrier">
                      Does your disability create a barrier to getting or keeping a job?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 inline-block ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              A barrier to employment means your disability makes it difficult to prepare for, get,
                              keep, or advance in employment.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <RadioGroup
                      value={formData.employmentBarrier}
                      onValueChange={(value) => handleInputChange("employmentBarrier", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="barrier-yes" />
                        <Label htmlFor="barrier-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="barrier-no" />
                        <Label htmlFor="barrier-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unsure" id="barrier-unsure" />
                        <Label htmlFor="barrier-unsure">Unsure</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle>Employment Goals</CardTitle>
                  <CardDescription>Please tell us about your employment status and goals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="employmentGoal">What is your primary employment goal?</Label>
                    <Select
                      value={formData.employmentGoal}
                      onValueChange={(value) => handleInputChange("employmentGoal", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your employment goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="find-job">Find a new job</SelectItem>
                        <SelectItem value="keep-job">Keep my current job</SelectItem>
                        <SelectItem value="advance-career">Advance in my career</SelectItem>
                        <SelectItem value="change-careers">Change careers</SelectItem>
                        <SelectItem value="self-employment">Become self-employed</SelectItem>
                        <SelectItem value="education">Get education or training</SelectItem>
                        <SelectItem value="unsure">Unsure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentlyEmployed">Are you currently employed?</Label>
                    <RadioGroup
                      value={formData.currentlyEmployed}
                      onValueChange={(value) => handleInputChange("currentlyEmployed", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="employed-yes" />
                        <Label htmlFor="employed-yes">Yes, full-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time" id="employed-part-time" />
                        <Label htmlFor="employed-part-time">Yes, part-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="employed-no" />
                        <Label htmlFor="employed-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Are you currently receiving any of the following benefits? (Select all that apply)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="benefits-ssi"
                          checked={formData.receivingBenefits.includes("ssi")}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("receivingBenefits", "ssi", checked as boolean)
                          }
                        />
                        <Label htmlFor="benefits-ssi">Supplemental Security Income (SSI)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="benefits-ssdi"
                          checked={formData.receivingBenefits.includes("ssdi")}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("receivingBenefits", "ssdi", checked as boolean)
                          }
                        />
                        <Label htmlFor="benefits-ssdi">Social Security Disability Insurance (SSDI)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="benefits-tanf"
                          checked={formData.receivingBenefits.includes("tanf")}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("receivingBenefits", "tanf", checked as boolean)
                          }
                        />
                        <Label htmlFor="benefits-tanf">TANF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="benefits-snap"
                          checked={formData.receivingBenefits.includes("snap")}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("receivingBenefits", "snap", checked as boolean)
                          }
                        />
                        <Label htmlFor="benefits-snap">SNAP (Food Stamps)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="benefits-workers-comp"
                          checked={formData.receivingBenefits.includes("workers-comp")}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("receivingBenefits", "workers-comp", checked as boolean)
                          }
                        />
                        <Label htmlFor="benefits-workers-comp">Workers' Compensation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="benefits-none"
                          checked={formData.receivingBenefits.includes("none")}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("receivingBenefits", "none", checked as boolean)
                          }
                        />
                        <Label htmlFor="benefits-none">None of the above</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Please provide some basic information about yourself to help us determine your eligibility.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">What is your age range?</Label>
                    <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-14">Under 14</SelectItem>
                        <SelectItem value="14-24">14-24</SelectItem>
                        <SelectItem value="25-54">25-54</SelectItem>
                        <SelectItem value="55-plus">55+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="texasResident">Are you a Texas resident?</Label>
                    <RadioGroup
                      value={formData.texasResident}
                      onValueChange={(value) => handleInputChange("texasResident", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="resident-yes" />
                        <Label htmlFor="resident-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="resident-no" />
                        <Label htmlFor="resident-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">What is your highest level of education?</Label>
                    <Select
                      value={formData.educationLevel}
                      onValueChange={(value) => handleInputChange("educationLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-high-school">Less than high school</SelectItem>
                        <SelectItem value="high-school">High school diploma or GED</SelectItem>
                        <SelectItem value="some-college">Some college</SelectItem>
                        <SelectItem value="associates">Associate's degree</SelectItem>
                        <SelectItem value="bachelors">Bachelor's degree</SelectItem>
                        <SelectItem value="masters-or-higher">Master's degree or higher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </>
            )}

            {step === 4 && (
              <>
                <CardHeader>
                  <CardTitle>Veteran Status</CardTitle>
                  <CardDescription>
                    Veterans may be eligible for additional vocational rehabilitation services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="veteranStatus">Are you a veteran of the U.S. Armed Forces?</Label>
                    <RadioGroup
                      value={formData.veteranStatus}
                      onValueChange={(value) => handleInputChange("veteranStatus", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="veteran-yes" />
                        <Label htmlFor="veteran-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="veteran-no" />
                        <Label htmlFor="veteran-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.veteranStatus === "yes" && (
                    <div className="rounded-lg border p-4 bg-blue-50">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium">Veteran Resources Available</p>
                          <p className="text-sm text-blue-800 mt-1">
                            As a veteran, you may also be eligible for Veteran Readiness and Employment (VR&E) services
                            through the Department of Veterans Affairs. We'll include information about these services
                            in your results.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            )}

            {step === 5 && (
              <>
                <CardHeader>
                  <CardTitle>Review Your Information</CardTitle>
                  <CardDescription>Please review the information you've provided before submitting.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Disability Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Documented Disability:</span>{" "}
                        {formData.disability === "yes" ? "Yes" : formData.disability === "no" ? "No" : "Unsure"}
                      </div>
                      {formData.disability === "yes" && (
                        <div>
                          <span className="font-medium">Disability Type:</span>{" "}
                          {formData.disabilityType.length > 0
                            ? formData.disabilityType
                                .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
                                .join(", ")
                            : "Not specified"}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Employment Barrier:</span>{" "}
                        {formData.employmentBarrier === "yes"
                          ? "Yes"
                          : formData.employmentBarrier === "no"
                            ? "No"
                            : "Unsure"}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Employment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Employment Goal:</span>{" "}
                        {formData.employmentGoal
                          ? formData.employmentGoal
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")
                          : "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Currently Employed:</span>{" "}
                        {formData.currentlyEmployed === "yes"
                          ? "Yes, full-time"
                          : formData.currentlyEmployed === "part-time"
                            ? "Yes, part-time"
                            : formData.currentlyEmployed === "no"
                              ? "No"
                              : "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Receiving Benefits:</span>{" "}
                        {formData.receivingBenefits.length > 0
                          ? formData.receivingBenefits.map((benefit) => benefit.toUpperCase()).join(", ")
                          : "None"}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Age Range:</span>{" "}
                        {formData.age ? formData.age.replace("-", " to ").replace("plus", "+") : "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Texas Resident:</span>{" "}
                        {formData.texasResident === "yes"
                          ? "Yes"
                          : formData.texasResident === "no"
                            ? "No"
                            : "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Education Level:</span>{" "}
                        {formData.educationLevel
                          ? formData.educationLevel
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")
                          : "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Veteran Status:</span>{" "}
                        {formData.veteranStatus === "yes"
                          ? "Yes"
                          : formData.veteranStatus === "no"
                            ? "No"
                            : "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 bg-yellow-50">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-800 font-medium">Important Disclaimer</p>
                        <p className="text-sm text-yellow-800 mt-1">
                          This calculator provides an estimate of your potential eligibility for VR services based on
                          the information you've provided. The final determination of eligibility will be made by a VR
                          counselor after a formal assessment.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {step === totalSteps + 1 && result && (
              <>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {result.eligible ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Info className="h-6 w-6 text-yellow-500" />
                    )}
                    <CardTitle>
                      {result.eligible ? "You May Be Eligible for VR Services" : "Additional Assessment Recommended"}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {result.eligible
                      ? "Based on the information you provided, you may be eligible for vocational rehabilitation services in Texas."
                      : "Based on the information you provided, we recommend speaking with a VR counselor for a full assessment."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4 bg-gray-50">
                    <h3 className="font-medium mb-2">Eligibility Score</h3>
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl font-bold ${result.score >= 70 ? "text-green-600" : "text-yellow-600"}`}
                      >
                        {result.score}/100
                      </div>
                      <Progress
                        value={result.score}
                        className="h-3 flex-1"
                        indicatorClassName={result.score >= 70 ? "bg-green-600" : "bg-yellow-600"}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {result.score >= 70
                        ? "Your score indicates you may meet the basic eligibility criteria for VR services."
                        : "Your score suggests you may need additional assessment to determine eligibility."}
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="services">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Potential Services</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <p className="text-sm text-gray-500">
                            Based on your responses, you may be eligible for the following VR services:
                          </p>
                          <ul className="space-y-2 mt-4">
                            {result.services.map((service, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-primary mt-0.5" />
                                <span className="text-sm">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="funding">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-primary" />
                          <span>Potential Funding Types</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <p className="text-sm text-gray-500">
                            You may be eligible for the following types of VR funding:
                          </p>
                          <ul className="space-y-2 mt-4">
                            {result.fundingTypes.map((funding, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-primary mt-0.5" />
                                <span className="text-sm">{funding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="next-steps">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-5 w-5 text-primary" />
                          <span>Next Steps</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <p className="text-sm text-gray-500">
                            Here are the recommended next steps to pursue vocational rehabilitation services:
                          </p>
                          <ol className="space-y-2 mt-4">
                            {result.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="font-medium text-primary">{index + 1}.</span>
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Separator />

                  <div className="rounded-lg border p-4 bg-blue-50">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium">Important Information</p>
                        <p className="text-sm text-blue-800 mt-1">
                          This is only an estimate based on the information you provided. The final determination of
                          eligibility will be made by a VR counselor after a formal assessment. We encourage you to
                          complete the Start My VR form or contact your local VR office to begin the official process.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            <CardFooter className="flex justify-between">
              {step > 1 && step <= totalSteps + 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step <= totalSteps ? (
                <Button onClick={handleNext}>
                  {step === totalSteps ? "Calculate Eligibility" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetCalculator}>
                    Start Over
                  </Button>
                  <Button asChild>
                    <a
                      href="https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-services#startMyVr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start My VR
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
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
            <Calculator className="h-5 w-5" />
            <span className="text-sm text-gray-500">© 2025 VR4DEAF: JOB. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
