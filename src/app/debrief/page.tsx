import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Ear } from 'lucide-react'

import { howToUseIt, roomChangeCues } from '@/data/debrief'

import { DebriefWorkbench } from './DebriefWorkbench'

export const metadata: Metadata = {
  title: 'After the loop: the debrief template',
  description:
    'A structured debrief to fill in after any interview or rejection: what was asked by round, where the room changed, the feedback verbatim, and your own guess at the reason, turned into a study list.',
}

export default function DebriefPage() {
  return (
    <div className="page-shell pb-24 pt-10">
      <header className="border-b border-ink-200 pb-8 dark:border-ink-800">
        <h1 className="text-4xl text-ink-900 dark:text-ink-50">After the loop: the debrief</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700 dark:text-ink-200">
          Most candidates lose the same offer twice, because a rejection with no written record teaches nothing. Fill
          this in within a couple of hours of any loop, pass or fail, and it turns what you remember into the next
          thing to study.
        </p>
      </header>

      <section aria-labelledby="how-to-use" className="mt-10">
        <h2 id="how-to-use" className="text-2xl text-ink-900 dark:text-ink-50">
          How to use it
        </h2>
        <ul className="mt-4 space-y-3">
          {howToUseIt.map((line) => (
            <li key={line} className="flex items-start gap-3 text-ink-700 dark:text-ink-200">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" />
              <span className="max-w-prose">{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cues" className="mt-12">
        <h2 id="cues" className="text-2xl text-ink-900 dark:text-ink-50">
          Cues that the room changed
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          Interviewers rarely say anything is wrong. These are the tells, and the point of writing one down is that
          the moment before it is usually the answer that cost you.
        </p>
        <ul className="mt-4 space-y-2">
          {roomChangeCues.map((cue) => (
            <li key={cue} className="flex items-start gap-3 text-ink-700 dark:text-ink-200">
              <Ear className="mt-1 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" aria-hidden="true" />
              <span className="max-w-prose">{cue}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="entries" className="mt-12">
        <h2 id="entries" className="text-2xl text-ink-900 dark:text-ink-50">
          Your entries
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          Everything here is stored in this browser only. Nothing is uploaded, and clearing your browser data clears
          it, so export anything you want to keep.
        </p>
        <div className="mt-4">
          <DebriefWorkbench />
        </div>
      </section>

      <nav aria-label="Next steps" className="rule mt-12 pt-6">
        <p className="text-sm text-ink-600 dark:text-ink-300">Then</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/mock-loop" className="btn-primary">
            Run the weak round again
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/negotiation" className="btn-secondary">
            Read the levelling notes
          </Link>
        </div>
      </nav>
    </div>
  )
}
