'use client'

import { useCallback, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Database, Server, GitBranch, ChevronDown, ChevronUp, PlayCircle, ExternalLink,
  Check, X, AlertTriangle, ArrowRight, Split, FileText, Key, BarChart3, Share2, Lock,
  HardDrive, Zap, Ruler, Hash, FolderTree, Search,
} from 'lucide-react'
import { QuizLauncher } from '@/components/QuizLauncher'
import { SearchParamSync, type SearchParamsLike } from '@/components/SearchParamSync'
import { CoveredToggle } from '@/components/CoveredToggle'
import { ArchitectureFlow } from '@/components/system-design/ArchitectureFlow'
import { scenarioDiagrams } from '@/data/diagrams'
import { useIsCovered, useCoveredCount } from '@/store/progressStore'
import { systemDesignQuestions } from '@/data/quizzes/system-design'
import {
  scenarios, architecturePatterns, capPillars, deepDiveVideos, nosqlTypes, shardingStrategies,
  loadBalancingAlgorithms, acidPillars, isolationLevels, dbInternalsComponents, indexTypes,
  cachingComparisonRows, systemDesignItemIds, type Scenario, type ArchitecturePattern,
} from '@/data/tracks/system-design'

function getScenarioFromSearchId(searchId: string) {
  return scenarios.find((scenario) => `${scenario.key}-scenario` === searchId)
}

function getArchitecturePatternFromSearchId(searchId: string) {
  return architecturePatterns.find((pattern) => pattern.id === searchId)
}

function isMainTab(value: string | null): value is MainTab {
  return value === 'scenarios' || value === 'patterns' || value === 'concepts'
}

type MainTab = 'scenarios' | 'patterns' | 'concepts'

function ScenarioCard({ scenario, isSelected, onSelect }: { scenario: Scenario; isSelected: boolean; onSelect: () => void }) {
  const Icon = scenario.icon
  const covered = useIsCovered('system-design', scenario.id)
  return (
    <button
      onClick={onSelect}
      className={`min-h-[44px] rounded-xl p-4 text-left transition-colors duration-150 ease-out ${
        isSelected ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950' : 'surface-card card-hover'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <Icon className="h-6 w-6" />
        {covered && <Check className="h-4 w-4 text-moss-600 dark:text-moss-400" aria-label="Covered" />}
      </div>
      <p className="text-sm font-semibold">{scenario.title}</p>
      <p className={`mt-1 text-xs ${isSelected ? 'text-white dark:text-ink-950' : 'text-muted'}`}>
        {scenario.difficulty} &middot; {scenario.timeEstimate}
      </p>
    </button>
  )
}

function PatternCard({ pattern, isSelected, onSelect }: { pattern: ArchitecturePattern; isSelected: boolean; onSelect: () => void }) {
  const Icon = pattern.icon
  const covered = useIsCovered('system-design', pattern.id)
  return (
    <button
      onClick={onSelect}
      id={pattern.id}
      className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl p-4 text-left transition-colors duration-150 ease-out ${
        isSelected ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950' : 'surface-card card-hover text-ink-700 dark:text-ink-200'
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{pattern.name}</p>
          {covered && <Check className="h-3.5 w-3.5 text-moss-600 dark:text-moss-400" aria-label="Covered" />}
        </div>
        <p className={`text-xs ${isSelected ? 'text-white dark:text-ink-950' : 'text-muted'}`}>{pattern.description}</p>
      </div>
    </button>
  )
}

export default function SystemDesignPage() {
  const [mainTab, setMainTab] = useState<MainTab>('scenarios')
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0])
  const [expandedStep, setExpandedStep] = useState<string | null>('1')
  const [selectedPattern, setSelectedPattern] = useState<ArchitecturePattern>(architecturePatterns[0])
  const reduceMotion = useReducedMotion()
  const covered = useCoveredCount('system-design', systemDesignItemIds)

  const syncSearchParams = useCallback((searchParams: SearchParamsLike) => {
    const tabParam = searchParams.get('tab')
    if (isMainTab(tabParam)) {
      setMainTab(tabParam)
    }

    const scenarioParam = searchParams.get('scenario')
    if (scenarioParam) {
      const scenario = getScenarioFromSearchId(scenarioParam)
      if (scenario) {
        setMainTab('scenarios')
        setSelectedScenario(scenario)
        setExpandedStep('1')
      }
    }

    const patternParam = searchParams.get('pattern')
    if (patternParam) {
      const pattern = getArchitecturePatternFromSearchId(patternParam)
      if (pattern) {
        setMainTab('patterns')
        setSelectedPattern(pattern)
      }
    }
  }, [])

  return (
    <div className="min-h-screen px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <SearchParamSync onChange={syncSearchParams} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-ink-200 pb-8 dark:border-ink-800">
          <h1 className="text-4xl text-ink-900 dark:text-ink-50">System design</h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-700 dark:text-ink-200">
            4 deep-dive scenarios, step-by-step breakdowns, architecture patterns.
          </p>
          <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
            <span className="font-mono tabular-nums">{covered}/{systemDesignItemIds.length}</span> covered
          </p>
        </div>

        <QuizLauncher sectionId="system-design" title="System Design" questions={systemDesignQuestions} />

        {/* Tabs */}
        <div className="mb-8 flex gap-1 overflow-x-auto scrollbar-hide rounded-xl border border-ink-200 bg-white p-1 dark:border-ink-800 dark:bg-ink-900" role="tablist">
          {([['scenarios', Server, 'Design scenarios'], ['patterns', GitBranch, 'Architecture patterns'], ['concepts', Database, 'Key concepts']] as const).map(([t, Icon, label]) => (
            <button
              key={t}
              role="tab"
              aria-selected={mainTab === t}
              onClick={() => setMainTab(t)}
              className={`flex min-h-[44px] flex-none shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium sm:flex-1 transition-colors duration-150 ease-out ${
                mainTab === t
                  ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
                  : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
              }`}
            >
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Design scenarios */}
          {mainTab === 'scenarios' && (
            <motion.div key="scenarios" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {scenarios.map((s) => (
                  <ScenarioCard
                    key={s.id}
                    scenario={s}
                    isSelected={selectedScenario.id === s.id}
                    onSelect={() => { setSelectedScenario(s); setExpandedStep('1') }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScenario.id}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  id={`${selectedScenario.key}-scenario`}
                >
                  <div className="mb-6 rounded-xl border border-ink-200 bg-ink-50 p-6 dark:border-ink-800 dark:bg-ink-900">
                    <h2 className="text-2xl text-ink-900 dark:text-ink-50">{selectedScenario.title}</h2>
                    <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{selectedScenario.difficulty} &middot; {selectedScenario.timeEstimate}</p>
                  </div>

                  {/* Requirements and scale */}
                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="surface-card p-4">
                      <h3 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">Functional requirements</h3>
                      <ul className="space-y-1.5">{selectedScenario.functionalReqs.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-ink-700 dark:text-ink-200">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-moss-600 dark:text-moss-400" />{r}
                        </li>
                      ))}</ul>
                    </div>
                    <div className="surface-card p-4">
                      <h3 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">Non-functional requirements</h3>
                      <ul className="space-y-1.5">{selectedScenario.nonFunctionalReqs.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-ink-700 dark:text-ink-200">
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />{r}
                        </li>
                      ))}</ul>
                    </div>
                    <div className="surface-card p-4">
                      <h3 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">Scale estimates</h3>
                      <ul className="space-y-1.5">{selectedScenario.scaleTargets.map((r, i) => (
                        <li key={i} className="font-mono text-xs text-ink-700 dark:text-ink-200">{r}</li>
                      ))}</ul>
                    </div>
                  </div>

                  {/* Request flow */}
                  {scenarioDiagrams[selectedScenario.id] && (
                    <div className="mb-6">
                      <h3 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">How one request moves through it</h3>
                      <ArchitectureFlow diagram={scenarioDiagrams[selectedScenario.id]} />
                    </div>
                  )}

                  {/* Step-by-step */}
                  <div className="mb-6 space-y-3">
                    {selectedScenario.steps.map((step, i) => (
                      <div key={i} className="surface-card overflow-hidden">
                        <button
                          onClick={() => setExpandedStep(expandedStep === String(i + 1) ? null : String(i + 1))}
                          className="flex min-h-[44px] w-full items-center justify-between p-4 text-left"
                        >
                          <span className="font-semibold text-ink-900 dark:text-ink-50">{step.title}</span>
                          {expandedStep === String(i + 1) ? <ChevronUp className="h-4 w-4 text-ink-500" /> : <ChevronDown className="h-4 w-4 text-ink-500" />}
                        </button>
                        <AnimatePresence>
                          {expandedStep === String(i + 1) && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-ink-200 dark:border-ink-800">
                              <div className="space-y-3 p-4">
                                <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{step.description}</p>
                                <div className="surface-sunken p-3">
                                  <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Key decisions</h4>
                                  <ul className="space-y-1.5">{step.keyDecisions.map((d, j) => (
                                    <li key={j} className="text-xs text-ink-700 dark:text-ink-200">&bull; {d}</li>
                                  ))}</ul>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Key components and tradeoffs */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="surface-card p-5">
                      <h3 className="mb-4 text-sm font-semibold text-ink-600 dark:text-ink-300">Key components</h3>
                      <div className="divide-y divide-ink-200 dark:divide-ink-800">
                        {selectedScenario.keyComponents.map((c, i) => (
                          <div key={i} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                            <div>
                              <span className="text-sm font-medium text-ink-900 dark:text-ink-50">{c.name}</span>
                              <p className="text-xs text-muted">{c.why}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="surface-card p-5">
                        <h3 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">Trade-offs to discuss</h3>
                        <ul className="space-y-2">{selectedScenario.tradeoffs.map((t, i) => (
                          <li key={i} className="text-xs text-ink-700 dark:text-ink-200">&bull; {t}</li>
                        ))}</ul>
                      </div>
                      <div className="surface-card p-5">
                        <h3 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">Expected follow-up questions</h3>
                        <ul className="space-y-2">{selectedScenario.followUps.map((f, i) => (
                          <li key={i} className="text-xs text-ink-700 dark:text-ink-200">&bull; {f}</li>
                        ))}</ul>
                      </div>
                    </div>
                  </div>

                  {selectedScenario.rubric && (
                    <div className="surface-sunken mt-4 p-5">
                      <h3 className="mb-4 text-sm font-semibold text-ink-600 dark:text-ink-300">How this round is scored</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[36rem] border-collapse text-left text-xs">
                          <thead>
                            <tr className="border-b border-ink-200 dark:border-ink-800">
                              <th scope="col" className="pb-2 pr-4 font-semibold text-ink-900 dark:text-ink-50">Criterion</th>
                              <th scope="col" className="pb-2 pr-4 font-semibold text-ink-900 dark:text-ink-50">Weak answer</th>
                              <th scope="col" className="pb-2 font-semibold text-ink-900 dark:text-ink-50">Strong answer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedScenario.rubric.map((r) => (
                              <tr key={r.criterion} className="border-b border-ink-200/60 last:border-0 dark:border-ink-800/60">
                                <td className="py-3 pr-4 align-top font-medium text-ink-900 dark:text-ink-50">{r.criterion}</td>
                                <td className="py-3 pr-4 align-top text-muted">{r.weak}</td>
                                <td className="py-3 align-top text-ink-700 dark:text-ink-200">{r.strong}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <CoveredToggle track="system-design" itemId={selectedScenario.id} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Architecture patterns */}
          {mainTab === 'patterns' && (
            <motion.div key="patterns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-2">
                  {architecturePatterns.map((p) => (
                    <PatternCard key={p.id} pattern={p} isSelected={selectedPattern.id === p.id} onSelect={() => setSelectedPattern(p)} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPattern.id}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="surface-card p-6 lg:col-span-2"
                  >
                    <h2 className="mb-2 text-2xl text-ink-900 dark:text-ink-50">{selectedPattern.name}</h2>
                    <p className="mb-5 text-ink-600 dark:text-ink-300">{selectedPattern.description}</p>
                    <div className="mb-5 surface-sunken p-4">
                      <p className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Use when</p>
                      <p className="text-sm text-ink-700 dark:text-ink-200">{selectedPattern.when}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="surface-sunken p-4">
                        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-moss-700 dark:text-moss-300">
                          <Check className="h-4 w-4" />Advantages
                        </p>
                        <ul className="space-y-1.5">{selectedPattern.pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm text-ink-700 dark:text-ink-200">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-moss-600 dark:text-moss-400" />{p}
                          </li>
                        ))}</ul>
                      </div>
                      <div className="surface-sunken p-4">
                        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-rust-700 dark:text-rust-300">
                          <AlertTriangle className="h-4 w-4" />Considerations
                        </p>
                        <ul className="space-y-1.5">{selectedPattern.cons.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm text-ink-700 dark:text-ink-200">
                            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rust-600 dark:text-rust-400" />{c}
                          </li>
                        ))}</ul>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <CoveredToggle track="system-design" itemId={selectedPattern.id} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Key concepts */}
          {mainTab === 'concepts' && (
            <motion.div key="concepts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="space-y-6">
                {/* CAP Theorem */}
                <div className="surface-card p-6" id="cap-theorem">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">CAP theorem</h3>
                  <p className="mb-6 max-w-3xl text-sm text-ink-600 dark:text-ink-300">
                    Interview-safe framing: in a real distributed system, partition tolerance is assumed. The real
                    question is what you do during a partition: preserve consistency, or stay available.
                  </p>

                  <div className="mb-6 grid gap-3 md:grid-cols-3">
                    {capPillars.map((pillar) => (
                      <div key={pillar.key} className="surface-sunken p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-2xl font-semibold text-teal-700 dark:text-teal-300">{pillar.key}</span>
                          <span className="chip">{pillar.chip}</span>
                        </div>
                        <h4 className="text-base font-semibold text-ink-900 dark:text-ink-50">{pillar.title}</h4>
                        <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{pillar.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="surface-sunken p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Split className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        <span className="font-semibold text-ink-900 dark:text-ink-50">Choose CP</span>
                      </div>
                      <p className="text-sm text-ink-700 dark:text-ink-200">
                        Preserve correctness, but you may reject requests or look unavailable until the partition heals.
                        Good for payments, locks, and inventory reservations.
                      </p>
                    </div>
                    <div className="surface-sunken p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Split className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        <span className="font-semibold text-ink-900 dark:text-ink-50">Choose AP</span>
                      </div>
                      <p className="text-sm text-ink-700 dark:text-ink-200">
                        Keep serving traffic, but accept eventual consistency and reconcile later. Good for feeds,
                        carts, and analytics.
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 surface-sunken p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-ink-50">
                      <Search className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      Interview shortcut
                    </div>
                    <div className="space-y-3 text-sm text-ink-700 dark:text-ink-200">
                      <p className="font-medium text-ink-900 dark:text-ink-50">
                        Say this out loud: "During a partition, you usually choose between consistency and availability."
                      </p>
                      <p><span className="font-semibold text-ink-900 dark:text-ink-50">Common mistake: </span>saying "just choose any 2 of 3" without mentioning that partitions are the actual trigger.</p>
                      <p><span className="font-semibold text-ink-900 dark:text-ink-50">PACELC reminder: </span>outside partitions, modern interviews often care just as much about latency vs. consistency trade-offs.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-ink-200 dark:border-ink-800">
                    <table className="w-full text-sm">
                      <thead className="bg-ink-100 dark:bg-ink-900">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Choice during partition</th>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">What you prioritize</th>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Good for</th>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Common examples</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
                        <tr>
                          <td className="px-4 py-3 font-semibold text-clay-700 dark:text-clay-300">CP</td>
                          <td className="px-4 py-3 text-ink-600 dark:text-ink-300">Correctness over uptime. Some requests may fail or block.</td>
                          <td className="px-4 py-3 text-ink-600 dark:text-ink-300">Payments, locks, metadata services, inventory reservation</td>
                          <td className="px-4 py-3 text-ink-600 dark:text-ink-300">ZooKeeper, etcd, HBase</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold text-teal-700 dark:text-teal-300">AP</td>
                          <td className="px-4 py-3 text-ink-600 dark:text-ink-300">Uptime over freshness. Data may reconcile later.</td>
                          <td className="px-4 py-3 text-ink-600 dark:text-ink-300">Feeds, carts, social systems, high-write event ingestion</td>
                          <td className="px-4 py-3 text-ink-600 dark:text-ink-300">Cassandra, DynamoDB, Riak</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    CA only really exists when partitions are ignored or impossible, such as a single-node system or a tightly coupled local setup.
                  </p>
                </div>

                {/* SQL vs NoSQL */}
                <div className="surface-card p-6" id="sql-vs-nosql">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">SQL vs. NoSQL</h3>
                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="surface-sunken p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Database className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        <h4 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Relational (SQL)</h4>
                      </div>
                      <ul className="mb-4 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" /> ACID transactions</li>
                        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" /> Complex joins and queries</li>
                        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" /> Strong consistency</li>
                        <li className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-rust-600 dark:text-rust-400" /> Hard to scale horizontally</li>
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        <span className="chip">Postgres</span>
                        <span className="chip">MySQL</span>
                        <span className="chip">SQL Server</span>
                      </div>
                    </div>
                    <div className="surface-sunken p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Database className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        <h4 className="text-lg font-semibold text-ink-900 dark:text-ink-50">NoSQL</h4>
                      </div>
                      <ul className="mb-4 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" /> Horizontal scaling</li>
                        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" /> Flexible schema</li>
                        <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" /> High write throughput</li>
                        <li className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-rust-600 dark:text-rust-400" /> Eventual consistency (usually)</li>
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        <span className="chip">MongoDB</span>
                        <span className="chip">Redis</span>
                        <span className="chip">Cassandra</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {nosqlTypes.map((db) => {
                      const Icon = db.type === 'Document' ? FileText : db.type === 'Key-Value' ? Key : db.type === 'Wide-Column' ? BarChart3 : Share2
                      return (
                        <div key={db.type} className="surface-sunken p-4 text-center">
                          <Icon className="mx-auto mb-2 h-6 w-6 text-teal-600 dark:text-teal-400" />
                          <div className="font-semibold text-ink-900 dark:text-ink-50">{db.type}</div>
                          <div className="text-xs text-muted">{db.example}</div>
                          <div className="mt-2 text-xs text-ink-600 dark:text-ink-300">{db.use}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Caching Strategies */}
                <div className="surface-card p-6" id="caching-strategies">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Caching strategies</h3>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="surface-sunken p-4">
                      <h4 className="mb-3 font-semibold text-ink-900 dark:text-ink-50">Cache-aside (lazy loading)</h4>
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-ink-700 dark:text-ink-200">
                        <span className="chip">App</span><ArrowRight className="h-4 w-4 text-teal-600 dark:text-teal-400" /><span className="chip">Cache</span><ArrowRight className="h-4 w-4 text-teal-600 dark:text-teal-400" /><span className="chip">DB</span>
                      </div>
                      <p className="mt-3 text-xs text-muted">App to cache (miss) to DB, then cache is populated, then app.</p>
                    </div>
                    <div className="surface-sunken p-4">
                      <h4 className="mb-3 font-semibold text-ink-900 dark:text-ink-50">Write-through</h4>
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-ink-700 dark:text-ink-200">
                        <span className="chip">App</span><ArrowRight className="h-4 w-4 text-teal-600 dark:text-teal-400" /><span className="chip">Cache + DB</span>
                      </div>
                      <p className="mt-3 text-xs text-muted">App writes to cache and DB simultaneously.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-ink-200 dark:border-ink-800">
                    <table className="w-full text-sm">
                      <thead className="bg-ink-100 dark:bg-ink-900">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Strategy</th>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Pros</th>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Cons</th>
                          <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Best for</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
                        {cachingComparisonRows.map((row) => (
                          <tr key={row.strategy}>
                            <td className="px-4 py-3 font-semibold text-ink-900 dark:text-ink-50">{row.strategy}</td>
                            <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{row.pros}</td>
                            <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{row.cons}</td>
                            <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{row.bestFor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="chip"><span className="font-semibold text-ink-900 dark:text-ink-50">LRU</span> Least recently used</span>
                    <span className="chip"><span className="font-semibold text-ink-900 dark:text-ink-50">LFU</span> Least frequently used</span>
                    <span className="chip"><span className="font-semibold text-ink-900 dark:text-ink-50">FIFO</span> First in, first out</span>
                    <span className="chip"><span className="font-semibold text-ink-900 dark:text-ink-50">TTL</span> Time to live</span>
                  </div>
                </div>

                {/* ACID Transactions */}
                <div className="surface-card p-6" id="acid-transactions">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">ACID transactions</h3>

                  <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {acidPillars.map((item) => (
                      <div key={item.letter} className="surface-sunken p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-3xl font-semibold text-teal-700 dark:text-teal-300">{item.letter}</span>
                        </div>
                        <h4 className="text-base font-semibold text-ink-900 dark:text-ink-50">{item.word}</h4>
                        <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">Isolation levels and anomalies</h4>
                    <div className="overflow-x-auto rounded-xl border border-ink-200 dark:border-ink-800">
                      <table className="w-full text-sm">
                        <thead className="bg-ink-100 dark:bg-ink-900">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-ink-700 dark:text-ink-200">Level</th>
                            <th className="px-4 py-3 text-center font-semibold text-ink-700 dark:text-ink-200">Dirty read</th>
                            <th className="px-4 py-3 text-center font-semibold text-ink-700 dark:text-ink-200">Non-repeatable</th>
                            <th className="px-4 py-3 text-center font-semibold text-ink-700 dark:text-ink-200">Phantom</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
                          {isolationLevels.map((row) => (
                            <tr key={row.level}>
                              <td className="px-4 py-3 font-semibold text-ink-900 dark:text-ink-50">{row.level}</td>
                              <td className="px-4 py-3 text-center">
                                {row.dirtyRead ? <Check className="mx-auto h-4 w-4 text-moss-600 dark:text-moss-400" /> : <X className="mx-auto h-4 w-4 text-rust-600 dark:text-rust-400" />}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {row.nonRepeatable ? <Check className="mx-auto h-4 w-4 text-moss-600 dark:text-moss-400" /> : <X className="mx-auto h-4 w-4 text-rust-600 dark:text-rust-400" />}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {row.phantom ? <Check className="mx-auto h-4 w-4 text-moss-600 dark:text-moss-400" /> : <X className="mx-auto h-4 w-4 text-rust-600 dark:text-rust-400" />}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-xs text-muted">A check mark means the anomaly is prevented at that level; an X means it is still possible.</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="surface-sunken p-4">
                      <h4 className="mb-2 font-semibold text-ink-900 dark:text-ink-50">ACID</h4>
                      <p className="text-sm text-ink-700 dark:text-ink-200">Strong consistency, transactions.</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="chip">Financial</span>
                        <span className="chip">Inventory</span>
                        <span className="chip">Booking</span>
                      </div>
                    </div>
                    <div className="surface-sunken p-4">
                      <h4 className="mb-2 font-semibold text-ink-900 dark:text-ink-50">BASE</h4>
                      <p className="text-sm text-ink-700 dark:text-ink-200">Basically available, soft state, eventually consistent.</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="chip">Social feeds</span>
                        <span className="chip">Analytics</span>
                        <span className="chip">Caches</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Sharding */}
                <div className="surface-card p-6" id="database-sharding">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Database sharding</h3>
                  <p className="mb-4 text-sm text-ink-600 dark:text-ink-300">Horizontal partitioning to split data across multiple databases.</p>

                  <div className="mb-6 surface-sunken p-6">
                    <div className="mb-4 text-center">
                      <span className="chip">Original database</span>
                    </div>
                    <div className="mb-4 flex justify-center">
                      <ChevronDown className="h-6 w-6 text-ink-400 dark:text-ink-500" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        { shard: 'Shard 1', range: 'A-F' },
                        { shard: 'Shard 2', range: 'G-M' },
                        { shard: 'Shard 3', range: 'N-Z' },
                      ].map((s) => (
                        <div key={s.shard} className="rounded-xl border border-teal-300 bg-teal-50 p-4 text-center dark:border-teal-800 dark:bg-teal-900/20">
                          <div className="font-semibold text-teal-800 dark:text-teal-200">{s.shard}</div>
                          <div className="text-sm text-teal-700 dark:text-teal-300">Range: {s.range}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {shardingStrategies.map((s) => {
                      const Icon = s.name === 'Range' ? Ruler : s.name === 'Hash' ? Hash : FolderTree
                      return (
                        <div key={s.name} className="surface-sunken p-4">
                          <Icon className="mb-2 h-6 w-6 text-teal-600 dark:text-teal-400" />
                          <div className="font-semibold text-ink-900 dark:text-ink-50">{s.name} sharding</div>
                          <div className="mt-2 flex items-center gap-1.5 text-sm text-moss-700 dark:text-moss-400"><Check className="h-3.5 w-3.5" />{s.pro}</div>
                          <div className="flex items-center gap-1.5 text-sm text-rust-600 dark:text-rust-400"><X className="h-3.5 w-3.5" />{s.issue}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Load Balancing */}
                <div className="surface-card p-6" id="load-balancing">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Load balancing algorithms</h3>

                  <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                    <span className="chip">Traffic</span>
                    <ArrowRight className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    <span className="chip">Load balancer</span>
                    <ArrowRight className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    <div className="grid grid-cols-2 gap-2">
                      {['S1', 'S2', 'S3', 'S4'].map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {loadBalancingAlgorithms.map((algo) => (
                      <div key={algo.name} className="surface-sunken p-4">
                        <div className="font-semibold text-ink-900 dark:text-ink-50">{algo.name}</div>
                        <div className="text-sm text-ink-600 dark:text-ink-300">{algo.desc}</div>
                        <div className="mt-2 text-xs text-teal-700 dark:text-teal-300">Best: {algo.best}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Queues */}
                <div className="surface-card p-6" id="message-queues">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Message queues vs. event streaming</h3>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="surface-sunken p-5">
                      <h4 className="mb-3 text-lg font-semibold text-ink-900 dark:text-ink-50">Message queue</h4>
                      <ul className="mb-4 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                        <li>&bull; Point-to-point or pub-sub</li>
                        <li>&bull; Messages consumed once</li>
                        <li>&bull; Good for task queues</li>
                        <li>&bull; Decoupling services</li>
                      </ul>
                      <div className="flex gap-2">
                        <span className="chip">RabbitMQ</span>
                        <span className="chip">SQS</span>
                      </div>
                    </div>
                    <div className="surface-sunken p-5">
                      <h4 className="mb-3 text-lg font-semibold text-ink-900 dark:text-ink-50">Event streaming</h4>
                      <ul className="mb-4 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                        <li>&bull; Persistent log</li>
                        <li>&bull; Multiple consumers</li>
                        <li>&bull; Replayable events</li>
                        <li>&bull; Ordered within partition</li>
                      </ul>
                      <div className="flex gap-2">
                        <span className="chip">Kafka</span>
                        <span className="chip">Kinesis</span>
                      </div>
                    </div>
                  </div>

                  <div className="surface-sunken p-4">
                    <h4 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">When to use what</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">Use a message queue for:</div>
                        <ul className="mt-2 space-y-1 text-sm text-ink-600 dark:text-ink-300">
                          <li>&bull; Task queues, worker pools</li>
                          <li>&bull; At-least-once delivery with idempotent consumers</li>
                          <li>&bull; Simple decoupling</li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">Use event streaming for:</div>
                        <ul className="mt-2 space-y-1 text-sm text-ink-600 dark:text-ink-300">
                          <li>&bull; Event sourcing, audit logs</li>
                          <li>&bull; Fan-out to multiple consumers</li>
                          <li>&bull; Stream processing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Indexes */}
                <div className="surface-card p-6" id="database-indexes">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Database indexes</h3>

                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    {indexTypes.map((idx) => (
                      <div key={idx.name} className="surface-sunken p-5">
                        <h4 className="mb-3 text-lg font-semibold text-ink-900 dark:text-ink-50">{idx.name} index</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-ink-600 dark:text-ink-300">Lookup:</span>
                            <span className="font-mono font-semibold text-ink-900 dark:text-ink-50">{idx.lookup}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-ink-600 dark:text-ink-300">Range:</span>
                            {idx.range ? <Check className="h-4 w-4 text-moss-600 dark:text-moss-400" /> : <X className="h-4 w-4 text-rust-600 dark:text-rust-400" />}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-ink-600 dark:text-ink-300">Equality:</span>
                            {idx.equality ? <Check className="h-4 w-4 text-moss-600 dark:text-moss-400" /> : <X className="h-4 w-4 text-rust-600 dark:text-rust-400" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="surface-sunken p-4">
                    <h4 className="mb-2 font-semibold text-ink-900 dark:text-ink-50">Composite index: left prefix rule</h4>
                    <p className="mb-3 text-sm text-ink-600 dark:text-ink-300">Index on (a, b, c) supports queries on:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 chip"><Check className="h-3.5 w-3.5 text-moss-600 dark:text-moss-400" />(a)</span>
                      <span className="inline-flex items-center gap-1.5 chip"><Check className="h-3.5 w-3.5 text-moss-600 dark:text-moss-400" />(a, b)</span>
                      <span className="inline-flex items-center gap-1.5 chip"><Check className="h-3.5 w-3.5 text-moss-600 dark:text-moss-400" />(a, b, c)</span>
                      <span className="inline-flex items-center gap-1.5 chip"><X className="h-3.5 w-3.5 text-rust-600 dark:text-rust-400" />(b)</span>
                      <span className="inline-flex items-center gap-1.5 chip"><X className="h-3.5 w-3.5 text-rust-600 dark:text-rust-400" />(c)</span>
                      <span className="inline-flex items-center gap-1.5 chip"><X className="h-3.5 w-3.5 text-rust-600 dark:text-rust-400" />(b, c)</span>
                    </div>
                  </div>
                </div>

                {/* Consistent Hashing */}
                <div className="surface-card p-6" id="consistent-hashing">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Consistent hashing</h3>
                  <p className="mb-4 text-sm text-ink-600 dark:text-ink-300">Minimizes rehashing when nodes are added or removed.</p>

                  <div className="mb-6 flex justify-center">
                    <div className="relative h-64 w-64">
                      <svg viewBox="0 0 200 200" className="h-full w-full">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="3" className="text-ink-300 dark:text-ink-700" />
                        {[
                          { x: 100, y: 20, label: 'N1' },
                          { x: 180, y: 100, label: 'N2' },
                          { x: 100, y: 180, label: 'N3' },
                          { x: 20, y: 100, label: 'N4' },
                        ].map((node) => (
                          <g key={node.label}>
                            <circle cx={node.x} cy={node.y} r="12" className="fill-teal-600 dark:fill-teal-500" />
                            <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-white dark:fill-ink-950">{node.label}</text>
                          </g>
                        ))}
                        {[
                          [140, 50], [150, 140], [60, 150], [50, 60],
                        ].map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r="6" className="fill-ink-500 dark:fill-ink-400" opacity="0.8" />
                        ))}
                      </svg>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="surface-sunken p-4">
                      <Check className="mb-2 h-5 w-5 text-moss-600 dark:text-moss-400" />
                      <div className="font-semibold text-ink-900 dark:text-ink-50">Minimal rehashing</div>
                      <div className="mt-1 text-sm text-ink-600 dark:text-ink-300">Only adjacent nodes are affected.</div>
                    </div>
                    <div className="surface-sunken p-4">
                      <Zap className="mb-2 h-5 w-5 text-teal-600 dark:text-teal-400" />
                      <div className="font-semibold text-ink-900 dark:text-ink-50">Horizontal scaling</div>
                      <div className="mt-1 text-sm text-ink-600 dark:text-ink-300">Add or remove nodes easily.</div>
                    </div>
                    <div className="surface-sunken p-4">
                      <BarChart3 className="mb-2 h-5 w-5 text-teal-600 dark:text-teal-400" />
                      <div className="font-semibold text-ink-900 dark:text-ink-50">Even distribution</div>
                      <div className="mt-1 text-sm text-ink-600 dark:text-ink-300">Virtual nodes improve balance.</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="chip">Cassandra</span>
                    <span className="chip">Redis Cluster</span>
                    <span className="chip">Memcached</span>
                    <span className="chip">CDNs</span>
                    <span className="chip">Load balancers</span>
                  </div>
                </div>

                {/* Deep Dive Videos */}
                <div className="surface-card p-6" id="deep-dive-videos">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl text-ink-900 dark:text-ink-50">Deep dive videos</h3>
                      <p className="mt-2 max-w-3xl text-sm text-ink-600 dark:text-ink-300">
                        Shortlist only. These are here for the concepts that most often need a second pass after the fast-review notes.
                      </p>
                    </div>
                    <div className="chip">
                      <PlayCircle className="h-3.5 w-3.5" />
                      Credible YouTube picks
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    {deepDiveVideos.map((video) => (
                      <div key={video.embedId} className="surface-sunken overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden bg-ink-950">
                          <iframe
                            className="h-full w-full"
                            src={`https://www.youtube-nocookie.com/embed/${video.embedId}`}
                            title={video.title}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        <div className="space-y-4 p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold text-teal-700 dark:text-teal-300">{video.channel}</p>
                              <h4 className="mt-1 text-lg font-semibold text-ink-900 dark:text-ink-50">{video.title}</h4>
                            </div>
                            <a
                              href={video.href}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-secondary min-h-0 h-9 shrink-0 gap-1 px-3 text-xs"
                            >
                              Open
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>

                          <p className="rounded-lg bg-white p-3 text-sm text-ink-700 dark:bg-ink-800 dark:text-ink-200">
                            <span className="font-semibold text-ink-900 dark:text-ink-50">Why this one: </span>{video.focus}
                          </p>

                          <p className="text-sm text-ink-600 dark:text-ink-300">
                            <span className="font-semibold text-ink-900 dark:text-ink-50">Best use: </span>{video.whenToWatch}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {video.tags.map((tag) => (
                              <span key={tag} className="chip">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Database Internals */}
                <div className="surface-card p-6" id="database-internals">
                  <h3 className="mb-4 text-2xl text-ink-900 dark:text-ink-50">Database internals</h3>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="surface-sunken p-5">
                      <h4 className="mb-3 text-lg font-semibold text-ink-900 dark:text-ink-50">B-tree</h4>
                      <ul className="mb-4 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                        <li>&bull; Balanced tree structure</li>
                        <li>&bull; O(log n) reads</li>
                        <li>&bull; Range queries</li>
                        <li>&bull; OLTP databases</li>
                      </ul>
                      <div className="flex gap-2">
                        <span className="chip">Postgres</span>
                        <span className="chip">MySQL</span>
                      </div>
                    </div>
                    <div className="surface-sunken p-5">
                      <h4 className="mb-3 text-lg font-semibold text-ink-900 dark:text-ink-50">LSM tree</h4>
                      <ul className="mb-4 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                        <li>&bull; Append-only writes</li>
                        <li>&bull; Memtable to SSTables</li>
                        <li>&bull; Fast writes, slower reads</li>
                        <li>&bull; Bloom filters optimize reads</li>
                      </ul>
                      <div className="flex gap-2">
                        <span className="chip">Cassandra</span>
                        <span className="chip">RocksDB</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {dbInternalsComponents.map((comp) => {
                      const Icon = comp.name === 'WAL' ? FileText : comp.name === 'MVCC' ? HardDrive : comp.name === 'Buffer Pool' ? Database : Lock
                      return (
                        <div key={comp.name} className="surface-sunken p-4 text-center">
                          <Icon className="mx-auto mb-2 h-6 w-6 text-teal-600 dark:text-teal-400" />
                          <div className="font-semibold text-ink-900 dark:text-ink-50">{comp.name}</div>
                          <div className="text-xs text-muted">{comp.full}</div>
                          <div className="mt-2 text-xs text-ink-600 dark:text-ink-300">{comp.desc}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
