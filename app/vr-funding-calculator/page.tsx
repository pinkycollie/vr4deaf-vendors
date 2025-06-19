import type { Metadata } from "next"
import VRFundingCalculator from "./VRFundingCalculator"

export const metadata: Metadata = {
  title: "VR Funding Eligibility Calculator | VR4DEAF: JOB",
  description:
    "Estimate your eligibility for vocational rehabilitation funding in Texas with our interactive calculator tool. Learn about available services and next steps in the VR process.",
}

export default function VRFundingCalculatorPage() {
  return <VRFundingCalculator />
}
