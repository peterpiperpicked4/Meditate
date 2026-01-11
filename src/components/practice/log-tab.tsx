'use client'

import * as React from 'react'
import { Download, Trash2, Flame, Clock, Calendar, TrendingUp, ArrowUpRight, FileDown } from 'lucide-react'
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
