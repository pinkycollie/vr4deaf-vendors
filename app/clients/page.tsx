"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Plus, Eye, Edit, FileText, CalendarDays } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Clock } from "lucide-react"

export default function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const clients = [
    {
      id: "VR-2024-001",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      disability: "Deaf/Hard of Hearing",
      services: ["ASL Interpretation", "Job Coaching"],
      status: "active",
      startDate: "2024-01-15",
      counselor: "Maria Rodriguez",
      lastContact: "2024-01-20",
      progress: "On Track",
    },
    {
      id: "VR-2024-002",
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 234-5678",
      disability: "Visual Impairment",
      services: ["Assistive Technology", "Skills Training"],
      status: "pending",
      startDate: "2024-01-10",
      counselor: "James Wilson",
      lastContact: "2024-01-18",
      progress: "Assessment Phase",
    },
    {
      id: "VR-2024-003",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "(555) 345-6789",
      disability: "Intellectual Disability",
      services: ["Supported Employment"],
      status: "completed",
      startDate: "2023-11-01",
      counselor: "David Kim",
      lastContact: "2024-01-05",
      progress: "Successfully Employed",
    },
    {
      id: "VR-2024-004",
      name: "Robert Taylor",
      email: "r.taylor@email.com",
      phone: "(555) 456-7890",
      disability: "Deaf/Hard of Hearing",
      services: ["Self-Employment Services", "Business Planning"],
      status: "active",
      startDate: "2024-01-08",
      counselor: "Lisa Chang",
      lastContact: "2024-01-19",
      progress: "Business Development",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "on-hold":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-900">
                VR4Deaf Vendor Portal
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/applications" className="text-gray-600 hover:text-blue-600">
                Applications
              </Link>
              <Link href="/clients" className="text-blue-600 font-medium">
                Clients
              </Link>
              <Link href="/reports" className="text-gray-600 hover:text-blue-600">
                Reports
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600 mt-2">Manage your VR clients and track their progress</p>
          </div>
          {/* Client Update Alerts */}
          <div className="space-y-4 mb-8">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertTitle>Progress Reviews Due</AlertTitle>
              <AlertDescription>
                3 clients have 60-day progress reviews due this week.
                <Link href="/clients?filter=reviews-due" className="underline ml-1">
                  View pending reviews
                </Link>
              </AlertDescription>
            </Alert>
          </div>
          <Button asChild>
            <Link href="/clients/new">
              <Plus className="w-4 h-4 mr-2" />
              Add New Client
            </Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search clients by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Client List ({filteredClients.length})</CardTitle>
                <CardDescription>Overview of all clients and their current status</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <CalendarDays className="w-4 h-4 mr-2" />
                Export Review Dates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Disability</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>VR Counselor</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{client.disability}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {client.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {client.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{client.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(client.status)}>{client.status}</Badge>
                    </TableCell>
                    <TableCell>{client.progress}</TableCell>
                    <TableCell>{client.counselor}</TableCell>
                    <TableCell>{client.lastContact}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" title="Add Review Date to Calendar">
                          <CalendarDays className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
