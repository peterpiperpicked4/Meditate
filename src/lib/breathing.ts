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

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
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
  profile: SoundProfile = 'singing-bowl'
): void {
  try {
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
}

export const DEFAULT_BREATHING_SETTINGS: BreathingSettings = {
  soundEnabled: true,
  soundVolume: 0.3,
  hapticEnabled: true,
  defaultDuration: 5,
}
