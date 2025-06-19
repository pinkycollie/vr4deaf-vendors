"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Info } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface VRCounselorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: () => void
}

export function VRCounselorModal({ open, onOpenChange, onContinue }: VRCounselorModalProps) {
  const [hasVRCounselor, setHasVRCounselor] = useState<string | null>(null)

  const handleContinue = () => {
    if (hasVRCounselor === "no-subscription") {
      // Redirect to Job Orb for subscription
      window.location.href = "https://job-orb.vercel.app"
    } else {
      // Continue with normal login flow
      onContinue()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vocational Rehabilitation Information</DialogTitle>
          <DialogDescription>
            Please let us know if you're working with a vocational rehabilitation counselor.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <RadioGroup value={hasVRCounselor || ""} onValueChange={setHasVRCounselor}>
            <div className="flex flex-col items-start space-y-2 rounded-md border p-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="vr-yes" />
                <Label htmlFor="vr-yes" className="font-medium">
                  Yes, I have a VR counselor
                </Label>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground">
                  Great! All VR4DEAF: JOB services are available to you at no cost through your vocational
                  rehabilitation program.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2 rounded-md border p-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="vr-no" />
                <Label htmlFor="vr-no" className="font-medium">
                  No, but I'd like to apply for VR services
                </Label>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground">
                  You may qualify for free services through vocational rehabilitation. Some features will be limited
                  until your VR application is approved.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2 rounded-md border p-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-subscription" id="vr-no-subscription" />
                <Label htmlFor="vr-no-subscription" className="font-medium">
                  No, I want to pay for a subscription
                </Label>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground">
                  You'll be redirected to our subscription service at Job Orb to get immediate access to all features.
                </p>
              </div>
            </div>
          </RadioGroup>

          <div className="rounded-lg bg-blue-50 p-3">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-700">
                  Vocational rehabilitation services are funded by state and federal programs and are provided at no
                  cost to eligible individuals with disabilities.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  <Link
                    href="/texas-vr-resources"
                    className="text-blue-600 hover:underline font-medium inline-flex items-center"
                  >
                    Learn more about VR services
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleContinue} disabled={!hasVRCounselor} className="w-full sm:w-auto">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
