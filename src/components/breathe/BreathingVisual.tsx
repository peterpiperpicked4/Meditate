'use client'

import { BreathPhase, formatPhase } from '@/lib/breathing'
import { cn } from '@/lib/utils'

interface BreathingVisualProps {
  phase: BreathPhase
  progress: number          // 0-1 progress through current phase
  phaseTimeRemaining: number
  totalTimeRemaining: number
  totalDuration: number
  breathCount: number
  isRunning: boolean
  isPaused: boolean
}

export function BreathingVisual({
  phase,
  progress,
  phaseTimeRemaining,
  totalTimeRemaining,
  totalDuration,
  breathCount,
  isRunning,
  isPaused,
}: BreathingVisualProps) {
  // Calculate circle scale based on phase and progress
  const getCircleScale = () => {
    if (phase === 'idle' || phase === 'countdown') return 0.6

    switch (phase) {
      case 'inhale':
        // Expand from 0.6 to 1.0
        return 0.6 + (progress * 0.4)
      case 'hold1':
        // Stay at 1.0 with subtle pulse
        return 1.0
      case 'exhale':
        // Contract from 1.0 to 0.6
        return 1.0 - (progress * 0.4)
      case 'hold2':
        // Stay at 0.6 with subtle pulse
        return 0.6
      default:
        return 0.6
    }
  }

  const scale = getCircleScale()
  const isHolding = phase === 'hold1' || phase === 'hold2'
  const sessionProgress = 1 - (totalTimeRemaining / totalDuration)

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Main breathing circle container */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Outer progress ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 320 320"
        >
          {/* Background track */}
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            strokeWidth="2"
            className="stroke-muted/20"
          />
          {/* Progress arc */}
          {isRunning && phase !== 'countdown' && (
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-primary/40"
              strokeDasharray={2 * Math.PI * 150}
              strokeDashoffset={2 * Math.PI * 150 * (1 - sessionProgress)}
              style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
          )}
        </svg>

        {/* Breathing circle */}
        <div
          className={cn(
            'relative rounded-full transition-all',
            // Smooth transition for breathing, instant for idle
            phase === 'idle' ? 'duration-300' : 'duration-100',
            // Subtle pulse during holds
            isHolding && 'animate-pulse-subtle'
          )}
          style={{
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            maxWidth: '280px',
            maxHeight: '280px',
          }}
        >
          {/* Gradient background */}
          <div
            className={cn(
              'absolute inset-0 rounded-full transition-opacity duration-500',
              'bg-gradient-radial from-primary/30 via-primary/10 to-transparent',
              isRunning && !isPaused ? 'opacity-100' : 'opacity-60'
            )}
          />

          {/* Inner glow */}
          <div
            className={cn(
              'absolute inset-4 rounded-full',
              'bg-gradient-radial from-primary/20 to-transparent',
              'blur-xl'
            )}
          />

          {/* Core circle */}
          <div
            className={cn(
              'absolute inset-8 rounded-full border transition-all duration-300',
              isRunning && !isPaused
                ? 'border-primary/40 bg-card/60'
                : 'border-primary/20 bg-card/40'
            )}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {phase === 'countdown' ? (
              <>
                <span className="text-5xl sm:text-6xl font-mono font-light text-primary">
                  {Math.ceil(phaseTimeRemaining)}
                </span>
                <span className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
                  Get Ready
                </span>
              </>
            ) : phase === 'idle' ? (
              <>
                <span className="text-lg text-muted-foreground">
                  Press Start
                </span>
              </>
            ) : (
              <>
                {/* Phase time */}
                <span className="text-4xl sm:text-5xl font-mono font-light text-foreground">
                  {Math.ceil(phaseTimeRemaining)}
                </span>

                {/* Phase label */}
                <span
                  className={cn(
                    'mt-2 text-lg sm:text-xl font-display tracking-wide transition-colors duration-300',
                    phase === 'inhale' && 'text-primary',
                    phase === 'exhale' && 'text-amber-400',
                    isHolding && 'text-muted-foreground'
                  )}
                >
                  {formatPhase(phase)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Session info below circle */}
      {isRunning && phase !== 'countdown' && (
        <div className="mt-8 flex items-center gap-8 text-sm text-muted-foreground">
          <div className="text-center">
            <span className="block text-2xl font-mono text-foreground">
              {Math.floor(totalTimeRemaining / 60)}:{(Math.floor(totalTimeRemaining) % 60).toString().padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-wider">remaining</span>
          </div>
          <div className="w-px h-8 bg-border/50" />
          <div className="text-center">
            <span className="block text-2xl font-mono text-foreground">
              {breathCount}
            </span>
            <span className="text-xs uppercase tracking-wider">breaths</span>
          </div>
        </div>
      )}

      {/* Paused indicator */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
          <span className="text-xl font-display text-primary">Paused</span>
        </div>
      )}
    </div>
  )
}
