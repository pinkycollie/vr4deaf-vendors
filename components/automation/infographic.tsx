import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Brain, MapPin, CreditCard, Mail, Eye, Trophy, ArrowDown, Clock } from "lucide-react"

const automationSteps = [
  {
    id: 1,
    title: "AI Profile Analysis",
    description: "AI analyzes your profile for VR eligibility and risk factors",
    icon: Brain,
    time: "1-2 seconds",
    color: "bg-blue-500",
    details: ["Disability verification", "Employment goal assessment", "Eligibility scoring", "Risk factor analysis"],
  },
  {
    id: 2,
    title: "Smart VR Matching",
    description: "AI finds the best VR offices based on location and specialties",
    icon: MapPin,
    time: "2-3 seconds",
    color: "bg-green-500",
    details: [
      "Location-based matching",
      "ASL service availability",
      "Specialization alignment",
      "Success rate ranking",
    ],
  },
  {
    id: 3,
    title: "Account Creation",
    description: "Automated account setup with appropriate service access",
    icon: CreditCard,
    time: "1 second",
    color: "bg-purple-500",
    details: [
      "Secure account generation",
      "Role-based permissions",
      "Service tier assignment",
      "Credential management",
    ],
  },
  {
    id: 4,
    title: "VR Office Notification",
    description: "Automatic notification to matched VR offices with referral details",
    icon: Mail,
    time: "Real-time",
    color: "bg-yellow-500",
    details: ["Instant VR office alerts", "Detailed referral packets", "Match reasoning included", "Priority flagging"],
  },
  {
    id: 5,
    title: "User Communication",
    description: "Welcome package and next steps sent to user",
    icon: UserPlus,
    time: "Instant",
    color: "bg-red-500",
    details: ["Welcome email/SMS", "Account access details", "VR office contacts", "Next step guidance"],
  },
  {
    id: 6,
    title: "Progress Monitoring",
    description: "Continuous tracking of VR application and funding status",
    icon: Eye,
    time: "Ongoing",
    color: "bg-indigo-500",
    details: ["Application status tracking", "VR counselor communication", "Milestone monitoring", "Issue escalation"],
  },
  {
    id: 7,
    title: "Success Tracking",
    description: "Employment outcomes and long-term success monitoring",
    icon: Trophy,
    time: "Continuous",
    color: "bg-orange-500",
    details: [
      "Employment placement tracking",
      "Wage progression monitoring",
      "Job retention analysis",
      "Success story documentation",
    ],
  },
]

export default function AutomationInfographic() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {automationSteps.map((step, index) => (
          <div key={step.id} className="relative">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Step Icon and Number */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white mb-2`}
                    >
                      <step.icon className="h-8 w-8" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Step {step.id}
                    </Badge>
                  </div>

                  {/* Step Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <Badge className="w-fit mt-2 sm:mt-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.time}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">{step.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Arrow between steps */}
            {index < automationSteps.length - 1 && (
              <div className="flex justify-center my-4">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-dashed">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Complete Automation in Under 10 Seconds</h3>
          <p className="text-lg text-muted-foreground mb-6">
            From initial application to VR office matching and account creation - all automated with AI precision and
            deaf-centered design.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              95% Success Rate
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">24/7 Availability</Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
              Deaf-First Design
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
              Real-time Processing
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
