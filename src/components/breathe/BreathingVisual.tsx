'use client'

import * as React from 'react'
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

export const BreathingVisual = React.memo(function BreathingVisual({
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
  const sessionProgress = totalDuration > 0 ? 1 - (totalTimeRemaining / totalDuration) : 0

  // Calculate circumference for progress ring
  const radius = 150
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Main breathing circle container */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Outer progress ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 320 320"
          role="progressbar"
          aria-valuenow={Math.round(sessionProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Session progress: ${Math.round(sessionProgress * 100)} percent complete`}
        >
          {/* Background track */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            strokeWidth="2"
            className="stroke-muted/20"
          />
          {/* Progress arc */}
          {isRunning && phase !== 'countdown' && (
            <circle
              cx="160"
              cy="160"
              r={radius}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-primary/40"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - sessionProgress)}
              style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
          )}
        </svg>

        {/* Breathing circle - uses transform for GPU-accelerated animation */}
        <div
          className={cn(
            'relative rounded-full transition-transform will-change-transform',
            // Smooth transition for breathing, instant for idle
            phase === 'idle' ? 'duration-300' : 'duration-100',
            // Subtle pulse during holds
            isHolding && 'animate-pulse-subtle'
          )}
          style={{
            width: '280px',
            height: '280px',
            transform: `scale(${scale})`,
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
                <span
                  className="text-5xl sm:text-6xl font-mono font-light text-primary"
                  aria-live="polite"
                  aria-atomic="true"
                >
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

                {/* Phase label - with ARIA live region for screen readers */}
                <span
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className={cn(
                    'mt-2 text-lg sm:text-xl font-display tracking-wide transition-colors duration-300',
                    phase === 'inhale' && 'text-primary',
                    phase === 'exhale' && 'text-accent',
                    isHolding && 'text-muted-foreground'
                  )}
                >
                  {formatPhase(phase)}
                </span>
              </>
            )}
          </div>

          {/* Paused indicator - scoped to circle */}
          {isPaused && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full backdrop-blur-sm"
              role="status"
              aria-live="polite"
            >
              <span className="text-xl font-display text-primary">Paused</span>
            </div>
          )}
        </div>
      </div>

      {/* Session info below circle */}
      {isRunning && phase !== 'countdown' && (
        <div className="mt-8 flex items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
          <div className="text-center" role="group" aria-labelledby="time-remaining-label">
            <span id="time-remaining-value" className="block text-2xl font-mono text-foreground">
              {Math.floor(totalTimeRemaining / 60)}:{(Math.floor(totalTimeRemaining) % 60).toString().padStart(2, '0')}
            </span>
            <span id="time-remaining-label" className="text-xs uppercase tracking-wider">remaining</span>
          </div>
          <div className="w-px h-8 bg-border/50" aria-hidden="true" />
          <div className="text-center" role="group" aria-labelledby="breath-count-label">
            <span id="breath-count-value" className="block text-2xl font-mono text-foreground">
              {breathCount}
            </span>
            <span id="breath-count-label" className="text-xs uppercase tracking-wider">breaths</span>
          </div>
        </div>
      )}

      {/* Hidden live region for session completion announcement */}
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {!isRunning && breathCount > 0 && (
          <span>Session complete. {breathCount} breaths completed.</span>
        )}
      </div>
    </div>
  )
})

BreathingVisual.displayName = 'BreathingVisual'
