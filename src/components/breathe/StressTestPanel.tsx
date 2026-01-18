'use client'

import * as React from 'react'
import { Play, Square, Zap, RotateCcw, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StressTestResult {
  name: string
  status: 'pending' | 'running' | 'passed' | 'failed'
  message?: string
  duration?: number
}

interface StressTestPanelProps {
  onPause: () => void
  onResume: () => void
  onStart: () => void
  onStop: () => void
  isRunning: boolean
  isPaused: boolean
}

export function StressTestPanel({
  onPause,
  onResume,
  onStart,
  onStop,
  isRunning,
  isPaused,
}: StressTestPanelProps) {
  const [isTestRunning, setIsTestRunning] = React.useState(false)
  const [results, setResults] = React.useState<StressTestResult[]>([])
  const [currentTest, setCurrentTest] = React.useState<string | null>(null)
  const abortRef = React.useRef(false)

  const updateResult = (name: string, update: Partial<StressTestResult>) => {
    setResults(prev => prev.map(r => r.name === name ? { ...r, ...update } : r))
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const runStressTests = async () => {
    abortRef.current = false
    setIsTestRunning(true)

    const tests: StressTestResult[] = [
      { name: 'Rapid Pause/Resume (20x)', status: 'pending' },
      { name: 'Very Rapid Pause/Resume (50x)', status: 'pending' },
      { name: 'Start/Stop Cycles (10x)', status: 'pending' },
      { name: 'Extended Run (30s)', status: 'pending' },
      { name: 'Pause During Each Phase', status: 'pending' },
    ]

    setResults(tests)

    // Ensure we start fresh
    if (isRunning) {
      onStop()
      await sleep(500)
    }

    // Test 1: Rapid Pause/Resume (20x)
    if (!abortRef.current) {
      const testName = 'Rapid Pause/Resume (20x)'
      setCurrentTest(testName)
      updateResult(testName, { status: 'running' })
      const startTime = Date.now()

      try {
        onStart()
        await sleep(4500) // Wait for countdown + start

        for (let i = 0; i < 20 && !abortRef.current; i++) {
          onPause()
          await sleep(100)
          onResume()
          await sleep(100)
        }

        await sleep(1000) // Let it settle

        if (!abortRef.current) {
          updateResult(testName, {
            status: 'passed',
            message: 'Completed 20 rapid pause/resume cycles',
            duration: Date.now() - startTime,
          })
        }

        onStop()
        await sleep(500)
      } catch (e) {
        updateResult(testName, {
          status: 'failed',
          message: e instanceof Error ? e.message : 'Unknown error',
          duration: Date.now() - startTime,
        })
      }
    }

    // Test 2: Very Rapid Pause/Resume (50x)
    if (!abortRef.current) {
      const testName = 'Very Rapid Pause/Resume (50x)'
      setCurrentTest(testName)
      updateResult(testName, { status: 'running' })
      const startTime = Date.now()

      try {
        onStart()
        await sleep(4500)

        for (let i = 0; i < 50 && !abortRef.current; i++) {
          onPause()
          await sleep(50)
          onResume()
          await sleep(50)
        }

        await sleep(1000)

        if (!abortRef.current) {
          updateResult(testName, {
            status: 'passed',
            message: 'Completed 50 very rapid pause/resume cycles',
            duration: Date.now() - startTime,
          })
        }

        onStop()
        await sleep(500)
      } catch (e) {
        updateResult(testName, {
          status: 'failed',
          message: e instanceof Error ? e.message : 'Unknown error',
          duration: Date.now() - startTime,
        })
      }
    }

    // Test 3: Start/Stop Cycles (10x)
    if (!abortRef.current) {
      const testName = 'Start/Stop Cycles (10x)'
      setCurrentTest(testName)
      updateResult(testName, { status: 'running' })
      const startTime = Date.now()

      try {
        for (let i = 0; i < 10 && !abortRef.current; i++) {
          onStart()
          await sleep(1500)
          onStop()
          await sleep(300)
        }

        if (!abortRef.current) {
          updateResult(testName, {
            status: 'passed',
            message: 'Completed 10 start/stop cycles',
            duration: Date.now() - startTime,
          })
        }
      } catch (e) {
        updateResult(testName, {
          status: 'failed',
          message: e instanceof Error ? e.message : 'Unknown error',
          duration: Date.now() - startTime,
        })
      }
    }

    // Test 4: Extended Run (30s)
    if (!abortRef.current) {
      const testName = 'Extended Run (30s)'
      setCurrentTest(testName)
      updateResult(testName, { status: 'running' })
      const startTime = Date.now()

      try {
        onStart()
        await sleep(4000) // Countdown

        // Run for 30 seconds, checking every second
        for (let i = 0; i < 30 && !abortRef.current; i++) {
          await sleep(1000)
        }

        if (!abortRef.current) {
          updateResult(testName, {
            status: 'passed',
            message: 'Ran continuously for 30 seconds without issues',
            duration: Date.now() - startTime,
          })
        }

        onStop()
        await sleep(500)
      } catch (e) {
        updateResult(testName, {
          status: 'failed',
          message: e instanceof Error ? e.message : 'Unknown error',
          duration: Date.now() - startTime,
        })
      }
    }

    // Test 5: Pause During Each Phase
    if (!abortRef.current) {
      const testName = 'Pause During Each Phase'
      setCurrentTest(testName)
      updateResult(testName, { status: 'running' })
      const startTime = Date.now()

      try {
        onStart()
        await sleep(4000) // Countdown

        // Inhale phase - pause midway
        await sleep(2000)
        onPause()
        await sleep(1000)
        onResume()

        // Wait for hold phase
        await sleep(3000)
        onPause()
        await sleep(1000)
        onResume()

        // Wait for exhale phase
        await sleep(8000)
        onPause()
        await sleep(1000)
        onResume()

        await sleep(2000)

        if (!abortRef.current) {
          updateResult(testName, {
            status: 'passed',
            message: 'Successfully paused/resumed during all phases',
            duration: Date.now() - startTime,
          })
        }

        onStop()
      } catch (e) {
        updateResult(testName, {
          status: 'failed',
          message: e instanceof Error ? e.message : 'Unknown error',
          duration: Date.now() - startTime,
        })
      }
    }

    setCurrentTest(null)
    setIsTestRunning(false)
  }

  const stopTests = () => {
    abortRef.current = true
    onStop()
    setIsTestRunning(false)
    setCurrentTest(null)
  }

  const clearResults = () => {
    setResults([])
  }

  const passedCount = results.filter(r => r.status === 'passed').length
  const failedCount = results.filter(r => r.status === 'failed').length

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-card/95 backdrop-blur border border-border rounded-lg shadow-xl p-4 text-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">Stress Tests</span>
        </div>
        {results.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-green-500">{passedCount} passed</span>
            {failedCount > 0 && <span className="text-destructive">{failedCount} failed</span>}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
          {results.map(result => (
            <div
              key={result.name}
              className={`p-2 rounded text-xs ${
                result.status === 'running'
                  ? 'bg-primary/10 border border-primary/30'
                  : result.status === 'passed'
                  ? 'bg-green-500/10 border border-green-500/30'
                  : result.status === 'failed'
                  ? 'bg-destructive/10 border border-destructive/30'
                  : 'bg-muted/50 border border-border'
              }`}
            >
              <div className="flex items-center gap-2">
                {result.status === 'running' && (
                  <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
                {result.status === 'passed' && <CheckCircle className="w-3 h-3 text-green-500" />}
                {result.status === 'failed' && <XCircle className="w-3 h-3 text-destructive" />}
                {result.status === 'pending' && <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />}
                <span className="text-foreground">{result.name}</span>
              </div>
              {result.message && (
                <p className="mt-1 text-muted-foreground pl-5">{result.message}</p>
              )}
              {result.duration && (
                <p className="text-muted-foreground/70 pl-5">{(result.duration / 1000).toFixed(1)}s</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {!isTestRunning ? (
          <>
            <Button
              size="sm"
              onClick={runStressTests}
              className="flex-1 gap-1"
            >
              <Play className="w-3 h-3" />
              Run Tests
            </Button>
            {results.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={clearResults}
                className="gap-1"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            )}
          </>
        ) : (
          <Button
            size="sm"
            variant="destructive"
            onClick={stopTests}
            className="flex-1 gap-1"
          >
            <Square className="w-3 h-3" />
            Stop Tests
          </Button>
        )}
      </div>

      {isTestRunning && currentTest && (
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Running: {currentTest}
        </p>
      )}

      <p className="mt-2 text-xs text-muted-foreground/70 text-center">
        Tests will auto-start/stop sessions
      </p>
    </div>
  )
}
