import type { ColumnDef, HeaderContext } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PersonRow } from "@/components/DataTable/types"
import { cn } from "@/lib/utils"

const sortableHeader =
  (label: string) =>
  ({ column }: HeaderContext<PersonRow, unknown>) => {
    const sorted = column.getIsSorted() // false | "asc" | "desc"

    return (
      <Button
        type="button"
        variant="ghost"
        className={cn("-ml-3 h-8 w-full justify-start px-2", sorted && "bg-accent text-accent-foreground")}
        onClick={() => {
          if (sorted === "desc")
            column.clearSorting() // none
          else column.toggleSorting(sorted === "asc") // none->asc, asc->desc
        }}
      >
        <span className="min-w-0 truncate">{label}</span>

        {sorted === "asc" ? <ArrowUp className="h-4 w-4" /> : sorted === "desc" ? <ArrowDown className="h-4 w-4" /> : <ArrowUpDown className="h-4 w-4 opacity-50" />}
      </Button>
    )
  }

export const columns: ColumnDef<PersonRow>[] = [
  { accessorKey: "name", header: sortableHeader("Name") },
  { accessorKey: "email", header: sortableHeader("Email") },
  { accessorKey: "role", header: sortableHeader("Role") },
  { accessorKey: "status", header: sortableHeader("Status") },
  { accessorKey: "createdAt", header: sortableHeader("Created") },
]
