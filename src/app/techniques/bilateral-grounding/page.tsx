import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, Play, Hand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Bilateral Grounding (Butterfly Tap)',
  description:
    'A simple left-right tapping technique for grounding and reset. Used in therapy for regulation, adapted here as a meditation support tool.',
}

export default function BilateralGroundingPage() {
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
            <h1 className="text-3xl font-bold">Bilateral Grounding</h1>
            <Badge variant="success">beginner</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            A simple left-right tapping technique for quick grounding and nervous system reset.
            Takes 60-120 seconds and requires no equipment.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>1-3 minutes</span>
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
            <p>Bilateral grounding is excellent for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Quick reset when feeling anxious or overwhelmed</li>
              <li>Coming back from dissociation or spacing out</li>
              <li>Before meditation to settle the nervous system</li>
              <li>During the day as a micro-practice (at your desk, in the car)</li>
              <li>When you need grounding but don&apos;t have time for a full session</li>
              <li>After difficult conversations or stressful events</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">The Methods</h2>
          <p className="mt-3 text-muted-foreground">
            Choose whichever feels most comfortable. All three achieve the same effect.
          </p>

          <div className="mt-6 space-y-4">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-primary">Thigh Taps</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sit comfortably. Tap your left thigh with your left hand, then right thigh
                  with your right hand. Alternate: left → right → left → right.
                  Keep it steady and rhythmic, not intense.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-primary">Butterfly Tap</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cross your arms over your chest, hands resting on opposite shoulders.
                  Tap left shoulder, then right shoulder, alternating. This is more discreet
                  and can be done almost anywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-primary">Foot Taps</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tap your left foot on the floor, then right foot, alternating.
                  Good for coming back from spacing out—the grounding through feet
                  is particularly effective for dissociation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">Step-by-Step</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Choose Your Method',
                content: `Pick thigh taps, butterfly, or foot taps—whichever feels right.
                You can switch methods if one isn't working.`,
              },
              {
                title: 'Do 20-40 Taps',
                content: `Alternate left-right at a steady, comfortable pace.
                Not too fast, not too slow. Think of a relaxed walking rhythm.
                You don't need to count exactly—roughly 20-40 taps is fine.`,
              },
              {
                title: 'Pause and Breathe',
                content: `After the tapping, stop and take one slow breath.
                Inhale through nose, exhale through mouth (longer exhale if possible).
                Let your hands rest.`,
              },
              {
                title: 'Check In',
                content: `Ask yourself one question: "What do I notice in my body right now?"
                Don't analyze. Just notice. There's no right answer.
                You might notice nothing. You might notice something shifted. Both are fine.`,
              },
              {
                title: 'Repeat If Needed',
                content: `You can do 1-3 rounds total.
                If you still feel activated, do another round of taps.
                If you start spacing out, switch to foot taps to come back.`,
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
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-medium text-callout-warning-title">
                  There&apos;s no &quot;perfect&quot; response
                </span>
                <br />
                <span className="text-callout-warning-text">
                  Sometimes you notice a shift, sometimes nothing. Both are normal.
                  The practice works even when you don&apos;t feel it.
                </span>
              </li>
              <li>
                <span className="font-medium text-callout-warning-title">
                  Stay with sensation, not story
                </span>
                <br />
                <span className="text-callout-warning-text">
                  If memories or thoughts arise, notice them but don&apos;t follow.
                  Return attention to the physical sensation of tapping.
                </span>
              </li>
              <li>
                <span className="font-medium text-callout-warning-title">
                  This is not EMDR therapy
                </span>
                <br />
                <span className="text-callout-warning-text">
                  This is a simplified grounding tool, not trauma processing.
                  For deeper work, find a trained EMDR therapist.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <div className="flex items-start gap-3">
            <Hand className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">Why This Works</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bilateral stimulation (left-right alternating input) appears to help
                regulate the nervous system. It&apos;s used in EMDR therapy for trauma
                processing, but works as a standalone grounding tool too. The mechanism
                isn&apos;t fully understood, but the effect is real: a quick reset when
                you&apos;re activated.
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
