import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import AppSidebar from "@/components/AppSidebar/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { OverviewTab } from "@/components/Dashboard/OverviewTab"
import { AnalyticsTab } from "@/components/Dashboard/AnalyticsTab"
import { ReportsTab } from "@/components/Dashboard/ReportsTab"
import { NotificationsTab } from "@/components/Dashboard/NotificationsTab"

const Dashboard = () => {
  const defaultOpen = Cookies.get("sidebar_state") === "true"
  const [metricsLoading, setMetricsLoading] = useState(false)

  useEffect(() => {
    setMetricsLoading(true)
    const timer = setTimeout(() => setMetricsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full p-4">
        <header className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <OverviewTab metricsLoading={metricsLoading} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </main>
    </SidebarProvider>
  )
}

export default Dashboard
