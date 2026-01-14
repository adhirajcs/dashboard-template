import type { ColumnDef } from "@tanstack/react-table"
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const PAGE_SIZE_OPTIONS = [10, 30, 50, 100] as const

export function DataTable<TData, TValue>({ columns, data }: Props<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const pageSize = table.getState().pagination.pageSize

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <ScrollArea className="h-full flex-1 min-h-0 rounded-md border border-border">
        <div className="p-2">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="sticky top-0 z-10 bg-background">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Page <span className="text-foreground">{pageIndex + 1}</span> of <span className="text-foreground">{Math.max(pageCount, 1)}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="h-8">
                Rows: {pageSize}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" side="top">
              <DropdownMenuLabel>Page size</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={String(pageSize)} onValueChange={(value) => table.setPageSize(Number(value))}>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <DropdownMenuRadioItem key={size} value={String(size)}>
                    {size}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault()
                  table.previousPage()
                }}
                aria-disabled={!table.getCanPreviousPage()}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" onClick={(e) => e.preventDefault()} isActive>
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault()
                  table.nextPage()
                }}
                aria-disabled={!table.getCanNextPage()}
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export function DataTableSkeleton() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <Skeleton className="flex-1 w-full rounded-md border border-border" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-64" />
      </div>
    </div>
  )
}
