import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SubscriptionPlans() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
          <CardDescription>Essential tools for your job search</CardDescription>
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-bold tracking-tight">$0</span>
            <span className="ml-1 text-xl font-semibold">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">VR Intake Form</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Basic Job Readiness Assessment</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Simple Resume Templates</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Job Fair Calendar (View Only)</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">Current Plan</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col border-primary">
        <CardHeader>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary w-fit">
            MOST POPULAR
          </div>
          <CardTitle className="mt-4">Professional</CardTitle>
          <CardDescription>Advanced tools for serious job seekers</CardDescription>
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-bold tracking-tight">$19.99</span>
            <span className="ml-1 text-xl font-semibold">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Everything in Basic</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Advanced Job Readiness Assessment</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Premium Resume Builder with ATS Optimization</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Interview Preparation with Feedback</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Job Fair Registration & Reminders</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Basic Sara Digital Assistant Access</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/subscription/professional">Upgrade Now</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Premium</CardTitle>
          <CardDescription>Complete career development suite</CardDescription>
          <div className="mt-4 flex items-baseline text-gray-900">
            <span className="text-3xl font-bold tracking-tight">$39.99</span>
            <span className="ml-1 text-xl font-semibold">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Everything in Professional</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Comprehensive Career Assessment</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">1-on-1 Virtual Coaching Sessions</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Priority Job Matching</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Unlimited Sara Digital Assistant Access</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">Employer Introduction Service</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/subscription/premium">Upgrade Now</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
