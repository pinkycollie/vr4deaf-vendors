"use client"

import { CheckCircle, UserPlus, MapPin, Briefcase, ShieldCheck, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { icon: UserPlus, title: "Sign-Up", desc: "User submits basic profile & goals." },
  { icon: MapPin, title: "Geo-Match", desc: "AI finds best VR office & resources." },
  { icon: Briefcase, title: "Account", desc: "Locked account with funding path." },
  { icon: ShieldCheck, title: "VR Approval", desc: "Automated eligibility & docs." },
  { icon: Rocket, title: "Service Unlock", desc: "Free VR-funded services enabled." },
  { icon: CheckCircle, title: "Employment", desc: "Job or business launch!" },
]

export default function Infographic() {
  return (
    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
      {steps.map(({ icon: Icon, title, desc }, idx) => (
        <div
          key={title}
          className={cn("flex flex-col items-center text-center p-4 rounded-lg", "bg-muted/50 dark:bg-muted/30")}
        >
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-texas-blue-600/90 text-white">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="font-semibold">{`${idx + 1}. ${title}`}</h3>
          <p className="text-sm text-muted-foreground mt-1">{desc}</p>
        </div>
      ))}
    </div>
  )
}
