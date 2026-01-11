'use client'

import * as React from 'react'
import { Plus, Trash2, PenLine, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  getJournalEntries,
  addJournalEntry,
  deleteJournalEntry,
  getSessions,
  type JournalEntry,
  type Session,
} from '@/lib/storage'
import { formatDate } from '@/lib/utils'

const JOURNAL_PROMPTS = [
  {
    id: 'whatPulledAttention',
    label: 'What pulled attention today?',
    placeholder: 'Thoughts, sensations, emotions that were prominent...',
  },
  {
    id: 'whatHelpedReturn',
    label: 'What helped you return?',
    placeholder: 'Techniques or anchors that worked well...',
  },
  {
    id: 'bodyEmotionNotice',
    label: 'What did you notice in body/emotion?',
    placeholder: 'Physical sensations, emotional states...',
  },
  {
    id: 'insightForTomorrow',
    label: 'One insight to carry into tomorrow',
    placeholder: 'Something you learned or want to remember...',
  },
]

const MOODS = [
  { value: 'peaceful', label: 'Peaceful', activeClass: 'border-sage/50 bg-sage/10 text-sage' },
  { value: 'restless', label: 'Restless', activeClass: 'border-ember/50 bg-ember/10 text-ember' },
  { value: 'sleepy', label: 'Sleepy', activeClass: 'border-primary/50 bg-primary/10 text-primary' },
  { value: 'emotional', label: 'Emotional', activeClass: 'border-accent/50 bg-accent/10 text-accent' },
  { value: 'focused', label: 'Focused', activeClass: 'border-primary/50 bg-primary/10 text-primary' },
  { value: 'neutral', label: 'Neutral', activeClass: 'border-border bg-muted/50 text-muted-foreground' },
] as const

export function JournalTab() {
  const [entries, setEntries] = React.useState<JournalEntry[]>([])
  const [sessions, setSessions] = React.useState<Session[]>([])
  const [showNewEntry, setShowNewEntry] = React.useState(false)

  // New entry form
  const [formText, setFormText] = React.useState('')
  const [formPrompts, setFormPrompts] = React.useState<Record<string, string>>({})
  const [formMood, setFormMood] = React.useState<JournalEntry['mood']>()
  const [formLinkedSession, setFormLinkedSession] = React.useState<string>('')

  const loadData = React.useCallback(() => {
    const allEntries = getJournalEntries()
    // Sort by most recent first
    allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setEntries(allEntries)

    // Get recent sessions for linking
    const allSessions = getSessions()
    allSessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    setSessions(allSessions.slice(0, 10)) // Last 10 sessions
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const resetForm = () => {
    setFormText('')
    setFormPrompts({})
    setFormMood(undefined)
    setFormLinkedSession('')
  }

  const handleSave = () => {
    if (!formText.trim() && Object.values(formPrompts).every(v => !v.trim())) {
      return // Don't save empty entries
    }

    const entry = {
      date: new Date().toISOString(),
      text: formText,
      prompts: formPrompts,
      mood: formMood,
      linkedSessionId: formLinkedSession || undefined,
    }

    addJournalEntry(entry)
    resetForm()
    setShowNewEntry(false)
    loadData()
  }

  const handleDelete = (id: string) => {
    deleteJournalEntry(id)
    loadData()
  }

  const getLinkedSession = (sessionId?: string) => {
    if (!sessionId) return null
    return sessions.find(s => s.id === sessionId) || null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg">Practice Journal</h3>
          <p className="text-sm text-muted-foreground">
            Reflect on your practice to deepen self-awareness
          </p>
        </div>
        <Dialog open={showNewEntry} onOpenChange={(open) => {
          setShowNewEntry(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 btn-press">
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">New Journal Entry</DialogTitle>
              <DialogDescription>
                Reflect on your practice. You can write freely or use the prompts below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Free writing */}
              <div>
                <Label htmlFor="freeText">Reflections</Label>
                <Textarea
                  id="freeText"
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Write freely about your practice..."
                  className="mt-2 min-h-[120px] bg-card/50 border-border/50 focus:border-primary/50 resize-none"
                />
              </div>

              {/* Guided prompts */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary/80">
                  <Lightbulb className="h-4 w-4" />
                  Guided Prompts (optional)
                </div>
                {JOURNAL_PROMPTS.map((prompt) => (
                  <div key={prompt.id}>
                    <Label htmlFor={prompt.id} className="text-sm">
                      {prompt.label}
                    </Label>
                    <Textarea
                      id={prompt.id}
                      value={formPrompts[prompt.id] || ''}
                      onChange={(e) =>
                        setFormPrompts((prev) => ({
                          ...prev,
                          [prompt.id]: e.target.value,
                        }))
                      }
                      placeholder={prompt.placeholder}
                      className="mt-1 min-h-[80px] bg-card/50 border-border/50 focus:border-primary/50 resize-none"
                    />
                  </div>
                ))}
              </div>

              {/* Mood */}
              <fieldset>
                <legend className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Overall mood</legend>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Select your overall mood">
                  {MOODS.map((mood) => (
                    <Button
                      key={mood.value}
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormMood(formMood === mood.value ? undefined : mood.value)
                      }
                      aria-pressed={formMood === mood.value}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 btn-press ${
                        formMood === mood.value
                          ? mood.activeClass
                          : 'border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                      }`}
                    >
                      {mood.label}
                    </Button>
                  ))}
                </div>
              </fieldset>

              {/* Link to session */}
              {sessions.length > 0 && (
                <div>
                  <Label>Link to a session (optional)</Label>
                  <Select
                    value={formLinkedSession}
                    onValueChange={setFormLinkedSession}
                  >
                    <SelectTrigger className="mt-2 bg-card/50 border-border/50 focus:border-primary/50">
                      <SelectValue placeholder="Select a session..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      <SelectItem value="">No linked session</SelectItem>
                      {sessions.map((session) => (
                        <SelectItem key={session.id} value={session.id}>
                          {formatDate(session.startTime)} -{' '}
                          {Math.round(session.durationSec / 60)} min {session.technique}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm()
                setShowNewEntry(false)
              }} className="border-border/50">
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 btn-press">
                Save Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Entry List */}
      {entries.length === 0 ? (
        <div className="card-contemplative rounded-xl py-16 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <PenLine className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">No journal entries yet.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start reflecting on your practice to track insights and growth.
          </p>
          <Button className="mt-6 bg-primary hover:bg-primary/90 btn-press" onClick={() => setShowNewEntry(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Write First Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => {
            const linkedSession = getLinkedSession(entry.linkedSessionId)
            const moodStyle = entry.mood
              ? MOODS.find(m => m.value === entry.mood)
              : null

            return (
              <div key={entry.id} className="card-contemplative rounded-xl p-5 hover-glow group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-base">
                      {formatDate(entry.date)}
                    </h4>
                    {entry.mood && moodStyle && (
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${moodStyle.activeClass}`}>
                        {moodStyle.label}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(entry.id)}
                    aria-label={`Delete journal entry from ${formatDate(entry.date)}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                  </Button>
                </div>
                {linkedSession && (
                  <p className="text-xs text-muted-foreground mb-3">
                    Linked to: {Math.round(linkedSession.durationSec / 60)} min {linkedSession.technique}
                  </p>
                )}

                {/* Free text */}
                {entry.text && (
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{entry.text}</p>
                )}

                {/* Prompts */}
                {Object.entries(entry.prompts || {}).some(([, v]) => v) && (
                  <div className="space-y-4 border-t border-border/30 pt-4 mt-4">
                    {JOURNAL_PROMPTS.map((prompt) => {
                      const value = entry.prompts?.[prompt.id as keyof typeof entry.prompts]
                      if (!value) return null
                      return (
                        <div key={prompt.id}>
                          <p className="text-xs font-medium text-primary/70 uppercase tracking-wider">
                            {prompt.label}
                          </p>
                          <p className="text-sm mt-1 leading-relaxed">{value}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Writing tips */}
      <div className="rounded-xl border border-border/30 bg-card/20 p-5">
        <h4 className="font-display text-sm text-primary/80 uppercase tracking-wider mb-3">
          Journaling Tips
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary/50 mt-0.5">•</span>
            Write immediately after practice while experiences are fresh
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/50 mt-0.5">•</span>
            Focus on what you actually noticed, not what you think you should notice
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/50 mt-0.5">•</span>
            Track patterns over time—recurring distractions, successful anchors
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/50 mt-0.5">•</span>
            Be honest about difficult sessions—they&apos;re often the most instructive
          </li>
        </ul>
      </div>
    </div>
  )
}
