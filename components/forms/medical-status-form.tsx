"use client"

import type React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicalStatusFormProps {
  data: any
  updateData: (data: any) => void
}

export const MedicalStatusForm = forwardRef<{ handleSubmit: () => void }, MedicalStatusFormProps>(
  ({ data, updateData }, ref) => {
    const [formState, setFormState] = useState({
      disabilityType: data.disabilityType || [],
      disabilityDescription: data.disabilityDescription || "",
      disabilityOnset: data.disabilityOnset || "",
      medicalTreatment: data.medicalTreatment || "no",
      currentMedications: data.currentMedications || "",
      physicalLimitations: data.physicalLimitations || "",
      mentalHealthConditions: data.mentalHealthConditions || "no",
      mentalHealthDescription: data.mentalHealthDescription || "",
      accommodationsNeeded: data.accommodationsNeeded || "",
      assistiveTechnology: data.assistiveTechnology || "no",
      assistiveTechnologyDescription: data.assistiveTechnologyDescription || "",
      medicalStability: data.medicalStability || "stable",
      healthcareProvider: data.healthcareProvider || "",
      healthcareProviderContact: data.healthcareProviderContact || "",
    })

    const disabilityTypes = [
      { id: "physical", label: "Physical Disability" },
      { id: "sensory", label: "Sensory Disability (Vision/Hearing)" },
      { id: "cognitive", label: "Cognitive Disability" },
      { id: "psychiatric", label: "Psychiatric Disability" },
      { id: "developmental", label: "Developmental Disability" },
      { id: "learning", label: "Learning Disability" },
      { id: "chronic-illness", label: "Chronic Illness" },
      { id: "other", label: "Other" },
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

    const handleCheckboxChange = (id: string) => {
      setFormState((prev) => {
        const currentTypes = [...prev.disabilityType]
        if (currentTypes.includes(id)) {
          return { ...prev, disabilityType: currentTypes.filter((type) => type !== id) }
        } else {
          return { ...prev, disabilityType: [...currentTypes, id] }
        }
      })
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Medical Status & Disability Information</h2>
          <p className="text-muted-foreground mb-6">
            Please provide information about your disability and medical status to help us understand your needs.
          </p>
        </div>

        <div className="space-y-4">
          <Label>Type of Disability (Select all that apply)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {disabilityTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={formState.disabilityType.includes(type.id)}
                  onCheckedChange={() => handleCheckboxChange(type.id)}
                />
                <Label htmlFor={type.id}>{type.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disabilityDescription">Please describe your disability</Label>
          <Textarea
            id="disabilityDescription"
            name="disabilityDescription"
            value={formState.disabilityDescription}
            onChange={handleChange}
            placeholder="Provide details about your disability"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="disabilityOnset">When did your disability begin?</Label>
          <Input
            id="disabilityOnset"
            name="disabilityOnset"
            value={formState.disabilityOnset}
            onChange={handleChange}
            placeholder="e.g., Birth, 2015, After an accident in 2018"
          />
        </div>

        <div className="space-y-2">
          <Label>Are you currently receiving medical treatment?</Label>
          <RadioGroup
            value={formState.medicalTreatment}
            onValueChange={(value) => handleSelectChange("medicalTreatment", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="treatment-yes" />
              <Label htmlFor="treatment-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="treatment-no" />
              <Label htmlFor="treatment-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentMedications">Current Medications (if any)</Label>
          <Textarea
            id="currentMedications"
            name="currentMedications"
            value={formState.currentMedications}
            onChange={handleChange}
            placeholder="List any medications you are currently taking"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="physicalLimitations">Physical Limitations</Label>
          <Textarea
            id="physicalLimitations"
            name="physicalLimitations"
            value={formState.physicalLimitations}
            onChange={handleChange}
            placeholder="Describe any physical limitations that may affect your ability to work"
          />
        </div>

        <div className="space-y-2">
          <Label>Do you have any mental health conditions?</Label>
          <RadioGroup
            value={formState.mentalHealthConditions}
            onValueChange={(value) => handleSelectChange("mentalHealthConditions", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="mental-health-yes" />
              <Label htmlFor="mental-health-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="mental-health-no" />
              <Label htmlFor="mental-health-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer-not-to-say" id="mental-health-prefer-not" />
              <Label htmlFor="mental-health-prefer-not">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>

        {formState.mentalHealthConditions === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="mentalHealthDescription">Please describe your mental health condition</Label>
            <Textarea
              id="mentalHealthDescription"
              name="mentalHealthDescription"
              value={formState.mentalHealthDescription}
              onChange={handleChange}
              placeholder="Provide details about your mental health condition"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="accommodationsNeeded">Accommodations Needed</Label>
          <Textarea
            id="accommodationsNeeded"
            name="accommodationsNeeded"
            value={formState.accommodationsNeeded}
            onChange={handleChange}
            placeholder="Describe any accommodations you may need in a work environment"
          />
        </div>

        <div className="space-y-2">
          <Label>Do you use any assistive technology?</Label>
          <RadioGroup
            value={formState.assistiveTechnology}
            onValueChange={(value) => handleSelectChange("assistiveTechnology", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="assistive-tech-yes" />
              <Label htmlFor="assistive-tech-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="assistive-tech-no" />
              <Label htmlFor="assistive-tech-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formState.assistiveTechnology === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="assistiveTechnologyDescription">Please describe the assistive technology you use</Label>
            <Textarea
              id="assistiveTechnologyDescription"
              name="assistiveTechnologyDescription"
              value={formState.assistiveTechnologyDescription}
              onChange={handleChange}
              placeholder="Describe the assistive technology you use"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Medical Stability</Label>
          <Select
            value={formState.medicalStability}
            onValueChange={(value) => handleSelectChange("medicalStability", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select medical stability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stable">Stable - My condition is stable</SelectItem>
              <SelectItem value="improving">Improving - My condition is improving</SelectItem>
              <SelectItem value="fluctuating">Fluctuating - My condition fluctuates</SelectItem>
              <SelectItem value="deteriorating">Deteriorating - My condition is getting worse</SelectItem>
              <SelectItem value="uncertain">Uncertain - I'm not sure about my condition's stability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Healthcare Provider Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="healthcareProvider">Healthcare Provider Name</Label>
              <Input
                id="healthcareProvider"
                name="healthcareProvider"
                value={formState.healthcareProvider}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="healthcareProviderContact">Healthcare Provider Contact</Label>
              <Input
                id="healthcareProviderContact"
                name="healthcareProviderContact"
                value={formState.healthcareProviderContact}
                onChange={handleChange}
                placeholder="Phone or email"
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
)

MedicalStatusForm.displayName = "MedicalStatusForm"
