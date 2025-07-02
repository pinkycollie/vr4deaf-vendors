import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Admin Dashboard | 360 Business Magician",
  description: "Admin dashboard for managing VR referrals and client data",
}

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm font-medium">Admin Dashboard</span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-slate-50 p-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">VR Services Dashboard</h1>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">+14% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Consultations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Scheduled this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground">+2% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>Powered by Google Looker Studio</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    src={process.env.NEXT_PUBLIC_LOOKER_STUDIO_EMBED_URL}
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="referrals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Referrals</CardTitle>
                  <CardDescription>View and manage incoming referrals from the VR Interest Form</CardDescription>
                </CardHeader>
                <CardContent>
                  <iframe
                    src={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_REFERRALS_EMBED_URL}
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client Management</CardTitle>
                  <CardDescription>Track client progress and manage services</CardDescription>
                </CardHeader>
                <CardContent>
                  <iframe
                    src={process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENTS_EMBED_URL}
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Calendar</CardTitle>
                  <CardDescription>View and manage upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <iframe
                    src={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL}
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
