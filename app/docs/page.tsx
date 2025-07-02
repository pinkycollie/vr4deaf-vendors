import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Bot } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Documentation | VR4DEAF",
  description: "Technical documentation for the VR4DEAF platform",
}

export default function DocsPage() {
  const sections = [
    {
      title: "Technical Implementation",
      description: "Comprehensive overview of the VR4DEAF platform's technical architecture and technology stack",
      icon: <Code className="h-6 w-6" />,
      href: "/docs/technical-implementation",
    },
    {
      title: "API Reference",
      description: "Complete API documentation for integrating with VR4DEAF services and data",
      icon: <Database className="h-6 w-6" />,
      href: "/docs/api-reference",
    },
    {
      title: "Vuri AI System",
      description: "Documentation for the Vuri AI assistant and its integration with MBTQ Universe plugins",
      icon: <Bot className="h-6 w-6" />,
      href: "/docs/vuri-ai",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">VR4DEAF Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the VR4DEAF technical documentation. Here you'll find comprehensive information about our
          platform's architecture, APIs, and AI systems.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <Link key={index} href={section.href}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{section.icon}</div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-muted/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">About VR4DEAF</h2>
        <p className="text-muted-foreground mb-4">
          VR4DEAF is an AI-powered vocational rehabilitation platform designed specifically for deaf communities. Our
          platform integrates cutting-edge technologies to provide employment, self-employment, and small business
          services with full accessibility support.
        </p>
        <p className="text-muted-foreground">
          The platform is backed by 360° Magicians and incorporates Vuri as the AI core, with plugins from the MBTQ
          Universe to enhance functionality and provide intelligent automation capabilities.
        </p>
      </div>
    </div>
  )
}
