import type { Metadata } from "next"
import UserProfileClient from "./UserProfileClient"

export const metadata: Metadata = {
  title: "My Profile | VR4DEAF: JOB",
  description: "Manage your profile, communication preferences, and vocational background information.",
}

export default function ProfilePage() {
  return <UserProfileClient />
}
