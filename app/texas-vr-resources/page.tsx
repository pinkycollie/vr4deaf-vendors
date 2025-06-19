import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Building,
  CheckCircle,
  ExternalLink,
  FileText,
  Handshake,
  HelpCircle,
  MapPin,
  School,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Texas VR Resources | VR4DEAF: JOB",
  description:
    "Access free vocational rehabilitation programs in Texas through the Texas Workforce Commission and Workforce Solutions for Tarrant County. Find resources, support services, and guidance for Deaf job seekers.",
}

export default function TexasVRResourcesPage() {
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
                  <MapPin className="mr-1 h-4 w-4" />
                  Texas Resources
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Texas Vocational Rehabilitation Resources
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access free vocational rehabilitation programs offered through the Texas Workforce Commission and
                  Workforce Solutions for Tarrant County to help you prepare for, find, and retain employment.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    <a
                      href="https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-services"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start My VR
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="#get-started">How to Get Started</Link>
                  </Button>
                </div>
              </div>
              <img
                src="/texas-workforce-commission.png"
                alt="Texas Workforce Commission building"
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Available Programs</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the various vocational rehabilitation programs and resources available to Deaf job seekers in
                  Texas
                </p>
              </div>
            </div>

            <Tabs defaultValue="twc" className="w-full mt-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="twc">TWC VR Programs</TabsTrigger>
                <TabsTrigger value="workforce">Workforce Solutions</TabsTrigger>
                <TabsTrigger value="programs">Special Programs</TabsTrigger>
                <TabsTrigger value="resources">Additional Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="twc" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Texas Workforce Commission's VR Program</CardTitle>
                    <CardDescription>
                      Comprehensive services to help individuals with disabilities overcome employment barriers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        The Texas Workforce Commission's Vocational Rehabilitation (VR) program provides services to
                        help people with disabilities prepare for, find, and keep jobs. Services are individualized and
                        may include:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Vocational counseling and guidance</li>
                        <li>Referrals for medical evaluations</li>
                        <li>Assistance with assistive devices and technology</li>
                        <li>Job search support and placement assistance</li>
                        <li>Training and education support</li>
                        <li>Interpreter services for Deaf individuals</li>
                        <li>On-the-job training opportunities</li>
                        <li>Post-employment services</li>
                      </ul>
                      <div className="rounded-lg border p-4 bg-blue-50 mt-4">
                        <p className="text-sm text-blue-800">
                          VR services are provided at no cost to eligible individuals with disabilities who require
                          assistance to prepare for, obtain, retain, or advance in employment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-services"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Visit TWC VR Services
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Start My VR</CardTitle>
                    <CardDescription>Online self-referral form for Texans with disabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Start My VR is an online self-referral form that allows Texans with disabilities to initiate their
                      vocational rehabilitation journey. This convenient tool helps you connect with VR services without
                      having to visit an office in person.
                    </p>
                    <div className="rounded-lg border p-4 bg-green-50 mt-4">
                      <p className="text-sm text-green-800">
                        After completing the online form, a VR counselor will contact you within 5 business days to
                        discuss your needs and eligibility for services.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-services#startMyVr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Complete Start My VR Form
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="workforce" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Workforce Solutions for Tarrant County</CardTitle>
                    <CardDescription>
                      Local workforce development board offering specialized programs and services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        Workforce Solutions for Tarrant County offers specialized programs and services, including VR
                        services, to help job seekers in Tarrant County. Their services include:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Career counseling and planning</li>
                        <li>Job search assistance and matching</li>
                        <li>Resume writing and interview preparation</li>
                        <li>Skills assessment and training opportunities</li>
                        <li>Specialized services for individuals with disabilities</li>
                        <li>Access to computers, internet, and other job search tools</li>
                        <li>Information about local labor market and in-demand occupations</li>
                      </ul>
                      <div className="rounded-lg border p-4 bg-blue-50 mt-4">
                        <p className="text-sm text-blue-800">
                          Workforce Solutions for Tarrant County has multiple career centers throughout the county where
                          you can access services in person.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://workforcesolutions.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Visit Workforce Solutions
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Texas Workforce Commission (TWC)</CardTitle>
                    <CardDescription>
                      State agency providing workforce development services to employers and job seekers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      The Texas Workforce Commission provides resources for individuals with disabilities, including
                      online tools and career development services. TWC oversees a network of workforce solutions
                      offices throughout the state and administers unemployment benefits, job training programs, and
                      employment services.
                    </p>
                    <div className="rounded-lg border p-4 bg-green-50 mt-4">
                      <p className="text-sm text-green-800">
                        TWC's WorkInTexas.com is a comprehensive online job search resource and matching system
                        developed and maintained by the Texas Workforce Commission.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://www.twc.texas.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Explore TWC Resources
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="programs" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Summer Earn & Learn (SEAL)</CardTitle>
                    <CardDescription>Work-based learning opportunity for students with disabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        The Summer Earn & Learn (SEAL) program helps students with disabilities gain paid work
                        experience and prepare for future employment. This program combines work readiness training with
                        paid work experience to help students develop workplace skills.
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Available to students with disabilities ages 14-22</li>
                        <li>Provides paid work experience during the summer</li>
                        <li>Includes work readiness training</li>
                        <li>Helps develop workplace skills and build resume</li>
                        <li>Connects students with local employers</li>
                      </ul>
                      <div className="rounded-lg border p-4 bg-blue-50 mt-4">
                        <p className="text-sm text-blue-800">
                          SEAL is a partnership between TWC, Workforce Development Boards, and VR services to provide
                          work-based learning for students with disabilities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-youth-students#summerEarnAndLearn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Learn About SEAL
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Workforce Innovation and Opportunity Act (WIOA)</CardTitle>
                    <CardDescription>
                      Federal program providing training, education, and support services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      The Workforce Innovation and Opportunity Act (WIOA) is a federal program that provides training,
                      education, and support services to job seekers, including those with disabilities. WIOA helps job
                      seekers access employment, education, training, and support services to succeed in the labor
                      market.
                    </p>
                    <div className="rounded-lg border p-4 bg-green-50 mt-4">
                      <p className="text-sm text-green-800">
                        WIOA programs are delivered through the American Job Center network, known as Workforce
                        Solutions offices in Texas.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://www.twc.texas.gov/partners/workforce-innovation-opportunity-act-wioa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Explore WIOA Programs
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ticket to Work</CardTitle>
                    <CardDescription>
                      Social Security program for individuals receiving disability benefits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Ticket to Work is a Social Security program that allows individuals receiving disability benefits
                      to receive free training while maintaining their benefits. This program helps people with
                      disabilities progress toward financial independence through work.
                    </p>
                    <div className="rounded-lg border p-4 bg-yellow-50 mt-4">
                      <p className="text-sm text-yellow-800">
                        While using your Ticket to Work, you can maintain your benefits while you explore employment,
                        receive training, and gain work experience.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://choosework.ssa.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Learn About Ticket to Work
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Veteran Readiness and Employment (VR&E)</CardTitle>
                    <CardDescription>Program for veterans with service-connected disabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Veteran Readiness and Employment (VR&E), also known as Chapter 31, assists veterans with
                      service-connected disabilities in finding employment, training, and other resources. This program
                      helps veterans prepare for, find, and maintain suitable employment.
                    </p>
                    <div className="rounded-lg border p-4 bg-blue-50 mt-4">
                      <p className="text-sm text-blue-800">
                        VR&E offers individualized support to help veterans with service-connected disabilities overcome
                        barriers to employment.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://www.va.gov/careers-employment/vocational-rehabilitation/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Explore VR&E Services
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Centers for Independent Living (CILs)</CardTitle>
                    <CardDescription>
                      Community-based organizations providing services to people with disabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        Centers for Independent Living (CILs) offer job coaching, training, and disability-related
                        information to help individuals maintain independence in the workforce. These community-based
                        organizations provide services to people with all types of disabilities.
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Independent living skills training</li>
                        <li>Information and referral services</li>
                        <li>Peer counseling and mentoring</li>
                        <li>Individual and systems advocacy</li>
                        <li>Transition services</li>
                      </ul>
                      <div className="rounded-lg border p-4 bg-blue-50 mt-4">
                        <p className="text-sm text-blue-800">
                          There are multiple Centers for Independent Living throughout Texas that provide services to
                          help people with disabilities live independently in their communities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://www.ilru.org/projects/cil-net/cil-center-and-association-directory-results/TX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Find a CIL Near You
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Job Accommodation Network (JAN)</CardTitle>
                    <CardDescription>
                      Free guidance on workplace accommodations and disability employment issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      The Job Accommodation Network (JAN) provides free guidance on workplace accommodations and
                      employment issues for individuals with disabilities. JAN helps people with disabilities enhance
                      their employability and shows employers how to capitalize on the value and talent that people with
                      disabilities add to the workplace.
                    </p>
                    <div className="rounded-lg border p-4 bg-green-50 mt-4">
                      <p className="text-sm text-green-800">
                        JAN's consultants offer one-on-one guidance on workplace accommodations, the Americans with
                        Disabilities Act (ADA) and related legislation, and self-employment and entrepreneurship options
                        for people with disabilities.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <a
                        href="https://askjan.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Visit JAN Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How to Get Started</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow these steps to access vocational rehabilitation services in Texas
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Online Referrals</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-500">
                    Complete the online self-referral form through Start My VR or visit the Workforce Solutions for
                    Tarrant County website to begin the process.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href="https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-services#startMyVr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Online Referral
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Contact VR Offices</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-500">
                    Find your nearest VR office through the TWC's VR Office Lookup page and contact them directly for
                    assistance.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.twc.texas.gov/find-locations" target="_blank" rel="noopener noreferrer">
                      Find VR Office
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Workforce Solutions</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-500">
                    Visit a local Workforce Solutions career office for VR services and other employment assistance
                    programs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://workforcesolutions.net/locations/" target="_blank" rel="noopener noreferrer">
                      Find Career Office
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <Handshake className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Contact VR Counselor</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-500">
                    Reach out to your VR counselor directly by phone, email, or in person to discuss your needs and
                    eligibility for services.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="tel:8006287795">Call 800-628-7795</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  CBTAC Certified
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Created by PINKY COLLIE</h2>
                <p className="text-gray-500">
                  VR4DEAF: JOB is proud to be CBTAC certified and was created by PINKY COLLIE to provide comprehensive
                  vocational rehabilitation services specifically designed for Deaf job seekers.
                </p>
                <p className="text-gray-500">
                  Our platform integrates with the Texas Workforce Commission's VR programs and Workforce Solutions for
                  Tarrant County to ensure Deaf individuals have access to the resources they need for successful
                  employment.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <a
                      href="https://pinky.mbtq.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Visit PINKY.MBTQ.DEV
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border bg-white p-6 shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <HelpCircle className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Need Assistance?</h3>
                  <p className="text-gray-500">
                    Our team is here to help you navigate the vocational rehabilitation process and connect you with the
                    resources you need.
                  </p>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <Button asChild variant="outline">
                      <a href="mailto:support@vr4deaf.com">Email Support</a>
                    </Button>
                    <Button asChild>
                      <Link href="/vuri">Chat with VURI Assistant</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="tel:8005551234">Call 800-555-1234</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Your VR Journey?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take the first step toward employment success with vocational rehabilitation services
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white text-primary px-8 text-sm font-medium shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <a
                    href="https://www.twc.texas.gov/jobseekers/vocational-rehabilitation-services#startMyVr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start My VR
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/auth/register">Create VR4DEAF Account</Link>
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
            <School className="h-5 w-5" />
            <span className="text-sm text-gray-500">© 2025 VR4DEAF: JOB. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
