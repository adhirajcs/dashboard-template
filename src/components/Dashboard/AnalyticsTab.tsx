import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import type { DateRange } from "react-day-picker"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { conversionData, revenueData } from "@/components/Dashboard/data"
import { CustomTooltip } from "@/components/Dashboard/CustomTooltip"

export function AnalyticsTab() {
  const { theme } = useTheme()
  const chartTextColor = theme === "dark" ? "#fff" : "#1e293b"

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 10),
  })
  const [loading, setLoading] = useState(false)

  const formatDateForInput = (date?: Date) => {
    if (!date) return ""
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

  const parseDateFromInput = (value: string) => {
    if (!value) return undefined
    const [y, m, d] = value.split("-").map(Number)
    if (!y || !m || !d) return undefined
    return new Date(y, m - 1, d)
  }

  const setRangeWithLoading = (range: DateRange) => {
    setLoading(true)
    setDateRange(range)
    setTimeout(() => setLoading(false), 500)
  }

  const handleDateChange = (range: DateRange | undefined) => {
    if (range) setRangeWithLoading(range)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-12">
        {/* Calendar Card */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="text-base">Select Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateChange}
                numberOfMonths={1}
                className="w-full rounded-md sm:w-auto"
                classNames={{
                  root: "w-full sm:w-fit",
                }}
              />

              <div className="w-full rounded-md bg-muted/30 p-3 sm:max-w-[260px]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-1">
                    <div className="text-xs text-muted-foreground">From</div>
                    <Input
                      type="date"
                      value={formatDateForInput(dateRange?.from)}
                      onChange={(e) => {
                        const nextFrom = parseDateFromInput(e.target.value)
                        const nextRange: DateRange = { from: nextFrom, to: dateRange?.to }
                        if (nextRange.from && nextRange.to && nextRange.from > nextRange.to) nextRange.to = nextRange.from
                        setRangeWithLoading(nextRange)
                      }}
                    />
                  </div>

                  <div className="grid gap-1">
                    <div className="text-xs text-muted-foreground">To</div>
                    <Input
                      type="date"
                      value={formatDateForInput(dateRange?.to)}
                      onChange={(e) => {
                        const nextTo = parseDateFromInput(e.target.value)
                        const nextRange: DateRange = { from: dateRange?.from, to: nextTo }
                        if (nextRange.from && nextRange.to && nextRange.to < nextRange.from) nextRange.from = nextRange.to
                        setRangeWithLoading(nextRange)
                      }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-sm font-medium text-foreground">Selected Range</div>

                {dateRange?.from && dateRange?.to ? (
                  <>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {dateRange.from.toLocaleDateString()} – {dateRange.to.toLocaleDateString()}
                    </div>
                    <div className="mt-3 grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Days</span>
                        <span className="font-medium text-foreground">{Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-1 text-sm text-muted-foreground">Pick a start and end date.</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Stats */}
        <div className="space-y-4 lg:col-span-7">
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
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart key={theme} data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={chartTextColor} style={{ fontSize: "12px" }} />
                <YAxis stroke={chartTextColor} style={{ fontSize: "12px" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: chartTextColor }} />
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
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart key={theme}>
                  <Pie data={conversionData} cx="50%" cy="50%" outerRadius={110} labelLine={false} label={false} dataKey="value">
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {conversionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 text-xs text-muted-foreground">Total: {conversionData.reduce((sum, x) => sum + x.value, 0)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
