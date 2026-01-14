import { useEffect, useMemo, useState } from "react"
import Cookies from "js-cookie"
import { toast } from "sonner"

import AppSidebar from "@/components/AppSidebar/app-sidebar"
import { columns } from "@/components/DataTable/columns"
import { DataTable, DataTableSkeleton } from "@/components/DataTable/data-table"
import { AddRowSheet, type NewRowForm } from "@/components/DataTable/AddRowSheet"
import { seedRows } from "@/components/DataTable/seed"
import type { PersonRow } from "@/components/DataTable/types"
import { Input } from "@/components/ui/input"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DataTablePage() {
  const defaultOpen = Cookies.get("sidebar_state") === "true"

  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<PersonRow[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const t = setTimeout(() => {
      setRows(seedRows)
      setLoading(false)
    }, 700)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => {
      return r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.role.toLowerCase().includes(q) || r.status.toLowerCase().includes(q)
    })
  }, [query, rows])

  const handleAddRow = (form: NewRowForm) => {
    const name = form.name.trim()
    const email = form.email.trim()

    if (!name || !email) {
      toast.error("Please fill in Name and Email.")
      return false
    }

    setRows((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        email,
        role: form.role.trim() || "User",
        status: form.status,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])

    toast.success("Row added successfully.")
    return true
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh overflow-hidden">
      <AppSidebar />

      <main className="flex w-full flex-1 min-h-0 min-w-0 flex-col p-4 overflow-hidden">
        <header className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Data Table</h1>
              <p className="text-sm text-muted-foreground">Example table with pagination, scroll area, and add form.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button> */}
            <AddRowSheet onAddRow={handleAddRow} />
          </div>
        </header>

        <div className="mb-4 flex items-center gap-2">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, email, role, status..." />
        </div>

        <div className="flex-1 min-h-0">
          {loading ? <DataTableSkeleton /> : <DataTable columns={columns} data={filtered} />}
        </div>
      </main>
    </SidebarProvider>
  )
}
