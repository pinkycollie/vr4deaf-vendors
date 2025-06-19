import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubscriptionPlans } from "@/components/subscription-plans"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subscription Plans | VR4DEAF: JOB",
  description:
    "Explore VR4DEAF: JOB subscription plans to unlock premium vocational rehabilitation features for Deaf job seekers.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SubscriptionPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <p className="text-gray-500 mt-2">Choose the plan that best fits your vocational rehabilitation needs</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Why Upgrade Your Plan?</CardTitle>
          <CardDescription>Unlock premium features to accelerate your job search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 rounded-lg border">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Advanced Assessment Tools</h3>
              <p className="text-sm text-gray-500 mt-2">
                Get detailed insights into your skills, strengths, and areas for improvement
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="2" x2="9" y2="4" />
                  <line x1="15" y1="2" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="22" />
                  <line x1="15" y1="20" x2="15" y2="22" />
                  <line x1="20" y1="9" x2="22" y2="9" />
                  <line x1="20" y1="14" x2="22" y2="14" />
                  <line x1="2" y1="9" x2="4" y2="9" />
                  <line x1="2" y1="14" x2="4" y2="14" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Premium Resume Builder</h3>
              <p className="text-sm text-gray-500 mt-2">
                Create professional, ATS-optimized resumes with expert guidance
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">VURI, AI Assistant</h3>
              <p className="text-sm text-gray-500 mt-2">
                Get personalized guidance and support from our AI assistant trained in ASL communication
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>VR Funding Options</CardTitle>
          <CardDescription>Your subscription may be covered by vocational rehabilitation funding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 bg-blue-50">
            <p className="text-sm text-blue-800">
              If you're currently receiving vocational rehabilitation services, your subscription costs may be covered
              by your VR funding. Speak with your VR counselor about including VR4DEAF: JOB services in your
              Individualized Plan for Employment (IPE).
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <Button asChild variant="outline">
              <Link href="/vr-funding-guide">Learn More About VR Funding</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <SubscriptionPlans />
    </div>
  )
}
