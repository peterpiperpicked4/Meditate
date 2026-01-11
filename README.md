# Zero → Deep: A Practical Mindfulness Training Path

A production-quality educational website for learning mindfulness meditation from beginner to advanced practice. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Progressive Learning Path**: 6 stages from first sit to deep practice
- **Meditation Timer**: Configurable duration, interval bells, technique selection
- **Session Logging**: Automatic tracking with tags, notes, and statistics
- **Practice Plans**: Built-in plans (7-day, 30-day, 8-week, 12-week) plus custom plan builder
- **Journaling**: Guided prompts for reflection and insight tracking
- **Technique Library**: Detailed instructions for breath focus, body scan, noting, loving-kindness, and more
- **Troubleshooting Guides**: Solutions for common challenges like monkey mind, sleepiness, doubt
- **Advanced Content**: Deep concentration, insight practices, retreat guidance
- **Science Section**: Evidence-based benefits with appropriate caveats
- **Local-First Storage**: All data stored in browser localStorage (no accounts required)
- **Export/Import**: Back up data as JSON or export sessions as CSV

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Meditate

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── start/             # Start Here guide
│   ├── path/              # The Path (stages)
│   ├── practice/          # Timer, Plans, Log, Journal
│   ├── techniques/        # Technique library
│   ├── troubleshooting/   # Common challenges
│   ├── advanced/          # Deep practice
│   ├── science/           # Research & benefits
│   ├── resources/         # Books, apps, teachers
│   ├── journey/           # Learning in public blog
│   ├── about/             # About page
│   └── disclaimer/        # Disclaimer
├── components/
│   ├── ui/                # Base UI components (button, card, etc.)
│   ├── layout/            # Header, Footer
│   ├── home/              # Home page components
│   ├── practice/          # Timer, Plans, Log, Journal tabs
│   └── mdx/               # MDX rendering components
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── storage.ts         # localStorage abstraction
│   └── plan-builder.ts    # Practice plan generation
└── types/
    └── mdx.d.ts           # MDX type definitions
```

## Data Storage

All user data is stored in the browser's localStorage:

- **Sessions**: Meditation sessions with duration, technique, tags, notes
- **Plans**: Active and custom practice plans
- **Journal**: Entries with guided prompts and mood tracking
- **Preferences**: Timer defaults, bell settings, dark mode

### Storage Keys

- `ztd_sessions` - Array of Session objects
- `ztd_plans` - Array of Plan objects
- `ztd_journal` - Array of JournalEntry objects
- `ztd_preferences` - User preferences object

### Data Types

```typescript
interface Session {
  id: string
  startTime: string
  endTime: string
  durationSec: number
  technique: string
  notes: string
  tags: string[]
}

interface Plan {
  id: string
  name: string
  description: string
  startDate: string
  weeks: PlanWeek[]
  createdAt: string
  isActive: boolean
  isBuiltIn: boolean
}

interface JournalEntry {
  id: string
  date: string
  linkedSessionId?: string
  text: string
  prompts: { ... }
  mood?: string
}
```

### Export/Import

- Export all data as JSON: Practice → Log → Export → JSON
- Export sessions as CSV: Practice → Log → Export → CSV
- Import from backup: Practice → Log → Import

## Adding Content

### Adding a New Technique

1. Create a new page at `src/app/techniques/[technique-slug]/page.tsx`
2. Add the technique to the list in `src/app/techniques/page.tsx`
3. Follow the pattern in existing technique pages

### Adding a Journey Post

1. Create a new page at `src/app/journey/[post-slug]/page.tsx`
2. Add the post metadata to the list in `src/app/journey/page.tsx`

For MDX support, you can also create `.mdx` files in a `content/` directory and set up MDX remote loading.

## Testing

```bash
# Run tests
npm test

# Run tests once
npm run test:run
```

Tests cover:
- Plan builder logic
- Stats calculation
- Utility functions

## Deployment

The app is static-friendly and can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any static host** (after `next export`)

### Environment Variables

No environment variables are required for basic functionality. All data is stored client-side.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI primitives with shadcn/ui patterns
- **Icons**: Lucide React
- **Testing**: Vitest

## Future Enhancements

Potential additions for future versions:

- [ ] Optional user accounts with cloud sync
- [ ] Email capture for newsletter
- [ ] Audio guided meditations
- [ ] Social features (practice buddies)
- [ ] Progressive web app (PWA) for offline use
- [ ] Dark mode toggle in UI
- [ ] Notification reminders
- [ ] Integration with health apps
- [ ] Paid courses/premium content
- [ ] Community forum

## Contributing

Contributions welcome! Please:

1. Open an issue to discuss proposed changes
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## Disclaimer

This site is for educational purposes only. It is not medical advice. See `/disclaimer` for full details.

## License

MIT License - feel free to use, modify, and distribute.

---

Built with care for mindful humans.
