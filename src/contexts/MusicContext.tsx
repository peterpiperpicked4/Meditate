'use client'

import * as React from 'react'

export interface MusicTrack {
  id: string
  name: string
  src: string
}

export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'morning-mist', name: 'Morning Mist', src: '/music/Morning Mist.mp3' },
  { id: 'space-between', name: 'The Space Between', src: '/music/The Space Between.mp3' },
  { id: 'peace', name: 'Peace', src: '/music/Peace.mp3' },
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
}

const MusicContext = React.createContext<MusicContextType | null>(null)

const MUSIC_STORAGE_KEY = 'ztd_music_settings'
const DEFAULT_VOLUME = 0.5

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
          setVolumeState(settings.volume)
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

  // Initialize audio element
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.loop = isLooping
    audio.volume = volume
    audioRef.current = audio

    audio.addEventListener('ended', () => {
      // If looping is enabled but event fires, restart
      if (isLooping) {
        audio.currentTime = 0
        audio.play()
      } else {
        setIsPlaying(false)
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
      if (!audioRef.current.src || audioRef.current.src !== trackToPlay.src) {
        audioRef.current.src = trackToPlay.src
        audioRef.current.load()
      }
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
