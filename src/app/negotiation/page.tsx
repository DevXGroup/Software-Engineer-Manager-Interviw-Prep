import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, CircleDot, MinusCircle, Quote, X } from 'lucide-react'

import {
  companyRows,
  componentRows,
  levellingNotes,
  mistakes,
  scripts,
  sequence,
  walkAwaySignals,
  type Negotiability,
} from '@/data/negotiation'

import { OfferCalculator } from './OfferCalculator'

export const metadata: Metadata = {
  title: 'Offer, levelling and negotiation for engineering managers',
  description:
    'How levelling is decided in the debrief, why downlevels happen, what is actually negotiable per component at Meta, Amazon, Apple, Netflix, Google and Microsoft, five scripts you can say out loud, and a two-offer comparison calculator.',
}

const negotiabilityStyle: Record<Negotiability, string> = {
  'usually movable':
    'inline-flex items-center gap-1.5 rounded-md border border-moss-300 bg-moss-50 px-2 py-0.5 text-xs font-medium text-moss-800 dark:border-moss-800 dark:bg-moss-950/60 dark:text-moss-200',
  'sometimes movable':
    'inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200',
  'rarely movable':
    'inline-flex items-center gap-1.5 rounded-md border border-rust-300 bg-rust-50 px-2 py-0.5 text-xs font-medium text-rust-800 dark:border-rust-800 dark:bg-rust-950/60 dark:text-rust-200',
}

const negotiabilityIcon: Record<Negotiability, typeof Check> = {
  'usually movable': Check,
  'sometimes movable': CircleDot,
  'rarely movable': MinusCircle,
}

export default function NegotiationPage() {
  return (
    <div className="page-shell pb-24 pt-10">
      <header className="border-b border-ink-200 pb-8 dark:border-ink-800">
        <h1 className="text-4xl text-ink-900 dark:text-ink-50">Offer, levelling and negotiation</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700 dark:text-ink-200">
          Your level is decided in a room you are not in, and your compensation is decided in a conversation you
          are in. This page separates the two: what the debrief actually does with your loop, what each part of an
          offer can really move, and the sentences to say when the recruiter asks you to go first.
        </p>
      </header>

      <section aria-labelledby="levelling" className="mt-10">
        <h2 id="levelling" className="text-2xl text-ink-900 dark:text-ink-50">
          How the level gets decided
        </h2>
        <div className="mt-4 space-y-4">
          {levellingNotes.map((note) => (
            <article key={note.id} className="surface-card p-5">
              <h3 className="text-lg text-ink-900 dark:text-ink-50">{note.title}</h3>
              <p className="prose-column mt-2">{note.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="components" className="mt-12">
        <h2 id="components" className="text-2xl text-ink-900 dark:text-ink-50">
          What is actually negotiable
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          Spend your one ask on the components that move. Trading a flexible component for a fixed one is the most
          common way candidates leave money behind.
        </p>
        <div className="surface-card mt-4 divide-y divide-ink-200 dark:divide-ink-800">
          {componentRows.map((row) => {
            const Icon = negotiabilityIcon[row.negotiability]
            return (
              <div key={row.id} className="p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg text-ink-900 dark:text-ink-50">{row.component}</h3>
                  <span className={negotiabilityStyle[row.negotiability]}>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {row.negotiability}
                  </span>
                </div>
                <p className="prose-column mt-2">{row.why}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="per-company" className="mt-12">
        <h2 id="per-company" className="text-2xl text-ink-900 dark:text-ink-50">
          Per company
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          Level names and vesting schedules below were read from levels.fyi on 12 September 2026. Anything about how
          an offer gets approved internally is labelled as commonly reported, because no company publishes it.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 dark:border-ink-800">
                <th scope="col" className="py-3 pr-4 font-semibold text-ink-900 dark:text-ink-50">
                  Company
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold text-ink-900 dark:text-ink-50">
                  Manager levels
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold text-ink-900 dark:text-ink-50">
                  Equity shape
                </th>
                <th scope="col" className="py-3 font-semibold text-ink-900 dark:text-ink-50">
                  Where the room is
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {companyRows.map((row) => (
                <tr key={row.id}>
                  <th scope="row" className="py-4 pr-4 align-top font-semibold text-ink-900 dark:text-ink-50">
                    {row.company}
                  </th>
                  <td className="py-4 pr-4 align-top text-ink-700 dark:text-ink-200">{row.managerLevels}</td>
                  <td className="py-4 pr-4 align-top text-ink-700 dark:text-ink-200">{row.equityShape}</td>
                  <td className="py-4 align-top text-ink-700 dark:text-ink-200">{row.mostMovable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="sequence" className="mt-12">
        <h2 id="sequence" className="text-2xl text-ink-900 dark:text-ink-50">
          The sequence
        </h2>
        <ol className="mt-4 space-y-4">
          {sequence.map((item, index) => (
            <li key={item.id} className="surface-card p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-sm font-semibold text-clay-700 dark:text-clay-400">
                  {index + 1}
                </span>
                <h3 className="text-lg text-ink-900 dark:text-ink-50">{item.step}</h3>
              </div>
              <p className="prose-column mt-2">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="calculator" className="mt-12">
        <h2 id="calculator" className="text-2xl text-ink-900 dark:text-ink-50">
          Compare two offers
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          The headline total hides the shape of the payout. Put both packages in and compare year one against the
          four-year average.
        </p>
        <div className="mt-4">
          <OfferCalculator />
        </div>
      </section>

      <section aria-labelledby="scripts" className="mt-12">
        <h2 id="scripts" className="text-2xl text-ink-900 dark:text-ink-50">
          Five things to say
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          Read each one aloud twice before the call. The point is not the wording, it is that you have already
          decided what you are willing to say.
        </p>
        <div className="mt-4 space-y-4">
          {scripts.map((script) => (
            <article key={script.id} className="surface-card p-5">
              <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{script.situation}</h3>
              <div className="surface-sunken mt-3 flex gap-3 p-4">
                <Quote className="mt-1 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" aria-hidden="true" />
                <p className="text-base leading-relaxed text-ink-700 dark:text-ink-200">{script.say}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="mistakes" className="mt-12">
        <h2 id="mistakes" className="text-2xl text-ink-900 dark:text-ink-50">
          Six mistakes
        </h2>
        <div className="surface-card mt-4 divide-y divide-ink-200 dark:divide-ink-800">
          {mistakes.map((item) => (
            <div key={item.id} className="p-5">
              <div className="flex items-start gap-3">
                <X className="mt-1 h-4 w-4 shrink-0 text-rust-600 dark:text-rust-400" aria-hidden="true" />
                <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{item.mistake}</h3>
              </div>
              <p className="prose-column mt-2 pl-7">{item.instead}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="walk" className="mt-12">
        <h2 id="walk" className="text-2xl text-ink-900 dark:text-ink-50">
          When to walk
        </h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          None of these is about the money. Each one is a signal about how the company will treat you once you no
          longer have leverage.
        </p>
        <ul className="mt-4 space-y-2">
          {walkAwaySignals.map((signal) => (
            <li key={signal} className="flex items-start gap-3 text-ink-700 dark:text-ink-200">
              <MinusCircle className="mt-1 h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
              <span className="max-w-prose">{signal}</span>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Next steps" className="rule mt-12 pt-6">
        <p className="text-sm text-ink-600 dark:text-ink-300">Before the offer call</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/mock-loop" className="btn-primary">
            Run a mock loop day
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/debrief" className="btn-secondary">
            Debrief a loop you already ran
          </Link>
        </div>
      </nav>
    </div>
  )
}
