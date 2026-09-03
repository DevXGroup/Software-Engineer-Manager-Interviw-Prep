import type { Config } from 'tailwindcss'

/**
 * "Evening Desk" palette.
 * ink    — cool near-neutral (OKLCH hue 255, chroma 0.006). Surfaces and text, light and dark.
 * clay   — the single accent (hue 48). Primary actions and current state only.
 * teal   — the data/second color (hue 215). Charts, diagrams, informational chips.
 * moss / amber / rust — semantic only: success, caution, error/hard.
 * Legacy Tailwind hue names are re-pointed at these ramps so the whole app inherits them.
 */
const ink = {
  50: '#f7f9fb',
  100: '#eef1f4',
  200: '#e0e3e7',
  300: '#c8ccd1',
  400: '#9aa0a6',
  500: '#6b7075',
  600: '#52565b',
  700: '#33363a',
  800: '#222528',
  900: '#17191c',
  950: '#0e1013',
}

const clay = {
  50: '#fdf4ed',
  100: '#f9e7d9',
  200: '#f2cdb2',
  300: '#e5ab85',
  400: '#d2895d',
  500: '#bb6f42',
  600: '#a5592e',
  700: '#874622',
  800: '#6a3518',
  900: '#4e2510',
  950: '#2f1305',
}

const teal = {
  50: '#eef8fc',
  100: '#dcf0f7',
  200: '#bce0ec',
  300: '#95cadd',
  400: '#63aec8',
  500: '#3f95b1',
  600: '#237c98',
  700: '#13647c',
  800: '#084d62',
  900: '#03384a',
  950: '#00212d',
}

const moss = {
  50: '#f1faf2',
  100: '#e2f2e4',
  200: '#c7e3cb',
  300: '#a5cfac',
  400: '#7db589',
  500: '#5f9d6d',
  600: '#488456',
  700: '#376b44',
  800: '#285333',
  900: '#1b3d24',
  950: '#0b2211',
}

const amber = {
  50: '#fdf7ea',
  100: '#f9ecd3',
  200: '#efd9ae',
  300: '#e0bf82',
  400: '#cba14c',
  500: '#b48722',
  600: '#996f00',
  700: '#7d5900',
  800: '#624500',
  900: '#483200',
  950: '#2b1a00',
}

const rust = {
  50: '#fdf3f1',
  100: '#fbe5e1',
  200: '#f6cbc3',
  300: '#eeaa9f',
  400: '#e08376',
  500: '#c96759',
  600: '#af5043',
  700: '#903e33',
  800: '#712e25',
  900: '#53201a',
  950: '#320e0a',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        playfair: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fixed rem scale, ratio ~1.2 in UI sizes, wider steps for headings.
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
        sm: ['0.875rem', { lineHeight: '1.35rem' }],
        base: ['1rem', { lineHeight: '1.65rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.3125rem', { lineHeight: '1.85rem' }],
        '2xl': ['1.5625rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.9375rem', { lineHeight: '2.35rem', letterSpacing: '-0.015em' }],
        '4xl': ['2.4375rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }],
        '5xl': ['3.0625rem', { lineHeight: '3.25rem', letterSpacing: '-0.025em' }],
        '6xl': ['3.8125rem', { lineHeight: '3.95rem', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '4.6rem', letterSpacing: '-0.03em' }],
      },
      colors: {
        ink,
        clay,
        moss,
        rust,
        // Legacy hue names, re-pointed.
        gray: ink,
        slate: ink,
        zinc: ink,
        neutral: ink,
        stone: ink,
        primary: clay,
        purple: clay,
        violet: clay,
        indigo: clay,
        fuchsia: clay,
        pink: clay,
        blue: teal,
        sky: teal,
        cyan: teal,
        teal,
        green: moss,
        emerald: moss,
        lime: moss,
        amber,
        yellow: amber,
        orange: amber,
        red: rust,
        rose: rust,
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.625rem',
        '2xl': '0.875rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(14 16 19 / 0.05)',
        DEFAULT: '0 1px 2px 0 rgb(14 16 19 / 0.06), 0 1px 3px 0 rgb(14 16 19 / 0.05)',
        md: '0 2px 4px -1px rgb(14 16 19 / 0.06), 0 4px 10px -2px rgb(14 16 19 / 0.06)',
        lg: '0 4px 8px -2px rgb(14 16 19 / 0.07), 0 10px 20px -4px rgb(14 16 19 / 0.07)',
        xl: '0 8px 16px -4px rgb(14 16 19 / 0.08), 0 20px 32px -8px rgb(14 16 19 / 0.08)',
        '2xl': '0 12px 24px -6px rgb(14 16 19 / 0.1), 0 28px 48px -12px rgb(14 16 19 / 0.1)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        prose: '72ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
