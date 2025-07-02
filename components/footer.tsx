import Link from "next/link"
import { Bot, Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export default function Footer() {
  const vrResources = [
    { name: "VR Services Overview", href: "/services" },
    { name: "VR Funding Guide", href: "/funding" },
    { name: "State VR Programs", href: "/states" },
    { name: "VR Application Help", href: "/docs/vr-application" },
  ]

  const workforceTools = [
    { name: "Job Search Tools", href: "/docs/job-search" },
    { name: "AI Resume Builder", href: "/docs/resume-builder" },
    { name: "Interview Preparation", href: "/docs/interview-prep" },
    { name: "Skills Assessment", href: "/docs/skills-assessment" },
  ]

  const aiFeatures = [
    { name: "AI VR Matching", href: "/docs/ai-matching" },
    { name: "Automated Workflows", href: "/docs/automation" },
    { name: "VURI AI Assistant", href: "/docs/vuri-ai" },
    { name: "Smart Recommendations", href: "/docs/ai-recommendations" },
  ]

  const support = [
    { name: "ASL Support", href: "/docs/asl-support" },
    { name: "Technical Help", href: "/docs/technical-support" },
    { name: "Vendors Portal", href: "/vendors-portal" },
    { name: "Community Forum", href: "/docs/community" },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-texas-red-600 to-texas-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">VR4DEAF</span>
                <span className="text-xs text-muted-foreground leading-none">AI-Powered VR Platform</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The first AI-powered vocational rehabilitation platform designed specifically for deaf individuals seeking
              employment and business opportunities.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>support@vr4deaf.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>1-800-VR4-DEAF</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">VR Services</h3>
            <ul className="space-y-2">
              {vrResources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Workforce Tools</h3>
            <ul className="space-y-2">
              {workforceTools.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">AI Features</h3>
            <ul className="space-y-2">
              {aiFeatures.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 VR4DEAF Platform. All rights reserved.</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-foreground transition-colors">
                Accessibility
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Powered by 360 Magicians</span>
              <Link
                href="https://mbtquniverse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                MBTQ Universe <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
