"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Bot, Lock } from "lucide-react"
import WorkflowTracker from "./automation/workflow-tracker"

export default function CallToAction() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    service: "",
    hearingStatus: "",
    goals: "",
    vrClient: false,
    ticketToWork: false,
    aslPreferred: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [workflowId, setWorkflowId] = useState<string | null>(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, service: value }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormState((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Start automated journey
      const response = await fetch("/api/automation/start-journey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          phone: formState.phone,
          zipCode: formState.zipCode,
          stateCode: "TX", // This would be determined from zipCode
          service: formState.service,
          hearingStatus: formState.hearingStatus,
          goals: formState.goals,
          vrClient: formState.vrClient,
          ticketToWork: formState.ticketToWork,
          aslPreferred: formState.aslPreferred,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setWorkflowId(result.workflowId)
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          zipCode: "",
          service: "",
          hearingStatus: "",
          goals: "",
          vrClient: false,
          ticketToWork: false,
          aslPreferred: false,
        })
      } else {
        throw new Error(result.error?.message || "Submission failed")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("There was an error starting your journey. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-texas-red-50 to-texas-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-primary/20">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-texas-red-600 to-texas-blue-600 p-8 text-primary-foreground">
              <h2 className="text-3xl font-bold mb-6">Automated VR4DEAF Journey</h2>
              <p className="mb-8">
                Our AI system automatically matches you with the nearest ASL-friendly VR office in our network and
                creates your personalized pathway to employment success.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI-Powered VR Matching</h3>
                    <p className="text-primary-foreground/80">
                      Automatically find and connect with ASL-friendly VR offices in your area
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">VR-Funded Account</h3>
                    <p className="text-primary-foreground/80">
                      Free account with services unlocked only when VR approves funding
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alternative Pathways</h3>
                    <p className="text-primary-foreground/80">
                      If VR declines, we redirect to 360 Business Magician or 360 Job Magician
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary-foreground/10 rounded-lg">
                <p className="text-sm text-primary-foreground/90">
                  <strong>Smart Lead Generation:</strong> Our system captures comprehensive information to ensure
                  perfect VR office matching and seamless account provisioning.
                </p>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Start Your Automated Journey</h3>

              {isSubmitted && workflowId ? (
                <WorkflowTracker workflowId={workflowId} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formState.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP code"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Primary Interest</Label>
                    <Select value={formState.service} onValueChange={handleSelectChange}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select your primary interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job-seeker">Job Placement & Employment</SelectItem>
                        <SelectItem value="self-employment">Self-Employment & Business Start-up</SelectItem>
                        <SelectItem value="small-business">Small Business Growth & Expansion</SelectItem>
                        <SelectItem value="training">Skills Training & Certification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hearingStatus">Hearing Status</Label>
                    <Select
                      value={formState.hearingStatus}
                      onValueChange={(value) => setFormState((prev) => ({ ...prev, hearingStatus: value }))}
                    >
                      <SelectTrigger id="hearingStatus">
                        <SelectValue placeholder="Select your hearing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deaf">Deaf</SelectItem>
                        <SelectItem value="hard-of-hearing">Hard of Hearing</SelectItem>
                        <SelectItem value="deafblind">Deafblind</SelectItem>
                        <SelectItem value="late-deafened">Late-Deafened</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="vr-client"
                        checked={formState.vrClient}
                        onCheckedChange={(checked) => handleCheckboxChange("vrClient", checked)}
                      />
                      <Label htmlFor="vr-client" className="text-sm font-normal">
                        I am currently a VR client or have been in the past
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="ticket-to-work"
                        checked={formState.ticketToWork}
                        onCheckedChange={(checked) => handleCheckboxChange("ticketToWork", checked)}
                      />
                      <Label htmlFor="ticket-to-work" className="text-sm font-normal">
                        I participate in the Ticket to Work program
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="asl-preferred"
                        checked={formState.aslPreferred}
                        onCheckedChange={(checked) => handleCheckboxChange("aslPreferred", checked)}
                      />
                      <Label htmlFor="asl-preferred" className="text-sm font-normal">
                        I prefer ASL interpretation services
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">Employment Goals (Optional)</Label>
                    <Textarea
                      id="goals"
                      name="goals"
                      value={formState.goals}
                      onChange={handleChange}
                      placeholder="Briefly describe your employment or business goals"
                      rows={3}
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Automated Processing</h5>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Upon submission, our AI will instantly match you with ASL-friendly VR offices, create your
                      account, and initiate the funding approval process.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-texas-red-600 to-texas-blue-600 hover:from-texas-red-700 hover:to-texas-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Processing & Matching...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Start Automated Journey
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
