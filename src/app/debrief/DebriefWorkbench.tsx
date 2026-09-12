'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ClipboardCopy, Plus, Trash2 } from 'lucide-react'

import { noHireReasons, roomChangeCues, roundSlots } from '@/data/debrief'
import { weeks } from '@/data/roadmap'

const STORAGE_KEY = 'debrief-entries'

interface DebriefEntry {
  id: string
  company: string
  date: string
  asked: Record<string, string>
  roomChange: string
  feedback: string
  reasonIds: string[]
}

const newEntry = (): DebriefEntry => ({
  id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  company: '',
  date: new Date().toISOString().slice(0, 10),
  asked: {},
  roomChange: '',
  feedback: '',
  reasonIds: [],
})

const textareaClass =
  'mt-1 w-full min-h-[88px] rounded-lg border border-ink-300 bg-white p-3 text-base text-ink-900 transition-colors duration-150 ease-out hover:border-ink-400 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:hover:border-ink-600'

const inputClass =
  'mt-1 min-h-[44px] w-full rounded-lg border border-ink-300 bg-white px-3 text-base text-ink-900 transition-colors duration-150 ease-out hover:border-ink-400 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:hover:border-ink-600'

const asPlainText = (entry: DebriefEntry): string => {
  const lines: string[] = []
  lines.push(`Debrief: ${entry.company || 'Company not set'} (${entry.date || 'no date'})`)
  lines.push('')
  lines.push('What was asked')
  roundSlots.forEach((slot) => {
    const value = entry.asked[slot.id]?.trim()
    if (value) lines.push(`  ${slot.label}: ${value}`)
  })
  if (entry.roomChange.trim()) {
    lines.push('')
    lines.push('Where the room changed')
    lines.push(`  ${entry.roomChange.trim()}`)
  }
  if (entry.feedback.trim()) {
    lines.push('')
    lines.push('Feedback, verbatim')
    lines.push(`  ${entry.feedback.trim()}`)
  }
  const reasons = noHireReasons.filter((reason) => entry.reasonIds.includes(reason.id))
  if (reasons.length) {
    lines.push('')
    lines.push('My guess at the reason')
    reasons.forEach((reason) => lines.push(`  ${reason.label}`))
    lines.push('')
    lines.push('Study list')
    reasons.forEach((reason) => {
      reason.study.forEach((link) => lines.push(`  ${link.label} (${link.href})`))
      lines.push(`  Roadmap weeks ${reason.roadmapWeeks.join(', ')}: ${reason.roadmapNote}`)
    })
  }
  return lines.join('\n')
}

export function DebriefWorkbench() {
  const [entries, setEntries] = useState<DebriefEntry[]>([])
  const [loaded, setLoaded] = useState(false)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setEntries(JSON.parse(stored) as DebriefEntry[])
    } catch {}
    setLoaded(true)
  }, [])

  const persist = (next: DebriefEntry[]) => {
    setEntries(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }

  const update = (id: string, patch: Partial<DebriefEntry>) => {
    persist(entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)))
  }

  const toggleReason = (entry: DebriefEntry, reasonId: string) => {
    const next = entry.reasonIds.includes(reasonId)
      ? entry.reasonIds.filter((id) => id !== reasonId)
      : [...entry.reasonIds, reasonId]
    update(entry.id, { reasonIds: next })
  }

  const remove = (id: string) => {
    persist(entries.filter((entry) => entry.id !== id))
    setConfirmingId(null)
  }

  const copy = async (entry: DebriefEntry) => {
    try {
      await navigator.clipboard.writeText(asPlainText(entry))
      setCopiedId(entry.id)
    } catch {}
  }

  useEffect(() => {
    if (!copiedId) return
    const timeout = setTimeout(() => setCopiedId(null), 2000)
    return () => clearTimeout(timeout)
  }, [copiedId])

  const allReasonIds = useMemo(
    () => Array.from(new Set(entries.flatMap((entry) => entry.reasonIds))),
    [entries]
  )
  const studyReasons = noHireReasons.filter((reason) => allReasonIds.includes(reason.id))

  if (!loaded) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => persist([newEntry(), ...entries])} className="btn-primary">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add an entry
        </button>
        <p className="text-sm text-ink-600 dark:text-ink-300">
          <span className="font-mono tabular-nums">{entries.length}</span> saved in this browser
        </p>
      </div>

      {entries.length === 0 && (
        <p className="surface-sunken p-5 text-ink-700 dark:text-ink-200">
          No entries yet. Add one straight after a loop, or after a rejection that came with no explanation.
        </p>
      )}

      {entries.map((entry) => (
        <article key={entry.id} className="surface-card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${entry.id}-company`} className="block text-sm font-medium text-ink-700 dark:text-ink-200">
                Company
              </label>
              <input
                id={`${entry.id}-company`}
                type="text"
                value={entry.company}
                onChange={(event) => update(entry.id, { company: event.target.value })}
                placeholder="Meta"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${entry.id}-date`} className="block text-sm font-medium text-ink-700 dark:text-ink-200">
                Date of the loop
              </label>
              <input
                id={`${entry.id}-date`}
                type="date"
                value={entry.date}
                onChange={(event) => update(entry.id, { date: event.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <h3 className="mt-6 text-sm font-semibold text-ink-600 dark:text-ink-300">What was asked, by round</h3>
          <div className="mt-2 space-y-4">
            {roundSlots.map((slot) => (
              <div key={slot.id}>
                <label
                  htmlFor={`${entry.id}-${slot.id}`}
                  className="block text-sm font-medium text-ink-700 dark:text-ink-200"
                >
                  {slot.label}
                </label>
                <textarea
                  id={`${entry.id}-${slot.id}`}
                  value={entry.asked[slot.id] ?? ''}
                  onChange={(event) => update(entry.id, { asked: { ...entry.asked, [slot.id]: event.target.value } })}
                  placeholder={slot.hint}
                  className={textareaClass}
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <label
              htmlFor={`${entry.id}-room`}
              className="block text-sm font-semibold text-ink-600 dark:text-ink-300"
            >
              Where you felt the room change
            </label>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
              Name the round and the moment. Cues worth checking: {roomChangeCues.slice(0, 3).join(' ')}
            </p>
            <textarea
              id={`${entry.id}-room`}
              value={entry.roomChange}
              onChange={(event) => update(entry.id, { roomChange: event.target.value })}
              placeholder="System design, about 30 minutes in, when they asked what fails first at ten times the load."
              className={textareaClass}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor={`${entry.id}-feedback`}
              className="block text-sm font-semibold text-ink-600 dark:text-ink-300"
            >
              The feedback you got, verbatim
            </label>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
              Paste it unedited, including the parts that sting. Leave it empty if you were given none.
            </p>
            <textarea
              id={`${entry.id}-feedback`}
              value={entry.feedback}
              onChange={(event) => update(entry.id, { feedback: event.target.value })}
              className={textareaClass}
            />
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-ink-600 dark:text-ink-300">
              Your own guess at the no-hire reason
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {noHireReasons.map((reason) => {
                const selected = entry.reasonIds.includes(reason.id)
                return (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => toggleReason(entry, reason.id)}
                    aria-pressed={selected}
                    className={
                      selected
                        ? 'inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-clay-600 px-3 text-sm font-semibold text-white transition-colors duration-150 ease-out dark:bg-clay-500 dark:text-ink-950'
                        : 'inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-ink-300 px-3 text-sm font-semibold text-ink-700 transition-colors duration-150 ease-out hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800'
                    }
                  >
                    {selected && <Check className="h-4 w-4" aria-hidden="true" />}
                    {reason.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-4 dark:border-ink-800">
            <button type="button" onClick={() => copy(entry)} className="btn-secondary">
              {copiedId === entry.id ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
              )}
              {copiedId === entry.id ? 'Copied' : 'Export as text'}
            </button>

            {confirmingId === entry.id ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-ink-900 dark:text-ink-50">Delete entry?</span>
                <button
                  type="button"
                  onClick={() => remove(entry.id)}
                  className="min-h-[44px] rounded-lg border border-rust-300 px-3 text-sm font-semibold text-rust-700 transition-colors duration-150 ease-out hover:bg-rust-50 dark:border-rust-800 dark:text-rust-300 dark:hover:bg-rust-950/60"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingId(null)}
                  className="min-h-[44px] rounded-lg px-3 text-sm font-semibold text-ink-700 transition-colors duration-150 ease-out hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingId(entry.id)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-ink-700 transition-colors duration-150 ease-out hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            )}
          </div>
        </article>
      ))}

      {studyReasons.length > 0 && (
        <section aria-labelledby="study-list" className="surface-card p-5">
          <h3 id="study-list" className="text-lg text-ink-900 dark:text-ink-50">
            Your study list
          </h3>
          <p className="prose-column mt-2">
            Built from the reasons you selected across all your entries. Work down it in order, because the first
            item is the one that has cost you an offer most recently.
          </p>
          <div className="mt-4 divide-y divide-ink-200 dark:divide-ink-800">
            {studyReasons.map((reason) => (
              <div key={reason.id} className="py-4 first:pt-0">
                <h4 className="text-base font-semibold text-ink-900 dark:text-ink-50">{reason.label}</h4>
                <p className="prose-column mt-1">{reason.looksLike}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {reason.study.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-clay-700 transition-colors duration-150 ease-out hover:text-clay-800 dark:text-clay-400 dark:hover:text-clay-300"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
                <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                  <Link
                    href={`/roadmap#${weeks[reason.roadmapWeeks[0] - 1]?.id ?? ''}`}
                    className="font-semibold text-clay-700 transition-colors duration-150 ease-out hover:text-clay-800 dark:text-clay-400 dark:hover:text-clay-300"
                  >
                    Roadmap weeks {reason.roadmapWeeks.join(', ')}
                  </Link>
                  . {reason.roadmapNote}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
