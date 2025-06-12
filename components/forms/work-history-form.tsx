"use client"

import type React from "react"
import { useState, forwardRef, useImperativeHandle } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface WorkHistoryFormProps {
  data: any
  updateData: (data: any) => void
}

interface JobEntry {
  id: string
  employer: string
  position: string
  startDate: string
  endDate: string
  reasonForLeaving: string
  duties: string
}

export const WorkHistoryForm = forwardRef<{ handleSubmit: () => void }, WorkHistoryFormProps>(
  ({ data, updateData }, ref) => {
    const [formState, setFormState] = useState({
      employmentStatus: data.employmentStatus || "unemployed",
      currentlyEmployed: data.currentlyEmployed || "no",
      lastEmploymentDate: data.lastEmploymentDate || "",
      unemploymentReason: data.unemploymentReason || "",
      workHistory: data.workHistory || [],
      workBarriers: data.workBarriers || "",
      preferredWorkSchedule: data.preferredWorkSchedule || [],
      preferredWorkEnvironment: data.preferredWorkEnvironment || "",
      salaryExpectations: data.salaryExpectations || "",
    })

    const [newJob, setNewJob] = useState<JobEntry>({
      id: "",
      employer: "",
      position: "",
      startDate: "",
      endDate: "",
      reasonForLeaving: "",
      duties: "",
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

    const handleNewJobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setNewJob((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddJob = () => {
      if (newJob.employer && newJob.position) {
        const jobWithId = { ...newJob, id: Date.now().toString() }
        setFormState((prev) => ({
          ...prev,
          workHistory: [...prev.workHistory, jobWithId],
        }))
        setNewJob({
          id: "",
          employer: "",
          position: "",
          startDate: "",
          endDate: "",
          reasonForLeaving: "",
          duties: "",
        })
      }
    }

    const handleRemoveJob = (id: string) => {
      setFormState((prev) => ({
        ...prev,
        workHistory: prev.workHistory.filter((job: JobEntry) => job.id !== id),
      }))
    }

    const handleWorkScheduleChange = (schedule: string) => {
      setFormState((prev) => {
        const currentSchedules = [...prev.preferredWorkSchedule]
        if (currentSchedules.includes(schedule)) {
          return { ...prev, preferredWorkSchedule: currentSchedules.filter((s) => s !== schedule) }
        } else {
          return { ...prev, preferredWorkSchedule: [...currentSchedules, schedule] }
        }
      })
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Work History & Employment Status</h2>
          <p className="text-muted-foreground mb-6">
            Please provide information about your work history and current employment status.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Current Employment Status</Label>
          <Select
            value={formState.employmentStatus}
            onValueChange={(value) => handleSelectChange("employmentStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select employment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed-full-time">Employed Full-Time</SelectItem>
              <SelectItem value="employed-part-time">Employed Part-Time</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="self-employed">Self-Employed</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="unable-to-work">Unable to Work Due to Disability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Are you currently employed?</Label>
          <RadioGroup
            value={formState.currentlyEmployed}
            onValueChange={(value) => handleSelectChange("currentlyEmployed", value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="employed-yes" />
              <Label htmlFor="employed-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="employed-no" />
              <Label htmlFor="employed-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formState.currentlyEmployed === "no" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="lastEmploymentDate">When were you last employed?</Label>
              <Input
                id="lastEmploymentDate"
                name="lastEmploymentDate"
                type="date"
                value={formState.lastEmploymentDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unemploymentReason">Reason for unemployment</Label>
              <Textarea
                id="unemploymentReason"
                name="unemploymentReason"
                value={formState.unemploymentReason}
                onChange={handleChange}
                placeholder="Please explain why you are currently unemployed"
              />
            </div>
          </>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Work History</h3>

          {formState.workHistory.length > 0 && (
            <div className="space-y-4">
              {formState.workHistory.map((job: JobEntry) => (
                <Card key={job.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveJob(job.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">{job.employer}</p>
                        <p className="text-sm text-muted-foreground">{job.position}</p>
                      </div>
                      <div className="text-sm">
                        <p>
                          {job.startDate} to {job.endDate || "Present"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{job.duties}</p>
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
                  <Label htmlFor="employer">Employer</Label>
                  <Input
                    id="employer"
                    name="employer"
                    value={newJob.employer}
                    onChange={handleNewJobChange}
                    placeholder="Company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    value={newJob.position}
                    onChange={handleNewJobChange}
                    placeholder="Job title"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={newJob.startDate}
                    onChange={handleNewJobChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (leave blank if current)</Label>
                  <Input id="endDate" name="endDate" type="date" value={newJob.endDate} onChange={handleNewJobChange} />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="reasonForLeaving">Reason for Leaving</Label>
                <Input
                  id="reasonForLeaving"
                  name="reasonForLeaving"
                  value={newJob.reasonForLeaving}
                  onChange={handleNewJobChange}
                  placeholder="Why did you leave this position?"
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="duties">Job Duties</Label>
                <Textarea
                  id="duties"
                  name="duties"
                  value={newJob.duties}
                  onChange={handleNewJobChange}
                  placeholder="Describe your responsibilities and duties"
                />
              </div>
              <Button type="button" onClick={handleAddJob} className="mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" /> Add Job
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workBarriers">Barriers to Employment</Label>
          <Textarea
            id="workBarriers"
            name="workBarriers"
            value={formState.workBarriers}
            onChange={handleChange}
            placeholder="Describe any barriers that have prevented you from finding or maintaining employment"
          />
        </div>

        <div className="space-y-4">
          <Label>Preferred Work Schedule (Select all that apply)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Full-time", "Part-time", "Flexible", "Remote", "Weekdays only", "Weekends available"].map((schedule) => (
              <div key={schedule} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`schedule-${schedule}`}
                  checked={formState.preferredWorkSchedule.includes(schedule)}
                  onChange={() => handleWorkScheduleChange(schedule)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor={`schedule-${schedule}`}>{schedule}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredWorkEnvironment">Preferred Work Environment</Label>
          <Textarea
            id="preferredWorkEnvironment"
            name="preferredWorkEnvironment"
            value={formState.preferredWorkEnvironment}
            onChange={handleChange}
            placeholder="Describe your ideal work environment (e.g., quiet office, active workplace, outdoors)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salaryExpectations">Salary Expectations</Label>
          <Input
            id="salaryExpectations"
            name="salaryExpectations"
            value={formState.salaryExpectations}
            onChange={handleChange}
            placeholder="What are your salary expectations?"
          />
        </div>
      </div>
    )
  },
)

WorkHistoryForm.displayName = "WorkHistoryForm"
