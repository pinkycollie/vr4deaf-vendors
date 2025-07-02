"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Cloud, Zap, Code, Brain, Sparkles } from "lucide-react"

export default function TechCredits() {
  const technologies = [
    {
      name: "Vercel",
      description: "Edge computing platform enabling global deployment and performance",
      icon: <Cloud className="h-6 w-6" />,
      category: "Infrastructure",
      contribution: "Hosting, CDN, and serverless functions for 50-state deployment",
    },
    {
      name: "ChatGPT",
      description: "AI language model powering intelligent conversations and content generation",
      icon: <Bot className="h-6 w-6" />,
      category: "AI Platform",
      contribution: "Natural language processing and AI-powered user interactions",
    },
    {
      name: "Claude AI",
      description: "Advanced AI assistant enabling complex reasoning and development",
      icon: <Brain className="h-6 w-6" />,
      category: "AI Platform",
      contribution: "Platform architecture, automation logic, and intelligent workflows",
    },
    {
      name: "Groq",
      description: "Ultra-fast AI inference for real-time resume optimization",
      icon: <Zap className="h-6 w-6" />,
      category: "AI Inference",
      contribution: "Lightning-fast AI resume building and content optimization",
    },
    {
      name: "Next.js",
      description: "React framework enabling modern web application development",
      icon: <Code className="h-6 w-6" />,
      category: "Framework",
      contribution: "Full-stack application framework with SSR and API routes",
    },
    {
      name: "AI SDK",
      description: "Unified AI integration enabling multi-model AI capabilities",
      icon: <Sparkles className="h-6 w-6" />,
      category: "AI Integration",
      contribution: "Seamless integration of multiple AI models and providers",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Powered by Cutting-Edge AI Technology</h2>
          <p className="text-lg text-muted-foreground">
            VR4DEAF exists because of revolutionary AI platforms that enable rapid development of complex, intelligent
            applications serving the deaf community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{tech.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {tech.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm">{tech.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tech.contribution}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">The AI Revolution in Vocational Rehabilitation</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              VR4DEAF represents what's possible when cutting-edge AI technology meets human-centered design. These
              platforms enable us to build sophisticated solutions that would have taken years to develop, now created
              in months to serve the deaf community immediately.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge variant="secondary">AI-First Development</Badge>
              <Badge variant="secondary">Rapid Prototyping</Badge>
              <Badge variant="secondary">Global Scale</Badge>
              <Badge variant="secondary">Community Impact</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
