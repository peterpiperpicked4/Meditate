'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  distance = 24,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.style.opacity = '1'
      element.style.transform = 'none'
      return
    }

    // Set initial state
    element.style.opacity = '0'
    element.style.transform = `translateY(${distance}px)`
    element.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`
    element.style.transitionDelay = `${delay}s`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0)'
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay, duration, distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Convenience wrapper for staggered children
interface ScrollRevealGroupProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function ScrollRevealGroup({
  children,
  className = '',
  staggerDelay = 0.1,
}: ScrollRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const children = container.querySelectorAll('[data-reveal-child]')

    children.forEach((child, index) => {
      const el = child as HTMLElement
      if (prefersReducedMotion) {
        el.style.opacity = '1'
        el.style.transform = 'none'
        return
      }

      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
      el.style.transitionDelay = `${index * staggerDelay}s`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child) => {
              const el = child as HTMLElement
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            })
            observer.unobserve(container)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
