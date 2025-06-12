"use client"

import type React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface SkillsAssessmentFormProps {
  data: any
  updateData: (data: any) => void
}

export const SkillsAssessmentForm = forwardRef<{ handleSubmit: () => void }, SkillsAssessmentFormProps>(
  ({ data, updateData }, ref) => {
    const [formState, setFormState] = useState({
      technicalSkills: data.technicalSkills || "",
      softSkills: data.softSkills || [],
      computerSkills: data.computerSkills || "none",
      computerSkillsDescription: data.computerSkillsDescription || "",
      languageSkills: data.languageSkills || "",
      communicationSkillLevel: data.communicationSkillLevel || 3,
      problemSolvingSkillLevel: data.problemSolvingSkillLevel || 3,
      teamworkSkillLevel: data.teamworkSkillLevel || 3,
      timeManagementSkillLevel: data.timeManagementSkillLevel || 3,
      adaptabilitySkillLevel: data.adaptabilitySkillLevel || 3,
      strengthsDescription: data.strengthsDescription || "",
      areasForImprovement: data.areasForImprovement || "",
      hobbiesInterests: data.hobbiesInterests || "",
    })

    const softSkillsList = [
      "Communication",
      "Teamwork",
      "Problem-solving",
      "Time management",
      "Adaptability",
      "Leadership",
      "Conflict resolution",
      "Critical thinking",
      "Creativity",
      "Emotional intelligence",
      "Customer service",
      "Attention to detail",
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

    const handleSoftSkillChange = (skill: string) => {
      setFormState((prev) => {
        const currentSkills = [...prev.softSkills]
        if (currentSkills.includes(skill)) {
          return { ...prev, softSkills: currentSkills.filter((s) => s !== skill) }
        } else {
          return { ...prev, softSkills: [...currentSkills, skill] }
        }
      })
    }

    const handleSliderChange = (name: string, value: number[]) => {
      setFormState((prev) => ({ ...prev, [name]: value[0] }))
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Skills Assessment</h2>
          <p className="text-muted-foreground mb-6">
            Please provide information about your skills and abilities to help us understand your strengths.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="technicalSkills">Technical Skills</Label>
          <Textarea
            id="technicalSkills"
            name="technicalSkills"
            value={formState.technicalSkills}
            onChange={handleChange}
            placeholder="List any technical skills you possess (e.g., equipment operation, software proficiency, trade skills)"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-4">
          <Label>Soft Skills (Select all that apply)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {softSkillsList.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={formState.softSkills.includes(skill)}
                  onCheckedChange={() => handleSoftSkillChange(skill)}
                />
                <Label htmlFor={`skill-${skill}`}>{skill}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Computer Skills</Label>
          <RadioGroup
            value={formState.computerSkills}
            onValueChange={(value) => handleSelectChange("computerSkills", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="computer-none" />
              <Label htmlFor="computer-none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="basic" id="computer-basic" />
              <Label htmlFor="computer-basic">Basic (email, web browsing)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="computer-intermediate" />
              <Label htmlFor="computer-intermediate">Intermediate (word processing, spreadsheets)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="computer-advanced" />
              <Label htmlFor="computer-advanced">Advanced (specialized software, programming)</Label>
            </div>
          </RadioGroup>
        </div>

        {formState.computerSkills !== "none" && (
          <div className="space-y-2">
            <Label htmlFor="computerSkillsDescription">Please describe your computer skills</Label>
            <Textarea
              id="computerSkillsDescription"
              name="computerSkillsDescription"
              value={formState.computerSkillsDescription}
              onChange={handleChange}
              placeholder="Describe your experience with computers and software"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="languageSkills">Language Skills</Label>
          <Textarea
            id="languageSkills"
            name="languageSkills"
            value={formState.languageSkills}
            onChange={handleChange}
            placeholder="List languages you speak and your proficiency level"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">Rate Your Skills</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="communicationSkillLevel">Communication Skills</Label>
              <span className="text-sm">{formState.communicationSkillLevel}/5</span>
            </div>
            <Slider
              id="communicationSkillLevel"
              min={1}
              max={5}
              step={1}
              value={[formState.communicationSkillLevel]}
              onValueChange={(value) => handleSliderChange("communicationSkillLevel", value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="problemSolvingSkillLevel">Problem Solving Skills</Label>
              <span className="text-sm">{formState.problemSolvingSkillLevel}/5</span>
            </div>
            <Slider
              id="problemSolvingSkillLevel"
              min={1}
              max={5}
              step={1}
              value={[formState.problemSolvingSkillLevel]}
              onValueChange={(value) => handleSliderChange("problemSolvingSkillLevel", value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="teamworkSkillLevel">Teamwork Skills</Label>
              <span className="text-sm">{formState.teamworkSkillLevel}/5</span>
            </div>
            <Slider
              id="teamworkSkillLevel"
              min={1}
              max={5}
              step={1}
              value={[formState.teamworkSkillLevel]}
              onValueChange={(value) => handleSliderChange("teamworkSkillLevel", value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="timeManagementSkillLevel">Time Management Skills</Label>
              <span className="text-sm">{formState.timeManagementSkillLevel}/5</span>
            </div>
            <Slider
              id="timeManagementSkillLevel"
              min={1}
              max={5}
              step={1}
              value={[formState.timeManagementSkillLevel]}
              onValueChange={(value) => handleSliderChange("timeManagementSkillLevel", value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="adaptabilitySkillLevel">Adaptability Skills</Label>
              <span className="text-sm">{formState.adaptabilitySkillLevel}/5</span>
            </div>
            <Slider
              id="adaptabilitySkillLevel"
              min={1}
              max={5}
              step={1}
              value={[formState.adaptabilitySkillLevel]}
              onValueChange={(value) => handleSliderChange("adaptabilitySkillLevel", value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="strengthsDescription">Personal Strengths</Label>
          <Textarea
            id="strengthsDescription"
            name="strengthsDescription"
            value={formState.strengthsDescription}
            onChange={handleChange}
            placeholder="Describe your personal strengths and positive attributes"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
          <Textarea
            id="areasForImprovement"
            name="areasForImprovement"
            value={formState.areasForImprovement}
            onChange={handleChange}
            placeholder="Describe areas where you would like to improve or develop skills"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hobbiesInterests">Hobbies & Interests</Label>
          <Textarea
            id="hobbiesInterests"
            name="hobbiesInterests"
            value={formState.hobbiesInterests}
            onChange={handleChange}
            placeholder="Describe your hobbies and interests outside of work"
          />
        </div>
      </div>
    )
  },
)

SkillsAssessmentForm.displayName = "SkillsAssessmentForm"
