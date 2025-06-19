import type { Metadata } from "next"
import DashboardClientPage from "./DashboardClientPage"

export const metadata: Metadata = {
  title: "Dashboard | VR4DEAF: JOB",
  description:
    "Access your VR4DEAF: JOB dashboard to track your vocational rehabilitation progress and access job tools.",
}

export default function DashboardPage() {
  return <DashboardClientPage />
}
