import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Users, Zap, CheckCircle, Clock, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import AutomationInfographic from "@/components/automation/infographic"

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4 bg-blue-600 text-white">
            <Bot className="h-4 w-4 mr-2" />
            AI-Powered Automation
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Automated VR Journey</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the future of vocational rehabilitation with our AI-powered automation system that matches deaf
            individuals with VR services in seconds, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="#start-journey">
                Start Your VR Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <CardTitle className="text-2xl">2.5 Seconds</CardTitle>
                <CardDescription>Average Processing Time</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <CardTitle className="text-2xl">95%</CardTitle>
                <CardDescription>Automation Success Rate</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <CardTitle className="text-2xl">1,247</CardTitle>
                <CardDescription>Users Matched This Month</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <CardTitle className="text-2xl">85%</CardTitle>
                <CardDescription>VR Approval Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Automation Infographic */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How AI Automation Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our 7-step automated process transforms the traditional VR journey from weeks to minutes
            </p>
          </div>
          <AutomationInfographic />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Automated VR Services?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 mb-2 text-blue-600" />
                <CardTitle>Instant Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No more waiting weeks for VR office responses. Our AI processes applications and matches you with
                  services in real-time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-8 w-8 mb-2 text-green-600" />
                <CardTitle>Perfect Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI analyzes your profile, location, and goals to find the best VR offices and services specifically
                  for deaf individuals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 mb-2 text-purple-600" />
                <CardTitle>Higher Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our automated system achieves 85% VR approval rates compared to 65% traditional application success
                  rates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-red-600" />
                <CardTitle>Deaf-Centered Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every automation step is designed with deaf culture and communication preferences in mind, ensuring
                  accessibility throughout.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Bot className="h-8 w-8 mb-2 text-yellow-600" />
                <CardTitle>24/7 Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start your VR journey anytime, anywhere. Our AI system works around the clock to process applications
                  and provide support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 mb-2 text-indigo-600" />
                <CardTitle>Continuous Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI improves with every interaction, becoming more accurate at matching and predicting successful
                  VR outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="start-journey" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Automated VR Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of deaf individuals who have successfully found employment through our AI-powered VR system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/#contact">
                Begin VR Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs/platform-overview">Learn More About VR4DEAF</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
