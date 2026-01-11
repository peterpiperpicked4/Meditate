import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Open Monitoring',
  description:
    'Rest in choiceless awareness, observing whatever arises without preference. An advanced practice for insight into the nature of experience.',
}

export default function OpenMonitoringPage() {
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
            <h1 className="text-3xl font-bold">Open Monitoring</h1>
            <Badge variant="warning">intermediate</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Also called &quot;choiceless awareness&quot; or &quot;shikantaza.&quot; Rest in open,
            receptive awareness without focusing on any particular object.
            Whatever arises—thought, sensation, sound—is simply witnessed.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>15-45 minutes</span>
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
            <p>Open Monitoring is appropriate when:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You have stable concentration from focused practices</li>
              <li>Breath focus feels constrictive or effortful</li>
              <li>You want to investigate the nature of experience itself</li>
              <li>You&apos;re ready to move from concentration to insight</li>
              <li>The mind is already naturally calm and open</li>
            </ul>
            <p className="mt-4 font-medium text-foreground">
              Important: This practice requires a foundation. Without stable attention,
              &quot;open awareness&quot; becomes &quot;mind wandering with spiritual framing.&quot;
            </p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Establish Stability First',
                content: `Begin with 5-10 minutes of breath focus or body scan.
                The mind needs some settling before opening awareness.
                Don't skip this—it makes the difference between practice and daydreaming.`,
              },
              {
                title: 'Release the Object',
                content: `After the mind is settled, gently release focus on the breath.
                Don't abandon awareness—expand it.
                Let attention open from a narrow beam to a wide floodlight.
                You're not focusing on nothing; you're focusing on everything equally.`,
              },
              {
                title: 'Rest in Awareness Itself',
                content: `Awareness is naturally present, whether focused or open.
                Rest in that awareness without grasping at objects.

                Thoughts arise—you notice, they pass.
                Sounds arise—you notice, they pass.
                Sensations arise—you notice, they pass.

                You don't follow or push away. Just witness.`,
              },
              {
                title: 'No Preference',
                content: `The key quality is equanimity—no preference.
                Pleasant sensation? Just this.
                Unpleasant sensation? Just this.
                Boredom? Just this.

                Every experience is equally valid as an object of awareness.`,
              },
              {
                title: 'Notice the Noticing',
                content: `In this practice, awareness can become aware of itself.
                Notice not just what arises, but that you are aware.
                This is subtle but powerful—the awareness that knows experience.

                Don't strain to find it. It's already here, noticing.`,
              },
              {
                title: 'Return When Lost',
                content: `When you realize you've been lost in thought (and you will):
                1. Notice you were lost
                2. Return to open awareness

                No need to go back to breath unless the mind is very scattered.
                Just reopen the field of awareness.`,
              },
              {
                title: 'Close with Integration',
                content: `As the session ends, notice how the mind feels.
                Is there more space? More clarity?
                Take a few focused breaths to ground before opening eyes.
                Carry the quality of open awareness into activity.`,
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
                  mistake: 'Attempting without stable concentration',
                  fix: 'Build a foundation with focused practices first. Stage 2-3 minimum.',
                },
                {
                  mistake: 'Thinking "open awareness" means doing nothing',
                  fix: 'Awareness is active, alert, and present—just not narrowly focused.',
                },
                {
                  mistake: 'Getting frustrated when thoughts arise',
                  fix: 'Thoughts are supposed to arise. They\'re part of what you\'re observing.',
                },
                {
                  mistake: 'Trying too hard to "be aware"',
                  fix: 'Awareness is already happening. Relax into it rather than creating it.',
                },
                {
                  mistake: 'Confusing dullness with spaciousness',
                  fix: 'True open awareness is clear and alert, not foggy or sleepy.',
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
            Related Practices
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                name: 'Shikantaza (Zen)',
                description: '"Just sitting." The Zen approach to objectless meditation. Very spare instructions—just sit with full presence.',
              },
              {
                name: 'Dzogchen / Mahamudra',
                description: 'Tibetan practices that point directly to the nature of mind. Similar quality of open, non-grasping awareness.',
              },
              {
                name: 'Natural State Practice',
                description: 'Let the mind rest in its natural condition, without modification. What remains when you stop doing anything?',
              },
              {
                name: 'Insight with Open Focus',
                description: 'Use open awareness specifically to investigate impermanence, selflessness, or unsatisfactoriness.',
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
            <Eye className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">The Space Before Thought</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                In open monitoring, you may notice gaps between thoughts—moments
                of pure awareness before the next mental event arises. These gaps
                are always there, but we usually miss them. As practice deepens,
                you become more intimate with this background awareness that
                was always present. This is the beginning of insight.
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
