import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const COLUMN_WIDTHS: Record<string, number> = {
  name: 180,
  email: 280,
  role: 140,
  status: 140,
  createdAt: 140,
}

const minTableWidth = Object.values(COLUMN_WIDTHS).reduce((sum, w) => sum + w, 0)

const cellSkeletonClass = (colId: string) => {
  if (colId === "email") return "h-4 w-52"
  if (colId === "name") return "h-4 w-28"
  if (colId === "createdAt") return "h-4 w-24"
  return "h-4 w-20"
}

export const DataTableSkeleton = () => {
  const colIds = Object.keys(COLUMN_WIDTHS)

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex-1 min-h-0 overflow-x-auto">
        <div style={{ minWidth: minTableWidth }} className="h-full">
          <ScrollArea className="h-full min-h-0 rounded-md border border-border">
            <div className="p-2">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {colIds.map((colId) => (
                      <TableHead key={colId} style={COLUMN_WIDTHS[colId] ? { width: COLUMN_WIDTHS[colId] } : undefined} className={cn("sticky top-0 z-10 bg-background", colId === "email" && "pr-4")}>
                        <Skeleton className="h-4 w-20" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-transparent">
                      {colIds.map((colId) => (
                        <TableCell key={colId} style={COLUMN_WIDTHS[colId] ? { width: COLUMN_WIDTHS[colId] } : undefined} className="max-w-0">
                          <Skeleton className={cellSkeletonClass(colId)} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-64" />
      </div>
    </div>
  )
}
