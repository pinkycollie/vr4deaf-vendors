"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Video, Users, CheckCircle, Play, Download, Calculator } from "lucide-react"
import Link from "next/link"

export default function SalaryNegotiationPage() {
  const [currentSalary, setCurrentSalary] = useState("")
  const [targetSalary, setTargetSalary] = useState("")
  const [position, setPosition] = useState("")
  const [experience, setExperience] = useState("")
  const [calculationResults, setCalculationResults] = useState<any>(null)

  const trainingModules = [
    {
      id: 1,
      title: "Market Research & Preparation",
      description: "Learn how to research salary ranges and prepare your case",
      duration: "45 minutes",
      format: "ASL Video + Worksheets",
      completed: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Building Your Value Proposition",
      description: "Document your achievements and quantify your contributions",
      duration: "60 minutes",
      format: "Interactive Workshop",
      completed: true,
      progress: 100,
    },
    {
      id: 3,
      title: "Communication Strategies for Deaf Professionals",
      description: "Effective negotiation techniques using ASL and written communication",
      duration: "90 minutes",
      format: "ASL Video + Practice Sessions",
      completed: false,
      progress: 65,
    },
    {
      id: 4,
      title: "Role-Playing and Practice",
      description: "Practice negotiation scenarios with peer feedback",
      duration: "120 minutes",
      format: "Group Sessions",
      completed: false,
      progress: 0,
    },
  ]

  const calculateSalaryRange = () => {
    if (!currentSalary || !position || !experience) return

    const current = Number.parseFloat(currentSalary)
    const expYears = Number.parseInt(experience)

    // Mock calculation based on position and experience
    const marketAdjustment = {
      "software-developer": { min: 1.15, max: 1.35 },
      "data-analyst": { min: 1.1, max: 1.25 },
      "project-manager": { min: 1.2, max: 1.4 },
      designer: { min: 1.12, max: 1.28 },
      other: { min: 1.08, max: 1.22 },
    }

    const adjustment = marketAdjustment[position as keyof typeof marketAdjustment] || marketAdjustment.other
    const experienceBonus = Math.min(expYears * 0.02, 0.15) // 2% per year, max 15%

    const minSalary = current * (adjustment.min + experienceBonus)
    const maxSalary = current * (adjustment.max + experienceBonus)
    const recommendedTarget = current * ((adjustment.min + adjustment.max) / 2 + experienceBonus)

    setCalculationResults({
      current,
      minSalary: Math.round(minSalary),
      maxSalary: Math.round(maxSalary),
      recommendedTarget: Math.round(recommendedTarget),
      increasePercentage: Math.round(((recommendedTarget - current) / current) * 100),
    })
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
              <Link href="/career-development" className="text-gray-600 hover:text-blue-600">
                Career Development
              </Link>
              <Link href="/salary-negotiation" className="text-blue-600 font-medium">
                Salary Negotiation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Salary Negotiation Training</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive training program for deaf professionals to master salary negotiation skills
          </p>
        </div>

        <Tabs defaultValue="training" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="training">Training Modules</TabsTrigger>
            <TabsTrigger value="calculator">Salary Calculator</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="practice">Practice Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="training">
            <div className="space-y-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                  <CardDescription>Complete all modules to master salary negotiation skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {trainingModules.filter((m) => m.completed).length}/{trainingModules.length}
                      </div>
                      <div className="text-sm text-blue-700">Modules Completed</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(trainingModules.reduce((sum, m) => sum + m.progress, 0) / trainingModules.length)}%
                      </div>
                      <div className="text-sm text-green-700">Overall Progress</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {trainingModules.reduce((sum, m) => sum + Number.parseInt(m.duration), 0)}
                      </div>
                      <div className="text-sm text-purple-700">Total Minutes</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">ASL</div>
                      <div className="text-sm text-orange-700">Accessible Format</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {trainingModules.map((module) => (
                      <Card key={module.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h4 className="font-semibold text-lg">{module.title}</h4>
                                {module.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                              </div>
                              <p className="text-gray-600 mt-1">{module.description}</p>
                            </div>
                            <Badge variant={module.completed ? "default" : "secondary"}>
                              {module.completed ? "Completed" : "In Progress"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{module.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Video className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{module.format}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">Progress: {module.progress}%</span>
                            </div>
                          </div>

                          <Progress value={module.progress} className="mb-4" />

                          <div className="flex space-x-2">
                            <Button size="sm" variant={module.completed ? "outline" : "default"}>
                              <Play className="w-4 h-4 mr-2" />
                              {module.completed ? "Review" : "Continue"}
                            </Button>
                            {module.completed && (
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Certificate
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calculator">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Salary Range Calculator</CardTitle>
                  <CardDescription>Calculate your target salary range based on market data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentSalary">Current Salary</Label>
                    <Input
                      id="currentSalary"
                      type="number"
                      placeholder="65000"
                      value={currentSalary}
                      onChange={(e) => setCurrentSalary(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position Type</Label>
                    <Select value={position} onValueChange={setPosition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-developer">Software Developer</SelectItem>
                        <SelectItem value="data-analyst">Data Analyst</SelectItem>
                        <SelectItem value="project-manager">Project Manager</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="5"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetSalary">Desired Salary (Optional)</Label>
                    <Input
                      id="targetSalary"
                      type="number"
                      placeholder="75000"
                      value={targetSalary}
                      onChange={(e) => setTargetSalary(e.target.value)}
                    />
                  </div>

                  <Button onClick={calculateSalaryRange} className="w-full">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Range
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                  <CardDescription>Your personalized salary negotiation range</CardDescription>
                </CardHeader>
                <CardContent>
                  {calculationResults ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600">Current Salary</div>
                          <div className="text-2xl font-bold">${calculationResults.current.toLocaleString()}</div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-blue-600">Recommended Target</div>
                          <div className="text-2xl font-bold text-blue-700">
                            ${calculationResults.recommendedTarget.toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-600">
                            +{calculationResults.increasePercentage}% increase
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-sm text-green-600">Minimum Range</div>
                            <div className="text-lg font-bold text-green-700">
                              ${calculationResults.minSalary.toLocaleString()}
                            </div>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-sm text-purple-600">Maximum Range</div>
                            <div className="text-lg font-bold text-purple-700">
                              ${calculationResults.maxSalary.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Negotiation Strategy</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>
                              Start with your maximum range (${calculationResults.maxSalary.toLocaleString()})
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>
                              Be prepared to settle at your target ($
                              {calculationResults.recommendedTarget.toLocaleString()})
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>
                              Don't accept below your minimum (${calculationResults.minSalary.toLocaleString()})
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Enter your information to calculate your salary range</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Negotiation Templates</CardTitle>
                  <CardDescription>Ready-to-use templates for salary discussions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: "Initial Salary Request Email", type: "Email Template" },
                      { title: "Counter-Offer Response", type: "Email Template" },
                      { title: "Performance Review Prep", type: "Worksheet" },
                      { title: "Achievement Documentation", type: "Worksheet" },
                      { title: "Market Research Guide", type: "Guide" },
                    ].map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-gray-600">{resource.type}</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ASL Resources</CardTitle>
                  <CardDescription>Video resources in American Sign Language</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: "Salary Negotiation in ASL", duration: "15 min", views: 234 },
                      { title: "Professional Communication Tips", duration: "12 min", views: 189 },
                      { title: "Interview Preparation", duration: "20 min", views: 156 },
                      { title: "Workplace Advocacy", duration: "18 min", views: 203 },
                    ].map((video, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Video className="h-8 w-8 text-blue-500" />
                          <div>
                            <div className="font-medium">{video.title}</div>
                            <div className="text-sm text-gray-600">
                              {video.duration} • {video.views} views
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Watch
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Data</CardTitle>
                  <CardDescription>Current salary ranges for deaf professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { position: "Software Developer", range: "$65K - $95K", growth: "+8%" },
                      { position: "Data Analyst", range: "$55K - $75K", growth: "+12%" },
                      { position: "Project Manager", range: "$70K - $100K", growth: "+6%" },
                      { position: "UX Designer", range: "$60K - $85K", growth: "+10%" },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{data.position}</div>
                          <div className="text-sm text-gray-600">{data.range}</div>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          {data.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                  <CardDescription>Real negotiation successes from deaf professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah J.", increase: "22%", role: "Software Developer" },
                      { name: "Michael C.", increase: "18%", role: "Data Analyst" },
                      { name: "Emily R.", increase: "15%", role: "Team Lead" },
                    ].map((story, index) => (
                      <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-green-900">{story.name}</div>
                            <div className="text-sm text-green-700">{story.role}</div>
                          </div>
                          <Badge variant="default" className="bg-green-600">
                            +{story.increase}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="practice">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Sessions</CardTitle>
                  <CardDescription>Role-play scenarios to practice your negotiation skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Annual Review Negotiation",
                        description: "Practice negotiating during your annual performance review",
                        difficulty: "Beginner",
                        duration: "30 minutes",
                      },
                      {
                        title: "Job Offer Counter-Negotiation",
                        description: "Learn to counter a job offer professionally",
                        difficulty: "Intermediate",
                        duration: "45 minutes",
                      },
                      {
                        title: "Promotion Salary Discussion",
                        description: "Navigate salary discussions when being promoted",
                        difficulty: "Advanced",
                        duration: "60 minutes",
                      },
                      {
                        title: "Remote Work Compensation",
                        description: "Negotiate compensation for remote work arrangements",
                        difficulty: "Intermediate",
                        duration: "40 minutes",
                      },
                    ].map((session, index) => (
                      <Card key={index} className="border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold">{session.title}</h4>
                              <p className="text-sm text-gray-600">{session.description}</p>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <Badge variant="outline">{session.difficulty}</Badge>
                              <span className="text-gray-600">{session.duration}</span>
                            </div>
                            <Button size="sm" className="w-full">
                              <Users className="w-4 h-4 mr-2" />
                              Start Practice Session
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peer Feedback Sessions</CardTitle>
                  <CardDescription>Get feedback from other deaf professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Upcoming Group Session</h4>
                      <div className="text-sm text-blue-800">
                        <p>Date: February 15, 2024 at 2:00 PM</p>
                        <p>Format: ASL Video Conference</p>
                        <p>Participants: 6 professionals</p>
                        <p>Focus: Counter-offer strategies</p>
                      </div>
                      <Button size="sm" className="mt-3">
                        Join Session
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">One-on-One Coaching</div>
                        <div className="text-sm text-gray-600">Personal coaching with experienced negotiators</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Schedule Session
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Peer Review</div>
                        <div className="text-sm text-gray-600">Get feedback on your negotiation approach</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Request Review
                        </Button>
                      </div>
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
