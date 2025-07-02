"use client"

import Link from "next/link"
import { Bot, ArrowRight } from "lucide-react"
import Infographic from "@/components/automation/infographic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AutomationPage() {
  return (
    <main className="py-16 lg:py-24">
      <section className="container space-y-12">
        {/* Page Heading */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="inline-flex items-center gap-2">
              <Bot className="h-8 w-8 text-texas-red-600" />
              VR4DEAF Automation
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            See how our AI-powered workflow moves Deaf job-seekers from sign-up to sustained employment in minutes.
          </p>
        </header>

        {/* Infographic */}
        <Infographic />

        {/* Metrics / Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Avg. matching time", value: "4.2 s" },
            { label: "Automation coverage", value: "95 %" },
            { label: "VR approval success", value: "85 %" },
          ].map((item) => (
            <Card key={item.label} className="border-texas-blue-600/40">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{item.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{item.label}</CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6 pt-8">
          <Button asChild size="lg" className="bg-texas-red-600 hover:bg-texas-red-700">
            <Link href="/signup" className="flex items-center gap-2">
              Start Your VR Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Vendors?{" "}
            <Link href="/vendors-portal" className="underline hover:text-foreground">
              Apply here
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
