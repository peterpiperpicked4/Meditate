'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TimerTab } from '@/components/practice/timer-tab'
import { PlansTab } from '@/components/practice/plans-tab'
import { LogTab } from '@/components/practice/log-tab'
import { JournalTab } from '@/components/practice/journal-tab'

function PracticeContent() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'timer'

  return (
    <Tabs defaultValue={defaultTab} className="mt-6 sm:mt-8">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto gap-1" aria-label="Practice sections">
        <TabsTrigger value="timer" className="py-3 text-sm">Timer</TabsTrigger>
        <TabsTrigger value="plans" className="py-3 text-sm">Plans</TabsTrigger>
        <TabsTrigger value="log" className="py-3 text-sm">Log</TabsTrigger>
        <TabsTrigger value="journal" className="py-3 text-sm">Journal</TabsTrigger>
      </TabsList>
      <TabsContent value="timer" className="mt-6">
        <TimerTab />
      </TabsContent>
      <TabsContent value="plans" className="mt-6">
        <PlansTab />
      </TabsContent>
      <TabsContent value="log" className="mt-6">
        <LogTab />
      </TabsContent>
      <TabsContent value="journal" className="mt-6">
        <JournalTab />
      </TabsContent>
    </Tabs>
  )
}

function TabsSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="grid w-full grid-cols-4 gap-1 rounded-lg bg-muted/50 p-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-9 rounded-md bg-muted/30 animate-pulse" />
        ))}
      </div>
      <div className="h-96 rounded-xl bg-muted/20 animate-pulse" />
    </div>
  )
}

export default function PracticePage() {
  return (
    <div className="container py-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
        <p className="mt-2 text-muted-foreground">
          Timer, plans, session log, and journaling—all in one place.
        </p>

        <Suspense fallback={<TabsSkeleton />}>
          <PracticeContent />
        </Suspense>
      </div>
    </div>
  )
}
