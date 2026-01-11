import { generateId, getStreakDays } from './utils'

// Types
export interface Session {
  id: string
  startTime: string
  endTime: string
  durationSec: number
  technique: string
  notes: string
  tags: string[]
}

export interface PlanWeek {
  weekNumber: number
  dailyMinutes: number
  techniques: {
    name: string
    minutes: number
  }[]
  focus: string
}

export interface Plan {
  id: string
  name: string
  description: string
  startDate: string
  weeks: PlanWeek[]
  createdAt: string
  isActive: boolean
  isBuiltIn: boolean
}

export interface JournalEntry {
  id: string
  date: string
  linkedSessionId?: string
  text: string
  prompts: {
    whatPulledAttention?: string
    whatHelpedReturn?: string
    bodyEmotionNotice?: string
    insightForTomorrow?: string
  }
  mood?: 'peaceful' | 'restless' | 'sleepy' | 'emotional' | 'focused' | 'neutral'
}

export interface Preferences {
  defaultDuration: number
  bellInterval: number | null
  bellSound: 'bowl' | 'chime' | 'none'
  techniqueFavorites: string[]
  darkMode: 'system' | 'light' | 'dark'
  currentStage: number
  activePlanId: string | null
}

export interface Stats {
  totalSessions: number
  totalMinutes: number
  currentStreak: number
  longestStreak: number
  thisWeekMinutes: number
  thisMonthMinutes: number
  averageSessionLength: number
  favoriteTime: string | null
  favoritetechnique: string | null
}

// Storage keys
const STORAGE_KEYS = {
  sessions: 'ztd_sessions',
  plans: 'ztd_plans',
  journal: 'ztd_journal',
  preferences: 'ztd_preferences',
}

// Helper to safely access localStorage
function getStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage error:', e)
  }
}

// Default preferences
const defaultPreferences: Preferences = {
  defaultDuration: 600, // 10 minutes
  bellInterval: null,
  bellSound: 'bowl',
  techniqueFavorites: [],
  darkMode: 'system',
  currentStage: 0,
  activePlanId: null,
}

// Sessions
export function getSessions(): Session[] {
  return getStorage<Session[]>(STORAGE_KEYS.sessions, [])
}

export function addSession(session: Omit<Session, 'id'>): Session {
  const sessions = getSessions()
  const newSession: Session = {
    ...session,
    id: generateId(),
  }
  sessions.push(newSession)
  setStorage(STORAGE_KEYS.sessions, sessions)
  return newSession
}

export function updateSession(id: string, updates: Partial<Session>): Session | null {
  const sessions = getSessions()
  const index = sessions.findIndex(s => s.id === id)
  if (index === -1) return null
  sessions[index] = { ...sessions[index], ...updates }
  setStorage(STORAGE_KEYS.sessions, sessions)
  return sessions[index]
}

export function deleteSession(id: string): boolean {
  const sessions = getSessions()
  const filtered = sessions.filter(s => s.id !== id)
  if (filtered.length === sessions.length) return false
  setStorage(STORAGE_KEYS.sessions, filtered)
  return true
}

// Plans
export function getPlans(): Plan[] {
  return getStorage<Plan[]>(STORAGE_KEYS.plans, [])
}

export function addPlan(plan: Omit<Plan, 'id' | 'createdAt'>): Plan {
  const plans = getPlans()
  const newPlan: Plan = {
    ...plan,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  plans.push(newPlan)
  setStorage(STORAGE_KEYS.plans, plans)
  return newPlan
}

export function updatePlan(id: string, updates: Partial<Plan>): Plan | null {
  const plans = getPlans()
  const index = plans.findIndex(p => p.id === id)
  if (index === -1) return null
  plans[index] = { ...plans[index], ...updates }
  setStorage(STORAGE_KEYS.plans, plans)
  return plans[index]
}

export function deletePlan(id: string): boolean {
  const plans = getPlans()
  const filtered = plans.filter(p => p.id !== id)
  if (filtered.length === plans.length) return false
  setStorage(STORAGE_KEYS.plans, filtered)
  return true
}

export function setActivePlan(id: string | null): void {
  const prefs = getPreferences()
  prefs.activePlanId = id
  setPreferences(prefs)
}

// Journal
export function getJournalEntries(): JournalEntry[] {
  return getStorage<JournalEntry[]>(STORAGE_KEYS.journal, [])
}

export function addJournalEntry(entry: Omit<JournalEntry, 'id'>): JournalEntry {
  const entries = getJournalEntries()
  const newEntry: JournalEntry = {
    ...entry,
    id: generateId(),
  }
  entries.push(newEntry)
  setStorage(STORAGE_KEYS.journal, entries)
  return newEntry
}

export function updateJournalEntry(id: string, updates: Partial<JournalEntry>): JournalEntry | null {
  const entries = getJournalEntries()
  const index = entries.findIndex(e => e.id === id)
  if (index === -1) return null
  entries[index] = { ...entries[index], ...updates }
  setStorage(STORAGE_KEYS.journal, entries)
  return entries[index]
}

export function deleteJournalEntry(id: string): boolean {
  const entries = getJournalEntries()
  const filtered = entries.filter(e => e.id !== id)
  if (filtered.length === entries.length) return false
  setStorage(STORAGE_KEYS.journal, filtered)
  return true
}

// Preferences
export function getPreferences(): Preferences {
  return { ...defaultPreferences, ...getStorage<Preferences>(STORAGE_KEYS.preferences, defaultPreferences) }
}

export function setPreferences(prefs: Partial<Preferences>): Preferences {
  const current = getPreferences()
  const updated = { ...current, ...prefs }
  setStorage(STORAGE_KEYS.preferences, updated)
  return updated
}

// Stats
export function getStats(): Stats {
  const sessions = getSessions()

  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      totalMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
      thisWeekMinutes: 0,
      thisMonthMinutes: 0,
      averageSessionLength: 0,
      favoriteTime: null,
      favoritetechnique: null,
    }
  }

  const totalMinutes = Math.round(sessions.reduce((sum, s) => sum + s.durationSec, 0) / 60)

  // Streak calculation
  const sessionDates = sessions.map(s => new Date(s.startTime))
  const currentStreak = getStreakDays(sessionDates)

  // Calculate longest streak
  let longestStreak = currentStreak
  const sortedDates = sessionDates
    .map(d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime())
    .sort((a, b) => a - b)
  const uniqueDates = Array.from(new Set(sortedDates))

  let tempStreak = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const dayDiff = (uniqueDates[i] - uniqueDates[i - 1]) / (1000 * 60 * 60 * 24)
    if (dayDiff === 1) {
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)
    } else {
      tempStreak = 1
    }
  }

  // This week minutes
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)

  const thisWeekMinutes = Math.round(
    sessions
      .filter(s => new Date(s.startTime) >= weekStart)
      .reduce((sum, s) => sum + s.durationSec, 0) / 60
  )

  // This month minutes
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const thisMonthMinutes = Math.round(
    sessions
      .filter(s => new Date(s.startTime) >= monthStart)
      .reduce((sum, s) => sum + s.durationSec, 0) / 60
  )

  // Average session length
  const averageSessionLength = Math.round(totalMinutes / sessions.length)

  // Favorite technique
  const techniqueCounts: Record<string, number> = {}
  sessions.forEach(s => {
    techniqueCounts[s.technique] = (techniqueCounts[s.technique] || 0) + 1
  })
  const favoritetechnique = Object.entries(techniqueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null

  // Favorite time
  const hourCounts: Record<number, number> = {}
  sessions.forEach(s => {
    const hour = new Date(s.startTime).getHours()
    hourCounts[hour] = (hourCounts[hour] || 0) + 1
  })
  const favoriteHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]
  let favoriteTime: string | null = null
  if (favoriteHour) {
    const hour = parseInt(favoriteHour[0])
    if (hour < 6) favoriteTime = 'Early morning'
    else if (hour < 12) favoriteTime = 'Morning'
    else if (hour < 17) favoriteTime = 'Afternoon'
    else if (hour < 21) favoriteTime = 'Evening'
    else favoriteTime = 'Night'
  }

  return {
    totalSessions: sessions.length,
    totalMinutes,
    currentStreak,
    longestStreak,
    thisWeekMinutes,
    thisMonthMinutes,
    averageSessionLength,
    favoriteTime,
    favoritetechnique,
  }
}

// Export/Import
export interface ExportData {
  version: string
  exportedAt: string
  sessions: Session[]
  plans: Plan[]
  journal: JournalEntry[]
  preferences: Preferences
}

export function exportData(): ExportData {
  return {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    sessions: getSessions(),
    plans: getPlans(),
    journal: getJournalEntries(),
    preferences: getPreferences(),
  }
}

export function importData(data: ExportData): { success: boolean; message: string } {
  try {
    if (!data.version || !data.sessions || !data.preferences) {
      return { success: false, message: 'Invalid data format' }
    }

    // Merge sessions (avoid duplicates by ID)
    const existingSessions = getSessions()
    const existingIds = new Set(existingSessions.map(s => s.id))
    const newSessions = data.sessions.filter(s => !existingIds.has(s.id))
    setStorage(STORAGE_KEYS.sessions, [...existingSessions, ...newSessions])

    // Merge plans
    const existingPlans = getPlans()
    const existingPlanIds = new Set(existingPlans.map(p => p.id))
    const newPlans = data.plans.filter(p => !existingPlanIds.has(p.id))
    setStorage(STORAGE_KEYS.plans, [...existingPlans, ...newPlans])

    // Merge journal entries
    const existingEntries = getJournalEntries()
    const existingEntryIds = new Set(existingEntries.map(e => e.id))
    const newEntries = data.journal.filter(e => !existingEntryIds.has(e.id))
    setStorage(STORAGE_KEYS.journal, [...existingEntries, ...newEntries])

    // Update preferences (merge, keeping existing values for unspecified fields)
    const currentPrefs = getPreferences()
    setPreferences({ ...currentPrefs, ...data.preferences })

    return {
      success: true,
      message: `Imported ${newSessions.length} sessions, ${newPlans.length} plans, ${newEntries.length} journal entries`,
    }
  } catch {
    return { success: false, message: 'Failed to import data' }
  }
}

// Export as CSV
export function exportSessionsCSV(): string {
  const sessions = getSessions()
  const headers = ['Date', 'Start Time', 'Duration (min)', 'Technique', 'Tags', 'Notes']
  const rows = sessions.map(s => {
    const date = new Date(s.startTime)
    return [
      date.toLocaleDateString(),
      date.toLocaleTimeString(),
      Math.round(s.durationSec / 60),
      s.technique,
      s.tags.join('; '),
      `"${s.notes.replace(/"/g, '""')}"`,
    ].join(',')
  })
  return [headers.join(','), ...rows].join('\n')
}

// Clear all data
export function clearAllData(): void {
  if (typeof window === 'undefined') return
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key)
  })
}
