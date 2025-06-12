import { UserDashboard } from "@/components/user-dashboard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Your VR Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Track your vocational rehabilitation progress and access your personalized resources.
        </p>
      </div>

      <UserDashboard />
    </div>
  )
}
