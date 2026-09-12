import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Coffee, Mic } from 'lucide-react'

import { breaks, howToRunIt, mockLoopTotalMinutes, rounds } from '@/data/mockLoop'

import { RoundTimer } from './RoundTimer'
import { ScoreSheet } from './ScoreSheet'

export const metadata: Metadata = {
  title: 'Mock loop day: a timed full-day engineering manager simulation',
  description:
    'Six rounds, four and a half hours, with prompts to have a partner ask, what a strong answer covers, a round timer, and a self-score sheet that tells you which round to study next.',
}

const hours = Math.floor(mockLoopTotalMinutes / 60)
const minutes = mockLoopTotalMinutes % 60

export default function MockLoopPage() {
  return (
    <div className="page-shell pb-24 pt-10">
      <header className="border-b border-ink-200 pb-8 dark:border-ink-800">
        <h1 className="text-4xl text-ink-900 dark:text-ink-50">Mock loop day</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700 dark:text-ink-200">
          Practising one round at a time hides the thing that actually fails on the day, which is that round five is
          answered by a tired version of you. This is a full loop, six rounds and{' '}
          <span className="font-mono tabular-nums">
            {hours}h {String(minutes).padStart(2, '0')}m
          </span>{' '}
          including breaks, run in one sitting with a partner or a recorder.
        </p>
      </header>

      <section aria-labelledby="how-to-run" className="mt-10">
        <h2 id="how-to-run" className="text-2xl text-ink-900 dark:text-ink-50">
          How to run it
        </h2>
        <ul className="mt-4 space-y-3">
          {howToRunIt.map((line) => (
            <li key={line} className="flex items-start gap-3 text-ink-700 dark:text-ink-200">
              <Mic className="mt-1 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" aria-hidden="true" />
              <span className="max-w-prose">{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="timer" className="mt-12">
        <h2 id="timer" className="text-2xl text-ink-900 dark:text-ink-50">
          Timer
        </h2>
        <div className="mt-4">
          <RoundTimer />
        </div>
      </section>

      <section aria-labelledby="schedule" className="mt-12">
        <h2 id="schedule" className="text-2xl text-ink-900 dark:text-ink-50">
          The day
        </h2>
        <div className="mt-4 space-y-4">
          {rounds.map((round, index) => {
            const slot = breaks.find((item) => item.afterRoundId === round.id)
            return (
              <div key={round.id}>
                <article className="surface-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-lg text-ink-900 dark:text-ink-50">
                      <span className="font-mono tabular-nums text-sm text-clay-700 dark:text-clay-400">
                        {index + 1}
                      </span>{' '}
                      {round.name}
                    </h3>
                    <span className="chip">
                      <span className="font-mono tabular-nums">{round.minutes}</span> min
                    </span>
                  </div>
                  <p className="prose-column mt-2">{round.goal}</p>

                  <div className="surface-sunken mt-4 p-4">
                    <h4 className="text-sm font-semibold text-ink-600 dark:text-ink-300">
                      Have your partner ask these
                    </h4>
                    <ol className="mt-2 space-y-2">
                      {round.prompts.map((prompt, promptIndex) => (
                        <li key={prompt} className="flex gap-3 text-ink-700 dark:text-ink-200">
                          <span className="font-mono tabular-nums text-sm text-ink-600 dark:text-ink-300">
                            {promptIndex + 1}
                          </span>
                          <span>{prompt}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-ink-600 dark:text-ink-300">
                      What a strong answer covers
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {round.strongAnswer.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-ink-700 dark:text-ink-200">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" />
                          <span className="max-w-prose">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-sm">
                    <Link
                      href={round.track}
                      className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-clay-700 transition-colors duration-150 ease-out hover:text-clay-800 dark:text-clay-400 dark:hover:text-clay-300"
                    >
                      {round.trackLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </p>
                </article>

                {slot && (
                  <p className="mt-3 flex items-start gap-3 pl-1 text-sm text-ink-600 dark:text-ink-300">
                    <Coffee className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="font-mono tabular-nums">{slot.minutes}</span> minute break. {slot.use}
                    </span>
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="score" className="mt-12">
        <h2 id="score" className="text-2xl text-ink-900 dark:text-ink-50">
          Self-score sheet
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          Score each round immediately after it ends, before you know how the rest of the day went. Four criteria per
          round, one to four, with the anchors written out so the numbers mean the same thing each time you run this.
        </p>
        <div className="mt-4">
          <ScoreSheet />
        </div>
      </section>

      <nav aria-label="Next steps" className="rule mt-12 pt-6">
        <p className="text-sm text-ink-600 dark:text-ink-300">After the day</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/debrief" className="btn-primary">
            Write the debrief
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/roadmap" className="btn-secondary">
            Back to the 8-week plan
          </Link>
        </div>
      </nav>
    </div>
  )
}
