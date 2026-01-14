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
