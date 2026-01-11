'use client'

import * as React from 'react'
import Link from 'next/link'
import { Flame, Clock, Calendar, TrendingUp, ArrowRight } from 'lucide-react'
import { getStats } from '@/lib/storage'
import { formatMinutes } from '@/lib/utils'

export function StatsPreview() {
  const [mounted, setMounted] = React.useState(false)
  const [stats, setStats] = React.useState<{
    currentStreak: number
    totalMinutes: number
    thisWeekMinutes: number
    totalSessions: number
  } | null>(null)

  React.useEffect(() => {
    setMounted(true)
    const data = getStats()
    setStats({
      currentStreak: data.currentStreak,
      totalMinutes: data.totalMinutes,
      thisWeekMinutes: data.thisWeekMinutes,
      totalSessions: data.totalSessions,
    })
  }, [])

  if (!mounted) {
    return (
      <div className="card-contemplative rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-xl">Your Progress</h3>
        </div>
        <div className="h-24 animate-pulse rounded-lg bg-muted/30" />
      </div>
    )
  }

  if (!stats || stats.totalSessions === 0) {
    return (
      <div className="card-contemplative rounded-xl p-6 hover-glow">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-xl">Your Progress</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          Complete your first session to start tracking
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                <Flame className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <p className="font-display text-2xl">0</p>
            <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <p className="font-display text-2xl">0</p>
            <p className="text-xs text-muted-foreground mt-1">Total Minutes</p>
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          <Link href="/start" className="text-primary link-underline">
            Start your first session
          </Link>{' '}
          to begin tracking
        </p>
      </div>
    )
  }

  return (
    <div className="card-contemplative rounded-xl p-6 hover-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-xl">Your Progress</h3>
        </div>
        <Link
          href="/practice?tab=log"
          className="text-sm text-primary link-underline inline-flex items-center gap-1"
        >
          View log
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center transition-colors hover:border-primary/20 hover:bg-card/50">
          <div className="flex justify-center mb-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
              stats.currentStreak > 0
                ? 'bg-ember/20'
                : 'bg-muted/50'
            }`}>
              <Flame className={`h-4 w-4 ${
                stats.currentStreak > 0
                  ? 'text-ember'
                  : 'text-muted-foreground'
              }`} />
            </div>
          </div>
          <p className="font-display text-2xl">{stats.currentStreak}</p>
          <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
        </div>

        <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center transition-colors hover:border-primary/20 hover:bg-card/50">
          <div className="flex justify-center mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="font-display text-2xl">{formatMinutes(stats.totalMinutes)}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Time</p>
        </div>

        <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center transition-colors hover:border-primary/20 hover:bg-card/50">
          <div className="flex justify-center mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="font-display text-2xl">{stats.thisWeekMinutes}</p>
          <p className="text-xs text-muted-foreground mt-1">This Week (min)</p>
        </div>

        <div className="rounded-lg border border-border/50 bg-card/30 p-4 text-center transition-colors hover:border-primary/20 hover:bg-card/50">
          <div className="flex justify-center mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="font-display text-2xl">{stats.totalSessions}</p>
          <p className="text-xs text-muted-foreground mt-1">Sessions</p>
        </div>
      </div>
    </div>
  )
}
