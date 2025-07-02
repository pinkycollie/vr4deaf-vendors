"use client"

import Link from "next/link"
import { CheckCircle, ExternalLink, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TexasVRServices() {
  const services = [
    {
      title: "Job Training",
      description: "Specialized training programs to help deaf individuals develop skills needed for employment.",
    },
    {
      title: "Job Placement",
      description: "Assistance finding suitable employment opportunities that match your skills and accommodations.",
    },
    {
      title: "Vocational Counseling",
      description: "Guidance on career goals, job search strategies, and resume writing from experienced counselors.",
    },
    {
      title: "Assistive Technology",
      description: "Access to devices and software that can help overcome workplace communication barriers.",
    },
    {
      title: "Monthly Allowance",
      description: "Eligible participants may receive financial support during training and job search activities.",
    },
    {
      title: "Workplace Accommodations",
      description: "Assistance in identifying and implementing reasonable accommodations in the workplace.",
    },
  ]

  return (
    <section id="texas-vr" className="py-20 relative overflow-hidden">
      {/* Texas-themed background element */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <path
            d="M 500 200 L 800 350 L 800 650 L 500 800 L 200 650 L 200 350 Z"
            fill="url(#texasGradient)"
            className="text-texas-red-600"
          />
          <defs>
            <linearGradient id="texasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-texas-red-600 hover:bg-texas-red-700">
                <CheckCircle className="h-3 w-3 mr-1" /> LIVE IN TEXAS
              </Badge>
              <Badge variant="outline" className="border-texas-blue-600 text-texas-blue-600">
                Coming Soon to Other States
              </Badge>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Texas Vocational Rehabilitation Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              VR4DEAF is currently operating in Texas, providing specialized vocational rehabilitation services for deaf
              individuals through the Texas Workforce Commission.
            </p>
          </div>
          <Button asChild className="shrink-0 bg-texas-blue-600 hover:bg-texas-blue-700">
            <Link href="https://www.twc.texas.gov/programs/vocational-rehabilitation" target="_blank" rel="noopener">
              Texas VR Program <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-texas-red-700">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-texas-red-600 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">How Texas VR Services Work</h3>
              <p className="mb-4 text-gray-900 dark:text-white">
                Vocational rehabilitation services in Texas help people with disabilities prepare for, find, keep and
                advance in employment. These services are designed to help individuals achieve and maintain their
                optimal physical, social, and economic functioning.
              </p>
              <p className="text-gray-900 dark:text-white">
                VR4DEAF specializes in connecting deaf individuals with these services, providing ASL support and
                specialized guidance throughout the process.
              </p>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-texas-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Find a Texas VR Office</h4>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    Use our office locator to find the nearest Texas Workforce Solutions-Vocational Rehabilitation
                    Services office.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-1 text-texas-blue-600" asChild>
                    <Link href="#" onClick={() => document.querySelector('[aria-label="Find VR Offices"]')?.click()}>
                      Open Office Locator
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-texas-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Eligibility</h4>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    To be eligible, you must have a physical or mental disability that affects your ability to work and
                    need VR services to get or keep a job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
