import { Metadata } from 'next'
import Link from 'next/link'
import { Brain, Heart, Target, Sparkles, BookOpen } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Callout } from '@/components/ui/callout'

export const metadata: Metadata = {
  title: 'Science & Benefits',
  description:
    'What research suggests about meditation. Evidence-based benefits with appropriate caveats and recommended reading.',
}

export default function SciencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Science & Benefits</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            What research suggests about meditation—with appropriate caveats about
            what we know and don&apos;t know.
          </p>
        </div>

        {/* Caveat */}
        <div className="mt-12">
          <Callout variant="warning" title="A note on the research">
            <div className="space-y-2">
              <p>
                Meditation science has improved significantly but still has limitations.
                Many studies have small samples, lack active control groups, or rely on
                self-report. Effect sizes are often modest.
              </p>
              <p>
                The hype around meditation sometimes outpaces the evidence. We present
                benefits with language like &quot;research suggests&quot; rather than making
                definitive claims.
              </p>
            </div>
          </Callout>
        </div>

        {/* Benefits */}
        <div className="mt-12 space-y-8">
          {/* Stress & Emotional Regulation */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Stress & Emotional Regulation</CardTitle>
                  <CardDescription>Managing stress responses and emotions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Research suggests that regular meditation practice may help reduce
                perceived stress and improve emotional regulation. Studies have found:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Reduced cortisol levels in some studies</li>
                <li>Decreased activity in the amygdala (brain&apos;s alarm center) in response to emotional stimuli</li>
                <li>Improved recovery from stress after triggering events</li>
                <li>Reduced symptoms of anxiety and depression in many (not all) populations</li>
              </ul>
              <p className="text-sm">
                <strong>Caveat:</strong> Meditation is not a replacement for mental health treatment.
                For clinical anxiety or depression, seek professional help.
              </p>
            </CardContent>
          </Card>

          {/* Attention & Focus */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Attention & Working Memory</CardTitle>
                  <CardDescription>Cognitive performance and focus</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Studies suggest meditation may improve various aspects of attention:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Sustained attention—maintaining focus over time</li>
                <li>Selective attention—filtering out distractions</li>
                <li>Executive attention—managing conflicting information</li>
                <li>Working memory capacity in some studies</li>
              </ul>
              <p className="text-sm">
                <strong>Caveat:</strong> Effects are often modest and may depend on the type
                of meditation and amount of practice. Don&apos;t expect superhuman focus.
              </p>
            </CardContent>
          </Card>

          {/* Brain Changes */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Brain Plasticity</CardTitle>
                  <CardDescription>Structural and functional changes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Neuroimaging studies have found differences in the brains of experienced
                meditators compared to non-meditators:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Increased gray matter in areas associated with learning, memory, and emotional regulation</li>
                <li>Changes in the prefrontal cortex and anterior cingulate cortex (associated with attention)</li>
                <li>Altered connectivity between brain regions</li>
                <li>Changes in default mode network activity (associated with mind-wandering)</li>
              </ul>
              <p className="text-sm">
                <strong>Caveat:</strong> Many of these studies are cross-sectional (comparing
                meditators to non-meditators) rather than longitudinal (tracking changes over time).
                This makes causation difficult to establish.
              </p>
            </CardContent>
          </Card>

          {/* Compassion & Prosocial */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Compassion & Prosocial Behavior</CardTitle>
                  <CardDescription>Effects on relationships and behavior toward others</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Research on loving-kindness and compassion meditation suggests:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Increased self-reported feelings of compassion and social connection</li>
                <li>More helping behavior in some experimental setups</li>
                <li>Reduced implicit bias in some studies</li>
                <li>Changes in brain areas associated with empathy and emotion</li>
              </ul>
              <p className="text-sm">
                <strong>Caveat:</strong> Translating lab findings to real-world behavior is complex.
                Meditation doesn&apos;t automatically make someone a good person.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What Research Doesn't Support */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">What the Research Doesn&apos;t Support</h2>
          <p className="mt-4 text-muted-foreground">
            Being honest about limitations is important. Research generally does not support:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>Meditation as a cure for serious mental illness</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>Dramatic short-term effects (most benefits require sustained practice)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>Meditation as universally beneficial (some people have adverse effects)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>Claims about supernatural abilities or dramatically altered states</span>
            </li>
          </ul>
        </section>

        {/* Further Reading */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Further Reading</h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="py-4">
                <h4 className="font-semibold">Altered Traits: Science Reveals How Meditation Changes Your Mind, Brain, and Body</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Daniel Goleman & Richard Davidson. A balanced review of meditation research by two leading scientists.
                  Distinguishes hype from evidence.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <h4 className="font-semibold">&quot;Mind the Hype&quot; (Van Dam et al., 2018)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Academic paper reviewing concerns about the quality of meditation research and media overclaiming.
                  Important for understanding limitations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <h4 className="font-semibold">The Mindfulness Controversy (Miguel Farias & Catherine Wikholm)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Critical examination of meditation research and the mindfulness industry.
                  Discusses both benefits and potential downsides.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bottom note */}
        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground">
            The best evidence for meditation&apos;s benefits comes from your own sustained practice.
            Science can point to possibilities, but personal experience reveals what meditation
            does for you specifically. Practice, observe, adjust.
          </p>
        </div>
      </div>
    </div>
  )
}
