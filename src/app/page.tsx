'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Target, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-[min(600px,80vh)] rounded-full bg-gradient-radial from-primary/[0.07] via-primary/[0.02] to-transparent blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
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

            <p className="mt-8 text-xl text-muted-foreground font-light leading-relaxed animate-fade-in delay-2">
              Learn mindfulness meditation from your first breath to deep practice.
              No mysticism required.
            </p>

            {/* CTAs */}
            <div className="mt-10 animate-fade-in delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
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
              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-6 text-lg border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                asChild
              >
                <Link href="/breathe?duration=3">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Try 3 Minutes Now
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground animate-fade-in delay-4">
              No signup. No reading. Just breathe.
            </p>
          </div>
        </div>
      </section>

      {/* How it works - 3 bullets */}
      <section className="relative py-20 border-y border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-transparent" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl text-center mb-12">
                How this works
              </h2>
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: 'Start small',
                  desc: 'Begin with 10 minutes. Build from there. Consistency matters more than duration.',
                },
                {
                  icon: Target,
                  title: 'Follow the path',
                  desc: 'Six stages from settling the mind to deep stillness. Know where you are and what to work on.',
                },
                {
                  icon: Flame,
                  title: 'Track honestly',
                  desc: 'Log sessions, troubleshoot challenges, see progress. All data stays on your device.',
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative py-20 md:py-28">
        <div className="container">
          <ScrollReveal>
            <figure className="max-w-2xl mx-auto text-center">
              <blockquote className="font-display text-xl md:text-2xl italic text-foreground/90 leading-relaxed">
                &ldquo;The practice is simple: when the mind wanders, return.
                Again and again. This patient returning is the whole path.&rdquo;
              </blockquote>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 border-t border-border/50">
        <div className="container">
          <ScrollReveal className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl">
              Ready to begin?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Your first session can be just ten minutes.
            </p>

            <div className="mt-8">
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
