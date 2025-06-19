import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DeafAuthBanner } from "@/components/deaf-auth-banner"
import { FeatureCard } from "@/components/feature-card"
import { IntakeFormCard } from "@/components/intake-form-card"
import { EcosystemFooter } from "@/components/ecosystem-footer"

export const metadata: Metadata = {
  title: "VR4DEAF: JOB | Vocational Rehabilitation for Deaf Job Seekers",
  description:
    "VR4DEAF: JOB provides comprehensive vocational rehabilitation services designed specifically for Deaf job seekers, including job readiness assessment, resume building, and interview preparation.",
  openGraph: {
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "VR4DEAF: JOB - Empowering Deaf Job Seekers",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">VR4DEAF: JOB</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline">
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
        <DeafAuthBanner />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Vocational Rehabilitation for Deaf Job Seekers
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Empowering Deaf job seekers with career opportunities, job placement services, and vocational training
                  designed to meet your unique needs and goals.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Link href="#intake-form">
                      Start VR Intake
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/auth/register">Create Account</Link>
                  </Button>
                </div>
              </div>
              <img
                src="/deaf-job-seeker.png"
                alt="Deaf job seeker in an office setting"
                width="550"
                height="550"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive vocational rehabilitation services designed specifically for Deaf job seekers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon="clipboard-check"
                title="Job Readiness Assessment"
                description="Evaluate your skills, strengths, and areas for improvement with our specialized assessment tools."
                locked={true}
              />
              <FeatureCard
                icon="file-text"
                title="Resume Builder"
                description="Create professional, ATS-friendly resumes tailored to highlight your unique skills and experiences."
                locked={true}
              />
              <FeatureCard
                icon="users"
                title="Interview Preparation"
                description="Practice with mock interviews and receive feedback from experienced coaches who understand Deaf communication needs."
                locked={true}
              />
              <FeatureCard
                icon="calendar"
                title="Job Fair Calendar"
                description="Stay updated with upcoming job fairs featuring Deaf-friendly employers and interpreting services."
                locked={true}
              />
              <FeatureCard
                icon="bar-chart"
                title="Success Metrics"
                description="Track your progress and see how our services have helped other Deaf job seekers achieve their career goals."
                locked={true}
              />
              <FeatureCard
                icon="message-square"
                title="VURI, AI Assistant"
                description="Connect with our AI assistant trained in ASL communication patterns for immediate support and guidance."
                locked={true}
              />
            </div>
          </div>
        </section>

        <section id="intake-form" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">VR Intake Form</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with vocational rehabilitation services by completing our intake form
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">No account required</span>
                </div>
              </div>
            </div>
            <IntakeFormCard />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How DeafAuth Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our secure authentication system designed specifically for Deaf users
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sign up with DeafAuth to access our full suite of vocational rehabilitation tools and services.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth/register">Register Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>PinkSync Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our PinkSync technology ensures real-time data synchronization across all your devices and
                    applications.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/pinksync">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>FibonRoseTrust Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced security protocols designed to protect your data while maintaining accessibility for Deaf
                    users.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/security">Security Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Your Journey?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your account today to access all our vocational rehabilitation services
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
                  <Link href="#intake-form">Start with Intake Form</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EcosystemFooter />
    </div>
  )
}
