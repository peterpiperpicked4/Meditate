import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Circle, Target, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'The Path',
  description:
    'A progressive journey from first meditation to deep practice. Six stages with clear goals, techniques, and milestones.',
}

const stages = [
  {
    number: 0,
    title: 'Start & Consistency',
    tagline: 'Show up daily',
    duration: 'Weeks 1-4',
    goal: 'Build a daily habit. Sit every day, no matter how short.',
    whatYouDo: [
      'Sit for 10-15 minutes daily',
      'Use breath as anchor (nose, chest, or belly)',
      'When mind wanders, notice and return—no judgment',
      'Complete sessions even when they feel "bad"',
    ],
    failureModes: [
      'Skipping days because "yesterday was hard"',
      'Judging sessions as good or bad',
      'Waiting for perfect conditions to practice',
      'Extending duration too fast',
    ],
    milestones: [
      'Completed 7 consecutive days',
      'Can find breath within first minute',
      'Notice wandering before 5+ minutes pass',
      'Session feels routine, not effortful to start',
    ],
    readyWhen:
      'You have 2+ weeks of near-daily practice and sitting down feels automatic.',
    techniques: ['Breath Focus'],
  },
  {
    number: 1,
    title: 'Attention Stability',
    tagline: 'Stay with the breath',
    duration: 'Weeks 4-12',
    goal: 'Develop stable attention that can rest on breath for longer periods without wandering.',
    whatYouDo: [
      'Extend sessions to 15-20 minutes',
      'Count breaths 1-10 as training wheels',
      'Practice "continuous attention"—feeling entire breath cycle',
      'Notice the moment attention leaves the breath',
    ],
    failureModes: [
      'Trying to force concentration (creates tension)',
      'Getting frustrated when attention wavers',
      'Spacing out vs. actively attending',
      'Confusing "thinking about breath" with "feeling breath"',
    ],
    milestones: [
      'Can follow 10 consecutive breaths',
      'Catch wandering within seconds',
      'Breath becomes more vivid, detailed',
      'Occasional periods of stable, effortless attention',
    ],
    readyWhen:
      'You regularly experience stretches (even 30 seconds) where attention rests easily on breath.',
    techniques: ['Breath Focus', 'Counting Breaths'],
  },
  {
    number: 2,
    title: 'Clarity & Meta-Awareness',
    tagline: 'Know what the mind is doing',
    duration: 'Months 2-4',
    goal: 'Develop peripheral awareness that monitors the mind, catching distractions before they fully hijack attention.',
    whatYouDo: [
      'Practice "noting"—briefly label distractions (thinking, planning, remembering)',
      'Maintain awareness of the breath while noting',
      'Notice the difference between attention and awareness',
      'Catch subtle dullness (spaced out but not thinking)',
    ],
    failureModes: [
      'Over-noting (constant labeling becomes another distraction)',
      'Losing the object while noting',
      'Confusing drowsiness with calm',
      'Beating yourself up when you notice lapses',
    ],
    milestones: [
      'Can identify distraction type (thought, sensation, emotion)',
      'Catch subtle dullness before it deepens',
      'Attention feels sharper, more defined',
      'Less surprise at finding yourself lost',
    ],
    readyWhen:
      'You rarely lose track of breath for extended periods, and you know when attention quality is declining.',
    techniques: ['Breath Focus', 'Noting', 'Labeling'],
  },
  {
    number: 3,
    title: 'Body as Anchor',
    tagline: 'Expand the field',
    duration: 'Months 3-6',
    goal: 'Expand attention to include whole-body awareness, using body sensations as a broader, more stable anchor.',
    whatYouDo: [
      'Body scan: move attention systematically through body regions',
      'Whole-body breathing: feel breath sensations throughout body',
      'Notice pleasant, unpleasant, and neutral sensations',
      'Use body awareness to detect subtle emotional states',
    ],
    failureModes: [
      'Scanning too fast (rushing through regions)',
      'Expecting specific sensations (manufacturing experience)',
      'Avoiding unpleasant sensations',
      'Losing clarity as attention expands',
    ],
    milestones: [
      'Can feel subtle sensations in any body region',
      'Breath and body sensations merge into unified field',
      'Physical tension noticed and released naturally',
      'Body becomes reliable grounding when mind is busy',
    ],
    readyWhen:
      'You can maintain clear, continuous awareness of body sensations while breathing remains prominent.',
    techniques: ['Body Scan', 'Whole-Body Breathing', 'Breath Focus'],
  },
  {
    number: 4,
    title: 'Deep Concentration',
    tagline: 'Unify the mind',
    duration: 'Months 6-12+',
    goal: 'Develop access concentration—a stable, pleasant, absorbed state where attention rests effortlessly.',
    whatYouDo: [
      'Extend sessions to 30-45 minutes',
      'Whole-body breathing with unified attention',
      'Notice and cultivate pleasant aspects of concentration',
      'Allow attention to unify without forcing',
    ],
    failureModes: [
      'Chasing after "states" or peak experiences',
      'Forcing or straining toward jhana',
      'Attachment to pleasant experiences',
      'Neglecting daily life practice',
    ],
    milestones: [
      'Sessions regularly feel unified and continuous',
      'Pleasant sensations arise from concentration itself',
      'Mind feels gathered, not scattered',
      'Deep calm that persists after session',
    ],
    readyWhen:
      'You regularly experience periods of absorbed concentration and can enter stable states reliably.',
    techniques: ['Whole-Body Breathing', 'Open Monitoring', 'Loving-Kindness'],
    note: 'Some traditions describe deeper states (jhanas). You don\'t need to pursue these explicitly—they may or may not arise. Focus on developing stable, pleasant concentration.',
  },
  {
    number: 5,
    title: 'Insight & Integration',
    tagline: 'See clearly, live wisely',
    duration: 'Ongoing',
    goal: 'Use concentrated attention to investigate experience and integrate mindfulness into daily life.',
    whatYouDo: [
      'Open monitoring: observe all experience without preference',
      'Notice impermanence (constant change in sensations, thoughts)',
      'Notice reactivity (push/pull toward experience)',
      'Practice mindfulness in daily activities',
      'Loving-kindness and compassion practices',
    ],
    failureModes: [
      'Intellectualizing instead of directly seeing',
      'Spiritual bypassing (using insight to avoid difficult emotions)',
      'Becoming detached vs. non-reactive',
      'Neglecting formal practice once "insights" arise',
    ],
    milestones: [
      'See impermanence directly, not just conceptually',
      'Notice selfing process (how sense of self is constructed)',
      'React less automatically to triggers',
      'Mindfulness accessible throughout the day',
    ],
    readyWhen:
      'This stage is ongoing. The goal shifts from achieving to embodying—living mindfully becomes natural.',
    techniques: ['Open Monitoring', 'Noting', 'Loving-Kindness', 'Walking Meditation'],
  },
]

export default function PathPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">The Path</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A progressive journey from your first meditation to deep practice.
            Each stage builds skills for the next.
          </p>
        </div>

        {/* How to Use */}
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>How to Use This Path</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Don&apos;t rush.</strong> Spend
              adequate time at each stage before moving on. The milestones help
              you know when you&apos;re ready.
            </p>
            <p>
              <strong className="text-foreground">Stages overlap.</strong> You
              might work on elements from multiple stages simultaneously. That&apos;s
              normal.
            </p>
            <p>
              <strong className="text-foreground">Regression happens.</strong>{' '}
              Stress, life changes, or breaks from practice can set you back.
              Just restart where you are.
            </p>
            <p>
              <strong className="text-foreground">This is one map, not the territory.</strong>{' '}
              Other frameworks exist. Use whatever helps you practice
              consistently.
            </p>
          </CardContent>
        </Card>

        {/* Stages */}
        <div className="mt-16 space-y-12">
          {stages.map((stage, index) => (
            <div key={stage.number} id={`stage-${stage.number}`}>
              {/* Stage Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  {stage.number}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{stage.title}</h2>
                  <p className="text-muted-foreground">{stage.tagline}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{stage.duration}</Badge>
                    {stage.techniques.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stage Content */}
              <div className="mt-6 ml-16 grid gap-6 lg:grid-cols-2">
                {/* Goal */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="h-4 w-4 text-primary" />
                      Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{stage.goal}</p>
                  </CardContent>
                </Card>

                {/* What You Do */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">What You Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {stage.whatYouDo.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <Circle className="h-2 w-2 mt-1.5 flex-shrink-0 fill-current" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Common Failure Modes */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />
                      Common Pitfalls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {stage.failureModes.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-warning" aria-hidden="true">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                      Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {stage.milestones.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-success" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Ready When */}
              <div className="mt-6 ml-16">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm">
                    <strong>Ready to move on when:</strong>{' '}
                    <span className="text-muted-foreground">{stage.readyWhen}</span>
                  </p>
                </div>
                {stage.note && (
                  <p className="mt-3 text-sm text-muted-foreground italic">
                    {stage.note}
                  </p>
                )}
              </div>

              {/* Divider */}
              {index < stages.length - 1 && (
                <div className="mt-12 ml-16 flex items-center">
                  <div className="h-px flex-1 bg-border" />
                  <ArrowRight className="mx-4 h-5 w-5 text-muted-foreground" />
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stage 6: Teaching */}
        <div className="mt-16" id="stage-6">
          <Card className="border-dashed">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed text-lg font-bold text-muted-foreground">
                  6
                </div>
                <div>
                  <CardTitle>Teaching & Stewardship</CardTitle>
                  <CardDescription>Guide others while still learning</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                At some point, you may feel called to help others learn meditation.
                This is valuable—teaching deepens your own practice.
              </p>
              <p>
                However, approach this with humility. You don&apos;t need to be
                &quot;enlightened&quot; to help a beginner sit for 10 minutes.
                But be honest about the limits of your experience. When
                someone&apos;s questions exceed your knowledge, direct them to
                appropriate resources or teachers.
              </p>
              <p>
                <strong className="text-foreground">Key principles:</strong>
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Teach what you&apos;ve actually practiced, not what you&apos;ve read</li>
                <li>• Clearly communicate your experience level</li>
                <li>• Never discourage someone from seeking professional help</li>
                <li>• Continue your own practice and learning</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">Where to Start?</h2>
          <p className="mt-2 text-muted-foreground">
            If you&apos;re new, begin with Stage 0. Build consistency first,
            skills second.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/start">
                Start Here Guide
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/practice?tab=plans">Choose a Plan</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
