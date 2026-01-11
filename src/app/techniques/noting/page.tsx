import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Noting / Labeling',
  description:
    'Briefly label experiences as they arise to sharpen awareness and catch the mind wandering faster.',
}

export default function NotingPage() {
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
            <h1 className="text-3xl font-bold">Noting / Labeling</h1>
            <Badge variant="warning">intermediate</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            A powerful technique that uses brief mental labels to sharpen
            awareness and develop meta-cognition. When you notice something,
            you gently name it: &quot;thinking,&quot; &quot;hearing,&quot; &quot;planning.&quot;
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>10-30 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>Stages 2, 3, 4</span>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">When to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Noting is especially helpful when:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Mind is scattered and you keep getting lost in thought</li>
              <li>You want to develop quicker awareness of distractions</li>
              <li>You&apos;re curious about patterns in your mental activity</li>
              <li>Breath focus alone isn&apos;t engaging enough</li>
              <li>You want to build insight into the nature of experience</li>
              <li>Transitioning from concentration to insight practice</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Establish a Base',
                content: `Start with breath awareness for a few minutes.
                Let the mind settle somewhat before adding noting.
                You need some stability to note effectively.`,
              },
              {
                title: 'Begin Noting',
                content: `When anything pulls attention away from breath, note it with a simple label:

                • "Thinking" — any mental content, planning, remembering
                • "Hearing" — sounds
                • "Feeling" — emotions or body sensations
                • "Seeing" — visual phenomena (even with eyes closed)
                • "Itching," "Pressure," "Warmth" — specific sensations

                The label should be brief—one or two words, said gently in the mind.`,
              },
              {
                title: 'Note and Return',
                content: `The noting process:
                1. Notice attention has moved
                2. Apply a brief label (e.g., "thinking")
                3. Let go of the labeled experience
                4. Return to breath

                Don't analyze what you noted. The label acknowledges and releases.`,
              },
              {
                title: 'Keep Labels Simple',
                content: `Avoid complex labels. "Thinking about tomorrow's meeting" is too much.
                Just "thinking" or "planning."

                The label is a pointer, not a description.
                Speed matters more than precision.`,
              },
              {
                title: 'Note at the Right Moment',
                content: `Note when you first notice something—at the moment of recognition.
                Don't wait until you've been lost for minutes.
                The earlier you catch it, the more powerful the technique.

                Over time, you'll catch thoughts arising, not just after they've captured you.`,
              },
              {
                title: 'Experiment with Intensity',
                content: `Some teachers suggest "soft noting"—barely whispered mental labels.
                Others use firmer, more precise noting.

                Try both. Soft noting is less disruptive to concentration.
                Firm noting builds stronger mindfulness muscle.`,
              },
              {
                title: 'Graduate Beyond Noting',
                content: `As awareness sharpens, you may find labels unnecessary.
                The recognition itself becomes instant, without needing words.
                This is natural progression—noting is a training wheel.`,
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
                  mistake: 'Over-noting everything constantly',
                  fix: 'Only note what pulls attention. Don\'t note every breath.',
                },
                {
                  mistake: 'Using complex, analytical labels',
                  fix: 'Keep it to one word. "Thinking" not "analyzing my relationship."',
                },
                {
                  mistake: 'Getting frustrated when noting a lot',
                  fix: 'More notes = more awareness. That\'s success, not failure.',
                },
                {
                  mistake: 'Turning noting into thinking about experience',
                  fix: 'Note and immediately release. Don\'t linger on what you noted.',
                },
                {
                  mistake: 'Noting too loudly or forcefully',
                  fix: 'A gentle mental whisper. Noting shouldn\'t feel effortful.',
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
                name: 'Mahasi-Style Noting',
                description: 'Note continuously—rising, falling, sitting, touching. Very active, builds strong momentum. Traditional Burmese approach.',
              },
              {
                name: 'Shinzen Young\'s See-Hear-Feel',
                description: 'Three categories only: See (visual), Hear (auditory), Feel (body). Simpler system, easier to apply.',
              },
              {
                name: 'Gone Noting',
                description: 'Instead of noting what arises, note when things end. "Gone." Builds insight into impermanence.',
              },
              {
                name: 'Emotion-Focused Noting',
                description: 'Specifically track emotions: "anxiety," "irritation," "joy," "boredom." Builds emotional awareness.',
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
            <Tag className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">The Power of Naming</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Neuroscience research shows that labeling emotions reduces their
                intensity (affect labeling). The same principle applies here—
                naming an experience creates a tiny gap between you and it.
                You become the observer rather than being lost in the experience.
                This is the beginning of insight.
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
