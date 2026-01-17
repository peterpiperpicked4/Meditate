import Link from 'next/link'
import { Home, Compass, Timer, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        {/* Visual element */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-card/80">
            <Compass className="h-10 w-10 text-primary/60" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-display font-bold mb-3">
          Lost in thought?
        </h1>
        <p className="text-muted-foreground mb-8">
          This page doesn&apos;t exist. Like a wandering mind during meditation,
          let&apos;s gently return to where we started.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/practice">
              <Timer className="mr-2 h-4 w-4" />
              Start Practicing
            </Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">Or explore:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/start" className="text-primary hover:underline">
              Start Here
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/techniques" className="text-primary hover:underline">
              Techniques
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/breathe" className="text-primary hover:underline">
              Breathe
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/journey" className="text-primary hover:underline">
              Journey
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
