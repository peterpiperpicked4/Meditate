// Breathing timer types and utilities

export type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle' | 'countdown'

export interface BreathPattern {
  id: string
  name: string
  description: string
  inhale: number      // seconds
  hold1: number       // hold after inhale (0 to skip)
  exhale: number      // seconds
  hold2: number       // hold after exhale (0 to skip)
}

export interface BreathingSession {
  pattern: BreathPattern
  duration: number    // total session duration in seconds
  startedAt?: number
  completedAt?: number
  breathCount?: number
}

// Preset breathing patterns
export const BREATH_PRESETS: BreathPattern[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Relaxing',
    description: 'Dr. Weil\'s calming breath. Great for sleep and anxiety.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    description: '5.5 breaths per minute. Optimal for heart rate variability.',
    inhale: 5.5,
    hold1: 0,
    exhale: 5.5,
    hold2: 0,
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Navy SEAL technique. Equal parts inhale, hold, exhale, hold.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
  },
  {
    id: 'physiological-sigh',
    name: 'Physiological Sigh',
    description: 'Stanford research-backed. Double inhale, long exhale.',
    inhale: 4,  // Two-part inhale represented as single longer inhale
    hold1: 0,
    exhale: 6,
    hold2: 0,
  },
  {
    id: 'simple-calm',
    name: 'Simple Calm',
    description: 'Easy 4-6 pattern. Good for beginners.',
    inhale: 4,
    hold1: 0,
    exhale: 6,
    hold2: 0,
  },
]

// Get total cycle duration for a pattern
export function getCycleDuration(pattern: BreathPattern): number {
  return pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2
}

// Get phases for a pattern (skipping holds that are 0)
export function getActivePhases(pattern: BreathPattern): { phase: BreathPhase; duration: number }[] {
  const phases: { phase: BreathPhase; duration: number }[] = []

  phases.push({ phase: 'inhale', duration: pattern.inhale })
  if (pattern.hold1 > 0) {
    phases.push({ phase: 'hold1', duration: pattern.hold1 })
  }
  phases.push({ phase: 'exhale', duration: pattern.exhale })
  if (pattern.hold2 > 0) {
    phases.push({ phase: 'hold2', duration: pattern.hold2 })
  }

  return phases
}

// Format phase for display
export function formatPhase(phase: BreathPhase): string {
  switch (phase) {
    case 'inhale': return 'Inhale'
    case 'hold1': return 'Hold'
    case 'exhale': return 'Exhale'
    case 'hold2': return 'Hold'
    case 'countdown': return 'Get Ready'
    default: return ''
  }
}

// Audio context singleton
let audioContext: AudioContext | null = null

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

// Play a gentle tone for phase transitions
export function playTransitionTone(
  frequency: number = 432,
  duration: number = 0.15,
  volume: number = 0.3
): void {
  try {
    const ctx = getAudioContext()

    // Resume if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.value = frequency

    // Envelope for smooth sound
    const now = ctx.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.02)
    gainNode.gain.linearRampToValueAtTime(0, now + duration)

    oscillator.start(now)
    oscillator.stop(now + duration)
  } catch (e) {
    // Audio not supported or blocked
    console.warn('Audio playback failed:', e)
  }
}

// Different tones for different phases
export function playPhaseSound(phase: BreathPhase, volume: number = 0.3): void {
  switch (phase) {
    case 'inhale':
      playTransitionTone(528, 0.2, volume)  // Higher tone for inhale
      break
    case 'exhale':
      playTransitionTone(396, 0.2, volume)  // Lower tone for exhale
      break
    case 'hold1':
    case 'hold2':
      playTransitionTone(432, 0.1, volume)  // Subtle tone for hold
      break
    case 'countdown':
      playTransitionTone(440, 0.1, volume)  // Countdown tick
      break
  }
}

// Haptic feedback (mobile)
export function vibrate(duration: number = 50): void {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration)
  }
}

// Format time display
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Storage keys
export const BREATHING_STORAGE_KEYS = {
  lastPattern: 'ztd_breathing_last_pattern',
  customProfiles: 'ztd_breathing_profiles',
  settings: 'ztd_breathing_settings',
}

// Default settings
export interface BreathingSettings {
  soundEnabled: boolean
  soundVolume: number
  hapticEnabled: boolean
  defaultDuration: number  // in minutes
}

export const DEFAULT_BREATHING_SETTINGS: BreathingSettings = {
  soundEnabled: true,
  soundVolume: 0.3,
  hapticEnabled: true,
  defaultDuration: 5,
}
