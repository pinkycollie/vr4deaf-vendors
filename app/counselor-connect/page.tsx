import type { Metadata } from "next"
import CounselorConnectClient from "./CounselorConnectClient"

export const metadata: Metadata = {
  title: "Connect with VR Counselors | VR4DEAF: JOB",
  description:
    "Find and connect with Vocational Rehabilitation counselors who specialize in working with Deaf job seekers.",
}

export default function CounselorConnectPage() {
  return <CounselorConnectClient />
}
