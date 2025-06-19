"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Calendar, ClipboardCheck, FileText, LogOut, MessageSquare, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VRProgressTracker } from "@/components/vr-progress-tracker"
import { SubscriptionPlans } from "@/components/subscription-plans"

export default function DashboardClientPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">VR4DEAF: JOB</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/messages">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-500">john.doe@example.com</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <nav className="h-full py-6 pl-2 pr-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Overview
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/assessment" className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4" />
                  Job Readiness
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/resume" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Resume Builder
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/interview" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Interview Prep
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Job Fairs
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/metrics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Success Metrics
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Sara Assistant
                </Link>
              </Button>
              <div className="pt-4 pb-2">
                <div className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Account</div>
              </div>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/subscription" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Subscription
                </Link>
              </Button>
            </div>
          </nav>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/subscription">Upgrade Plan</Link>
            </Button>
          </div>
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">VR Progress</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45%</div>
                    <p className="text-xs text-muted-foreground">Complete your profile to unlock more features</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 w-[45%] rounded-full bg-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Job fairs and workshops in your area</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Potential job matches based on your profile</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Current VR Status: Assessment</CardTitle>
                  <CardDescription>
                    You are in the assessment phase of your vocational rehabilitation journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Complete Job Readiness Assessment</h3>
                        <p className="text-sm text-gray-500">Evaluate your skills and identify areas for improvement</p>
                      </div>
                      <Button size="sm" className="ml-auto">
                        Start
                      </Button>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Build Your Resume</h3>
                        <p className="text-sm text-gray-500">Create a professional resume highlighting your skills</p>
                      </div>
                      <Button size="sm" className="ml-auto">
                        Start
                      </Button>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Practice Interview Skills</h3>
                        <p className="text-sm text-gray-500">Prepare for interviews with our interactive tools</p>
                      </div>
                      <Button size="sm" className="ml-auto">
                        Start
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Status: Basic</CardTitle>
                  <CardDescription>Upgrade your plan to access premium features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Current plan limitations:</p>
                      <ul className="mt-2 list-disc pl-5 text-sm text-gray-500">
                        <li>Basic assessment tools only</li>
                        <li>Limited resume templates</li>
                        <li>No interview preparation tools</li>
                      </ul>
                    </div>
                    <Button asChild>
                      <Link href="/dashboard/subscription">Upgrade Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="progress" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Vocational Rehabilitation Progress</CardTitle>
                  <CardDescription>Track your journey through the VR process</CardDescription>
                </CardHeader>
                <CardContent>
                  <VRProgressTracker currentStep="assessment" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="subscription" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                  <CardDescription>Choose the plan that best fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <SubscriptionPlans />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recommendations" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>Tailored suggestions based on your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Complete your profile to receive personalized recommendations.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
