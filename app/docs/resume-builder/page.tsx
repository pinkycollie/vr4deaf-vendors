import type { Metadata } from "next"
import AIResumeBuilder from "@/components/ai-resume-builder"

export const metadata: Metadata = {
  title: "AI Resume Builder | VR4DEAF",
  description:
    "Create professional, ATS-optimized resumes with AI assistance designed for deaf job seekers and VR funding requirements.",
}

export default function ResumeBuilderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">AI Resume Builder</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create professional, ATS-optimized resumes with AI assistance designed specifically for deaf job seekers and
            VR funding requirements. Our AI analyzes your skills and experience to craft compelling resumes that
            highlight your strengths.
          </p>
        </div>

        <AIResumeBuilder />
      </div>
    </div>
  )
}
