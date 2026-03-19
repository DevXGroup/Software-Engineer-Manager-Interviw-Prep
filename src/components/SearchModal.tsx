'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Command, FileText, BookOpen, Building, ChevronRight, Zap, Grid, List, Award } from 'lucide-react'
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
  principle: Award,
}

const typeColors: Record<SearchItemType, string> = {
  page: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  section: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  question: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  concept: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  pattern: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  company: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  principle: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 text-inherit px-0.5 rounded">
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
    element.classList.add('ring-2', 'ring-purple-500', 'ring-offset-2', 'dark:ring-offset-gray-900')
    setTimeout(() => {
      element.classList.remove('ring-2', 'ring-purple-500', 'ring-offset-2', 'dark:ring-offset-gray-900')
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
  ]

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pb-4 pt-20 sm:px-6 sm:pt-24"
          >
            <div className="flex max-h-[calc(100dvh-6rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800 sm:max-h-[calc(100dvh-8rem)]">
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                <Search className="h-5 w-5 shrink-0 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search topics, concepts, questions, patterns..."
                  className="min-w-0 flex-1 bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white sm:text-lg"
                />
                <div className="hidden items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-700 sm:flex">
                  <Command className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">K</span>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Type Filters */}
              <div className="scrollbar-hide flex gap-2 overflow-x-auto border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                {types.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`
                      flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors
                      ${selectedType === type.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {type.value !== 'all' && getTypeIcon(type.value)}
                    {type.label}
                    <span className={`rounded-full px-1.5 py-0.5 text-xs ${
                      selectedType === type.value 
                        ? 'bg-white/20' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
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
                      <Search className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                      <p className="mt-4 text-gray-500 dark:text-gray-400">
                        No results found for &quot;{query}&quot;
                      </p>
                      <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                        Try different keywords or browse all topics
                      </p>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                      <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Start typing to search
                      </p>
                      <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
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
                          className={`
                            flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors
                            ${isSelected 
                              ? 'bg-purple-50 dark:bg-purple-900/20' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }
                          `}
                        >
                          <div className={`rounded-lg p-2 ${typeColors[item.type]}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex min-w-0 items-center gap-2">
                              <h3 className="min-w-0 truncate font-semibold text-gray-900 dark:text-white">
                                {highlightMatch(item.title, query)}
                              </h3>
                              {item.category && (
                                <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                  {item.category}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                              {highlightMatch(item.description, query)}
                            </p>
                            {item.keywords && item.keywords.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap gap-1">
                                {item.keywords.slice(0, 4).map((keyword, i) => (
                                  <span
                                    key={i}
                                    className="rounded-md bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 text-xs text-gray-500 dark:text-gray-400"
                                  >
                                    {highlightMatch(keyword, query)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="mt-0.5 h-4 w-4 text-gray-400" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {filteredResults.length > 0 && (
                <div className="flex flex-col gap-2 border-t border-gray-200 px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5">↵</kbd>
                      Select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5">esc</kbd>
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
