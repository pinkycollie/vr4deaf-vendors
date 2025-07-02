import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Shield, Globe, Zap, Monitor } from "lucide-react"

export default function InfrastructureOverview() {
  const infrastructureComponents = [
    {
      name: "Multi-Region Deployment",
      icon: <Globe className="h-6 w-6" />,
      description: "Kubernetes clusters across US regions for low latency",
      technologies: ["AWS EKS", "Google GKE", "Azure AKS"],
      compliance: ["SOC 2", "HIPAA", "State-specific requirements"],
    },
    {
      name: "State-Specific Databases",
      icon: <Database className="h-6 w-6" />,
      description: "Isolated data storage per state with compliance controls",
      technologies: ["PostgreSQL", "Redis", "MongoDB"],
      compliance: ["Data residency", "Encryption at rest", "Audit logging"],
    },
    {
      name: "API Gateway & Load Balancing",
      icon: <Server className="h-6 w-6" />,
      description: "Intelligent routing based on user location and state",
      technologies: ["Kong", "NGINX", "AWS ALB"],
      compliance: ["Rate limiting", "DDoS protection", "SSL/TLS"],
    },
    {
      name: "Security & Compliance",
      icon: <Shield className="h-6 w-6" />,
      description: "Multi-layered security with state-specific compliance",
      technologies: ["Vault", "OAuth 2.0", "SAML"],
      compliance: ["Zero-trust", "MFA", "Audit trails"],
    },
    {
      name: "Monitoring & Observability",
      icon: <Monitor className="h-6 w-6" />,
      description: "Real-time monitoring across all state deployments",
      technologies: ["Prometheus", "Grafana", "Jaeger"],
      compliance: ["SLA monitoring", "Performance tracking", "Error alerting"],
    },
    {
      name: "Auto-Scaling & Performance",
      icon: <Zap className="h-6 w-6" />,
      description: "Dynamic scaling based on state-specific demand",
      technologies: ["HPA", "VPA", "KEDA"],
      compliance: ["Resource optimization", "Cost management", "SLA adherence"],
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Multi-State Infrastructure</h2>
          <p className="text-lg text-muted-foreground">
            Scalable, compliant, and secure infrastructure designed to support VR4DEAF across all 50 states
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infrastructureComponents.map((component, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{component.icon}</div>
                  <CardTitle className="text-lg">{component.name}</CardTitle>
                </div>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2 text-sm">Technologies</h5>
                  <div className="flex flex-wrap gap-1">
                    {component.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2 text-sm">Compliance Features</h5>
                  <div className="flex flex-wrap gap-1">
                    {component.compliance.map((comp, compIndex) => (
                      <Badge key={compIndex} variant="secondary" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Deployment Strategy</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Infrastructure as Code</h4>
              <p className="text-sm text-muted-foreground">
                All infrastructure is defined as code using Terraform and Kubernetes manifests, enabling consistent
                deployments across all states with state-specific configurations.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Blue-Green Deployments</h4>
              <p className="text-sm text-muted-foreground">
                Zero-downtime deployments ensure continuous service availability while rolling out updates to individual
                states or the entire platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
