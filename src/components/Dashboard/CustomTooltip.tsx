type TooltipEntry = {
  name?: string
  value?: string | number
  color?: string
}

type Props = {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}

export function CustomTooltip({ active, payload, label }: Props) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-md border border-border bg-white p-2 shadow-md dark:bg-card dark:text-foreground">
      <p className="text-sm font-medium text-black dark:text-white">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm text-black dark:text-white" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}
