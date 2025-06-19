import type { Metadata } from "next"
import { HapticFeedbackDemo } from "./HapticFeedbackDemo"

export const metadata: Metadata = {
  title: "Haptic Feedback Demo | VR4Deaf",
  description: "Experience and customize haptic feedback settings for a more accessible experience.",
}

export default function HapticFeedbackPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Haptic Feedback Demo</h1>
      <p className="text-lg mb-8">
        Experience how haptic feedback enhances the VR4Deaf platform for mobile users. This feature provides tactile
        feedback for important notifications and interactions.
      </p>

      <HapticFeedbackDemo />
    </div>
  )
}
