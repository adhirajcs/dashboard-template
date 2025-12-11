import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "../AppSidebar/app-sidebar"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "@/components/ui/calendar"
import { Download, DollarSign, Users, CreditCard, Activity } from "lucide-react"
import { useState, useEffect } from "react"
import type { DateRange } from "react-day-picker"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-border bg-white p-2 shadow-md dark:bg-card dark:text-foreground">
        <p className="text-sm font-medium text-black dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-black dark:text-white" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Chart Data
const revenueData = [
  { name: "Mon", revenue: 4000, sales: 2400 },
  { name: "Tue", revenue: 3000, sales: 1398 },
  { name: "Wed", revenue: 2000, sales: 9800 },
  { name: "Thu", revenue: 2780, sales: 3908 },
  { name: "Fri", revenue: 1890, sales: 4800 },
  { name: "Sat", revenue: 2390, sales: 3800 },
  { name: "Sun", revenue: 2490, sales: 4300 },
]

const conversionData = [
  { name: "Product A", value: 400, fill: "#2563EB" }, // Blue
  { name: "Product B", value: 300, fill: "#10B981" }, // Green
  { name: "Product C", value: 300, fill: "#F59E42" }, // Orange
  { name: "Product D", value: 200, fill: "#F43F5E" }, // Rose
]

// Loading Skeleton for Cards
const CardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-3 w-40" />
    </CardContent>
  </Card>
)

// Loading Skeleton for Table
const TableSkeleton = () => (
  <div className="space-y-2">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
)

// Analytics Tab Component with Calendar
const AnalyticsTab = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 11, 1),
    to: new Date(2025, 11, 10),
  })
  const [loading, setLoading] = useState(false)

  const handleDateChange = (range: DateRange | undefined) => {
    if (range) {
      setLoading(true)
      setDateRange(range)
      setTimeout(() => setLoading(false), 500)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {/* Calendar Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Select Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={1}
              className="rounded-md"
            />
            {dateRange?.from && dateRange?.to && (
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics Stats */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Avg. Revenue per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,456.00</div>
              <p className="text-xs text-muted-foreground">+12% from previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.24%</div>
              <p className="text-xs text-muted-foreground">+0.5% from previous period</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Daily revenue and sales for the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-[300px]" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  stroke={document.documentElement.classList.contains("dark") ? "white" : "black"}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke={document.documentElement.classList.contains("dark") ? "white" : "black"}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: document.documentElement.classList.contains("dark") ? "white" : "black" }} />
                <Bar dataKey="revenue" fill="#2563EB" />
                <Bar dataKey="sales" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Conversion Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Product Conversion</CardTitle>
          <CardDescription>Sales breakdown by product</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// Reports Tab with Table and Loading
const ReportsTab = () => {
  const [loading, setLoading] = useState(false)

  const handleExport = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Sales Report</h3>
          <p className="text-sm text-muted-foreground">Detailed sales data by product</p>
        </div>
        <Button onClick={handleExport} disabled={loading}>
          {loading && <span className="mr-2">Loading...</span>}
          Export Report
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <TableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Pro Plan</TableCell>
                  <TableCell>Subscription</TableCell>
                  <TableCell>2,245</TableCell>
                  <TableCell className="text-right">$89,800.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Starter Plan</TableCell>
                  <TableCell>Subscription</TableCell>
                  <TableCell>3,891</TableCell>
                  <TableCell className="text-right">$58,365.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">API Access</TableCell>
                  <TableCell>Add-on</TableCell>
                  <TableCell>1,230</TableCell>
                  <TableCell className="text-right">$36,900.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Custom Enterprise</TableCell>
                  <TableCell>Enterprise</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell className="text-right">$268,900.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Support Plan</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>567</TableCell>
                  <TableCell className="text-right">$28,350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Notifications Tab
const NotificationsTab = () => {
  const notifications = [
    { id: 1, title: "New Order", description: "Order #12345 placed successfully", time: "2 minutes ago" },
    { id: 2, title: "Payment Received", description: "Payment of $1,999.00 received from Olivia Martin", time: "1 hour ago" },
    { id: 3, title: "System Update", description: "Dashboard system has been updated to v2.5", time: "3 hours ago" },
    { id: 4, title: "Low Stock Alert", description: "Product XYZ has low inventory levels", time: "5 hours ago" },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {notifications.map((notif) => (
          <Card key={notif.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{notif.title}</h4>
                  <p className="text-sm text-muted-foreground">{notif.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notif.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

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
        <header className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button size="sm">Add New</Button>
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Metric Cards with Loading State */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metricsLoading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2,350</div>
                      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sales</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+12,234</div>
                      <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground">+201 since last hour</p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Chart and Recent Sales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Weekly revenue and sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        stroke={document.documentElement.classList.contains("dark") ? "white" : "black"}
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke={document.documentElement.classList.contains("dark") ? "white" : "black"}
                        style={{ fontSize: "12px" }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ color: document.documentElement.classList.contains("dark") ? "white" : "black" }} />
                      <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Olivia Martin</TableCell>
                        <TableCell className="text-right">$1,999.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Jackson Lee</TableCell>
                        <TableCell className="text-right">$39.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Isabella Anderson</TableCell>
                        <TableCell className="text-right">$299.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">William Kim</TableCell>
                        <TableCell className="text-right">$99.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </main>
    </SidebarProvider>
  )
}

export default Dashboard