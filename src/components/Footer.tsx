'use client'

import { Heart, Github, Coffee, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative">
      {/* Developer Attribution Section - Premium Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
            {/* DevX Group LLC Branding - Logo Only */}
            <a
              href="https://devxgroup.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start text-left"
            >
              {/* DevX Group LLC Logo */}
              <div className="relative h-16 w-40 shrink-0 overflow-hidden rounded-2xl bg-white/10 p-2 shadow-xl backdrop-blur-sm ring-2 ring-white/20 transition-all group-hover:scale-105 group-hover:shadow-2xl">
                <Image
                  src="/devx-logo.png"
                  alt="DevX Group LLC"
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
              {/* Builder Attribution */}
              <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-100">
                Built by Max Sheikhizadeh
                <ExternalLink className="h-3.5 w-3.5" />
              </p>
            </a>

            {/* Tagline */}
            <div className="text-center lg:text-left">
              <p className="text-base font-semibold text-white">
                Free & Open Source
              </p>
              <p className="text-sm text-blue-100">
                Built for the MAANG interview community
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="https://devxgroup.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm ring-2 ring-white/20 transition-all hover:bg-white/20 hover:scale-105 lg:block"
            >
              Visit DevX Group
            </a>
          </div>
        </div>
      </div>

      {/* Donation & Links Section */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Community Message */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> for engineers
              </span>
              <span className="hidden text-gray-300 dark:text-gray-700 sm:block">•</span>
              <span className="hidden sm:inline">Free forever, open source</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://buymeacoffee.com/max.sheikhizadeh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
              >
                <Coffee className="h-4 w-4" />
                <span>Support this project</span>
              </a>
              <a
                href="https://github.com/DevXGroup/Software-Engineer-Manager-Interviw-Prep"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg hover:scale-105 dark:bg-gray-700 dark:hover:bg-gray-600"
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
