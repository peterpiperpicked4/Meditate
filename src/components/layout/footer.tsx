import Link from 'next/link'
import { Flame, Rss } from 'lucide-react'

const footerLinks = {
  learn: [
    { name: 'Start Here', href: '/start' },
    { name: 'The Path', href: '/path' },
    { name: 'Techniques', href: '/techniques' },
    { name: 'Troubleshooting', href: '/troubleshooting' },
  ],
  practice: [
    { name: 'Timer', href: '/practice' },
    { name: 'Plans', href: '/practice?tab=plans' },
    { name: 'Log', href: '/practice?tab=log' },
    { name: 'Journal', href: '/practice?tab=journal' },
  ],
  explore: [
    { name: 'Advanced', href: '/advanced' },
    { name: 'Science & Benefits', href: '/science' },
    { name: 'Resources', href: '/resources' },
    { name: 'Journey Blog', href: '/journey' },
  ],
  about: [
    { name: 'About', href: '/about' },
    { name: 'My Practice', href: '/my-practice' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-gradient-radial from-primary/[0.03] to-transparent blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 py-16">
        <div className="grid gap-8 grid-cols-2 sm:gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
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
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-[240px]">
              A practical mindfulness training path. Learn meditation from your
              first sit to deep practice.
            </p>
            <div className="mt-5">
              <Link
                href="/journey/feed.xml"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="h-4 w-4" />
                <span>Subscribe to updates</span>
              </Link>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-primary/80 mb-4">
              Learn
            </h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-primary/80 mb-4">
              Practice
            </h3>
            <ul className="space-y-3">
              {footerLinks.practice.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-primary/80 mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-primary/80 mb-4">
              About
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 mb-8">
          <div className="divider" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            This site is educational, not medical advice.{' '}
            <Link href="/disclaimer" className="text-primary link-underline">
              Read disclaimer
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Made with patience for mindful humans
          </p>
        </div>
      </div>
    </footer>
  )
}
