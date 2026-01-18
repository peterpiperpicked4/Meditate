'use client'

import * as React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AudioErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface AudioErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class AudioErrorBoundary extends React.Component<
  AudioErrorBoundaryProps,
  AudioErrorBoundaryState
> {
  constructor(props: AudioErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<AudioErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorInfo })

    // Log for debugging
    console.error('[AudioErrorBoundary] Caught error:', error)
    console.error('[AudioErrorBoundary] Error info:', errorInfo)

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Audio Error
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
              There was a problem with the audio system. This can happen if your browser
              restricted audio playback or if the audio context was interrupted.
            </p>
          </div>
          <Button
            onClick={this.handleRetry}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook to manually trigger audio error recovery
export function useAudioErrorRecovery(): {
  triggerRecovery: () => void
  isRecovering: boolean
} {
  const [isRecovering, setIsRecovering] = React.useState(false)

  const triggerRecovery = React.useCallback(() => {
    setIsRecovering(true)

    // Try to resume any suspended audio contexts
    if (typeof window !== 'undefined' && window.AudioContext) {
      try {
        // Create a temporary context to "wake up" the audio system
        const tempCtx = new AudioContext()
        tempCtx.resume().then(() => {
          tempCtx.close()
          setIsRecovering(false)
        }).catch(() => {
          setIsRecovering(false)
        })
      } catch {
        setIsRecovering(false)
      }
    } else {
      setIsRecovering(false)
    }
  }, [])

  return { triggerRecovery, isRecovering }
}
