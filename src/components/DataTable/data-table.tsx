import type { ColumnDef, SortingState } from "@tanstack/react-table"
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const PAGE_SIZE_OPTIONS = [10, 30, 50, 100] as const

const COLUMN_WIDTHS: Record<string, number> = {
  name: 180,
  email: 280,
  role: 140,
  status: 140,
  createdAt: 140,
}

const minTableWidth = Object.values(COLUMN_WIDTHS).reduce((sum, w) => sum + w, 0)

export function DataTable<TData, TValue>({ columns, data }: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    initialState: { pagination: { pageSize: 10 } },
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const pageSize = table.getState().pagination.pageSize
  const canPrev = table.getCanPreviousPage()
  const canNext = table.getCanNextPage()

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex-1 min-h-0 overflow-x-auto">
        <div style={{ minWidth: minTableWidth }} className="h-full">
          <ScrollArea className="h-full min-h-0 rounded-md border border-border">
            <div className="p-2">
              <Table className="table-fixed">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          style={COLUMN_WIDTHS[header.column.id] ? { width: COLUMN_WIDTHS[header.column.id] } : undefined}
                          className={cn("sticky top-0 z-10 bg-background", header.column.id === "email" && "pr-4")}
                        >
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
                          <TableCell key={cell.id} style={COLUMN_WIDTHS[cell.column.id] ? { width: COLUMN_WIDTHS[cell.column.id] } : undefined} className="max-w-0 truncate">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
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
        </div>
      </div>

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

        <Pagination className="ml-auto mr-0 w-fit">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (!canPrev) return
                  table.previousPage()
                }}
                aria-disabled={!canPrev}
                tabIndex={canPrev ? 0 : -1}
                className={canPrev ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" onClick={(e) => e.preventDefault()} isActive>
                {pageIndex + 1}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (!canNext) return
                  table.nextPage()
                }}
                aria-disabled={!canNext}
                tabIndex={canNext ? 0 : -1}
                className={canNext ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
