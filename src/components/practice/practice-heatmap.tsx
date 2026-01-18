'use client'

import * as React from 'react'
import { type Session } from '@/lib/storage'

interface PracticeHeatmapProps {
  sessions: Session[]
}

// Generate array of dates for the past year (or specified weeks)
function generateDateRange(weeks: number = 52): Date[] {
  const dates: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Start from (weeks * 7) days ago
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - (weeks * 7) + 1)

  // Adjust to start on Sunday
  const dayOfWeek = startDate.getDay()
  startDate.setDate(startDate.getDate() - dayOfWeek)

  // Generate all dates
  const current = new Date(startDate)
  while (current <= today) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

// Get minutes practiced per day from sessions
function getMinutesPerDay(sessions: Session[]): Map<string, number> {
  const minutesMap = new Map<string, number>()

  sessions.forEach((session) => {
    const date = new Date(session.startTime)
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const minutes = Math.round(session.durationSec / 60)
    minutesMap.set(dateKey, (minutesMap.get(dateKey) || 0) + minutes)
  })

  return minutesMap
}

// Get intensity level (0-4) based on minutes
function getIntensity(minutes: number): number {
  if (minutes === 0) return 0
  if (minutes < 10) return 1
  if (minutes < 20) return 2
  if (minutes < 30) return 3
  return 4
}

const intensityLabels = ['No practice', 'Light (1-9 min)', 'Moderate (10-19 min)', 'Good (20-29 min)', 'Strong (30+ min)']

const intensityColors = [
  'bg-muted/30', // 0 - no activity
  'bg-primary/20', // 1 - light
  'bg-primary/40', // 2 - medium
  'bg-primary/60', // 3 - good
  'bg-primary/80', // 4 - strong
]

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function PracticeHeatmap({ sessions }: PracticeHeatmapProps) {
  // Use fewer weeks on mobile to prevent excessive scrolling
  const [weekCount, setWeekCount] = React.useState(52)

  React.useEffect(() => {
    const updateWeekCount = () => {
      setWeekCount(window.innerWidth < 640 ? 26 : 52)
    }
    updateWeekCount()
    window.addEventListener('resize', updateWeekCount)
    return () => window.removeEventListener('resize', updateWeekCount)
  }, [])

  const dates = React.useMemo(() => generateDateRange(weekCount), [weekCount])
  const minutesPerDay = React.useMemo(() => getMinutesPerDay(sessions), [sessions])
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null)
  const gridRef = React.useRef<HTMLDivElement>(null)

  // Flatten dates for keyboard navigation
  const flatDates = React.useMemo(() => {
    return dates.filter(d => d <= new Date())
  }, [dates])

  // Group dates by week (column)
  const weeks = React.useMemo(() => {
    const result: Date[][] = []
    let currentWeek: Date[] = []

    dates.forEach((date, i) => {
      currentWeek.push(date)
      if (date.getDay() === 6 || i === dates.length - 1) {
        result.push(currentWeek)
        currentWeek = []
      }
    })

    return result
  }, [dates])

  // Get month labels with their starting positions
  const monthLabels = React.useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = []
    let lastMonth = -1

    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0]
      const month = firstDayOfWeek.getMonth()
      if (month !== lastMonth) {
        labels.push({ month: monthNames[month], weekIndex })
        lastMonth = month
      }
    })

    return labels
  }, [weeks])

  // Calculate totals for the period
  const totalDays = React.useMemo(() => {
    let count = 0
    dates.forEach((date) => {
      const dateKey = formatDateKey(date)
      if (minutesPerDay.get(dateKey)) count++
    })
    return count
  }, [dates, minutesPerDay])

  const totalMinutes = React.useMemo(() => {
    let total = 0
    minutesPerDay.forEach((minutes) => {
      total += minutes
    })
    return total
  }, [minutesPerDay])

  const [selectedDate, setSelectedDate] = React.useState<{ date: Date; minutes: number } | null>(null)

  // Keyboard navigation handler
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (focusedIndex === null) return

    let newIndex = focusedIndex
    const totalDates = flatDates.length

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        newIndex = Math.min(focusedIndex + 7, totalDates - 1) // Move to next week
        break
      case 'ArrowLeft':
        e.preventDefault()
        newIndex = Math.max(focusedIndex - 7, 0) // Move to previous week
        break
      case 'ArrowDown':
        e.preventDefault()
        newIndex = Math.min(focusedIndex + 1, totalDates - 1) // Move to next day
        break
      case 'ArrowUp':
        e.preventDefault()
        newIndex = Math.max(focusedIndex - 1, 0) // Move to previous day
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = totalDates - 1
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        const date = flatDates[focusedIndex]
        const dateKey = formatDateKey(date)
        const minutes = minutesPerDay.get(dateKey) || 0
        setSelectedDate({ date, minutes })
        return
      default:
        return
    }

    setFocusedIndex(newIndex)
    const date = flatDates[newIndex]
    const dateKey = formatDateKey(date)
    const minutes = minutesPerDay.get(dateKey) || 0
    setSelectedDate({ date, minutes })
  }, [focusedIndex, flatDates, minutesPerDay])

  // Find flat index for a date
  const getFlatIndex = (date: Date): number => {
    return flatDates.findIndex(d => d.toDateString() === date.toDateString())
  }

  return (
    <section
      className="card-contemplative rounded-xl p-5"
      aria-labelledby="heatmap-title"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 id="heatmap-title" className="font-display text-base">Practice Activity</h3>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {totalDays} days practiced in the past {weekCount === 52 ? 'year' : '6 months'}
        </p>
      </div>

      {/* Screen reader summary */}
      <div className="sr-only" aria-live="polite">
        Practice activity heatmap showing {totalDays} days of meditation over the past {weekCount === 52 ? 'year' : '6 months'},
        totaling {totalMinutes} minutes. Use arrow keys to navigate days.
      </div>

      {/* Month labels */}
      <div className="relative mb-1 ml-10" aria-hidden="true">
        <div className="flex text-xs text-muted-foreground" style={{ gap: '0' }}>
          {monthLabels.map(({ month, weekIndex }) => (
            <span
              key={`${month}-${weekIndex}`}
              className="absolute"
              style={{ left: `${weekIndex * 14}px` }}
            >
              {month}
            </span>
          ))}
        </div>
      </div>

      {/* Heatmap grid */}
      <div
        ref={gridRef}
        className="flex gap-0.5 mt-5 overflow-x-auto pb-2 scrollbar-hide"
        role="grid"
        aria-label="Practice activity calendar. Use arrow keys to navigate."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (focusedIndex === null) {
            const todayIndex = getFlatIndex(new Date())
            setFocusedIndex(todayIndex >= 0 ? todayIndex : flatDates.length - 1)
          }
        }}
      >
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1.5 text-xs text-muted-foreground shrink-0" role="presentation" aria-hidden="true">
          <span className="h-3.5 sm:h-3"></span>
          <span className="h-3.5 sm:h-3 leading-3 text-xs">Mon</span>
          <span className="h-3.5 sm:h-3"></span>
          <span className="h-3.5 sm:h-3 leading-3 text-xs">Wed</span>
          <span className="h-3.5 sm:h-3"></span>
          <span className="h-3.5 sm:h-3 leading-3 text-xs">Fri</span>
          <span className="h-3.5 sm:h-3"></span>
        </div>

        {/* Weeks */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5" role="row">
            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
              const date = week.find(d => d.getDay() === dayIndex)
              if (!date || date > new Date()) {
                return <div key={dayIndex} className="w-3.5 h-3.5 sm:w-3 sm:h-3" role="gridcell" aria-hidden="true" />
              }

              const dateKey = formatDateKey(date)
              const minutes = minutesPerDay.get(dateKey) || 0
              const intensity = getIntensity(minutes)
              const isToday = date.toDateString() === new Date().toDateString()
              const flatIndex = getFlatIndex(date)
              const isFocused = focusedIndex === flatIndex

              const dateLabel = date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
              const activityLabel = minutes > 0
                ? `${minutes} minutes practiced`
                : 'No practice recorded'

              return (
                <button
                  key={dayIndex}
                  type="button"
                  role="gridcell"
                  aria-label={`${dateLabel}: ${activityLabel}`}
                  aria-selected={isFocused}
                  tabIndex={-1}
                  className={`w-3.5 h-3.5 sm:w-3 sm:h-3 rounded-sm ${intensityColors[intensity]} ${
                    isToday ? 'ring-1 ring-primary ring-offset-1 ring-offset-background' : ''
                  } ${
                    isFocused ? 'ring-2 ring-foreground ring-offset-1 ring-offset-background' : ''
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-transform hover:scale-125 active:scale-110 touch-manipulation`}
                  onClick={() => {
                    setFocusedIndex(flatIndex)
                    setSelectedDate({ date, minutes })
                  }}
                  onMouseEnter={() => setSelectedDate({ date, minutes })}
                  onMouseLeave={() => {
                    if (focusedIndex !== flatIndex) {
                      setSelectedDate(null)
                    }
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* Selected date info */}
      <div
        className="mt-3 text-xs text-muted-foreground min-h-[1.5rem]"
        aria-live="polite"
        aria-atomic="true"
      >
        {selectedDate && (
          <>
            <span className="font-medium text-foreground">
              {selectedDate.date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            {' — '}
            {selectedDate.minutes > 0
              ? `${selectedDate.minutes} minutes practiced`
              : 'No practice recorded'
            }
          </>
        )}
      </div>

      {/* Legend */}
      <div
        className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground"
        role="img"
        aria-label={`Legend: intensity levels from no practice to 30+ minutes`}
      >
        <span id="legend-less">Less</span>
        {intensityColors.map((color, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-sm ${color}`}
            role="img"
            aria-label={intensityLabels[i]}
          />
        ))}
        <span id="legend-more">More</span>
      </div>
    </section>
  )
}
