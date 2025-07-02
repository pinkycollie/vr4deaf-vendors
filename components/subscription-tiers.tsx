import { Bot, Briefcase, Building, Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SubscriptionTiers() {
  const tiers = [
    {
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      title: "VR-Funded Services",
      description: "For deaf individuals with VR approval (employment or business)",
      price: "Free (VR Funded)",
      premiumPrice: "Covered by state VR agencies",
      features: [
        "AI-powered job search & placement assistance",
        "Resume optimization & interview preparation",
        "Vocational assessment & skills training",
        "ASL interpretation & accessibility support",
        "Business development consultation",
        "Ongoing career coaching & support",
      ],
      badge: "Most Popular",
      buttonText: "Apply for VR Services",
    },
    {
      icon: <Bot className="h-12 w-12 text-primary" />,
      title: "Self-Pay Individual",
      description: "For those not eligible for VR funding",
      price: "$49/month",
      premiumPrice: "Cancel anytime",
      features: [
        "Basic AI job search tools",
        "Resume builder & templates",
        "Self-paced training modules",
        "Community support access",
        "Limited coaching sessions (2/month)",
      ],
      badge: null,
      buttonText: "Start Individual Plan",
    },
    {
      icon: <Building className="h-12 w-12 text-primary" />,
      title: "Enterprise & Agencies",
      description: "For VR agencies and large organizations",
      price: "Custom Pricing",
      premiumPrice: "Volume discounts available",
      features: [
        "Full platform access for multiple users",
        "Advanced analytics & reporting",
        "Custom integrations & workflows",
        "Dedicated account management",
        "Staff training & certification",
        "White-label options available",
      ],
      badge: "Enterprise",
      buttonText: "Contact Sales",
    },
  ]

  return (
    <section id="tiers" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Subscription Tiers</h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs, with VR funding options available for eligible users.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <Card key={index} className={`relative border-2 ${index === 0 ? "border-primary" : "border-border"}`}>
              {tier.badge && <Badge className="absolute top-4 right-4 bg-primary">{tier.badge}</Badge>}
              <CardHeader>
                <div className="mb-4">{tier.icon}</div>
                <CardTitle className="text-2xl">{tier.title}</CardTitle>
                <CardDescription className="text-base">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-2xl font-bold">{tier.price}</p>
                  <p className="text-sm text-muted-foreground">{tier.premiumPrice}</p>
                </div>

                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  variant={index === 0 ? "default" : "outline"}
                  asChild
                >
                  <Link href={index === 0 ? "/automation" : index === 1 ? "/docs/resume-builder" : "/vendor-services"}>
                    {tier.buttonText}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
