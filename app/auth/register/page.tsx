import type { Metadata } from "next"

import RegisterClientPage from "./RegisterClientPage"

export const metadata: Metadata = {
  title: "Create Account | VR4DEAF: JOB",
  description:
    "Create your VR4DEAF: JOB account to access vocational rehabilitation services designed for Deaf job seekers.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function RegisterPage() {
  return <RegisterClientPage />
}
