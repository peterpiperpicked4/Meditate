import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, CheckCircle2, AlertCircle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Callout } from '@/components/ui/callout'

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    'Your complete guide to starting meditation. Learn what mindfulness is, what meditation is not, and try your first 10-minute session.',
}

export default function StartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Start Here</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to begin your meditation practice. No prior
            experience needed—just willingness to sit for a few minutes.
          </p>
        </div>

        {/* What is mindfulness */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">What Is Mindfulness?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Mindfulness is <strong className="text-foreground">paying attention on purpose</strong>,
              to the present moment, without judgment. That&apos;s it.
            </p>
            <p>
              When you practice mindfulness meditation, you&apos;re training your
              ability to notice what&apos;s happening right now—your breath, body
              sensations, thoughts, emotions—without getting swept away by them.
            </p>
            <p>
              Over time, this simple skill transforms how you relate to your
              experience. You become less reactive, more aware, and better able to
              choose how you respond to life.
            </p>
          </div>
        </section>

        {/* What meditation is NOT */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">What Meditation Is Not</h2>
          <ul className="mt-6 space-y-4" aria-label="Common misconceptions about meditation">
            {[
              {
                myth: 'Emptying your mind',
                reality:
                  'Your mind will wander—that\'s normal. The practice is noticing when it wanders and gently returning.',
              },
              {
                myth: 'Instant calm',
                reality:
                  'Some sessions feel peaceful, others feel restless. Both are valid practice. Progress happens over weeks and months.',
              },
              {
                myth: 'A religious practice',
                reality:
                  'Meditation techniques come from various traditions, but the skills are secular: attention, awareness, emotional regulation.',
              },
              {
                myth: 'Escaping your problems',
                reality:
                  'Meditation helps you face reality more clearly, not avoid it. You become better at handling difficulty, not immune to it.',
              },
              {
                myth: 'Only for calm people',
                reality:
                  'People with busy minds often benefit most. The restlessness gives you more opportunities to practice returning.',
              },
            ].map((item, index) => (
              <li key={index} className="flex gap-4">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="font-medium">Not: &quot;{item.myth}&quot;</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.reality}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Your First 10-Minute Sit */}
        <section className="mt-16">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">10 Minutes</span>
              </div>
              <CardTitle className="text-2xl">Your First Meditation</CardTitle>
              <CardDescription>
                A complete guide to your first sit. No timer needed yet—just read
                through, then try it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Step 1: Posture */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Find Your Seat</h4>
                  <div className="mt-2 text-sm text-muted-foreground space-y-2">
                    <p>
                      Sit on a chair, cushion, or bench. The goal is{' '}
                      <strong className="text-foreground">upright but relaxed</strong>—spine
                      naturally tall, not rigid.
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Chair:</strong> Sit forward, feet flat on floor,
                        back unsupported if comfortable
                      </li>
                      <li>
                        <strong>Floor:</strong> Cushion under hips so knees are
                        below hip level
                      </li>
                      <li>
                        <strong>Hands:</strong> Rest on thighs or in lap,
                        whatever feels natural
                      </li>
                      <li>
                        <strong>Eyes:</strong> Gently closed or soft downward gaze
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2: Breath Anchor */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Find the Breath</h4>
                  <div className="mt-2 text-sm text-muted-foreground space-y-2">
                    <p>
                      Let your attention settle on the sensation of breathing.
                      Choose one area:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Nostrils:</strong> The subtle feeling of air
                        entering and leaving
                      </li>
                      <li>
                        <strong>Chest:</strong> The rise and fall of your ribcage
                      </li>
                      <li>
                        <strong>Belly:</strong> The gentle expansion and
                        contraction
                      </li>
                    </ul>
                    <p>
                      Don&apos;t control the breath—just observe it as it naturally
                      happens.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Wandering is Normal */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">When Your Mind Wanders</h4>
                  <div className="mt-2 text-sm text-muted-foreground space-y-2">
                    <p>
                      Your mind <em>will</em> wander. This is not a failure—it&apos;s
                      the practice.
                    </p>
                    <p>When you notice you&apos;ve drifted off into thought:</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>
                        <strong>Notice:</strong> &quot;Oh, I was thinking.&quot;
                      </li>
                      <li>
                        <strong>Let go:</strong> Don&apos;t finish the thought or
                        analyze it
                      </li>
                      <li>
                        <strong>Return:</strong> Gently bring attention back to
                        breath
                      </li>
                    </ol>
                    <p>
                      Each return is a repetition—like a bicep curl for your
                      attention. More wandering means more practice.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4: Close */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Closing Your Session</h4>
                  <div className="mt-2 text-sm text-muted-foreground space-y-2">
                    <p>When your time is up:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Take a few deeper breaths</li>
                      <li>Notice how your body feels</li>
                      <li>Open your eyes slowly</li>
                      <li>
                        Take a moment before jumping into activity—let the
                        stillness linger briefly
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t">
                <Button size="lg" asChild>
                  <Link href="/practice">
                    <Play className="mr-2 h-5 w-5" />
                    Start 10-Minute Timer
                  </Link>
                </Button>
                <p className="mt-3 text-sm text-muted-foreground">
                  Or set any duration that works for you. Even 5 minutes counts.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7-Day Onboarding Plan */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Your First Week</h2>
          <p className="mt-2 text-muted-foreground">
            A simple 7-day plan to build the habit. Each day builds on the last.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                day: 1,
                title: 'Just Sit',
                duration: '10 min',
                focus:
                  'Follow the instructions above. Your only goal: complete the sit.',
              },
              {
                day: 2,
                title: 'Same Again',
                duration: '10 min',
                focus:
                  'Repeat yesterday. Notice if it feels different. No expectations.',
              },
              {
                day: 3,
                title: 'Counting Breaths',
                duration: '10 min',
                focus:
                  'Try counting breaths 1-10, then restart. If you lose count, start over. Non-judgmentally.',
              },
              {
                day: 4,
                title: 'Body Check-In',
                duration: '12 min',
                focus:
                  'After settling on breath, spend 2 minutes noticing body sensations. Then return to breath.',
              },
              {
                day: 5,
                title: 'Wandering Investigation',
                duration: '12 min',
                focus:
                  'When you notice wandering, briefly note what pulled you away (planning? memory? worry?) before returning.',
              },
              {
                day: 6,
                title: 'Slightly Longer',
                duration: '15 min',
                focus:
                  'Extend to 15 minutes. Notice how the extra time feels. Restlessness often peaks then fades.',
              },
              {
                day: 7,
                title: 'Reflection',
                duration: '15 min',
                focus:
                  'Same as day 6, but afterward: journal one thing you noticed about your practice this week.',
              },
            ].map((day) => (
              <Card key={day.day}>
                <CardContent className="flex items-start gap-4 py-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted font-bold">
                    {day.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{day.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {day.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {day.focus}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-lg border bg-muted/50 p-6">
            <h4 className="font-semibold">After Week 1</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              If you completed most days, you&apos;ve built a foundation. Next steps:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                <span>
                  Explore{' '}
                  <Link href="/path" className="text-primary underline">
                    The Path
                  </Link>{' '}
                  to see what&apos;s next
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                <span>
                  Choose a{' '}
                  <Link
                    href="/practice?tab=plans"
                    className="text-primary underline"
                  >
                    longer plan
                  </Link>{' '}
                  (30 days, 8 weeks)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                <span>
                  Learn more{' '}
                  <Link href="/techniques" className="text-primary underline">
                    techniques
                  </Link>{' '}
                  as you progress
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Troubleshooting Preview */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Common Questions</h2>
          <dl className="mt-6 space-y-6">
            {[
              {
                q: 'What if I can\'t stop thinking?',
                a: 'You\'re not supposed to. Thinking is what minds do. Success is noticing when you\'ve wandered and returning—not eliminating thought.',
              },
              {
                q: 'How do I know if I\'m doing it right?',
                a: 'If you sat down, tried to pay attention to breath, and noticed when you wandered—you did it right. That\'s the whole practice.',
              },
              {
                q: 'What time of day is best?',
                a: 'Whatever time you can do consistently. Morning works well because you practice before the day gets busy, but any time counts.',
              },
              {
                q: 'Is it okay to use guided meditations?',
                a: 'Yes, especially when starting. Gradually experiment with unguided practice too—it builds different skills.',
              },
            ].map((item, index) => (
              <div key={index}>
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1 text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            More help in{' '}
            <Link href="/troubleshooting" className="text-primary underline">
              Troubleshooting
            </Link>
            .
          </p>
        </section>

        {/* Safety Note */}
        <section className="mt-16">
          <Callout variant="warning" title="A Note on Safety">
            <div className="space-y-2">
              <p>
                Meditation is generally safe, but it can sometimes bring up
                difficult emotions or memories. This is normal and often part of
                the process.
              </p>
              <p>
                However, if you have a history of trauma, severe anxiety, or
                psychosis, consider working with a teacher or therapist experienced
                in meditation. If intense distress arises, it&apos;s okay to stop,
                open your eyes, and ground yourself.
              </p>
              <p>
                This site is educational, not medical advice. See our{' '}
                <Link
                  href="/disclaimer"
                  className="underline text-callout-warning-title"
                >
                  full disclaimer
                </Link>
                .
              </p>
            </div>
          </Callout>
        </section>

        {/* Final CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold">Ready?</h2>
          <p className="mt-2 text-muted-foreground">
            Your first sit is waiting. Ten minutes is enough to begin.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/practice">
                <Play className="mr-2 h-5 w-5" />
                Start Timer
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/path">
                Explore The Path
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
