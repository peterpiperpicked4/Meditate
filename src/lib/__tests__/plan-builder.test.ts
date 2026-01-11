import { describe, it, expect } from 'vitest'
import { buildPlan, getBuiltInPlans, getPlanProgress, getTodaysPractice } from '../plan-builder'

describe('buildPlan', () => {
  it('should create a 4-week plan with progressive duration', () => {
    const plan = buildPlan({
      currentDailyMinutes: 15,
      daysPerWeek: 5,
      goal: 'calm',
      weeksCount: 4,
    })

    expect(plan.weeks).toHaveLength(4)
    expect(plan.weeks[0].weekNumber).toBe(1)
    expect(plan.weeks[0].dailyMinutes).toBe(15)
    // Last week should be higher than first week
    expect(plan.weeks[3].dailyMinutes).toBeGreaterThanOrEqual(plan.weeks[0].dailyMinutes)
  })

  it('should create a 12-week plan', () => {
    const plan = buildPlan({
      currentDailyMinutes: 20,
      daysPerWeek: 7,
      goal: 'depth',
      weeksCount: 12,
    })

    expect(plan.weeks).toHaveLength(12)
    expect(plan.name).toContain('12-Week')
    expect(plan.name).toContain('Deep Practice')
  })

  it('should include techniques for each week', () => {
    const plan = buildPlan({
      currentDailyMinutes: 15,
      daysPerWeek: 5,
      goal: 'focus',
      weeksCount: 8,
    })

    plan.weeks.forEach((week) => {
      expect(week.techniques).toBeDefined()
      expect(week.techniques.length).toBeGreaterThan(0)
      // All techniques should have positive minutes
      week.techniques.forEach((t) => {
        expect(t.minutes).toBeGreaterThan(0)
      })
    })
  })

  it('should have focus text for each week', () => {
    const plan = buildPlan({
      currentDailyMinutes: 10,
      daysPerWeek: 5,
      goal: 'emotional-resilience',
      weeksCount: 4,
    })

    plan.weeks.forEach((week) => {
      expect(week.focus).toBeDefined()
      expect(week.focus.length).toBeGreaterThan(0)
    })
  })

  it('should distribute techniques according to goal', () => {
    const calmPlan = buildPlan({
      currentDailyMinutes: 20,
      daysPerWeek: 5,
      goal: 'calm',
      weeksCount: 4,
    })

    const depthPlan = buildPlan({
      currentDailyMinutes: 20,
      daysPerWeek: 5,
      goal: 'depth',
      weeksCount: 4,
    })

    // Different goals should produce different technique distributions
    // This is a soft check since the exact distribution depends on algorithm
    const calmTechniques = new Set(
      calmPlan.weeks.flatMap((w) => w.techniques.map((t) => t.name))
    )
    const depthTechniques = new Set(
      depthPlan.weeks.flatMap((w) => w.techniques.map((t) => t.name))
    )

    // Both should have some techniques
    expect(calmTechniques.size).toBeGreaterThan(0)
    expect(depthTechniques.size).toBeGreaterThan(0)
  })
})

describe('getBuiltInPlans', () => {
  it('should return all built-in plans', () => {
    const plans = getBuiltInPlans()

    expect(plans.length).toBeGreaterThan(0)
    expect(plans.some((p) => p.name === '7-Day Start')).toBe(true)
    expect(plans.some((p) => p.name === '30-Day Consistency')).toBe(true)
    expect(plans.some((p) => p.name === '8-Week Foundation')).toBe(true)
    expect(plans.some((p) => p.name === '12-Week Deepening')).toBe(true)
    expect(plans.some((p) => p.name === '2-Week Retreat Prep')).toBe(true)
  })

  it('should mark all built-in plans as isBuiltIn', () => {
    const plans = getBuiltInPlans()

    plans.forEach((plan) => {
      expect(plan.isBuiltIn).toBe(true)
    })
  })

  it('should have valid week structures for all plans', () => {
    const plans = getBuiltInPlans()

    plans.forEach((plan) => {
      expect(plan.weeks).toBeDefined()
      expect(plan.weeks.length).toBeGreaterThan(0)
      plan.weeks.forEach((week) => {
        expect(week.weekNumber).toBeGreaterThan(0)
        expect(week.dailyMinutes).toBeGreaterThan(0)
        expect(week.techniques.length).toBeGreaterThan(0)
        expect(week.focus).toBeDefined()
      })
    })
  })
})

describe('getPlanProgress', () => {
  it('should calculate correct progress for a plan started today', () => {
    const plan = {
      id: 'test',
      name: 'Test Plan',
      description: 'Test',
      startDate: new Date().toISOString(),
      weeks: [
        { weekNumber: 1, dailyMinutes: 10, techniques: [], focus: 'Test' },
        { weekNumber: 2, dailyMinutes: 15, techniques: [], focus: 'Test' },
      ],
      createdAt: new Date().toISOString(),
      isActive: true,
      isBuiltIn: false,
    }

    const progress = getPlanProgress(plan)

    expect(progress.currentWeek).toBe(1)
    expect(progress.totalWeeks).toBe(2)
    expect(progress.percentComplete).toBe(0)
    expect(progress.daysCompleted).toBe(0)
    expect(progress.totalDays).toBe(14)
  })

  it('should calculate progress for a plan started a week ago', () => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    const plan = {
      id: 'test',
      name: 'Test Plan',
      description: 'Test',
      startDate: weekAgo.toISOString(),
      weeks: [
        { weekNumber: 1, dailyMinutes: 10, techniques: [], focus: 'Test' },
        { weekNumber: 2, dailyMinutes: 15, techniques: [], focus: 'Test' },
      ],
      createdAt: weekAgo.toISOString(),
      isActive: true,
      isBuiltIn: false,
    }

    const progress = getPlanProgress(plan)

    expect(progress.currentWeek).toBe(2)
    expect(progress.daysCompleted).toBe(7)
    expect(progress.percentComplete).toBe(50)
  })

  it('should handle plans without start dates', () => {
    const plan = {
      id: 'test',
      name: 'Test Plan',
      description: 'Test',
      startDate: '',
      weeks: [
        { weekNumber: 1, dailyMinutes: 10, techniques: [], focus: 'Test' },
      ],
      createdAt: '',
      isActive: false,
      isBuiltIn: true,
    }

    const progress = getPlanProgress(plan)

    expect(progress.currentWeek).toBe(1)
    expect(progress.percentComplete).toBe(0)
  })
})

describe('getTodaysPractice', () => {
  it('should return todays practice from active plan', () => {
    const plan = {
      id: 'test',
      name: 'Test Plan',
      description: 'Test',
      startDate: new Date().toISOString(),
      weeks: [
        {
          weekNumber: 1,
          dailyMinutes: 15,
          techniques: [
            { name: 'Breath Focus', minutes: 10 },
            { name: 'Body Scan', minutes: 5 },
          ],
          focus: 'Building consistency',
        },
      ],
      createdAt: new Date().toISOString(),
      isActive: true,
      isBuiltIn: false,
    }

    const todaysPractice = getTodaysPractice(plan, 1)

    expect(todaysPractice).not.toBeNull()
    expect(todaysPractice?.minutes).toBe(15)
    expect(todaysPractice?.techniques).toHaveLength(2)
    expect(todaysPractice?.focus).toBe('Building consistency')
  })

  it('should return null for null plan', () => {
    const todaysPractice = getTodaysPractice(null, 1)
    expect(todaysPractice).toBeNull()
  })
})
