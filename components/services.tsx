import { Bot, Briefcase, Building, GraduationCap, Users, Zap, Shield, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Services() {
  const vrServices = [
    {
      icon: <Briefcase className="h-8 w-8 text-texas-blue-600" />,
      title: "Job Placement Services",
      description: "AI-powered job matching with deaf-friendly employers and comprehensive placement support.",
      features: ["Smart job matching", "Interview preparation", "Workplace accommodations", "Follow-up support"],
      vrFunded: true,
      category: "Employment",
    },
    {
      icon: <Building className="h-8 w-8 text-texas-red-600" />,
      title: "Self-Employment Support",
      description: "Complete business startup assistance with VR funding optimization and compliance tracking.",
      features: ["Business plan development", "Funding applications", "Legal compliance", "Mentorship programs"],
      vrFunded: true,
      category: "Entrepreneurship",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      title: "Skills Training & Certification",
      description: "Industry-recognized training programs designed for deaf learners with ASL support.",
      features: ["Technical certifications", "Soft skills training", "Digital literacy", "Career advancement"],
      vrFunded: true,
      category: "Education",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "VR Counselor Collaboration",
      description: "Seamless integration with VR counselors for coordinated service delivery and progress tracking.",
      features: ["Real-time progress sharing", "Collaborative planning", "Outcome tracking", "Compliance reporting"],
      vrFunded: false,
      category: "Coordination",
    },
    {
      icon: <Bot className="h-8 w-8 text-orange-600" />,
      title: "AI-Powered Career Guidance",
      description: "Personalized career pathways using AI analysis of skills, interests, and market opportunities.",
      features: ["Career assessments", "Pathway recommendations", "Market analysis", "Goal setting"],
      vrFunded: false,
      category: "AI Services",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Workplace Rights & Advocacy",
      description: "Education and support for workplace rights, ADA compliance, and accommodation requests.",
      features: ["Rights education", "Accommodation guidance", "Advocacy support", "Legal resources"],
      vrFunded: true,
      category: "Advocacy",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Rapid Response Support",
      description: "Emergency employment support for urgent situations and crisis intervention.",
      features: ["Crisis intervention", "Emergency funding", "Rapid placement", "24/7 support"],
      vrFunded: true,
      category: "Emergency",
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      title: "Multi-State Coordination",
      description: "Seamless service delivery across state lines with coordinated VR office collaboration.",
      features: ["Interstate transfers", "Multi-state compliance", "Coordinated services", "Unified tracking"],
      vrFunded: false,
      category: "Coordination",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Comprehensive VR Services</h2>
          <p className="text-lg text-muted-foreground">
            AI-powered vocational rehabilitation services designed specifically for deaf individuals, fully integrated
            with state VR programs and workforce development systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vrServices.map((service, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    {service.vrFunded && (
                      <Badge variant="default" className="text-xs bg-green-600">
                        VR Funded
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-sm">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Card className="border-texas-red-200 bg-texas-red-50 dark:bg-texas-red-900/20">
            <CardHeader>
              <CardTitle className="text-texas-red-800 dark:text-texas-red-100 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI-Powered Matching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-texas-red-700 dark:text-texas-red-200 text-sm">
                Our AI engine analyzes your profile, skills, and goals to match you with the most suitable VR services,
                job opportunities, and training programs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-texas-blue-200 bg-texas-blue-50 dark:bg-texas-blue-900/20">
            <CardHeader>
              <CardTitle className="text-texas-blue-800 dark:text-texas-blue-100 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                VR Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-texas-blue-700 dark:text-texas-blue-200 text-sm">
                All services are designed to meet VR funding requirements and compliance standards, ensuring maximum
                funding approval and seamless integration with your VR plan.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-100 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Deaf-Centered Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 dark:text-green-200 text-sm">
                Every service is designed with deaf culture and communication preferences in mind, featuring ASL
                support, visual interfaces, and culturally competent service delivery.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
