import type { PersonRow } from "@/components/DataTable/types"

const firstNames = [
  "Olivia",
  "Jackson",
  "Isabella",
  "William",
  "Sofia",
  "Noah",
  "Emma",
  "Liam",
  "Ava",
  "Mason",
  "Mia",
  "Ethan",
  "Harper",
  "Lucas",
  "Sophia",
  "James",
  "Amelia",
  "Benjamin",
  "Charlotte",
  "Henry",
  "Evelyn",
  "Daniel",
  "Ella",
  "Matthew",
  "Grace",
]

const lastNames = [
  "Martin",
  "Lee",
  "Anderson",
  "Kim",
  "Davis",
  "Johnson",
  "Wilson",
  "Brown",
  "Thompson",
  "Garcia",
  "Patel",
  "Nguyen",
  "Scott",
  "Taylor",
  "Clark",
  "Martinez",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "Hernandez",
  "King",
  "Wright",
  "Lopez",
  "Hill",
]

const roles = ["User", "Admin", "Manager"] as const
const statuses = ["Active", "Inactive"] as const

export const seedRows: PersonRow[] = Array.from({ length: 120 }, (_, index) => {
  const id = String(index + 1)

  const first = firstNames[index % firstNames.length]
  const last = lastNames[(index * 3) % lastNames.length]
  const name = `${first} ${last}`

  const email = `${first}.${last}.${id}`.toLowerCase() + "@example.com"

  const role = roles[index % roles.length]
  const status = statuses[index % statuses.length]

  const createdAt = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10)

  return { id, name, email, role, status, createdAt }
})
