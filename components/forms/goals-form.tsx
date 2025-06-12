"use client"

import type React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface GoalsFormProps {
  data: any
  updateData: (data: any) => void
}

export const GoalsForm = forwardRef<{ handleSubmit: () => void }, GoalsFormProps>(({ data, updateData }, ref) => {
  const [formState, setFormState] = useState({
    careerGoals: data.careerGoals || "",
    shortTermGoals: data.shortTermGoals || "",
    longTermGoals: data.longTermGoals || "",
    desiredIndustry: data.desiredIndustry || [],
    desiredOccupation: data.desiredOccupation || "",
    salaryGoals: data.salaryGoals || "",
    workLifeBalance: data.workLifeBalance || "",
    motivationLevel: data.motivationLevel || "moderate",
    supportNeeded: data.supportNeeded || "",
    timeframe: data.timeframe || "",
  })

  const industries = [
    "Healthcare",
    "Information Technology",
    "Manufacturing",
    "Retail",
    "Education",
    "Finance",
    "Hospitality",
    "Construction",
    "Transportation",
    "Government",
    "Non-profit",
    "Agriculture",
    "Arts & Entertainment",
    "Legal Services",
    "Social Services",
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

  const handleIndustryChange = (industry: string) => {
    setFormState((prev) => {
      const currentIndustries = [...prev.desiredIndustry]
      if (currentIndustries.includes(industry)) {
        return { ...prev, desiredIndustry: currentIndustries.filter((i) => i !== industry) }
      } else {
        return { ...prev, desiredIndustry: [...currentIndustries, industry] }
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Career Goals</h2>
        <p className="text-muted-foreground mb-6">
          Please provide information about your career goals and aspirations.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="careerGoals">Overall Career Goals</Label>
        <Textarea
          id="careerGoals"
          name="careerGoals"
          value={formState.careerGoals}
          onChange={handleChange}
          placeholder="Describe your overall career goals and aspirations"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortTermGoals">Short-Term Goals (Next 1-2 years)</Label>
        <Textarea
          id="shortTermGoals"
          name="shortTermGoals"
          value={formState.shortTermGoals}
          onChange={handleChange}
          placeholder="Describe your short-term career goals"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longTermGoals">Long-Term Goals (3+ years)</Label>
        <Textarea
          id="longTermGoals"
          name="longTermGoals"
          value={formState.longTermGoals}
          onChange={handleChange}
          placeholder="Describe your long-term career goals"
        />
      </div>

      <div className="space-y-4">
        <Label>Desired Industries (Select all that apply)</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={`industry-${industry}`}
                checked={formState.desiredIndustry.includes(industry)}
                onCheckedChange={() => handleIndustryChange(industry)}
              />
              <Label htmlFor={`industry-${industry}`}>{industry}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="desiredOccupation">Desired Occupation/Job Title</Label>
        <Input
          id="desiredOccupation"
          name="desiredOccupation"
          value={formState.desiredOccupation}
          onChange={handleChange}
          placeholder="What specific job or role are you seeking?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="salaryGoals">Salary Goals</Label>
        <Input
          id="salaryGoals"
          name="salaryGoals"
          value={formState.salaryGoals}
          onChange={handleChange}
          placeholder="What are your salary expectations?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="workLifeBalance">Work-Life Balance Priorities</Label>
        <Textarea
          id="workLifeBalance"
          name="workLifeBalance"
          value={formState.workLifeBalance}
          onChange={handleChange}
          placeholder="Describe your work-life balance priorities and needs"
        />
      </div>

      <div className="space-y-2">
        <Label>Motivation Level to Achieve Career Goals</Label>
        <RadioGroup
          value={formState.motivationLevel}
          onValueChange={(value) => handleSelectChange("motivationLevel", value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="very-high" id="motivation-very-high" />
            <Label htmlFor="motivation-very-high">Very High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="motivation-high" />
            <Label htmlFor="motivation-high">High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="motivation-moderate" />
            <Label htmlFor="motivation-moderate">Moderate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="motivation-low" />
            <Label htmlFor="motivation-low">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsure" id="motivation-unsure" />
            <Label htmlFor="motivation-unsure">Unsure</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportNeeded">Support Needed to Achieve Goals</Label>
        <Textarea
          id="supportNeeded"
          name="supportNeeded"
          value={formState.supportNeeded}
          onChange={handleChange}
          placeholder="What support do you need to achieve your career goals? (e.g., training, education, accommodations)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeframe">Timeframe for Employment</Label>
        <Select value={formState.timeframe} onValueChange={(value) => handleSelectChange("timeframe", value)}>
          <SelectTrigger id="timeframe">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate (Ready to work now)</SelectItem>
            <SelectItem value="1-3-months">1-3 months</SelectItem>
            <SelectItem value="3-6-months">3-6 months</SelectItem>
            <SelectItem value="6-12-months">6-12 months</SelectItem>
            <SelectItem value="more-than-12-months">More than 12 months</SelectItem>
            <SelectItem value="unsure">Unsure</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
})

GoalsForm.displayName = "GoalsForm"
