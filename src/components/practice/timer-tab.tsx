'use client'

import * as React from 'react'
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formatDuration } from '@/lib/utils'
import { addSession, getPreferences, setPreferences } from '@/lib/storage'

const TECHNIQUES = [
  'Breath Focus',
  'Body Scan',
  'Noting',
  'Open Monitoring',
  'Loving-Kindness',
  'Whole-Body Breathing',
  'Walking Meditation',
  'Unguided',
]

const SESSION_TAGS = [
  { id: 'restless', label: 'Restless', activeClass: 'border-ember/50 bg-ember/10 text-ember' },
  { id: 'sleepy', label: 'Sleepy', activeClass: 'border-primary/50 bg-primary/10 text-primary' },
  { id: 'calm', label: 'Calm', activeClass: 'border-sage/50 bg-sage/10 text-sage' },
  { id: 'emotional', label: 'Emotional', activeClass: 'border-accent/50 bg-accent/10 text-accent' },
  { id: 'focused', label: 'Focused', activeClass: 'border-primary/50 bg-primary/10 text-primary' },
  { id: 'scattered', label: 'Scattered', activeClass: 'border-ember/50 bg-ember/10 text-ember' },
]

type TimerState = 'idle' | 'running' | 'paused' | 'finished'

// Simple bell sound using Web Audio API as fallback
function playBellSound(frequency: number = 440, duration: number = 1) {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
    if (!AudioContext) return

    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  } catch {
    // Audio not supported, fail silently
  }
}

export function TimerTab() {
  const [duration, setDuration] = React.useState(600)
  const [timeRemaining, setTimeRemaining] = React.useState(600)
  const [timerState, setTimerState] = React.useState<TimerState>('idle')
  const [technique, setTechnique] = React.useState('Breath Focus')
  const [bellInterval, setBellInterval] = React.useState<number | null>(null)
  const [soundEnabled, setSoundEnabled] = React.useState(true)

  const [showPostSession, setShowPostSession] = React.useState(false)
  const [sessionNotes, setSessionNotes] = React.useState('')
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [sessionStartTime, setSessionStartTime] = React.useState<Date | null>(null)

  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const bellAudioRef = React.useRef<HTMLAudioElement | null>(null)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
  const audioLoadedRef = React.useRef({ end: false, interval: false })

  React.useEffect(() => {
    const prefs = getPreferences()
    setDuration(prefs.defaultDuration)
    setTimeRemaining(prefs.defaultDuration)
    setBellInterval(prefs.bellInterval)
    setSoundEnabled(prefs.bellSound !== 'none')

    if (typeof window !== 'undefined') {
      const endAudio = new Audio('/sounds/bell-end.mp3')
      const intervalAudio = new Audio('/sounds/bell-interval.mp3')

      endAudio.addEventListener('canplaythrough', () => {
        audioLoadedRef.current.end = true
      })
      intervalAudio.addEventListener('canplaythrough', () => {
        audioLoadedRef.current.interval = true
      })
      endAudio.addEventListener('error', () => {
        audioLoadedRef.current.end = false
      })
      intervalAudio.addEventListener('error', () => {
        audioLoadedRef.current.interval = false
      })

      audioRef.current = endAudio
      bellAudioRef.current = intervalAudio
    }
  }, [])

  const playSound = React.useCallback((type: 'end' | 'interval') => {
    if (!soundEnabled) return

    const audio = type === 'end' ? audioRef.current : bellAudioRef.current
    const loaded = type === 'end' ? audioLoadedRef.current.end : audioLoadedRef.current.interval

    if (audio && loaded) {
      audio.currentTime = 0
      audio.play().catch(() => {
        playBellSound(type === 'end' ? 528 : 440, type === 'end' ? 2 : 1)
      })
    } else {
      playBellSound(type === 'end' ? 528 : 440, type === 'end' ? 2 : 1)
    }
  }, [soundEnabled])

  React.useEffect(() => {
    if (timerState === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            setTimerState('finished')
            playSound('end')
            setShowPostSession(true)
            return 0
          }

          if (bellInterval) {
            const newTime = prev - 1
            const elapsed = duration - newTime
            if (elapsed > 0 && elapsed % (bellInterval * 60) === 0 && elapsed < duration) {
              playSound('interval')
            }
          }

          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState, bellInterval, duration, playSound])

  const handleStart = React.useCallback(() => {
    setSessionStartTime(new Date())
    setTimerState('running')
  }, [])

  const handlePause = React.useCallback(() => {
    setTimerState('paused')
  }, [])

  const handleResume = React.useCallback(() => {
    setTimerState('running')
  }, [])

  const handleReset = React.useCallback(() => {
    setTimerState('idle')
    setTimeRemaining(duration)
    setSessionStartTime(null)
  }, [duration])

  const handleEnd = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimerState('finished')
    setShowPostSession(true)
  }, [])

  const handleSaveSession = React.useCallback(() => {
    if (!sessionStartTime) return

    const actualDuration = duration - timeRemaining
    if (actualDuration < 30) {
      handleReset()
      setShowPostSession(false)
      setSessionNotes('')
      setSelectedTags([])
      return
    }

    addSession({
      startTime: sessionStartTime.toISOString(),
      endTime: new Date().toISOString(),
      durationSec: actualDuration,
      technique,
      notes: sessionNotes,
      tags: selectedTags,
    })

    handleReset()
    setShowPostSession(false)
    setSessionNotes('')
    setSelectedTags([])
  }, [sessionStartTime, duration, timeRemaining, technique, sessionNotes, selectedTags, handleReset])

  const handleSkipSave = React.useCallback(() => {
    handleReset()
    setShowPostSession(false)
    setSessionNotes('')
    setSelectedTags([])
  }, [handleReset])

  const handleDurationChange = React.useCallback((value: number[]) => {
    const newDuration = value[0] * 60
    setDuration(newDuration)
    setTimeRemaining(newDuration)
    setPreferences({ defaultDuration: newDuration })
  }, [])

  const handleBellIntervalChange = React.useCallback((value: string) => {
    const interval = value === 'none' ? null : parseInt(value)
    setBellInterval(interval)
    setPreferences({ bellInterval: interval })
  }, [])

  const toggleTag = React.useCallback((tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    )
  }, [])

  const progress = React.useMemo(() => ((duration - timeRemaining) / duration) * 100, [duration, timeRemaining])
  const circumference = React.useMemo(() => 2 * Math.PI * 120, [])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          if (showPostSession) return
          if (timerState === 'idle') {
            handleStart()
          } else if (timerState === 'running') {
            handlePause()
          } else if (timerState === 'paused') {
            handleResume()
          }
          break
        case 'KeyR':
          if (showPostSession) return
          if (timerState === 'paused' || timerState === 'finished') {
            handleReset()
          }
          break
        case 'Escape':
          if (showPostSession) {
            handleSkipSave()
          } else if (timerState === 'running') {
            handlePause()
          }
          break
        case 'Enter':
          if (showPostSession) {
            e.preventDefault()
            handleSaveSession()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [timerState, showPostSession, handleStart, handlePause, handleResume, handleReset, handleSkipSave, handleSaveSession])

  if (showPostSession) {
    return (
      <div className="card-contemplative rounded-xl p-4 sm:p-8 animate-scale-in">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl">Session Complete</h2>
          <p className="text-muted-foreground mt-2">
            {formatDuration(duration - timeRemaining)} of {technique}
          </p>
        </div>

        <div className="space-y-6">
          <fieldset>
            <legend className="text-sm font-medium">How was it?</legend>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Session mood tags">
              {SESSION_TAGS.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toggleTag(tag.id)}
                  aria-pressed={selectedTags.includes(tag.id)}
                  className={`rounded-full border px-4 py-2.5 min-h-[44px] text-sm font-medium transition-all duration-200 btn-press ${
                    selectedTags.includes(tag.id)
                      ? tag.activeClass
                      : 'border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  {tag.label}
                </Button>
              ))}
            </div>
          </fieldset>

          <div>
            <Label htmlFor="session-notes" className="text-sm font-medium">
              Notes (optional)
            </Label>
            <Textarea
              id="session-notes"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Anything you want to remember about this session..."
              className="mt-2 min-h-[100px] bg-card/50 border-border/50 focus:border-primary/50 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSaveSession}
              className="flex-1 bg-primary hover:bg-primary/90 btn-press"
            >
              Save Session
            </Button>
            <Button
              variant="outline"
              onClick={handleSkipSave}
              className="border-border/50 hover:border-primary/30 hover:bg-primary/5"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="card-contemplative rounded-xl p-8 relative overflow-hidden">
        {timerState === 'running' && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-primary/10 to-transparent blur-3xl animate-glow-pulse" />
          </div>
        )}

        <div className="relative flex flex-col items-center">
          <div
            className={`relative flex h-56 w-56 sm:h-72 sm:w-72 items-center justify-center ${timerState === 'running' ? 'timer-active' : ''}`}
            role="timer"
            aria-label={`${formatDuration(timeRemaining)} remaining`}
          >
            <svg className="absolute h-0 w-0" aria-hidden="true">
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>

            {/* Mobile timer circle (224px) */}
            <svg className="absolute h-full w-full -rotate-90 sm:hidden" aria-hidden="true" viewBox="0 0 224 224">
              <circle
                cx="112"
                cy="112"
                r="96"
                strokeWidth="4"
                fill="none"
                className="stroke-muted/30"
              />
              <circle
                cx="112"
                cy="112"
                r="96"
                strokeWidth="4"
                fill="none"
                stroke="url(#timerGradient)"
                strokeLinecap="round"
                className="transition-all duration-1000 timer-ring"
                strokeDasharray={2 * Math.PI * 96}
                strokeDashoffset={2 * Math.PI * 96 * (1 - progress / 100)}
                style={{
                  filter: timerState === 'running' ? 'drop-shadow(0 0 8px hsla(var(--primary), 0.5))' : 'none'
                }}
              />
            </svg>

            {/* Desktop timer circle (288px) */}
            <svg className="absolute h-full w-full -rotate-90 hidden sm:block" aria-hidden="true" viewBox="0 0 288 288">
              <circle
                cx="144"
                cy="144"
                r="120"
                strokeWidth="4"
                fill="none"
                className="stroke-muted/30"
              />
              <circle
                cx="144"
                cy="144"
                r="120"
                strokeWidth="4"
                fill="none"
                stroke="url(#timerGradient)"
                strokeLinecap="round"
                className="transition-all duration-1000 timer-ring"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                style={{
                  filter: timerState === 'running' ? 'drop-shadow(0 0 8px hsla(var(--primary), 0.5))' : 'none'
                }}
              />
            </svg>

            <div className="relative text-center">
              <div className="font-mono text-4xl sm:text-6xl font-light tracking-wider timer-display text-gradient">
                {formatDuration(timeRemaining)}
              </div>
              <div className="mt-3 text-sm text-muted-foreground font-medium tracking-wide uppercase">
                {timerState === 'idle'
                  ? 'Ready to begin'
                  : timerState === 'running'
                    ? 'In session'
                    : timerState === 'paused'
                      ? 'Paused'
                      : 'Complete'}
              </div>
              <span className="sr-only">
                Timer {timerState}. {formatDuration(timeRemaining)} remaining of {formatDuration(duration)} total.
              </span>
            </div>
          </div>

          <div className="mt-8">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary/90">
              {technique}
            </span>
          </div>

          <div className="mt-8 flex items-center gap-4" role="group" aria-label="Timer controls">
            {timerState === 'idle' && (
              <Button
                size="lg"
                onClick={handleStart}
                className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-glow btn-press group"
                aria-label="Start meditation timer"
              >
                <Play className="h-7 w-7 ml-1 transition-transform group-hover:scale-110" aria-hidden="true" />
              </Button>
            )}
            {timerState === 'running' && (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handlePause}
                  className="h-16 w-16 rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10 btn-press"
                  aria-label="Pause timer"
                >
                  <Pause className="h-7 w-7" aria-hidden="true" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleEnd}
                  className="text-muted-foreground hover:text-foreground"
                >
                  End Early
                </Button>
              </>
            )}
            {timerState === 'paused' && (
              <>
                <Button
                  size="lg"
                  onClick={handleResume}
                  className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-glow btn-press group"
                  aria-label="Resume timer"
                >
                  <Play className="h-7 w-7 ml-1 transition-transform group-hover:scale-110" aria-hidden="true" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                  className="h-16 w-16 rounded-full border-border/50 hover:border-primary/30 hover:bg-primary/5 btn-press"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="h-6 w-6" aria-hidden="true" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleEnd}
                  className="text-muted-foreground hover:text-foreground"
                >
                  End & Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {timerState === 'idle' && (
        <div className="card-contemplative rounded-xl p-4 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-lg mb-6">
            <Settings className="h-4 w-4 text-primary" aria-hidden="true" />
            Session Settings
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="duration-slider" className="text-sm">Duration</Label>
                <span className="text-sm text-primary font-mono" aria-live="polite">
                  {Math.floor(duration / 60)} min
                </span>
              </div>
              <Slider
                id="duration-slider"
                value={[Math.floor(duration / 60)]}
                onValueChange={handleDurationChange}
                min={1}
                max={60}
                step={1}
                aria-label="Session duration in minutes"
                className="[&_[role=slider]]:border-primary/50 [&_[role=slider]]:bg-primary [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 touch-pan-y"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                <span>1 min</span>
                <span>30 min</span>
                <span>60 min</span>
              </div>
            </div>

            <div>
              <Label htmlFor="technique-select" className="text-sm">Technique</Label>
              <Select value={technique} onValueChange={setTechnique}>
                <SelectTrigger id="technique-select" className="mt-2 bg-card/50 border-border/50 focus:border-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  {TECHNIQUES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bell-interval-select" className="text-sm">Interval Bell</Label>
              <Select
                value={bellInterval?.toString() || 'none'}
                onValueChange={handleBellIntervalChange}
              >
                <SelectTrigger id="bell-interval-select" className="mt-2 bg-card/50 border-border/50 focus:border-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="10">Every 10 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sound-toggle" className="text-sm">Sound</Label>
              <Button
                id="sound-toggle"
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={soundEnabled ? 'text-primary' : 'text-muted-foreground'}
                aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <VolumeX className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {timerState === 'idle' && (
        <div className="rounded-xl border border-border/30 bg-card/20 p-5">
          <h4 className="font-display text-sm text-primary/80 uppercase tracking-wider mb-3">
            Before you begin
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary/50 mt-0.5" aria-hidden="true">•</span>
              Find a comfortable, upright posture
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/50 mt-0.5" aria-hidden="true">•</span>
              Let your eyes close or soften your gaze
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/50 mt-0.5" aria-hidden="true">•</span>
              Take a few deep breaths to settle
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary/50 mt-0.5" aria-hidden="true">•</span>
              When ready, press play or <kbd className="px-1.5 py-0.5 rounded bg-muted/50 border border-border/50 font-mono text-xs">Space</kbd>
            </li>
          </ul>
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="text-center text-xs text-muted-foreground/60">
        <span className="hidden sm:inline">
          Keyboard shortcuts:{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-muted/30 border border-border/30 font-mono">Space</kbd> play/pause
          {' · '}
          <kbd className="px-1.5 py-0.5 rounded bg-muted/30 border border-border/30 font-mono">R</kbd> reset
          {' · '}
          <kbd className="px-1.5 py-0.5 rounded bg-muted/30 border border-border/30 font-mono">Esc</kbd> pause/close
        </span>
      </div>
    </div>
  )
}
