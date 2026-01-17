'use client'

import * as React from 'react'
import { Download, Trash2, Flame, Clock, Calendar, TrendingUp, ArrowUpRight, FileDown, Award, Star, Sunrise, Moon, Zap, Heart, Mountain, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getSessions, deleteSession, getStats, exportData, exportSessionsCSV, importData, type Session, type ExportData } from '@/lib/storage'
import { formatMinutes, formatDate } from '@/lib/utils'
import { PracticeHeatmap } from './practice-heatmap'
import { cn } from '@/lib/utils'

// Achievement definitions - meaningful milestones that feel earned
interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  check: (stats: Stats, sessions: Session[]) => boolean
  unlockText: string
}

interface Stats {
  totalSessions: number
  totalMinutes: number
  currentStreak: number
  longestStreak: number
  thisWeekMinutes: number
  thisMonthMinutes: number
  averageSessionLength: number
  favoriteTime: string | null
  favoritetechnique: string | null
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-sit',
    name: 'First Sit',
    description: 'You showed up. That\'s the hardest part.',
    icon: Star,
    check: (stats) => stats.totalSessions >= 1,
    unlockText: 'Complete your first session',
  },
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Five sessions in. The habit is forming.',
    icon: Zap,
    check: (stats) => stats.totalSessions >= 5,
    unlockText: 'Complete 5 sessions',
  },
  {
    id: 'one-week',
    name: 'One Week',
    description: '7 days in a row. You\'re building something real.',
    icon: Flame,
    check: (stats) => stats.longestStreak >= 7,
    unlockText: 'Achieve a 7-day streak',
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: '100 minutes of stillness. Your mind thanks you.',
    icon: Clock,
    check: (stats) => stats.totalMinutes >= 100,
    unlockText: 'Accumulate 100 minutes',
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: '10 hours of practice. This is dedication.',
    icon: Heart,
    check: (stats) => stats.totalMinutes >= 600,
    unlockText: 'Accumulate 10 hours',
  },
  {
    id: 'long-sit',
    name: 'The Long Sit',
    description: 'A 20+ minute session. Deep practice unlocked.',
    icon: Mountain,
    check: (_, sessions) => sessions.some(s => s.durationSec >= 1200),
    unlockText: 'Complete a 20+ minute session',
  },
  {
    id: 'monthly-streak',
    name: 'The Daily Practice',
    description: '30 days straight. You\'re not trying anymore—you\'re practicing.',
    icon: Trophy,
    check: (stats) => stats.longestStreak >= 30,
    unlockText: 'Achieve a 30-day streak',
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Five morning sessions before 9am.',
    icon: Sunrise,
    check: (_, sessions) => {
      const mornings = sessions.filter(s => {
        const hour = new Date(s.startTime).getHours()
        return hour >= 5 && hour < 9
      })
      return mornings.length >= 5
    },
    unlockText: 'Complete 5 sessions before 9am',
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Five evening sessions after 8pm.',
    icon: Moon,
    check: (_, sessions) => {
      const evenings = sessions.filter(s => {
        const hour = new Date(s.startTime).getHours()
        return hour >= 20 || hour < 5
      })
      return evenings.length >= 5
    },
    unlockText: 'Complete 5 sessions after 8pm',
  },
]

export function LogTab() {
  const [sessions, setSessions] = React.useState<Session[]>([])
  const [stats, setStats] = React.useState({
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    thisWeekMinutes: 0,
    thisMonthMinutes: 0,
    averageSessionLength: 0,
    favoriteTime: null as string | null,
    favoritetechnique: null as string | null,
  })
  const [showExportDialog, setShowExportDialog] = React.useState(false)
  const [importMessage, setImportMessage] = React.useState('')

  const loadData = React.useCallback(() => {
    const allSessions = getSessions()
    // Sort by most recent first
    allSessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    setSessions(allSessions)
    setStats(getStats())
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const handleDeleteSession = (id: string) => {
    deleteSession(id)
    loadData()
  }

  const handleExportJSON = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meditation-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    const csv = exportSessionsCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meditation-sessions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ExportData
        const result = importData(data)
        setImportMessage(result.message)
        if (result.success) {
          loadData()
        }
      } catch {
        setImportMessage('Failed to parse file')
      }
    }
    reader.readAsText(file)
  }

  // Group sessions by date
  const sessionsByDate = React.useMemo(() => {
    const groups: Record<string, Session[]> = {}
    sessions.forEach((session) => {
      const date = formatDate(session.startTime)
      if (!groups[date]) groups[date] = []
      groups[date].push(session)
    })
    return groups
  }, [sessions])

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-contemplative rounded-xl p-5 hover-glow">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${
              stats.currentStreak > 0 ? 'bg-ember/20' : 'bg-muted/50'
            }`}>
              <Flame className={`h-5 w-5 ${stats.currentStreak > 0 ? 'text-ember' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="font-display text-2xl">{stats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day streak</p>
            </div>
          </div>
        </div>
        <div className="card-contemplative rounded-xl p-5 hover-glow">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-display text-2xl">{formatMinutes(stats.totalMinutes)}</p>
              <p className="text-xs text-muted-foreground">Total time</p>
            </div>
          </div>
        </div>
        <div className="card-contemplative rounded-xl p-5 hover-glow">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sage/20">
              <TrendingUp className="h-5 w-5 text-sage" />
            </div>
            <div>
              <p className="font-display text-2xl">{stats.thisWeekMinutes}</p>
              <p className="text-xs text-muted-foreground">This week (min)</p>
            </div>
          </div>
        </div>
        <div className="card-contemplative rounded-xl p-5 hover-glow">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-display text-2xl">{stats.totalSessions}</p>
              <p className="text-xs text-muted-foreground">Total sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      {stats.totalSessions > 0 && (
        <div className="card-contemplative rounded-xl p-5">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Longest streak</p>
              <p className="font-display text-lg mt-1">{stats.longestStreak} days</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Average session</p>
              <p className="font-display text-lg mt-1">{stats.averageSessionLength} min</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Favorite time</p>
              <p className="font-display text-lg mt-1">{stats.favoriteTime || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Most used technique</p>
              <p className="font-display text-lg mt-1">{stats.favoritetechnique || '—'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Practice Heatmap */}
      <PracticeHeatmap sessions={sessions} />

      {/* Achievements */}
      <section aria-labelledby="achievements-heading" className="card-contemplative rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h3 id="achievements-heading" className="font-display text-base">Milestones</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = achievement.check(stats, sessions)
            const IconComponent = achievement.icon
            return (
              <div
                key={achievement.id}
                className={cn(
                  "relative rounded-lg border p-4 transition-all",
                  isUnlocked
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/30 bg-muted/20 opacity-60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                    isUnlocked ? "bg-primary/20" : "bg-muted/50"
                  )}>
                    <IconComponent className={cn(
                      "h-5 w-5",
                      isUnlocked ? "text-primary" : "text-muted-foreground"
                    )} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className={cn(
                      "font-medium text-sm",
                      isUnlocked ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {achievement.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isUnlocked ? achievement.description : achievement.unlockText}
                    </p>
                  </div>
                </div>
                {isUnlocked && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Export/Import */}
      <div className="card-contemplative rounded-xl p-5">
        <h3 className="font-display text-base mb-2">Data Management</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your data is stored locally on this device. Export to back up or transfer to another device.
        </p>
        <div className="flex flex-wrap gap-3">
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary/50 hover:bg-primary/5">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border/50">
              <DialogHeader>
                <DialogTitle className="font-display">Export Data</DialogTitle>
                <DialogDescription>
                  Choose a format to export your meditation data.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <Button
                  onClick={handleExportJSON}
                  className="w-full justify-start btn-press"
                  variant="outline"
                >
                  <FileDown className="mr-3 h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Export as JSON</p>
                    <p className="text-xs text-muted-foreground">Full backup including all data</p>
                  </div>
                </Button>
                <Button
                  onClick={handleExportCSV}
                  className="w-full justify-start btn-press"
                  variant="outline"
                >
                  <FileDown className="mr-3 h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Export as CSV</p>
                    <p className="text-xs text-muted-foreground">Sessions only, spreadsheet compatible</p>
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/30 hover:bg-primary/5" asChild>
            <label className="cursor-pointer">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Import
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </label>
          </Button>
        </div>
        {importMessage && (
          <p className="mt-3 text-sm text-muted-foreground">{importMessage}</p>
        )}
      </div>

      {/* Session List */}
      <section aria-labelledby="session-history-heading">
        <h3 id="session-history-heading" className="font-display text-lg mb-4">Session History</h3>
        {sessions.length === 0 ? (
          <div className="card-contemplative rounded-xl py-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted/30 mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No sessions yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete a meditation session to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(sessionsByDate).map(([date, daySessions]) => (
              <div key={date}>
                <h4 className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-3">
                  {date}
                </h4>
                <div className="space-y-3">
                  {daySessions.map((session) => (
                    <div
                      key={session.id}
                      className="card-contemplative rounded-lg p-4 hover-glow group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <p className="font-display text-lg">
                              <span className="sr-only">Duration: </span>
                              {Math.round(session.durationSec / 60)} min
                            </p>
                            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs text-primary/90">
                              <span className="sr-only">Technique: </span>
                              {session.technique}
                            </span>
                          </div>
                          {session.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2" role="list" aria-label="Session tags">
                              {session.tags.map((tag) => (
                                <span
                                  key={tag}
                                  role="listitem"
                                  className="inline-flex items-center rounded-full border border-border/50 bg-card/50 px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {session.notes && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              <span className="sr-only">Notes: </span>
                              {session.notes}
                            </p>
                          )}
                          <time
                            dateTime={session.startTime}
                            className="block text-xs text-muted-foreground/70 mt-2 font-mono"
                          >
                            {new Date(session.startTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </time>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSession(session.id)}
                          aria-label={`Delete ${Math.round(session.durationSec / 60)} minute ${session.technique} session from ${new Date(session.startTime).toLocaleDateString()}`}
                          className="shrink-0 h-11 w-11 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity touch-target"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
