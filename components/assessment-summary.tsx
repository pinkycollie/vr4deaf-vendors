"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, Printer } from "lucide-react"
import { useRef } from "react"

interface AssessmentSummaryProps {
  formData: any
}

export function AssessmentSummary({ formData }: AssessmentSummaryProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = `
        <html>
          <head>
            <title>Vocational Rehabilitation Assessment Summary</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1, h2, h3 { margin-top: 20px; }
              .section { margin-bottom: 20px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `

      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }

  const handleDownload = () => {
    if (printRef.current) {
      const jsonData = JSON.stringify(formData, null, 2)
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "vocational-rehabilitation-assessment.json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Calculate readiness score based on form data
  const calculateReadinessScore = () => {
    let score = 0
    let maxScore = 0

    // Ready to work
    if (formData.readinessIndicators.readyToWork === "yes") score += 10
    maxScore += 10

    // Transportation
    if (formData.readinessIndicators.transportationStatus === "reliable") score += 10
    maxScore += 10

    // Housing
    if (formData.readinessIndicators.housingStability === "stable") score += 10
    maxScore += 10

    // Financial
    if (formData.readinessIndicators.financialStability === "stable") score += 10
    maxScore += 10

    // Legal issues
    if (formData.readinessIndicators.legalIssues === "no") score += 10
    maxScore += 10

    // Substance use
    if (formData.readinessIndicators.substanceUseIssues === "no") score += 10
    maxScore += 10

    // Support system
    if (
      formData.readinessIndicators.supportSystem &&
      formData.readinessIndicators.supportSystem.length > 0 &&
      !formData.readinessIndicators.supportSystem.includes("None")
    )
      score += 10
    maxScore += 10

    // Motivation
    if (formData.goals.motivationLevel === "very-high" || formData.goals.motivationLevel === "high") score += 10
    maxScore += 10

    // Medical stability
    if (formData.medicalStatus.medicalStability === "stable" || formData.medicalStatus.medicalStability === "improving")
      score += 10
    maxScore += 10

    // Skills
    if (formData.skillsAssessment.softSkills && formData.skillsAssessment.softSkills.length > 3) score += 10
    maxScore += 10

    return {
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
    }
  }

  const readinessScore = calculateReadinessScore()

  const getReadinessCategory = () => {
    const percentage = readinessScore.percentage

    if (percentage >= 80) {
      return {
        category: "High Readiness",
        description:
          "You appear ready for vocational rehabilitation services. You have few barriers to employment and demonstrate strong motivation and support systems.",
        recommendations: [
          "Proceed with vocational rehabilitation services",
          "Focus on job search and placement activities",
          "Develop a career plan with specific goals and timelines",
          "Consider job training or education to enhance skills if needed",
        ],
      }
    } else if (percentage >= 60) {
      return {
        category: "Moderate Readiness",
        description:
          "You may be ready for vocational rehabilitation with some additional support. You have some barriers that should be addressed while participating in services.",
        recommendations: [
          "Begin vocational rehabilitation services while addressing identified barriers",
          "Connect with support services to address specific needs",
          "Consider part-time employment or training while building stability",
          "Develop strategies to manage disability-related challenges in the workplace",
        ],
      }
    } else if (percentage >= 40) {
      return {
        category: "Limited Readiness",
        description:
          "You have several barriers that may need to be addressed before full participation in vocational rehabilitation.",
        recommendations: [
          "Focus on addressing critical barriers before pursuing employment",
          "Connect with community resources for support with identified needs",
          "Consider pre-vocational activities to build work readiness",
          "Reassess readiness in 3-6 months after addressing key barriers",
        ],
      }
    } else {
      return {
        category: "Not Currently Ready",
        description:
          "You have significant barriers that need to be addressed before vocational rehabilitation is likely to be successful.",
        recommendations: [
          "Focus on stabilizing critical life areas (housing, health, etc.)",
          "Connect with case management services for comprehensive support",
          "Address medical/mental health needs as a priority",
          "Consider volunteer work or other activities to build structure and skills",
          "Reassess readiness in 6-12 months",
        ],
      }
    }
  }

  const readinessCategory = getReadinessCategory()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Assessment Summary</h2>
        <p className="text-muted-foreground mb-6">Review your vocational rehabilitation assessment summary below.</p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" /> Print
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Readiness Score</CardTitle>
          <CardDescription>Based on your assessment responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{readinessScore.percentage}%</div>
                <div className="text-sm text-muted-foreground">Readiness</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xl font-medium">{readinessCategory.category}</p>
            <p className="mt-2">{readinessCategory.description}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Next steps based on your assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {readinessCategory.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div ref={printRef} className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Vocational Rehabilitation Assessment Summary</h1>
          <p className="text-muted-foreground">
            {formData.personalInfo.firstName} {formData.personalInfo.lastName} | {new Date().toLocaleDateString()}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Name:</p>
              <p>
                {formData.personalInfo.firstName} {formData.personalInfo.lastName}
              </p>
            </div>
            <div>
              <p className="font-medium">Contact:</p>
              <p>
                {formData.personalInfo.phone} | {formData.personalInfo.email}
              </p>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p>
                {formData.personalInfo.address}, {formData.personalInfo.city}, {formData.personalInfo.state}{" "}
                {formData.personalInfo.zipCode}
              </p>
            </div>
            <div>
              <p className="font-medium">Preferred Contact Method:</p>
              <p>{formData.personalInfo.preferredContact || "Not specified"}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Disability & Medical Status</h2>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div>
              <p className="font-medium">Type of Disability:</p>
              <p>{formData.medicalStatus.disabilityType?.join(", ") || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Description:</p>
              <p>{formData.medicalStatus.disabilityDescription || "Not provided"}</p>
            </div>
            <div>
              <p className="font-medium">Medical Stability:</p>
              <p>{formData.medicalStatus.medicalStability || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Accommodations Needed:</p>
              <p>{formData.medicalStatus.accommodationsNeeded || "None specified"}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Work History</h2>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div>
              <p className="font-medium">Employment Status:</p>
              <p>{formData.workHistory.employmentStatus || "Not specified"}</p>
            </div>
            {formData.workHistory.workHistory && formData.workHistory.workHistory.length > 0 ? (
              <div>
                <p className="font-medium">Recent Employment:</p>
                <ul className="list-disc pl-5">
                  {formData.workHistory.workHistory.slice(0, 3).map((job: any, index: number) => (
                    <li key={index}>
                      {job.employer} - {job.position} ({job.startDate} to {job.endDate || "Present"})
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No work history provided</p>
            )}
            <div>
              <p className="font-medium">Barriers to Employment:</p>
              <p>{formData.workHistory.workBarriers || "None specified"}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Education & Training</h2>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div>
              <p className="font-medium">Highest Level of Education:</p>
              <p>{formData.education.highestEducation || "Not specified"}</p>
            </div>
            {formData.education.educationHistory && formData.education.educationHistory.length > 0 ? (
              <div>
                <p className="font-medium">Education History:</p>
                <ul className="list-disc pl-5">
                  {formData.education.educationHistory.map((edu: any, index: number) => (
                    <li key={index}>
                      {edu.institution} - {edu.degree} in {edu.field} ({edu.completed ? "Completed" : "Not Completed"})
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No education history provided</p>
            )}
            <div>
              <p className="font-medium">Certifications & Training:</p>
              <p>{formData.education.certifications || "None specified"}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Skills Assessment</h2>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div>
              <p className="font-medium">Technical Skills:</p>
              <p>{formData.skillsAssessment.technicalSkills || "None specified"}</p>
            </div>
            <div>
              <p className="font-medium">Soft Skills:</p>
              <p>{formData.skillsAssessment.softSkills?.join(", ") || "None specified"}</p>
            </div>
            <div>
              <p className="font-medium">Computer Skills:</p>
              <p>{formData.skillsAssessment.computerSkills || "None specified"}</p>
            </div>
            <div>
              <p className="font-medium">Strengths:</p>
              <p>{formData.skillsAssessment.strengthsDescription || "None specified"}</p>
            </div>
            <div>
              <p className="font-medium">Areas for Improvement:</p>
              <p>{formData.skillsAssessment.areasForImprovement || "None specified"}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Career Goals</h2>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div>
              <p className="font-medium">Overall Career Goals:</p>
              <p>{formData.goals.careerGoals || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Desired Industry:</p>
              <p>{formData.goals.desiredIndustry?.join(", ") || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Desired Occupation:</p>
              <p>{formData.goals.desiredOccupation || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Timeframe for Employment:</p>
              <p>{formData.goals.timeframe || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Motivation Level:</p>
              <p>{formData.goals.motivationLevel || "Not specified"}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Readiness Indicators</h2>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div>
              <p className="font-medium">Ready to Work:</p>
              <p>{formData.readinessIndicators.readyToWork || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Transportation Status:</p>
              <p>{formData.readinessIndicators.transportationStatus || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Housing Stability:</p>
              <p>{formData.readinessIndicators.housingStability || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Financial Stability:</p>
              <p>{formData.readinessIndicators.financialStability || "Not specified"}</p>
            </div>
            <div>
              <p className="font-medium">Support System:</p>
              <p>{formData.readinessIndicators.supportSystem?.join(", ") || "None specified"}</p>
            </div>
            <div>
              <p className="font-medium">Barriers to Employment:</p>
              <p>{formData.readinessIndicators.barriersToEmployment?.join(", ") || "None specified"}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Readiness Assessment</h2>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div>
              <p className="font-medium">Readiness Score:</p>
              <p>
                {readinessScore.percentage}% ({readinessScore.score}/{readinessScore.maxScore})
              </p>
            </div>
            <div>
              <p className="font-medium">Readiness Category:</p>
              <p>{readinessCategory.category}</p>
            </div>
            <div>
              <p className="font-medium">Assessment:</p>
              <p>{readinessCategory.description}</p>
            </div>
            <div>
              <p className="font-medium">Recommendations:</p>
              <ul className="list-disc pl-5">
                {readinessCategory.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
