'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Home, BookOpen, Code, Users, Layers, Target, Brain, Search } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { DonateButton } from '@/components/DonateButton'
import { SearchModal } from '@/components/SearchModal'
import { useSearch } from '@/hooks/useSearch'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Behavioral', href: '/behavioral', icon: BookOpen },
  { name: 'System Design', href: '/system-design', icon: Layers },
  { name: 'Coding', href: '/coding', icon: Code },
  { name: 'Leadership', href: '/technical-leadership', icon: Target },
  { name: 'Team', href: '/team-management', icon: Users },
  { name: 'AI Prep', href: '/ai-interview', icon: Brain },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const openedAt = useRef(0)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { isSearchOpen, openSearch, closeSearch } = useSearch()

  const handleMenuToggle = () => {
    if (!isOpen) openedAt.current = Date.now()
    setIsOpen(prev => !prev)
  }

  const handleBackdropClose = () => {
    // Guard against the iOS ghost-click that fires 300ms after the hamburger tap
    if (Date.now() - openedAt.current > 350) setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 z-50 w-full glass-effect border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9333ea"/>
                    <stop offset="100%" stopColor="#2563eb"/>
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="8" fill="url(#logoGrad)"/>
                <text
                  x="16"
                  y="22"
                  fontFamily="system-ui,-apple-system,BlinkMacSystemFont,sans-serif"
                  fontWeight="800"
                  fontSize="13"
                  fill="white"
                  textAnchor="middle"
                >EM</text>
              </svg>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                EM Mastery
              </span>
            </Link>

            {/* Desktop Navigation - Scrollable */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-all
                        ${isActive
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="hidden xl:inline">{item.name}</span>
                      <span className="xl:hidden">{item.name.split(' ')[0]}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden lg:flex items-center gap-1 rounded-lg bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-xs font-mono">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-xl p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Donate Button */}
            <DonateButton className="hidden sm:inline-flex" />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={handleMenuToggle}
              className="rounded-xl p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden transition-all"
              style={{ touchAction: 'manipulation' }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClose}
              className="fixed inset-0 z-30 bg-black/20 md:hidden touch-none"
            />
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ overscrollBehavior: 'contain' }}
            >
              <div
                className="flex w-full flex-col bg-white dark:bg-gray-800 pt-16 overflow-y-auto"
                style={{ minHeight: '100dvh', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
              >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-4">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  style={{ touchAction: 'manipulation' }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Search button in mobile menu */}
              <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                <button
                  onClick={() => { setIsOpen(false); openSearch(); }}
                  className="flex w-full items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 text-left text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <Search className="h-5 w-5" />
                  <span className="text-base font-medium">Search...</span>
                </button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors
                          ${isActive
                            ? 'bg-gray-900 text-white dark:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Footer actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4">
                <DonateButton className="w-full justify-center" />
              </div>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </nav>
  )
}