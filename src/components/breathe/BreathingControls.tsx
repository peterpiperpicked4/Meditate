'use client'

import * as React from 'react'
import {
  BreathPattern,
  BREATH_PRESETS,
  getCycleDuration,
  SoundProfile,
  SOUND_PROFILES,
  AmbientSound,
  AMBIENT_SOUNDS,
  previewSoundProfile,
  previewAmbientSound,
  stopAmbientSound,
} from '@/lib/breathing'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Volume2, VolumeX, Smartphone, Music, Play, CloudRain, Volume1, ArrowRight, TrendingUp } from 'lucide-react'

interface BreathingControlsProps {
  pattern: BreathPattern
  onPatternChange: (pattern: BreathPattern) => void
  duration: number  // in minutes
  onDurationChange: (minutes: number) => void
  soundEnabled: boolean
  onSoundToggle: () => void
  soundProfile: SoundProfile
  onSoundProfileChange: (profile: SoundProfile) => void
  soundVolume: number
  onSoundVolumeChange: (volume: number) => void
  hapticEnabled: boolean
  onHapticToggle: () => void
  muteHoldPhases: boolean
  onMuteHoldPhasesToggle: () => void
  ambientSound: AmbientSound | null
  onAmbientSoundChange: (sound: AmbientSound | null) => void
  ambientVolume: number
  onAmbientVolumeChange: (volume: number) => void
  rampEnabled?: boolean
  onRampToggle?: () => void
  rampDuration?: number
  onRampDurationChange?: (minutes: number) => void
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
  soundVolume,
  onSoundVolumeChange,
  hapticEnabled,
  onHapticToggle,
  muteHoldPhases,
  onMuteHoldPhasesToggle,
  ambientSound,
  onAmbientSoundChange,
  ambientVolume,
  onAmbientVolumeChange,
  rampEnabled = false,
  onRampToggle,
  rampDuration = 3,
  onRampDurationChange,
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

  const handlePreviewSound = (profile: SoundProfile) => {
    previewSoundProfile(profile, soundVolume)
  }

  const handlePreviewAmbient = (sound: AmbientSound) => {
    previewAmbientSound(sound, ambientVolume)
  }

  // Clean up ambient preview on unmount
  React.useEffect(() => {
    return () => {
      stopAmbientSound()
    }
  }, [])

  return (
    <div className={cn('space-y-6', disabled && 'opacity-50')} aria-disabled={disabled}>
      {/* Presets */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Pattern</h3>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Breathing pattern presets">
          {BREATH_PRESETS.map((preset) => (
            <Button
              key={preset.id}
              variant={pattern.id === preset.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePresetSelect(preset)}
              role="radio"
              aria-checked={pattern.id === preset.id}
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
            aria-pressed={showCustom || pattern.id === 'custom'}
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
            <ArrowRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
            <span>{pattern.hold1}s</span>
            <span className="text-muted-foreground">hold</span>
          </>
        )}
        <ArrowRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
        <span className="text-accent">{pattern.exhale}s</span>
        <span className="text-muted-foreground">out</span>
        {pattern.hold2 > 0 && (
          <>
            <ArrowRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
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
              <label htmlFor="slider-inhale" className="text-sm">Inhale</label>
              <span className="text-sm font-mono text-primary">{customPattern.inhale}s</span>
            </div>
            <Slider
              id="slider-inhale"
              value={[customPattern.inhale]}
              onValueChange={([v]) => handleCustomChange('inhale', v)}
              min={1}
              max={15}
              step={0.5}
              aria-valuetext={`${customPattern.inhale} seconds`}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="slider-hold1" className="text-sm">Hold after inhale</label>
              <span className="text-sm font-mono">{customPattern.hold1}s</span>
            </div>
            <Slider
              id="slider-hold1"
              value={[customPattern.hold1]}
              onValueChange={([v]) => handleCustomChange('hold1', v)}
              min={0}
              max={15}
              step={0.5}
              aria-valuetext={`${customPattern.hold1} seconds`}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="slider-exhale" className="text-sm">Exhale</label>
              <span className="text-sm font-mono text-accent">{customPattern.exhale}s</span>
            </div>
            <Slider
              id="slider-exhale"
              value={[customPattern.exhale]}
              onValueChange={([v]) => handleCustomChange('exhale', v)}
              min={1}
              max={15}
              step={0.5}
              aria-valuetext={`${customPattern.exhale} seconds`}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="slider-hold2" className="text-sm">Hold after exhale</label>
              <span className="text-sm font-mono">{customPattern.hold2}s</span>
            </div>
            <Slider
              id="slider-hold2"
              value={[customPattern.hold2]}
              onValueChange={([v]) => handleCustomChange('hold2', v)}
              min={0}
              max={15}
              step={0.5}
              aria-valuetext={`${customPattern.hold2} seconds`}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>
        </div>
      )}

      {/* Session duration */}
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor="slider-duration" className="text-sm font-medium text-muted-foreground">Duration</label>
          <span className="text-sm font-mono text-primary">{duration} min</span>
        </div>
        <Slider
          id="slider-duration"
          value={[duration]}
          onValueChange={([v]) => onDurationChange(v)}
          min={1}
          max={30}
          step={1}
          aria-valuetext={`${duration} minutes`}
          className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>1 min</span>
          <span>~{breathsPerSession} breaths</span>
          <span>30 min</span>
        </div>
      </div>

      {/* Ramp Mode */}
      {onRampToggle && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <label htmlFor="ramp-toggle" className="text-sm font-medium text-muted-foreground">
                Ramp Mode
              </label>
            </div>
            <Button
              id="ramp-toggle"
              variant="ghost"
              size="sm"
              onClick={onRampToggle}
              disabled={disabled}
              aria-pressed={rampEnabled}
              className={cn(
                'min-h-[44px] px-4',
                rampEnabled ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              )}
            >
              {rampEnabled ? 'On' : 'Off'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Start with easier timings, gradually build to full pattern
          </p>
          {rampEnabled && onRampDurationChange && (
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="slider-ramp-duration" className="text-sm">Ramp Duration</label>
                <span className="text-sm font-mono">{rampDuration} min</span>
              </div>
              <Slider
                id="slider-ramp-duration"
                value={[rampDuration]}
                onValueChange={([v]) => onRampDurationChange(v)}
                min={1}
                max={10}
                step={1}
                disabled={disabled}
                aria-valuetext={`${rampDuration} minutes to reach target`}
                className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Time to reach full {pattern.name} pattern
              </p>
            </div>
          )}
        </div>
      )}

      {/* Sound settings section */}
      {soundEnabled && (
        <div className="space-y-5">
          {/* Sound profile selector */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Music className="h-4 w-4" aria-hidden="true" />
              Sound Style
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Sound profile selection">
              {SOUND_PROFILES.map((profile) => (
                <div
                  key={profile.id}
                  role="radio"
                  tabIndex={disabled ? -1 : 0}
                  aria-checked={soundProfile === profile.id}
                  aria-label={`${profile.name}: ${profile.description}`}
                  aria-disabled={disabled}
                  onClick={() => !disabled && onSoundProfileChange(profile.id)}
                  onKeyDown={(e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      onSoundProfileChange(profile.id)
                    }
                  }}
                  className={cn(
                    'p-3 rounded-lg border text-left transition-all min-h-[44px] relative group cursor-pointer',
                    soundProfile === profile.id
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border/50 bg-card/30 text-muted-foreground hover:border-primary/50 hover:bg-card/50',
                    disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  <span className="text-sm font-medium block pr-6">{profile.name}</span>
                  <span className="text-xs text-muted-foreground block mt-0.5 line-clamp-1">
                    {profile.description}
                  </span>
                  {/* Preview button - visible on touch devices */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePreviewSound(profile.id)
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-md opacity-40 sm:opacity-0 sm:group-hover:opacity-100 hover:opacity-100 hover:bg-primary/20 transition-opacity touch-manipulation"
                    aria-label={`Preview ${profile.name} sound`}
                  >
                    <Play className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Volume slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="slider-volume" className="text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                Volume
              </label>
              <span className="text-sm font-mono">{Math.round(soundVolume * 100)}%</span>
            </div>
            <Slider
              id="slider-volume"
              value={[soundVolume * 100]}
              onValueChange={([v]) => !disabled && onSoundVolumeChange(v / 100)}
              min={0}
              max={100}
              step={5}
              disabled={disabled}
              aria-valuetext={`${Math.round(soundVolume * 100)} percent`}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
            />
          </div>

          {/* Mute during holds toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMuteHoldPhasesToggle}
            disabled={disabled}
            aria-pressed={muteHoldPhases}
            className={cn(
              'gap-2 min-h-[44px] w-full justify-start',
              muteHoldPhases ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <Volume1 className="h-4 w-4" aria-hidden="true" />
            Mute during hold phases
            {muteHoldPhases && <span className="ml-auto text-xs bg-primary/20 px-2 py-0.5 rounded">On</span>}
          </Button>

          <div className="h-px bg-border/30" aria-hidden="true" />
        </div>
      )}

      {/* Ambient sounds section */}
      {soundEnabled && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <CloudRain className="h-4 w-4" aria-hidden="true" />
            Background Ambient
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Ambient sound selection">
            {/* No ambient option */}
            <button
              onClick={() => !disabled && onAmbientSoundChange(null)}
              role="radio"
              aria-checked={ambientSound === null}
              disabled={disabled}
              className={cn(
                'p-3 rounded-lg border text-left transition-all min-h-[44px]',
                ambientSound === null
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border/50 bg-card/30 text-muted-foreground hover:border-primary/50 hover:bg-card/50',
                disabled && 'cursor-not-allowed'
              )}
            >
              <span className="text-sm font-medium block">None</span>
              <span className="text-xs text-muted-foreground block mt-0.5">
                No background sound
              </span>
            </button>

            {AMBIENT_SOUNDS.map((sound) => (
              <div
                key={sound.id}
                role="radio"
                tabIndex={disabled ? -1 : 0}
                aria-checked={ambientSound === sound.id}
                aria-label={`${sound.name}: ${sound.description}`}
                aria-disabled={disabled}
                onClick={() => !disabled && onAmbientSoundChange(sound.id)}
                onKeyDown={(e) => {
                  if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onAmbientSoundChange(sound.id)
                  }
                }}
                className={cn(
                  'p-3 rounded-lg border text-left transition-all min-h-[44px] relative group cursor-pointer',
                  ambientSound === sound.id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border/50 bg-card/30 text-muted-foreground hover:border-primary/50 hover:bg-card/50',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                <span className="text-sm font-medium block pr-6">{sound.name}</span>
                <span className="text-xs text-muted-foreground block mt-0.5 line-clamp-1">
                  {sound.description}
                </span>
                {/* Preview button - visible on touch devices */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePreviewAmbient(sound.id)
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-md opacity-40 sm:opacity-0 sm:group-hover:opacity-100 hover:opacity-100 hover:bg-primary/20 transition-opacity touch-manipulation"
                  aria-label={`Preview ${sound.name} ambient sound`}
                >
                  <Play className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {/* Ambient volume slider (only show if ambient is selected) */}
          {ambientSound && (
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="slider-ambient-volume" className="text-sm">Ambient Volume</label>
                <span className="text-sm font-mono">{Math.round(ambientVolume * 100)}%</span>
              </div>
              <Slider
                id="slider-ambient-volume"
                value={[ambientVolume * 100]}
                onValueChange={([v]) => !disabled && onAmbientVolumeChange(v / 100)}
                min={0}
                max={100}
                step={5}
                disabled={disabled}
                aria-valuetext={`${Math.round(ambientVolume * 100)} percent`}
                className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
              />
            </div>
          )}
        </div>
      )}

      {/* Settings toggles */}
      <div className="flex items-center gap-4 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSoundToggle}
          disabled={disabled}
          aria-pressed={soundEnabled}
          className={cn(
            'gap-2 min-h-[44px]',
            !soundEnabled && 'text-muted-foreground'
          )}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          )}
          Sound {soundEnabled ? 'On' : 'Off'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onHapticToggle}
          disabled={disabled}
          aria-pressed={hapticEnabled}
          className={cn(
            'gap-2 min-h-[44px]',
            !hapticEnabled && 'text-muted-foreground'
          )}
        >
          <Smartphone className="h-4 w-4" aria-hidden="true" />
          Haptic {hapticEnabled ? 'On' : 'Off'}
        </Button>
      </div>
    </div>
  )
}
