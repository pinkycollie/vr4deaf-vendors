import { Check, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FundingInfo() {
  const jobSeekersCovered = [
    "Career assessment & job placement assistance",
    "Resume-building & interview coaching",
    "Job training & skill development",
    "Assistive technology (e.g., ASL interpreters, speech-to-text tools)",
    "Transportation assistance for work (case-by-case)",
    "Support for adaptive work environments",
    "Short-term education & certification programs",
  ]

  const jobSeekersNotCovered = [
    "Long-term college degrees (unless tied to a specific vocational path)",
    "Personal transportation (owning a car, gas, or Uber beyond work-related needs)",
    "Housing assistance (rent, mortgages, living expenses)",
  ]

  const selfEmploymentCovered = [
    "Business planning & consulting services",
    "Basic business registration fees (LLC, permits, EIN, etc.)",
    "Minimal business equipment (e.g., laptop, printer, software licenses)",
    "Some professional services (limited legal, accounting, branding)",
    "Adaptive technology for self-employment",
  ]

  const selfEmploymentNotCovered = [
    "Large business investments or inventory purchases",
    "Office rent, utilities, or long-term operational costs",
    "Marketing & advertising expenses",
  ]

  const smallBusinessCovered = [
    "Business coaching & mentorship for entrepreneurs",
    "Vocational rehabilitation specialists for business training",
    "Some funding for business-related training programs",
    "ASL-interpreted business workshops",
  ]

  const smallBusinessNotCovered = [
    "Full funding for hiring employees or payroll",
    "Business insurance or large-scale liability coverage",
    "Major business expansion costs",
  ]

  return (
    <section id="funding" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Vocational Rehabilitation Funding</h2>
          <p className="text-lg text-muted-foreground">
            Understanding what VR covers is crucial for maximizing your benefits with 360 Magicians.
          </p>
        </div>

        <Tabs defaultValue="job-seekers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="job-seekers">Job Seekers</TabsTrigger>
            <TabsTrigger value="self-employment">Self-Employment</TabsTrigger>
            <TabsTrigger value="small-business">Small Business</TabsTrigger>
          </TabsList>

          <TabsContent value="job-seekers">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-green-600 bg-green-100 dark:bg-green-900/20 dark:border-green-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-800 dark:text-green-100 flex items-center gap-2">
                    <Check className="h-5 w-5" /> What VR Covers
                  </CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-200">
                    For deaf individuals seeking employment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobSeekersCovered.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <Check className="h-5 w-5 text-green-700 dark:text-green-300 shrink-0 mt-0.5" />
                        <span className="text-green-800 dark:text-green-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-600 bg-red-100 dark:bg-red-900/20 dark:border-red-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-800 dark:text-red-100 flex items-center gap-2">
                    <X className="h-5 w-5" /> What VR Does NOT Cover
                  </CardTitle>
                  <CardDescription className="text-red-700 dark:text-red-200">
                    Important limitations to be aware of
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobSeekersNotCovered.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <X className="h-5 w-5 text-red-700 dark:text-red-300 shrink-0 mt-0.5" />
                        <span className="text-red-800 dark:text-red-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="self-employment">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-green-600 bg-green-100 dark:bg-green-900/20 dark:border-green-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-800 dark:text-green-100 flex items-center gap-2">
                    <Check className="h-5 w-5" /> What VR Covers
                  </CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-200">
                    For deaf entrepreneurs starting a business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selfEmploymentCovered.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <Check className="h-5 w-5 text-green-700 dark:text-green-300 shrink-0 mt-0.5" />
                        <span className="text-green-800 dark:text-green-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-600 bg-red-100 dark:bg-red-900/20 dark:border-red-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-800 dark:text-red-100 flex items-center gap-2">
                    <X className="h-5 w-5" /> What VR Does NOT Cover
                  </CardTitle>
                  <CardDescription className="text-red-700 dark:text-red-200">
                    Important limitations to be aware of
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selfEmploymentNotCovered.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <X className="h-5 w-5 text-red-700 dark:text-red-300 shrink-0 mt-0.5" />
                        <span className="text-red-800 dark:text-red-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="small-business">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-green-600 bg-green-100 dark:bg-green-900/20 dark:border-green-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-800 dark:text-green-100 flex items-center gap-2">
                    <Check className="h-5 w-5" /> What VR Covers
                  </CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-200">
                    For deaf-owned businesses seeking assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {smallBusinessCovered.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <Check className="h-5 w-5 text-green-700 dark:text-green-300 shrink-0 mt-0.5" />
                        <span className="text-green-800 dark:text-green-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-600 bg-red-100 dark:bg-red-900/20 dark:border-red-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-800 dark:text-red-100 flex items-center gap-2">
                    <X className="h-5 w-5" /> What VR Does NOT Cover
                  </CardTitle>
                  <CardDescription className="text-red-700 dark:text-red-200">
                    Important limitations to be aware of
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {smallBusinessNotCovered.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <X className="h-5 w-5 text-red-700 dark:text-red-300 shrink-0 mt-0.5" />
                        <span className="text-red-800 dark:text-red-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
