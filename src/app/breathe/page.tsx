'use client'

import * as React from 'react'
import Link from 'next/link'
import { Play, Pause, Square, Timer, ArrowLeft, Settings, Check, Maximize, Minimize } from 'lucide-react'
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
  AmbientSound,
  startAmbientSound,
  stopAmbientSound,
  setAmbientVolume as updateAmbientVolume,
} from '@/lib/breathing'
import { cn } from '@/lib/utils'

// Default to 4-7-8 pattern
const DEFAULT_PATTERN = BREATH_PRESETS.find(p => p.id === '4-7-8') || BREATH_PRESETS[0]

// Helper to safely log errors in development
function logError(context: string, error: unknown) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Breathe] ${context}:`, error)
  }
}

export default function BreathePage() {
  // State
  const [pattern, setPattern] = React.useState<BreathPattern>(DEFAULT_PATTERN)
  const [durationMinutes, setDurationMinutes] = React.useState(DEFAULT_BREATHING_SETTINGS.defaultDuration)
  const [soundEnabled, setSoundEnabled] = React.useState(DEFAULT_BREATHING_SETTINGS.soundEnabled)
  const [soundProfile, setSoundProfile] = React.useState<SoundProfile>('singing-bowl')
  const [soundVolume, setSoundVolume] = React.useState(DEFAULT_BREATHING_SETTINGS.soundVolume)
  const [hapticEnabled, setHapticEnabled] = React.useState(DEFAULT_BREATHING_SETTINGS.hapticEnabled)
  const [muteHoldPhases, setMuteHoldPhases] = React.useState(DEFAULT_BREATHING_SETTINGS.muteHoldPhases)
  const [ambientSound, setAmbientSound] = React.useState<AmbientSound | null>(DEFAULT_BREATHING_SETTINGS.ambientSound)
  const [ambientVolume, setAmbientVolume] = React.useState(DEFAULT_BREATHING_SETTINGS.ambientVolume)
  const [showSettings, setShowSettings] = React.useState(true)
  const [sessionComplete, setSessionComplete] = React.useState(false)
  const [completedBreaths, setCompletedBreaths] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  // Ref for settings panel focus trap
  const settingsPanelRef = React.useRef<HTMLDivElement>(null)

  // Load saved settings from localStorage
  React.useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(BREATHING_STORAGE_KEYS.settings)
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setSoundEnabled(settings.soundEnabled ?? DEFAULT_BREATHING_SETTINGS.soundEnabled)
        setSoundProfile(settings.soundProfile ?? 'singing-bowl')
        setSoundVolume(settings.soundVolume ?? DEFAULT_BREATHING_SETTINGS.soundVolume)
        setHapticEnabled(settings.hapticEnabled ?? DEFAULT_BREATHING_SETTINGS.hapticEnabled)
        setDurationMinutes(settings.defaultDuration ?? DEFAULT_BREATHING_SETTINGS.defaultDuration)
        setMuteHoldPhases(settings.muteHoldPhases ?? DEFAULT_BREATHING_SETTINGS.muteHoldPhases)
        setAmbientSound(settings.ambientSound ?? DEFAULT_BREATHING_SETTINGS.ambientSound)
        setAmbientVolume(settings.ambientVolume ?? DEFAULT_BREATHING_SETTINGS.ambientVolume)
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
      logError('Failed to load settings', e)
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
          soundVolume,
          hapticEnabled,
          defaultDuration: durationMinutes,
          muteHoldPhases,
          ambientSound,
          ambientVolume,
        })
      )
    } catch (e) {
      logError('Failed to save settings', e)
    }
  }, [soundEnabled, soundProfile, soundVolume, hapticEnabled, durationMinutes, muteHoldPhases, ambientSound, ambientVolume])

  // Save pattern when it changes
  React.useEffect(() => {
    try {
      localStorage.setItem(BREATHING_STORAGE_KEYS.lastPattern, JSON.stringify(pattern))
    } catch (e) {
      logError('Failed to save pattern', e)
    }
  }, [pattern])

  // Handle session complete
  const handleComplete = React.useCallback((breathCount: number) => {
    setCompletedBreaths(breathCount)
    setSessionComplete(true)

    // Stop ambient sound when session ends
    stopAmbientSound()

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
      logError('Failed to save session', e)
    }
  }, [durationMinutes, pattern])

  // Timer hook
  const timer = useBreathingTimer({
    pattern,
    duration: durationMinutes * 60,
    soundEnabled,
    soundVolume,
    soundProfile,
    hapticEnabled,
    muteHoldPhases,
    onComplete: handleComplete,
  })

  // Handle ambient sound changes
  React.useEffect(() => {
    if (timer.isRunning && !timer.isPaused && ambientSound && soundEnabled) {
      startAmbientSound(ambientSound, ambientVolume)
    } else {
      stopAmbientSound()
    }
  }, [timer.isRunning, timer.isPaused, ambientSound, soundEnabled, ambientVolume])

  // Update ambient volume when it changes during session
  React.useEffect(() => {
    if (timer.isRunning && ambientSound) {
      updateAmbientVolume(ambientVolume)
    }
  }, [ambientVolume, timer.isRunning, ambientSound])

  // Reset session complete state when starting new session
  const handleStart = React.useCallback(() => {
    setSessionComplete(false)
    setShowSettings(false)
    timer.start()
  }, [timer])

  const handleStop = React.useCallback(() => {
    timer.stop()
    stopAmbientSound()
    setShowSettings(true)
  }, [timer])

  // Fullscreen handling
  const toggleFullscreen = React.useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (e) {
      logError('Fullscreen toggle failed', e)
    }
  }, [])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          if (timer.isRunning) {
            if (timer.isPaused) {
              timer.resume()
              // Resume ambient sound
              if (ambientSound && soundEnabled) {
                startAmbientSound(ambientSound, ambientVolume)
              }
            } else {
              timer.pause()
              stopAmbientSound()
            }
          } else if (!sessionComplete) {
            handleStart()
          }
          break
        case 'Escape':
          if (timer.isRunning) {
            handleStop()
          } else if (isFullscreen) {
            toggleFullscreen()
          }
          break
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) {
            toggleFullscreen()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [timer, sessionComplete, isFullscreen, ambientSound, soundEnabled, ambientVolume, handleStart, handleStop, toggleFullscreen])

  // Listen for fullscreen changes (user might exit with browser button)
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopAmbientSound()
    }
  }, [])

  // Focus trap for settings panel during active session
  React.useEffect(() => {
    if (!timer.isRunning || !showSettings || !settingsPanelRef.current) return

    const panel = settingsPanelRef.current
    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    panel.addEventListener('keydown', handleTabKey)
    return () => panel.removeEventListener('keydown', handleTabKey)
  }, [timer.isRunning, showSettings])

  return (
    <div className="min-h-screen relative">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
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
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
            Practice
          </Link>

          <div className="flex items-center gap-2">
            {/* Fullscreen button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="min-h-[44px]"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>

            {timer.isRunning && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="min-h-[44px]"
                aria-label={showSettings ? 'Hide settings' : 'Show settings'}
                aria-expanded={showSettings}
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        {/* Session Complete View */}
        {sessionComplete ? (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="h-10 w-10 text-primary" aria-hidden="true" />
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
                  <Timer className="mr-2 h-4 w-4" aria-hidden="true" />
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
                    <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                    Start
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        if (timer.isPaused) {
                          timer.resume()
                          if (ambientSound && soundEnabled) {
                            startAmbientSound(ambientSound, ambientVolume)
                          }
                        } else {
                          timer.pause()
                          stopAmbientSound()
                        }
                      }}
                      className="px-8 py-6"
                    >
                      {timer.isPaused ? (
                        <>
                          <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="mr-2 h-5 w-5" aria-hidden="true" />
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
                      <Square className="mr-2 h-5 w-5" aria-hidden="true" />
                      End
                    </Button>
                  </>
                )}
              </div>

              {/* Keyboard shortcuts hint */}
              {!timer.isRunning && (
                <p className="text-center text-xs text-muted-foreground">
                  Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Space</kbd> to start,{' '}
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">F</kbd> for fullscreen
                </p>
              )}

              {/* Settings panel */}
              {showSettings && (
                <div
                  ref={settingsPanelRef}
                  className="mt-8 p-6 rounded-xl border border-border/50 bg-card/30"
                  role="region"
                  aria-label="Breathing session settings"
                >
                  <BreathingControls
                    pattern={pattern}
                    onPatternChange={setPattern}
                    duration={durationMinutes}
                    onDurationChange={setDurationMinutes}
                    soundEnabled={soundEnabled}
                    onSoundToggle={() => setSoundEnabled(!soundEnabled)}
                    soundProfile={soundProfile}
                    onSoundProfileChange={setSoundProfile}
                    soundVolume={soundVolume}
                    onSoundVolumeChange={setSoundVolume}
                    hapticEnabled={hapticEnabled}
                    onHapticToggle={() => setHapticEnabled(!hapticEnabled)}
                    muteHoldPhases={muteHoldPhases}
                    onMuteHoldPhasesToggle={() => setMuteHoldPhases(!muteHoldPhases)}
                    ambientSound={ambientSound}
                    onAmbientSoundChange={setAmbientSound}
                    ambientVolume={ambientVolume}
                    onAmbientVolumeChange={setAmbientVolume}
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
