import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TechCredits from "@/components/tech-credits"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Lightbulb, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About VR4DEAF | AI-Powered Platform for Deaf Community",
  description:
    "Learn how VR4DEAF leverages cutting-edge AI technology to revolutionize vocational rehabilitation services for deaf individuals across all 50 states.",
}

export default function AboutPage() {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Community First",
      description: "Every feature designed with the deaf community's unique needs and strengths in mind.",
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Employment Success",
      description: "Focused on measurable outcomes: job placement, business development, and career advancement.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-600" />,
      title: "AI Innovation",
      description: "Leveraging the latest AI technology to create intelligent, personalized experiences.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Accessibility",
      description: "ASL-first design ensuring every interaction is culturally competent and accessible.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Revolutionizing Vocational Rehabilitation with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Technology
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                VR4DEAF exists because revolutionary AI platforms like Vercel, ChatGPT, Claude AI, and Groq make it
                possible to build sophisticated solutions that serve the deaf community at unprecedented scale and
                speed.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To leverage cutting-edge AI technology to eliminate barriers in vocational rehabilitation, creating
                  seamless pathways to employment, self-employment, and business success for deaf individuals across all
                  50 states.
                </p>
                <p className="text-lg text-muted-foreground">
                  We believe that AI should amplify human potential, not replace it. VR4DEAF uses artificial
                  intelligence to enhance the expertise of VR counselors and empower deaf individuals with tools that
                  understand their unique strengths and needs.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {values.map((value, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="mb-2">{value.icon}</div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Credits */}
        <TechCredits />

        {/* Impact Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-6">The AI Advantage</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Traditional VR platforms take years to develop and struggle to scale. With AI-powered development, we've
                built a comprehensive platform in months, not years, enabling immediate impact for the deaf community.
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Job Placement Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50</div>
                  <div className="text-sm text-muted-foreground">States Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">AI Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
