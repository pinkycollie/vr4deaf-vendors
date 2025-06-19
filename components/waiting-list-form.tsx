"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { addToWaitingList } from "@/app/actions/waiting-list-actions"
import { useToast } from "@/hooks/use-toast"
import { useHapticFeedback } from "@/contexts/haptic-feedback-context"
import { AccessibilitySettings } from "@/components/accessibility-settings"

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "District of Columbia",
  "Puerto Rico",
  "U.S. Virgin Islands",
]

const serviceOptions = [
  { id: "job-search", label: "Job Search Assistance" },
  { id: "resume-building", label: "Resume Building" },
  { id: "interview-prep", label: "Interview Preparation" },
  { id: "career-counseling", label: "Career Counseling" },
  { id: "skills-assessment", label: "Skills Assessment" },
  { id: "training-programs", label: "Training Programs" },
  { id: "assistive-tech", label: "Assistive Technology" },
  { id: "job-accommodations", label: "Job Accommodations" },
  { id: "self-employment", label: "Self-Employment Support" },
]

export function WaitingListForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { isSupported } = useHapticFeedback()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
    errors?: any[]
  } | null>(null)

  const [selectedServices, setSelectedServices] = useState<string[]>([])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    // Clear any previous service interests and add the selected ones
    formData.delete("serviceInterest")
    selectedServices.forEach((service) => {
      formData.append("serviceInterest", service)
    })

    const result = await addToWaitingList(formData)

    setIsSubmitting(false)
    setFormStatus(result)

    if (result.success) {
      // Show success toast notification with haptic feedback
      toast({
        variant: "success",
        title: "Successfully Added to Waiting List!",
        description: "You will be notified when space becomes available.",
        enableHaptic: true, // Enable haptic feedback for this toast
      })

      form.reset()
      setSelectedServices([])

      // Optionally redirect after successful submission
      setTimeout(() => {
        router.push("/waiting-list/confirmation")
      }, 2000)
    } else {
      // Show error toast notification with haptic feedback
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message || "There was a problem adding you to the waiting list.",
        enableHaptic: true, // Enable haptic feedback for this toast
      })
    }
  }

  function handleServiceToggle(serviceId: string, checked: boolean) {
    if (checked) {
      setSelectedServices((prev) => [...prev, serviceId])
    } else {
      setSelectedServices((prev) => prev.filter((id) => id !== serviceId))
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="relative">
        <div className="absolute right-4 top-4">
          <AccessibilitySettings />
        </div>
        <CardTitle className="text-2xl">Join Our Waiting List</CardTitle>
        <CardDescription>Sign up to be notified when space becomes available in our VR4Deaf programs.</CardDescription>
        {isSupported && (
          <p className="text-xs text-muted-foreground mt-1">
            Haptic feedback is available on this device. You can adjust settings using the vibration icon.
          </p>
        )}
      </CardHeader>

      {formStatus && (
        <Alert className="mx-6 mb-4" variant={formStatus.success ? "default" : "destructive"}>
          {formStatus.success ? <CheckIcon className="h-4 w-4" /> : <InfoIcon className="h-4 w-4" />}
          <AlertTitle>{formStatus.success ? "Success!" : "Error"}</AlertTitle>
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input id="fullName" name="fullName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Communication Preferences</h3>

            <div className="space-y-2">
              <Label>
                Preferred Contact Method <span className="text-red-500">*</span>
              </Label>
              <RadioGroup name="preferredContact" defaultValue="email" className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone">Phone Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="contact-text" />
                  <Label htmlFor="contact-text">Text Message</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="videophone" id="contact-videophone" />
                  <Label htmlFor="contact-videophone">Videophone</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>
                Communication Preference <span className="text-red-500">*</span>
              </Label>
              <RadioGroup name="communicationPreference" defaultValue="both" className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asl" id="comm-asl" />
                  <Label htmlFor="comm-asl">ASL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="written" id="comm-written" />
                  <Label htmlFor="comm-written">Written English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="comm-both" />
                  <Label htmlFor="comm-both">Both ASL and Written English</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select name="state" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="county">County (Optional)</Label>
                <Input id="county" name="county" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Services Interested In <span className="text-red-500">*</span>
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {serviceOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedServices.includes(option.id)}
                    onCheckedChange={(checked) => handleServiceToggle(option.id, checked as boolean)}
                  />
                  <Label htmlFor={option.id} className="leading-tight">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              VR Client Status <span className="text-red-500">*</span>
            </h3>

            <RadioGroup name="vrClientStatus" defaultValue="unsure" className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current" id="vr-current" />
                <Label htmlFor="vr-current">I am currently a VR client</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="former" id="vr-former" />
                <Label htmlFor="vr-former">I was previously a VR client</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="vr-never" />
                <Label htmlFor="vr-never">I have never been a VR client</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsure" id="vr-unsure" />
                <Label htmlFor="vr-unsure">I'm not sure</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Please share any additional information that might help us better understand your needs."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting || selectedServices.length === 0}>
            {isSubmitting ? "Submitting..." : "Join Waiting List"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            By submitting this form, you agree to be contacted about VR4Deaf services.
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
