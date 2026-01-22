import { useEffect, useMemo, useRef, useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Spinner } from "@/components/ui/spinner"

type RoleOption = "User" | "Admin" | "Manager"
const ROLE_OPTIONS: RoleOption[] = ["User", "Admin", "Manager"]

export type NewRowForm = {
  name: string
  email: string
  role: RoleOption
  status: "Active" | "Inactive"
}

type Props = {
  onAddRow: (form: NewRowForm) => boolean
}

type FormErrors = Partial<Record<keyof NewRowForm, string>>
type Touched = Partial<Record<keyof NewRowForm, boolean>>

const stripControlChars = (value: string) => value.replace(/[\u0000-\u001F\u007F]/g, "")

const sanitizeText = (value: string) => stripControlChars(value).replace(/\s+/g, " ").trim()

const sanitizeEmail = (value: string) => stripControlChars(value).replace(/\s+/g, "").trim().toLowerCase()

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)

const coerceRole = (value: string): RoleOption => {
  const v = sanitizeText(value)
  return ROLE_OPTIONS.includes(v as RoleOption) ? (v as RoleOption) : "User"
}

const sanitizeForm = (form: NewRowForm): NewRowForm => {
  const name = sanitizeText(form.name)
  const email = sanitizeEmail(form.email)
  const role = coerceRole(form.role)
  return { ...form, name, email, role }
}

const validateForm = (form: NewRowForm): FormErrors => {
  const errors: FormErrors = {}

  if (!form.name) errors.name = "Name is required."
  else if (form.name.length < 2) errors.name = "Name must be at least 2 characters."

  if (!form.email) errors.email = "Email is required."
  else if (form.email.length > 254) errors.email = "Email is too long."
  else if (!isValidEmail(form.email)) errors.email = "Enter a valid email (e.g. jane@example.com)."

  if (!ROLE_OPTIONS.includes(form.role)) errors.role = "Please select a valid role."

  return errors
}

export function AddRowSheet({ onAddRow }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const timeoutRef = useRef<number | null>(null)

  const [touched, setTouched] = useState<Touched>({})
  const [form, setForm] = useState<NewRowForm>({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const sanitizedPreview = useMemo(() => sanitizeForm(form), [form])
  const errors = useMemo(() => validateForm(sanitizedPreview), [sanitizedPreview])
  const hasErrors = Object.keys(errors).length > 0

  const showFieldError = (key: keyof NewRowForm) => !!touched[key] && !!errors[key]

  const submit = () => {
    if (loading) return

    const sanitized = sanitizeForm(form)
    setForm(sanitized)

    const validationErrors = validateForm(sanitized)
    if (Object.keys(validationErrors).length > 0) {
      setTouched({ name: true, email: true, role: true })
      return
    }

    const ok = onAddRow(sanitized)
    if (!ok) return

    setLoading(true)
    timeoutRef.current = window.setTimeout(() => {
      setForm({ name: "", email: "", role: "User", status: "Active" })
      setTouched({})
      setOpen(false)
      setLoading(false)
    }, 1000)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (loading) return
        setOpen(next)
        if (!next) setTouched({})
      }}
    >
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
            <Input
              disabled={loading}
              value={form.name}
              onChange={(e) => {
                const value = e.target.value
                setForm((p) => ({ ...p, name: value }))
                setTouched((t) => ({ ...t, name: true }))
              }}
              onBlur={() => setForm((p) => ({ ...p, name: sanitizeText(p.name) }))}
              placeholder="e.g. Jane Doe"
              aria-invalid={showFieldError("name")}
            />
            {showFieldError("name") ? <p className="text-sm text-destructive">{errors.name}</p> : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              disabled={loading}
              value={form.email}
              onChange={(e) => {
                const value = e.target.value
                setForm((p) => ({ ...p, email: value }))
                setTouched((t) => ({ ...t, email: true }))
              }}
              onBlur={() => setForm((p) => ({ ...p, email: sanitizeEmail(p.email) }))}
              placeholder="e.g. jane@example.com"
              inputMode="email"
              autoComplete="email"
              aria-invalid={showFieldError("email")}
            />
            {showFieldError("email") ? <p className="text-sm text-destructive">{errors.email}</p> : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Role</label>
            <Select
              value={form.role}
              onValueChange={(value) => {
                setForm((p) => ({ ...p, role: coerceRole(value) }))
                setTouched((t) => ({ ...t, role: true }))
              }}
              disabled={loading}
            >
              <SelectTrigger className="w-full" aria-invalid={showFieldError("role")}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                {ROLE_OPTIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {showFieldError("role") ? <p className="text-sm text-destructive">{errors.role}</p> : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Status</label>
            <div className="flex gap-2">
              <Button disabled={loading} type="button" variant={form.status === "Active" ? "default" : "outline"} onClick={() => setForm((p) => ({ ...p, status: "Active" }))}>
                Active
              </Button>
              <Button disabled={loading} type="button" variant={form.status === "Inactive" ? "default" : "outline"} onClick={() => setForm((p) => ({ ...p, status: "Inactive" }))}>
                Inactive
              </Button>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </SheetClose>

          <Button type="button" onClick={submit} disabled={loading || hasErrors}>
            {loading && (
              <span className="mr-2 inline-flex">
                <Spinner />
              </span>
            )}
            {loading ? <span>Saving...</span> : <span>Save</span>}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
