"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { MedicalStatusForm } from "@/components/forms/medical-status-form"
import { WorkHistoryForm } from "@/components/forms/work-history-form"
import { EducationForm } from "@/components/forms/education-form"
import { SkillsAssessmentForm } from "@/components/forms/skills-assessment-form"
import { GoalsForm } from "@/components/forms/goals-form"
import { ReadinessIndicatorsForm } from "@/components/forms/readiness-indicators-form"
import { AssessmentSummary } from "@/components/assessment-summary"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"

const TOTAL_STEPS = 7

export function VocRehabAssessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    medicalStatus: {},
    workHistory: {},
    education: {},
    skillsAssessment: {},
    goals: {},
    readinessIndicators: {},
  })
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Add refs for each form component
  const personalInfoRef = useRef<{ handleSubmit: () => void } | null>(null)
  const medicalStatusRef = useRef<{ handleSubmit: () => void } | null>(null)
  const workHistoryRef = useRef<{ handleSubmit: () => void } | null>(null)
  const educationRef = useRef<{ handleSubmit: () => void } | null>(null)
  const skillsAssessmentRef = useRef<{ handleSubmit: () => void } | null>(null)
  const goalsRef = useRef<{ handleSubmit: () => void } | null>(null)
  const readinessIndicatorsRef = useRef<{ handleSubmit: () => void } | null>(null)

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep])
    }
  }

  const handleNext = () => {
    // Save the current form data before moving to the next step
    if (currentStep === 1 && personalInfoRef.current) {
      personalInfoRef.current.handleSubmit()
    } else if (currentStep === 2 && medicalStatusRef.current) {
      medicalStatusRef.current.handleSubmit()
    } else if (currentStep === 3 && workHistoryRef.current) {
      workHistoryRef.current.handleSubmit()
    } else if (currentStep === 4 && educationRef.current) {
      educationRef.current.handleSubmit()
    } else if (currentStep === 5 && skillsAssessmentRef.current) {
      skillsAssessmentRef.current.handleSubmit()
    } else if (currentStep === 6 && goalsRef.current) {
      goalsRef.current.handleSubmit()
    } else if (currentStep === 7 && readinessIndicatorsRef.current) {
      readinessIndicatorsRef.current.handleSubmit()
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleGoToStep = (step: number) => {
    // Save the current form data before changing steps
    if (currentStep === 1 && personalInfoRef.current) {
      personalInfoRef.current.handleSubmit()
    } else if (currentStep === 2 && medicalStatusRef.current) {
      medicalStatusRef.current.handleSubmit()
    } else if (currentStep === 3 && workHistoryRef.current) {
      workHistoryRef.current.handleSubmit()
    } else if (currentStep === 4 && educationRef.current) {
      educationRef.current.handleSubmit()
    } else if (currentStep === 5 && skillsAssessmentRef.current) {
      skillsAssessmentRef.current.handleSubmit()
    } else if (currentStep === 6 && goalsRef.current) {
      goalsRef.current.handleSubmit()
    } else if (currentStep === 7 && readinessIndicatorsRef.current) {
      readinessIndicatorsRef.current.handleSubmit()
    }

    setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  const progressPercentage = (completedSteps.length / TOTAL_STEPS) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <Button
                key={index}
                variant={currentStep === index + 1 ? "default" : "outline"}
                size="sm"
                className="relative"
                onClick={() => handleGoToStep(index + 1)}
              >
                {index + 1}
                {completedSteps.includes(index + 1) && (
                  <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <PersonalInfoForm
              data={formData.personalInfo}
              updateData={(data) => updateFormData("personalInfo", data)}
              ref={personalInfoRef}
            />
          )}
          {currentStep === 2 && (
            <MedicalStatusForm
              data={formData.medicalStatus}
              updateData={(data) => updateFormData("medicalStatus", data)}
              ref={medicalStatusRef}
            />
          )}
          {currentStep === 3 && (
            <WorkHistoryForm
              data={formData.workHistory}
              updateData={(data) => updateFormData("workHistory", data)}
              ref={workHistoryRef}
            />
          )}
          {currentStep === 4 && (
            <EducationForm
              data={formData.education}
              updateData={(data) => updateFormData("education", data)}
              ref={educationRef}
            />
          )}
          {currentStep === 5 && (
            <SkillsAssessmentForm
              data={formData.skillsAssessment}
              updateData={(data) => updateFormData("skillsAssessment", data)}
              ref={skillsAssessmentRef}
            />
          )}
          {currentStep === 6 && (
            <GoalsForm data={formData.goals} updateData={(data) => updateFormData("goals", data)} ref={goalsRef} />
          )}
          {currentStep === 7 && (
            <ReadinessIndicatorsForm
              data={formData.readinessIndicators}
              updateData={(data) => updateFormData("readinessIndicators", data)}
              ref={readinessIndicatorsRef}
            />
          )}
          {currentStep === 8 && <AssessmentSummary formData={formData} />}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === TOTAL_STEPS && !completedSteps.includes(TOTAL_STEPS)}
            >
              {currentStep < TOTAL_STEPS ? "Next" : "Complete Assessment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
