# Engineering Manager Interview Mastery

A comprehensive, interactive Next.js application for preparing for **engineering manager (EM) and senior development manager (SDM) interviews** at top tech companies including Meta, Amazon, Apple, Netflix, Google, and Microsoft.

Built with Next.js 14, TypeScript, and Tailwind CSS, featuring an AI-powered search system, interactive algorithm visualizer, STAR-format behavioral examples, system design patterns, knowledge quizzes, and company-specific interview frameworks with persistent progress tracking.

## 🌐 **[Visit Live Website](https://interviewprep.devxgroup.io/)** ⭐

Start preparing now → **[interviewprep.devxgroup.io](https://interviewprep.devxgroup.io/)**

---

## Table of Contents

- [Features](#features)
- [Modules Overview](#modules-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Adding New Content](#adding-new-content)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Behavioral Interview Prep** - 12 full STAR format examples with company-specific leadership principle frameworks
- **System Design** - Interactive canvas-based architecture diagrams and pattern library with pros/cons analysis
- **Coding Practice** - Algorithm visualizations with complexity analysis, 10 essential DSA patterns, and SDM-focused coding guide
- **Technical Leadership** - Hiring, performance management, and engineering strategy topics
- **Team Management** - Conflict resolution, mentoring, and org-building scenarios
- **AI Interview Prep** - AI/ML-focused interview scenarios and discussion prompts
- **Knowledge Quizzes** - Interactive quizzes to test readiness across all sections
- **Smart Search** - AI-powered search with fuzzy matching, type filtering, and keyboard shortcuts (Cmd+K)
- **Company-Specific Guides** - Detailed interview loops, compensation data, and culture tips for Meta, Amazon, Apple, Netflix, Google, and Microsoft
- **8-Week Study Roadmap** - Structured curriculum with weekly goals and milestones
- **Progress Tracking** - Persistent progress tracking across all modules using local storage
- **Dark Mode** - Full dark/light theme support with system preference detection
- **Responsive Design** - Mobile-first layout with animated navigation and interactive cards
- **Auto-rotating Feature Carousel** - Dynamic hero carousel showcasing key learning areas

---

## Modules Overview

| Module | Route | Content |
|--------|-------|---------|
| Home / Dashboard | `/` | Module cards, progress tracker, quick navigation |
| Behavioral Interview | `/behavioral` | STAR examples, company leadership principles |
| System Design | `/system-design` | Architecture patterns, interactive diagrams |
| Coding Practice | `/coding` | Algorithm patterns, visualizations |
| Coding Challenges | `/coding/challenges` | Hands-on coding problems |
| SDM Coding Guide | `/coding/sdm-guide` | Manager-level coding expectations |
| Technical Leadership | `/technical-leadership` | Strategy, hiring, technical vision |
| Team Management | `/team-management` | People management scenarios |
| AI Interview | `/ai-interview` | AI/ML interview preparation |
| Company Guides | `/companies/[company]` | Amazon, Google, Meta, Apple, Microsoft, Netflix |
| Study Roadmap | `/roadmap` | 8-week structured study plan |

---

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) | Server-side rendering, file-based routing |
| Language | [TypeScript](https://www.typescriptlang.org/) | Type safety across the codebase |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling with dark mode |
| Animations | [Framer Motion](https://www.framer.com/motion/) | Page transitions, hover effects, progress bars |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight, persistent progress tracking |
| Charts | [Recharts](https://recharts.org/) & [D3.js](https://d3js.org/) | Data visualizations and diagrams |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) | Accessible tabs, accordions, dialogs, selects |
| Icons | [Lucide React](https://lucide.dev/) | Consistent icon system |
| Syntax Highlighting | [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) / [Prism.js](https://prismjs.com/) | Code block rendering |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd faang-interview-prep

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint checks |

---

## Project Architecture

### Directory Structure

```
src/
├── app/                          # Next.js App Router (pages & layouts)
│   ├── layout.tsx                # Root layout: ThemeProvider + Navigation
│   ├── page.tsx                  # Home dashboard with module cards
│   ├── globals.css               # Global styles and Tailwind directives
│   ├── behavioral/
│   │   └── page.tsx              # STAR examples + company frameworks
│   ├── system-design/
│   │   └── page.tsx              # Architecture patterns + diagrams
│   ├── coding/
│   │   ├── page.tsx              # Algorithm patterns + visualizations
│   │   ├── challenges/
│   │   │   └── page.tsx          # Coding challenge problems
│   │   └── sdm-guide/
│   │       └── page.tsx          # SDM-level coding guide
│   ├── technical-leadership/
│   │   └── page.tsx              # Leadership strategy topics
│   ├── team-management/
│   │   └── page.tsx              # People management scenarios
│   ├── ai-interview/
│   │   └── page.tsx              # AI/ML interview prep
│   ├── companies/
│   │   └── [company]/
│   │       └── page.tsx          # Dynamic company-specific guides
│   └── roadmap/
│       └── page.tsx              # 8-week study roadmap
├── components/                   # Reusable React components
│   ├── Navigation.tsx            # Top nav bar with mobile menu + theme toggle
│   ├── ThemeProvider.tsx         # Dark/light theme context provider
│   ├── ProgressTracker.tsx       # Module progress dashboard widget
│   ├── InteractiveCard.tsx       # Animated module card with gradient + topics
│   ├── HeroCarousel.tsx          # Auto-rotating feature carousel on home page
│   ├── SearchModal.tsx           # AI-powered search with fuzzy matching
│   ├── Quiz.tsx                  # Quiz component for knowledge testing
│   ├── QuizLauncher.tsx          # Quiz trigger/launcher component
│   ├── DonateButton.tsx          # Donation button component
│   ├── DonateToast.tsx           # Donation confirmation toast
│   ├── Footer.tsx                # Application footer
│   ├── PriorityBadge.tsx         # Priority indicator badge
│   ├── PriorityFilter.tsx        # Priority filtering component
│   ├── behavioral/
│   │   ├── STARExample.tsx       # STAR format display (Situation/Task/Action/Result)
│   │   └── CompanyFramework.tsx  # Company leadership principles grid
│   └── system-design/
│       ├── ArchitecturePattern.tsx  # Pattern card with pros/cons
│       └── SystemDiagram.tsx     # Canvas-based architecture diagram
├── data/                         # Static data and search index
│   └── searchIndex.ts            # Comprehensive search index with fuzzy matching
├── hooks/
│   ├── useTheme.ts               # Theme context hook
│   └── useSearch.ts              # Search functionality hook
└── store/
    └── progressStore.ts          # Zustand store with localStorage persistence
```

### Component Hierarchy

```
RootLayout (layout.tsx)
├── ThemeProvider              # Provides theme context (light/dark)
│   ├── Navigation             # Fixed top nav with search trigger + theme toggle
│   ├── SearchModal            # Global search modal (Cmd+K)
│   └── <main>
│       ├── [Page Component]   # Route-specific page
│       │   ├── HeroCarousel           # Auto-rotating feature showcase (home)
│       │   ├── ProgressTracker        # Progress widget (home)
│       │   ├── InteractiveCard        # Module navigation cards (home)
│       │   ├── STARExample            # Behavioral examples
│       │   ├── CompanyFramework       # Leadership principles
│       │   ├── ArchitecturePattern    # System design patterns
│       │   ├── Quiz                   # Knowledge quizzes
│       │   ├── PriorityFilter         # Content filtering
│       │   └── SystemDiagram          # Canvas diagram
│       └── Footer              # Application footer with links
```

### Data Flow

```
Content (hardcoded arrays in page files)
    │
    ▼
Page Component (maps data → child components)
    │
    ▼
Presentational Components (render with Framer Motion animations)
    │
    ▼
Zustand Store (progressStore) ←→ localStorage ('interview-prep-progress')
```

All interview content (questions, patterns, frameworks, company data) is stored as typed arrays of objects directly in page component files. This keeps content co-located with its rendering logic and makes it straightforward to add or modify content.

### State Management

The app uses a single **Zustand store** with the `persist` middleware for progress tracking:

```typescript
// src/store/progressStore.ts
interface ProgressState {
  progress: Record<string, number>   // { "behavioral": 5, "coding": 12, ... }
  updateProgress: (module: string, completed: number) => void
  resetProgress: () => void
}
```

- **Persistence**: Data is saved to `localStorage` under the key `interview-prep-progress`
- **Modules tracked**: Behavioral (20 items), System Design (15), Coding (30), Leadership (10), Team Management (12)

### Theme System

Theme toggling is managed via React Context in `ThemeProvider.tsx`:

- Reads user preference from `localStorage` on mount
- Falls back to `prefers-color-scheme: dark` media query
- Toggles the `dark` class on `<html>` for Tailwind's `dark:` variants
- Exposed via the `useTheme()` hook

---

## Adding New Content

### Adding a New STAR Behavioral Example

1. Open `src/app/behavioral/page.tsx`
2. Locate the `starExamples` array
3. Add a new object with the STAR structure:

```typescript
{
  situation: "Describe the context and challenge",
  task: "What was your specific responsibility",
  action: "Steps you took to address the situation",
  result: "Quantified outcome and impact"
}
```

### Adding a New System Design Pattern

1. Open `src/app/system-design/page.tsx`
2. Locate the `patterns` array
3. Add a new pattern object:

```typescript
{
  name: "Event-Driven Architecture",
  description: "Asynchronous communication between services via events",
  pros: ["Loose coupling", "Scalability", "Resilience"],
  cons: ["Eventual consistency", "Debugging complexity"]
}
```

### Adding a New Company Framework

1. Open `src/app/companies/[company]/page.tsx`
2. Add a new entry to the `companyData` record:

```typescript
companyData["newcompany"] = {
  name: "Company Name",
  gradient: "from-blue-500 to-blue-600",
  textColor: "text-blue-600",
  tagline: "Key interviewing philosophy",
  rounds: [{ name: "Round 1", duration: "60 min", focus: "Focus area" }],
  topQuestions: [{ q: "Question text", lp: "Related principle" }],
  tips: ["Tip 1", "Tip 2"],
  compensation: [{ role: "EM", base: "$X", total: "$Y" }],
  cultureSignals: ["Signal 1"],
  redFlags: ["Red flag 1"],
  processNotes: "Overview of the hiring process"
}
```

3. The dynamic route `/companies/newcompany` will automatically resolve to your new entry.

### Adding Content to Search Index

1. Open `src/data/searchIndex.ts`
2. Add a new entry to the `searchIndex` array:

```typescript
{
  id: 'unique-id',
  title: 'Content title',
  description: 'Brief description of the content',
  type: 'page' | 'section' | 'question' | 'pattern' | 'concept' | 'company' | 'principle',
  href: '/path/to/page',
  sectionId: 'optional-element-id', // For scrolling to specific section
  category: 'Optional category',
  keywords: ['keyword1', 'keyword2', 'keyword3']
}
```

3. The search will automatically index and make this content discoverable with fuzzy matching.

### Adding a New Interview Module

1. Create a new directory under `src/app/your-module/`
2. Add a `page.tsx` with your content arrays and layout
3. Register the route in `src/components/Navigation.tsx` by adding to `navItems`:

```typescript
{ name: 'Module Name', href: '/your-module', icon: IconComponent }
```

4. Add search index entries for your new content in `src/data/searchIndex.ts`
5. Optionally add progress tracking by registering the module in `src/components/ProgressTracker.tsx`.

---

## Advanced Features

### Smart Search System

The application includes an intelligent search system (Cmd+K) with:

- **Fuzzy Matching** - Intelligently finds results even with typos or partial matches
- **Type Filtering** - Filter by Pages, Sections, Questions, Patterns, Concepts, Companies, and Principles
- **Rich Indexing** - Searches titles, descriptions, keywords, and categories
- **Keyboard Navigation** - Arrow keys to browse, Enter to select, Esc to close
- **Deep Linking** - Automatically scrolls to and highlights relevant sections

Access via the search icon in the navigation bar or press Cmd+K / Ctrl+K.

### Quiz System

Interactive knowledge quizzes help reinforce learning:

- Section-specific quizzes across all modules
- Immediate feedback on answers
- Progress tracking for quiz attempts
- Mix of question types for comprehensive assessment

### Hero Carousel

The home page features an auto-rotating carousel that:

- Cycles through 5 key learning areas (Behavioral, System Design, Coding, Leadership, Quizzes)
- Auto-advances every 5 seconds
- Manual navigation with dot indicators
- Responsive design for all screen sizes

---

## Customization Guide

### Theming and Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
// tailwind.config.ts → theme.extend.colors
primary: {
  500: '#8b5cf6',  // Main brand purple
  600: '#7c3aed',  // Hover state
  // ... full scale from 50-900
}
```

Dark mode is controlled via Tailwind's `class` strategy. All components use `dark:` variant classes.

### Animations

Framer Motion is used throughout. Common patterns:

- **Page entrance**: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- **Hover lift**: `whileHover={{ y: -5 }}` on interactive cards
- **Staggered lists**: `transition={{ delay: index * 0.1 }}` for sequential reveals
- **Progress bars**: Animated width transitions on progress indicators

Custom Tailwind animations are defined in `tailwind.config.ts` under `animation` and `keyframes`.

### Component Customization

| Component | File | What to Change |
|-----------|------|----------------|
| Navigation links | `components/Navigation.tsx` | `navItems` array |
| Progress modules | `components/ProgressTracker.tsx` | `modules` array |
| Hero carousel slides | `components/HeroCarousel.tsx` | `slides` array |
| Home page cards | `app/page.tsx` | `sections` array |
| Company data | `app/companies/[company]/page.tsx` | `companyData` record |
| Search index | `data/searchIndex.ts` | `searchIndex` array for search results |
| Quiz content | `components/Quiz.tsx` | Quiz questions and answers |

---

## Deployment

### Vercel (Recommended)

The fastest path to production:

1. Push your repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy**

No environment variables are required. All content is statically embedded.

### Self-Hosted / Docker

```bash
# Build the production bundle
npm run build

# Start the server (default port 3000)
npm start

# Or specify a custom port
PORT=8080 npm start
```

For Docker:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

Since the app uses dynamic routes (`[company]`), a full static export requires `generateStaticParams`. If all content is known at build time, add to `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',  // Enables static HTML export
}
```

---

## Performance Optimization

- **SWC Minification**: Enabled via `swcMinify: true` in `next.config.js`
- **React Strict Mode**: Enabled for catching side-effect issues in development
- **Code Splitting**: Next.js App Router automatically splits pages into separate bundles
- **Client Components**: Only components requiring interactivity (animations, state) use `'use client'`
- **Font Optimization**: Uses `next/font/google` for the Inter font (zero layout shift)
- **Image Optimization**: Use `next/image` for any added images to get automatic optimization
- **Bundle Analysis**: Run `npx @next/bundle-analyzer` to inspect bundle sizes

### Build Optimization Tips

- Content arrays are inlined in page components, so they benefit from tree-shaking
- Zustand's persist middleware uses lazy hydration to avoid blocking the initial render
- Framer Motion animations are CSS-transform-based for GPU acceleration
- Canvas-based diagrams (`SystemDiagram`) render once on mount, avoiding re-renders

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Module not found` errors | Run `npm install` to ensure all dependencies are installed |
| Dark mode not persisting | Check that `localStorage` is not blocked (private browsing) |
| Canvas diagram not rendering | Ensure the browser supports HTML5 Canvas; resize the window to trigger a re-render |
| Hydration mismatch warnings | Expected on first load for theme — `suppressHydrationWarning` is set on `<html>` |
| Port 3000 already in use | Use `PORT=3001 npm run dev` or kill the process on port 3000 |
| Tailwind styles not applying | Verify `content` paths in `tailwind.config.ts` include your file patterns |

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | Yes |
| Firefox 90+ | Yes |
| Safari 15+ | Yes |
| Edge 90+ | Yes |
| Mobile Chrome / Safari | Yes |
| Internet Explorer | No |

Requires JavaScript enabled. Uses modern features: CSS Grid, Flexbox, Canvas API, `localStorage`, CSS custom properties.

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-module`)
3. Make your changes following the existing patterns
4. Run `npm run lint` to check for issues
5. Submit a pull request

### Content Contribution Ideas

- Additional company interview guides
- New system design patterns or case studies
- More STAR-format behavioral examples
- Coding problem walkthroughs with visualizations
- Localization / internationalization support

---

## License

MIT License - feel free to use this for your interview preparation!
