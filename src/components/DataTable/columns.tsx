import type { ColumnDef } from "@tanstack/react-table"

import type { PersonRow } from "@/components/DataTable/types"

export const columns: ColumnDef<PersonRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "createdAt", header: "Created" },
]
