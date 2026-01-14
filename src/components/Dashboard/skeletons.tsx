import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const CardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </CardHeader>
    <CardContent>
      <Skeleton className="mb-2 h-8 w-24" />
      <Skeleton className="h-3 w-40" />
    </CardContent>
  </Card>
)

export const TableSkeleton = () => (
  <div className="space-y-2">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
)
