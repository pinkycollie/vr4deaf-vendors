"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building2, Phone, Mail, FileText, CheckCircle2, Circle, MessageSquare, Download } from "lucide-react"
import { cn } from "@/lib/utils"

type ClientData = {
  name: string
  businessType: string
  disabilityType: string
  vrCounselor: {
    name: string
    phone: string
    email: string
  }
  cbtacProvider: {
    name: string
    phone: string
    email: string
  }
  progress: number
  currentStage: string
  nextMilestone: string
  startDate: string
  estimatedCompletion: string
}

type Milestone = {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: string
  cost: string
  status: "completed" | "in-progress" | "pending" | "overdue"
}

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState("progress")

  // Mock client data
  const clientData: ClientData = {
    name: "Sarah Johnson",
    businessType: "Digital Marketing Consultancy",
    disabilityType: "Deaf/Hard of Hearing",
    vrCounselor: {
      name: "Maria Rodriguez",
      phone: "(512) 555-0123",
      email: "maria.rodriguez@twc.texas.gov",
    },
    cbtacProvider: {
      name: "Texas CBTAC - Austin",
      phone: "(512) 555-0456",
      email: "austin@texascbtac.org",
    },
    progress: 35,
    currentStage: "Planning Phase",
    nextMilestone: "Business Plan Development",
    startDate: "January 15, 2024",
    estimatedCompletion: "July 2025",
  }

  const milestones: Milestone[] = [
    {
      id: "1",
      title: "VR Eligibility Determination",
      description: "Complete VR application and eligibility assessment",
      completed: true,
      dueDate: "Jan 20, 2024",
      cost: "$0",
      status: "completed",
    },
    {
      id: "2",
      title: "Self-Employment Assessment",
      description: "Customer Profile & Self-Employment Exploration",
      completed: true,
      dueDate: "Jan 30, 2024",
      cost: "$322",
      status: "completed",
    },
    {
      id: "3",
      title: "Business Concept Development",
      description: "Develop and refine your business concept",
      completed: false,
      dueDate: "Feb 15, 2024",
      cost: "$322",
      status: "in-progress",
    },
    {
      id: "4",
      title: "Business Plan Development",
      description: "Create comprehensive business plan",
      completed: false,
      dueDate: "Mar 15, 2024",
      cost: "$1,608",
      status: "pending",
    },
    {
      id: "5",
      title: "Business Launch Preparation",
      description: "Prepare for business launch and operations",
      completed: false,
      dueDate: "May 1, 2024",
      cost: "$2,021",
      status: "pending",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-400"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "pending":
        return "Pending"
      case "overdue":
        return "Overdue"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {clientData.name}</h1>
            <p className="text-blue-100">{clientData.businessType}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-blue-100 text-sm">Current Stage</p>
            <p className="font-semibold">{clientData.currentStage}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Overall Progress</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={clientData.progress} className="flex-1 bg-white/20" />
              <span className="font-semibold">{clientData.progress}%</span>
            </div>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Next Milestone</p>
            <p className="font-semibold">{clientData.nextMilestone}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="team">Your Team</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Milestones</CardTitle>
              <CardDescription>Track your progress through the VR self-employment program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="flex-shrink-0 mt-1">
                      {milestone.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={cn("font-semibold", milestone.completed ? "text-green-600" : "")}>
                          {milestone.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("text-white text-xs", getStatusColor(milestone.status))}>
                            {getStatusText(milestone.status)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{milestone.cost}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Due: {milestone.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  VR Counselor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">{clientData.vrCounselor.name}</p>
                  <p className="text-sm text-muted-foreground">Texas Workforce Commission</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {clientData.vrCounselor.phone}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {clientData.vrCounselor.email}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  CBTAC Provider
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">{clientData.cbtacProvider.name}</p>
                  <p className="text-sm text-muted-foreground">Community-Based Technical Assistance</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {clientData.cbtacProvider.phone}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {clientData.cbtacProvider.email}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Program Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Program Start</p>
                  <p className="text-lg font-semibold">{clientData.startDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Estimated Completion</p>
                  <p className="text-lg font-semibold">{clientData.estimatedCompletion}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Time Remaining</p>
                  <p className="text-lg font-semibold">~16 months</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Business Plan Template</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Financial Planning Worksheet</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Accommodation Assessment</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  ASL Interpretation Services
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Assistive Technology Guide
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Workplace Accommodations
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Business Planning Workshop
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Financial Management Training
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Marketing for Deaf Entrepreneurs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>External Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  SBA Resources
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  SCORE Mentorship
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Local Business Networks
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Communication Center
              </CardTitle>
              <CardDescription>Stay connected with your VR team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">New Message from Maria Rodriguez</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm">
                    Hi Sarah! I've reviewed your business concept and it looks great. Let's schedule a meeting to
                    discuss the next steps for your business plan development.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Reminder: Upcoming Appointment</span>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>
                  <p className="text-sm">
                    Don't forget about your business planning session tomorrow at 2:00 PM with your CBTAC provider.
                  </p>
                </div>

                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send New Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
