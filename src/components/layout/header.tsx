'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Timer, Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Start Here', href: '/start' },
  { name: 'Practice', href: '/practice' },
  { name: 'Breathe', href: '/breathe' },
  { name: 'Techniques', href: '/techniques' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled
          ? 'border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto flex h-18 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative flex h-9 w-9 items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-sm transition-all duration-300 group-hover:blur-md group-hover:from-primary/60 group-hover:to-accent/50" />
            {/* Inner circle */}
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-card/80 transition-all duration-300 group-hover:border-primary/60">
              <Flame className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          <span className="hidden font-display text-xl font-medium tracking-tight sm:inline-block">
            <span className="text-gradient">Zero</span>
            <span className="mx-1.5 text-muted-foreground/50">→</span>
            <span className="text-gradient">Deep</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'relative rounded-md px-3 py-2 text-sm transition-all duration-300',
                pathname === item.href || pathname.startsWith(item.href + '/')
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.name}
              {(pathname === item.href || pathname.startsWith(item.href + '/')) && (
                <span className="absolute bottom-0 left-1/2 h-px w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="group hidden bg-primary/90 hover:bg-primary text-primary-foreground sm:flex btn-press"
            asChild
          >
            <Link href="/practice">
              <Timer className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Open Timer
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:text-primary hover:bg-primary/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-out-expo',
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="border-t border-border/50 bg-card/50 backdrop-blur-xl">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block rounded-lg px-4 py-3.5 min-h-[44px] text-base transition-all duration-300',
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-press"
                asChild
              >
                <Link href="/practice" onClick={() => setMobileMenuOpen(false)}>
                  <Timer className="mr-2 h-4 w-4" />
                  Open Timer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
