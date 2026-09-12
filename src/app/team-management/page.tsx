'use client'

import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Check, Target } from 'lucide-react'
import { QuizLauncher } from '@/components/QuizLauncher'
import { SearchParamSync, type SearchParamsLike } from '@/components/SearchParamSync'
import { CoveredToggle } from '@/components/CoveredToggle'
import { useIsCovered, useCoveredCount } from '@/store/progressStore'
import { teamManagementQuestions } from '@/data/quizzes/team-management'
import {
  teamTabs,
  teamItemIds,
  type TeamTabId,
  hiringItems,
  continuousVsAnnualReviews,
  performanceRatings,
  performanceItems,
  oneOnOneCadences,
  oneOnOneQuestions,
  oneOnOneWarningSigns,
  careerLadder,
  icVsManagerTracks,
  careerConversationQuestions,
  sbiParts,
  sbiExample,
  candorQuadrants,
  feedbackDeliveryTips,
  cultureQuote,
  cultureItems,
  calibrationOverview,
  ratingBands,
  calibrationMechanics,
  calibrationElsewhere,
  potentialSignals,
  evaluationDimensions,
  calibrationBestPractices,
  rhetoricModes,
  communicatingUp,
  communicatingDown,
  planningIntro,
  planningExercises,
} from '@/data/tracks/team'

const sectionIdByTab: Record<TeamTabId, string> = {
  career: 'career',
  communication: 'communication',
  culture: 'culture',
  feedback: 'feedback',
  hiring: 'hiring',
  oneones: 'one-on-one',
  performance: 'performance',
  planning: 'planning',
  talent: 'talent',
}

const isTeamTabId = (value: string): value is TeamTabId => teamTabs.some((t) => t.id === value)

function TabButton({
  id,
  title,
  icon: Icon,
  active,
  onSelect,
}: {
  id: TeamTabId
  title: string
  icon: React.ElementType
  active: boolean
  onSelect: () => void
}) {
  const tabCovered = useIsCovered('team', id)
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

function ExpandableList({ items }: { items: readonly { id: string; title: string; content: string }[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="surface-sunken">
          <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="flex min-h-[44px] w-full items-center justify-between p-4 text-left">
            <span className="font-semibold text-ink-900 dark:text-ink-50">{item.title}</span>
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

export default function TeamManagementPage() {
  const [tab, setTab] = useState<TeamTabId>('hiring')
  const covered = useCoveredCount('team', teamItemIds)

  const syncSearchParams = useCallback((searchParams: SearchParamsLike) => {
    const tabParam = searchParams.get('tab')
    if (tabParam && isTeamTabId(tabParam)) setTab(tabParam)
  }, [])

  return (
    <div className="page-shell">
      <SearchParamSync onChange={syncSearchParams} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-ink-200 pb-8 dark:border-ink-800">
          <h1 className="text-4xl text-ink-900 dark:text-ink-50">Team management</h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-700 dark:text-ink-200">Hiring, performance, 1:1s, career ladders, feedback, culture.</p>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            <span className="font-mono tabular-nums">{covered}/{teamItemIds.length}</span> covered
          </p>
        </div>

        <QuizLauncher sectionId="team" title="Team Management" questions={teamManagementQuestions} />

        <div className="mb-8 flex flex-wrap gap-2 overflow-x-auto scrollbar-hide" role="tablist">
          {teamTabs.map(({ id, title, icon }) => (
            <TabButton key={id} id={id} title={title} icon={icon} active={tab === id} onSelect={() => setTab(id)} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }} id={sectionIdByTab[tab]}>
            {tab === 'hiring' && (
              <div className="surface-card p-6">
                <h2 className="mb-6 text-2xl text-ink-900 dark:text-ink-50">Hiring process and rubrics</h2>
                <ExpandableList items={hiringItems} />
                <CoveredToggle track="team" itemId="hiring" className="mt-6" />
              </div>
            )}

            {tab === 'performance' && (
              <div className="surface-card p-6">
                <h2 className="mb-6 text-2xl text-ink-900 dark:text-ink-50">Performance management</h2>

                <div className="mb-6 rounded-lg bg-teal-50 p-5 dark:bg-teal-900/20">
                  <h3 className="mb-3 text-sm font-semibold text-teal-800 dark:text-teal-300">Continuous vs. annual reviews</h3>
                  <p className="text-sm leading-relaxed text-teal-700 dark:text-teal-400">{continuousVsAnnualReviews}</p>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  {performanceRatings.map((r) => (
                    <div key={r.label} className={`rounded-lg border p-4 ${r.colorClass}`}>
                      <p className={`font-semibold ${r.textClass}`}>{r.label}</p>
                      <p className={`mt-1 text-sm ${r.textClass}`}>{r.desc}</p>
                    </div>
                  ))}
                </div>

                <ExpandableList items={performanceItems} />
                <CoveredToggle track="team" itemId="performance" className="mt-6" />
              </div>
            )}

            {tab === 'oneones' && (
              <div className="surface-card p-6">
                <h2 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Effective 1:1 framework</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">The 1:1 is their meeting, not yours. Your job is to listen, coach, and remove blockers, not give a status update.</p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">Cadence and format</h3>
                    <div className="space-y-3">
                      {oneOnOneCadences.map((c) => (
                        <div key={c.label} className="rounded-lg bg-ink-50 p-3 dark:bg-ink-900">
                          <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{c.label}</p>
                          <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">High-impact 1:1 questions</h3>
                    <ul className="space-y-2">
                      {oneOnOneQuestions.map((q) => (
                        <li key={q} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-200">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                  <h4 className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">Signs your 1:1s are not working</h4>
                  <div className="grid gap-2 text-sm text-amber-700 dark:text-amber-400 sm:grid-cols-2">
                    {oneOnOneWarningSigns.map((s) => (
                      <p key={s} className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        {s}
                      </p>
                    ))}
                  </div>
                </div>
                <CoveredToggle track="team" itemId="oneones" className="mt-6" />
              </div>
            )}

            {tab === 'career' && (
              <div className="surface-card p-6">
                <h2 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Career development</h2>
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div className="surface-sunken p-5">
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">Engineering career ladder (typical)</h3>
                    <div className="space-y-3">
                      {careerLadder.map((l) => (
                        <div key={l.level} className="flex items-start gap-3">
                          <span className="shrink-0 rounded-lg bg-white px-2 py-1 text-xs font-semibold text-ink-700 shadow-sm dark:bg-ink-800 dark:text-ink-200">{l.level}</span>
                          <div>
                            <span className="text-xs font-medium text-teal-700 dark:text-teal-400">{l.scope}</span>
                            <p className="text-xs text-ink-600 dark:text-ink-300">{l.key}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">IC vs manager track</h3>
                    <div className="space-y-3">
                      {icVsManagerTracks.map((t) => (
                        <div key={t.title} className="surface-sunken p-4">
                          <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{t.title}</p>
                          <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="surface-sunken p-5">
                  <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">Career conversation framework (IDP)</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {careerConversationQuestions.map((item) => (
                      <div key={item.q} className="rounded-lg bg-white p-3 shadow-sm dark:bg-ink-800">
                        <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{item.q}</p>
                        <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <CoveredToggle track="team" itemId="career" className="mt-6" />
              </div>
            )}

            {tab === 'feedback' && (
              <div className="surface-card p-6">
                <h2 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Feedback models</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">SBI model (situation, behavior, impact)</h3>
                    <div className="space-y-3">
                      {sbiParts.map((p) => (
                        <div key={p.letter} className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                          <p className="text-sm font-semibold text-teal-800 dark:text-teal-300">{p.letter}: {p.label}</p>
                          <p className="mt-1 text-sm text-teal-700 dark:text-teal-400">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-moss-50 p-4 dark:bg-moss-900/20">
                      <p className="text-xs font-semibold text-moss-700 dark:text-moss-400">Complete example</p>
                      <p className="mt-1 text-sm italic text-moss-700 dark:text-moss-400">{sbiExample}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">Radical candor framework</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {candorQuadrants.map((q) => (
                        <div key={q.title} className={`rounded-lg p-4 ${q.positive ? 'bg-moss-50 dark:bg-moss-900/20' : 'bg-rust-50 dark:bg-rust-900/20'}`}>
                          <p className={`flex items-center gap-1 text-sm font-semibold ${q.positive ? 'text-moss-800 dark:text-moss-300' : 'text-rust-800 dark:text-rust-300'}`}>
                            {q.title}
                            {q.positive ? <Check className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                          </p>
                          <p className={`mt-1 text-xs ${q.positive ? 'text-moss-700 dark:text-moss-400' : 'text-rust-700 dark:text-rust-400'}`}>{q.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                      <h4 className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">Delivering feedback: practical tips</h4>
                      <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-400">
                        {feedbackDeliveryTips.map((t) => <li key={t}>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
                <CoveredToggle track="team" itemId="feedback" className="mt-6" />
              </div>
            )}

            {tab === 'culture' && (
              <div className="surface-card p-6">
                <h2 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Building team culture</h2>
                <div className="mb-6 rounded-lg bg-teal-50 p-5 dark:bg-teal-900/20">
                  <p className="text-sm italic text-ink-700 dark:text-ink-200">{cultureQuote}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cultureItems.map((item) => (
                    <div key={item.title} className="surface-sunken p-4">
                      <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <CoveredToggle track="team" itemId="culture" className="mt-6" />
              </div>
            )}

            {tab === 'talent' && (
              <div className="surface-card p-6">
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Performance calibration</h2>
                <p className="mb-6 max-w-prose text-ink-600 dark:text-ink-300">{calibrationOverview}</p>

                <div className="mb-6 grid gap-4 lg:grid-cols-2">
                  <div className="surface-sunken p-5">
                    <h3 className="mb-1 text-lg text-ink-900 dark:text-ink-50">The three rating bands</h3>
                    <p className="mb-3 text-xs text-ink-600 dark:text-ink-300">Labels differ by company; the shape does not.</p>
                    <div className="divide-y divide-ink-200 dark:divide-ink-800">
                      {ratingBands.map((r) => (
                        <div key={r.label} className="py-3 first:pt-0 last:pb-0">
                          <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{r.label}</p>
                          <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">{r.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="surface-sunken p-5">
                    <h3 className="mb-1 text-lg text-ink-900 dark:text-ink-50">Walking into the room prepared</h3>
                    <p className="mb-3 text-xs text-ink-600 dark:text-ink-300">What decides the outcome for your team.</p>
                    <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{calibrationMechanics}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-1 text-lg text-ink-900 dark:text-ink-50">What companies have said publicly</h3>
                  <p className="mb-3 text-sm text-ink-600 dark:text-ink-300">Limited to changes a company put on the record itself. Percentages circulating online are not published policy, so they are not repeated here.</p>
                  <div className="surface-sunken divide-y divide-ink-200 p-5 dark:divide-ink-800">
                    {calibrationElsewhere.map((c) => (
                      <div key={c.company} className="py-3 first:pt-0 last:pb-0">
                        <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{c.company}</p>
                        <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">{c.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-lg text-ink-900 dark:text-ink-50">What to evaluate: performance dimensions</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {evaluationDimensions.map((d) => (
                      <div key={d.title} className="surface-sunken p-4">
                        <h4 className="mb-2 text-sm font-semibold text-ink-900 dark:text-ink-50">{d.title}</h4>
                        <ul className="space-y-1 text-sm text-ink-700 dark:text-ink-200">
                          {d.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 surface-sunken p-5">
                  <h3 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Potential signals to look for</h3>
                  <ul className="space-y-1 text-sm text-ink-700 dark:text-ink-200">
                    {potentialSignals.map((sig) => <li key={sig}>{sig}</li>)}
                  </ul>
                </div>

                <div className="rounded-lg bg-amber-50 p-5 dark:bg-amber-900/20">
                  <h3 className="mb-3 text-sm font-semibold text-amber-800 dark:text-amber-300">Manager best practices for review season</h3>
                  <div className="grid gap-2 text-sm text-amber-700 dark:text-amber-400 sm:grid-cols-2">
                    {calibrationBestPractices.map((tip) => (
                      <div key={tip} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <CoveredToggle track="team" itemId="talent" className="mt-6" />
              </div>
            )}

            {tab === 'communication' && (
              <div className="surface-card p-6">
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Communication frameworks</h2>
                <p className="mb-6 text-ink-600 dark:text-ink-300">{"Effective management communication draws on Aristotle's rhetoric and modern leadership science. Combine technical credibility with persuasive storytelling to drive alignment and motivate your team."}</p>

                <div className="mb-6">
                  <h3 className="mb-4 text-lg text-ink-900 dark:text-ink-50">{"Aristotle's rhetoric for engineering leaders"}</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rhetoricModes.map((item) => (
                      <div key={item.label} className="surface-sunken p-4">
                        <p className="font-semibold text-ink-900 dark:text-ink-50">{item.label}</p>
                        <p className="mb-2 text-xs text-ink-500 dark:text-ink-400">{item.subtitle}</p>
                        <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-teal-50 p-5 dark:bg-teal-900/20">
                    <h3 className="mb-3 text-sm font-semibold text-teal-800 dark:text-teal-300">Communicating up (to executives)</h3>
                    <ul className="space-y-2 text-sm text-teal-700 dark:text-teal-400">
                      {communicatingUp.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-moss-50 p-5 dark:bg-moss-900/20">
                    <h3 className="mb-3 text-sm font-semibold text-moss-800 dark:text-moss-300">Communicating down (to your team)</h3>
                    <ul className="space-y-2 text-sm text-moss-700 dark:text-moss-400">
                      {communicatingDown.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
                <CoveredToggle track="team" itemId="communication" className="mt-6" />
              </div>
            )}

            {tab === 'planning' && (
              <div className="surface-card p-6">
                <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">Headcount, planning and cross-functional conflict</h2>
                <p className="mb-6 max-w-prose text-ink-600 dark:text-ink-300">{planningIntro}</p>
                <div className="space-y-6">
                  {planningExercises.map((ex, i) => (
                    <div key={ex.id} className="surface-sunken p-5">
                      <div className="mb-3 flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-600 text-sm font-bold text-white dark:bg-clay-500 dark:text-ink-950">{i + 1}</span>
                        <h3 className="text-lg text-ink-900 dark:text-ink-50">{ex.title}</h3>
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{ex.setup}</p>
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">What the interviewer is scoring</h4>
                          <ul className="space-y-2 text-sm text-ink-700 dark:text-ink-200">
                            {ex.scoring.map((point) => (
                              <li key={point} className="flex items-start gap-2">
                                <Target className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">A strong answer, in order</h4>
                          <ol className="space-y-2 text-sm text-ink-700 dark:text-ink-200">
                            {ex.outline.map((point, n) => (
                              <li key={point} className="flex items-start gap-2">
                                <span className="mt-0.5 font-mono text-xs tabular-nums text-ink-500 dark:text-ink-400">{n + 1}.</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                      <div className="mt-4 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                        <h4 className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">Follow-up probes</h4>
                        <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-400">
                          {ex.probes.map((probe) => <li key={probe}>{probe}</li>)}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <CoveredToggle track="team" itemId="planning" className="mt-6" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
