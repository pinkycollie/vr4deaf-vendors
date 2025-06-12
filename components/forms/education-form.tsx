"use client"

import type React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface EducationFormProps {
  data: any
  updateData: (data: any) => void
}

interface EducationEntry {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  completed: boolean
}

export const EducationForm = forwardRef<{ handleSubmit: () => void }, EducationFormProps>(
  ({ data, updateData }, ref) => {
    const [formState, setFormState] = useState({
      highestEducation: data.highestEducation || "",
      educationHistory: data.educationHistory || [],
      certifications: data.certifications || "",
      trainingPrograms: data.trainingPrograms || "",
      educationBarriers: data.educationBarriers || "",
      educationGoals: data.educationGoals || "",
      learningStyle: data.learningStyle || [],
    })

    const [newEducation, setNewEducation] = useState<EducationEntry>({
      id: "",
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      completed: false,
    })

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

    const handleNewEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setNewEducation((prev) => ({ ...prev, [name]: value }))
    }

    const handleNewEducationCheckboxChange = (name: string, checked: boolean) => {
      setNewEducation((prev) => ({ ...prev, [name]: checked }))
    }

    const handleAddEducation = () => {
      if (newEducation.institution && newEducation.degree) {
        const educationWithId = { ...newEducation, id: Date.now().toString() }
        setFormState((prev) => ({
          ...prev,
          educationHistory: [...prev.educationHistory, educationWithId],
        }))
        setNewEducation({
          id: "",
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          completed: false,
        })
      }
    }

    const handleRemoveEducation = (id: string) => {
      setFormState((prev) => ({
        ...prev,
        educationHistory: prev.educationHistory.filter((edu: EducationEntry) => edu.id !== id),
      }))
    }

    const handleLearningStyleChange = (style: string) => {
      setFormState((prev) => {
        const currentStyles = [...prev.learningStyle]
        if (currentStyles.includes(style)) {
          return { ...prev, learningStyle: currentStyles.filter((s) => s !== style) }
        } else {
          return { ...prev, learningStyle: [...currentStyles, style] }
        }
      })
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Education & Training</h2>
          <p className="text-muted-foreground mb-6">
            Please provide information about your educational background and training.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Highest Level of Education</Label>
          <Select
            value={formState.highestEducation}
            onValueChange={(value) => handleSelectChange("highestEducation", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select highest education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-than-high-school">Less than High School</SelectItem>
              <SelectItem value="high-school">High School Diploma or GED</SelectItem>
              <SelectItem value="some-college">Some College</SelectItem>
              <SelectItem value="associate">Associate's Degree</SelectItem>
              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
              <SelectItem value="master">Master's Degree</SelectItem>
              <SelectItem value="doctorate">Doctorate or Professional Degree</SelectItem>
              <SelectItem value="vocational">Vocational/Technical Training</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Education History</h3>

          {formState.educationHistory.length > 0 && (
            <div className="space-y-4">
              {formState.educationHistory.map((education: EducationEntry) => (
                <Card key={education.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveEducation(education.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{education.institution}</p>
                        <p className="text-sm text-muted-foreground">
                          {education.degree} in {education.field}
                        </p>
                      </div>
                      <div className="text-sm">
                        <p>
                          {education.startDate} to {education.endDate || "Present"}
                        </p>
                        <p>{education.completed ? "Completed" : "Not Completed"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    name="institution"
                    value={newEducation.institution}
                    onChange={handleNewEducationChange}
                    placeholder="School or institution name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree/Diploma</Label>
                  <Input
                    id="degree"
                    name="degree"
                    value={newEducation.degree}
                    onChange={handleNewEducationChange}
                    placeholder="Type of degree or diploma"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  name="field"
                  value={newEducation.field}
                  onChange={handleNewEducationChange}
                  placeholder="Major or concentration"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={newEducation.startDate}
                    onChange={handleNewEducationChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (leave blank if current)</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={newEducation.endDate}
                    onChange={handleNewEducationChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="completed"
                  checked={newEducation.completed}
                  onCheckedChange={(checked) => handleNewEducationCheckboxChange("completed", checked === true)}
                />
                <Label htmlFor="completed">Program Completed</Label>
              </div>
              <Button type="button" onClick={handleAddEducation} className="mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <Label htmlFor="certifications">Certifications</Label>
          <Textarea
            id="certifications"
            name="certifications"
            value={formState.certifications}
            onChange={handleChange}
            placeholder="List any professional certifications you have obtained"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="trainingPrograms">Training Programs</Label>
          <Textarea
            id="trainingPrograms"
            name="trainingPrograms"
            value={formState.trainingPrograms}
            onChange={handleChange}
            placeholder="List any training programs or workshops you have completed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="educationBarriers">Barriers to Education</Label>
          <Textarea
            id="educationBarriers"
            name="educationBarriers"
            value={formState.educationBarriers}
            onChange={handleChange}
            placeholder="Describe any barriers that have prevented you from completing your education"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="educationGoals">Education Goals</Label>
          <Textarea
            id="educationGoals"
            name="educationGoals"
            value={formState.educationGoals}
            onChange={handleChange}
            placeholder="Describe any educational goals you would like to achieve"
          />
        </div>

        <div className="space-y-4">
          <Label>Learning Style (Select all that apply)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Visual (learn by seeing)",
              "Auditory (learn by hearing)",
              "Reading/Writing",
              "Kinesthetic (learn by doing)",
              "Group learning",
              "Independent learning",
            ].map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`style-${style}`}
                  checked={formState.learningStyle.includes(style)}
                  onCheckedChange={() => handleLearningStyleChange(style)}
                />
                <Label htmlFor={`style-${style}`}>{style}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

EducationForm.displayName = "EducationForm"
