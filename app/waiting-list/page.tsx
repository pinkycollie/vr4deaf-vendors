import type { Metadata } from "next"
import WaitingListPageClient from "./WaitingListPageClient"

export const metadata: Metadata = {
  title: "Join Our Waiting List | VR4Deaf",
  description: "Sign up to be notified when space becomes available in our VR4Deaf programs.",
}

export default function WaitingListPage() {
  return <WaitingListPageClient />
}
