import type { Metadata } from "next"
import LoginPageClient from "./LoginPageClient"

export const metadata: Metadata = {
  title: "Sign In | VR4DEAF: JOB",
  description:
    "Sign in to your VR4DEAF: JOB account to access vocational rehabilitation services for Deaf job seekers.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginPageClient />
}
