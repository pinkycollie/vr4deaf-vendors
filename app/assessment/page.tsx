import { VocRehabAssessment } from "@/components/voc-rehab-assessment"
import { Suspense } from "react"
import { AssessmentLoading } from "@/components/assessment-loading"

export default function AssessmentPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Vocational Rehabilitation Assessment</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete this comprehensive assessment to determine your readiness for vocational rehabilitation services.
          This assessment is designed specifically for the deaf community and takes into account cultural and
          communication considerations.
        </p>
      </div>

      <Suspense fallback={<AssessmentLoading />}>
        <VocRehabAssessment />
      </Suspense>
    </div>
  )
}
