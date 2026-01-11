import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Loving-Kindness (Metta)',
  description:
    'Cultivate warmth and goodwill toward yourself and others. A heart-opening practice for emotional resilience.',
}

export default function LovingKindnessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/techniques"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground min-h-[44px] py-2 -ml-2 px-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          All Techniques
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Loving-Kindness (Metta)</h1>
            <Badge variant="success">beginner</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Cultivate warmth, goodwill, and compassion toward yourself and others.
            A heart-opening practice that builds emotional resilience.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>10-30 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>All Stages</span>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">When to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Loving-Kindness is versatile and complements all other practices:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>When you notice self-criticism or harsh inner dialogue</li>
              <li>Before or after concentration practice to soften the mind</li>
              <li>When dealing with difficult emotions or relationships</li>
              <li>To build emotional warmth and resilience over time</li>
              <li>As a daily practice for heart-centered development</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Settle and Ground',
                content: `Find a comfortable posture. Take a few breaths to settle.
                Bring awareness to your heart area—the center of your chest.
                You might place a hand there gently to help focus attention.`,
              },
              {
                title: 'Begin with Yourself',
                content: `Silently offer these phrases to yourself:

                "May I be happy."
                "May I be healthy."
                "May I be safe."
                "May I live with ease."

                Don't force a feeling—just sincerely offer the wishes.
                If feeling arises, welcome it. If not, that's fine.`,
              },
              {
                title: 'Extend to a Loved One',
                content: `Bring to mind someone you care about easily—a friend, family member, pet.
                Visualize them or sense their presence.

                "May you be happy."
                "May you be healthy."
                "May you be safe."
                "May you live with ease."

                Let warmth naturally arise if it does.`,
              },
              {
                title: 'Extend to a Neutral Person',
                content: `Think of someone you neither like nor dislike—a neighbor, cashier, stranger.
                Recognize they want happiness just as you do.

                "May you be happy."
                "May you be healthy."
                "May you be safe."
                "May you live with ease."`,
              },
              {
                title: 'Extend to a Difficult Person (Optional)',
                content: `If ready, bring to mind someone you have difficulty with.
                Start with mildly difficult—not your greatest enemy.
                Remember: they too want happiness and freedom from suffering.

                "May you be happy."
                "May you be healthy."
                "May you be safe."
                "May you live with ease."

                This is challenging. Be gentle with yourself.`,
              },
              {
                title: 'Extend to All Beings',
                content: `Expand to include all beings everywhere:

                "May all beings be happy."
                "May all beings be healthy."
                "May all beings be safe."
                "May all beings live with ease."

                Rest in this expansive, boundless goodwill.`,
              },
              {
                title: 'Return to Yourself',
                content: `End by returning attention to yourself.
                Notice how you feel in your heart and body.
                Take a few breaths before opening your eyes.`,
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
                  mistake: 'Forcing or manufacturing emotion',
                  fix: 'Just offer the wishes sincerely. Feeling follows intention over time.',
                },
                {
                  mistake: 'Rushing through the phrases',
                  fix: 'Take your time. Let each phrase land before moving on.',
                },
                {
                  mistake: 'Starting with difficult people too soon',
                  fix: 'Build warmth with easy categories first. Difficult comes later.',
                },
                {
                  mistake: 'Feeling like a failure if no warmth arises',
                  fix: 'The practice works even without feelings. Consistency matters most.',
                },
                {
                  mistake: 'Using phrases that don\'t resonate',
                  fix: 'Adapt phrases to what feels genuine. "May I be peaceful" is fine.',
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
                name: 'Compassion (Karuna)',
                description: 'Focus specifically on suffering. "May you be free from suffering." Use when someone is struggling.',
              },
              {
                name: 'Appreciative Joy (Mudita)',
                description: 'Celebrate others\' happiness. "May your happiness continue and grow." Counters envy.',
              },
              {
                name: 'Self-Compassion Focus',
                description: 'Spend entire session on yourself. Valuable when self-criticism is strong.',
              },
              {
                name: 'Quick Metta',
                description: 'Brief 1-3 minute practice. Offer phrases silently while waiting, walking, or in transitions.',
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
            <Heart className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">A Note on Authenticity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Loving-kindness isn&apos;t about pretending to feel what you don&apos;t.
                It&apos;s about practicing intention—repeatedly wishing well—until the
                heart opens naturally. Some days feel warm, others flat. Both count.
                What matters is showing up and offering the wishes sincerely.
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
