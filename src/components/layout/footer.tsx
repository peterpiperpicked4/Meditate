import Link from 'next/link'
import { Flame } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />

      <div className="container relative mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="max-w-[280px]">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-sm" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-card/80">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>
              <span className="font-display text-lg">
                <span className="text-gradient">Zero</span>
                <span className="mx-1 text-muted-foreground/50">→</span>
                <span className="text-gradient">Deep</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              A practical mindfulness training path.
            </p>
          </div>

          {/* Links - simplified */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <h3 className="font-display text-sm uppercase tracking-widest text-primary/80 mb-3">
                Learn
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/start" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Start Here
                  </Link>
                </li>
                <li>
                  <Link href="/techniques" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Techniques
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm uppercase tracking-widest text-primary/80 mb-3">
                Practice
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/practice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Timer
                  </Link>
                </li>
                <li>
                  <Link href="/practice?tab=journal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Journal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm uppercase tracking-widest text-primary/80 mb-3">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            Educational content, not medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
