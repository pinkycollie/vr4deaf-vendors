import { LayoutDashboard, Database, Bot, Shield, CreditCard, Video, Code, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Technical Implementation | VR4DEAF Documentation",
  description: "Comprehensive technical architecture and technology stack documentation for VR4DEAF",
}

export default function TechnicalImplementationPage() {
  const techCategories = [
    {
      id: "frontend",
      icon: <Globe className="h-5 w-5" />,
      name: "Frontend",
      description: "User Interface & Experience",
      color: "bg-green-500",
      technologies: [
        "Component-based UI framework",
        "Static site generation & server-side rendering",
        "CSS utility-first framework for styling",
        "Client-side routing system",
        "Headless authentication system",
        "API client for data fetching",
        "Web animation library",
      ],
    },
    {
      id: "backend",
      icon: <Code className="h-5 w-5" />,
      name: "Backend",
      description: "Data Processing & Business Logic",
      color: "bg-orange-500",
      technologies: [
        "Serverless cloud functions",
        "ORM for database management",
        "Schema migration tool",
        "API gateway & request handling",
        "Caching system",
        "Event-driven task processing",
        "Load balancing & rate limiting",
      ],
    },
    {
      id: "database",
      icon: <Database className="h-5 w-5" />,
      name: "Database & Storage",
      description: "Data Management & Storage Solutions",
      color: "bg-yellow-500",
      technologies: [
        "Serverless relational database",
        "Object storage for files, videos, and documents",
        "Realtime synchronization service",
        "Edge caching & content delivery network",
        "AI-powered query optimization",
      ],
    },
    {
      id: "ai",
      icon: <Bot className="h-5 w-5" />,
      name: "AI & Automation",
      description: "Intelligent Systems & Automation",
      color: "bg-purple-500",
      technologies: [
        "Large language model API",
        "AI-powered document processing",
        "Chatbot framework",
        "AI-based recommendation engine",
        "Speech-to-text and text-to-speech APIs",
        "Automated workflow engine",
      ],
    },
    {
      id: "coaching",
      icon: <Video className="h-5 w-5" />,
      name: "Job Coaching",
      description: "VR Business Management Tools",
      color: "bg-blue-500",
      technologies: [
        "Secure document sharing & collaboration",
        "Real-time presence & co-editing system",
        "Cloud-based video hosting & live streaming",
        "Digital signature & document verification",
        "Virtual meeting & remote coaching system",
      ],
    },
    {
      id: "payments",
      icon: <CreditCard className="h-5 w-5" />,
      name: "Payments",
      description: "Financial Tools & Processing",
      color: "bg-orange-500",
      technologies: [
        "API for handling business transactions",
        "Subscription billing & invoicing",
        "Smart contract & blockchain integration",
        "Automated tax calculation & reporting",
      ],
    },
    {
      id: "security",
      icon: <Shield className="h-5 w-5" />,
      name: "Security",
      description: "Compliance & Data Protection",
      color: "bg-yellow-500",
      technologies: [
        "Identity verification & authentication framework",
        "Data encryption & privacy management",
        "Audit logging & compliance tracking",
        "Multi-factor authentication system",
      ],
    },
    {
      id: "devops",
      icon: <LayoutDashboard className="h-5 w-5" />,
      name: "DevOps",
      description: "Development & Operations",
      color: "bg-purple-500",
      technologies: [
        "Version control & repository hosting",
        "Continuous integration & deployment system",
        "API testing & debugging tools",
        "Infrastructure as code deployment framework",
        "Logging & monitoring dashboard",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Technical Implementation</h1>
        <p className="text-lg text-muted-foreground max-w-4xl">
          Comprehensive overview of the VR4DEAF platform's technical architecture, built with cutting-edge technologies
          to provide a seamless experience for deaf users.
        </p>
      </div>

      <Tabs defaultValue="frontend" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
          {techCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex flex-col items-center gap-1 py-3">
              <span className={`p-1.5 rounded-full ${category.color.replace("bg-", "bg-opacity-20 text-")}`}>
                {category.icon}
              </span>
              <span className="text-xs">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {techCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`p-2 rounded-full ${category.color}`}>{category.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.technologies.map((tech, index) => (
                    <div key={index} className="bg-muted/50 p-4 rounded-lg">
                      <p>{tech}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Architecture Overview</h2>
        <p className="text-muted-foreground mb-4">
          Our comprehensive tech stack ensures that VR4DEAF delivers a powerful, accessible, and secure platform for
          deaf individuals seeking employment and business growth. The architecture is designed with scalability,
          security, and accessibility as core principles.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-2">Key Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Serverless architecture for scalability</li>
              <li>• AI-powered automation and assistance</li>
              <li>• Full accessibility compliance</li>
              <li>• Real-time collaboration tools</li>
              <li>• Secure data handling and privacy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Integration Points</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Vocational Rehabilitation systems</li>
              <li>• MBTQ Universe AI plugins</li>
              <li>• Texas Workforce Commission APIs</li>
              <li>• Third-party business services</li>
              <li>• Accessibility tools and services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
