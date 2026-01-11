import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Breath Focus',
  description:
    'The foundational meditation technique. Learn to anchor attention on breathing sensations for stability and calm.',
}

export default function BreathFocusPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/techniques"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          All Techniques
        </Link>

        {/* Header */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Breath Focus</h1>
            <Badge variant="success">beginner</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            The foundational practice. Anchor attention on the sensations of
            breathing to develop stable, clear attention.
          </p>
        </div>

        {/* Quick info */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>5-30 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>Stages 0, 1, 2</span>
          </div>
        </div>

        {/* When to use */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">When to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Breath Focus is the core technique for most meditators. Use it:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>As your primary practice in Stages 0-2</li>
              <li>To develop and maintain attention stability</li>
              <li>At the beginning of sessions to settle the mind</li>
              <li>Whenever you feel scattered or anxious</li>
              <li>As a reliable fallback when other techniques aren&apos;t working</li>
            </ul>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Find Your Posture',
                content: `Sit in a stable, upright position. Chair, cushion, or bench—all work.
                The key is: spine naturally tall, body relaxed but alert.
                Let your hands rest on your thighs or in your lap.
                Close your eyes or soften your gaze downward.`,
              },
              {
                title: 'Take a Few Settling Breaths',
                content: `Before focusing, take 3-5 deeper breaths to transition from activity to stillness.
                Let each exhale release any obvious tension.
                Then let your breathing return to its natural rhythm.`,
              },
              {
                title: 'Choose Your Anchor Point',
                content: `Find where breath sensations are clearest for you:
                - **Nostrils**: The subtle cool/warm sensation of air entering and leaving
                - **Chest**: The rise and fall of your ribcage
                - **Belly**: The gentle expansion and contraction

                Pick one location and stay with it for the session.`,
              },
              {
                title: 'Rest Attention on the Breath',
                content: `Let your attention settle on the sensations at your chosen anchor point.
                Don't control the breath—observe it as it naturally occurs.
                Notice the beginning, middle, and end of each in-breath.
                Notice the beginning, middle, and end of each out-breath.
                Notice the brief pause between breaths.`,
              },
              {
                title: 'When Mind Wanders, Return',
                content: `Your mind will wander—this is guaranteed and normal.
                When you notice you've drifted:
                1. **Notice**: "Oh, I was thinking."
                2. **Let go**: Don't finish or analyze the thought.
                3. **Return**: Gently guide attention back to breath.

                Each return is a repetition—it strengthens attention.`,
              },
              {
                title: 'Maintain Continuity',
                content: `The goal is continuous attention on breath, broken by wandering, then resumed.
                Over time, the periods of continuity lengthen.
                Don't strain—use gentle, interested attention.
                Think of it as "staying curious about breath" rather than "forcing focus."`,
              },
              {
                title: 'Close the Session',
                content: `When your timer ends:
                - Take a few deeper breaths
                - Notice how your body and mind feel now vs. when you started
                - Open your eyes slowly
                - Pause briefly before standing up`,
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

        {/* Common Mistakes */}
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
                  mistake: 'Controlling the breath',
                  fix: 'Let it breathe itself. You\'re observing, not managing.',
                },
                {
                  mistake: 'Thinking about the breath instead of feeling it',
                  fix: 'Drop into direct sensation. "What does this breath actually feel like?"',
                },
                {
                  mistake: 'Straining or forcing attention',
                  fix: 'Use gentle, curious attention. Tension blocks concentration.',
                },
                {
                  mistake: 'Getting frustrated when mind wanders',
                  fix: 'Wandering is the practice. Each return is success.',
                },
                {
                  mistake: 'Switching anchor points mid-session',
                  fix: 'Pick one location and stick with it. Consistency helps.',
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

        {/* Variations / Upgrades */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" aria-hidden="true" />
            Upgrade Variations
          </h2>
          <p className="mt-2 text-muted-foreground">
            As your practice matures, try these variations:
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                name: 'Counting Breaths',
                description: 'Count each exhale from 1-10, then restart. If you lose count, start over. Helpful for beginners to track attention.',
                when: 'Stage 0-1, or when very scattered',
              },
              {
                name: 'Continuous Attention',
                description: 'Follow every detail of the breath—no counting. Feel the entire cycle without gaps.',
                when: 'Stage 1-2, when counting feels limiting',
              },
              {
                name: 'Connecting',
                description: 'Notice the connection between breaths—how one flows into the next without hard breaks.',
                when: 'Stage 2, when attention is more stable',
              },
              {
                name: 'Whole-Body Breathing',
                description: 'Expand breath awareness to include sensations throughout the body. Gateway to deep concentration.',
                when: 'Stage 3+, after solid stability',
              },
            ].map((variation, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <h4 className="font-semibold">{variation.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {variation.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    When: {variation.when}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Session Lengths */}
        <div className="mt-12">
          <h2 className="text-xl font-bold">Recommended Session Lengths</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { level: 'Beginner', duration: '5-10 min', note: 'Build habit first' },
              { level: 'Developing', duration: '15-20 min', note: 'Extend as stable' },
              { level: 'Established', duration: '25-45 min', note: 'Depth develops here' },
            ].map((item) => (
              <Card key={item.level}>
                <CardContent className="py-4 text-center">
                  <p className="text-2xl font-bold">{item.duration}</p>
                  <p className="font-medium">{item.level}</p>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
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
