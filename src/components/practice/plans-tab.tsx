'use client'

import * as React from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getPlans, addPlan, deletePlan, getPreferences, setActivePlan, type Plan } from '@/lib/storage'
import { buildPlan, getBuiltInPlans, getPlanProgress, type GoalType } from '@/lib/plan-builder'

export function PlansTab() {
  const [plans, setPlans] = React.useState<Plan[]>([])
  const [activePlanId, setActivePlanIdState] = React.useState<string | null>(null)
  const [showBuilder, setShowBuilder] = React.useState(false)
  const [expandedPlan, setExpandedPlan] = React.useState<string | null>(null)

  // Builder state
  const [builderMinutes, setBuilderMinutes] = React.useState(15)
  const [builderDays, setBuilderDays] = React.useState(5)
  const [builderGoal, setBuilderGoal] = React.useState<GoalType>('calm')
  const [builderWeeks, setBuilderWeeks] = React.useState<4 | 8 | 12>(4)

  const loadPlans = React.useCallback(() => {
    const userPlans = getPlans()
    const builtIns = getBuiltInPlans()
    // Combine built-in and user plans, avoiding duplicates
    const allPlans = [
      ...builtIns.filter(bp => !userPlans.find(up => up.id === bp.id)),
      ...userPlans,
    ]
    setPlans(allPlans)
    const prefs = getPreferences()
    setActivePlanIdState(prefs.activePlanId)
  }, [])

  React.useEffect(() => {
    loadPlans()
  }, [loadPlans])

  const handleActivatePlan = (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (!plan) return

    // If it's a built-in plan, we need to add it with a start date
    if (plan.isBuiltIn) {
      const userPlan = {
        ...plan,
        id: `user-${plan.id}`,
        startDate: new Date().toISOString(),
        isActive: true,
        isBuiltIn: false,
      }
      addPlan(userPlan)
      setActivePlan(userPlan.id)
    } else {
      setActivePlan(planId)
    }
    loadPlans()
  }

  const handleDeactivatePlan = () => {
    setActivePlan(null)
    loadPlans()
  }

  const handleDeletePlan = (planId: string) => {
    deletePlan(planId)
    if (activePlanId === planId) {
      setActivePlan(null)
    }
    loadPlans()
  }

  const handleCreatePlan = () => {
    const plan = buildPlan({
      currentDailyMinutes: builderMinutes,
      daysPerWeek: builderDays,
      goal: builderGoal,
      weeksCount: builderWeeks,
    })

    const newPlan = addPlan({
      ...plan,
      startDate: new Date().toISOString(),
      isActive: false,
    })

    setShowBuilder(false)
    loadPlans()

    // Ask if they want to activate
    handleActivatePlan(newPlan.id)
  }

  const activePlan = plans.find(p => p.id === activePlanId)

  return (
    <div className="space-y-6">
      {/* Active Plan */}
      {activePlan && (
        <div className="card-contemplative rounded-xl p-6 border-primary/20 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-primary/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary mb-2">
                  <Sparkles className="h-3 w-3" />
                  Active Plan
                </div>
                <h3 className="font-display text-xl">{activePlan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{activePlan.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeactivatePlan}
                aria-label={`Deactivate ${activePlan.name} plan`}
                className="text-muted-foreground hover:text-foreground"
              >
                Deactivate
              </Button>
            </div>

            {activePlan.weeks && activePlan.weeks.length > 0 && (
              <>
                {(() => {
                  const progress = getPlanProgress(activePlan)
                  const currentWeek = activePlan.weeks[Math.min(progress.currentWeek - 1, activePlan.weeks.length - 1)]
                  return (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Week {progress.currentWeek} of {progress.totalWeeks}</span>
                          <span className="text-primary font-mono">{progress.percentComplete}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                            style={{ width: `${progress.percentComplete}%` }}
                          />
                        </div>
                      </div>
                      <div className="rounded-lg bg-card/50 border border-border/30 p-4">
                        <h4 className="text-sm text-primary/80 uppercase tracking-wider mb-2">This Week</h4>
                        <p className="font-display text-3xl text-gradient">{currentWeek.dailyMinutes} min/day</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {currentWeek.techniques.map((t, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary/90"
                            >
                              {t.name} ({t.minutes} min)
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3 italic">
                          Focus: {currentWeek.focus}
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </>
            )}
          </div>
        </div>
      )}

      {/* Create Plan */}
      <div className="card-contemplative rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg">Build Your Own Plan</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create a personalized plan based on your current practice level and goals.
            </p>
          </div>
          <Dialog open={showBuilder} onOpenChange={setShowBuilder}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90 btn-press">
                <Plus className="mr-2 h-4 w-4" />
                Create Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-card border-border/50">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Create a Practice Plan</DialogTitle>
                <DialogDescription>
                  Tell us about your current practice and goals, and we&apos;ll create a progressive plan for you.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Current Minutes */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Current daily practice</Label>
                    <span className="text-sm text-primary font-mono">{builderMinutes} min</span>
                  </div>
                  <Slider
                    value={[builderMinutes]}
                    onValueChange={(v) => setBuilderMinutes(v[0])}
                    min={5}
                    max={45}
                    step={5}
                    className="[&_[role=slider]]:border-primary/50 [&_[role=slider]]:bg-primary"
                  />
                </div>

                {/* Days per week */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Days per week</Label>
                    <span className="text-sm text-primary font-mono">{builderDays} days</span>
                  </div>
                  <Slider
                    value={[builderDays]}
                    onValueChange={(v) => setBuilderDays(v[0])}
                    min={3}
                    max={7}
                    step={1}
                    className="[&_[role=slider]]:border-primary/50 [&_[role=slider]]:bg-primary"
                  />
                </div>

                {/* Goal */}
                <div>
                  <Label>Primary goal</Label>
                  <Select value={builderGoal} onValueChange={(v) => setBuilderGoal(v as GoalType)}>
                    <SelectTrigger className="mt-2 bg-card/50 border-border/50 focus:border-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      <SelectItem value="calm">Calm & Relaxation</SelectItem>
                      <SelectItem value="focus">Focus & Concentration</SelectItem>
                      <SelectItem value="emotional-resilience">Emotional Resilience</SelectItem>
                      <SelectItem value="depth">Deep Practice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div>
                  <Label>Plan duration</Label>
                  <Select
                    value={builderWeeks.toString()}
                    onValueChange={(v) => setBuilderWeeks(parseInt(v) as 4 | 8 | 12)}
                  >
                    <SelectTrigger className="mt-2 bg-card/50 border-border/50 focus:border-primary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      <SelectItem value="4">4 weeks</SelectItem>
                      <SelectItem value="8">8 weeks</SelectItem>
                      <SelectItem value="12">12 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreatePlan} className="bg-primary hover:bg-primary/90 btn-press">
                  Create & Activate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Built-in Plans */}
      <div>
        <h3 className="font-display text-lg mb-4">Pre-made Plans</h3>
        <div className="space-y-4">
          {plans.filter(p => p.isBuiltIn).map((plan) => (
            <div key={plan.id} className="card-contemplative rounded-xl p-5 hover-glow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display text-base">{plan.name}</h4>
                    {activePlanId && activePlanId.includes(plan.id) && (
                      <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>
                <div className="flex gap-2">
                  {!(activePlanId && activePlanId.includes(plan.id)) && (
                    <Button
                      size="sm"
                      onClick={() => handleActivatePlan(plan.id)}
                      className="bg-primary/90 hover:bg-primary btn-press"
                    >
                      Start
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                    aria-expanded={expandedPlan === plan.id}
                    aria-label={expandedPlan === plan.id ? `Collapse ${plan.name} details` : `Expand ${plan.name} details`}
                    className="text-muted-foreground"
                  >
                    {expandedPlan === plan.id ? (
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>
              {expandedPlan === plan.id && plan.weeks && (
                <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                  {plan.weeks.map((week) => (
                    <div key={week.weekNumber} className="flex items-start gap-3 text-sm">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-mono text-primary">
                        {week.weekNumber}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{week.dailyMinutes} min/day</p>
                        <p className="text-muted-foreground text-xs">
                          {week.techniques.map(t => t.name).join(', ')}
                        </p>
                        <p className="text-muted-foreground text-xs italic mt-0.5">{week.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Plans */}
      {plans.filter(p => !p.isBuiltIn).length > 0 && (
        <div>
          <h3 className="font-display text-lg mb-4">Your Plans</h3>
          <div className="space-y-4">
            {plans.filter(p => !p.isBuiltIn).map((plan) => {
              const progress = getPlanProgress(plan)
              return (
                <div key={plan.id} className="card-contemplative rounded-xl p-5 hover-glow group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-display text-base">{plan.name}</h4>
                        {activePlanId === plan.id && (
                          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    </div>
                    <div className="flex gap-2">
                      {activePlanId !== plan.id && (
                        <Button
                          size="sm"
                          onClick={() => handleActivatePlan(plan.id)}
                          className="bg-primary/90 hover:bg-primary btn-press"
                        >
                          Start
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        aria-label={`Delete plan: ${plan.name}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Week {progress.currentWeek} of {progress.totalWeeks}</span>
                      <span className="font-mono">{progress.percentComplete}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${progress.percentComplete}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="rounded-xl border border-border/30 bg-card/20 p-5">
        <h4 className="font-display text-sm text-primary/80 uppercase tracking-wider mb-2">
          Feeling overwhelmed?
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If any plan feels like too much, simplify: drop back to just breath focus,
          shorten your sessions, or skip a day. The goal is consistency over time,
          not perfect adherence.
        </p>
      </div>
    </div>
  )
}
