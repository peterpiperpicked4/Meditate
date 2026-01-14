'use client'

import * as React from 'react'
import { Music, Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react'
import { useMusic, MUSIC_TRACKS } from '@/contexts/MusicContext'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

export function MusicPlayer() {
  const { currentTrack, isPlaying, volume, setVolume, toggle, selectTrack } = useMusic()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [prevVolume, setPrevVolume] = React.useState(volume)

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
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded panel */}
      <div
        className={cn(
          'absolute bottom-full right-0 mb-2 w-64 rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden transition-all duration-300',
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        <div className="p-4 space-y-4">
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
                  <span className="ml-auto flex gap-0.5" aria-label="Now playing">
                    <span className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                    <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </span>
                )}
              </button>
            ))}
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

      {/* Main button */}
      <div className="flex items-center gap-2">
        {/* Play/Pause button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggle}
          className={cn(
            'h-12 w-12 rounded-full border-border/50 bg-card/95 backdrop-blur-xl shadow-lg',
            'hover:bg-card hover:border-primary/50',
            isPlaying && 'border-primary/50 bg-primary/10'
          )}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" aria-hidden="true" />
          )}
        </Button>

        {/* Expand/collapse button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'h-12 w-12 rounded-full border-border/50 bg-card/95 backdrop-blur-xl shadow-lg',
            'hover:bg-card hover:border-primary/50',
            isExpanded && 'border-primary/50'
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
