import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Whole-Body Breathing',
  description:
    'Expand breath awareness to include sensations throughout the entire body. A gateway to deep concentration and absorption states.',
}

export default function WholeBodyBreathingPage() {
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
            <h1 className="text-3xl font-bold">Whole-Body Breathing</h1>
            <Badge variant="warning">intermediate</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Expand awareness of breath sensations throughout the entire body.
            As concentration deepens, the body can feel suffused with the breath,
            leading to profound states of unified attention and absorption.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>20-45 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>Stages 3, 4, 5</span>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">When to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Whole-Body Breathing is ideal when:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your attention at the nostrils or belly is stable</li>
              <li>You want to deepen concentration beyond initial stability</li>
              <li>Regular breath focus feels limited or confining</li>
              <li>You&apos;re interested in exploring absorption (jhana) states</li>
              <li>You want to cultivate full-body sensitivity and relaxation</li>
              <li>You have at least 20-30 minutes for practice</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Establish Breath Focus',
                content: `Begin with standard breath focus at your anchor point (nostrils, chest, or belly).
                Spend 5-10 minutes stabilizing attention here.
                Wait until attention feels relatively steady before expanding.`,
              },
              {
                title: 'Expand to the Torso',
                content: `Gradually widen attention to include the entire torso breathing.
                Feel the chest and belly moving together.
                Notice the expansion and contraction as a unified movement.
                The breath "fills" the whole trunk.`,
              },
              {
                title: 'Include the Whole Body',
                content: `Continue expanding until the entire body is included.
                Feel breath-related sensations in:
                • The back expanding and settling
                • Subtle movement in shoulders and neck
                • Even the limbs may feel involved

                This isn't anatomically literal—you're noticing subtle sensations that correlate with breathing.`,
              },
              {
                title: 'Breathe "Through" the Body',
                content: `With practice, it may feel like breath enters and exits through the whole body.
                As if the skin itself were breathing.
                Energy or aliveness suffuses the body with each breath.

                This is a sign of deepening concentration. Welcome it without grasping.`,
              },
              {
                title: 'Unify Attention',
                content: `As body awareness stabilizes, attention becomes unified.
                You're not scanning different areas—it's one field of breath-body awareness.
                The distinction between "breath" and "body" may blur.
                The whole experience becomes one object.`,
              },
              {
                title: 'Rest in Pleasure',
                content: `Deep concentration often produces pleasant sensations:
                • Warmth or coolness flowing through the body
                • Tingling or vibration
                • A sense of fullness or contentment
                • Physical comfort and ease

                Let these pleasant sensations support concentration—but don't chase them.`,
              },
              {
                title: 'Maintain Stability',
                content: `The challenge now is maintaining this expanded, unified attention.
                If mind contracts back to a small area, gently re-expand.
                If you get lost in thought, return to breath and rebuild.
                Longer sessions help—this practice rewards patience.`,
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
                  mistake: 'Attempting before concentration is stable',
                  fix: 'Master basic breath focus first. This builds on that foundation.',
                },
                {
                  mistake: 'Scanning rather than unified awareness',
                  fix: 'You\'re not moving attention—you\'re expanding it to hold everything at once.',
                },
                {
                  mistake: 'Forcing sensations that aren\'t there',
                  fix: 'Work with what\'s actually present. Subtle is fine.',
                },
                {
                  mistake: 'Grasping at pleasant experiences',
                  fix: 'Pleasure supports concentration but chasing it breaks it.',
                },
                {
                  mistake: 'Sessions too short to develop',
                  fix: 'This practice often takes 20+ minutes to really settle in.',
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
            Signs of Progress
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                name: 'Effortless Attention',
                description: 'Concentration feels natural, not strained. You rest in awareness rather than holding it.',
              },
              {
                name: 'Physical Pleasure (Piti)',
                description: 'Tingling, warmth, waves of pleasant sensation. Traditional sign of deepening concentration.',
              },
              {
                name: 'Contentment (Sukha)',
                description: 'Deep satisfaction, not dependent on anything. A quiet, stable happiness.',
              },
              {
                name: 'Unified Field',
                description: 'The sense of "I" watching "body" may fade. Just unified experience.',
              },
            ].map((sign, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <h4 className="font-semibold">{sign.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {sign.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">Gateway to Absorption</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Whole-body breathing is a traditional method for developing deep
                concentration states (jhanas). As the body becomes suffused with
                pleasant energy and attention becomes unified, the conditions for
                absorption are established. This isn&apos;t the goal of every session,
                but it becomes accessible with patient practice.
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
