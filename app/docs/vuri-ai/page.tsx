import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Brain, Puzzle, Zap } from "lucide-react"

export const metadata = {
  title: "Vuri AI System | VR4DEAF Documentation",
  description: "Documentation for the Vuri AI assistant and MBTQ Universe integration",
}

export default function VuriAiPage() {
  const capabilities = [
    {
      title: "Natural Language Processing",
      description: "Advanced NLP for understanding user queries in multiple contexts",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "VR Knowledge Base",
      description: "Comprehensive knowledge of vocational rehabilitation processes and funding",
      icon: <Bot className="h-6 w-6" />,
    },
    {
      title: "Office Location Services",
      description: "Real-time location-based VR office finding and contact information",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "MBTQ Universe Integration",
      description: "Seamless integration with MBTQ Universe plugins for extended functionality",
      icon: <Puzzle className="h-6 w-6" />,
    },
  ]

  const plugins = [
    {
      name: "Business Formation Assistant",
      description: "Automated LLC creation, EIN registration, and business licensing",
      category: "Business Services",
    },
    {
      name: "Resume Builder AI",
      description: "AI-powered resume creation and optimization for deaf job seekers",
      category: "Employment",
    },
    {
      name: "VR Funding Calculator",
      description: "Calculate potential VR funding amounts based on user needs",
      category: "Funding",
    },
    {
      name: "ASL Resource Finder",
      description: "Locate ASL interpreters and accessibility resources",
      category: "Accessibility",
    },
    {
      name: "Job Matching Engine",
      description: "AI-powered job matching based on skills and accommodations",
      category: "Employment",
    },
    {
      name: "Business Plan Generator",
      description: "Automated business plan creation with financial projections",
      category: "Business Services",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Vuri AI System</h1>
        <p className="text-lg text-muted-foreground">
          Vuri is the AI core of VR4DEAF, designed specifically to assist deaf individuals with vocational
          rehabilitation services, employment, and business development.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>
            Vuri serves as the central AI assistant, integrating multiple AI models and plugins from the MBTQ Universe
            to provide comprehensive support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Vuri AI system is built on a modular architecture that allows for seamless integration of specialized AI
            models and services. It serves as the primary interface between users and the complex ecosystem of
            vocational rehabilitation services, making them accessible and easy to navigate for deaf individuals.
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Core Capabilities</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{capability.icon}</div>
                  <CardTitle className="text-lg">{capability.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{capability.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">MBTQ Universe Plugins</h2>
        <p className="text-muted-foreground mb-6">
          Vuri integrates with various AI models and services from the MBTQ Universe to provide specialized
          functionality for different aspects of vocational rehabilitation and business development.
        </p>
        <div className="grid gap-4">
          {plugins.map((plugin, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{plugin.name}</CardTitle>
                    <CardDescription>{plugin.description}</CardDescription>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{plugin.category}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Architecture</CardTitle>
          <CardDescription>How Vuri integrates with the broader VR4DEAF ecosystem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Plugin System</h4>
              <p className="text-sm text-muted-foreground">
                Vuri uses a plugin-based architecture that allows for dynamic loading of AI models and services from the
                MBTQ Universe. This enables the system to provide specialized functionality while maintaining a
                consistent user interface.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Context Awareness</h4>
              <p className="text-sm text-muted-foreground">
                The AI system maintains context about user interactions, preferences, and VR status to provide
                personalized recommendations and assistance throughout the user journey.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Accessibility Integration</h4>
              <p className="text-sm text-muted-foreground">
                Vuri is designed with accessibility as a core principle, providing multiple interaction modes and
                ensuring compatibility with assistive technologies commonly used by deaf individuals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
