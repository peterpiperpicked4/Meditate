import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, Play, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Safe Place Close',
  description:
    'A closing visualization combining safe place imagery with a warm light body scan. Used for regulation and integration after practice.',
}

export default function SafePlacePage() {
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
            <h1 className="text-3xl font-bold">Safe Place Close</h1>
            <Badge variant="success">beginner</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            A closing practice combining safe place visualization with a warm light scan.
            Used to end sessions with regulation and integration.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>2-5 minutes</span>
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
            <p>Safe Place Close is excellent for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ending any meditation session with a sense of completion</li>
              <li>After difficult or intense practice sessions</li>
              <li>When you&apos;ve worked with challenging emotions</li>
              <li>Before sleep to settle the nervous system</li>
              <li>Anytime you need to return to a regulated state</li>
              <li>As a standalone 2-minute calming practice</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Choose Your Safe Place',
                content: `Think of a place where you feel safe, calm, and grounded.

This can be:
• A real place you've been (beach, forest, childhood room)
• An imaginary place (a meadow, a cozy cabin)
• Somewhere simple (your current room, but quieter)

The only requirement: it feels safe to you.`,
              },
              {
                title: 'Arrive There',
                content: `Close your eyes and place yourself in this safe place.

Where are you sitting or lying? What's around you?
You don't need vivid imagery—a sense of being there is enough.
Take a few breaths and let yourself settle into the scene.`,
              },
              {
                title: 'Establish the Warm Light',
                content: `Imagine a warm, sun-like light above you.

Not harsh or hot—gentle and comforting, like late afternoon sun.
Let it hover just above the top of your head.
Feel its warmth even before it touches you.`,
              },
              {
                title: 'Let It Move Downward',
                content: `Slowly let the light descend through your body:

• Top of head → softening the scalp
• Face → relaxing forehead, eyes, jaw
• Throat → easing any tension
• Shoulders → letting them drop
• Chest → warming the heart area
• Belly → softening the center
• Hips and legs → releasing holding
• Feet → grounding into the earth

Move at whatever pace feels right. No rushing.`,
              },
              {
                title: 'Notice Blocked Areas (Without Forcing)',
                content: `You may encounter areas that feel tight, resistant, or "blocked."

This is normal. Don't fight it.
Simply notice: "Something is here."
Let the light pause at that spot, or flow gently around it.
There's no need to fix or release anything.`,
              },
              {
                title: 'Rest in Wholeness',
                content: `Once the light has moved through your whole body, let it surround you.

Rest in your safe place, bathed in this gentle warmth.
Stay here for 30-60 seconds—or longer if you like.
There's nothing to do. Just be.`,
              },
              {
                title: 'Return Gently',
                content: `When ready, let the image fade naturally.

Feel the surface supporting your body.
Wiggle fingers and toes.
Take a breath and open your eyes when ready.
Transition slowly.`,
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
              Common Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-medium text-callout-warning-title">
                  &quot;I can&apos;t visualize well&quot;
                </span>
                <br />
                <span className="text-callout-warning-text">
                  That&apos;s fine. A vague sense or feeling of the place works just as well.
                  Some people &quot;know&quot; rather than &quot;see.&quot;
                </span>
              </li>
              <li>
                <span className="font-medium text-callout-warning-title">
                  &quot;The light gets stuck at my chest&quot;
                </span>
                <br />
                <span className="text-callout-warning-text">
                  Very common. This is often a protective part. Don&apos;t force through it.
                  Let the light pause there, then continue around it.
                </span>
              </li>
              <li>
                <span className="font-medium text-callout-warning-title">
                  &quot;My mind keeps thinking&quot;
                </span>
                <br />
                <span className="text-callout-warning-text">
                  Normal. Gently return to the visualization when you notice.
                  The practice still works even with wandering mind.
                </span>
              </li>
              <li>
                <span className="font-medium text-callout-warning-title">
                  &quot;I fell asleep&quot;
                </span>
                <br />
                <span className="text-callout-warning-text">
                  That&apos;s okay—especially before bed. If you want to stay awake,
                  try sitting up or shortening the practice.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <div className="flex items-start gap-3">
            <Sun className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">Why This Works</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Safe Place Close combines two powerful regulation tools: visualization
                of safety (which activates the parasympathetic nervous system) and
                a top-down body scan (which integrates the session&apos;s work).
                It&apos;s commonly used in somatic therapy to ensure practitioners
                leave sessions in a regulated state.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            This technique came from therapy. For more somatic practices and the full context,
            see <Link href="/my-practice" className="text-primary underline">My Practice</Link>.
          </p>
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
