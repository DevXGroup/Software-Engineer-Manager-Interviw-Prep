import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Footer } from '@/components/Footer'
import { DonateToast } from '@/components/DonateToast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://softwareprep.devxgroup.io'),
  title: {
    default: 'EM Interview Mastery — Free FAANG Engineering Manager Prep',
    template: '%s | EM Interview Mastery',
  },
  description: 'Free, open-source interview prep for Engineering Manager roles at Meta, Amazon, Apple, Netflix, Google & Microsoft. Covers behavioral, system design, coding, technical leadership, team management, and AI interview topics.',
  keywords: [
    'engineering manager interview',
    'FAANG interview prep',
    'MAANG interview',
    'EM interview questions',
    'software engineering manager interview',
    'Meta EM interview',
    'Amazon SDM interview',
    'Google EM interview',
    'Apple engineering manager',
    'Netflix engineering manager',
    'Microsoft engineering manager',
    'system design interview',
    'behavioral interview STAR',
    'leadership principles Amazon',
    'technical leadership interview',
    'team management interview',
  ],
  authors: [{ name: 'Max Sheikhizadeh', url: 'https://devxgroup.io' }],
  creator: 'DevXGroup',
  publisher: 'DevXGroup',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://softwareprep.devxgroup.io',
  },
  openGraph: {
    title: 'EM Interview Mastery — Free FAANG Engineering Manager Prep',
    description: 'Free, open-source interview prep for EM roles at Meta, Amazon, Apple, Netflix, Google & Microsoft. Behavioral, system design, coding, leadership, and AI topics.',
    url: 'https://softwareprep.devxgroup.io',
    siteName: 'EM Interview Mastery',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EM Interview Mastery — Free FAANG Engineering Manager Prep',
    description: 'Free, open-source interview prep for EM roles at Meta, Amazon, Apple, Netflix, Google & Microsoft.',
    creator: '@devxgroup',
    site: '@devxgroup',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <DonateToast />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
