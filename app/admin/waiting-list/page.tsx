import type { Metadata } from "next"
import { getWaitingList, getWaitingListStats } from "@/app/actions/waiting-list-actions"
import { WaitingListAdmin } from "./WaitingListAdmin"

export const metadata: Metadata = {
  title: "Waiting List Management | VR4Deaf Admin",
  description: "Manage the VR4Deaf waiting list entries and applicants.",
}

export default async function WaitingListAdminPage() {
  const waitingList = await getWaitingList()
  const stats = await getWaitingListStats()

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Waiting List Management</h1>

      <WaitingListAdmin initialEntries={waitingList} initialStats={stats} />
    </div>
  )
}
