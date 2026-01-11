'use client'

import * as React from 'react'
import Link from 'next/link'
import { Timer, Play, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPreferences, getPlans, getSessions } from '@/lib/storage'
import { getTodaysPractice, getPlanProgress } from '@/lib/plan-builder'

export function TodaysPractice() {
  const [mounted, setMounted] = React.useState(false)
  const [todayData, setTodayData] = React.useState<{
    hasActivePlan: boolean
    planName?: string
    todayMinutes?: number
    techniques?: { name: string; minutes: number }[]
    focus?: string
    alreadyPracticedToday: boolean
    todaySessionMinutes: number
  } | null>(null)

  React.useEffect(() => {
    setMounted(true)

    const prefs = getPreferences()
    const plans = getPlans()
    const sessions = getSessions()

    // Check if user practiced today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todaySessions = sessions.filter(s => {
      const sessionDate = new Date(s.startTime)
      sessionDate.setHours(0, 0, 0, 0)
      return sessionDate.getTime() === today.getTime()
    })
    const todaySessionMinutes = Math.round(
      todaySessions.reduce((sum, s) => sum + s.durationSec, 0) / 60
    )

    // Find active plan
    const activePlan = plans.find(p => p.id === prefs.activePlanId)

    if (activePlan && activePlan.weeks && activePlan.weeks.length > 0) {
      const progress = getPlanProgress(activePlan)
      const todayPractice = getTodaysPractice(activePlan, progress.currentWeek)

      setTodayData({
        hasActivePlan: true,
        planName: activePlan.name,
        todayMinutes: todayPractice?.minutes,
        techniques: todayPractice?.techniques,
        focus: todayPractice?.focus,
        alreadyPracticedToday: todaySessions.length > 0,
        todaySessionMinutes,
      })
    } else {
      setTodayData({
        hasActivePlan: false,
        alreadyPracticedToday: todaySessions.length > 0,
        todaySessionMinutes,
      })
    }
  }, [])

  if (!mounted) {
    return (
      <div className="card-contemplative rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Timer className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-xl">Today&apos;s Practice</h3>
        </div>
        <div className="h-24 animate-pulse rounded-lg bg-muted/30" />
      </div>
    )
  }

  if (!todayData) {
    return null
  }

  // No active plan
  if (!todayData.hasActivePlan) {
    return (
      <div className="card-contemplative rounded-xl p-6 hover-glow">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Timer className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display text-xl">Today&apos;s Practice</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          {todayData.alreadyPracticedToday
            ? `You've practiced ${todayData.todaySessionMinutes} minutes today`
            : 'Start a quick session or choose a plan'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1 bg-primary hover:bg-primary/90 btn-press group">
            <Link href="/practice">
              <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Quick 10-min Session
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 border-primary/30 hover:border-primary/50 hover:bg-primary/5 btn-press">
            <Link href="/practice?tab=plans">
              Choose a Plan
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {!todayData.alreadyPracticedToday && (
          <p className="mt-5 text-sm text-muted-foreground">
            New to meditation?{' '}
            <Link href="/start" className="text-primary link-underline">
              Start here
            </Link>
          </p>
        )}
      </div>
    )
  }

  // Has active plan
  return (
    <div className="card-contemplative rounded-xl p-6 hover-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Timer className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-xl">Today&apos;s Practice</h3>
            <p className="text-sm text-muted-foreground">{todayData.planName}</p>
          </div>
        </div>
        {todayData.alreadyPracticedToday && (
          <div className="flex items-center gap-1.5 text-sage">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{todayData.todaySessionMinutes} min done</span>
          </div>
        )}
      </div>

      {todayData.todayMinutes && (
        <div className="mb-6">
          <p className="font-display text-3xl text-gradient">{todayData.todayMinutes} minutes</p>
          {todayData.techniques && todayData.techniques.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {todayData.techniques.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary/90"
                >
                  {t.name} ({t.minutes} min)
                </span>
              ))}
            </div>
          )}
          {todayData.focus && (
            <p className="mt-3 text-sm text-muted-foreground italic">
              Focus: {todayData.focus}
            </p>
          )}
        </div>
      )}
      <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 btn-press group">
        <Link href="/practice">
          <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {todayData.alreadyPracticedToday ? 'Practice More' : 'Start Session'}
        </Link>
      </Button>
    </div>
  )
}
