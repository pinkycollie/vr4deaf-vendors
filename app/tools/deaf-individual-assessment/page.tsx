import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Users, Brain, Calculator } from "lucide-react"
import Link from "next/link"

export default function DeafIndividualAssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/tools">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Tools
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Deaf Individual Assessment Tool</h1>
                <p className="text-lg text-gray-600 mt-1">
                  Comprehensive assessment for deaf individuals seeking vocational rehabilitation services
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Tier 1 Priority
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Overview */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Cultural Assessment</span>
              </CardTitle>
              <CardDescription>
                ASL proficiency, communication preferences, and cultural identity evaluation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-green-600" />
                <span>Aptitude Analysis</span>
              </CardTitle>
              <CardDescription>Vocational interests and skill level assessment for career planning</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                <span>Accommodation Planning</span>
              </CardTitle>
              <CardDescription>Workplace accommodation needs and cost-benefit analysis</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Assessment Tool Embed */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Complete Your Assessment</CardTitle>
                <CardDescription>
                  This comprehensive assessment will help us understand your unique needs, preferences, and goals for
                  vocational rehabilitation services.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://app.wrapifai.com/embed/cfd7bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open in New Tab</span>
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <iframe
                loading="lazy"
                id="wrapifai-iframe"
                src="https://app.wrapifai.com/embed/cfd7bd"
                width="100%"
                height="1640px"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-lg border"
                title="Deaf Individual Assessment Tool"
              />
            </div>
          </CardContent>
        </Card>

        {/* Assessment Information */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Cultural Communication Assessment</h4>
                  <p className="text-sm text-gray-600">
                    Evaluate your ASL proficiency, communication preferences, and cultural identity within the deaf
                    community.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Vocational Interest Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Discover your career interests and assess your current skill levels across various domains.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Accommodation Planning</h4>
                  <p className="text-sm text-gray-600">
                    Identify workplace accommodation needs and understand the implementation process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">All data is encrypted and securely stored</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">HIPAA compliant data handling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Results shared only with your consent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Video uploads are optional and secure</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Assessment Time:</strong> Approximately 15-20 minutes to complete all sections. You can save
                  your progress and return later if needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>After Your Assessment</CardTitle>
            <CardDescription>Once you complete the assessment, here's what happens next:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6" />
                </div>
                <h4 className="font-medium mb-2">AI Analysis</h4>
                <p className="text-sm text-gray-600">
                  Our AI system analyzes your responses to create a personalized profile and recommendations.
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-medium mb-2">Counselor Matching</h4>
                <p className="text-sm text-gray-600">
                  We'll match you with culturally competent VR counselors based on your preferences and needs.
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6" />
                </div>
                <h4 className="font-medium mb-2">Service Planning</h4>
                <p className="text-sm text-gray-600">
                  Receive a customized service plan with accommodation recommendations and next steps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WrapifAI Script */}
      <script src="https://app.wrapifai.com/embed/index.js" async />
    </div>
  )
}
