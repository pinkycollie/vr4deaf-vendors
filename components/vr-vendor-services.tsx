import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Users, Bot, Target, TrendingUp, Award, Handshake } from "lucide-react"
import Link from "next/link"

export default function VRVendorServices() {
  const vendorServices = [
    {
      category: "VR Agency Partnership",
      icon: <Handshake className="h-6 w-6 text-blue-600" />,
      description: "Comprehensive vendor services for state VR agencies nationwide",
      services: [
        {
          name: "Job Placement Services",
          description: "AI-powered job matching and placement with 90-day follow-up",
          pricing: "$2,500 - $4,000 per successful placement",
          vrCode: "VR Code 1.1 - Job Placement",
          outcomes: "85% job retention rate at 90 days",
        },
        {
          name: "Vocational Assessment",
          description: "Comprehensive AI-enhanced vocational evaluations",
          pricing: "$800 - $1,200 per assessment",
          vrCode: "VR Code 2.1 - Vocational Assessment",
          outcomes: "Detailed career pathway recommendations",
        },
        {
          name: "Skills Training Programs",
          description: "Industry-certified training with ASL support",
          pricing: "$1,500 - $3,500 per program",
          vrCode: "VR Code 3.1 - Training Services",
          outcomes: "Industry certification completion",
        },
      ],
    },
    {
      category: "Business Development Services",
      icon: <Building className="h-6 w-6 text-green-600" />,
      description: "Self-employment and business consulting for VR clients",
      services: [
        {
          name: "Business Plan Development",
          description: "AI-assisted business plan creation and feasibility studies",
          pricing: "$1,200 - $2,500 per plan",
          vrCode: "VR Code 4.1 - Self-Employment Services",
          outcomes: "SBA-ready business plans with funding guidance",
        },
        {
          name: "Business Coaching & Mentorship",
          description: "Ongoing business coaching with deaf entrepreneur mentors",
          pricing: "$150 - $250 per hour",
          vrCode: "VR Code 4.2 - Business Coaching",
          outcomes: "6-month business sustainability tracking",
        },
        {
          name: "Startup Incubation Program",
          description: "12-week intensive business development program",
          pricing: "$3,500 - $5,000 per participant",
          vrCode: "VR Code 4.3 - Business Development",
          outcomes: "Business launch with revenue generation",
        },
      ],
    },
    {
      category: "Workforce Development",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      description: "Partnership services for workforce development boards",
      services: [
        {
          name: "Employer Engagement",
          description: "Deaf-friendly employer network development and management",
          pricing: "$2,000 - $4,000 per employer partnership",
          vrCode: "WIOA Adult/DW Services",
          outcomes: "Inclusive hiring practices implementation",
        },
        {
          name: "Career Coaching Services",
          description: "Individual career coaching and advancement planning",
          pricing: "$100 - $180 per session",
          vrCode: "WIOA Career Services",
          outcomes: "Career advancement and wage progression",
        },
        {
          name: "Digital Literacy Training",
          description: "Technology skills training for workforce readiness",
          pricing: "$800 - $1,500 per participant",
          vrCode: "WIOA Training Services",
          outcomes: "Digital skills certification",
        },
      ],
    },
    {
      category: "Specialized Consulting",
      icon: <Bot className="h-6 w-6 text-orange-600" />,
      description: "AI-powered consulting and technology solutions",
      services: [
        {
          name: "VR Technology Integration",
          description: "AI platform integration for VR agencies",
          pricing: "$10,000 - $25,000 implementation",
          vrCode: "Technology Services Contract",
          outcomes: "Improved case management efficiency",
        },
        {
          name: "Outcome Analytics & Reporting",
          description: "Advanced analytics for VR program optimization",
          pricing: "$5,000 - $15,000 per year",
          vrCode: "Data Analytics Services",
          outcomes: "Enhanced program performance metrics",
        },
        {
          name: "Staff Training & Development",
          description: "Deaf culture competency training for VR staff",
          pricing: "$2,500 - $5,000 per training",
          vrCode: "Professional Development",
          outcomes: "Improved service delivery to deaf clients",
        },
      ],
    },
  ]

  const certifications = [
    { name: "CARF Accredited", description: "Commission on Accreditation of Rehabilitation Facilities" },
    { name: "CRCC Certified", description: "Certified Rehabilitation Counselor Credentials" },
    { name: "WIOA Approved", description: "Workforce Innovation and Opportunity Act Eligible" },
    { name: "Ticket to Work EN", description: "Employment Network Provider" },
    { name: "SBA Resource Partner", description: "Small Business Administration Certified" },
    { name: "CBTEC Certified", description: "Certified Business and Technology Education Consultant" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-blue-600">VR Vendor & Workforce Partner</Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-6">Comprehensive VR & Workforce Development Services</h2>
          <p className="text-xl text-muted-foreground">
            VR4DEAF serves as your trusted vendor and partner, providing specialized services to VR agencies, workforce
            development boards, and community organizations nationwide.
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-12">
          {vendorServices.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-8">
                {category.icon}
                <div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-green-600 mb-1">Pricing</div>
                        <div className="text-sm">{service.pricing}</div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-blue-600 mb-1">VR Classification</div>
                        <Badge variant="outline" className="text-xs">
                          {service.vrCode}
                        </Badge>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-purple-600 mb-1">Expected Outcomes</div>
                        <div className="text-sm text-muted-foreground">{service.outcomes}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Credentials */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Certifications & Credentials (In Progress)</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-gold-500 mx-auto mb-2" />
                  <div className="font-medium text-sm">{cert.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{cert.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-100">
                <Target className="h-5 w-5" />
                For VR Agencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
                <li>• Specialized deaf community expertise</li>
                <li>• AI-enhanced service delivery</li>
                <li>• Improved outcome rates and cost efficiency</li>
                <li>• Comprehensive reporting and analytics</li>
                <li>• Cultural competency and ASL support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-100">
                <TrendingUp className="h-5 w-5" />
                For Workforce Boards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-200">
                <li>• Inclusive workforce development strategies</li>
                <li>• Employer engagement and education</li>
                <li>• Specialized training and certification programs</li>
                <li>• Technology-enhanced service delivery</li>
                <li>• Performance-based contracting options</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h4 className="text-xl font-bold mb-4">Ready to Partner with VR4DEAF?</h4>
              <p className="text-muted-foreground mb-6">
                Join our network of VR agencies and workforce partners leveraging AI-powered solutions for better
                outcomes in the deaf community.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/contact?type=partnership">Request Partnership Info</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
