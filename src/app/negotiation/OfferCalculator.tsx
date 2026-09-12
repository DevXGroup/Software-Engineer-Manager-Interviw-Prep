'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

interface OfferInput {
  label: string
  base: string
  signOn: string
  equityTotal: string
  vestingYears: string
  bonusPct: string
}

const emptyOffer = (label: string): OfferInput => ({
  label,
  base: '',
  signOn: '',
  equityTotal: '',
  vestingYears: '4',
  bonusPct: '',
})

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const num = (value: string): number => {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

interface Totals {
  yearOne: number
  fourYearAverage: number
}

/**
 * Year one counts base, the target bonus, the sign-on, and one year of even vesting.
 * The four-year average spreads the equity and the sign-on across four years.
 * Even vesting is the deliberately simple assumption, stated in the copy: real
 * schedules are front- or back-loaded, which is the point the page makes.
 */
const computeTotals = (offer: OfferInput): Totals => {
  const base = num(offer.base)
  const signOn = num(offer.signOn)
  const equity = num(offer.equityTotal)
  const years = Math.max(1, num(offer.vestingYears) || 4)
  const bonus = base * (num(offer.bonusPct) / 100)
  const equityPerYear = equity / years

  const yearOne = base + bonus + signOn + equityPerYear
  const fourYearTotal = base * 4 + bonus * 4 + signOn + Math.min(equity, equityPerYear * 4)

  return { yearOne, fourYearAverage: fourYearTotal / 4 }
}

const fields: readonly { key: keyof Omit<OfferInput, 'label'>; label: string; hint: string; step: string }[] = [
  { key: 'base', label: 'Base salary', hint: 'Annual, before tax', step: '1000' },
  { key: 'signOn', label: 'Sign-on, year 1', hint: 'Cash paid in the first year', step: '1000' },
  { key: 'equityTotal', label: 'Equity, total grant', hint: 'Dollar value at grant', step: '1000' },
  { key: 'vestingYears', label: 'Vesting years', hint: 'Usually 4', step: '1' },
  { key: 'bonusPct', label: 'Target bonus %', hint: 'Percent of base', step: '1' },
]

export function OfferCalculator() {
  const [offerA, setOfferA] = useState<OfferInput>(emptyOffer('Offer A'))
  const [offerB, setOfferB] = useState<OfferInput>(emptyOffer('Offer B'))

  const totalsA = computeTotals(offerA)
  const totalsB = computeTotals(offerB)

  const reset = () => {
    setOfferA(emptyOffer('Offer A'))
    setOfferB(emptyOffer('Offer B'))
  }

  const column = (
    offer: OfferInput,
    setOffer: (next: OfferInput) => void,
    totals: Totals,
    idPrefix: string
  ) => (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-ink-600 dark:text-ink-300">{offer.label}</h4>
      {fields.map((field) => (
        <div key={field.key}>
          <label
            htmlFor={`${idPrefix}-${field.key}`}
            className="block text-sm font-medium text-ink-700 dark:text-ink-200"
          >
            {field.label}
          </label>
          <input
            id={`${idPrefix}-${field.key}`}
            type="number"
            inputMode="decimal"
            min="0"
            step={field.step}
            value={offer[field.key]}
            onChange={(event) => setOffer({ ...offer, [field.key]: event.target.value })}
            placeholder="0"
            aria-describedby={`${idPrefix}-${field.key}-hint`}
            className="mt-1 min-h-[44px] w-full rounded-lg border border-ink-300 bg-white px-3 font-mono tabular-nums text-ink-900 transition-colors duration-150 ease-out hover:border-ink-400 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:hover:border-ink-600"
          />
          <p id={`${idPrefix}-${field.key}-hint`} className="mt-1 text-xs text-ink-600 dark:text-ink-300">
            {field.hint}
          </p>
        </div>
      ))}
      <dl className="space-y-2 border-t border-ink-200 pt-3 dark:border-ink-800">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-sm text-ink-700 dark:text-ink-200">Year 1</dt>
          <dd className="font-mono tabular-nums text-lg text-ink-900 dark:text-ink-50">
            {money.format(totals.yearOne)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-sm text-ink-700 dark:text-ink-200">4-year average</dt>
          <dd className="font-mono tabular-nums text-lg text-ink-900 dark:text-ink-50">
            {money.format(totals.fourYearAverage)}
          </dd>
        </div>
      </dl>
    </div>
  )

  const yearOneGap = totalsA.yearOne - totalsB.yearOne
  const averageGap = totalsA.fourYearAverage - totalsB.fourYearAverage
  const hasNumbers = totalsA.yearOne > 0 && totalsB.yearOne > 0

  return (
    <div className="surface-sunken p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <p className="max-w-prose text-sm text-ink-700 dark:text-ink-200">
          Enter both packages and read year one next to the four-year average. Nothing is saved and nothing
          leaves your browser. Equity is spread evenly across the vesting years here, so a back-loaded grant
          will look better than it pays in year one. Check the real schedule before you sign.
        </p>
        <button type="button" onClick={reset} className="btn-secondary">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {column(offerA, setOfferA, totalsA, 'offer-a')}
        {column(offerB, setOfferB, totalsB, 'offer-b')}
      </div>

      {hasNumbers && (
        <p className="mt-5 border-t border-ink-200 pt-4 text-sm text-ink-700 dark:border-ink-800 dark:text-ink-200">
          Offer A is{' '}
          <span className="font-mono tabular-nums font-semibold text-ink-900 dark:text-ink-50">
            {money.format(Math.abs(yearOneGap))}
          </span>{' '}
          {yearOneGap >= 0 ? 'ahead of' : 'behind'} Offer B in year one, and{' '}
          <span className="font-mono tabular-nums font-semibold text-ink-900 dark:text-ink-50">
            {money.format(Math.abs(averageGap))}
          </span>{' '}
          {averageGap >= 0 ? 'ahead' : 'behind'} on the four-year average.
        </p>
      )}
    </div>
  )
}
