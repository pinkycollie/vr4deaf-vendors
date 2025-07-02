import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function VrRequestGuide() {
  const vrSelfEmploymentCategories = [
    {
      title: "Exploration & Concept Development",
      priceRange: "$122 - $551",
      focus:
        "Identifying business feasibility for Deaf entrepreneurs, business modeling, and AI-powered business automation.",
      keyAsk:
        "Assistance in defining your business concept, including niche markets such as AI-powered insurance, tax, financial, and real estate services.",
      justification: "Aligns with VR's goal to support self-employment pathways for individuals with disabilities.",
    },
    {
      title: "Feasibility Studies",
      priceRange: "$151 - $551",
      focus: "AI-driven business validation & market research",
      keyAsk:
        "VR to cover the cost of a formal feasibility study to validate MBTQ Universe, ensuring profitability & compliance.",
      justification:
        "Necessary to ensure scalability, accessibility, and compliance with VR self-employment standards.",
    },
    {
      title: "Business Planning",
      priceRange: "$1,286 - $1,780",
      focus: "Automated business planning & financial projections",
      keyAsk:
        "Funding for structured business planning, covering AI-assisted financial projections, business structure setup, and customer acquisition models.",
      justification: "A detailed business plan is often required by VR before funding approvals.",
    },
    {
      title: "Benchmark 1: Self-Employment Services Plan",
      priceRange: "$151",
      focus: "Developing VR-Compliant Business Services Plan",
      keyAsk:
        "Request VR to fund professional assistance in structuring a plan that aligns with VR policies, funding guidelines, and reporting expectations.",
      justification: "Ensures business sustainability and meets VR funding requirements.",
    },
    {
      title: "Benchmark 2: Supported Self-Employment Start-Up",
      priceRange: "$2,021",
      focus: "Launch of MBTQ Universe AI Business Services",
      keyAsk: "Request VR funding for website setup, automated tracking dashboard, and initial marketing.",
      justification: "Ensures that self-employment meets VR's sustainability benchmarks.",
    },
  ]

  const vrJobSupportCategories = [
    {
      title: "Job Readiness & Career Assessment",
      priceRange: "$100 - $400",
      focus: "AI-driven career assessment & personalized job match analysis.",
      keyAsk:
        "Request funding for a digital career readiness profile, resume builder, and professional strengths analysis.",
      justification: "Helps identify suitable employment pathways and increases placement success.",
    },
    {
      title: "Job Search & Interview Preparation",
      priceRange: "$150 - $300",
      focus: "Support for resume refinement, mock interviews, and workplace communication coaching.",
      keyAsk: "Request VR to cover preparation services using visual tools and Deaf-friendly coaching methods.",
      justification: "Improves employability outcomes for Deaf job seekers.",
    },
    {
      title: "Job Placement & Onboarding Support",
      priceRange: "$500 - $1,000",
      focus: "Assistance with job placement and onboarding accommodations.",
      keyAsk: "VR funding request for initial employer engagement, interpreter support, and accessibility setup.",
      justification: "Ensures successful employment transitions with appropriate workplace access.",
    },
  ]

  const positioningStrategies = [
    {
      title: "Emphasize Accessibility & Innovation",
      description:
        "Since VR4Deaf focuses on AI-driven self-employment services for the Deaf community, VR should support it as an accessible business solution.",
    },
    {
      title: "Highlight Long-Term Sustainability",
      description:
        "VR funding decisions depend on sustainability metrics. Provide data-driven projections, AI-powered automation features, and growth plans.",
    },
    {
      title: "Align With VR's Compliance & Reporting",
      description:
        "Show how 360 Magicians integrates VR-friendly tracking, client reporting, and compliance automation, ensuring seamless VR accountability.",
    },
  ]

  return (
    <section id="vr-request" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Maximizing VR Funding Support</h2>
          <p className="text-lg text-muted-foreground">
            Our platform helps you structure and optimize your VR funding requests to maximize support for your
            employment or self-employment goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold mb-4">Self-Employment Services</h3>
            <Accordion type="single" collapsible className="w-full mb-8">
              {vrSelfEmploymentCategories.map((category, index) => (
                <AccordionItem key={index} value={`self-item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div>
                      {category.title}
                      <Badge variant="outline" className="ml-2 bg-primary/5 text-primary">
                        {category.priceRange}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      <div>
                        <span className="font-medium">Request Focus:</span> {category.focus}
                      </div>
                      <div>
                        <span className="font-medium">Key Ask:</span> {category.keyAsk}
                      </div>
                      <div>
                        <span className="font-medium">Justification:</span> {category.justification}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <h3 className="text-xl font-semibold mb-4">Job Support Services</h3>
            <Accordion type="single" collapsible className="w-full">
              {vrJobSupportCategories.map((category, index) => (
                <AccordionItem key={index} value={`job-item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div>
                      {category.title}
                      <Badge variant="outline" className="ml-2 bg-secondary/10 text-secondary-foreground">
                        {category.priceRange}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      <div>
                        <span className="font-medium">Request Focus:</span> {category.focus}
                      </div>
                      <div>
                        <span className="font-medium">Key Ask:</span> {category.keyAsk}
                      </div>
                      <div>
                        <span className="font-medium">Justification:</span> {category.justification}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">How to Position Your VR Request</h3>
            <div className="space-y-4">
              {positioningStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{strategy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{strategy.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Our AI-Powered Assistance</h4>
              <p className="text-muted-foreground">
                VR4Deaf's platform automatically generates optimized VR resources based on your goals—whether job
                placement or launching a business—ensuring you receive maximum support and meet all VR requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
