import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Brain, CheckCircle, Fingerprint, Globe, MessageSquare, Sparkles, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VuriDemoChat } from "@/components/vuri-demo-chat"

export const metadata: Metadata = {
  title: "VURI, AI Assistant | VR4DEAF: JOB",
  description:
    "Meet VURI, the AI assistant designed specifically for Deaf job seekers. VURI provides personalized guidance, ASL support, and career assistance throughout your vocational rehabilitation journey.",
  openGraph: {
    images: [
      {
        url: "/og-vuri.png",
        width: 1200,
        height: 630,
        alt: "VURI, AI Assistant for Deaf Job Seekers",
      },
    ],
  },
}

export default function VuriPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">VR4DEAF: JOB</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Services
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Resources
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
            <Link href="/auth/login" className="text-sm font-medium text-primary hover:underline">
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Sparkles className="mr-1 h-4 w-4" />
                  AI Assistant
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Meet VURI, Your Personal AI Assistant
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  VURI is an AI assistant designed specifically for Deaf job seekers, providing personalized guidance,
                  ASL support, and career assistance throughout your vocational rehabilitation journey.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Link href="/auth/register">
                      Try VURI Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="#capabilities">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border bg-white p-4 shadow-lg">
                <VuriDemoChat />
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">VURI's Capabilities</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Designed specifically for Deaf job seekers, VURI combines advanced AI with deep understanding of Deaf
                  culture and communication
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Video className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">ASL Understanding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    VURI understands ASL communication patterns and can process video inputs of sign language, making
                    interaction natural for Deaf users.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Brain className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Career Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Get personalized career advice, job recommendations, and guidance on skill development based on your
                    profile and goals.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">24/7 Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    VURI is available around the clock to answer questions, provide assistance, and offer support
                    whenever you need it.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Fingerprint className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Personalized Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    VURI learns from your interactions to provide increasingly personalized assistance tailored to your
                    specific needs and preferences.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Globe className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Resource Navigator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Discover Deaf-friendly employers, job opportunities, training resources, and community events with
                    VURI's comprehensive database.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    VURI helps you track your vocational rehabilitation progress, set goals, and celebrate achievements
                    along your career journey.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How VURI Helps You</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Resume Building</h3>
                      <p className="text-gray-500">
                        VURI provides feedback on your resume, suggests improvements, and helps you highlight your
                        strengths for specific job applications.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Interview Preparation</h3>
                      <p className="text-gray-500">
                        Practice interviews with VURI to build confidence, receive feedback, and learn strategies for
                        addressing common interview questions.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Job Search Assistance</h3>
                      <p className="text-gray-500">
                        VURI helps you find job opportunities that match your skills and preferences, with a focus on
                        Deaf-friendly employers and inclusive workplaces.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Skill Development</h3>
                      <p className="text-gray-500">
                        Identify skills to develop based on your career goals, with personalized learning resources and
                        training recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/vuri-assistance.png"
                  alt="VURI helping a Deaf job seeker with career guidance"
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium">
                      "VURI helped me prepare for interviews and find a job that values my skills and accommodates my
                      needs."
                    </p>
                    <p className="text-xs mt-2">— Sarah M., Software Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The Technology Behind VURI</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  VURI combines cutting-edge AI with specialized training for Deaf communication and career support
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>ASL Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    VURI uses advanced computer vision and machine learning to understand and interpret American Sign
                    Language, allowing for natural communication.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>PinkSync Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    VURI connects with PinkSync to ensure your data is synchronized across all devices and services,
                    providing a seamless experience.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>FibonRoseTrust Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Your conversations with VURI are protected by FibonRoseTrust security protocols, ensuring your
                    personal information remains private and secure.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Meet VURI?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your account today to start working with VURI, your personal AI assistant for vocational
                  rehabilitation
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white text-primary px-8 text-sm font-medium shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <Link href="/auth/register">Create Account</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link href="#capabilities">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-100">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">VR4DEAF: JOB</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm font-medium hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm text-gray-500">© 2025 VR4DEAF: JOB. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
