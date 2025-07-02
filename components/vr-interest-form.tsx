"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormIntroduction } from "./form-introduction"
import { PersonalInfoForm } from "./personal-info-form"
import { DisabilityInfoForm } from "./disability-info-form"
import { EmploymentInfoForm } from "./employment-info-form"
import { AdditionalInfoForm } from "./additional-info-form"
import { FormSuccess } from "./form-success"

// Define the form schema
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),

  // Disability Information
  disabilityType: z.array(z.string()).min(1, "Please select at least one disability type"),
  disabilityDescription: z.string().min(1, "Please describe how your disability affects your ability to work"),

  // Employment Information
  employmentStatus: z.string().min(1, "Please select your current employment status"),
  employmentGoals: z.string().min(1, "Please describe your employment goals"),

  // Additional Information
  howDidYouHear: z.string().optional(),
  additionalComments: z.string().optional(),

  // Consent
  consentToContact: z.boolean().refine((val) => val === true, {
    message: "You must consent to be contacted",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function VRInterestForm() {
  const [step, setStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      dateOfBirth: "",
      disabilityType: [],
      disabilityDescription: "",
      employmentStatus: "",
      employmentGoals: "",
      howDidYouHear: "",
      additionalComments: "",
      consentToContact: false,
    },
    mode: "onChange",
  })

  const steps = [
    { title: "Introduction", component: <FormIntroduction /> },
    { title: "Personal Information", component: <PersonalInfoForm form={form} /> },
    { title: "Disability Information", component: <DisabilityInfoForm form={form} /> },
    { title: "Employment Information", component: <EmploymentInfoForm form={form} /> },
    { title: "Additional Information", component: <AdditionalInfoForm form={form} /> },
  ]

  const nextStep = async () => {
    if (step === 0) {
      setStep(step + 1)
      return
    }

    const fieldsToValidate = {
      1: ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "dateOfBirth"],
      2: ["disabilityType", "disabilityDescription"],
      3: ["employmentStatus", "employmentGoals"],
      4: ["consentToContact"],
    }

    const isValid = await form.trigger(fieldsToValidate[step as keyof typeof fieldsToValidate])

    if (isValid) {
      if (step === steps.length - 1) {
        await onSubmit(form.getValues())
      } else {
        setStep(step + 1)
      }
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  // Update the onSubmit function to integrate with Google services

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data)

    try {
      // Show loading state
      setIsSubmitting(true)

      // Submit data to Google Sheets via Google Apps Script
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      // Schedule a Google Calendar event for initial consultation
      await fetch("/api/schedule-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
        }),
      })

      // Set submission success
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      // Handle error state here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return <FormSuccess />
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-2xl">Start My VR Interest Form</CardTitle>
        <CardDescription className="text-primary-foreground/90">
          Texas Workforce Solutions-Vocational Rehabilitation (VR) Services
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Current step content */}
        <div className="min-h-[400px]">{steps[step].component}</div>
      </CardContent>

      <CardFooter className="flex justify-between p-6 border-t">
        <Button variant="outline" onClick={prevStep} disabled={step === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button onClick={nextStep}>
          {step === steps.length - 1 ? "Submit" : "Next"}
          {step !== steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
