'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  BreathPhase,
  BreathPattern,
  SoundProfile,
  getActivePhases,
  getCycleDuration,
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
}

interface UseBreathingTimerOptions {
  pattern: BreathPattern
  duration: number                // total session duration in seconds
  soundEnabled?: boolean
  soundVolume?: number
  soundProfile?: SoundProfile
  hapticEnabled?: boolean
  muteHoldPhases?: boolean        // mute sounds during hold phases
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
  })

  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const phasesRef = useRef(getActivePhases(pattern))
  const phaseIndexRef = useRef(0)
  const countdownRef = useRef(3) // 3 second countdown

  // Update phases when pattern changes
  useEffect(() => {
    phasesRef.current = getActivePhases(pattern)
  }, [pattern])

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

    setState(prevState => {
      if (!prevState.isRunning || prevState.isPaused) {
        return prevState
      }

      // Handle countdown
      if (prevState.phase === 'countdown') {
        const newCountdown = prevState.phaseTimeRemaining - deltaTime

        if (newCountdown <= 0) {
          // Start first breathing phase
          phaseIndexRef.current = 0
          const phases = phasesRef.current
          const firstPhase = phases[0]

          if (soundEnabled) {
            playPhaseSound(firstPhase.phase, soundVolume, soundProfile, muteHoldPhases)
          }
          if (hapticEnabled) {
            vibrate(50)
          }

          onPhaseChange?.(firstPhase.phase)

          return {
            ...prevState,
            phase: firstPhase.phase,
            phaseDuration: firstPhase.duration,
            phaseTimeRemaining: firstPhase.duration,
            progress: 0,
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

      // Normal breathing phases
      let newPhaseTime = prevState.phaseTimeRemaining - deltaTime
      let newTotalTime = prevState.totalTimeRemaining - deltaTime
      let newBreathCount = prevState.breathCount
      let newPhase: BreathPhase = prevState.phase
      let newPhaseDuration = prevState.phaseDuration

      // Check if session complete
      if (newTotalTime <= 0) {
        // Include final breath if we end during exhale
        const finalBreathCount = prevState.phase === 'exhale' ? newBreathCount + 1 : newBreathCount
        onComplete?.(finalBreathCount)
        return {
          ...prevState,
          phase: 'idle',
          phaseTimeRemaining: 0,
          totalTimeRemaining: 0,
          breathCount: finalBreathCount,
          isRunning: false,
          progress: 1,
        }
      }

      // Check if phase complete
      if (newPhaseTime <= 0) {
        phaseIndexRef.current++
        const phases = phasesRef.current
        const nextPhaseIndex = phaseIndexRef.current % phases.length
        const nextPhase = phases[nextPhaseIndex]

        // Count breath on exhale completion
        if (prevState.phase === 'exhale') {
          newBreathCount++
        }

        newPhase = nextPhase.phase
        newPhaseDuration = nextPhase.duration
        newPhaseTime = nextPhase.duration

        if (soundEnabled) {
          playPhaseSound(nextPhase.phase, soundVolume, soundProfile, muteHoldPhases)
        }
        if (hapticEnabled) {
          vibrate(nextPhase.phase === 'inhale' || nextPhase.phase === 'exhale' ? 50 : 30)
        }

        onPhaseChange?.(nextPhase.phase)
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
      }
    })

    animationRef.current = requestAnimationFrame(tick)
  }, [soundEnabled, soundVolume, soundProfile, hapticEnabled, muteHoldPhases, onComplete, onPhaseChange])

  const start = useCallback(() => {
    // Reset state
    phaseIndexRef.current = 0
    countdownRef.current = 3
    lastTimeRef.current = 0

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
    }))

    animationRef.current = requestAnimationFrame(tick)
  }, [tick])

  const pause = useCallback(() => {
    setState(s => ({ ...s, isPaused: true }))
  }, [])

  const resume = useCallback(() => {
    lastTimeRef.current = 0
    setState(s => ({ ...s, isPaused: false }))
    animationRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stop = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setState(s => ({
      ...s,
      phase: 'idle',
      phaseTimeRemaining: 0,
      totalTimeRemaining: s.totalDuration,
      breathCount: 0,
      isRunning: false,
      isPaused: false,
      progress: 0,
    }))
  }, [])

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
