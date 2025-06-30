"use client"

import { useState } from "react"
import type React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Building2,
  Bot,
  MapPin,
  Users,
  FileText,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  Brain,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import VRContacts from "./vr-contacts"
import UnifiedAssistant from "./ai-assistant"
import BusinessInsightsPanel from "./business-insights-panel"
import ScreenReaderAnnouncer from "./screen-reader-announcer"

type CheckpointItem = {
  id: string
  text: string
  completed: boolean
  cost?: string
  vrApprovalRequired?: boolean
  aiGenerated?: boolean
}

type Checkpoint = {
  id: string
  title: string
  items: CheckpointItem[]
  nextAction?: string
  totalCost?: string
}

type Stage = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
  checkpoints: Checkpoint[]
}

type ClientProfile = {
  serviceType: "vr-vendor" | "ai-powered" | ""
  state: string
  clientName: string
  disabilityType: string
  businessIdea: string
  accommodationNeeds: string
  supportLevel: "simple" | "comprehensive" | "supported" | ""
  vrCounselor: string
  cbtacProvider: string
  targetAudience: string
  industry: string
}

interface Milestone {
  id: string
  title: string
  description: string
  status: "not-started" | "in-progress" | "completed"
  fee: number
  requirements: string[]
  estimatedDays: number
  vrApprovalRequired: boolean
}

const vrMilestones: Milestone[] = [
  {
    id: "ssesp",
    title: "SSESP - Self-Employment Feasibility Study",
    description: "Comprehensive assessment of business viability and client readiness",
    status: "completed",
    fee: 153,
    requirements: ["Business idea assessment", "Market research", "Financial feasibility", "Skills evaluation"],
    estimatedDays: 30,
    vrApprovalRequired: true,
  },
  {
    id: "startup",
    title: "Start-Up Phase",
    description: "Business plan development and initial setup",
    status: "in-progress",
    fee: 765,
    requirements: ["Complete business plan", "Legal structure setup", "Initial funding secured", "Permits obtained"],
    estimatedDays: 60,
    vrApprovalRequired: true,
  },
  {
    id: "maintenance",
    title: "Maintenance Phase",
    description: "Ongoing business support and development",
    status: "not-started",
    fee: 1530,
    requirements: [
      "Monthly progress reports",
      "Financial tracking",
      "Marketing implementation",
      "Customer acquisition",
    ],
    estimatedDays: 90,
    vrApprovalRequired: true,
  },
  {
    id: "stability",
    title: "Stability Phase",
    description: "Business stabilization and growth planning",
    status: "not-started",
    fee: 2295,
    requirements: ["Consistent revenue stream", "Growth strategy", "Operational efficiency", "Market expansion"],
    estimatedDays: 120,
    vrApprovalRequired: true,
  },
  {
    id: "closure",
    title: "Closure Phase",
    description: "Successful transition to independent operation",
    status: "not-started",
    fee: 3032,
    requirements: [
      "Business sustainability",
      "Independent operation",
      "Final assessment",
      "Case closure documentation",
    ],
    estimatedDays: 30,
    vrApprovalRequired: true,
  },
]

export default function UnifiedMilestoneTracker() {
  const [activeTab, setActiveTab] = useState("milestones")
  const [announcement, setAnnouncement] = useState("")
  const [milestones, setMilestones] = useState(vrMilestones)

  const completedMilestones = milestones.filter((m) => m.status === "completed").length
  const totalProgress = (completedMilestones / milestones.length) * 100
  const totalEarned = milestones.filter((m) => m.status === "completed").reduce((sum, m) => sum + m.fee, 0)
  const totalPotential = milestones.reduce((sum, m) => sum + m.fee, 0)

  const handleMilestoneUpdate = (milestoneId: string, newStatus: Milestone["status"]) => {
    setMilestones((prev) => prev.map((m) => (m.id === milestoneId ? { ...m, status: newStatus } : m)))
    setAnnouncement(`Milestone ${milestoneId} updated to ${newStatus}`)
  }

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-300"
      case "in-progress":
        return "bg-yellow-100 border-yellow-300"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const [clientProfile, setClientProfile] = useState<ClientProfile>({
    serviceType: "",
    state: "",
    clientName: "",
    disabilityType: "",
    businessIdea: "",
    accommodationNeeds: "",
    supportLevel: "",
    vrCounselor: "",
    cbtacProvider: "",
    targetAudience: "",
    industry: "",
  })

  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // VR Vendor stages for Texas/Florida
  const vrVendorStages: Stage[] = [
    {
      id: "assessment",
      name: "ASSESSMENT",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500",
      description: "VR Eligibility & Self-Employment Assessment",
      checkpoints: [
        {
          id: "assessment-1",
          title: "VR Eligibility Determination",
          items: [
            { id: "assessment-1-1", text: "Complete VR application with counselor", completed: false },
            { id: "assessment-1-2", text: "Provide disability documentation", completed: false },
            { id: "assessment-1-3", text: "Demonstrate employment impact of disability", completed: false },
          ],
        },
        {
          id: "assessment-2",
          title: "Self-Employment Readiness Assessment",
          items: [
            {
              id: "assessment-2-1",
              text: "Customer Profile & Self-Employment Exploration",
              completed: false,
              cost: "$322.00",
              vrApprovalRequired: true,
            },
            {
              id: "assessment-2-2",
              text: "Supported Self-Employment Assessment (if needed)",
              completed: false,
              cost: "$919.00",
              vrApprovalRequired: true,
            },
            { id: "assessment-2-3", text: "Identify accommodation needs for business", completed: false },
          ],
          totalCost: "Up to $1,241.00",
        },
        {
          id: "assessment-3",
          title: "Individualized Plan for Employment (IPE)",
          items: [
            { id: "assessment-3-1", text: "Develop IPE with VR counselor", completed: false },
            { id: "assessment-3-2", text: "Set self-employment as vocational goal", completed: false },
            { id: "assessment-3-3", text: "Identify required VR services and supports", completed: false },
          ],
          nextAction: "Proceed to business concept development phase",
        },
      ],
    },
    {
      id: "planning",
      name: "PLANNING",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-green-500",
      description: "Business Concept & Feasibility Development",
      checkpoints: [
        {
          id: "planning-1",
          title: "Business Concept Development",
          items: [
            {
              id: "planning-1-1",
              text: "Concept Development - Simple",
              completed: false,
              cost: "$230.00",
            },
            {
              id: "planning-1-2",
              text: "Concept Development - Comprehensive",
              completed: false,
              cost: "$322.00",
            },
            {
              id: "planning-1-3",
              text: "Concept Development - Supported",
              completed: false,
              cost: "$153.00",
            },
          ],
        },
        {
          id: "planning-2",
          title: "Feasibility Study",
          items: [
            {
              id: "planning-2-1",
              text: "Market research and analysis",
              completed: false,
              cost: "$965.00 - $1,378.00",
            },
            { id: "planning-2-2", text: "Financial viability assessment", completed: false },
            { id: "planning-2-3", text: "Accessibility and accommodation planning", completed: false },
          ],
          totalCost: "$965.00 - $1,378.00",
        },
        {
          id: "planning-3",
          title: "Business Plan Development",
          items: [
            {
              id: "planning-3-1",
              text: "Business Plan - Simple",
              completed: false,
              cost: "$1,086.00",
            },
            {
              id: "planning-3-2",
              text: "Business Plan - Comprehensive",
              completed: false,
              cost: "$1,608.00",
            },
            { id: "planning-3-3", text: "Include disability accommodation strategies", completed: false },
          ],
          nextAction: "Submit business plan for VR counselor approval",
          totalCost: "$1,086.00 - $1,608.00",
        },
      ],
    },
    {
      id: "startup",
      name: "STARTUP",
      icon: <Building2 className="h-5 w-5" />,
      color: "bg-purple-500",
      description: "Business Launch & Initial Operations",
      checkpoints: [
        {
          id: "startup-1",
          title: "Financial Planning & Setup",
          items: [
            {
              id: "startup-1-1",
              text: "Financial Planning - Simple/Comprehensive",
              completed: false,
              cost: "$322.00 - $551.00",
            },
            { id: "startup-1-2", text: "Secure business funding and loans", completed: false },
            { id: "startup-1-3", text: "Setup accessible business location/workspace", completed: false },
          ],
        },
        {
          id: "startup-2",
          title: "Business Registration & Legal",
          items: [
            { id: "startup-2-1", text: "Register business entity", completed: false },
            { id: "startup-2-2", text: "Obtain necessary licenses and permits", completed: false },
            { id: "startup-2-3", text: "Setup business insurance and liability coverage", completed: false },
          ],
        },
        {
          id: "startup-3",
          title: "Benchmark 1: Services Plan Completion",
          items: [
            {
              id: "startup-3-1",
              text: "Complete Supported Self-Employment Services Plan (SSESP)",
              completed: false,
              cost: "$153.00",
              vrApprovalRequired: true,
            },
            { id: "startup-3-2", text: "Begin early-stage business activities", completed: false },
            { id: "startup-3-3", text: "Implement accessibility accommodations", completed: false },
          ],
          nextAction: "Prepare for business launch (5+ days operation required)",
          totalCost: "$153.00",
        },
      ],
    },
    {
      id: "operations",
      name: "OPERATIONS",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-orange-500",
      description: "Business Growth & Sustainability",
      checkpoints: [
        {
          id: "operations-1",
          title: "Benchmark 2: Business Start-Up",
          items: [
            {
              id: "operations-1-1",
              text: "Operate business for minimum 5 days",
              completed: false,
              cost: "$2,021.00",
              vrApprovalRequired: true,
            },
            { id: "operations-1-2", text: "Establish initial customer base", completed: false },
            { id: "operations-1-3", text: "Document accessibility accommodations in practice", completed: false },
          ],
          totalCost: "$2,021.00",
        },
        {
          id: "operations-2",
          title: "Benchmark 3: Business Maintenance",
          items: [
            {
              id: "operations-2-1",
              text: "Operate business for minimum 112 days",
              completed: false,
              cost: "$1,011.00",
              vrApprovalRequired: true,
            },
            { id: "operations-2-2", text: "Maintain consistent revenue streams", completed: false },
            { id: "operations-2-3", text: "Refine accommodation strategies", completed: false },
          ],
          totalCost: "$1,011.00",
        },
        {
          id: "operations-3",
          title: "Benchmark 4: Business Stability",
          items: [
            {
              id: "operations-3-1",
              text: "Achieve business stability (168+ days)",
              completed: false,
              cost: "$1,011.00",
              vrApprovalRequired: true,
            },
            { id: "operations-3-2", text: "Meet with VR counselor to establish stability date", completed: false },
            { id: "operations-3-3", text: "Demonstrate sustainable business model", completed: false },
          ],
          nextAction: "Prepare for VR service closure",
          totalCost: "$1,011.00",
        },
      ],
    },
    {
      id: "closure",
      name: "CLOSURE",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-red-500",
      description: "VR Service Completion & Independence",
      checkpoints: [
        {
          id: "closure-1",
          title: "Benchmark 5: Service Closure Preparation",
          items: [
            {
              id: "closure-1-1",
              text: "Operate independently for 90 days after stability",
              completed: false,
              cost: "$3,032.00",
              vrApprovalRequired: true,
            },
            { id: "closure-1-2", text: "Demonstrate no need for CBTAC support", completed: false },
            { id: "closure-1-3", text: "Complete final VR counselor evaluation", completed: false },
          ],
          totalCost: "$3,032.00",
        },
        {
          id: "closure-2",
          title: "VR Case Closure",
          items: [
            { id: "closure-2-1", text: "Submit final business performance reports", completed: false },
            { id: "closure-2-2", text: "Complete VR service satisfaction survey", completed: false },
            { id: "closure-2-3", text: "Receive VR case closure documentation", completed: false },
          ],
        },
        {
          id: "closure-3",
          title: "Post-VR Business Sustainability",
          items: [
            { id: "closure-3-1", text: "Maintain business operations independently", completed: false },
            { id: "closure-3-2", text: "Continue using established accommodations", completed: false },
            { id: "closure-3-3", text: "Access post-employment services if needed", completed: false },
          ],
          nextAction: "Successful completion of VR self-employment program",
        },
      ],
    },
  ]

  // AI-Powered stages for rest of USA
  const aiPoweredStages: Stage[] = [
    {
      id: "discovery",
      name: "DISCOVERY",
      icon: <Bot className="h-5 w-5" />,
      color: "bg-blue-500",
      description: "AI-Powered Idea Validation & Planning",
      checkpoints: [
        {
          id: "discovery-1",
          title: "Business Idea Assessment",
          items: [
            {
              id: "discovery-1-1",
              text: "AI-powered market research and validation",
              completed: false,
              aiGenerated: true,
            },
            { id: "discovery-1-2", text: "Competitive landscape analysis", completed: false, aiGenerated: true },
            {
              id: "discovery-1-3",
              text: "Target audience identification and profiling",
              completed: false,
              aiGenerated: true,
            },
          ],
        },
        {
          id: "discovery-2",
          title: "Accessibility & Accommodation Planning",
          items: [
            {
              id: "discovery-2-1",
              text: "Disability accommodation strategy development",
              completed: false,
              aiGenerated: true,
            },
            {
              id: "discovery-2-2",
              text: "Assistive technology integration planning",
              completed: false,
              aiGenerated: true,
            },
            {
              id: "discovery-2-3",
              text: "Accessible workspace design recommendations",
              completed: false,
              aiGenerated: true,
            },
          ],
        },
        {
          id: "discovery-3",
          title: "Business Model Development",
          items: [
            { id: "discovery-3-1", text: "AI-generated business model canvas", completed: false, aiGenerated: true },
            { id: "discovery-3-2", text: "Revenue stream optimization", completed: false, aiGenerated: true },
            {
              id: "discovery-3-3",
              text: "Risk assessment and mitigation strategies",
              completed: false,
              aiGenerated: true,
            },
          ],
          nextAction: "AI will generate detailed business plan framework",
        },
      ],
    },
    {
      id: "planning",
      name: "PLANNING",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-green-500",
      description: "AI-Assisted Business Planning",
      checkpoints: [
        {
          id: "planning-1",
          title: "Comprehensive Business Plan",
          items: [
            { id: "planning-1-1", text: "AI-generated executive summary", completed: false, aiGenerated: true },
            {
              id: "planning-1-2",
              text: "Market analysis and positioning strategy",
              completed: false,
              aiGenerated: true,
            },
            {
              id: "planning-1-3",
              text: "Financial projections and funding requirements",
              completed: false,
              aiGenerated: true,
            },
          ],
        },
        {
          id: "planning-2",
          title: "Technology & Operations Planning",
          items: [
            { id: "planning-2-1", text: "Technology stack recommendations", completed: false, aiGenerated: true },
            { id: "planning-2-2", text: "Operational workflow design", completed: false, aiGenerated: true },
            { id: "planning-2-3", text: "Accessibility compliance framework", completed: false, aiGenerated: true },
          ],
        },
        {
          id: "planning-3",
          title: "Legal & Regulatory Preparation",
          items: [
            { id: "planning-3-1", text: "Business structure recommendations", completed: false, aiGenerated: true },
            { id: "planning-3-2", text: "Licensing and permit requirements", completed: false, aiGenerated: true },
            { id: "planning-3-3", text: "ADA compliance checklist", completed: false, aiGenerated: true },
          ],
          nextAction: "Proceed to business setup and launch preparation",
        },
      ],
    },
    {
      id: "launch",
      name: "LAUNCH",
      icon: <Building2 className="h-5 w-5" />,
      color: "bg-purple-500",
      description: "Business Setup & Launch",
      checkpoints: [
        {
          id: "launch-1",
          title: "Business Registration & Setup",
          items: [
            { id: "launch-1-1", text: "Complete business registration process", completed: false },
            { id: "launch-1-2", text: "Setup business banking and financial systems", completed: false },
            { id: "launch-1-3", text: "Implement recommended accessibility features", completed: false },
          ],
        },
        {
          id: "launch-2",
          title: "Technology Implementation",
          items: [
            { id: "launch-2-1", text: "Deploy recommended technology solutions", completed: false, aiGenerated: true },
            { id: "launch-2-2", text: "Setup assistive technology integrations", completed: false, aiGenerated: true },
            { id: "launch-2-3", text: "Implement accessibility monitoring tools", completed: false, aiGenerated: true },
          ],
        },
        {
          id: "launch-3",
          title: "Market Entry & Initial Operations",
          items: [
            { id: "launch-3-1", text: "Launch marketing campaigns", completed: false, aiGenerated: true },
            { id: "launch-3-2", text: "Begin customer acquisition activities", completed: false },
            { id: "launch-3-3", text: "Monitor accessibility and accommodation effectiveness", completed: false },
          ],
          nextAction: "Focus on growth and optimization strategies",
        },
      ],
    },
    {
      id: "growth",
      name: "GROWTH",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-orange-500",
      description: "Scaling & Optimization",
      checkpoints: [
        {
          id: "growth-1",
          title: "Performance Optimization",
          items: [
            { id: "growth-1-1", text: "AI-powered performance analytics", completed: false, aiGenerated: true },
            {
              id: "growth-1-2",
              text: "Customer feedback analysis and improvements",
              completed: false,
              aiGenerated: true,
            },
            { id: "growth-1-3", text: "Accessibility feature enhancement", completed: false, aiGenerated: true },
          ],
        },
        {
          id: "growth-2",
          title: "Market Expansion",
          items: [
            { id: "growth-2-1", text: "Market expansion strategy development", completed: false, aiGenerated: true },
            { id: "growth-2-2", text: "Product/service diversification planning", completed: false, aiGenerated: true },
            {
              id: "growth-2-3",
              text: "Partnership and collaboration opportunities",
              completed: false,
              aiGenerated: true,
            },
          ],
        },
        {
          id: "growth-3",
          title: "Sustainability & Innovation",
          items: [
            { id: "growth-3-1", text: "Long-term sustainability planning", completed: false, aiGenerated: true },
            {
              id: "growth-3-2",
              text: "Innovation and technology adoption roadmap",
              completed: false,
              aiGenerated: true,
            },
            {
              id: "growth-3-3",
              text: "Community impact and social responsibility",
              completed: false,
              aiGenerated: true,
            },
          ],
          nextAction: "Continue monitoring and adapting business strategies",
        },
      ],
    },
  ]

  const [stages, setStages] = useState<Stage[]>([])
  const [announcements, setAnnouncements] = useState<string[]>([])

  const generatePersonalizedPlan = async () => {
    if (!clientProfile.serviceType || !clientProfile.businessIdea.trim()) return

    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let selectedStages: Stage[]

    if (clientProfile.serviceType === "vr-vendor") {
      selectedStages = vrVendorStages
    } else {
      selectedStages = aiPoweredStages
    }

    // Customize stages based on client profile
    const customizedStages = selectedStages.map((stage) => {
      const customizedCheckpoints = stage.checkpoints.map((checkpoint) => {
        const customizedItems = checkpoint.items.map((item) => {
          let customizedText = item.text

          // Add personalization based on client profile
          if (clientProfile.disabilityType && item.text.includes("accommodation")) {
            customizedText = `${item.text} - Specific to ${clientProfile.disabilityType}`
          }

          if (clientProfile.industry && item.text.includes("market")) {
            customizedText = `${item.text} for ${clientProfile.industry} industry`
          }

          if (clientProfile.targetAudience && item.text.includes("audience")) {
            customizedText = `${item.text} - Focus on ${clientProfile.targetAudience}`
          }

          return {
            ...item,
            text: customizedText,
          }
        })

        return {
          ...checkpoint,
          items: customizedItems,
        }
      })

      return {
        ...stage,
        checkpoints: customizedCheckpoints,
      }
    })

    setStages(customizedStages)
    setHasGeneratedPlan(true)
    setIsGenerating(false)

    const serviceTypeText = clientProfile.serviceType === "vr-vendor" ? "VR Vendor/CBTAC" : "AI-Powered"
    setAnnouncements((prev) => [...prev, `${serviceTypeText} plan has been generated for ${clientProfile.clientName}`])
  }

  const toggleItem = (stageId: string, checkpointId: string, itemId: string) => {
    setStages(
      stages.map((stage) => {
        if (stage.id === stageId) {
          return {
            ...stage,
            checkpoints: stage.checkpoints.map((checkpoint) => {
              if (checkpoint.id === checkpointId) {
                return {
                  ...checkpoint,
                  items: checkpoint.items.map((item) => {
                    if (item.id === itemId) {
                      const newStatus = !item.completed
                      setAnnouncements((prev) => [
                        ...prev,
                        `${item.text} marked as ${newStatus ? "completed" : "incomplete"}`,
                      ])
                      return { ...item, completed: newStatus }
                    }
                    return item
                  }),
                }
              }
              return checkpoint
            }),
          }
        }
        return stage
      }),
    )
  }

  const calculateProgress = (stage: Stage) => {
    const totalItems = stage.checkpoints.reduce((acc, checkpoint) => acc + checkpoint.items.length, 0)
    const completedItems = stage.checkpoints.reduce(
      (acc, checkpoint) => acc + checkpoint.items.filter((item) => item.completed).length,
      0,
    )
    return (completedItems / totalItems) * 100
  }

  const calculateTotalProgress = () => {
    const totalItems = stages.reduce(
      (acc, stage) => acc + stage.checkpoints.reduce((acc, checkpoint) => acc + checkpoint.items.length, 0),
      0,
    )
    const completedItems = stages.reduce(
      (acc, stage) =>
        acc +
        stage.checkpoints.reduce(
          (acc, checkpoint) => acc + checkpoint.items.filter((item) => item.completed).length,
          0,
        ),
      0,
    )
    return (completedItems / totalItems) * 100
  }

  const getServiceTypeInfo = () => {
    if (clientProfile.serviceType === "vr-vendor") {
      return {
        title: "VR Vendor/CBTAC Service",
        description: "Structured VR self-employment program with milestone-based payments",
        states: "Texas & Florida",
        icon: <Building2 className="h-5 w-5" />,
        color: "bg-blue-600",
      }
    } else if (clientProfile.serviceType === "ai-powered") {
      return {
        title: "AI-Powered Planning",
        description: "Intelligent business planning with accessibility integration",
        states: "Nationwide Coverage",
        icon: <Bot className="h-5 w-5" />,
        color: "bg-purple-600",
      }
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Service Selection & Client Profile */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4">
        <ScreenReaderAnnouncer message={announcement} />

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              VR4Deaf Business Development Platform
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering deaf entrepreneurs through VR services and AI-powered business development with Claude AI and
              Business Magician integration
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Brain className="h-3 w-3 mr-1" />
                Claude AI Powered
              </Badge>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                Business Magician API
              </Badge>
              <Badge variant="outline" className="border-green-300 text-green-700">
                VR Compliant
              </Badge>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Progress Overview
                </span>
                <Badge variant="secondary">
                  {completedMilestones}/{milestones.length} Completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">${totalEarned.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Earned Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{Math.round(totalProgress)}%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">${totalPotential.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Potential</div>
                </div>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-purple-200">
              <TabsTrigger value="milestones" className="data-[state=active]:bg-purple-100">
                <Target className="h-4 w-4 mr-2" />
                Milestones
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-blue-100">
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-green-100">
                <Users className="h-4 w-4 mr-2" />
                VR Contacts
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-yellow-100">
                <FileText className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="milestones" className="space-y-4">
              {milestones.map((milestone, index) => (
                <Card key={milestone.id} className={`border-l-4 ${getStatusColor(milestone.status)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(milestone.status)}
                        <div>
                          <CardTitle className="text-lg">{milestone.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">${milestone.fee.toLocaleString()}</span>
                        </div>
                        <Badge variant={milestone.status === "completed" ? "default" : "secondary"}>
                          {milestone.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Requirements</h4>
                        <ul className="space-y-1">
                          {milestone.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Estimated Duration:</span>
                          <span className="font-medium">{milestone.estimatedDays} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>VR Approval Required:</span>
                          <Badge
                            variant={milestone.vrApprovalRequired ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {milestone.vrApprovalRequired ? "Yes" : "No"}
                          </Badge>
                        </div>
                        {milestone.status !== "completed" && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMilestoneUpdate(milestone.id, "in-progress")}
                              disabled={milestone.status === "in-progress"}
                            >
                              Start
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleMilestoneUpdate(milestone.id, "completed")}
                              disabled={milestone.status === "not-started"}
                            >
                              Complete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="insights">
              <BusinessInsightsPanel />
            </TabsContent>

            <TabsContent value="contacts">
              <VRContacts />
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resource Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h3 className="font-medium">VR Forms & Documents</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          SSESP Application Form
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          Business Plan Template
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          Financial Tracking Sheet
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-medium">Accessibility Resources</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          ASL Business Communication Guide
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          Assistive Technology Catalog
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          Deaf Entrepreneur Network
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <UnifiedAssistant />
      </div>
      {/* Service Selection & Client Profile */}
      <Card className="border-2 border-dashed border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Client Service Profile
          </CardTitle>
          <CardDescription>
            Select your service type and complete client information to generate a personalized plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                clientProfile.serviceType === "vr-vendor" ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20" : "",
              )}
              onClick={() => setClientProfile((prev) => ({ ...prev, serviceType: "vr-vendor" }))}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">VR Vendor/CBTAC</CardTitle>
                </div>
                <CardDescription>Texas & Florida VR Programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• Structured milestone-based process</li>
                  <li>• VR counselor oversight</li>
                  <li>• CBTAC provider support</li>
                  <li>• Fee schedule compliance</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                clientProfile.serviceType === "ai-powered"
                  ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20"
                  : "",
              )}
              onClick={() => setClientProfile((prev) => ({ ...prev, serviceType: "ai-powered" }))}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">AI-Powered Planning</CardTitle>
                </div>
                <CardDescription>Nationwide AI Services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1">
                  <li>• AI-generated business plans</li>
                  <li>• Intelligent recommendations</li>
                  <li>• Accessibility integration</li>
                  <li>• Nationwide availability</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Client Information Form */}
          {clientProfile.serviceType && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client's full name"
                    value={clientProfile.clientName}
                    onChange={(e) => setClientProfile((prev) => ({ ...prev, clientName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={clientProfile.state}
                    onValueChange={(value) => setClientProfile((prev) => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientProfile.serviceType === "vr-vendor" ? (
                        <>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="florida">Florida</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="alabama">Alabama</SelectItem>
                          <SelectItem value="alaska">Alaska</SelectItem>
                          <SelectItem value="arizona">Arizona</SelectItem>
                          <SelectItem value="arkansas">Arkansas</SelectItem>
                          <SelectItem value="california">California</SelectItem>
                          <SelectItem value="colorado">Colorado</SelectItem>
                          <SelectItem value="connecticut">Connecticut</SelectItem>
                          <SelectItem value="delaware">Delaware</SelectItem>
                          <SelectItem value="georgia">Georgia</SelectItem>
                          <SelectItem value="hawaii">Hawaii</SelectItem>
                          <SelectItem value="idaho">Idaho</SelectItem>
                          <SelectItem value="illinois">Illinois</SelectItem>
                          <SelectItem value="indiana">Indiana</SelectItem>
                          <SelectItem value="iowa">Iowa</SelectItem>
                          <SelectItem value="kansas">Kansas</SelectItem>
                          <SelectItem value="kentucky">Kentucky</SelectItem>
                          <SelectItem value="louisiana">Louisiana</SelectItem>
                          <SelectItem value="maine">Maine</SelectItem>
                          <SelectItem value="maryland">Maryland</SelectItem>
                          <SelectItem value="massachusetts">Massachusetts</SelectItem>
                          <SelectItem value="michigan">Michigan</SelectItem>
                          <SelectItem value="minnesota">Minnesota</SelectItem>
                          <SelectItem value="mississippi">Mississippi</SelectItem>
                          <SelectItem value="missouri">Missouri</SelectItem>
                          <SelectItem value="montana">Montana</SelectItem>
                          <SelectItem value="nebraska">Nebraska</SelectItem>
                          <SelectItem value="nevada">Nevada</SelectItem>
                          <SelectItem value="new-hampshire">New Hampshire</SelectItem>
                          <SelectItem value="new-jersey">New Jersey</SelectItem>
                          <SelectItem value="new-mexico">New Mexico</SelectItem>
                          <SelectItem value="new-york">New York</SelectItem>
                          <SelectItem value="north-carolina">North Carolina</SelectItem>
                          <SelectItem value="north-dakota">North Dakota</SelectItem>
                          <SelectItem value="ohio">Ohio</SelectItem>
                          <SelectItem value="oklahoma">Oklahoma</SelectItem>
                          <SelectItem value="oregon">Oregon</SelectItem>
                          <SelectItem value="pennsylvania">Pennsylvania</SelectItem>
                          <SelectItem value="rhode-island">Rhode Island</SelectItem>
                          <SelectItem value="south-carolina">South Carolina</SelectItem>
                          <SelectItem value="south-dakota">South Dakota</SelectItem>
                          <SelectItem value="tennessee">Tennessee</SelectItem>
                          <SelectItem value="utah">Utah</SelectItem>
                          <SelectItem value="vermont">Vermont</SelectItem>
                          <SelectItem value="virginia">Virginia</SelectItem>
                          <SelectItem value="washington">Washington</SelectItem>
                          <SelectItem value="west-virginia">West Virginia</SelectItem>
                          <SelectItem value="wisconsin">Wisconsin</SelectItem>
                          <SelectItem value="wyoming">Wyoming</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disabilityType">Disability Type</Label>
                  <Input
                    id="disabilityType"
                    placeholder="e.g., Deaf/Hard of Hearing, Visual Impairment, Mobility..."
                    value={clientProfile.disabilityType}
                    onChange={(e) => setClientProfile((prev) => ({ ...prev, disabilityType: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Technology, Healthcare, Consulting..."
                    value={clientProfile.industry}
                    onChange={(e) => setClientProfile((prev) => ({ ...prev, industry: e.target.value }))}
                  />
                </div>

                {clientProfile.serviceType === "vr-vendor" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="supportLevel">Support Level</Label>
                      <Select
                        value={clientProfile.supportLevel}
                        onValueChange={(value: "simple" | "comprehensive" | "supported") =>
                          setClientProfile((prev) => ({ ...prev, supportLevel: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select support level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple ($322 - $1,086)</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive ($551 - $1,608)</SelectItem>
                          <SelectItem value="supported">Supported Self-Employment ($153 - $3,032)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vrCounselor">VR Counselor</Label>
                      <Input
                        id="vrCounselor"
                        placeholder="Assigned VR counselor name"
                        value={clientProfile.vrCounselor}
                        onChange={(e) => setClientProfile((prev) => ({ ...prev, vrCounselor: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cbtacProvider">CBTAC Provider</Label>
                      <Input
                        id="cbtacProvider"
                        placeholder="Community-Based Technical Assistance Center"
                        value={clientProfile.cbtacProvider}
                        onChange={(e) => setClientProfile((prev) => ({ ...prev, cbtacProvider: e.target.value }))}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Small businesses, Students, Healthcare professionals..."
                    value={clientProfile.targetAudience}
                    onChange={(e) => setClientProfile((prev) => ({ ...prev, targetAudience: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessIdea">Business Idea Description</Label>
                <Textarea
                  id="businessIdea"
                  placeholder="Describe the client's business idea, goals, and vision..."
                  value={clientProfile.businessIdea}
                  onChange={(e) => setClientProfile((prev) => ({ ...prev, businessIdea: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodationNeeds">Accommodation Needs</Label>
                <Textarea
                  id="accommodationNeeds"
                  placeholder="Describe specific accommodations needed for the business..."
                  value={clientProfile.accommodationNeeds}
                  onChange={(e) => setClientProfile((prev) => ({ ...prev, accommodationNeeds: e.target.value }))}
                  rows={2}
                />
              </div>

              <Button
                onClick={generatePersonalizedPlan}
                disabled={!clientProfile.businessIdea.trim() || !clientProfile.clientName.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  "Generating Personalized Plan..."
                ) : (
                  <>
                    {clientProfile.serviceType === "vr-vendor" ? (
                      <Building2 className="h-4 w-4 mr-2" />
                    ) : (
                      <Bot className="h-4 w-4 mr-2" />
                    )}
                    Generate {clientProfile.serviceType === "vr-vendor" ? "VR Vendor" : "AI-Powered"} Plan
                  </>
                )}
              </Button>

              {hasGeneratedPlan && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Plan Generated Successfully!</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {getServiceTypeInfo()?.title} plan created for {clientProfile.clientName}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Overview */}
      {hasGeneratedPlan && (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold" id="overall-progress">
                {clientProfile.clientName}'s Progress
              </h2>
              {getServiceTypeInfo() && (
                <Badge className={cn("text-white", getServiceTypeInfo()!.color)}>
                  {getServiceTypeInfo()!.icon}
                  <span className="ml-2">{getServiceTypeInfo()!.title}</span>
                </Badge>
              )}
            </div>
            <div
              className="relative"
              aria-labelledby="overall-progress"
              role="progressbar"
              aria-valuenow={Math.round(calculateTotalProgress())}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <Progress value={calculateTotalProgress()} className="h-3" />
              <span className="sr-only">{Math.round(calculateTotalProgress())}% complete overall</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className="flex-1 min-w-[200px] opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${stage.color} text-white`} aria-hidden="true">
                          {stage.icon}
                        </div>
                        <CardTitle className="text-sm">{stage.name}</CardTitle>
                      </div>
                      <CardDescription className="text-xs">{stage.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        role="progressbar"
                        aria-label={`${stage.name} stage progress`}
                        aria-valuenow={Math.round(calculateProgress(stage))}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <Progress value={calculateProgress(stage)} className="h-2" />
                        <p className="text-xs text-right mt-1">{Math.round(calculateProgress(stage))}% complete</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Milestones */}
          <div className="relative">
            <Tabs defaultValue={stages[0]?.id} className="w-full">
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 pt-4 pb-2 border-b">
                <TabsList className={cn("grid mb-4", `grid-cols-${stages.length}`)} aria-label="Development stages">
                  {stages.map((stage) => (
                    <TabsTrigger
                      key={stage.id}
                      value={stage.id}
                      className="flex items-center gap-1 text-xs"
                      aria-controls={`panel-${stage.id}`}
                    >
                      <div className={`p-1 rounded-full ${stage.color} text-white`} aria-hidden="true">
                        {stage.icon}
                      </div>
                      {stage.name}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="vr-contacts" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    VR Contacts
                  </TabsTrigger>
                </TabsList>
              </div>

              <div id="stage-content" className="pt-4">
                {stages.map((stage) => (
                  <TabsContent
                    key={stage.id}
                    value={stage.id}
                    className="space-y-6"
                    role="tabpanel"
                    id={`panel-${stage.id}`}
                    aria-labelledby={`tab-${stage.id}`}
                  >
                    <div className="grid gap-6">
                      {stage.checkpoints.map((checkpoint, index) => (
                        <div
                          key={checkpoint.id}
                          className="opacity-0 animate-fade-in"
                          style={{
                            animationDelay: `${index * 0.1}s`,
                            animationFillMode: "forwards",
                          }}
                        >
                          <Card>
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <CardTitle id={`checkpoint-${checkpoint.id}`}>{checkpoint.title}</CardTitle>
                                {checkpoint.totalCost && (
                                  <Badge variant="outline" className="text-xs">
                                    Cost: {checkpoint.totalCost}
                                  </Badge>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {checkpoint.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer focus-within:ring-2 focus-within:ring-primary transition-colors"
                                  onClick={() => toggleItem(stage.id, checkpoint.id, item.id)}
                                  role="checkbox"
                                  aria-checked={item.completed}
                                  tabIndex={0}
                                  aria-labelledby={`item-${item.id}`}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault()
                                      toggleItem(stage.id, checkpoint.id, item.id)
                                    }
                                  }}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                      "h-6 w-6 rounded-full p-0",
                                      item.completed ? "text-green-500" : "text-gray-400",
                                    )}
                                    aria-hidden="true"
                                    tabIndex={-1}
                                  >
                                    {item.completed ? (
                                      <CheckCircle2 className="h-6 w-6" />
                                    ) : (
                                      <Circle className="h-6 w-6" />
                                    )}
                                  </Button>
                                  <div className="flex-1">
                                    <span
                                      id={`item-${item.id}`}
                                      className={cn(item.completed ? "line-through text-gray-500" : "")}
                                    >
                                      {item.text}
                                    </span>
                                    {item.cost && (
                                      <div className="text-xs text-muted-foreground mt-1">Cost: {item.cost}</div>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    {item.aiGenerated && (
                                      <Badge variant="secondary" className="text-xs">
                                        <Bot className="h-3 w-3 mr-1" />
                                        AI Generated
                                      </Badge>
                                    )}
                                    {item.vrApprovalRequired && (
                                      <Badge variant="secondary" className="text-xs">
                                        VR Approval Required
                                      </Badge>
                                    )}
                                    {item.completed && <Badge className="text-xs">Completed</Badge>}
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                            {checkpoint.nextAction && (
                              <CardFooter className="border-t pt-4">
                                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                  <span>Next Action: {checkpoint.nextAction}</span>
                                </div>
                              </CardFooter>
                            )}
                          </Card>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
                <TabsContent value="vr-contacts" className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">VR Office Contacts by State</h3>
                      <p className="text-muted-foreground">
                        Find your local Vocational Rehabilitation office for services and support
                      </p>
                    </div>
                    <VRContacts />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </>
      )}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements.length > 0 && announcements[announcements.length - 1]}
      </div>
    </div>
  )
}
