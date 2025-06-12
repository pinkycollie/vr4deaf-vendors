"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, FileText, DollarSign, Calendar } from "lucide-react"

export default function FeeScheduleViewer() {
  const [isLoading, setIsLoading] = useState(false)

  const feeCategories = [
    {
      category: "Assessment Services",
      description: "Diagnostic and evaluation services",
      examples: ["Psychological evaluations", "Vocational assessments", "Medical examinations"],
      note: "Most assessments covered for eligible VR clients",
    },
    {
      category: "Training & Education",
      description: "Educational and skill development programs",
      examples: ["College tuition", "Trade school programs", "Professional certifications"],
      note: "Subject to VR approval and individual financial participation",
    },
    {
      category: "Assistive Technology",
      description: "Devices and equipment for workplace accommodation",
      examples: ["Hearing aids", "FM systems", "Computer software", "Workplace modifications"],
      note: "Based on functional need and employment goals",
    },
    {
      category: "Support Services",
      description: "Services to support VR participation",
      examples: ["ASL interpreters", "Transportation", "Job coaching", "Maintenance services"],
      note: "Provided as needed to achieve employment goals",
    },
  ]

  const openFeeSchedule = () => {
    setIsLoading(true)
    window.open(
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fdam.assets.ohio.gov%2Fraw%2Fupload%2Food.ohio.gov%2FProvider%2520Training%2FOOD_VR_Fee_Schedule_2024_-_Final_9.9.2024.docx&wdOrigin=BROWSELINK",
      "_blank",
    )
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-blue-800">
            <FileText className="w-6 h-6" />
            Ohio VR Fee Schedule 2024
          </CardTitle>
          <CardDescription className="text-blue-700">
            Updated September 9, 2024 - Official fee structure for vocational rehabilitation services
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="default" className="bg-green-600">
              <Calendar className="w-3 h-3 mr-1" />
              Current
            </Badge>
            <Badge variant="outline">Final Version</Badge>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={openFeeSchedule} disabled={isLoading} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="w-4 h-4 mr-2" />
            {isLoading ? "Opening..." : "View 2024 Fee Schedule"}
          </Button>
          <p className="text-xs text-blue-600 mt-2">Opens in Microsoft Office Online Viewer</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Fee Overview</TabsTrigger>
          <TabsTrigger value="deaf-specific">Deaf Services</TabsTrigger>
          <TabsTrigger value="financial">Financial Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {feeCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    {category.category}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {category.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-xs text-blue-700">
                      <strong>Note:</strong> {category.note}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deaf-specific" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deaf & Hard of Hearing Service Fees</CardTitle>
              <CardDescription>
                Specific fee information for services commonly used by deaf and hard of hearing VR clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-green-700">ASL Interpreter Services</h4>
                    <p className="text-sm text-muted-foreground">
                      Fully covered for VR-related activities including assessments, training, and job placement
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-blue-700">Hearing Aids & Assistive Technology</h4>
                    <p className="text-sm text-muted-foreground">
                      Coverage based on employment need - see detailed fee schedule for specific device costs
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-purple-700">CART Services</h4>
                    <p className="text-sm text-muted-foreground">
                      Communication Access Realtime Translation covered for educational and training programs
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={openFeeSchedule} className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  View Complete Fee Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Participation Information</CardTitle>
              <CardDescription>Understanding your financial responsibility for VR services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• VR services are provided at no cost to most clients</li>
                    <li>• Financial participation may be required based on income and family size</li>
                    <li>• Assessment services are typically provided at no cost</li>
                    <li>• SSI/SSDI recipients are exempt from financial participation</li>
                  </ul>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold">No Cost Services</h4>
                    <p className="text-sm text-muted-foreground">
                      Assessment, counseling, job placement, and most support services
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold">Potential Cost Share</h4>
                    <p className="text-sm text-muted-foreground">
                      Training programs, higher education, and some assistive technology
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
