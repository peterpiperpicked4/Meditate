import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Info, CheckCircle2, Lightbulb } from 'lucide-react'

// Custom components for MDX content

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'tip'
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      container: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    warning: {
      container: 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    success: {
      container: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950',
      icon: CheckCircle2,
      iconColor: 'text-green-600 dark:text-green-400',
    },
    tip: {
      container: 'border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950',
      icon: Lightbulb,
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={cn('my-6 rounded-lg border p-4', style.container)}>
      <div className="flex gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', style.iconColor)} />
        <div className="flex-1">
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  children: React.ReactNode
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4 my-6">
      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

interface TechniqueCardProps {
  title: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  href: string
  children: React.ReactNode
}

export function TechniqueCard({
  title,
  duration,
  difficulty,
  href,
  children,
}: TechniqueCardProps) {
  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'destructive',
  } as const

  return (
    <Link href={href} className="block no-underline">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant={difficultyColors[difficulty]}>{difficulty}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{duration}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{children}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

interface StageCardProps {
  number: number
  title: string
  status?: 'locked' | 'current' | 'completed'
  children: React.ReactNode
}

export function StageCard({
  number,
  title,
  status = 'locked',
  children,
}: StageCardProps) {
  const statusStyles = {
    locked: 'opacity-60',
    current: 'ring-2 ring-primary',
    completed: 'bg-green-50 dark:bg-green-950',
  }

  return (
    <Card className={cn('relative', statusStyles[status])}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold',
              status === 'completed'
                ? 'bg-green-600 text-white'
                : status === 'current'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
            )}
          >
            {status === 'completed' ? '✓' : number}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {status === 'current' && (
              <Badge className="mt-1">Current Stage</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{children}</div>
      </CardContent>
    </Card>
  )
}

interface SafetyNoteProps {
  children: React.ReactNode
}

export function SafetyNote({ children }: SafetyNoteProps) {
  return (
    <Callout type="warning" title="Safety Note">
      {children}
    </Callout>
  )
}

// MDX component overrides
export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          className={cn('text-primary underline underline-offset-4', className)}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }
    return (
      <Link
        className={cn('text-primary underline underline-offset-4', className)}
        href={href || ''}
        {...props}
      />
    )
  },
  hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  // Custom components
  Callout,
  Step,
  TechniqueCard,
  StageCard,
  SafetyNote,
}
