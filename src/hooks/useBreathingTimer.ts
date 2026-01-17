'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  BreathPhase,
  BreathPattern,
  SoundProfile,
  RampConfig,
  getActivePhases,
  getCycleDuration,
  getRampedPattern,
  playPhaseSound,
  vibrate,
} from '@/lib/breathing'

export interface BreathingTimerState {
  phase: BreathPhase
  phaseTimeRemaining: number      // seconds remaining in current phase
  phaseDuration: number           // total duration of current phase
  totalTimeRemaining: number      // seconds remaining in session
  totalDuration: number           // total session duration
  breathCount: number             // completed breath cycles
  isRunning: boolean
  isPaused: boolean
  progress: number                // 0-1 progress through current phase
  currentPattern: BreathPattern   // current pattern (may change during ramp)
  rampProgress: number            // 0-1 progress through ramp (1 = at target)
}

interface UseBreathingTimerOptions {
  pattern: BreathPattern
  duration: number                // total session duration in seconds
  soundEnabled?: boolean
  soundVolume?: number
  soundProfile?: SoundProfile
  hapticEnabled?: boolean
  muteHoldPhases?: boolean        // mute sounds during hold phases
  rampConfig?: RampConfig | null  // optional ramp configuration
  onComplete?: (breathCount: number) => void
  onPhaseChange?: (phase: BreathPhase) => void
}

export function useBreathingTimer({
  pattern,
  duration,
  soundEnabled = true,
  soundVolume = 0.3,
  soundProfile = 'singing-bowl',
  hapticEnabled = true,
  muteHoldPhases = false,
  rampConfig = null,
  onComplete,
  onPhaseChange,
}: UseBreathingTimerOptions) {
  const [state, setState] = useState<BreathingTimerState>({
    phase: 'idle',
    phaseTimeRemaining: 0,
    phaseDuration: 0,
    totalTimeRemaining: duration,
    totalDuration: duration,
    breathCount: 0,
    isRunning: false,
    isPaused: false,
    progress: 0,
    currentPattern: rampConfig?.enabled ? rampConfig.startPattern : pattern,
    rampProgress: 0,
  })

  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const elapsedTimeRef = useRef<number>(0) // Track elapsed time for ramp
  const phasesRef = useRef(getActivePhases(rampConfig?.enabled ? rampConfig.startPattern : pattern))
  const phaseIndexRef = useRef(0)
  const countdownRef = useRef(3) // 3 second countdown

  // Update phases when pattern changes (only when not using ramp)
  useEffect(() => {
    if (!rampConfig?.enabled) {
      phasesRef.current = getActivePhases(pattern)
    }
  }, [pattern, rampConfig])

  // Update total duration when it changes
  useEffect(() => {
    if (!state.isRunning) {
      setState(s => ({
        ...s,
        totalTimeRemaining: duration,
        totalDuration: duration,
      }))
    }
  }, [duration, state.isRunning])

  const startPhase = useCallback((phaseIndex: number) => {
    const phases = phasesRef.current
    const phase = phases[phaseIndex % phases.length]

    setState(s => ({
      ...s,
      phase: phase.phase,
      phaseDuration: phase.duration,
      phaseTimeRemaining: phase.duration,
      progress: 0,
    }))

    if (soundEnabled) {
      playPhaseSound(phase.phase, soundVolume, soundProfile, muteHoldPhases)
    }
    if (hapticEnabled) {
      vibrate(phase.phase === 'inhale' || phase.phase === 'exhale' ? 50 : 30)
    }

    onPhaseChange?.(phase.phase)
  }, [soundEnabled, soundVolume, soundProfile, hapticEnabled, muteHoldPhases, onPhaseChange])

  const tick = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp
    }

    const deltaTime = (timestamp - lastTimeRef.current) / 1000
    lastTimeRef.current = timestamp

    let shouldContinue = true

    setState(prevState => {
      if (!prevState.isRunning || prevState.isPaused) {
        shouldContinue = false
        return prevState
      }

      // Handle countdown
      if (prevState.phase === 'countdown') {
        const newCountdown = prevState.phaseTimeRemaining - deltaTime

        if (newCountdown <= 0) {
          // Start first breathing phase - ALWAYS inhale
          elapsedTimeRef.current = 0 // Reset elapsed time for ramp

          // Get initial pattern (may be ramped start pattern)
          const currentPattern = rampConfig?.enabled
            ? getRampedPattern(rampConfig, 0)
            : pattern

          // Debug: log pattern after countdown
          console.log('🫁 Countdown complete, starting INHALE with pattern:', {
            name: currentPattern.name,
            inhale: currentPattern.inhale,
            hold1: currentPattern.hold1,
            exhale: currentPattern.exhale,
            hold2: currentPattern.hold2,
          })

          if (soundEnabled) {
            playPhaseSound('inhale', soundVolume, soundProfile, muteHoldPhases)
          }
          if (hapticEnabled) {
            vibrate(50)
          }

          onPhaseChange?.('inhale')

          return {
            ...prevState,
            phase: 'inhale',
            phaseDuration: currentPattern.inhale,
            phaseTimeRemaining: currentPattern.inhale,
            progress: 0,
            currentPattern,
            rampProgress: 0,
          }
        }

        // Countdown tick sound
        const prevSecond = Math.ceil(prevState.phaseTimeRemaining)
        const newSecond = Math.ceil(newCountdown)
        if (prevSecond !== newSecond && soundEnabled) {
          playPhaseSound('countdown', soundVolume, soundProfile, muteHoldPhases)
        }

        return {
          ...prevState,
          phaseTimeRemaining: newCountdown,
          progress: 1 - (newCountdown / 3),
        }
      }

      // Update elapsed time for ramp calculation
      elapsedTimeRef.current += deltaTime

      // Normal breathing phases
      let newPhaseTime = prevState.phaseTimeRemaining - deltaTime
      let newTotalTime = prevState.totalTimeRemaining - deltaTime
      let newBreathCount = prevState.breathCount
      let newPhase: BreathPhase = prevState.phase
      let newPhaseDuration = prevState.phaseDuration
      let newCurrentPattern = prevState.currentPattern
      let newRampProgress = prevState.rampProgress

      // Update ramped pattern if ramp is enabled
      if (rampConfig?.enabled) {
        const rampSeconds = rampConfig.rampDuration * 60
        newRampProgress = Math.min(elapsedTimeRef.current / rampSeconds, 1)

        // Only update pattern at the start of each breath cycle (on inhale)
        // to prevent jarring mid-breath changes
        if (prevState.phase === 'exhale' && newPhaseTime <= 0) {
          newCurrentPattern = getRampedPattern(rampConfig, elapsedTimeRef.current)
          phasesRef.current = getActivePhases(newCurrentPattern)
        }
      }

      // Check if session complete
      if (newTotalTime <= 0) {
        // Include final breath if we end during exhale
        const finalBreathCount = prevState.phase === 'exhale' ? newBreathCount + 1 : newBreathCount
        onComplete?.(finalBreathCount)
        // Stop the tick loop since session is complete
        shouldContinue = false
        return {
          ...prevState,
          phase: 'idle',
          phaseTimeRemaining: 0,
          totalTimeRemaining: 0,
          breathCount: finalBreathCount,
          isRunning: false,
          progress: 1,
          rampProgress: 1,
        }
      }

      // Check if phase complete
      if (newPhaseTime <= 0) {
        // EXPLICIT phase transition logic - no array indexing!
        // This ensures correct order: inhale → hold1 → exhale → hold2 → inhale
        let nextPhaseType: BreathPhase
        let nextPhaseDur: number

        switch (prevState.phase) {
          case 'inhale':
            // After inhale: go to hold1 if it exists, otherwise exhale
            if (newCurrentPattern.hold1 > 0) {
              nextPhaseType = 'hold1'
              nextPhaseDur = newCurrentPattern.hold1
            } else {
              nextPhaseType = 'exhale'
              nextPhaseDur = newCurrentPattern.exhale
            }
            break
          case 'hold1':
            // After hold1: always go to exhale
            nextPhaseType = 'exhale'
            nextPhaseDur = newCurrentPattern.exhale
            break
          case 'exhale':
            // After exhale: go to hold2 if it exists, otherwise inhale (new breath)
            newBreathCount++
            if (newCurrentPattern.hold2 > 0) {
              nextPhaseType = 'hold2'
              nextPhaseDur = newCurrentPattern.hold2
            } else {
              nextPhaseType = 'inhale'
              nextPhaseDur = newCurrentPattern.inhale
            }
            break
          case 'hold2':
            // After hold2: always go to inhale (new breath)
            nextPhaseType = 'inhale'
            nextPhaseDur = newCurrentPattern.inhale
            break
          default:
            nextPhaseType = 'inhale'
            nextPhaseDur = newCurrentPattern.inhale
        }

        // DEBUG: Log phase transition
        console.log('🔄 PHASE TRANSITION:', {
          from: prevState.phase,
          to: nextPhaseType,
          pattern: newCurrentPattern.name,
          hold1: newCurrentPattern.hold1,
          hold2: newCurrentPattern.hold2,
        })

        newPhase = nextPhaseType
        newPhaseDuration = nextPhaseDur
        newPhaseTime = nextPhaseDur

        if (soundEnabled) {
          playPhaseSound(nextPhaseType, soundVolume, soundProfile, muteHoldPhases)
        }
        if (hapticEnabled) {
          vibrate(nextPhaseType === 'inhale' || nextPhaseType === 'exhale' ? 50 : 30)
        }

        onPhaseChange?.(nextPhaseType)
      }

      const progress = 1 - (newPhaseTime / newPhaseDuration)

      return {
        ...prevState,
        phase: newPhase,
        phaseTimeRemaining: Math.max(0, newPhaseTime),
        phaseDuration: newPhaseDuration,
        totalTimeRemaining: Math.max(0, newTotalTime),
        breathCount: newBreathCount,
        progress,
        currentPattern: newCurrentPattern,
        rampProgress: newRampProgress,
      }
    })

    // Only schedule next tick if timer should continue
    if (shouldContinue) {
      animationRef.current = requestAnimationFrame(tick)
    }
  }, [soundEnabled, soundVolume, soundProfile, hapticEnabled, muteHoldPhases, rampConfig, pattern, onComplete, onPhaseChange])

  const start = useCallback(() => {
    // Cancel any existing animation frame to prevent multiple ticks
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Reset state
    phaseIndexRef.current = 0
    countdownRef.current = 3
    lastTimeRef.current = 0
    elapsedTimeRef.current = 0

    // Get initial pattern (may be ramped start pattern)
    const initialPattern = rampConfig?.enabled
      ? rampConfig.startPattern
      : pattern

    // CRITICAL: Explicitly set phasesRef to ensure correct phase order
    // This prevents stale phases from previous sessions
    phasesRef.current = getActivePhases(initialPattern)

    // Debug: log the pattern being used
    console.log('🫁 Timer starting with pattern:', {
      name: initialPattern.name,
      inhale: initialPattern.inhale,
      hold1: initialPattern.hold1,
      exhale: initialPattern.exhale,
      hold2: initialPattern.hold2,
      phases: phasesRef.current.map(p => `${p.phase}:${p.duration}s`)
    })

    setState(s => ({
      ...s,
      phase: 'countdown',
      phaseTimeRemaining: 3,
      phaseDuration: 3,
      totalTimeRemaining: s.totalDuration,
      breathCount: 0,
      isRunning: true,
      isPaused: false,
      progress: 0,
      currentPattern: initialPattern,
      rampProgress: 0,
    }))

    animationRef.current = requestAnimationFrame(tick)
  }, [tick, rampConfig, pattern])

  const pause = useCallback(() => {
    // Cancel animation frame when pausing to stop the tick loop
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    setState(s => ({ ...s, isPaused: true }))
  }, [])

  const resume = useCallback(() => {
    // Cancel any existing frame before resuming
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    lastTimeRef.current = 0
    setState(s => ({ ...s, isPaused: false }))
    animationRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stop = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    elapsedTimeRef.current = 0
    const initialPattern = rampConfig?.enabled
      ? rampConfig.startPattern
      : pattern
    setState(s => ({
      ...s,
      phase: 'idle',
      phaseTimeRemaining: 0,
      totalTimeRemaining: s.totalDuration,
      breathCount: 0,
      isRunning: false,
      isPaused: false,
      progress: 0,
      currentPattern: initialPattern,
      rampProgress: 0,
    }))
  }, [rampConfig, pattern])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    ...state,
    start,
    pause,
    resume,
    stop,
  }
}
