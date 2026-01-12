'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, Wind, Scan, Tag, Eye, Heart, Footprints, Sparkles, Timer, Hand, Sun } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const techniques = [
  {
    slug: 'breath-focus',
    title: 'Breath Focus',
    description: 'The foundational practice. Anchor attention on the sensations of breathing.',
    icon: Wind,
    difficulty: 'beginner' as const,
    duration: '5-30 min',
    stages: ['0', '1', '2'],
    whenToUse: 'Core practice for all stages. Best for building attention stability.',
  },
  {
    slug: 'body-scan',
    title: 'Body Scan',
    description: 'Systematically move attention through the body, noticing sensations.',
    icon: Scan,
    difficulty: 'beginner' as const,
    duration: '10-45 min',
    stages: ['1', '2', '3'],
    whenToUse: 'Great for releasing tension, grounding, and developing body awareness.',
  },
  {
    slug: 'noting',
    title: 'Noting / Labeling',
    description: 'Briefly label experiences (thinking, feeling, hearing) to sharpen awareness.',
    icon: Tag,
    difficulty: 'intermediate' as const,
    duration: '10-30 min',
    stages: ['2', '3', '4'],
    whenToUse: 'When mind is scattered or you want to develop meta-awareness.',
  },
  {
    slug: 'open-monitoring',
    title: 'Open Monitoring',
    description: 'Rest in choiceless awareness, observing whatever arises without preference.',
    icon: Eye,
    difficulty: 'intermediate' as const,
    duration: '15-45 min',
    stages: ['3', '4', '5'],
    whenToUse: 'After stable concentration is established. For insight into impermanence.',
  },
  {
    slug: 'loving-kindness',
    title: 'Loving-Kindness (Metta)',
    description: 'Cultivate warmth and goodwill toward yourself and others.',
    icon: Heart,
    difficulty: 'beginner' as const,
    duration: '10-30 min',
    stages: ['1', '2', '3', '4', '5'],
    whenToUse: 'To counter self-criticism, build emotional resilience, or as a warm-up.',
  },
  {
    slug: 'walking-meditation',
    title: 'Walking Meditation',
    description: 'Bring mindful attention to the sensations of walking.',
    icon: Footprints,
    difficulty: 'beginner' as const,
    duration: '10-30 min',
    stages: ['0', '1', '2', '3'],
    whenToUse: 'When sitting is difficult, for variety, or to integrate practice with movement.',
  },
  {
    slug: 'whole-body-breathing',
    title: 'Whole-Body Breathing',
    description: 'Expand breath awareness to include sensations throughout the entire body.',
    icon: Sparkles,
    difficulty: 'intermediate' as const,
    duration: '20-45 min',
    stages: ['3', '4', '5'],
    whenToUse: 'To deepen concentration and unify attention. Gateway to absorption states.',
  },
  {
    slug: 'gratitude',
    title: 'Gratitude Practice',
    description: 'Short practice to cultivate appreciation and positive emotion.',
    icon: Timer,
    difficulty: 'beginner' as const,
    duration: '3-10 min',
    stages: ['0', '1', '2'],
    whenToUse: 'As a quick session, warm-up, or daily life micro-practice.',
  },
  {
    slug: 'bilateral-grounding',
    title: 'Bilateral Grounding',
    description: 'Left-right tapping for quick nervous system reset and grounding.',
    icon: Hand,
    difficulty: 'beginner' as const,
    duration: '1-3 min',
    stages: ['0', '1', '2', '3', '4', '5'],
    whenToUse: 'Quick reset when anxious, before meditation, or to come back from dissociation.',
  },
  {
    slug: 'safe-place',
    title: 'Safe Place Close',
    description: 'Closing visualization with warm light scan for regulation.',
    icon: Sun,
    difficulty: 'beginner' as const,
    duration: '2-5 min',
    stages: ['0', '1', '2', '3', '4', '5'],
    whenToUse: 'End any session with regulation, after difficult practice, or before sleep.',
  },
]

type Difficulty = 'beginner' | 'intermediate' | 'advanced'
type FilterOption = 'all' | Difficulty

const difficultyStyles: Record<Difficulty, string> = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
}

export default function TechniquesPage() {
  const [filter, setFilter] = React.useState<FilterOption>('all')

  const filteredTechniques = React.useMemo(() => {
    if (filter === 'all') return techniques
    return techniques.filter((t) => t.difficulty === filter)
  }, [filter])

  const filterOptions: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Techniques</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A library of meditation practices. Each technique serves different
            purposes and fits different stages of development.
          </p>
        </div>

        {/* Filter by difficulty */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter techniques by difficulty"
        >
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className="min-h-[44px] min-w-[80px]"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <p className="mt-4 text-center text-sm text-muted-foreground" aria-live="polite">
          Showing {filteredTechniques.length} technique{filteredTechniques.length !== 1 ? 's' : ''}
        </p>

        {/* Technique Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredTechniques.map((technique) => (
            <Link
              key={technique.slug}
              href={`/techniques/${technique.slug}`}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
            >
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 group-focus-visible:border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <technique.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyStyles[technique.difficulty]}`}>
                      {technique.difficulty}
                    </span>
                  </div>
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                    {technique.title}
                  </CardTitle>
                  <CardDescription>{technique.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{technique.duration}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Stages:</span>
                      {technique.stages.map((stage) => (
                        <span
                          key={stage}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs"
                          aria-label={`Stage ${stage}`}
                        >
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {technique.whenToUse}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary">
                    Learn technique
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Which to start with */}
        <div className="mt-16 rounded-lg border bg-muted/30 p-6">
          <h2 className="font-semibold">Which Technique Should I Start With?</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Absolute beginners:</strong> Start
              with Breath Focus. It&apos;s the foundation for everything else.
            </p>
            <p>
              <strong className="text-foreground">Feeling self-critical:</strong> Add
              Loving-Kindness as a warm-up or standalone practice.
            </p>
            <p>
              <strong className="text-foreground">Mind very scattered:</strong> Try
              Noting to help catch distractions faster.
            </p>
            <p>
              <strong className="text-foreground">Physical tension:</strong> Use Body
              Scan to release holding patterns.
            </p>
            <p>
              <strong className="text-foreground">Ready for depth:</strong>{' '}
              Whole-Body Breathing leads to deeper concentration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
