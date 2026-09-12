'use client'

import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Star, Lightbulb, DollarSign, Users, AlertTriangle, Check, X } from 'lucide-react'
import Link from 'next/link'
import { companyData, type CompanySlug } from '@/data/companies'
import { LoopTimeline } from '@/components/companies/LoopTimeline'
import { compensation, compensationCheckedOn } from '@/data/compensation'

export default function CompanyPage({ params }: { params: { company: string } }) {
  const slug = params.company.toLowerCase() as CompanySlug
  const data = companyData[slug]
  const comp = compensation[data.slug]
  if (!data) notFound()

  return (
    <div className="min-h-screen px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 -ml-2 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm text-ink-600 transition-colors duration-150 ease-out hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
        >
          <ArrowLeft className="h-4 w-4" /> All companies
        </Link>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-ink-200 pb-8 dark:border-ink-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/logos/${data.slug}.svg`} alt="" aria-hidden="true" className={`h-10 w-10 object-contain ${data.slug === 'apple' ? 'dark:invert' : ''}`} />
          <div>
            <h1 className="text-3xl text-ink-900 dark:text-ink-50">{data.name} interview guide</h1>
            <p className="mt-1 text-ink-700 dark:text-ink-200">{data.tagline}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Interview Process */}
          <div className="surface-card p-6">
            <h2 className="mb-1 flex items-center gap-2 text-xl text-ink-900 dark:text-ink-50">
              <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Interview process
            </h2>
            <p className="mb-4 text-sm text-ink-600 dark:text-ink-300">{data.processNotes}</p>
            <LoopTimeline rounds={data.rounds} />
          </div>

          {/* Top Questions */}
          <div className="surface-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl text-ink-900 dark:text-ink-50">
              <Star className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Most asked questions
            </h2>
            <div className="divide-y divide-ink-200 dark:divide-ink-800">
              {data.topQuestions.map((item, i) => (
                <div key={item.q} className="py-3">
                  <p className="font-medium text-ink-800 dark:text-ink-200">
                    {i + 1}. {item.q}
                  </p>
                  {item.lp && <span className="chip mt-2 inline-block bg-clay-100 text-clay-800 dark:bg-clay-900/30 dark:text-clay-300">LP: {item.lp}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Tips + Compensation */}
          <div className="grid gap-6 md:grid-cols-2 [&>*]:min-w-0">
            <div className="surface-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-ink-900 dark:text-ink-50">
                <Lightbulb className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Interview tips
              </h2>
              <ul className="space-y-3">
                {data.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-200">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400 dark:bg-ink-500" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-6">
              <h2 className="mb-1 flex items-center gap-2 text-xl text-ink-900 dark:text-ink-50">
                <DollarSign className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Compensation by level
              </h2>
              <p className="mb-4 text-sm text-ink-600 dark:text-ink-300">
                Medians read from levels.fyi on {compensationCheckedOn}. A median is the middle reported package, not a floor or a ceiling.
              </p>
              <p className="mb-4 max-w-prose text-sm leading-relaxed text-ink-700 dark:text-ink-200">{comp.ladder}</p>
              <div className="surface-sunken overflow-x-auto p-2">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-2 text-xs font-semibold text-ink-600 dark:text-ink-300">Level</th>
                      <th scope="col" className="px-3 py-2 text-xs font-semibold text-ink-600 dark:text-ink-300">Base</th>
                      <th scope="col" className="px-3 py-2 text-xs font-semibold text-ink-600 dark:text-ink-300">Total</th>
                      <th scope="col" className="px-3 py-2 text-xs font-semibold text-ink-600 dark:text-ink-300">Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
                    {comp.bands.map((band) => (
                      <tr key={band.level}>
                        <td className="px-3 py-2">
                          <span className="font-mono text-xs font-semibold text-ink-900 dark:text-ink-50">{band.level}</span>
                          <span className="block text-xs text-ink-600 dark:text-ink-300">{band.title}</span>
                        </td>
                        <td className="px-3 py-2 font-mono text-xs tabular-nums text-ink-700 dark:text-ink-200">{band.base}</td>
                        <td className="px-3 py-2 font-mono text-xs tabular-nums text-ink-700 dark:text-ink-200">{band.total}</td>
                        <td className="px-3 py-2 text-xs text-ink-600 dark:text-ink-300">
                          {band.basis}
                          {!band.verified && <span className="chip ml-2">estimate</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {comp.bands.some((b) => b.note) && (
                <ul className="mt-3 space-y-1 text-xs text-ink-600 dark:text-ink-300">
                  {comp.bands.filter((b) => b.note).map((b) => (
                    <li key={b.level}><span className="font-mono">{b.level}</span>: {b.note}</li>
                  ))}
                </ul>
              )}
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                <p><span className="font-semibold text-ink-900 dark:text-ink-50">Equity. </span>{comp.equityNote}</p>
                <p><span className="font-semibold text-ink-900 dark:text-ink-50">Negotiation. </span>{comp.negotiationNote}</p>
              </div>
              <p className="mt-3 text-xs text-ink-600 dark:text-ink-300">
                Source: <a href={comp.bands[0]?.source} target="_blank" rel="noopener noreferrer" className="underline decoration-ink-400 underline-offset-2 hover:text-ink-900 dark:hover:text-ink-50">levels.fyi</a>. Verify before you negotiate; see <Link href="/negotiation" className="underline decoration-ink-400 underline-offset-2 hover:text-ink-900 dark:hover:text-ink-50">the negotiation guide</Link>.
              </p>
            </div>
          </div>

          {/* Culture Signals + Red Flags */}
          <div className="grid gap-6 md:grid-cols-2 [&>*]:min-w-0">
            <div className="surface-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-ink-900 dark:text-ink-50">
                <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" /> What they really evaluate
              </h2>
              <ul className="space-y-2">
                {data.cultureSignals.map((signal) => (
                  <li key={signal} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl text-ink-900 dark:text-ink-50">
                <AlertTriangle className="h-5 w-5 text-rust-600 dark:text-rust-400" /> Candidacy killers
              </h2>
              <ul className="space-y-2">
                {data.redFlags.map((flag) => (
                  <li key={flag} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-200">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-rust-600 dark:text-rust-400" />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
