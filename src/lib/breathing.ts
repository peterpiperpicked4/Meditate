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

// ===== RAMP MODE =====
// Gradually change breath timings during a session

export interface RampConfig {
  enabled: boolean
  startPattern: BreathPattern    // Starting pattern (easier/shorter)
  endPattern: BreathPattern      // Ending pattern (target)
  rampDuration: number           // Minutes to reach target (0 = instant)
}

// Calculate current pattern based on ramp progress
export function getRampedPattern(
  config: RampConfig,
  elapsedSeconds: number
): BreathPattern {
  if (!config.enabled || config.rampDuration === 0) {
    return config.endPattern
  }

  const rampSeconds = config.rampDuration * 60
  const progress = Math.min(elapsedSeconds / rampSeconds, 1)

  // Ease-out for smoother transition
  const easedProgress = 1 - Math.pow(1 - progress, 2)

  return {
    id: 'ramped',
    name: 'Ramping',
    description: `Transitioning to ${config.endPattern.name}`,
    inhale: lerp(config.startPattern.inhale, config.endPattern.inhale, easedProgress),
    hold1: lerp(config.startPattern.hold1, config.endPattern.hold1, easedProgress),
    exhale: lerp(config.startPattern.exhale, config.endPattern.exhale, easedProgress),
    hold2: lerp(config.startPattern.hold2, config.endPattern.hold2, easedProgress),
  }
}

// Linear interpolation helper
function lerp(start: number, end: number, t: number): number {
  return Math.round((start + (end - start) * t) * 10) / 10 // Round to 1 decimal
}

// ===== PURPOSE PRESETS =====
// Quick-start configurations for common use cases

export type PurposePresetId = 'sleep' | 'stress' | 'focus' | 'energy' | 'lung-strength'

export interface PurposePreset {
  id: PurposePresetId
  name: string
  description: string
  icon: string  // Lucide icon name
  pattern: BreathPattern
  duration: number  // minutes
  rampConfig?: RampConfig
  ambientSound?: AmbientSound | null
  soundProfile?: SoundProfile
}

export const PURPOSE_PRESETS: PurposePreset[] = [
  {
    id: 'sleep',
    name: 'Fall Asleep',
    description: 'Calm your nervous system for restful sleep',
    icon: 'Moon',
    pattern: {
      id: '4-7-8',
      name: '4-7-8 Relaxing',
      description: 'Dr. Weil\'s calming breath',
      inhale: 4,
      hold1: 7,
      exhale: 8,
      hold2: 0,
    },
    duration: 10,
    ambientSound: 'rain',
    soundProfile: 'warm-pad',
  },
  {
    id: 'stress',
    name: 'Stress Relief',
    description: 'Quick reset for anxious moments',
    icon: 'Heart',
    pattern: {
      id: 'physiological-sigh',
      name: 'Physiological Sigh',
      description: 'Stanford research-backed',
      inhale: 4,
      hold1: 0,
      exhale: 6,
      hold2: 0,
    },
    duration: 5,
    ambientSound: 'ocean',
    soundProfile: 'ocean-breath',
  },
  {
    id: 'focus',
    name: 'Deep Focus',
    description: 'Sharpen attention and clarity',
    icon: 'Target',
    pattern: {
      id: 'box',
      name: 'Box Breathing',
      description: 'Navy SEAL technique',
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
    },
    duration: 8,
    ambientSound: null,
    soundProfile: 'minimal',
  },
  {
    id: 'energy',
    name: 'Morning Energy',
    description: 'Invigorate and awaken your body',
    icon: 'Zap',
    pattern: {
      id: 'energizing',
      name: 'Energizing Breath',
      description: 'Short inhale, short exhale, quick pace',
      inhale: 3,
      hold1: 0,
      exhale: 3,
      hold2: 0,
    },
    duration: 5,
    ambientSound: 'forest',
    soundProfile: 'soft-chime',
  },
  {
    id: 'lung-strength',
    name: 'Lung Training',
    description: 'Build capacity with progressive holds',
    icon: 'Wind',
    pattern: {
      id: 'lung-builder',
      name: 'Lung Builder',
      description: 'Extended holds for capacity',
      inhale: 5,
      hold1: 10,
      exhale: 5,
      hold2: 5,
    },
    duration: 10,
    rampConfig: {
      enabled: true,
      startPattern: {
        id: 'lung-start',
        name: 'Lung Start',
        description: 'Easy start',
        inhale: 4,
        hold1: 4,
        exhale: 4,
        hold2: 2,
      },
      endPattern: {
        id: 'lung-builder',
        name: 'Lung Builder',
        description: 'Extended holds',
        inhale: 5,
        hold1: 10,
        exhale: 5,
        hold2: 5,
      },
      rampDuration: 5, // 5 minutes to reach full pattern
    },
    ambientSound: 'wind',
    soundProfile: 'singing-bowl',
  },
]

// ===== BREATHING STREAKS =====
// Track consecutive days of breathing practice

export interface BreathingStreakData {
  currentStreak: number
  longestStreak: number
  lastPracticeDate: string | null  // ISO date string (YYYY-MM-DD)
  totalSessions: number
  totalMinutes: number
  practiceHistory: string[]  // Array of ISO date strings
}

const BREATHING_STREAK_KEY = 'ztd_breathing_streaks'

// Helper to safely log errors in development only
function logStreakError(context: string, error: unknown): void {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.warn(`[BreathingStreaks] ${context}:`, error)
  }
}

export function getBreathingStreaks(): BreathingStreakData {
  if (typeof window === 'undefined') {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      totalSessions: 0,
      totalMinutes: 0,
      practiceHistory: [],
    }
  }

  try {
    const stored = localStorage.getItem(BREATHING_STREAK_KEY)
    if (stored) {
      const data = JSON.parse(stored) as BreathingStreakData
      // Recalculate current streak based on today's date
      return recalculateStreak(data)
    }
  } catch (e) {
    logStreakError('Failed to load breathing streaks', e)
  }

  return {
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    totalSessions: 0,
    totalMinutes: 0,
    practiceHistory: [],
  }
}

function recalculateStreak(data: BreathingStreakData): BreathingStreakData {
  if (!data.lastPracticeDate) {
    return { ...data, currentStreak: 0 }
  }

  const today = getDateString(new Date())
  const yesterday = getDateString(new Date(Date.now() - 86400000))
  const lastPractice = data.lastPracticeDate

  // If practiced today or yesterday, streak continues
  if (lastPractice === today || lastPractice === yesterday) {
    return data
  }

  // Streak broken - reset current but keep longest
  return {
    ...data,
    currentStreak: 0,
  }
}

export function recordBreathingSession(durationMinutes: number): BreathingStreakData {
  const data = getBreathingStreaks()
  const today = getDateString(new Date())
  const yesterday = getDateString(new Date(Date.now() - 86400000))

  // Update totals
  data.totalSessions += 1
  data.totalMinutes += durationMinutes

  // Check if already practiced today
  if (data.lastPracticeDate === today) {
    // Already practiced today, just update totals
    saveBreathingStreaks(data)
    return data
  }

  // Add to practice history if not already there
  if (!data.practiceHistory.includes(today)) {
    data.practiceHistory.push(today)
    // Keep only last 365 days
    if (data.practiceHistory.length > 365) {
      data.practiceHistory = data.practiceHistory.slice(-365)
    }
  }

  // Update streak
  if (data.lastPracticeDate === yesterday) {
    // Continuing streak
    data.currentStreak += 1
  } else if (!data.lastPracticeDate || data.currentStreak === 0) {
    // Starting new streak
    data.currentStreak = 1
  } else {
    // Streak was broken, starting fresh
    data.currentStreak = 1
  }

  // Update longest streak
  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak
  }

  data.lastPracticeDate = today
  saveBreathingStreaks(data)
  return data
}

function saveBreathingStreaks(data: BreathingStreakData): void {
  try {
    localStorage.setItem(BREATHING_STREAK_KEY, JSON.stringify(data))
  } catch (e) {
    logStreakError('Failed to save breathing streaks', e)
  }
}

// Get local date string (YYYY-MM-DD) to avoid timezone issues
// Using toISOString() would convert to UTC which can cause streak breaks at midnight
function getDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Get practice history for heatmap display
export function getBreathingPracticeHistory(): { date: string; practiced: boolean }[] {
  const data = getBreathingStreaks()
  const history: { date: string; practiced: boolean }[] = []
  const today = new Date()

  // Generate last 90 days
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = getDateString(date)
    history.push({
      date: dateStr,
      practiced: data.practiceHistory.includes(dateStr),
    })
  }

  return history
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

// ===== SOUND PROFILES =====

export type SoundProfile = 'singing-bowl' | 'soft-chime' | 'ocean-breath' | 'warm-pad' | 'minimal' | 'classic'

export interface SoundProfileInfo {
  id: SoundProfile
  name: string
  description: string
}

export const SOUND_PROFILES: SoundProfileInfo[] = [
  {
    id: 'singing-bowl',
    name: 'Singing Bowl',
    description: 'Rich, harmonic tones like a Tibetan singing bowl',
  },
  {
    id: 'soft-chime',
    name: 'Soft Chime',
    description: 'Gentle, airy bell-like sounds',
  },
  {
    id: 'ocean-breath',
    name: 'Ocean Breath',
    description: 'Soft whooshing sounds that mimic waves',
  },
  {
    id: 'warm-pad',
    name: 'Warm Pad',
    description: 'Ambient, enveloping tones',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Subtle, almost subliminal cues',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Simple sine wave tones',
  },
]

// Audio context singleton
let audioContext: AudioContext | null = null
let audioContextFailed = false

export function getAudioContext(): AudioContext {
  if (audioContextFailed) {
    throw new Error('AudioContext not supported')
  }
  if (!audioContext) {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) {
        audioContextFailed = true
        throw new Error('AudioContext not supported')
      }
      audioContext = new AudioContextClass()
    } catch (e) {
      audioContextFailed = true
      throw e
    }
  }
  return audioContext
}

// Resume audio context (needed for browser autoplay policy)
function resumeAudio(ctx: AudioContext): void {
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
}

// ===== SINGING BOWL =====
// Rich harmonics with long natural decay
function playSingingBowl(baseFreq: number, volume: number, duration: number = 2): void {
  const ctx = getAudioContext()
  resumeAudio(ctx)
  const now = ctx.currentTime

  // Harmonics of a singing bowl (fundamental + overtones)
  const harmonics = [1, 2.76, 5.4, 8.93]
  const harmonicVolumes = [1, 0.5, 0.25, 0.15]

  harmonics.forEach((harmonic, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.value = baseFreq * harmonic

    filter.type = 'lowpass'
    filter.frequency.value = 2000
    filter.Q.value = 1

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    const harmVol = volume * harmonicVolumes[i] * 0.3
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(harmVol, now + 0.05)
    // Long, natural decay
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    osc.start(now)
    osc.stop(now + duration)
  })
}

// ===== SOFT CHIME =====
// Bell-like with shimmer
function playSoftChime(baseFreq: number, volume: number): void {
  const ctx = getAudioContext()
  resumeAudio(ctx)
  const now = ctx.currentTime

  // Main tone
  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = 'triangle'
  osc1.frequency.value = baseFreq

  // Shimmer (slight detune)
  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.value = baseFreq * 2.01 // Slight detune for shimmer

  // High harmonic for sparkle
  const osc3 = ctx.createOscillator()
  const gain3 = ctx.createGain()
  osc3.type = 'sine'
  osc3.frequency.value = baseFreq * 3

  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.value = 200

  osc1.connect(gain1)
  osc2.connect(gain2)
  osc3.connect(gain3)
  gain1.connect(filter)
  gain2.connect(filter)
  gain3.connect(filter)
  filter.connect(ctx.destination)

  const vol = volume * 0.25
  const duration = 1.2

  // Bell-like envelope: quick attack, medium decay
  ;[gain1, gain2, gain3].forEach((g, i) => {
    const gVol = vol * [1, 0.3, 0.15][i]
    g.gain.setValueAtTime(0, now)
    g.gain.linearRampToValueAtTime(gVol, now + 0.01)
    g.gain.exponentialRampToValueAtTime(0.001, now + duration)
  })

  ;[osc1, osc2, osc3].forEach(o => {
    o.start(now)
    o.stop(now + duration)
  })
}

// ===== OCEAN BREATH =====
// Filtered noise that sounds like waves
function playOceanBreath(isInhale: boolean, volume: number): void {
  const ctx = getAudioContext()
  resumeAudio(ctx)
  const now = ctx.currentTime

  // Create noise
  const bufferSize = ctx.sampleRate * 0.8
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  // Pink-ish noise (softer than white)
  let b0 = 0, b1 = 0, b2 = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99765 * b0 + white * 0.0990460
    b1 = 0.96300 * b1 + white * 0.2965164
    b2 = 0.57000 * b2 + white * 1.0526913
    data[i] = (b0 + b1 + b2) * 0.15
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 0.5

  const gain = ctx.createGain()

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  const duration = 0.8
  const vol = volume * 0.4

  if (isInhale) {
    // Rising whoosh
    filter.frequency.setValueAtTime(200, now)
    filter.frequency.linearRampToValueAtTime(600, now + duration)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(vol, now + duration * 0.3)
    gain.gain.linearRampToValueAtTime(0, now + duration)
  } else {
    // Falling whoosh
    filter.frequency.setValueAtTime(500, now)
    filter.frequency.linearRampToValueAtTime(150, now + duration)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(vol, now + duration * 0.2)
    gain.gain.linearRampToValueAtTime(0, now + duration)
  }

  noise.start(now)
  noise.stop(now + duration)
}

// ===== WARM PAD =====
// Soft, ambient drone
function playWarmPad(baseFreq: number, volume: number, duration: number = 1.5): void {
  const ctx = getAudioContext()
  resumeAudio(ctx)
  const now = ctx.currentTime

  // Multiple detuned oscillators for warmth
  const detunes = [-5, 0, 5, 7]

  detunes.forEach((detune) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.value = baseFreq
    osc.detune.value = detune

    filter.type = 'lowpass'
    filter.frequency.value = baseFreq * 2
    filter.Q.value = 0.5

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    const vol = volume * 0.15
    // Slow, gentle envelope
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(vol, now + duration * 0.4)
    gain.gain.linearRampToValueAtTime(0, now + duration)

    osc.start(now)
    osc.stop(now + duration)
  })
}

// ===== MINIMAL =====
// Very subtle, almost subliminal
function playMinimal(baseFreq: number, volume: number): void {
  const ctx = getAudioContext()
  resumeAudio(ctx)
  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sine'
  osc.frequency.value = baseFreq

  filter.type = 'lowpass'
  filter.frequency.value = 500

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  const vol = volume * 0.1
  const duration = 0.3

  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(vol, now + 0.05)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

  osc.start(now)
  osc.stop(now + duration)
}

// ===== CLASSIC =====
// Simple sine (original)
function playClassic(frequency: number, volume: number, duration: number = 0.2): void {
  const ctx = getAudioContext()
  resumeAudio(ctx)

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.type = 'sine'
  oscillator.frequency.value = frequency

  const now = ctx.currentTime
  gainNode.gain.setValueAtTime(0, now)
  gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + 0.02)
  gainNode.gain.linearRampToValueAtTime(0, now + duration)

  oscillator.start(now)
  oscillator.stop(now + duration)
}

// Main function to play phase sounds with selected profile
export function playPhaseSound(
  phase: BreathPhase,
  volume: number = 0.3,
  profile: SoundProfile = 'singing-bowl',
  muteHoldPhases: boolean = false
): void {
  try {
    // Skip hold sounds if mute during holds is enabled
    if (muteHoldPhases && (phase === 'hold1' || phase === 'hold2')) {
      return
    }

    const freqs: Record<BreathPhase, number> = {
      inhale: 396,    // G4 - grounding
      exhale: 264,    // C4 - calming
      hold1: 330,     // E4 - gentle
      hold2: 330,
      countdown: 440,
      idle: 396,
    }

    const freq = freqs[phase]

    switch (profile) {
      case 'singing-bowl':
        if (phase === 'countdown') {
          playMinimal(440, volume)
        } else if (phase === 'inhale') {
          playSingingBowl(396, volume, 1.5)
        } else if (phase === 'exhale') {
          playSingingBowl(264, volume, 2)
        } else {
          playSingingBowl(330, volume * 0.5, 1)
        }
        break

      case 'soft-chime':
        if (phase === 'countdown') {
          playSoftChime(880, volume * 0.5)
        } else if (phase === 'inhale') {
          playSoftChime(528, volume)
        } else if (phase === 'exhale') {
          playSoftChime(396, volume)
        } else {
          playSoftChime(440, volume * 0.4)
        }
        break

      case 'ocean-breath':
        if (phase === 'inhale' || phase === 'exhale') {
          playOceanBreath(phase === 'inhale', volume)
        }
        // No sound for holds - just silence
        break

      case 'warm-pad':
        if (phase === 'countdown') {
          playMinimal(440, volume)
        } else if (phase === 'inhale') {
          playWarmPad(264, volume, 1.2)
        } else if (phase === 'exhale') {
          playWarmPad(198, volume, 1.5)
        }
        // Holds are silent for pad
        break

      case 'minimal':
        if (phase !== 'hold1' && phase !== 'hold2') {
          playMinimal(freq, volume)
        }
        break

      case 'classic':
      default:
        playClassic(freq, volume)
        break
    }
  } catch (e) {
    console.warn('Audio playback failed:', e)
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
  muteHoldPhases: boolean  // mute sounds during hold phases
  ambientSound: AmbientSound | null  // background ambient sound
  ambientVolume: number  // 0-1 volume for ambient sounds
  rampEnabled: boolean  // enable ramp mode
  rampDuration: number  // minutes to reach target pattern
}

export const DEFAULT_BREATHING_SETTINGS: BreathingSettings = {
  soundEnabled: true,
  soundVolume: 0.3,
  hapticEnabled: true,
  defaultDuration: 5,
  muteHoldPhases: false,
  ambientSound: null,
  ambientVolume: 0.1,  // Default 10% volume
  rampEnabled: false,
  rampDuration: 3,
}

// ===== AMBIENT SOUNDS =====

export type AmbientSound = 'rain' | 'ocean' | 'forest' | 'wind' | 'fire'

export interface AmbientSoundInfo {
  id: AmbientSound
  name: string
  description: string
}

export const AMBIENT_SOUNDS: AmbientSoundInfo[] = [
  {
    id: 'rain',
    name: 'Gentle Rain',
    description: 'Soft rainfall on leaves',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Rhythmic waves on shore',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Birds and rustling leaves',
  },
  {
    id: 'wind',
    name: 'Soft Wind',
    description: 'Gentle breeze through trees',
  },
  {
    id: 'fire',
    name: 'Crackling Fire',
    description: 'Warm fireplace crackles',
  },
]

// Ambient sound state
let ambientNodes: {
  source: AudioBufferSourceNode | OscillatorNode | null
  gain: GainNode | null
  filter: BiquadFilterNode | null
  noiseSource?: AudioBufferSourceNode | null
} | null = null

// Cache for ambient sound buffers (prevents regeneration on each start)
const ambientBufferCache = new Map<string, AudioBuffer>()

// Get cached buffer or generate new one
function getAmbientBuffer(ctx: AudioContext, type: AmbientSound, duration: number = 4): AudioBuffer {
  const cacheKey = `${type}-${duration}-${ctx.sampleRate}`

  // Return cached buffer if available and sample rate matches
  const cached = ambientBufferCache.get(cacheKey)
  if (cached) {
    return cached
  }

  // Generate new buffer and cache it
  const buffer = generateAmbientBuffer(ctx, type, duration)
  ambientBufferCache.set(cacheKey, buffer)

  return buffer
}

// Generate ambient sound buffer (internal - use getAmbientBuffer for caching)
function generateAmbientBuffer(ctx: AudioContext, type: AmbientSound, duration: number = 4): AudioBuffer {
  const sampleRate = ctx.sampleRate
  const bufferSize = sampleRate * duration
  const buffer = ctx.createBuffer(2, bufferSize, sampleRate)
  const leftChannel = buffer.getChannelData(0)
  const rightChannel = buffer.getChannelData(1)

  // Pink noise generator state
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1

    // Pink noise filter (Paul Kellet's refined method)
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.96900 * b2 + white * 0.1538520
    b3 = 0.86650 * b3 + white * 0.3104856
    b4 = 0.55000 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.0168980
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
    b6 = white * 0.115926

    let sample = 0
    const t = i / sampleRate

    switch (type) {
      case 'rain':
        // Soft pink noise with occasional droplet sounds
        sample = pink * 0.15
        // Random droplets
        if (Math.random() < 0.0003) {
          const dropletFreq = 800 + Math.random() * 400
          const dropletDecay = Math.exp(-((i % (sampleRate * 0.05)) / sampleRate) * 50)
          sample += Math.sin(2 * Math.PI * dropletFreq * t) * dropletDecay * 0.1
        }
        break

      case 'ocean':
        // Layered waves with slow modulation
        const waveFreq = 0.08 + Math.sin(t * 0.02) * 0.02
        const waveMod = (Math.sin(2 * Math.PI * waveFreq * t) + 1) * 0.5
        sample = pink * 0.2 * (0.3 + waveMod * 0.7)
        break

      case 'forest':
        // Light wind with bird-like chirps
        sample = pink * 0.08
        // Occasional chirps
        if (Math.random() < 0.0001) {
          const chirpFreq = 2000 + Math.random() * 2000
          const chirpEnv = Math.exp(-((i % (sampleRate * 0.1)) / sampleRate) * 30)
          sample += Math.sin(2 * Math.PI * chirpFreq * t * (1 + Math.sin(t * 50) * 0.1)) * chirpEnv * 0.05
        }
        break

      case 'wind':
        // Filtered noise with slow sweeping
        const windMod = (Math.sin(t * 0.3) + Math.sin(t * 0.17)) * 0.25 + 0.5
        sample = pink * 0.12 * windMod
        break

      case 'fire':
        // Crackling with low rumble
        sample = pink * 0.1
        // Random crackles
        if (Math.random() < 0.002) {
          const crackleEnv = Math.exp(-((i % (sampleRate * 0.03)) / sampleRate) * 100)
          sample += (Math.random() * 2 - 1) * crackleEnv * 0.15
        }
        // Low rumble
        sample += Math.sin(2 * Math.PI * 60 * t) * 0.02
        break
    }

    // Slight stereo variation
    leftChannel[i] = sample * (0.9 + Math.random() * 0.1)
    rightChannel[i] = sample * (0.9 + Math.random() * 0.1)
  }

  return buffer
}

// Ambient volume multiplier - reduces max volume to prevent overpowering
const AMBIENT_VOLUME_MULTIPLIER = 0.5

// Start ambient sound loop
export function startAmbientSound(type: AmbientSound, volume: number = 0.08): void {
  try {
    const ctx = getAudioContext()
    resumeAudio(ctx)

    // Stop any existing ambient sound
    stopAmbientSound()

    // Use cached buffer for better performance
    const buffer = getAmbientBuffer(ctx, type, 4)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    // Apply volume multiplier to reduce overall loudness
    const adjustedVolume = volume * AMBIENT_VOLUME_MULTIPLIER

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(adjustedVolume, ctx.currentTime + 1) // Fade in

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = type === 'rain' ? 3000 : type === 'ocean' ? 1500 : 2500

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    source.start()

    ambientNodes = { source, gain, filter }
  } catch (e) {
    console.warn('Failed to start ambient sound:', e)
  }
}

// Stop ambient sound with fade out
export function stopAmbientSound(): void {
  if (ambientNodes?.gain && ambientNodes?.source) {
    try {
      const ctx = getAudioContext()
      ambientNodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
      setTimeout(() => {
        try {
          ambientNodes?.source?.stop()
        } catch (e) {
          // Already stopped
        }
        ambientNodes = null
      }, 600)
    } catch (e) {
      ambientNodes = null
    }
  }
}

// Update ambient volume
export function setAmbientVolume(volume: number): void {
  if (ambientNodes?.gain) {
    try {
      const ctx = getAudioContext()
      const adjustedVolume = volume * AMBIENT_VOLUME_MULTIPLIER
      ambientNodes.gain.gain.linearRampToValueAtTime(adjustedVolume, ctx.currentTime + 0.1)
    } catch (e) {
      // Ignore
    }
  }
}

// Preview a sound profile (short sample)
export function previewSoundProfile(profile: SoundProfile, volume: number = 0.3): void {
  playPhaseSound('inhale', volume, profile)
}

// Preview an ambient sound (3-second sample)
let previewTimeout: ReturnType<typeof setTimeout> | null = null

export function previewAmbientSound(type: AmbientSound, volume: number = 0.08): void {
  // Clear any existing preview
  if (previewTimeout) {
    clearTimeout(previewTimeout)
    stopAmbientSound()
  }

  startAmbientSound(type, volume)

  previewTimeout = setTimeout(() => {
    stopAmbientSound()
    previewTimeout = null
  }, 3000)
}

// Check if audio is supported
export function isAudioSupported(): boolean {
  return typeof window !== 'undefined' &&
    (typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined')
}
