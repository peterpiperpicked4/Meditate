'use client'

import * as React from 'react'
import { BreathPattern, BREATH_PRESETS, getCycleDuration, SoundProfile, SOUND_PROFILES } from '@/lib/breathing'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Volume2, VolumeX, Smartphone, Music } from 'lucide-react'

interface BreathingControlsProps {
  pattern: BreathPattern
  onPatternChange: (pattern: BreathPattern) => void
  duration: number  // in minutes
  onDurationChange: (minutes: number) => void
  soundEnabled: boolean
  onSoundToggle: () => void
  soundProfile: SoundProfile
  onSoundProfileChange: (profile: SoundProfile) => void
  hapticEnabled: boolean
  onHapticToggle: () => void
  disabled?: boolean
}

export function BreathingControls({
  pattern,
  onPatternChange,
  duration,
  onDurationChange,
  soundEnabled,
  onSoundToggle,
  soundProfile,
  onSoundProfileChange,
  hapticEnabled,
  onHapticToggle,
  disabled = false,
}: BreathingControlsProps) {
  const [showCustom, setShowCustom] = React.useState(false)
  const [customPattern, setCustomPattern] = React.useState<BreathPattern>(pattern)

  const cycleDuration = getCycleDuration(pattern)
  const breathsPerSession = Math.floor((duration * 60) / cycleDuration)

  const handlePresetSelect = (preset: BreathPattern) => {
    onPatternChange(preset)
    setCustomPattern(preset)
    setShowCustom(false)
  }

  const handleCustomChange = (field: keyof BreathPattern, value: number) => {
    const updated = { ...customPattern, [field]: value, id: 'custom', name: 'Custom' }
    setCustomPattern(updated)
    onPatternChange(updated)
  }

  return (
    <div className={cn('space-y-6', disabled && 'opacity-50 pointer-events-none')}>
      {/* Presets */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Pattern</h3>
        <div className="flex flex-wrap gap-2">
          {BREATH_PRESETS.map((preset) => (
            <Button
              key={preset.id}
              variant={pattern.id === preset.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePresetSelect(preset)}
              className={cn(
                'min-h-[44px]',
                pattern.id === preset.id && 'bg-primary text-primary-foreground'
              )}
            >
              {preset.name}
            </Button>
          ))}
          <Button
            variant={pattern.id === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowCustom(!showCustom)}
            className="min-h-[44px]"
          >
            Custom
          </Button>
        </div>
      </div>

      {/* Pattern description */}
      <p className="text-sm text-muted-foreground">
        {pattern.description || 'Custom breathing pattern'}
      </p>

      {/* Pattern timing display */}
      <div className="flex items-center justify-center gap-2 text-lg font-mono py-3 px-4 rounded-lg bg-muted/30">
        <span className="text-primary">{pattern.inhale}s</span>
        <span className="text-muted-foreground">in</span>
        {pattern.hold1 > 0 && (
          <>
            <span className="text-muted-foreground/50">→</span>
            <span>{pattern.hold1}s</span>
            <span className="text-muted-foreground">hold</span>
          </>
        )}
        <span className="text-muted-foreground/50">→</span>
        <span className="text-amber-400">{pattern.exhale}s</span>
        <span className="text-muted-foreground">out</span>
        {pattern.hold2 > 0 && (
          <>
            <span className="text-muted-foreground/50">→</span>
            <span>{pattern.hold2}s</span>
            <span className="text-muted-foreground">hold</span>
          </>
        )}
      </div>

      {/* Custom timing sliders */}
      {showCustom && (
        <div className="space-y-4 p-4 rounded-lg border border-border/50 bg-card/30">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Inhale</label>
              <span className="text-sm font-mono text-primary">{customPattern.inhale}s</span>
            </div>
            <Slider
              value={[customPattern.inhale]}
              onValueChange={([v]) => handleCustomChange('inhale', v)}
              min={1}
              max={15}
              step={0.5}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Hold after inhale</label>
              <span className="text-sm font-mono">{customPattern.hold1}s</span>
            </div>
            <Slider
              value={[customPattern.hold1]}
              onValueChange={([v]) => handleCustomChange('hold1', v)}
              min={0}
              max={15}
              step={0.5}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Exhale</label>
              <span className="text-sm font-mono text-amber-400">{customPattern.exhale}s</span>
            </div>
            <Slider
              value={[customPattern.exhale]}
              onValueChange={([v]) => handleCustomChange('exhale', v)}
              min={1}
              max={15}
              step={0.5}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Hold after exhale</label>
              <span className="text-sm font-mono">{customPattern.hold2}s</span>
            </div>
            <Slider
              value={[customPattern.hold2]}
              onValueChange={([v]) => handleCustomChange('hold2', v)}
              min={0}
              max={15}
              step={0.5}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>
        </div>
      )}

      {/* Session duration */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-muted-foreground">Duration</label>
          <span className="text-sm font-mono text-primary">{duration} min</span>
        </div>
        <Slider
          value={[duration]}
          onValueChange={([v]) => onDurationChange(v)}
          min={1}
          max={30}
          step={1}
          className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>1 min</span>
          <span>~{breathsPerSession} breaths</span>
          <span>30 min</span>
        </div>
      </div>

      {/* Sound profile selector */}
      {soundEnabled && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Music className="h-4 w-4" />
            Sound Style
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SOUND_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => onSoundProfileChange(profile.id)}
                className={cn(
                  'p-3 rounded-lg border text-left transition-all min-h-[44px]',
                  soundProfile === profile.id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border/50 bg-card/30 text-muted-foreground hover:border-primary/50 hover:bg-card/50'
                )}
              >
                <span className="text-sm font-medium block">{profile.name}</span>
                <span className="text-xs text-muted-foreground block mt-0.5 line-clamp-1">
                  {profile.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Settings toggles */}
      <div className="flex items-center gap-4 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSoundToggle}
          className={cn(
            'gap-2 min-h-[44px]',
            !soundEnabled && 'text-muted-foreground'
          )}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
          Sound {soundEnabled ? 'On' : 'Off'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onHapticToggle}
          className={cn(
            'gap-2 min-h-[44px]',
            !hapticEnabled && 'text-muted-foreground'
          )}
        >
          <Smartphone className="h-4 w-4" />
          Haptic {hapticEnabled ? 'On' : 'Off'}
        </Button>
      </div>
    </div>
  )
}
