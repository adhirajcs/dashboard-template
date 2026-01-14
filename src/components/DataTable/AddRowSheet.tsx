import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export type NewRowForm = {
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

type Props = {
  onAddRow: (form: NewRowForm) => boolean
}

export function AddRowSheet({ onAddRow }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<NewRowForm>({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  })

  const submit = () => {
    const ok = onAddRow(form)
    if (!ok) return
    setForm({ name: "", email: "", role: "User", status: "Active" })
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Row
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new row</SheetTitle>
          <SheetDescription>Fill the details and save to insert into the table.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 grid gap-4 px-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Jane Doe" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="e.g. jane@example.com" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Role</label>
            <Input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} placeholder="User" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Status</label>
            <div className="flex gap-2">
              <Button type="button" variant={form.status === "Active" ? "default" : "outline"} onClick={() => setForm((p) => ({ ...p, status: "Active" }))}>
                Active
              </Button>
              <Button type="button" variant={form.status === "Inactive" ? "default" : "outline"} onClick={() => setForm((p) => ({ ...p, status: "Inactive" }))}>
                Inactive
              </Button>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button type="button" onClick={submit}>
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
