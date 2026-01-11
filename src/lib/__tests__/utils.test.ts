import { describe, it, expect } from 'vitest'
import {
  formatDuration,
  formatMinutes,
  formatDate,
  formatRelativeDate,
  getStreakDays,
  generateId,
} from '../utils'

describe('formatDuration', () => {
  it('should format seconds as mm:ss', () => {
    expect(formatDuration(0)).toBe('0:00')
    expect(formatDuration(30)).toBe('0:30')
    expect(formatDuration(60)).toBe('1:00')
    expect(formatDuration(90)).toBe('1:30')
    expect(formatDuration(600)).toBe('10:00')
    expect(formatDuration(3600)).toBe('60:00')
  })

  it('should pad seconds with leading zero', () => {
    expect(formatDuration(65)).toBe('1:05')
    expect(formatDuration(601)).toBe('10:01')
  })
})

describe('formatMinutes', () => {
  it('should format minutes under an hour', () => {
    expect(formatMinutes(0)).toBe('0 min')
    expect(formatMinutes(15)).toBe('15 min')
    expect(formatMinutes(59)).toBe('59 min')
  })

  it('should format hours correctly', () => {
    expect(formatMinutes(60)).toBe('1h')
    expect(formatMinutes(120)).toBe('2h')
  })

  it('should format hours and minutes', () => {
    expect(formatMinutes(75)).toBe('1h 15m')
    expect(formatMinutes(145)).toBe('2h 25m')
  })
})

describe('formatDate', () => {
  it('should format date as readable string', () => {
    const date = new Date('2024-01-15')
    const formatted = formatDate(date)
    expect(formatted).toContain('Jan')
    expect(formatted).toContain('15')
    expect(formatted).toContain('2024')
  })

  it('should accept string dates', () => {
    const formatted = formatDate('2024-06-20')
    expect(formatted).toContain('Jun')
    expect(formatted).toContain('20')
  })
})

describe('formatRelativeDate', () => {
  it('should return "Today" for today', () => {
    const today = new Date()
    expect(formatRelativeDate(today)).toBe('Today')
  })

  it('should return "Yesterday" for yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(formatRelativeDate(yesterday)).toBe('Yesterday')
  })

  it('should return days ago for recent dates', () => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    expect(formatRelativeDate(threeDaysAgo)).toBe('3 days ago')
  })

  it('should return weeks ago for older dates', () => {
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    expect(formatRelativeDate(twoWeeksAgo)).toBe('2 weeks ago')
  })
})

describe('getStreakDays', () => {
  it('should return 0 for empty array', () => {
    expect(getStreakDays([])).toBe(0)
  })

  it('should return 1 for single day today', () => {
    const today = new Date()
    expect(getStreakDays([today])).toBe(1)
  })

  it('should return 1 for single day yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(getStreakDays([yesterday])).toBe(1)
  })

  it('should return 0 for old dates', () => {
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 3)
    expect(getStreakDays([oldDate])).toBe(0)
  })

  it('should calculate consecutive day streaks', () => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    expect(getStreakDays([today, yesterday, twoDaysAgo])).toBe(3)
  })

  it('should handle gaps in streak', () => {
    const today = new Date()
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    // Gap between today and three days ago means no streak
    expect(getStreakDays([today, threeDaysAgo])).toBe(1)
  })

  it('should handle multiple sessions on same day', () => {
    const today1 = new Date()
    const today2 = new Date()
    today2.setHours(today1.getHours() - 2)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    expect(getStreakDays([today1, today2, yesterday])).toBe(2)
  })
})

describe('generateId', () => {
  it('should generate unique ids', () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).not.toBe(id2)
  })

  it('should generate string ids', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })
})
