'use client'

import * as React from 'react'
import Link from 'next/link'
import { Play, Pause, Square, Timer, ArrowLeft, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BreathingVisual } from '@/components/breathe/BreathingVisual'
import { BreathingControls } from '@/components/breathe/BreathingControls'
import { useBreathingTimer } from '@/hooks/useBreathingTimer'
import {
  BreathPattern,
  BREATH_PRESETS,
  DEFAULT_BREATHING_SETTINGS,
  BREATHING_STORAGE_KEYS,
  SoundProfile,
} from '@/lib/breathing'
import { cn } from '@/lib/utils'

// Default to 4-7-8 pattern
const DEFAULT_PATTERN = BREATH_PRESETS.find(p => p.id === '4-7-8') || BREATH_PRESETS[0]

export default function BreathePage() {
  // State
  const [pattern, setPattern] = React.useState<BreathPattern>(DEFAULT_PATTERN)
  const [durationMinutes, setDurationMinutes] = React.useState(5)
  const [soundEnabled, setSoundEnabled] = React.useState(DEFAULT_BREATHING_SETTINGS.soundEnabled)
  const [soundProfile, setSoundProfile] = React.useState<SoundProfile>('singing-bowl')
  const [hapticEnabled, setHapticEnabled] = React.useState(DEFAULT_BREATHING_SETTINGS.hapticEnabled)
  const [showSettings, setShowSettings] = React.useState(true)
  const [sessionComplete, setSessionComplete] = React.useState(false)
  const [completedBreaths, setCompletedBreaths] = React.useState(0)

  // Load saved settings from localStorage
  React.useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(BREATHING_STORAGE_KEYS.settings)
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setSoundEnabled(settings.soundEnabled ?? DEFAULT_BREATHING_SETTINGS.soundEnabled)
        setSoundProfile(settings.soundProfile ?? 'singing-bowl')
        setHapticEnabled(settings.hapticEnabled ?? DEFAULT_BREATHING_SETTINGS.hapticEnabled)
        setDurationMinutes(settings.defaultDuration ?? DEFAULT_BREATHING_SETTINGS.defaultDuration)
      }

      const savedPattern = localStorage.getItem(BREATHING_STORAGE_KEYS.lastPattern)
      if (savedPattern) {
        const parsed = JSON.parse(savedPattern)
        // Find matching preset or use custom
        const preset = BREATH_PRESETS.find(p => p.id === parsed.id)
        if (preset) {
          setPattern(preset)
        } else {
          setPattern(parsed)
        }
      }
    } catch (e) {
      // Use defaults
    }
  }, [])

  // Save settings when they change
  React.useEffect(() => {
    try {
      localStorage.setItem(
        BREATHING_STORAGE_KEYS.settings,
        JSON.stringify({
          soundEnabled,
          soundProfile,
          hapticEnabled,
          defaultDuration: durationMinutes,
        })
      )
    } catch (e) {
      // Storage not available
    }
  }, [soundEnabled, soundProfile, hapticEnabled, durationMinutes])

  // Save pattern when it changes
  React.useEffect(() => {
    try {
      localStorage.setItem(BREATHING_STORAGE_KEYS.lastPattern, JSON.stringify(pattern))
    } catch (e) {
      // Storage not available
    }
  }, [pattern])

  // Handle session complete
  const handleComplete = React.useCallback((breathCount: number) => {
    setCompletedBreaths(breathCount)
    setSessionComplete(true)

    // Log session to existing practice log
    try {
      const sessions = JSON.parse(localStorage.getItem('ztd_sessions') || '[]')
      sessions.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        duration: durationMinutes * 60,
        technique: 'paced-breathing',
        notes: `${pattern.name}: ${pattern.inhale}s in${pattern.hold1 ? `, ${pattern.hold1}s hold` : ''}, ${pattern.exhale}s out${pattern.hold2 ? `, ${pattern.hold2}s hold` : ''}`,
        tags: ['breath-work'],
      })
      localStorage.setItem('ztd_sessions', JSON.stringify(sessions))
    } catch (e) {
      // Storage error
    }
  }, [durationMinutes, pattern])

  // Timer hook
  const timer = useBreathingTimer({
    pattern,
    duration: durationMinutes * 60,
    soundEnabled,
    soundProfile,
    hapticEnabled,
    onComplete: handleComplete,
  })

  // Reset session complete state when starting new session
  const handleStart = () => {
    setSessionComplete(false)
    setShowSettings(false)
    timer.start()
  }

  const handleStop = () => {
    timer.stop()
    setShowSettings(true)
  }

  return (
    <div className="min-h-screen relative">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000',
            'w-[600px] h-[600px] bg-gradient-radial from-primary/[0.08] via-primary/[0.02] to-transparent blur-3xl',
            timer.phase === 'inhale' && 'scale-125 from-primary/[0.12]',
            timer.phase === 'exhale' && 'scale-75 from-primary/[0.05]'
          )}
        />
      </div>

      <div className="container relative py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/practice"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground min-h-[44px] py-2 px-2 -ml-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Practice
          </Link>

          {timer.isRunning && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="min-h-[44px]"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Session Complete View */}
        {sessionComplete ? (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-display mb-2">Session Complete</h2>
            <p className="text-muted-foreground mb-8">
              {completedBreaths} breaths over {durationMinutes} minutes
            </p>

            <div className="space-y-3">
              <Button
                size="lg"
                onClick={() => {
                  setSessionComplete(false)
                  setShowSettings(true)
                }}
                className="w-full"
              >
                New Session
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full"
              >
                <Link href="/practice">
                  <Timer className="mr-2 h-4 w-4" />
                  Open Timer
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Title - only when not running */}
            {!timer.isRunning && (
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold">Breathe</h1>
                <p className="mt-2 text-muted-foreground">
                  Paced breathing for calm and focus
                </p>
              </div>
            )}

            {/* Breathing Visual */}
            <div className="flex justify-center mb-8">
              <BreathingVisual
                phase={timer.phase}
                progress={timer.progress}
                phaseTimeRemaining={timer.phaseTimeRemaining}
                totalTimeRemaining={timer.totalTimeRemaining}
                totalDuration={timer.totalDuration}
                breathCount={timer.breathCount}
                isRunning={timer.isRunning}
                isPaused={timer.isPaused}
              />
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Play/Pause/Stop buttons */}
              <div className="flex justify-center gap-4">
                {!timer.isRunning ? (
                  <Button
                    size="lg"
                    onClick={handleStart}
                    className="px-12 py-6 text-lg"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={timer.isPaused ? timer.resume : timer.pause}
                      className="px-8 py-6"
                    >
                      {timer.isPaused ? (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="mr-2 h-5 w-5" />
                          Pause
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleStop}
                      className="px-8 py-6 text-muted-foreground hover:text-destructive"
                    >
                      <Square className="mr-2 h-5 w-5" />
                      End
                    </Button>
                  </>
                )}
              </div>

              {/* Settings panel */}
              {showSettings && (
                <div className="mt-8 p-6 rounded-xl border border-border/50 bg-card/30">
                  <BreathingControls
                    pattern={pattern}
                    onPatternChange={setPattern}
                    duration={durationMinutes}
                    onDurationChange={setDurationMinutes}
                    soundEnabled={soundEnabled}
                    onSoundToggle={() => setSoundEnabled(!soundEnabled)}
                    soundProfile={soundProfile}
                    onSoundProfileChange={setSoundProfile}
                    hapticEnabled={hapticEnabled}
                    onHapticToggle={() => setHapticEnabled(!hapticEnabled)}
                    disabled={timer.isRunning && !timer.isPaused}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer link when not in session */}
        {!timer.isRunning && !sessionComplete && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              For traditional meditation,{' '}
              <Link href="/practice" className="text-primary underline">
                use the timer
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
