# FAANG Interview Prep - Engineering Manager Guide

A comprehensive Next.js application for preparing for engineering manager interviews at FAANG companies.

## Features

- 📚 **Behavioral Interview Prep** - STAR format examples and company-specific frameworks
- 🏗️ **System Design** - Interactive diagrams and architecture patterns
- 💻 **Coding Practice** - Algorithm visualizations with complexity analysis
- 👥 **Leadership Topics** - Hiring, performance management, team building
- 📊 **Progress Tracking** - Track your learning progress across modules
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Charts:** Recharts & D3.js
- **UI Components:** Radix UI

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── behavioral/      # Behavioral interview section
│   ├── system-design/   # System design section
│   ├── coding/         # Coding practice section
│   └── ...
├── components/         # React components
│   ├── behavioral/     # Behavioral-specific components
│   ├── system-design/  # System design components
│   └── ...
├── store/             # Zustand state management
├── hooks/             # Custom React hooks
└── lib/               # Utility functions

```

## Adding New Content

### Adding a New STAR Example

1. Navigate to `src/app/behavioral/page.tsx`
2. Add your example to the `starExamples` array
3. Include situation, task, action, and result

### Adding a New System Design Pattern

1. Navigate to `src/app/system-design/page.tsx`
2. Add your pattern to the `patterns` array
3. Include pros, cons, and description

### Adding a New Company Framework

1. Navigate to `src/app/behavioral/page.tsx`
2. Add the company to the `companies` array
3. Include their leadership principles

## Customization

- **Colors:** Edit `tailwind.config.ts` to change the color scheme
- **Animations:** Modify Framer Motion configs in components
- **Content:** All content is stored in component files for easy editing

## Building for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this for your interview preparation!

## Contributing

Feel free to submit issues and enhancement requests!