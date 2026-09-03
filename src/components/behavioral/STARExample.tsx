'use client'

const LABELS = [
  { key: 'situation', label: 'Situation' },
  { key: 'task', label: 'Task' },
  { key: 'action', label: 'Action' },
  { key: 'result', label: 'Result' },
] as const

interface STARExampleProps {
  example: {
    situation: string
    task: string
    action: string
    result: string
  }
}

/**
 * STAR is a sequence, so it reads as a numbered sequence: leading step index,
 * one shared surface, no per-step color coding.
 */
export function STARExample({ example }: STARExampleProps) {
  return (
    <ol className="surface-card divide-y divide-ink-200 dark:divide-ink-800">
      {LABELS.map(({ key, label }, i) => (
        <li key={key} className="flex gap-4 p-5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-300 font-mono text-xs text-ink-600 dark:border-ink-700 dark:text-ink-300">
            {i + 1}
          </span>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-600 dark:text-ink-300">
              {label}
            </h4>
            <p className="mt-1.5 max-w-prose leading-relaxed text-ink-800 dark:text-ink-100">
              {example[key]}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
