'use client'

import { Heart, Github, Coffee, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative">
      {/* Developer Attribution Section - Premium Banner */}
      <div className="relative overflow-hidden bg-ink-900 dark:bg-ink-950">

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 lg:items-start lg:flex-row lg:justify-between">
            {/* DevX Group LLC Branding - Logo Only */}
            <a
              href="https://devxgroup.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* DevX Group LLC Logo */}
              <div className="relative h-16 w-40 shrink-0 overflow-hidden rounded-2xl bg-white/5 p-2 ring-1 ring-white/15 transition-colors duration-150 ease-out group-hover:bg-white/10">
                <Image
                  src="/devx-logo.png"
                  alt="DevX Group LLC"
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
              {/* Builder Attribution */}
              <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-ink-300 lg:justify-start">
                Built by Max Sheikhizadeh
                <ExternalLink className="h-3.5 w-3.5" />
              </p>
            </a>

            {/* Tagline */}
            <div className="text-center">
              <p className="text-base font-semibold text-white">
                Free & Open Source
              </p>
              <p className="text-sm text-ink-300">
                Built for the MAANG interview community
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="https://devxgroup.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[44px] items-center rounded-lg px-6 text-sm font-semibold text-white ring-1 ring-white/25 transition-colors duration-150 ease-out hover:bg-white/10 lg:inline-flex"
            >
              Visit DevX Group
            </a>
          </div>
        </div>
      </div>

      {/* Donation & Links Section */}
      <div className="border-t border-gray-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:justify-between sm:flex-row">
            {/* Community Message */}
            <div className="flex flex-col items-center text-center text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:items-center sm:text-left">
              <span className="flex items-center justify-center gap-1.5">
                Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> for engineers
              </span>
              <span className="hidden text-gray-500 dark:text-gray-700 sm:block">•</span>
              <span className="hidden sm:inline">Free forever, open source</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:gap-3">
              <a
                href="https://buymeacoffee.com/max.sheikhizadeh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors duration-150 ease-out hover:shadow-lg "
              >
                <Coffee className="h-4 w-4" />
                <span>Support this project</span>
              </a>
              <a
                href="https://github.com/DevXGroup/Software-Engineer-Manager-Interviw-Prep"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors duration-150 ease-out hover:bg-gray-800 hover:shadow-lg  dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">Star on GitHub</span>
                <span className="sm:hidden">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
