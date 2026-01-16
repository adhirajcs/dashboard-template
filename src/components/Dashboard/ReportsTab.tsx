import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableSkeleton } from "@/components/Dashboard/skeletons"

export function ReportsTab() {
  const [loading, setLoading] = useState(false)

  const handleExport = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Sales Report</h3>
          <p className="text-sm text-muted-foreground">Detailed sales data by product</p>
        </div>
        <Button onClick={handleExport} disabled={loading}>
          {loading && <span className="mr-2">Loading...</span>}
          Export Report
        </Button>
      </div>

      <Card className="py-0 overflow-hidden">
        <CardContent className="px-0">
          {loading ? (
            <div className="px-6 py-6">
              <TableSkeleton />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/100">
                <TableRow className="hover:bg-muted/40">
                  <TableHead className="h-12 px-4 text-xs font-semibold uppercase tracking-wide text-foreground">Product</TableHead>
                  <TableHead className="h-12 px-4 text-xs font-semibold uppercase tracking-wide text-foreground">Category</TableHead>
                  <TableHead className="h-12 px-4 text-xs font-semibold uppercase tracking-wide text-foreground">Sales</TableHead>
                  <TableHead className="h-12 px-4 text-xs font-semibold uppercase tracking-wide text-foreground text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="px-4 font-medium">Pro Plan</TableCell>
                  <TableCell className="px-4">Subscription</TableCell>
                  <TableCell className="px-4">2,245</TableCell>
                  <TableCell className="px-4 text-right">$89,800.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="px-4 font-medium">Starter Plan</TableCell>
                  <TableCell className="px-4">Subscription</TableCell>
                  <TableCell className="px-4">3,891</TableCell>
                  <TableCell className="px-4 text-right">$58,365.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="px-4 font-medium">API Access</TableCell>
                  <TableCell className="px-4">Add-on</TableCell>
                  <TableCell className="px-4">1,230</TableCell>
                  <TableCell className="px-4 text-right">$36,900.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="px-4 font-medium">Custom Enterprise</TableCell>
                  <TableCell className="px-4">Enterprise</TableCell>
                  <TableCell className="px-4">89</TableCell>
                  <TableCell className="px-4 text-right">$268,900.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="px-4 font-medium">Support Plan</TableCell>
                  <TableCell className="px-4">Service</TableCell>
                  <TableCell className="px-4">567</TableCell>
                  <TableCell className="px-4 text-right">$28,350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
