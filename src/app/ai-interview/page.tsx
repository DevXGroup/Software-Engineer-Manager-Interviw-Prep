'use client'

import { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Brain, ChevronDown, ChevronUp, Search, Eye, EyeOff, X, Cpu, Shield, TrendingUp, Lightbulb, Check } from 'lucide-react'
import { QuizLauncher } from '@/components/QuizLauncher'
import { SearchParamSync, type SearchParamsLike } from '@/components/SearchParamSync'
import { CoveredToggle } from '@/components/CoveredToggle'
import { useIsCovered, useCoveredCount } from '@/store/progressStore'
import { aiInterviewQuestions } from '@/data/quizzes/ai-interview'
import { aiQuestions, categories, levels, keyConcepts, aiInterviewItemIds } from '@/data/tracks/ai-interview'

const levelColors = {
  Foundational: 'bg-moss-100 text-moss-700 dark:bg-moss-900/30 dark:text-moss-400',
  Strategic: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Deep Dive': 'bg-rust-100 text-rust-700 dark:bg-rust-900/30 dark:text-rust-400',
}

const categoryIcons: Record<string, React.ElementType> = {
  'AI Product Strategy': TrendingUp,
  'LLM Systems': Cpu,
  'Responsible AI': Shield,
  'AI Team & Org': Brain,
  'AI Metrics': Lightbulb,
}

type Tab = 'qa' | 'practice' | 'concepts'

function CoveredCheck({ itemId }: { itemId: string }) {
  const covered = useIsCovered('ai-interview', itemId)
  if (!covered) return null
  return <Check className="h-4 w-4 text-moss-600 dark:text-moss-400" aria-label="Covered" />
}

export default function AIInterviewPage() {
  const [tab, setTab] = useState<Tab>('qa')
  const [expandedQ, setExpandedQ] = useState<string | null>(null)
  const [practiceVisible, setPracticeVisible] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [levelFilter, setLevelFilter] = useState('All')
  const reduceMotion = useReducedMotion()
  const covered = useCoveredCount('ai-interview', aiInterviewItemIds)

  const syncSearchParams = useCallback((searchParams: SearchParamsLike) => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'qa' || tabParam === 'practice' || tabParam === 'concepts') {
      setTab(tabParam)
    }
  }, [])

  const filtered = useMemo(() => {
    return aiQuestions.filter(q => {
      const matchSearch = !search || q.question.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categoryFilter === 'All' || q.category === categoryFilter
      const matchLevel = levelFilter === 'All' || q.level === levelFilter
      return matchSearch && matchCategory && matchLevel
    })
  }, [search, categoryFilter, levelFilter])

  return (
    <div className="min-h-screen px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <SearchParamSync onChange={syncSearchParams} />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-ink-200 pb-8 dark:border-ink-800">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-clay-600 px-4 py-1.5 text-sm font-medium text-white dark:bg-clay-500 dark:text-ink-950">
            <Brain className="h-4 w-4" /> New: AI interview prep
          </div>
          <h1 className="text-4xl text-ink-900 dark:text-ink-50">AI &amp; machine learning interview prep</h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-700 dark:text-ink-200">12 deep-dive Q&amp;As, key AI concepts, practice mode. For SDMs and AI PMs.</p>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            <span className="font-mono tabular-nums">{covered}/{aiInterviewItemIds.length}</span> covered
          </p>
        </div>

        <QuizLauncher sectionId="ai-interview" title="AI Interview" questions={aiInterviewQuestions} />

        {/* Tabs */}
        <div className="mb-8 flex gap-1 overflow-x-auto scrollbar-hide rounded-xl border border-ink-200 bg-white p-1 dark:border-ink-800 dark:bg-ink-900">
          {([['qa', Brain, 'AI Q&A bank'], ['practice', Eye, 'Practice mode'], ['concepts', Cpu, 'Key concepts']] as const).map(([t, Icon, label]) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`flex min-h-[44px] flex-none shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium sm:flex-1 transition-colors duration-150 ease-out ${tab === t ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950' : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Q&A tab */}
          {tab === 'qa' && (
            <motion.div key="qa" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="mb-6 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search AI questions..."
                    className="w-full rounded-lg border border-ink-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:outline-none dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50" />
                  {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-ink-500" /></button>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {levels.map(l => (
                    <button key={l} onClick={() => setLevelFilter(l)}
                      className={`inline-flex min-h-[44px] items-center rounded-lg px-3 text-xs font-medium transition-colors duration-150 ease-out ${levelFilter === l ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950' : 'bg-white text-ink-700 card-hover dark:bg-ink-900 dark:text-ink-200'}`}>
                      {l}
                    </button>
                  ))}
                  <span className="h-4 w-px bg-ink-200 dark:bg-ink-700 mt-1" />
                  {categories.slice(1).map(c => (
                    <button key={c} onClick={() => setCategoryFilter(prev => prev === c ? 'All' : c)}
                      className={`inline-flex min-h-[44px] items-center rounded-lg px-3 text-xs font-medium transition-colors duration-150 ease-out ${categoryFilter === c ? 'bg-teal-600 text-white dark:bg-teal-500 dark:text-ink-950' : 'bg-white text-ink-700 card-hover dark:bg-ink-900 dark:text-ink-200'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mb-4 text-sm text-ink-600 dark:text-ink-300">{filtered.length} questions</p>

              <div className="space-y-4">
                {filtered.map((q) => {
                  const Icon = categoryIcons[q.category] ?? Brain
                  const isExpanded = expandedQ === q.id
                  return (
                    <div key={q.id} id={q.id} className="rounded-xl surface-card">
                      <div className="cursor-pointer p-6" onClick={() => setExpandedQ(isExpanded ? null : q.id)}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                              <span className="text-xs font-medium text-teal-700 dark:text-teal-400">{q.category}</span>
                              <span className={`chip text-xs font-medium ${levelColors[q.level]}`}>{q.level}</span>
                              {!isExpanded && <CoveredCheck itemId={q.id} />}
                            </div>
                            <h3 className="font-semibold text-ink-900 dark:text-ink-50">{q.question}</h3>
                          </div>
                          {isExpanded ? <ChevronUp className="h-5 w-5 shrink-0 text-ink-500" /> : <ChevronDown className="h-5 w-5 shrink-0 text-ink-500" />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-ink-200 dark:border-ink-800">
                            <div className="p-6 space-y-4">
                              <div className="surface-sunken p-4 text-sm text-ink-700 dark:text-ink-200 leading-relaxed whitespace-pre-line">{q.answer}</div>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                  <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Key points</h4>
                                  <ul className="space-y-1.5">{q.keyPoints.map((k, j) => <li key={j} className="text-xs text-ink-700 dark:text-ink-200">{k}</li>)}</ul>
                                </div>
                                <div>
                                  <h4 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Likely follow-ups</h4>
                                  <ul className="space-y-1.5">{q.followUps.map((f, j) => <li key={j} className="text-xs text-ink-700 dark:text-ink-200">{f}</li>)}</ul>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <CoveredToggle track="ai-interview" itemId={q.id} size="sm" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Practice tab */}
          {tab === 'practice' && (
            <motion.div key="practice" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="mb-6 surface-card p-6">
                <h2 className="text-xl text-ink-900 dark:text-ink-50">Practice mode</h2>
                <p className="mt-1 text-ink-700 dark:text-ink-200">Formulate your answer before revealing. AI interviewers probe depth, practice speaking for 2-3 minutes per question.</p>
              </div>
              <div className="space-y-6">
                {aiQuestions.map((q) => {
                  const Icon = categoryIcons[q.category] ?? Brain
                  return (
                    <div key={q.id} className="rounded-xl surface-card p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-xs font-medium text-teal-700 dark:text-teal-400">{q.category}</span>
                        <span className={`chip text-xs font-medium ${levelColors[q.level]}`}>{q.level}</span>
                      </div>
                      <p className="text-lg font-semibold text-ink-900 dark:text-ink-50">{q.question}</p>
                      <div className="mt-4 space-y-3">
                        {!practiceVisible[q.id] ? (
                          <button onClick={() => setPracticeVisible(prev => ({ ...prev, [q.id]: true }))}
                            className="btn-primary inline-flex items-center gap-2">
                            <Eye className="h-4 w-4" /> Reveal answer
                          </button>
                        ) : (
                          <div>
                            <button onClick={() => setPracticeVisible(prev => ({ ...prev, [q.id]: false }))}
                              className="mb-3 flex items-center gap-2 text-sm text-ink-600 hover:text-ink-800 dark:text-ink-300 dark:hover:text-ink-100">
                              <EyeOff className="h-4 w-4" /> Hide
                            </button>
                            <div className="surface-sunken p-4 text-sm text-ink-700 dark:text-ink-200 leading-relaxed whitespace-pre-line">{q.answer}</div>
                          </div>
                        )}
                        <div className="flex justify-end">
                          <CoveredToggle track="ai-interview" itemId={q.id} size="sm" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Key concepts tab */}
          {tab === 'concepts' && (
            <motion.div key="concepts" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="grid gap-4 sm:grid-cols-2">
                {keyConcepts.map((c) => (
                  <div key={c.id} id={c.id} className="rounded-xl surface-card p-5">
                    <h3 className="mb-2 font-semibold text-ink-900 dark:text-ink-50">{c.term}</h3>
                    <p className="mb-3 text-sm text-ink-600 dark:text-ink-300">{c.definition}</p>
                    <div className="surface-sunken p-3">
                      <p className="text-xs font-medium text-teal-700 dark:text-teal-400">In practice</p>
                      <p className="mt-0.5 text-xs text-ink-700 dark:text-ink-200">{c.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
