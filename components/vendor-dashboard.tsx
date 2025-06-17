"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, DollarSign, Search, Plus, AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

type ClientStatus = "assessment" | "planning" | "startup" | "operations" | "closure" | "completed"

type Client = {
  id: string
  name: string
  state: "texas" | "florida"
  disabilityType: string
  businessType: string
  status: ClientStatus
  progress: number
  vrCounselor: string
  startDate: string
  nextMilestone: string
  totalBilled: number
  pendingPayment: number
  lastActivity: string
  supportLevel: "simple" | "comprehensive" | "supported"
}

type VendorStats = {
  totalClients: number
  activeClients: number
  completedClients: number
  totalRevenue: number
  pendingRevenue: number
  avgCompletionTime: number
}

export default function VendorDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Mock data - in real app, this would come from API
  const vendorStats: VendorStats = {
    totalClients: 47,
    activeClients: 23,
    completedClients: 24,
    totalRevenue: 156780,
    pendingRevenue: 12450,
    avgCompletionTime: 18.5,
  }

  const clients: Client[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      state: "texas",
      disabilityType: "Deaf/Hard of Hearing",
      businessType: "Digital Marketing Consultancy",
      status: "planning",
      progress: 35,
      vrCounselor: "Maria Rodriguez",
      startDate: "2024-01-15",
      nextMilestone: "Business Plan Development",
      totalBilled: 2850,
      pendingPayment: 1608,
      lastActivity: "2024-01-20",
      supportLevel: "comprehensive",
    },
    {
      id: "2",
      name: "Michael Chen",
      state: "florida",
      disabilityType: "Visual Impairment",
      businessType: "Accessible Web Development",
      status: "operations",
      progress: 78,
      vrCounselor: "James Wilson",
      startDate: "2023-09-10",
      nextMilestone: "Business Stability Review",
      totalBilled: 8950,
      pendingPayment: 0,
      lastActivity: "2024-01-18",
      supportLevel: "supported",
    },
    {
      id: "3",
      name: "Ashley Martinez",
      state: "texas",
      disabilityType: "Deaf/Hard of Hearing",
      businessType: "ASL Interpretation Services",
      status: "assessment",
      progress: 15,
      vrCounselor: "David Thompson",
      startDate: "2024-01-22",
      nextMilestone: "Self-Employment Assessment",
      totalBilled: 322,
      pendingPayment: 919,
      lastActivity: "2024-01-22",
      supportLevel: "simple",
    },
    {
      id: "4",
      name: "Robert Kim",
      state: "florida",
      disabilityType: "Mobility Impairment",
      businessType: "E-commerce Platform",
      status: "startup",
      progress: 52,
      vrCounselor: "Lisa Anderson",
      startDate: "2023-11-05",
      nextMilestone: "Business Launch Preparation",
      totalBilled: 4200,
      pendingPayment: 2021,
      lastActivity: "2024-01-19",
      supportLevel: "comprehensive",
    },
  ]

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.vrCounselor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: ClientStatus) => {
    switch (status) {
      case "assessment":
        return "bg-blue-500"
      case "planning":
        return "bg-yellow-500"
      case "startup":
        return "bg-purple-500"
      case "operations":
        return "bg-orange-500"
      case "closure":
        return "bg-red-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: ClientStatus) => {
    switch (status) {
      case "assessment":
        return "Assessment"
      case "planning":
        return "Planning"
      case "startup":
        return "Startup"
      case "operations":
        return "Operations"
      case "closure":
        return "Closure"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  const getSupportLevelColor = (level: string) => {
    switch (level) {
      case "simple":
        return "bg-green-100 text-green-800"
      case "comprehensive":
        return "bg-blue-100 text-blue-800"
      case "supported":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">VR Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage your VR self-employment clients and track compliance</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {vendorStats.activeClients} active, {vendorStats.completedClients} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${vendorStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">${vendorStats.pendingRevenue.toLocaleString()} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.avgCompletionTime} months</div>
            <p className="text-xs text-muted-foreground">From start to closure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Clients reaching stability</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clients">Client Management</TabsTrigger>
          <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Filter by State</Button>
          </div>

          {/* Client List */}
          <div className="grid gap-4">
            {filteredClients.map((client) => (
              <Card
                key={client.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedClient?.id === client.id ? "ring-2 ring-primary" : "",
                )}
                onClick={() => setSelectedClient(client)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>{client.businessType}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-white", getStatusColor(client.status))}>
                        {getStatusText(client.status)}
                      </Badge>
                      <Badge variant="outline" className={getSupportLevelColor(client.supportLevel)}>
                        {client.supportLevel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Progress</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={client.progress} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{client.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">VR Counselor</p>
                      <p className="text-sm text-muted-foreground">{client.vrCounselor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Next Milestone</p>
                      <p className="text-sm text-muted-foreground">{client.nextMilestone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Billing Status</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">${client.totalBilled.toLocaleString()}</span>
                        {client.pendingPayment > 0 && (
                          <Badge variant="outline" className="text-xs">
                            ${client.pendingPayment} pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Overview</CardTitle>
              <CardDescription>Track payments and milestone-based billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Paid Invoices</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mt-2">$144,330</p>
                    <p className="text-sm text-muted-foreground">42 invoices</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Pending Payment</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600 mt-2">$12,450</p>
                    <p className="text-sm text-muted-foreground">8 invoices</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Overdue</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 mt-2">$0</p>
                    <p className="text-sm text-muted-foreground">0 invoices</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Dashboard</CardTitle>
              <CardDescription>VR compliance tracking and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Compliant Cases</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mt-2">21/23</p>
                    <p className="text-sm text-muted-foreground">91% compliance rate</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Needs Attention</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600 mt-2">2</p>
                    <p className="text-sm text-muted-foreground">Missing documentation</p>
                  </div>
                </div>
                <Button className="w-full">Generate Compliance Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>VR Office Contacts</CardTitle>
                <CardDescription>Quick access to VR counselors and offices</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View VR Directory
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fee Schedule</CardTitle>
                <CardDescription>Current VR vendor fee structure</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Download Fee Schedule
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Forms & Templates</CardTitle>
                <CardDescription>VR compliance forms and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Access Forms Library
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Training Resources</CardTitle>
                <CardDescription>CBTAC training and certification materials</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Training Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
