import * as React from 'react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutVariant = 'warning' | 'success' | 'danger' | 'info'

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<CalloutVariant, string> = {
  warning: 'border-callout-warning-border bg-callout-warning-bg text-callout-warning-text',
  success: 'border-callout-success-border bg-callout-success-bg text-callout-success-text',
  danger: 'border-callout-danger-border bg-callout-danger-bg text-callout-danger-text',
  info: 'border-callout-info-border bg-callout-info-bg text-callout-info-text',
}

const titleStyles: Record<CalloutVariant, string> = {
  warning: 'text-callout-warning-title',
  success: 'text-callout-success-title',
  danger: 'text-callout-danger-title',
  info: 'text-callout-info-title',
}

const icons: Record<CalloutVariant, React.ElementType> = {
  warning: AlertTriangle,
  success: CheckCircle2,
  danger: XCircle,
  info: Info,
}

export function Callout({
  variant = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const Icon = icons[variant]

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon
          className={cn('h-5 w-5 mt-0.5 flex-shrink-0', titleStyles[variant])}
          aria-hidden="true"
        />
        <div className="flex-1">
          {title && (
            <p className={cn('font-semibold', titleStyles[variant])}>
              {title}
            </p>
          )}
          <div className={cn('text-sm', title && 'mt-1')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Variant for inline icon usage
export function CalloutIcon({
  variant,
  className,
}: {
  variant: CalloutVariant
  className?: string
}) {
  const Icon = icons[variant]
  return <Icon className={cn('h-4 w-4', titleStyles[variant], className)} aria-hidden="true" />
}
