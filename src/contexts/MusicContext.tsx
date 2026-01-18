'use client'

import * as React from 'react'

export interface MusicTrack {
  id: string
  name: string
  src: string
}

export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'peace', name: 'Peace', src: '/music/Peace.mp3' },
  { id: 'at-rest', name: 'At Rest', src: '/music/At Rest.mp3' },
  { id: 'inside', name: 'Inside', src: '/music/Inside.mp3' },
  { id: 'space-between', name: 'The Space Between', src: '/music/The Space Between.mp3' },
  { id: 'toward-stillness', name: 'Toward Stillness', src: '/music/Toward Stillness.mp3' },
  { id: 'the-pause', name: 'The Pause', src: '/music/The Pause.mp3' },
  { id: 'morning-mist', name: 'Morning Mist', src: '/music/Morning Mist.mp3' },
  { id: 'breathe', name: 'Breathe', src: '/music/Breathe.mp3' },
]

interface MusicContextType {
  currentTrack: MusicTrack | null
  isPlaying: boolean
  volume: number
  isLooping: boolean
  setVolume: (volume: number) => void
  setLooping: (loop: boolean) => void
  play: (track?: MusicTrack) => void
  pause: () => void
  toggle: () => void
  selectTrack: (track: MusicTrack) => void
  nextTrack: () => void
  prevTrack: () => void
}

const MusicContext = React.createContext<MusicContextType | null>(null)

const MUSIC_STORAGE_KEY = 'ztd_music_settings'
const DEFAULT_VOLUME = 0.3

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = React.useState<MusicTrack | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [volume, setVolumeState] = React.useState(DEFAULT_VOLUME)
  const [isLooping, setIsLooping] = React.useState(true) // Loop by default
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  // Load saved settings
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(MUSIC_STORAGE_KEY)
      if (saved) {
        const settings = JSON.parse(saved)
        if (settings.volume !== undefined) {
          // Migration: reset volume to 30% if user had old 40-50% default
          setVolumeState(settings.volume >= 0.4 ? 0.3 : settings.volume)
        }
        if (settings.isLooping !== undefined) {
          setIsLooping(settings.isLooping)
        }
        if (settings.trackId) {
          const track = MUSIC_TRACKS.find(t => t.id === settings.trackId)
          if (track) {
            setCurrentTrack(track)
          }
        }
      }
    } catch (e) {
      // Ignore
    }
  }, [])

  // Save settings when they change
  React.useEffect(() => {
    try {
      localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify({
        volume,
        isLooping,
        trackId: currentTrack?.id,
      }))
    } catch (e) {
      // Ignore
    }
  }, [volume, isLooping, currentTrack])

  // Refs to track state for event handler
  const isLoopingRef = React.useRef(isLooping)
  const currentTrackRef = React.useRef(currentTrack)

  React.useEffect(() => {
    isLoopingRef.current = isLooping
  }, [isLooping])

  React.useEffect(() => {
    currentTrackRef.current = currentTrack
  }, [currentTrack])

  // Initialize audio element
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.loop = false // We handle looping manually for next track feature
    audio.volume = volume
    audioRef.current = audio

    audio.addEventListener('ended', () => {
      if (isLoopingRef.current) {
        // Repeat same track
        audio.currentTime = 0
        audio.play()
      } else {
        // Go to next track
        const current = currentTrackRef.current
        const currentIndex = current ? MUSIC_TRACKS.findIndex(t => t.id === current.id) : -1
        const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length
        const next = MUSIC_TRACKS[nextIndex]
        setCurrentTrack(next)
        audio.src = next.src
        audio.load()
        audio.play().catch(() => {})
      }
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Update loop setting on audio element
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping
    }
  }, [isLooping])

  // Update volume on audio element
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Handle track changes
  React.useEffect(() => {
    if (!audioRef.current || !currentTrack) return

    const wasPlaying = isPlaying
    audioRef.current.pause()
    audioRef.current.src = currentTrack.src
    audioRef.current.load()

    if (wasPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [currentTrack])

  const setVolume = React.useCallback((newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)))
  }, [])

  const setLooping = React.useCallback((loop: boolean) => {
    setIsLooping(loop)
  }, [])

  const play = React.useCallback((track?: MusicTrack) => {
    if (track) {
      setCurrentTrack(track)
    }

    const trackToPlay = track || currentTrack || MUSIC_TRACKS[0]

    if (!currentTrack && !track) {
      setCurrentTrack(trackToPlay)
    }

    if (audioRef.current) {
      audioRef.current.src = trackToPlay.src
      audioRef.current.load()

      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [currentTrack])

  const pause = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggle = React.useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  const selectTrack = React.useCallback((track: MusicTrack) => {
    setCurrentTrack(track)
    if (isPlaying && audioRef.current) {
      audioRef.current.src = track.src
      audioRef.current.load()
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [isPlaying])

  const nextTrack = React.useCallback(() => {
    const currentIndex = currentTrack
      ? MUSIC_TRACKS.findIndex(t => t.id === currentTrack.id)
      : -1
    const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length
    const next = MUSIC_TRACKS[nextIndex]
    setCurrentTrack(next)
    if (audioRef.current) {
      audioRef.current.src = next.src
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }
  }, [currentTrack, isPlaying])

  const prevTrack = React.useCallback(() => {
    const currentIndex = currentTrack
      ? MUSIC_TRACKS.findIndex(t => t.id === currentTrack.id)
      : 0
    const prevIndex = currentIndex <= 0 ? MUSIC_TRACKS.length - 1 : currentIndex - 1
    const prev = MUSIC_TRACKS[prevIndex]
    setCurrentTrack(prev)
    if (audioRef.current) {
      audioRef.current.src = prev.src
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }
  }, [currentTrack, isPlaying])

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      volume,
      isLooping,
      setVolume,
      setLooping,
      play,
      pause,
      toggle,
      selectTrack,
      nextTrack,
      prevTrack,
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = React.useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
