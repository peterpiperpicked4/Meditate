'use client'

import Link from 'next/link'
import { ArrowRight, Timer, Flame, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TodaysPractice } from '@/components/home/todays-practice'
import { StatsPreview } from '@/components/home/stats-preview'
import { ScrollReveal } from '@/components/scroll-reveal'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-[min(600px,80vh)] rounded-full bg-gradient-radial from-primary/[0.07] via-primary/[0.02] to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[min(500px,80vw)] h-[min(500px,80vw)] rounded-full bg-gradient-radial from-amber-500/[0.05] to-transparent blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            {/* Title with staggered animation */}
            <div className="animate-fade-in">
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6">
                A Practical Training Path
              </p>
            </div>

            <h1 className="font-display text-display-lg md:text-display-xl animate-fade-in delay-1">
              <span className="text-gradient">Zero</span>
              <span className="text-muted-foreground mx-3 font-light">→</span>
              <span className="text-gradient">Deep</span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto animate-fade-in delay-2">
              Learn mindfulness meditation from your first breath to deep practice.
              No mysticism required—just the patient cultivation of attention.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-3">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg btn-press"
                asChild
              >
                <Link href="/start">
                  Begin the Path
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-primary/30 hover:border-primary/60 hover:bg-primary/5 px-8 py-6 text-lg btn-press"
                asChild
              >
                <Link href="/practice">
                  <Timer className="mr-2 h-5 w-5 text-primary" />
                  Open Timer
                </Link>
              </Button>
            </div>

            {/* Subtle decorative element */}
            <div className="mt-20 animate-fade-in delay-4">
              <div className="divider max-w-xs mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Today's Practice Section */}
      <section className="relative py-16 border-y border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
        <div className="container relative">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="animate-reveal-up delay-1">
              <TodaysPractice />
            </div>
            <div className="animate-reveal-up delay-2">
              <StatsPreview />
            </div>
          </div>
        </div>
      </section>

      {/* The Path Preview */}
      <section className="relative py-24 md:py-32">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-display-sm md:text-display text-balance">
              The Path of Practice
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Six stages from settling the mind to profound stillness.
              Each builds upon the last.
            </p>
          </ScrollReveal>

          {/* Stage Cards - Horizontal scroll on mobile, grid on desktop */}
          <div className="relative">
            {/* Scroll indicator for mobile */}
            <div className="lg:hidden absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" aria-hidden="true" />
            <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
              {[
                {
                  stage: 0,
                  title: 'Consistency',
                  desc: 'Build the habit. Show up daily.',
                  duration: '10 min',
                },
                {
                  stage: 1,
                  title: 'Stability',
                  desc: 'Steady attention on breath.',
                  duration: '15 min',
                },
                {
                  stage: 2,
                  title: 'Clarity',
                  desc: 'Catch wandering faster.',
                  duration: '20 min',
                },
                {
                  stage: 3,
                  title: 'Embodiment',
                  desc: 'Body as anchor. Deeper ground.',
                  duration: '25 min',
                },
                {
                  stage: 4,
                  title: 'Concentration',
                  desc: 'Unified, absorbed attention.',
                  duration: '30+ min',
                },
                {
                  stage: 5,
                  title: 'Integration',
                  desc: 'See clearly. Live wisely.',
                  duration: 'Ongoing',
                },
              ].map((item, index) => (
                <Link
                  key={item.stage}
                  href={`/path#stage-${item.stage}`}
                  className="group flex-shrink-0 w-[280px] lg:w-auto snap-center"
                >
                  <div className="h-full p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card card-hover">
                    {/* Stage number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 text-primary font-mono text-lg group-hover:bg-primary/10 transition-colors">
                        {item.stage}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {item.duration}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="ghost" className="group text-primary" asChild>
              <Link href="/path">
                Explore the full path
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features / Philosophy */}
      <section className="relative py-24 md:py-32 border-t border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-transparent" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text content */}
            <ScrollReveal>
              <h2 className="font-display text-display-sm md:text-display">
                What makes this different
              </h2>
              <div className="mt-8 space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  No mystical claims. No promises of instant enlightenment.
                  Just a clear, structured approach to training attention—based
                  on what actually works.
                </p>
                <p className="leading-relaxed">
                  Whether you&apos;re seeking calm, focus, emotional resilience, or
                  something deeper, the path is the same: patient, consistent
                  practice with honest assessment of where you are.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/start"
                  className="inline-flex items-center text-primary link-underline font-medium"
                >
                  Begin with the basics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Right: Feature highlights */}
            <ScrollReveal delay={0.2}>
              <div className="grid gap-6">
                {[
                  {
                    icon: Compass,
                  title: 'Clear progression',
                  desc: 'Know exactly where you are and what to work on next.',
                },
                {
                  icon: Timer,
                  title: 'Practice tools',
                  desc: 'Timer, tracking, plans, journaling—all local, all private.',
                },
                {
                  icon: Flame,
                  title: 'Honest guidance',
                  desc: 'Troubleshooting real challenges, not spiritual bypassing.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex gap-5 p-5 rounded-lg border border-border/30 bg-card/30 card-hover"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Quote / Philosophy */}
      <section className="relative py-24 md:py-32">
        <div className="container">
          <ScrollReveal>
            <figure className="max-w-3xl mx-auto text-center">
              <blockquote className="font-display text-2xl md:text-3xl italic text-foreground/90 leading-relaxed">
                &ldquo;The practice is simple: when the mind wanders, return.
                Again and again. This patient returning is the whole path.&rdquo;
              </blockquote>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-32 border-t border-border/50">
        <div className="absolute inset-0 bg-gradient-radial from-primary/[0.04] via-transparent to-transparent" />
        <div className="container relative">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-display-sm md:text-display">
              Ready to begin?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your first session can be just ten minutes.
              The Start Here guide will walk you through everything.
            </p>

            <div className="mt-10">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg btn-press"
                asChild
              >
                <Link href="/start">
                  Start Here
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              All practice data stays on your device.{' '}
              <Link href="/disclaimer" className="text-primary link-underline">
                Read our disclaimer
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
