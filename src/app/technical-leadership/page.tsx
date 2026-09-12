'use client'

import { useCallback, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Check, Siren, Ear } from 'lucide-react'
import { QuizLauncher } from '@/components/QuizLauncher'
import { SearchParamSync, type SearchParamsLike } from '@/components/SearchParamSync'
import { CoveredToggle } from '@/components/CoveredToggle'
import { useIsCovered, useCoveredCount } from '@/store/progressStore'
import { technicalLeadershipQuestions } from '@/data/quizzes/technical-leadership'
import {
  leadershipTabs,
  leadershipItemIds,
  type LeadershipTabId,
  techDebtSteps,
  adrTemplate,
  adrWhenToWrite,
  adrBestPractices,
  makeBuyCriteria,
  onCallPractices,
  codeReviewDos,
  codeReviewDonts,
  codeReviewSla,
  roadmapSteps,
  pmlcPhases,
  sdlcPhases,
  pmlcSdlcAlignment,
  tbdCards,
  tbdWhy,
  tbdAntipatterns,
  scopingSteps,
  incidentScenario,
  incidentDecisions,
  incidentListeningFor,
} from '@/data/tracks/leadership'

const sectionIdByTab: Record<LeadershipTabId, string> = {
  adr: 'adr',
  codereview: 'codereview',
  debt: 'tech-debt',
  makebuy: 'make-vs-buy',
  oncall: 'oncall',
  pmlc: 'pmlc',
  roadmap: 'roadmap',
  scoping: 'scoping',
  tbd: 'tbd',
  incident: 'incident',
}

const isLeadershipTabId = (value: string): value is LeadershipTabId =>
  leadershipTabs.some((t) => t.id === value)

function TabButton({
  id,
  title,
  icon: Icon,
  active,
  onSelect,
}: {
  id: LeadershipTabId
  title: string
  icon: React.ElementType
  active: boolean
  onSelect: () => void
}) {
  const tabCovered = useIsCovered('leadership', id)
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out ${
        active
          ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
          : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
      }`}
    >
      <Icon className="h-4 w-4" />
      {title}
      {tabCovered && <Check className="h-3.5 w-3.5 text-moss-500 dark:text-moss-400" aria-label="Covered" />}
    </button>
  )
}

function TechDebtPanel() {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <div className="space-y-3">
      {techDebtSteps.map((item) => (
        <div key={item.id} className="surface-sunken">
          <button
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            className="flex min-h-[44px] w-full items-center justify-between p-4 text-left"
          >
            <span className="font-semibold text-ink-900 dark:text-ink-50">{item.label}</span>
            {expanded === item.id ? <ChevronUp className="h-4 w-4 text-ink-600 dark:text-ink-300" /> : <ChevronDown className="h-4 w-4 text-ink-600 dark:text-ink-300" />}
          </button>
          <AnimatePresence>
            {expanded === item.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function AdrTemplatePanel() {
  return (
    <div className="surface-sunken p-5 font-mono text-sm leading-relaxed text-ink-800 dark:text-ink-100">
      <pre className="whitespace-pre-wrap">{adrTemplate}</pre>
    </div>
  )
}

function MakeBuyPanel() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200 dark:border-ink-800">
            <th className="py-2 text-left font-semibold text-ink-700 dark:text-ink-200">Criterion</th>
            <th className="py-2 text-center font-semibold text-ink-700 dark:text-ink-200">Build</th>
            <th className="py-2 text-center font-semibold text-ink-700 dark:text-ink-200">Buy</th>
            <th className="hidden py-2 text-left font-semibold text-ink-700 dark:text-ink-200 md:table-cell">Guidance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
          {makeBuyCriteria.map((row) => (
            <tr key={row.criterion}>
              <td className="py-3 text-ink-700 dark:text-ink-200">{row.criterion}</td>
              <td className="py-3 text-center">
                {row.build === true ? <CheckCircle className="inline h-5 w-5 text-moss-600 dark:text-moss-400" /> : row.build === false ? <span className="text-ink-500">-</span> : <span className="text-amber-600 text-xs dark:text-amber-400">depends</span>}
              </td>
              <td className="py-3 text-center">
                {row.buy === true ? <CheckCircle className="inline h-5 w-5 text-clay-600 dark:text-clay-400" /> : row.buy === false ? <span className="text-ink-500">-</span> : <span className="text-amber-600 text-xs dark:text-amber-400">depends</span>}
              </td>
              <td className="hidden py-3 text-xs text-ink-600 dark:text-ink-300 md:table-cell">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function OnCallPanel() {
  const reduceMotion = useReducedMotion()
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {onCallPractices.map((p) => {
        const Icon = p.icon
        return (
          <motion.div key={p.title} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="surface-sunken p-4">
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-semibold text-ink-900 dark:text-ink-50">{p.title}</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{p.desc}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

function CodeReviewCulturePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="surface-sunken p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-moss-700 dark:text-moss-300"><CheckCircle className="h-4 w-4" /> Code review do</h4>
        <ul className="space-y-2">{codeReviewDos.map((d) => <li key={d} className="flex gap-2 text-sm text-ink-700 dark:text-ink-200"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" />{d}</li>)}</ul>
      </div>
      <div className="surface-sunken p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-rust-700 dark:text-rust-300"><AlertTriangle className="h-4 w-4" /> Code review avoid</h4>
        <ul className="space-y-2">{codeReviewDonts.map((d) => <li key={d} className="flex gap-2 text-sm text-ink-700 dark:text-ink-200"><span className="mt-0.5 h-4 w-4 shrink-0 text-rust-600 dark:text-rust-400">&times;</span>{d}</li>)}</ul>
      </div>
    </div>
  )
}


function IncidentPanel() {
  const [step, setStep] = useState(0)
  const [picks, setPicks] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const decision = incidentDecisions[step]
  const picked = picks[decision.id]
  const isLast = step === incidentDecisions.length - 1

  return (
    <div>
      <div className="mb-6 surface-sunken p-5">
        <div className="mb-3 flex items-center gap-2">
          <Siren className="h-5 w-5 text-rust-600 dark:text-rust-400" />
          <h3 className="text-lg text-ink-900 dark:text-ink-50">
            <span className="font-mono tabular-nums">{incidentScenario.time}</span>, the page fires
          </h3>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{incidentScenario.intro}</p>
        <dl className="grid gap-2 sm:grid-cols-2">
          {incidentScenario.facts.map((f) => (
            <div key={f.label} className="flex gap-2 text-sm">
              <dt className="shrink-0 font-semibold text-ink-900 dark:text-ink-50">{f.label}:</dt>
              <dd className="text-ink-700 dark:text-ink-200">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {!done && (
        <div>
          <p className="mb-2 text-sm text-ink-600 dark:text-ink-300">
            Decision <span className="font-mono tabular-nums">{step + 1}</span> of <span className="font-mono tabular-nums">{incidentDecisions.length}</span>
          </p>
          <h3 className="mb-4 text-lg text-ink-900 dark:text-ink-50">{decision.prompt}</h3>

          <div className="space-y-3">
            {decision.options.map((opt) => {
              const isStrongest = opt.key === decision.strongestKey
              const revealed = Boolean(picked)
              return (
                <button
                  key={opt.key}
                  aria-pressed={picked === opt.key}
                  onClick={() => setPicks((prev) => (prev[decision.id] ? prev : { ...prev, [decision.id]: opt.key }))}
                  className={`flex min-h-[44px] w-full items-start gap-3 rounded-lg border p-4 text-left text-sm transition-colors duration-150 ease-out ${
                    revealed && isStrongest
                      ? 'border-moss-400 bg-moss-50 text-moss-800 dark:border-moss-600 dark:bg-moss-900/20 dark:text-moss-200'
                      : picked === opt.key
                        ? 'border-clay-500 bg-ink-50 text-ink-900 dark:border-clay-500 dark:bg-ink-900 dark:text-ink-50'
                        : 'border-ink-200 text-ink-700 hover:bg-ink-100 dark:border-ink-800 dark:text-ink-200 dark:hover:bg-ink-800'
                  }`}
                >
                  <span className="shrink-0 font-mono text-xs uppercase">{opt.key}</span>
                  <span className="flex-1">{opt.text}</span>
                  {revealed && isStrongest && (
                    <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-moss-700 dark:text-moss-300">
                      <Check className="h-4 w-4" />
                      Strongest
                    </span>
                  )}
                  {revealed && !isStrongest && picked === opt.key && (
                    <span className="shrink-0 text-xs font-semibold text-ink-600 dark:text-ink-300">Your pick</span>
                  )}
                </button>
              )
            })}
          </div>

          {picked && (
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                <h4 className="mb-2 text-sm font-semibold text-teal-800 dark:text-teal-300">Why that is the strongest call</h4>
                <p className="text-sm leading-relaxed text-teal-700 dark:text-teal-400">{decision.why}</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="h-4 w-4" />
                  What a weak answer sounds like
                </h4>
                <p className="text-sm leading-relaxed text-amber-700 dark:text-amber-400">{decision.weakSounds}</p>
              </div>
              <button
                onClick={() => (isLast ? setDone(true) : setStep(step + 1))}
                className="btn-primary min-h-[44px]"
              >
                {isLast ? 'See what the interviewer was listening for' : 'Next decision'}
              </button>
            </div>
          )}
        </div>
      )}

      {done && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Ear className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-lg text-ink-900 dark:text-ink-50">What the interviewer was listening for</h3>
          </div>
          <div className="surface-sunken divide-y divide-ink-200 p-5 dark:divide-ink-800">
            {incidentListeningFor.map((item) => (
              <div key={item.label} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{item.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.value}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setPicks({})
              setStep(0)
              setDone(false)
            }}
            className="btn-secondary mt-4 min-h-[44px]"
          >
            Run it again
          </button>
        </div>
      )}
    </div>
  )
}

export default function TechnicalLeadershipPage() {
  const [activeTab, setActiveTab] = useState<LeadershipTabId>('debt')
  const covered = useCoveredCount('leadership', leadershipItemIds)

  const syncSearchParams = useCallback((searchParams: SearchParamsLike) => {
    const tabParam = searchParams.get('tab')
    if (tabParam && isLeadershipTabId(tabParam)) setActiveTab(tabParam)
  }, [])

  return (
    <div className="page-shell">
      <SearchParamSync onChange={syncSearchParams} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-ink-200 pb-8 dark:border-ink-800">
          <h1 className="text-4xl text-ink-900 dark:text-ink-50">Technical leadership</h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-700 dark:text-ink-200">Tech debt, architecture decisions, make vs buy, code review culture, on-call.</p>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            <span className="font-mono tabular-nums">{covered}/{leadershipItemIds.length}</span> covered
          </p>
        </div>

        <QuizLauncher sectionId="leadership" title="Technical Leadership" questions={technicalLeadershipQuestions} />

        <div className="mb-8 flex flex-wrap gap-2 overflow-x-auto scrollbar-hide" role="tablist">
          {leadershipTabs.map(({ id, title, icon }) => (
            <TabButton key={id} id={id} title={title} icon={icon} active={activeTab === id} onSelect={() => setActiveTab(id)} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="surface-card p-6"
            id={sectionIdByTab[activeTab]}
          >
            {activeTab === 'debt' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Managing technical debt</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">A 5-step framework for making tech debt visible, prioritized, and strategically managed.</p>
                <TechDebtPanel />
                <CoveredToggle track="leadership" itemId="debt" className="mt-6" />
              </>
            )}
            {activeTab === 'adr' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Architecture decision record</h2>
                <p className="mb-4 text-ink-600 dark:text-ink-300">ADRs capture architectural decisions with their context and consequences. Store them in version control alongside code so future engineers understand why, not just what.</p>
                <AdrTemplatePanel />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="surface-sunken p-4">
                    <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">When to write an ADR</h4>
                    <ul className="space-y-1 text-sm text-ink-700 dark:text-ink-200">{adrWhenToWrite.map((i) => <li key={i}>{i}</li>)}</ul>
                  </div>
                  <div className="surface-sunken p-4">
                    <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">ADR best practices</h4>
                    <ul className="space-y-1 text-sm text-ink-700 dark:text-ink-200">{adrBestPractices.map((i) => <li key={i}>{i}</li>)}</ul>
                  </div>
                </div>
                <CoveredToggle track="leadership" itemId="adr" className="mt-6" />
              </>
            )}
            {activeTab === 'makebuy' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Make vs buy decision framework</h2>
                <p className="mb-4 text-ink-600 dark:text-ink-300">Use this matrix to score your decision. The correct answer depends on the specific combination of factors: there is no universal right answer.</p>
                <MakeBuyPanel />
                <div className="mt-6 rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                  <h4 className="mb-2 text-sm font-semibold text-teal-800 dark:text-teal-300">Interview tip: total cost of ownership</h4>
                  <p className="text-sm text-teal-700 dark:text-teal-400">Always present total cost of ownership for both options. Build: development cost plus maintenance, oncall, and the opportunity cost of engineers not building product features. Buy: license plus integration, migration risk, and vendor lock-in. Many "build" decisions lose when maintenance cost is honestly accounted for. Many "buy" decisions lose when integration complexity is honestly assessed.</p>
                </div>
                <CoveredToggle track="leadership" itemId="makebuy" className="mt-6" />
              </>
            )}
            {activeTab === 'oncall' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">On-call best practices</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">A healthy on-call culture balances reliability with engineer wellbeing. These practices reduce burnout while improving response quality.</p>
                <OnCallPanel />
                <div className="mt-6 rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                  <h4 className="mb-2 text-sm font-semibold text-teal-800 dark:text-teal-300">SLO and error budget in 60 seconds</h4>
                  <p className="text-sm text-teal-700 dark:text-teal-400">A service level objective is the reliability target you commit to: "99.9% of API requests respond in under 200ms." The error budget is the acceptable failure margin. With a 99.9% SLO, you have 0.1%, about 43 minutes a month, to spend on incidents, deployments, and planned downtime. When the budget is burned: freeze new features and focus on reliability. This converts a subjective argument ("we should focus on reliability") into an objective trigger. No politics needed.</p>
                </div>
                <CoveredToggle track="leadership" itemId="oncall" className="mt-6" />
              </>
            )}
            {activeTab === 'codereview' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Building a code review culture</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">Code review is where quality, knowledge sharing, and team development all happen at once, which is why it pays back more than the time it costs. It only works if the culture around it is healthy.</p>
                <CodeReviewCulturePanel />
                <div className="mt-6 surface-sunken p-4">
                  <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Code review SLA</h4>
                  <p className="text-sm text-ink-700 dark:text-ink-200">{codeReviewSla}</p>
                </div>
                <CoveredToggle track="leadership" itemId="codereview" className="mt-6" />
              </>
            )}
            {activeTab === 'roadmap' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Technical roadmap planning</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">A technical roadmap is not just a list of features. It is the story of how your engineering platform evolves to enable your product strategy.</p>
                <div className="space-y-4">
                  {roadmapSteps.map((item) => (
                    <div key={item.step} className="flex gap-4 surface-sunken p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-sm font-bold text-white dark:bg-clay-500 dark:text-ink-950">{item.step}</div>
                      <div>
                        <h4 className="font-semibold text-ink-900 dark:text-ink-50">{item.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <CoveredToggle track="leadership" itemId="roadmap" className="mt-6" />
              </>
            )}
            {activeTab === 'pmlc' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">PMLC vs SDLC</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">Two complementary lifecycles every engineering manager must articulate clearly. PMLC governs project delivery; SDLC governs software quality. They run in parallel, not in sequence.</p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">Project Management Life Cycle (PMLC)</h3>
                    <div className="space-y-3">
                      {pmlcPhases.map((item) => (
                        <div key={item.step} className="surface-sunken p-4">
                          <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">Phase {item.step}: {item.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-ink-600 dark:text-ink-300">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">Software Development Life Cycle (SDLC)</h3>
                    <div className="space-y-3">
                      {sdlcPhases.map((item) => (
                        <div key={item.step} className="surface-sunken p-4">
                          <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">Phase {item.step}: {item.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-ink-600 dark:text-ink-300">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                  <h4 className="mb-2 text-sm font-semibold text-teal-800 dark:text-teal-300">Interview tip: how they align</h4>
                  <p className="text-sm text-teal-700 dark:text-teal-400">{pmlcSdlcAlignment}</p>
                </div>
                <CoveredToggle track="leadership" itemId="pmlc" className="mt-6" />
              </>
            )}
            {activeTab === 'tbd' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Trunk-based development</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">A high-velocity branching strategy where all developers commit to a single main branch (trunk), enabling continuous integration and fast feedback loops.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {tbdCards.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="surface-sunken p-5">
                        <div className="mb-3 flex items-center gap-2">
                          <Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                          <h4 className="font-semibold text-ink-900 dark:text-ink-50">{item.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.content}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="surface-sunken p-4">
                    <h4 className="mb-2 text-sm font-semibold text-moss-700 dark:text-moss-300">Why trunk-based dev vs feature branching</h4>
                    <ul className="space-y-1 text-sm text-ink-700 dark:text-ink-200">{tbdWhy.map((i) => <li key={i}>{i}</li>)}</ul>
                  </div>
                  <div className="surface-sunken p-4">
                    <h4 className="mb-2 text-sm font-semibold text-rust-700 dark:text-rust-300">Anti-patterns</h4>
                    <ul className="space-y-1 text-sm text-ink-700 dark:text-ink-200">{tbdAntipatterns.map((i) => <li key={i}>{i}</li>)}</ul>
                  </div>
                </div>
                <CoveredToggle track="leadership" itemId="tbd" className="mt-6" />
              </>
            )}
            {activeTab === 'scoping' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Project scoping framework</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">Scoping is how you convert ambiguous stakeholder asks into executable engineering plans. A well-scoped project has clear boundaries, realistic timelines, and explicit risk plans before a single line of code is written.</p>
                <div className="space-y-4">
                  {scopingSteps.map((item) => (
                    <div key={item.step} className="flex gap-4 surface-sunken p-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-sm font-bold text-white dark:bg-clay-500 dark:text-ink-950">{item.step}</div>
                      <div>
                        <h4 className="font-semibold text-ink-900 dark:text-ink-50">{item.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                  <h4 className="mb-2 text-sm font-semibold text-teal-800 dark:text-teal-300">Interview tip: working backwards (Amazon method)</h4>
                  <p className="text-sm text-teal-700 dark:text-teal-400">Start scoping from the customer outcome, not the technical solution. Write the press release first (what does success look like when shipped?), then work backwards to the features, then to the engineering tasks. This prevents building technically correct solutions that miss the business goal.</p>
                </div>
                <CoveredToggle track="leadership" itemId="scoping" className="mt-6" />
              </>
            )}
            {activeTab === 'incident' && (
              <>
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Live incident scenario</h2>
                <p className="mb-6 max-w-prose text-ink-600 dark:text-ink-300">Six decisions, one at a time. Commit to an option before the reasoning appears, because guessing after you have read the answer teaches you nothing. Nothing here is saved.</p>
                <IncidentPanel />
                <CoveredToggle track="leadership" itemId="incident" className="mt-6" />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
