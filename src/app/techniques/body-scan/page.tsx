import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play, Scan } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Body Scan',
  description:
    'Systematically move attention through the body, noticing sensations. A grounding practice for releasing tension and developing body awareness.',
}

export default function BodyScanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/techniques"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          All Techniques
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Body Scan</h1>
            <Badge variant="success">beginner</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Systematically move attention through the body, noticing sensations
            without trying to change them. A grounding practice that releases
            tension and develops interoceptive awareness.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>10-45 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>Stages 1, 2, 3</span>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">When to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Body Scan is excellent for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Releasing physical tension you didn&apos;t know you were holding</li>
              <li>Grounding when mind feels scattered or anxious</li>
              <li>Developing sensitivity to subtle body sensations</li>
              <li>Before sleep to relax the body systematically</li>
              <li>As a complement to breath-focused practices</li>
              <li>When sitting still feels difficult—this gives the mind a task</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Settle Into Position',
                content: `Lie down on your back if possible—this helps release muscular holding.
                Arms at your sides, palms up. Legs uncrossed.
                If lying isn't possible, sit comfortably with spine upright.
                Close your eyes and take a few breaths to arrive.`,
              },
              {
                title: 'Start at the Feet',
                content: `Bring attention to the soles of your feet.
                Notice whatever sensations are present—warmth, coolness, pressure, tingling, numbness.
                Don't look for particular sensations. Just notice what's actually there.
                Spend 30 seconds to a minute with each area.`,
              },
              {
                title: 'Move Systematically Upward',
                content: `Slowly move attention through the body:

                • Feet (soles, tops, toes)
                • Ankles and lower legs
                • Knees and upper legs
                • Pelvis and hips
                • Lower back and abdomen
                • Upper back and chest
                • Hands (palms, backs, fingers)
                • Forearms and upper arms
                • Shoulders and neck
                • Face (jaw, cheeks, eyes, forehead)
                • Top of the head`,
              },
              {
                title: 'Notice Without Changing',
                content: `The key instruction: notice sensations without trying to change them.
                If you find tension, you don't need to "release" it actively.
                Simply bring kind attention to the area. Often, tension releases on its own.
                If it doesn't, that's fine too. You're building awareness, not forcing relaxation.`,
              },
              {
                title: 'Handle Blank Spots',
                content: `Some areas may feel "blank"—no clear sensation.
                This is normal. Stay with the area for a moment.
                You might notice very subtle sensations you'd usually ignore.
                If nothing arises, that's fine. Move on without frustration.`,
              },
              {
                title: 'Complete the Scan',
                content: `After reaching the top of the head, expand awareness to the whole body.
                Feel the body as a unified field of sensation.
                Rest here for a minute or two.
                Notice the overall sense of aliveness in the body.`,
              },
              {
                title: 'Close the Practice',
                content: `Take a few deeper breaths.
                Wiggle fingers and toes gently.
                If lying down, roll to one side before sitting up.
                Transition slowly—don't jump up immediately.`,
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <div className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                    {step.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-12 border-callout-warning-border bg-callout-warning-bg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-callout-warning-title">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              Common Mistakes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {[
                {
                  mistake: 'Trying to relax muscles actively',
                  fix: 'Just notice. Relaxation often happens naturally with attention.',
                },
                {
                  mistake: 'Moving too quickly through the body',
                  fix: 'Spend at least 30 seconds per region. Slower is better.',
                },
                {
                  mistake: 'Looking for specific sensations',
                  fix: 'Notice what\'s actually present, even if it\'s subtle or "nothing."',
                },
                {
                  mistake: 'Getting frustrated with blank areas',
                  fix: 'Blank areas are information too. Stay curious, move on if needed.',
                },
                {
                  mistake: 'Falling asleep (when lying down)',
                  fix: 'Try sitting, or do the practice earlier in the day.',
                },
              ].map((item, index) => (
                <li key={index}>
                  <span className="font-medium text-callout-warning-title">
                    {item.mistake}
                  </span>
                  <br />
                  <span className="text-callout-warning-text">
                    Fix: {item.fix}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" aria-hidden="true" />
            Variations
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                name: 'Quick Body Scan (5 min)',
                description: 'Move through the body in larger chunks: lower body, torso, upper body, head. Good for brief check-ins.',
              },
              {
                name: 'Detailed Scan (45 min)',
                description: 'Break each region into smaller parts. Individual toes, each finger, specific facial muscles. Very thorough.',
              },
              {
                name: 'Reverse Scan',
                description: 'Start at the head and move downward. Can feel grounding, moving toward the earth.',
              },
              {
                name: 'Sensation Hunting',
                description: 'Look specifically for pleasant, unpleasant, and neutral sensations. Builds equanimity.',
              },
            ].map((variation, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <h4 className="font-semibold">{variation.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {variation.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <div className="flex items-start gap-3">
            <Scan className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">Why Body Scan Works</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We habitually live &quot;from the neck up,&quot; disconnected from bodily
                experience. Body scanning rebuilds this connection. It also
                reveals how emotions manifest physically—anxiety as chest
                tightness, stress as shoulder tension. This awareness becomes
                a tool for emotional regulation beyond the cushion.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/practice">
              <Play className="mr-2 h-5 w-5" aria-hidden="true" />
              Practice Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
