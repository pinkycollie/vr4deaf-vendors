"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, Mail, Shield, Zap, DollarSign } from "lucide-react"

export function EmailSetupGuide() {
  const providers = [
    {
      name: "Resend",
      recommended: true,
      description: "Developer-friendly with excellent deliverability",
      pricing: "Free: 3,000 emails/month, then $20/month",
      features: ["Easy setup", "Great documentation", "Webhooks", "Analytics"],
      setupSteps: [
        "Sign up at resend.com",
        "Verify your vr4deaf.org domain",
        "Get your API key",
        "Add RESEND_API_KEY to environment variables",
      ],
      pros: ["Simple integration", "Good free tier", "Excellent developer experience"],
      cons: ["Newer service", "Limited advanced features"],
    },
    {
      name: "SendGrid",
      recommended: false,
      description: "Enterprise-grade email service with advanced features",
      pricing: "Free: 100 emails/day, then $19.95/month",
      features: ["Advanced analytics", "A/B testing", "Marketing campaigns", "Templates"],
      setupSteps: [
        "Sign up at sendgrid.com",
        "Verify your vr4deaf.org domain",
        "Configure DNS records",
        "Get your API key",
        "Add SENDGRID_API_KEY to environment variables",
      ],
      pros: ["Comprehensive features", "Reliable delivery", "Good reputation"],
      cons: ["More complex setup", "Higher cost"],
    },
    {
      name: "Mailgun",
      recommended: false,
      description: "Reliable email service with good tracking",
      pricing: "Free: 5,000 emails/month, then $35/month",
      features: ["Email validation", "Detailed tracking", "Webhooks", "EU data residency"],
      setupSteps: [
        "Sign up at mailgun.com",
        "Add and verify vr4deaf.org domain",
        "Configure DNS records (SPF, DKIM, CNAME)",
        "Get your API key and domain",
        "Add MAILGUN_API_KEY and MAILGUN_DOMAIN to environment variables",
      ],
      pros: ["Good deliverability", "Email validation", "Flexible pricing"],
      cons: ["Complex DNS setup", "Higher pricing"],
    },
    {
      name: "Amazon SES",
      recommended: false,
      description: "Cost-effective for high volume",
      pricing: "$0.10 per 1,000 emails",
      features: ["Very low cost", "High volume", "AWS integration", "Reliable"],
      setupSteps: [
        "Set up AWS account",
        "Request production access",
        "Verify vr4deaf.org domain",
        "Configure IAM user with SES permissions",
        "Add AWS credentials to environment variables",
      ],
      pros: ["Very cheap", "Scales well", "AWS ecosystem"],
      cons: ["Complex setup", "Limited features", "Requires AWS knowledge"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Email Provider Setup for VR4Deaf.org</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose and configure an email provider for your VR4Deaf platform. We recommend Resend for its simplicity and
          reliability.
        </p>
      </div>

      <div className="grid gap-6">
        {providers.map((provider) => (
          <Card key={provider.name} className={provider.recommended ? "border-blue-500 shadow-lg" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>{provider.name}</span>
                  </CardTitle>
                  {provider.recommended && <Badge className="bg-blue-500">Recommended</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{provider.pricing}</span>
                </div>
              </div>
              <CardDescription>{provider.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {provider.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">Pros</h4>
                  <ul className="space-y-1">
                    {provider.pros.map((pro) => (
                      <li key={pro} className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-orange-600">Cons</h4>
                  <ul className="space-y-1">
                    {provider.cons.map((con) => (
                      <li key={con} className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full bg-orange-500 mr-2 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Setup Steps
                </h4>
                <ol className="space-y-2">
                  {provider.setupSteps.map((step, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant={provider.recommended ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => {
                    const urls = {
                      Resend: "https://resend.com",
                      SendGrid: "https://sendgrid.com",
                      Mailgun: "https://mailgun.com",
                      "Amazon SES": "https://aws.amazon.com/ses/",
                    }
                    window.open(urls[provider.name as keyof typeof urls], "_blank")
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Sign Up for {provider.name}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Domain Configuration for vr4deaf.org</CardTitle>
          <CardDescription className="text-blue-700">
            You'll need to configure these DNS records for your domain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2">Required DNS Records:</h4>
            <div className="space-y-2 font-mono text-sm">
              <div>
                <strong>SPF Record:</strong>
                <br />
                <code className="bg-gray-100 p-1 rounded">TXT @ "v=spf1 include:_spf.resend.com ~all"</code>
              </div>
              <div>
                <strong>DKIM Record:</strong>
                <br />
                <code className="bg-gray-100 p-1 rounded">
                  TXT resend._domainkey "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..."
                </code>
              </div>
              <div>
                <strong>DMARC Record:</strong>
                <br />
                <code className="bg-gray-100 p-1 rounded">
                  TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:admin@vr4deaf.org"
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
