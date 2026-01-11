import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Gratitude Practice',
  description:
    'A short practice to cultivate appreciation and positive emotion. Perfect as a warm-up, quick session, or daily life micro-practice.',
}

export default function GratitudePage() {
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
            <h1 className="text-3xl font-bold">Gratitude Practice</h1>
            <Badge variant="success">beginner</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            A brief but powerful practice that deliberately cultivates appreciation.
            Shifts attention from what&apos;s lacking to what&apos;s present.
            Can be done in just a few minutes, anytime, anywhere.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>3-10 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>Stages 0, 1, 2</span>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">When to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Gratitude practice works well:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>As a brief session when you don&apos;t have time for longer practice</li>
              <li>At the start of a day to set positive tone</li>
              <li>At the end of a day to reflect on what went well</li>
              <li>When mood is low or mind is caught in negativity</li>
              <li>As a warm-up before concentration practice</li>
              <li>As a micro-practice during daily activities</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Settle Briefly',
                content: `Take three deep breaths to arrive.
                Close your eyes or soften your gaze.
                Let the body relax. You don't need much settling for this practice.`,
              },
              {
                title: 'Bring Something to Mind',
                content: `Think of something you're grateful for. It can be:

                • A person in your life
                • A good thing that happened today
                • Something about your body that works well
                • A basic need that's met (shelter, food, safety)
                • A small pleasure (morning coffee, sunshine, a comfortable chair)

                Start simple. Profound gratitude isn't required.`,
              },
              {
                title: 'Feel the Gratitude',
                content: `Don't just think about the thing—feel appreciation for it.
                Notice where gratitude shows up in the body.
                Often there's warmth in the chest, softening around the eyes.
                Let the feeling grow if it wants to.`,
              },
              {
                title: 'Add More Items',
                content: `After 30-60 seconds with one item, add another.
                Work through 3-5 things you're grateful for.
                Move between different categories:
                • People
                • Things that happened
                • Ongoing circumstances
                • Your own qualities
                • Simple pleasures`,
              },
              {
                title: 'Notice the Shift',
                content: `After a few minutes, notice how you feel.
                Has your mood shifted? How does the body feel now?
                The mind tends to feel lighter, more open.
                This shift is the practice working.`,
              },
              {
                title: 'Close and Carry',
                content: `Take a breath and open your eyes.
                Try to carry this appreciative quality into your next activity.
                The practice doesn't have to end when you open your eyes.`,
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
                  mistake: 'Only listing things without feeling',
                  fix: 'Pause with each item. Let appreciation land in the body.',
                },
                {
                  mistake: 'Forcing gratitude for things you don\'t feel grateful for',
                  fix: 'Work with what\'s genuine. Even small, simple things count.',
                },
                {
                  mistake: 'Comparing to others ("I should be more grateful")',
                  fix: 'This practice isn\'t about what you should feel. Just notice what\'s present.',
                },
                {
                  mistake: 'Making it too complicated',
                  fix: 'Simple is fine. "Grateful for this cup of tea" works perfectly.',
                },
                {
                  mistake: 'Using it to bypass difficult emotions',
                  fix: 'Gratitude complements working with difficulty, doesn\'t replace it.',
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
                name: 'Gratitude Journal',
                description: 'Write 3 things you\'re grateful for each day. Writing deepens the practice and creates a record.',
              },
              {
                name: 'Gratitude for Difficulty',
                description: 'Find something to appreciate in a challenging situation. "This is teaching me patience." Advanced but powerful.',
              },
              {
                name: 'Gratitude Toward Self',
                description: 'Appreciate your own qualities, efforts, or progress. Especially valuable if self-critical.',
              },
              {
                name: 'Gratitude in the Moment',
                description: 'Throughout the day, pause and appreciate something present right now. No formal practice needed.',
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
              <h3 className="font-semibold">The Science of Gratitude</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Research consistently shows that gratitude practice improves wellbeing.
                Regular practice is associated with better sleep, improved relationships,
                reduced depression, and greater life satisfaction. The brain adapts to
                what we practice—deliberately cultivating appreciation trains the mind
                to notice what&apos;s good. This is neuroplasticity working for you.
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
