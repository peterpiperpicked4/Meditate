import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Zero → Deep: A practical mindfulness training path built by someone learning alongside you.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">About This Project</h1>

        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>
            <strong className="text-foreground">Zero → Deep</strong> is a practical
            mindfulness training resource built by someone learning alongside you—not
            a guru, not a monk, just a person who started meditating and found it
            genuinely useful.
          </p>

          <p>
            The creator has about 4-5 months of near-daily practice, sitting 10-15
            minutes most mornings. That&apos;s not a lot by some standards, but it&apos;s
            enough to know what beginning feels like—and to want to help others start
            without the confusion and misinformation that often surrounds meditation.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Why This Exists</h2>

          <p>
            There&apos;s a lot of meditation content out there. Some of it is excellent.
            But much of it either:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Over-promises:</strong> Suggesting
              meditation will solve all your problems, bring instant peace, or lead to
              enlightenment next Thursday.
            </li>
            <li>
              <strong className="text-foreground">Under-explains:</strong> Telling you
              to &quot;just observe the breath&quot; without addressing the inevitable
              challenges.
            </li>
            <li>
              <strong className="text-foreground">Requires belief:</strong> Wrapping
              practical skills in spiritual frameworks that may not resonate with everyone.
            </li>
            <li>
              <strong className="text-foreground">Lacks structure:</strong> Offering
              techniques without a clear progression or way to measure development.
            </li>
          </ul>

          <p>
            This site attempts to be different: practical, structured, honest about
            limitations, and free of required beliefs. The techniques work regardless
            of what you think about consciousness or the nature of reality.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">The &quot;Learn in Public&quot; Approach</h2>

          <p>
            Rather than pretending to be an expert, this project embraces learning in
            public. The <Link href="/journey" className="text-primary underline">Journey</Link> section
            documents ongoing practice—what works, what doesn&apos;t, what questions
            remain.
          </p>

          <p>
            This has tradeoffs. You won&apos;t find decades of wisdom here. But you will
            find honest reflection from someone close enough to the beginning to remember
            what it&apos;s like—and committed enough to keep going.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">What This Site Is Not</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Not medical advice.</strong> If you have
              mental health concerns, see a professional.
            </li>
            <li>
              <strong className="text-foreground">Not a replacement for teachers.</strong> For
              advanced practice, work with someone experienced.
            </li>
            <li>
              <strong className="text-foreground">Not the final word.</strong> This is one
              approach among many. If it helps, use it. If not, find what works for you.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Technology</h2>

          <p>
            The site stores all your practice data locally on your device—no accounts,
            no cloud sync, no data collection. You can export your data as JSON or CSV
            anytime.
          </p>

          <p>
            Built with Next.js, TypeScript, and Tailwind CSS. Open to feedback and
            contributions.
          </p>

          <div className="pt-6 flex gap-4">
            <Button asChild>
              <Link href="/start">
                Start Practicing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/disclaimer">Read Disclaimer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
