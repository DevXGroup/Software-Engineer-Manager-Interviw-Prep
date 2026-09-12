'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Search, X, Command, FileText, BookOpen, Building, ChevronRight, Zap, Grid, List, Trophy, CalendarDays } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { searchIndex, type SearchItem, type SearchItemType } from '@/data/searchIndex'
import { buildSearchTarget, hasSearchNavigationState } from '@/lib/searchNavigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const typeIcons: Record<SearchItemType, React.ElementType> = {
  page: FileText,
  section: BookOpen,
  question: Zap,
  concept: Grid,
  pattern: List,
  company: Building,
  challenge: Trophy,
  week: CalendarDays,
}

const typeIconStyle = 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300'

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="rounded bg-amber-200 px-0.5 text-inherit dark:bg-amber-800">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

function fuzzyMatch(item: SearchItem, query: string): { score: number; matches: string[] } {
  const queryLower = query.toLowerCase()
  const matches: string[] = []
  let score = 0
  
  // Title exact match (highest priority)
  if (item.title.toLowerCase().includes(queryLower)) {
    score += 100
    matches.push('title')
  }
  
  // Keywords match
  const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(queryLower))
  if (keywordMatch) {
    score += 50
    matches.push('keywords')
  }
  
  // Description match
  if (item.description.toLowerCase().includes(queryLower)) {
    score += 25
    matches.push('description')
  }
  
  // Category match
  if (item.category?.toLowerCase().includes(queryLower)) {
    score += 30
    matches.push('category')
  }
  
  // Partial word matches (fuzzy)
  const queryWords = queryLower.split(/\s+/)
  const titleWords = item.title.toLowerCase().split(/\s+/)
  const partialMatch = queryWords.every(qw => 
    titleWords.some(tw => tw.includes(qw))
  )
  if (partialMatch && !matches.includes('title')) {
    score += 15
  }
  
  return { score, matches }
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filteredResults, setFilteredResults] = useState<SearchItem[]>([])
  const [selectedType, setSelectedType] = useState<SearchItemType | 'all'>('all')
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter and sort results
  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults([])
      return
    }

    let results = searchIndex
      .map(item => ({ item, ...fuzzyMatch(item, query) }))
      .filter(({ score }) => score > 0)
      .filter(({ item }) => selectedType === 'all' || item.type === selectedType)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)

    // Limit to top 50 results
    results = results.slice(0, 50)
    
    setFilteredResults(results)
    setSelectedIndex(0)
  }, [query, selectedType])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && filteredResults.length > 0) {
        e.preventDefault()
        const selected = filteredResults[selectedIndex]
        if (selected) {
          handleSelect(selected)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredResults, selectedIndex, onClose])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const highlightSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return false

    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    element.classList.add('outline', 'outline-2', 'outline-clay-500')
    setTimeout(() => {
      element.classList.remove('outline', 'outline-2', 'outline-clay-500')
    }, 2000)
    return true
  }, [])

  const highlightSectionWhenReady = useCallback((sectionId: string, attemptsLeft = 24) => {
    if (highlightSection(sectionId) || attemptsLeft <= 0) {
      return
    }

    window.setTimeout(() => {
      highlightSectionWhenReady(sectionId, attemptsLeft - 1)
    }, 120)
  }, [highlightSection])

  const handleSelect = useCallback((item: SearchItem) => {
    onClose()

    const target = buildSearchTarget(item)
    const needsNavigationState = hasSearchNavigationState(item)

    if (item.sectionId && item.href === pathname && !needsNavigationState && highlightSection(item.sectionId)) {
      return
    }

    router.push(target)

    if (item.sectionId) {
      window.setTimeout(() => {
        highlightSectionWhenReady(item.sectionId!)
      }, 80)
    }
  }, [highlightSection, highlightSectionWhenReady, onClose, pathname, router])

  const getTypeIcon = (type: SearchItemType) => {
    const Icon = typeIcons[type]
    return <Icon className="h-4 w-4" />
  }

  const types: { value: SearchItemType | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: searchIndex.length },
    { value: 'page', label: 'Pages', count: searchIndex.filter(i => i.type === 'page').length },
    { value: 'section', label: 'Sections', count: searchIndex.filter(i => i.type === 'section').length },
    { value: 'question', label: 'Questions', count: searchIndex.filter(i => i.type === 'question').length },
    { value: 'pattern', label: 'Patterns', count: searchIndex.filter(i => i.type === 'pattern').length },
    { value: 'concept', label: 'Concepts', count: searchIndex.filter(i => i.type === 'concept').length },
    { value: 'company', label: 'Companies', count: searchIndex.filter(i => i.type === 'company').length },
    { value: 'challenge', label: 'Challenges', count: searchIndex.filter(i => i.type === 'challenge').length },
    { value: 'week', label: 'Weeks', count: searchIndex.filter(i => i.type === 'week').length },
  ]

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[50] bg-ink-950/60"
          />

          {/* Modal */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pb-4 pt-20 sm:px-6 sm:pt-24"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Search the site"
              className="surface-card flex max-h-[calc(100dvh-6rem)] w-full max-w-3xl flex-col overflow-hidden sm:max-h-[calc(100dvh-8rem)]"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-ink-200 p-4 dark:border-ink-800">
                <Search className="h-5 w-5 shrink-0 text-ink-500 dark:text-ink-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search topics, concepts, questions, patterns..."
                  className="min-w-0 flex-1 bg-transparent text-base text-ink-900 placeholder-ink-400 focus:outline-none dark:text-ink-50 dark:placeholder-ink-500 sm:text-lg"
                />
                <div className="chip hidden sm:flex">
                  <Command className="h-3.5 w-3.5" />
                  <span>K</span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-600 transition-colors duration-150 ease-out hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Type Filters */}
              <div className="scrollbar-hide flex gap-2 overflow-x-auto border-b border-ink-200 px-4 py-2 dark:border-ink-800" role="tablist">
                {types.map((type) => (
                  <button
                    key={type.value}
                    role="tab"
                    aria-selected={selectedType === type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors duration-150 ease-out ${
                      selectedType === type.value
                        ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
                        : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
                    }`}
                  >
                    {type.value !== 'all' && getTypeIcon(type.value)}
                    {type.label}
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-xs ${
                        selectedType === type.value ? 'bg-white/20' : 'bg-ink-100 dark:bg-ink-800'
                      }`}
                    >
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Results */}
              <div 
                ref={resultsRef}
                className="min-h-0 flex-1 overflow-y-auto p-2"
              >
                {filteredResults.length === 0 ? (
                  query.trim() ? (
                    <div className="py-12 text-center">
                      <Search className="mx-auto h-12 w-12 text-ink-400 dark:text-ink-600" />
                      <p className="mt-4 text-muted">
                        No results found for &quot;{query}&quot;
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        Try different keywords or browse all topics
                      </p>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-ink-400 dark:text-ink-600" />
                      <p className="mt-4 text-muted">
                        Start typing to search
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        Find topics, patterns, questions, and more
                      </p>
                    </div>
                  )
                ) : (
                  <div className="space-y-1">
                    {filteredResults.map((item, index) => {
                      const Icon = typeIcons[item.type]
                      const isSelected = index === selectedIndex
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex min-h-[44px] w-full items-start gap-3 rounded-lg p-3 text-left transition-colors duration-150 ease-out ${
                            isSelected ? 'bg-clay-50 dark:bg-clay-950/30' : 'hover:bg-ink-100 dark:hover:bg-ink-800/50'
                          }`}
                        >
                          <div className={`rounded-lg p-2 ${typeIconStyle}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex min-w-0 items-center gap-2">
                              <h3 className="min-w-0 truncate font-semibold text-ink-900 dark:text-ink-50">
                                {highlightMatch(item.title, query)}
                              </h3>
                              {item.category && (
                                <span className="shrink-0 rounded-md bg-ink-100 px-2 py-0.5 text-xs text-muted dark:bg-ink-800">
                                  {item.category}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 line-clamp-1 text-sm text-muted">
                              {highlightMatch(item.description, query)}
                            </p>
                            {item.keywords && item.keywords.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap gap-1">
                                {item.keywords.slice(0, 4).map((keyword, i) => (
                                  <span
                                    key={i}
                                    className="rounded-md bg-ink-100 px-1.5 py-0.5 text-xs text-muted dark:bg-ink-800"
                                  >
                                    {highlightMatch(keyword, query)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="mt-0.5 h-4 w-4 text-ink-400 dark:text-ink-500" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {filteredResults.length > 0 && (
                <div className="flex flex-col gap-2 border-t border-ink-200 px-4 py-2 text-xs text-muted dark:border-ink-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="chip px-1.5 py-0.5">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="chip px-1.5 py-0.5">↵</kbd>
                      Select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="chip px-1.5 py-0.5">esc</kbd>
                      Close
                    </span>
                  </div>
                  <span className="self-end sm:self-auto">{filteredResults.length} results</span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    ,
    document.body
  )
}
