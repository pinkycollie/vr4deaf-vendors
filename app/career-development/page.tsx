"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar, Users, TrendingUp, BookOpen, CheckCircle, Clock, AlertTriangle, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"

export default function CareerDevelopmentPage() {
  const [activeTab, setActiveTab] = useState("checkins")

  const upcomingCheckins = [
    {
      id: "CHK-001",
      clientName: "Sarah Johnson",
      clientId: "VR-2024-001",
      type: "90-Day Review",
      scheduledDate: "2024-02-15",
      status: "scheduled",
      employer: "Austin Tech Solutions",
      position: "Software Developer",
      lastSalary: 68000,
      goals: ["Technical certification", "Team lead role"],
    },
    {
      id: "CHK-002",
      clientName: "Michael Chen",
      clientId: "VR-2024-002",
      type: "Quarterly Review",
      scheduledDate: "2024-02-18",
      status: "overdue",
      employer: "DataFlow Analytics",
      position: "Data Analyst",
      lastSalary: 58000,
      goals: ["Senior analyst promotion", "Python certification"],
    },
    {
      id: "CHK-003",
      clientName: "Emily Rodriguez",
      clientId: "VR-2024-003",
      type: "Annual Review",
      scheduledDate: "2024-02-20",
      status: "scheduled",
      employer: "Community Market",
      position: "Customer Service Associate",
      lastSalary: 34000,
      goals: ["Supervisor role", "Customer service certification"],
    },
  ]

  const mentorshipMatches = [
    {
      id: "MENTOR-001",
      mentee: "Sarah Johnson",
      mentor: "David Kim (Senior Developer)",
      program: "Tech Career Advancement",
      startDate: "2024-01-15",
      status: "active",
      meetingsCompleted: 3,
      nextMeeting: "2024-02-10",
      goals: ["Leadership skills", "Technical architecture"],
    },
    {
      id: "MENTOR-002",
      mentee: "Robert Taylor",
      mentor: "Lisa Chang (Business Owner)",
      program: "Entrepreneurship Support",
      startDate: "2024-01-08",
      status: "active",
      meetingsCompleted: 4,
      nextMeeting: "2024-02-12",
      goals: ["Business expansion", "Client acquisition"],
    },
    {
      id: "MENTOR-003",
      mentee: "Michael Chen",
      mentor: "James Wilson (Data Science Manager)",
      program: "Data Analytics Career Path",
      startDate: "2024-01-20",
      status: "pending",
      meetingsCompleted: 1,
      nextMeeting: "2024-02-08",
      goals: ["Advanced analytics", "Team management"],
    },
  ]

  const trainingModules = [
    {
      id: "TRAIN-001",
      title: "Salary Negotiation Fundamentals",
      description: "Learn the basics of salary negotiation for deaf professionals",
      duration: "2 hours",
      format: "ASL Video + Interactive",
      completionRate: 85,
      enrolledClients: 12,
      status: "active",
    },
    {
      id: "TRAIN-002",
      title: "Career Advancement Strategies",
      description: "Navigate workplace politics and advancement opportunities",
      duration: "3 hours",
      format: "Workshop + Mentoring",
      completionRate: 92,
      enrolledClients: 8,
      status: "active",
    },
    {
      id: "TRAIN-003",
      title: "Professional Communication in ASL",
      description: "Enhance professional communication skills in workplace settings",
      duration: "4 hours",
      format: "Interactive Sessions",
      completionRate: 78,
      enrolledClients: 15,
      status: "active",
    },
    {
      id: "TRAIN-004",
      title: "Leadership Development for Deaf Professionals",
      description: "Build leadership skills and confidence in management roles",
      duration: "6 hours",
      format: "Multi-session Program",
      completionRate: 88,
      enrolledClients: 6,
      status: "pilot",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "default"
      case "completed":
        return "outline"
      case "overdue":
        return "destructive"
      case "active":
        return "default"
      case "pending":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

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
              <Link href="/clients" className="text-gray-600 hover:text-blue-600">
                Clients
              </Link>
              <Link href="/career-development" className="text-blue-600 font-medium">
                Career Development
              </Link>
              <Link href="/outcomes" className="text-gray-600 hover:text-blue-600">
                Outcomes
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Career Development Hub</h1>
            <p className="text-gray-600 mt-2">
              Manage quarterly check-ins, mentorship programs, and career advancement training
            </p>
          </div>
          <Button asChild>
            <Link href="/career-development/schedule">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Check-in
            </Link>
          </Button>
        </div>

        {/* Alert for overdue check-ins */}
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Overdue Check-ins</AlertTitle>
          <AlertDescription>
            1 quarterly check-in is overdue. Please schedule immediately to maintain compliance.
            <Link href="/career-development/checkins" className="underline ml-1">
              View details
            </Link>
          </AlertDescription>
        </Alert>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Check-ins</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {upcomingCheckins.filter((c) => c.status === "scheduled").length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Mentorships</p>
                  <p className="text-3xl font-bold text-green-600">
                    {mentorshipMatches.filter((m) => m.status === "active").length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Training Enrollments</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {trainingModules.reduce((sum, module) => sum + module.enrolledClients, 0)}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Salary Growth</p>
                  <p className="text-3xl font-bold text-orange-600">12.8%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="checkins">Quarterly Check-ins</TabsTrigger>
            <TabsTrigger value="mentorship">Peer Mentorship</TabsTrigger>
            <TabsTrigger value="training">Training Programs</TabsTrigger>
            <TabsTrigger value="employer-education">Employer Education</TabsTrigger>
          </TabsList>

          <TabsContent value="checkins">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Career Development Check-ins</CardTitle>
                <CardDescription>
                  Track client progress and career advancement through regular check-ins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Check-in Type</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Current Position</TableHead>
                      <TableHead>Current Salary</TableHead>
                      <TableHead>Career Goals</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingCheckins.map((checkin) => (
                      <TableRow key={checkin.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{checkin.clientName}</div>
                            <div className="text-sm text-gray-500">{checkin.clientId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{checkin.type}</TableCell>
                        <TableCell>{new Date(checkin.scheduledDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{checkin.position}</div>
                            <div className="text-sm text-gray-500">{checkin.employer}</div>
                          </div>
                        </TableCell>
                        <TableCell>${checkin.lastSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {checkin.goals.map((goal, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(checkin.status)}
                            <Badge variant={getStatusColor(checkin.status)}>{checkin.status}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentorship">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Peer Mentorship Program</CardTitle>
                      <CardDescription>
                        Connect clients with experienced deaf professionals for career guidance
                      </CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/career-development/mentorship/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Match
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mentee</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Meetings</TableHead>
                        <TableHead>Next Meeting</TableHead>
                        <TableHead>Goals</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mentorshipMatches.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell className="font-medium">{match.mentee}</TableCell>
                          <TableCell>{match.mentor}</TableCell>
                          <TableCell>{match.program}</TableCell>
                          <TableCell>{new Date(match.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{match.meetingsCompleted} completed</TableCell>
                          <TableCell>{new Date(match.nextMeeting).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {match.goals.map((goal, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {goal}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(match.status)}>{match.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Mentors</CardTitle>
                    <CardDescription>Experienced professionals ready to mentor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Alex Thompson",
                          role: "Senior Software Engineer",
                          company: "Tech Corp",
                          expertise: "Software Development",
                        },
                        {
                          name: "Maria Santos",
                          role: "Marketing Director",
                          company: "Creative Agency",
                          expertise: "Marketing & Communications",
                        },
                        {
                          name: "Jordan Lee",
                          role: "Business Owner",
                          company: "Consulting Firm",
                          expertise: "Entrepreneurship",
                        },
                      ].map((mentor, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="font-medium">{mentor.name}</div>
                          <div className="text-sm text-gray-600">
                            {mentor.role} at {mentor.company}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {mentor.expertise}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mentorship Programs</CardTitle>
                    <CardDescription>Structured programs for different career paths</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Tech Career Advancement", participants: 8, duration: "6 months" },
                        { name: "Leadership Development", participants: 5, duration: "12 months" },
                        { name: "Entrepreneurship Support", participants: 3, duration: "9 months" },
                        { name: "Healthcare Professionals", participants: 4, duration: "6 months" },
                      ].map((program, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="font-medium">{program.name}</div>
                          <div className="text-sm text-gray-600">
                            {program.participants} participants • {program.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="training">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Career Development Training</CardTitle>
                      <CardDescription>Specialized training programs for career advancement</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/career-development/training/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Program
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trainingModules.map((module) => (
                      <Card key={module.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{module.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                            </div>
                            <Badge variant={module.status === "active" ? "default" : "secondary"}>
                              {module.status}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Duration:</span>
                              <span className="font-medium">{module.duration}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Format:</span>
                              <span className="font-medium">{module.format}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Enrolled Clients:</span>
                              <span className="font-medium">{module.enrolledClients}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Completion Rate:</span>
                              <span className="font-medium">{module.completionRate}%</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Edit className="w-4 h-4 mr-2" />
                                Manage
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salary Negotiation Training</CardTitle>
                  <CardDescription>Specialized program for salary negotiation skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Module 1: Preparation</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Market research techniques</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Value proposition development</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Documentation strategies</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Module 2: Communication</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>ASL negotiation techniques</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Written communication skills</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Interpreter coordination</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Module 3: Practice</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Role-playing scenarios</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Peer feedback sessions</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Real-world application</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employer-education">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employer Education Program</CardTitle>
                  <CardDescription>
                    Educate employers on advancement opportunities and career development for deaf employees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-700">Education Modules</h4>
                      <div className="space-y-3">
                        {[
                          { title: "Career Pathways for Deaf Employees", status: "active", participants: 15 },
                          { title: "Accommodation Strategies for Advancement", status: "active", participants: 12 },
                          { title: "Mentorship and Leadership Development", status: "pilot", participants: 8 },
                          { title: "Performance Evaluation Best Practices", status: "development", participants: 0 },
                        ].map((module, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{module.title}</div>
                                <div className="text-sm text-gray-600">{module.participants} employers enrolled</div>
                              </div>
                              <Badge variant={getStatusColor(module.status)}>{module.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-green-700">Success Stories</h4>
                      <div className="space-y-3">
                        {[
                          {
                            company: "Austin Tech Solutions",
                            outcome: "Promoted 2 deaf employees to senior roles",
                            impact: "40% salary increase",
                          },
                          {
                            company: "DataFlow Analytics",
                            outcome: "Created deaf-friendly advancement track",
                            impact: "3 new leadership positions",
                          },
                          {
                            company: "Regional Hospital",
                            outcome: "Implemented mentorship program",
                            impact: "85% retention rate",
                          },
                        ].map((story, index) => (
                          <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="font-medium text-green-900">{story.company}</div>
                            <div className="text-sm text-green-700">{story.outcome}</div>
                            <div className="text-xs text-green-600 mt-1">Impact: {story.impact}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employer Resources</CardTitle>
                  <CardDescription>Tools and resources for employers to support career advancement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Assessment Tools</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Career readiness evaluation</li>
                        <li>• Accommodation needs assessment</li>
                        <li>• Leadership potential screening</li>
                        <li>• Performance review templates</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Training Materials</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Manager training videos (ASL)</li>
                        <li>• Best practices guides</li>
                        <li>• Communication strategies</li>
                        <li>• Legal compliance resources</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Support Services</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Consultation sessions</li>
                        <li>• Workplace assessments</li>
                        <li>• Ongoing support calls</li>
                        <li>• Emergency assistance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
