'use client'

import * as React from 'react'
import Link from 'next/link'
import { Play, Pause, Square, Timer, ArrowLeft, Settings, Check, Maximize, Minimize, Moon, Heart, Target, Zap, Wind, Flame, TrendingUp } from 'lucide-react'
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
  RampConfig,
  PurposePreset,
  PURPOSE_PRESETS,
  getBreathingStreaks,
  recordBreathingSession,
  startAmbientSound,
  stopAmbientSound,
  setAmbientVolume as updateAmbientVolume,
} from '@/lib/breathing'
import { cn } from '@/lib/utils'

// Default to 4-7-8 pattern
const DEFAULT_PATTERN = BREATH_PRESETS.find(p => p.id === '4-7-8') || BREATH_PRESETS[0]

// Ramp mode constants - multipliers for creating easier start patterns
const RAMP_START_MULTIPLIERS = {
  breathDuration: 0.7,  // Start at 70% of target breath duration
  holdDuration: 0.5,    // Start at 50% of target hold duration
  minBreathSeconds: 3,  // Minimum breath duration (inhale/exhale)
}

// Icon mapping for purpose presets
const PresetIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Moon,
  Heart,
  Target,
  Zap,
  Wind,
}

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

  // Ramp mode state
  const [rampEnabled, setRampEnabled] = React.useState(DEFAULT_BREATHING_SETTINGS.rampEnabled)
  const [rampDuration, setRampDuration] = React.useState(DEFAULT_BREATHING_SETTINGS.rampDuration)
  const [rampConfig, setRampConfig] = React.useState<RampConfig | null>(null)

  // Purpose preset state
  const [selectedPreset, setSelectedPreset] = React.useState<PurposePreset | null>(null)
  const [showPresets, setShowPresets] = React.useState(true)

  // Streaks state
  const [streaks, setStreaks] = React.useState(getBreathingStreaks())

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
        setRampEnabled(settings.rampEnabled ?? DEFAULT_BREATHING_SETTINGS.rampEnabled)
        setRampDuration(settings.rampDuration ?? DEFAULT_BREATHING_SETTINGS.rampDuration)
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

      // Refresh streaks on load
      setStreaks(getBreathingStreaks())
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
          rampEnabled,
          rampDuration,
        })
      )
    } catch (e) {
      logError('Failed to save settings', e)
    }
  }, [soundEnabled, soundProfile, soundVolume, hapticEnabled, durationMinutes, muteHoldPhases, ambientSound, ambientVolume, rampEnabled, rampDuration])

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

    // Record to breathing streaks
    const updatedStreaks = recordBreathingSession(durationMinutes)
    setStreaks(updatedStreaks)

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

  // Apply a purpose preset
  const applyPreset = React.useCallback((preset: PurposePreset) => {
    setSelectedPreset(preset)
    setPattern(preset.pattern)
    setDurationMinutes(preset.duration)
    setShowPresets(false)
    setShowSettings(true)

    // Apply preset's sound and ambient settings if specified
    if (preset.soundProfile) {
      setSoundProfile(preset.soundProfile)
    }
    if (preset.ambientSound !== undefined) {
      setAmbientSound(preset.ambientSound)
    }

    // Set up ramp config if preset has one
    if (preset.rampConfig) {
      setRampConfig(preset.rampConfig)
      setRampEnabled(true)
      setRampDuration(preset.rampConfig.rampDuration)
    } else {
      setRampConfig(null)
    }
  }, [])

  // Build ramp config from state if enabled (and no preset ramp)
  const effectiveRampConfig = React.useMemo((): RampConfig | null => {
    // If there's a preset ramp config, use it
    if (rampConfig?.enabled) {
      return rampConfig
    }
    // Otherwise, build from state if ramp is enabled
    if (!rampEnabled) return null

    // Create a simple ramp: start with easier pattern, end with target
    const { breathDuration, holdDuration, minBreathSeconds } = RAMP_START_MULTIPLIERS
    const startPattern: BreathPattern = {
      ...pattern,
      id: `${pattern.id}-start`,
      name: `${pattern.name} (Start)`,
      inhale: Math.max(minBreathSeconds, pattern.inhale * breathDuration),
      hold1: pattern.hold1 * holdDuration,
      exhale: Math.max(minBreathSeconds, pattern.exhale * breathDuration),
      hold2: pattern.hold2 * holdDuration,
    }

    return {
      enabled: true,
      startPattern,
      endPattern: pattern,
      rampDuration,
    }
  }, [rampEnabled, rampConfig, pattern, rampDuration])

  // Timer hook
  const timer = useBreathingTimer({
    pattern,
    duration: durationMinutes * 60,
    soundEnabled,
    soundVolume,
    soundProfile,
    hapticEnabled,
    muteHoldPhases,
    rampConfig: effectiveRampConfig,
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
    setShowPresets(false)
    timer.start()
  }, [timer])

  const handleStop = React.useCallback(() => {
    timer.stop()
    stopAmbientSound()
    setShowSettings(true)
    setShowPresets(true)
    setSelectedPreset(null)
    setRampConfig(null)
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
            {/* Title and Streaks - only when not running */}
            {!timer.isRunning && (
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold">Breathe</h1>
                <p className="mt-2 text-muted-foreground">
                  Paced breathing for calm and focus
                </p>

                {/* Streaks display */}
                {streaks.totalSessions > 0 && (
                  <div
                    className="mt-4 inline-flex items-center gap-4 px-4 py-2 rounded-full bg-card/50 border border-border/50"
                    role="status"
                    aria-label={`Practice streaks: ${streaks.currentStreak} day current streak, ${streaks.totalSessions} total sessions`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Flame className={cn(
                        "h-4 w-4",
                        streaks.currentStreak > 0 ? "text-orange-500" : "text-muted-foreground"
                      )} aria-hidden="true" />
                      <span className="text-sm font-medium" aria-hidden="true">{streaks.currentStreak} day streak</span>
                    </div>
                    <div className="w-px h-4 bg-border" aria-hidden="true" />
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground" aria-hidden="true">{streaks.totalSessions} sessions</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Purpose Presets - quick start buttons */}
            {!timer.isRunning && showPresets && (
              <div className="mb-8">
                <h2 id="quick-start-heading" className="text-sm font-medium text-muted-foreground mb-3 text-center">Quick Start</h2>
                <div
                  className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  role="group"
                  aria-labelledby="quick-start-heading"
                >
                  {PURPOSE_PRESETS.map((preset) => {
                    const IconComponent = PresetIcons[preset.icon] || Wind
                    const isSelected = selectedPreset?.id === preset.id
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        aria-label={`${preset.name}: ${preset.description}. ${preset.duration} minute session.`}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all min-h-[100px] min-w-[44px]",
                          "hover:border-primary/50 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border/50 bg-card/30"
                        )}
                      >
                        <IconComponent className={cn(
                          "h-6 w-6",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )} aria-hidden="true" />
                        <div className="text-center" aria-hidden="true">
                          <span className="text-sm font-medium block">{preset.name}</span>
                          <span className="text-xs text-muted-foreground">{preset.duration} min</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => {
                    setShowPresets(false)
                    setSelectedPreset(null)
                  }}
                  className="mt-3 text-xs text-muted-foreground hover:text-foreground mx-auto block min-h-[44px] py-2 px-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  or customize your own
                </button>
              </div>
            )}

            {/* Ramp mode indicator - when running with ramp */}
            {timer.isRunning && effectiveRampConfig?.enabled && timer.rampProgress < 1 && (
              <div className="text-center mb-4">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
                  role="status"
                  aria-live="polite"
                  aria-label={`Ramping to target pattern: ${Math.round(timer.rampProgress * 100)}% complete. Current: ${Math.round(timer.currentPattern.inhale * 10) / 10} seconds inhale, ${Math.round(timer.currentPattern.exhale * 10) / 10} seconds exhale.`}
                >
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden" aria-hidden="true">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${timer.rampProgress * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-primary" aria-hidden="true">
                    Ramping: {Math.round(timer.currentPattern.inhale * 10) / 10}s in
                    {timer.currentPattern.hold1 > 0 && `, ${Math.round(timer.currentPattern.hold1 * 10) / 10}s hold`}
                    , {Math.round(timer.currentPattern.exhale * 10) / 10}s out
                  </span>
                </div>
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
                    rampEnabled={rampEnabled}
                    onRampToggle={() => {
                      setRampEnabled(!rampEnabled)
                      if (rampEnabled) setRampConfig(null)
                    }}
                    rampDuration={rampDuration}
                    onRampDurationChange={setRampDuration}
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
