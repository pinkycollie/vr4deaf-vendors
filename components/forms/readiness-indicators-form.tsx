"use client"

import type React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReadinessIndicatorsFormProps {
  data: any
  updateData: (data: any) => void
}

export const ReadinessIndicatorsForm = forwardRef<{ handleSubmit: () => void }, ReadinessIndicatorsFormProps>(
  ({ data, updateData }, ref) => {
    const [formState, setFormState] = useState({
      readyToWork: data.readyToWork || "yes",
      readyToWorkExplanation: data.readyToWorkExplanation || "",
      transportationStatus: data.transportationStatus || "reliable",
      transportationDetails: data.transportationDetails || "",
      childcareNeeds: data.childcareNeeds || "no",
      childcareDetails: data.childcareDetails || "",
      housingStability: data.housingStability || "stable",
      housingDetails: data.housingDetails || "",
      financialStability: data.financialStability || "stable",
      financialDetails: data.financialDetails || "",
      legalIssues: data.legalIssues || "no",
      legalDetails: data.legalDetails || "",
      substanceUseIssues: data.substanceUseIssues || "no",
      substanceUseDetails: data.substanceUseDetails || "",
      supportSystem: data.supportSystem || [],
      supportSystemDetails: data.supportSystemDetails || "",
      barriersToEmployment: data.barriersToEmployment || [],
      otherBarriers: data.otherBarriers || "",
    })

    const supportOptions = [
      "Family",
      "Friends",
      "Counselor/Therapist",
      "Support Group",
      "Religious/Faith Community",
      "Case Manager",
      "None",
      "Other",
    ]

    const barrierOptions = [
      "Transportation",
      "Childcare",
      "Housing",
      "Financial",
      "Legal",
      "Substance Use",
      "Mental Health",
      "Physical Health",
      "Education/Training",
      "Work Experience",
      "None",
      "Other",
    ]

    // Expose the handleSubmit function to the parent component
    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        updateData(formState)
      },
    }))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
      setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleCheckboxChange = (name: string, item: string) => {
      setFormState((prev) => {
        const currentItems = [...(prev[name as keyof typeof prev] as string[])]
        if (currentItems.includes(item)) {
          return { ...prev, [name]: currentItems.filter((i) => i !== item) }
        } else {
          return { ...prev, [name]: [...currentItems, item] }
        }
      })
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Readiness Indicators</h2>
          <p className="text-muted-foreground mb-6">
            Please provide information about factors that may affect your readiness for vocational rehabilitation.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Do you feel ready to work or participate in training?</Label>
          <RadioGroup
            value={formState.readyToWork}
            onValueChange={(value) => handleSelectChange("readyToWork", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="ready-yes" />
              <Label htmlFor="ready-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="ready-no" />
              <Label htmlFor="ready-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsure" id="ready-unsure" />
              <Label htmlFor="ready-unsure">Unsure</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="readyToWorkExplanation">Please explain your answer</Label>
          <Textarea
            id="readyToWorkExplanation"
            name="readyToWorkExplanation"
            value={formState.readyToWorkExplanation}
            onChange={handleChange}
            placeholder="Explain why you feel ready or not ready to work"
          />
        </div>

        <div className="space-y-2">
          <Label>Transportation Status</Label>
          <Select
            value={formState.transportationStatus}
            onValueChange={(value) => handleSelectChange("transportationStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transportation status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reliable">Reliable transportation</SelectItem>
              <SelectItem value="unreliable">Unreliable transportation</SelectItem>
              <SelectItem value="public">Public transportation only</SelectItem>
              <SelectItem value="none">No transportation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportationDetails">Transportation Details</Label>
          <Textarea
            id="transportationDetails"
            name="transportationDetails"
            value={formState.transportationDetails}
            onChange={handleChange}
            placeholder="Provide details about your transportation situation"
          />
        </div>

        <div className="space-y-2">
          <Label>Do you have childcare needs?</Label>
          <RadioGroup
            value={formState.childcareNeeds}
            onValueChange={(value) => handleSelectChange("childcareNeeds", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="childcare-yes" />
              <Label htmlFor="childcare-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="childcare-no" />
              <Label htmlFor="childcare-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formState.childcareNeeds === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="childcareDetails">Childcare Details</Label>
            <Textarea
              id="childcareDetails"
              name="childcareDetails"
              value={formState.childcareDetails}
              onChange={handleChange}
              placeholder="Provide details about your childcare needs"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Housing Stability</Label>
          <Select
            value={formState.housingStability}
            onValueChange={(value) => handleSelectChange("housingStability", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select housing stability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stable">Stable housing</SelectItem>
              <SelectItem value="temporary">Temporary housing</SelectItem>
              <SelectItem value="unstable">Unstable housing</SelectItem>
              <SelectItem value="homeless">Homeless</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="housingDetails">Housing Details</Label>
          <Textarea
            id="housingDetails"
            name="housingDetails"
            value={formState.housingDetails}
            onChange={handleChange}
            placeholder="Provide details about your housing situation"
          />
        </div>

        <div className="space-y-2">
          <Label>Financial Stability</Label>
          <Select
            value={formState.financialStability}
            onValueChange={(value) => handleSelectChange("financialStability", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select financial stability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stable">Stable finances</SelectItem>
              <SelectItem value="somewhat-stable">Somewhat stable finances</SelectItem>
              <SelectItem value="unstable">Unstable finances</SelectItem>
              <SelectItem value="crisis">Financial crisis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="financialDetails">Financial Details</Label>
          <Textarea
            id="financialDetails"
            name="financialDetails"
            value={formState.financialDetails}
            onChange={handleChange}
            placeholder="Provide details about your financial situation"
          />
        </div>

        <div className="space-y-2">
          <Label>Do you have any legal issues that might affect employment?</Label>
          <RadioGroup
            value={formState.legalIssues}
            onValueChange={(value) => handleSelectChange("legalIssues", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="legal-yes" />
              <Label htmlFor="legal-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="legal-no" />
              <Label htmlFor="legal-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer-not-to-say" id="legal-prefer-not" />
              <Label htmlFor="legal-prefer-not">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>

        {formState.legalIssues === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="legalDetails">Legal Details</Label>
            <Textarea
              id="legalDetails"
              name="legalDetails"
              value={formState.legalDetails}
              onChange={handleChange}
              placeholder="Provide details about your legal issues"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Do you have any substance use issues that might affect employment?</Label>
          <RadioGroup
            value={formState.substanceUseIssues}
            onValueChange={(value) => handleSelectChange("substanceUseIssues", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="substance-yes" />
              <Label htmlFor="substance-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="substance-no" />
              <Label htmlFor="substance-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer-not-to-say" id="substance-prefer-not" />
              <Label htmlFor="substance-prefer-not">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>

        {formState.substanceUseIssues === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="substanceUseDetails">Substance Use Details</Label>
            <Textarea
              id="substanceUseDetails"
              name="substanceUseDetails"
              value={formState.substanceUseDetails}
              onChange={handleChange}
              placeholder="Provide details about your substance use issues"
            />
          </div>
        )}

        <div className="space-y-4">
          <Label>Support System (Select all that apply)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {supportOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`support-${option}`}
                  checked={formState.supportSystem.includes(option)}
                  onCheckedChange={() => handleCheckboxChange("supportSystem", option)}
                />
                <Label htmlFor={`support-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supportSystemDetails">Support System Details</Label>
          <Textarea
            id="supportSystemDetails"
            name="supportSystemDetails"
            value={formState.supportSystemDetails}
            onChange={handleChange}
            placeholder="Provide details about your support system"
          />
        </div>

        <div className="space-y-4">
          <Label>Barriers to Employment (Select all that apply)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {barrierOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`barrier-${option}`}
                  checked={formState.barriersToEmployment.includes(option)}
                  onCheckedChange={() => handleCheckboxChange("barriersToEmployment", option)}
                />
                <Label htmlFor={`barrier-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherBarriers">Other Barriers or Concerns</Label>
          <Textarea
            id="otherBarriers"
            name="otherBarriers"
            value={formState.otherBarriers}
            onChange={handleChange}
            placeholder="Describe any other barriers or concerns that may affect your employment"
          />
        </div>
      </div>
    )
  },
)

ReadinessIndicatorsForm.displayName = "ReadinessIndicatorsForm"
