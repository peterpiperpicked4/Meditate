import type { Plan, PlanWeek } from './storage'
import { generateId } from './utils'

export type GoalType = 'calm' | 'focus' | 'emotional-resilience' | 'depth'

export interface PlanBuilderInput {
  currentDailyMinutes: number
  daysPerWeek: number
  goal: GoalType
  weeksCount: 4 | 8 | 12
}

const TECHNIQUES = {
  breath: 'Breath Focus',
  bodyScan: 'Body Scan',
  noting: 'Noting',
  openMonitoring: 'Open Monitoring',
  lovingKindness: 'Loving-Kindness',
  walking: 'Walking Meditation',
  wholeBody: 'Whole-Body Breathing',
}

// Goal-specific technique weightings
const GOAL_TECHNIQUE_WEIGHTS: Record<GoalType, Record<string, number>> = {
  calm: {
    breath: 4,
    bodyScan: 3,
    lovingKindness: 2,
    openMonitoring: 1,
    noting: 1,
  },
  focus: {
    breath: 5,
    noting: 3,
    bodyScan: 2,
    openMonitoring: 1,
  },
  'emotional-resilience': {
    lovingKindness: 4,
    bodyScan: 3,
    breath: 2,
    noting: 2,
    openMonitoring: 1,
  },
  depth: {
    breath: 3,
    wholeBody: 3,
    openMonitoring: 2,
    noting: 2,
    bodyScan: 1,
    lovingKindness: 1,
  },
}

// Focus areas by week progression
const FOCUS_PROGRESSION = [
  'Building consistency and familiarity',
  'Strengthening attention stability',
  'Expanding awareness',
  'Deepening concentration',
  'Refining technique',
  'Integration and exploration',
  'Consolidating skills',
  'Moving toward mastery',
  'Advanced practice territory',
  'Sustained depth',
  'Personal practice style',
  'Continuing the path',
]

function calculateWeekMinutes(
  baseMinutes: number,
  weekNumber: number,
  totalWeeks: number
): number {
  // Gradual increase: ~25% increase over 4 weeks, ~50% over 8 weeks, ~75% over 12 weeks
  const progressFraction = (weekNumber - 1) / Math.max(totalWeeks - 1, 1)
  const maxIncreaseFactor = 1 + (totalWeeks / 16) // 1.25 for 4 weeks, 1.5 for 8, 1.75 for 12
  const currentFactor = 1 + (maxIncreaseFactor - 1) * progressFraction

  const targetMinutes = Math.round(baseMinutes * currentFactor)
  // Round to nearest 5 minutes
  return Math.round(targetMinutes / 5) * 5
}

function distributetechniques(
  totalMinutes: number,
  goal: GoalType,
  weekNumber: number,
  totalWeeks: number
): { name: string; minutes: number }[] {
  const weights = GOAL_TECHNIQUE_WEIGHTS[goal]
  const techniques: { name: string; minutes: number }[] = []

  // Calculate total weight
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0)

  // Determine which techniques to include based on week progression
  // Early weeks: simpler techniques
  // Later weeks: introduce more variety
  const progressFraction = weekNumber / totalWeeks
  let techniqueCount: number

  if (progressFraction <= 0.25) {
    techniqueCount = 2
  } else if (progressFraction <= 0.5) {
    techniqueCount = 3
  } else if (progressFraction <= 0.75) {
    techniqueCount = 4
  } else {
    techniqueCount = Math.min(5, Object.keys(weights).length)
  }

  // Sort techniques by weight and take top N
  const sortedtechniques = Object.entries(weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, techniqueCount)

  // Recalculate weight for selected techniques
  const selectedWeight = sortedtechniques.reduce((sum, [, w]) => sum + w, 0)

  // Distribute minutes proportionally
  let remainingMinutes = totalMinutes

  sortedtechniques.forEach(([tech, weight], index) => {
    const isLast = index === sortedtechniques.length - 1
    const minutes = isLast
      ? remainingMinutes
      : Math.round((totalMinutes * weight) / selectedWeight / 5) * 5

    if (minutes >= 3) {
      techniques.push({
        name: TECHNIQUES[tech as keyof typeof TECHNIQUES] || tech,
        minutes: Math.min(minutes, remainingMinutes),
      })
      remainingMinutes -= minutes
    }
  })

  // Ensure we have at least breath focus if nothing else
  if (techniques.length === 0) {
    techniques.push({
      name: TECHNIQUES.breath,
      minutes: totalMinutes,
    })
  }

  return techniques.filter(t => t.minutes > 0)
}

export function buildPlan(input: PlanBuilderInput): Omit<Plan, 'id' | 'createdAt'> {
  const { currentDailyMinutes, daysPerWeek, goal, weeksCount } = input

  // Generate weeks
  const weeks: PlanWeek[] = []

  for (let i = 1; i <= weeksCount; i++) {
    const dailyMinutes = calculateWeekMinutes(currentDailyMinutes, i, weeksCount)
    const techniques = distributetechniques(dailyMinutes, goal, i, weeksCount)

    weeks.push({
      weekNumber: i,
      dailyMinutes,
      techniques,
      focus: FOCUS_PROGRESSION[Math.min(i - 1, FOCUS_PROGRESSION.length - 1)],
    })
  }

  // Generate name and description based on goal
  const goalNames: Record<GoalType, string> = {
    calm: 'Calm & Relaxation',
    focus: 'Focus & Concentration',
    'emotional-resilience': 'Emotional Resilience',
    depth: 'Deep Practice',
  }

  const name = `${weeksCount}-Week ${goalNames[goal]} Plan`
  const description = `A personalized ${weeksCount}-week plan starting at ${currentDailyMinutes} minutes/day, practicing ${daysPerWeek} days/week, optimized for ${goalNames[goal].toLowerCase()}.`

  return {
    name,
    description,
    startDate: new Date().toISOString(),
    weeks,
    isActive: false,
    isBuiltIn: false,
  }
}

// Built-in plans
export function getBuiltInPlans(): Plan[] {
  return [
    {
      id: 'builtin-7day-start',
      name: '7-Day Start',
      description: 'Your first week of meditation. Simple, achievable, and foundation-building.',
      startDate: '',
      createdAt: '',
      isActive: false,
      isBuiltIn: true,
      weeks: [
        {
          weekNumber: 1,
          dailyMinutes: 10,
          techniques: [
            { name: 'Breath Focus', minutes: 10 },
          ],
          focus: 'Just show up. Sit, breathe, return when distracted.',
        },
      ],
    },
    {
      id: 'builtin-30day-consistency',
      name: '30-Day Consistency',
      description: 'Build a lasting habit over 30 days with gradual progression.',
      startDate: '',
      createdAt: '',
      isActive: false,
      isBuiltIn: true,
      weeks: [
        {
          weekNumber: 1,
          dailyMinutes: 10,
          techniques: [
            { name: 'Breath Focus', minutes: 10 },
          ],
          focus: 'Establishing the routine',
        },
        {
          weekNumber: 2,
          dailyMinutes: 12,
          techniques: [
            { name: 'Breath Focus', minutes: 8 },
            { name: 'Body Scan', minutes: 4 },
          ],
          focus: 'Adding body awareness',
        },
        {
          weekNumber: 3,
          dailyMinutes: 15,
          techniques: [
            { name: 'Breath Focus', minutes: 10 },
            { name: 'Body Scan', minutes: 5 },
          ],
          focus: 'Extending duration',
        },
        {
          weekNumber: 4,
          dailyMinutes: 15,
          techniques: [
            { name: 'Breath Focus', minutes: 10 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Introducing heart practices',
        },
      ],
    },
    {
      id: 'builtin-8week-foundation',
      name: '8-Week Foundation',
      description: 'A comprehensive beginner program building solid meditation foundations.',
      startDate: '',
      createdAt: '',
      isActive: false,
      isBuiltIn: true,
      weeks: [
        {
          weekNumber: 1,
          dailyMinutes: 10,
          techniques: [{ name: 'Breath Focus', minutes: 10 }],
          focus: 'Learning to sit',
        },
        {
          weekNumber: 2,
          dailyMinutes: 12,
          techniques: [
            { name: 'Breath Focus', minutes: 8 },
            { name: 'Body Scan', minutes: 4 },
          ],
          focus: 'Body awareness',
        },
        {
          weekNumber: 3,
          dailyMinutes: 15,
          techniques: [
            { name: 'Breath Focus', minutes: 10 },
            { name: 'Body Scan', minutes: 5 },
          ],
          focus: 'Extending attention',
        },
        {
          weekNumber: 4,
          dailyMinutes: 15,
          techniques: [
            { name: 'Breath Focus', minutes: 10 },
            { name: 'Noting', minutes: 5 },
          ],
          focus: 'Catching distractions',
        },
        {
          weekNumber: 5,
          dailyMinutes: 20,
          techniques: [
            { name: 'Breath Focus', minutes: 12 },
            { name: 'Noting', minutes: 5 },
            { name: 'Loving-Kindness', minutes: 3 },
          ],
          focus: 'Adding heart practice',
        },
        {
          weekNumber: 6,
          dailyMinutes: 20,
          techniques: [
            { name: 'Breath Focus', minutes: 12 },
            { name: 'Body Scan', minutes: 5 },
            { name: 'Loving-Kindness', minutes: 3 },
          ],
          focus: 'Technique variety',
        },
        {
          weekNumber: 7,
          dailyMinutes: 25,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Open Monitoring', minutes: 5 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Open awareness',
        },
        {
          weekNumber: 8,
          dailyMinutes: 25,
          techniques: [
            { name: 'Breath Focus', minutes: 12 },
            { name: 'Body Scan', minutes: 5 },
            { name: 'Open Monitoring', minutes: 5 },
            { name: 'Loving-Kindness', minutes: 3 },
          ],
          focus: 'Integration',
        },
      ],
    },
    {
      id: 'builtin-12week-deepening',
      name: '12-Week Deepening',
      description: 'For those with established practice, ready to go deeper.',
      startDate: '',
      createdAt: '',
      isActive: false,
      isBuiltIn: true,
      weeks: [
        {
          weekNumber: 1,
          dailyMinutes: 20,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Body Scan', minutes: 5 },
          ],
          focus: 'Baseline assessment',
        },
        {
          weekNumber: 2,
          dailyMinutes: 20,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Noting', minutes: 5 },
          ],
          focus: 'Sharpening attention',
        },
        {
          weekNumber: 3,
          dailyMinutes: 25,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Noting', minutes: 5 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Heart-mind balance',
        },
        {
          weekNumber: 4,
          dailyMinutes: 25,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Body Scan', minutes: 10 },
          ],
          focus: 'Deep body awareness',
        },
        {
          weekNumber: 5,
          dailyMinutes: 30,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Whole-Body Breathing', minutes: 10 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Whole-body attention',
        },
        {
          weekNumber: 6,
          dailyMinutes: 30,
          techniques: [
            { name: 'Whole-Body Breathing', minutes: 20 },
            { name: 'Open Monitoring', minutes: 10 },
          ],
          focus: 'Unification',
        },
        {
          weekNumber: 7,
          dailyMinutes: 35,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Whole-Body Breathing', minutes: 15 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Sustained attention',
        },
        {
          weekNumber: 8,
          dailyMinutes: 35,
          techniques: [
            { name: 'Whole-Body Breathing', minutes: 20 },
            { name: 'Open Monitoring', minutes: 10 },
            { name: 'Noting', minutes: 5 },
          ],
          focus: 'Insight preparation',
        },
        {
          weekNumber: 9,
          dailyMinutes: 40,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Open Monitoring', minutes: 15 },
            { name: 'Walking Meditation', minutes: 10 },
          ],
          focus: 'Movement practice',
        },
        {
          weekNumber: 10,
          dailyMinutes: 40,
          techniques: [
            { name: 'Whole-Body Breathing', minutes: 25 },
            { name: 'Open Monitoring', minutes: 10 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Deep concentration',
        },
        {
          weekNumber: 11,
          dailyMinutes: 45,
          techniques: [
            { name: 'Whole-Body Breathing', minutes: 25 },
            { name: 'Open Monitoring', minutes: 15 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Extended sits',
        },
        {
          weekNumber: 12,
          dailyMinutes: 45,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Whole-Body Breathing', minutes: 15 },
            { name: 'Open Monitoring', minutes: 10 },
            { name: 'Loving-Kindness', minutes: 5 },
          ],
          focus: 'Personal integration',
        },
      ],
    },
    {
      id: 'builtin-retreat-prep',
      name: '2-Week Retreat Prep',
      description: 'Prepare your mind and practice for an upcoming retreat.',
      startDate: '',
      createdAt: '',
      isActive: false,
      isBuiltIn: true,
      weeks: [
        {
          weekNumber: 1,
          dailyMinutes: 30,
          techniques: [
            { name: 'Breath Focus', minutes: 15 },
            { name: 'Body Scan', minutes: 10 },
            { name: 'Walking Meditation', minutes: 5 },
          ],
          focus: 'Increasing sit time',
        },
        {
          weekNumber: 2,
          dailyMinutes: 45,
          techniques: [
            { name: 'Breath Focus', minutes: 20 },
            { name: 'Whole-Body Breathing', minutes: 15 },
            { name: 'Loving-Kindness', minutes: 5 },
            { name: 'Walking Meditation', minutes: 5 },
          ],
          focus: 'Simulating retreat conditions',
        },
      ],
    },
  ]
}

export function getTodaysPractice(activePlan: Plan | null, currentWeek: number): {
  minutes: number
  techniques: { name: string; minutes: number }[]
  focus: string
} | null {
  if (!activePlan || !activePlan.weeks || activePlan.weeks.length === 0) {
    return null
  }

  const weekIndex = Math.min(currentWeek - 1, activePlan.weeks.length - 1)
  const week = activePlan.weeks[weekIndex]

  if (!week) return null

  return {
    minutes: week.dailyMinutes,
    techniques: week.techniques,
    focus: week.focus,
  }
}

export function getPlanProgress(plan: Plan): {
  currentWeek: number
  totalWeeks: number
  percentComplete: number
  daysCompleted: number
  totalDays: number
} {
  if (!plan.startDate || !plan.weeks) {
    return {
      currentWeek: 1,
      totalWeeks: plan.weeks?.length || 0,
      percentComplete: 0,
      daysCompleted: 0,
      totalDays: (plan.weeks?.length || 0) * 7,
    }
  }

  const startDate = new Date(plan.startDate)
  const now = new Date()
  const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const totalDays = plan.weeks.length * 7
  const currentWeek = Math.min(Math.floor(daysSinceStart / 7) + 1, plan.weeks.length)

  return {
    currentWeek,
    totalWeeks: plan.weeks.length,
    percentComplete: Math.min(100, Math.round((daysSinceStart / totalDays) * 100)),
    daysCompleted: Math.min(daysSinceStart, totalDays),
    totalDays,
  }
}
