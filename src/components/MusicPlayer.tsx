'use client'

import * as React from 'react'
import { Music, Play, Pause, Volume2, VolumeX, ChevronDown, Repeat, SkipForward, SkipBack } from 'lucide-react'
import { useMusic, MUSIC_TRACKS } from '@/contexts/MusicContext'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

export function MusicPlayer() {
  const { currentTrack, isPlaying, volume, isLooping, setVolume, setLooping, toggle, selectTrack, nextTrack, prevTrack } = useMusic()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [prevVolume, setPrevVolume] = React.useState(volume)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Click outside to close
  React.useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpanded])

  // M keyboard shortcut to toggle music
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'm' || e.key === 'M') {
        if (!e.ctrlKey && !e.metaKey) {
          toggle()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggle])

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(prevVolume)
      setIsMuted(false)
    } else {
      setPrevVolume(volume)
      setVolume(0)
      setIsMuted(true)
    }
  }

  return (
    <div ref={containerRef} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50">
      {/* Expanded panel */}
      <div
        ref={panelRef}
        className={cn(
          'absolute bottom-full right-0 mb-2 w-[calc(100vw-2rem)] max-w-64 rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden transition-all duration-200',
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <h3 className="text-sm font-medium text-muted-foreground">Background Music</h3>

          {/* Track selection */}
          <div className="space-y-2" role="radiogroup" aria-label="Select background music">
            {MUSIC_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => selectTrack(track)}
                role="radio"
                aria-checked={currentTrack?.id === track.id}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg border transition-all min-h-[44px]',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  currentTrack?.id === track.id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50 hover:bg-background'
                )}
              >
                <Music className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium truncate">{track.name}</span>
                {currentTrack?.id === track.id && isPlaying && (
                  <span className="ml-auto flex gap-0.5 items-end" aria-label="Now playing">
                    <span className="w-1 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1 h-2.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Playback controls */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={prevTrack}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Previous track"
            >
              <SkipBack className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={toggle}
              className={cn(
                'p-3 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center',
                isPlaying ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-foreground hover:bg-muted'
              )}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <button
              onClick={nextTrack}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Next track"
            >
              <SkipForward className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Loop toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Repeat</span>
            <button
              onClick={() => setLooping(!isLooping)}
              className={cn(
                'p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center',
                isLooping
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              )}
              aria-label={isLooping ? 'Disable repeat' : 'Enable repeat'}
              aria-pressed={isLooping}
            >
              <Repeat className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Volume control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="music-volume" className="text-sm text-muted-foreground">Volume</label>
              <span className="text-sm font-mono text-muted-foreground">{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMuteToggle}
                className="p-1.5 rounded-md hover:bg-muted/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <Volume2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                )}
              </button>
              <Slider
                id="music-volume"
                value={[volume * 100]}
                onValueChange={([v]) => {
                  setVolume(v / 100)
                  if (v > 0) setIsMuted(false)
                }}
                min={0}
                max={100}
                step={5}
                aria-valuetext={`${Math.round(volume * 100)} percent`}
                className="flex-1 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main button - larger and more visible */}
      <div className="flex items-center gap-2 bg-card/90 backdrop-blur-xl rounded-full p-1.5 border border-border shadow-xl">
        {/* Play/Pause button */}
        <Button
          variant={isPlaying ? 'default' : 'ghost'}
          size="icon"
          onClick={toggle}
          className={cn(
            'h-11 w-11 rounded-full transition-all',
            isPlaying
              ? 'bg-primary text-primary-foreground shadow-glow'
              : 'hover:bg-primary/20 text-foreground'
          )}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" aria-hidden="true" />
          )}
        </Button>

        {/* Track name when playing */}
        {currentTrack && (
          <span className="text-xs font-medium text-muted-foreground px-1 max-w-[100px] truncate hidden sm:block">
            {currentTrack.name}
          </span>
        )}

        {/* Expand/collapse button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'h-11 w-11 rounded-full transition-all',
            'hover:bg-muted/50 text-foreground',
            isExpanded && 'bg-muted/50'
          )}
          aria-label={isExpanded ? 'Close music menu' : 'Open music menu'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Music className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  )
}
