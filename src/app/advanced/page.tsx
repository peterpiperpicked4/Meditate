import { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, Eye, Mountain, Sun } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Callout } from '@/components/ui/callout'

export const metadata: Metadata = {
  title: 'Advanced Practice',
  description:
    'Deep concentration, insight practices, and retreat guidance. For practitioners with established foundations.',
}

export default function AdvancedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <Badge className="mb-3">Stages 4-5+</Badge>
          <h1 className="text-4xl font-bold tracking-tight">Advanced Practice</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            For practitioners with established foundations. Deep concentration, insight
            territory, and retreat guidance—approached with care and humility.
          </p>
        </div>

        {/* Prerequisites */}
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Before engaging with advanced practices, ensure you have:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Several months of consistent daily practice (20+ min)</li>
              <li>Stable attention—can follow breath for minutes without major wandering</li>
              <li>Experience with body-based practices (body scan, whole-body breathing)</li>
              <li>Understanding that chasing experiences is counterproductive</li>
              <li>Ideally, some contact with a qualified teacher</li>
            </ul>
          </CardContent>
        </Card>

        {/* Deep Concentration */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Deep Concentration</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Access Concentration</h3>
              <p className="mt-2 text-muted-foreground">
                Access concentration is a stable, unified state where attention rests
                continuously on the object without significant wandering. The mind feels
                gathered, not scattered. There&apos;s often a pleasant quality—a sense of
                satisfaction or ease that arises from concentrated attention itself.
              </p>
              <p className="mt-2 text-muted-foreground">
                This isn&apos;t exotic—it&apos;s what happens when attention stabilizes deeply.
                You may notice:
              </p>
              <ul className="mt-2 ml-6 list-disc text-muted-foreground space-y-1">
                <li>The breath becomes subtle, almost imperceptible</li>
                <li>Bodily sensations merge into a unified field</li>
                <li>Time perception changes</li>
                <li>A pleasant, stable quality pervades the experience</li>
                <li>Less effort is needed to stay present</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Whole-Body Unification</h3>
              <p className="mt-2 text-muted-foreground">
                In whole-body breathing, attention expands to include breath sensations
                throughout the body—not just at one anchor point. With practice, the sense
                of the body breathing as a whole unit emerges. This unified field is a
                natural gateway to deeper concentration.
              </p>
              <p className="mt-2 text-muted-foreground">
                Practice this by first stabilizing on breath, then gently expanding
                awareness to include the whole body. Don&apos;t force—let unification happen
                naturally as concentration deepens.
              </p>
            </div>

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">A Note on Jhanas</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Some traditions describe deeper absorption states called jhanas—stable,
                  blissful states of profound concentration. Different teachers describe
                  these differently, and there&apos;s debate about what exactly qualifies.
                </p>
                <p>
                  You don&apos;t need to pursue jhanas explicitly. They may or may not arise
                  in your practice. What matters is developing stable, unified attention
                  and using it for insight.
                </p>
                <p>
                  If you&apos;re interested in this territory, work with a teacher who has
                  personal experience. Book recommendations in{' '}
                  <Link href="/resources" className="text-primary underline">
                    Resources
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Insight Practices */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Insight Practices</h2>
          </div>

          <p className="text-muted-foreground">
            Insight practices use concentrated attention to investigate the nature of
            experience directly. This is less about achieving specific states and more
            about seeing clearly.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Observing Impermanence</h3>
              <p className="mt-2 text-muted-foreground">
                With stable attention, notice how all experience constantly changes. Sensations
                arise and pass. Thoughts appear and disappear. Even the breath is never the same
                twice. This isn&apos;t philosophy—it&apos;s direct observation.
              </p>
              <p className="mt-2 text-muted-foreground">
                Practice: During open monitoring, note the arising and passing of every
                sensation, sound, or thought. Don&apos;t think about impermanence—see it directly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Noticing Reactivity</h3>
              <p className="mt-2 text-muted-foreground">
                Observe the push-pull of the mind—how it reaches toward pleasant experiences
                and pushes away unpleasant ones. This reactivity happens constantly and
                usually automatically. Seeing it clearly reduces its grip.
              </p>
              <p className="mt-2 text-muted-foreground">
                Practice: When a sensation or thought arises, notice any subtle liking or
                disliking that follows. Don&apos;t suppress it—just see it.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Investigating the Sense of Self</h3>
              <p className="mt-2 text-muted-foreground">
                The sense of being a solid, continuous self is actually constructed moment by
                moment. With careful attention, you can observe this construction process—how
                thoughts get labeled as &quot;mine,&quot; how a center of experience seems to form.
              </p>
              <p className="mt-2 text-muted-foreground">
                This is subtle territory. Approach with patience and preferably with guidance.
                The point isn&apos;t to destroy the self but to see its constructed nature, which
                naturally reduces suffering.
              </p>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sun className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Daily Life Integration</h2>
          </div>

          <p className="text-muted-foreground">
            Advanced practice isn&apos;t just about what happens on the cushion—it&apos;s about
            how mindfulness infuses daily life.
          </p>

          <div className="mt-6 space-y-4">
            {[
              {
                title: 'Mindful transitions',
                description: 'Bring awareness to the moments between activities—standing up, walking to the car, waiting in line.',
              },
              {
                title: 'Emotional awareness',
                description: 'Notice emotions as they arise in real situations. See the bodily sensations, the thoughts, the impulses.',
              },
              {
                title: 'Pause before reacting',
                description: 'In challenging moments, take one conscious breath before responding.',
              },
              {
                title: 'Ordinary activities',
                description: 'Eating, showering, walking—these become opportunities for continuous practice.',
              },
              {
                title: 'Relationship as practice',
                description: 'Interactions with others reveal patterns of reactivity and offer chances to respond with awareness.',
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Retreats */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Mountain className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Retreats</h2>
          </div>

          <p className="text-muted-foreground">
            Retreats offer intensive practice that can deepen meditation significantly.
            They range from day-long events to multi-week residential immersions.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">What Happens on Retreat</h3>
              <ul className="mt-2 ml-6 list-disc text-muted-foreground space-y-1">
                <li>Multiple meditation sessions throughout the day (typically 6-10 hours total)</li>
                <li>Noble silence—no speaking, often no eye contact</li>
                <li>Simple meals, basic accommodations</li>
                <li>Removal of devices and distractions</li>
                <li>Daily interviews with teachers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Preparing for Your First Retreat</h3>
              <ul className="mt-2 ml-6 list-disc text-muted-foreground space-y-1">
                <li>Build up to 30-45 minute daily sits beforehand</li>
                <li>Start with a shorter retreat (1-3 days) before attempting longer ones</li>
                <li>Research the teaching lineage and style</li>
                <li>Inform loved ones of the no-contact policy</li>
                <li>Prepare for discomfort—physical and mental—it&apos;s part of the process</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Re-entry</h3>
              <p className="mt-2 text-muted-foreground">
                Returning to daily life after retreat can be jarring. Plan a gentle transition:
                don&apos;t schedule major events immediately after. Maintain increased practice
                time for a few days. Journal about your experience before it fades.
              </p>
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="mt-16">
          <Callout variant="warning" title="Safety in Advanced Practice">
            <div className="space-y-3">
              <p>
                <strong className="text-callout-warning-title">Work with a teacher.</strong>{' '}
                Advanced territory benefits from guidance. A teacher can help navigate unusual
                experiences and prevent common misinterpretations.
              </p>
              <p>
                <strong className="text-callout-warning-title">Don&apos;t chase states.</strong>{' '}
                Craving for peak experiences is itself an obstacle. Let states arise and pass
                naturally.
              </p>
              <p>
                <strong className="text-callout-warning-title">Stay grounded.</strong>{' '}
                If practice feels destabilizing, return to basic techniques. More mundane
                practices (body scan, walking meditation) can help re-ground.
              </p>
              <p>
                <strong className="text-callout-warning-title">Know when to seek help.</strong>{' '}
                Persistent distress, dissociation, or worsening mental health require
                professional support. Meditation is not a substitute for mental health care.
              </p>
              <p>
                See our <Link href="/disclaimer" className="underline text-callout-warning-title">
                  full disclaimer
                </Link>.
              </p>
            </div>
          </Callout>
        </section>
      </div>
    </div>
  )
}
