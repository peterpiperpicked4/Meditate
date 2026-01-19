import { test, expect } from '@playwright/test'

/**
 * Aggressive Mobile Stress Tests
 *
 * Run with: npm run test:e2e -- --project=mobile-chrome e2e/mobile-stress.spec.ts
 *
 * These tests specifically target mobile interactions to find issues
 * that only appear on mobile devices.
 */

test.describe('Mobile Layout & Touch Targets', () => {
  test('should render without horizontal overflow', async ({ page }) => {
    await page.goto('/breathe')

    // Check core elements are visible
    await expect(page.locator('button[aria-label*="Full Experience"]')).toBeVisible()

    // Verify no horizontal overflow (common mobile issue)
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1) // +1 for rounding
  })

  test('should have touch-friendly button sizes (44px minimum)', async ({ page }) => {
    await page.goto('/breathe')

    // Check main CTA button meets 44px minimum (Apple HIG)
    const startButton = page.locator('button[aria-label*="Full Experience"]')
    const box = await startButton.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(44)
    expect(box?.width).toBeGreaterThanOrEqual(44)
  })

  test('should have adequate spacing between interactive elements', async ({ page }) => {
    await page.goto('/breathe')

    // Start a session to see more buttons
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(4500)

    // Get all visible buttons
    const buttons = page.locator('button:visible')
    const count = await buttons.count()

    // Check spacing between adjacent buttons
    for (let i = 0; i < count - 1; i++) {
      const box1 = await buttons.nth(i).boundingBox()
      const box2 = await buttons.nth(i + 1).boundingBox()

      if (box1 && box2) {
        // Calculate gap between buttons
        const horizontalGap = Math.abs(box2.x - (box1.x + box1.width))
        const verticalGap = Math.abs(box2.y - (box1.y + box1.height))

        // If buttons are on same row, check horizontal gap
        if (Math.abs(box1.y - box2.y) < 10) {
          // Should have at least 8px gap for touch
          expect(horizontalGap).toBeGreaterThanOrEqual(8)
        }
      }
    }
  })
})

test.describe('Mobile Touch Stress Tests', () => {
  test('should handle 30 rapid pause/resume taps', async ({ page }) => {
    await page.goto('/breathe?debug=1')

    // Start session
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(4500)

    // Rapid tap pause/resume 30 times (impatient user)
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Space')
      await page.waitForTimeout(80)
    }

    // App should not crash
    const bodyText = await page.locator('body').textContent()
    expect(bodyText).toBeTruthy()

    // Should be able to end session
    await page.getByRole('button', { name: /end/i }).click()
    await expect(page.locator('button[aria-label*="Full Experience"]')).toBeVisible({ timeout: 5000 })
  })

  test('should handle scroll during active session', async ({ page }) => {
    await page.goto('/breathe?debug=1')

    // Start session
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(4500)

    // Scroll rapidly (simulating accidental touch scrolls)
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 300)
      await page.waitForTimeout(100)
      await page.mouse.wheel(0, -300)
      await page.waitForTimeout(100)
    }

    // Breathing should continue
    await page.waitForTimeout(2000)
    const bodyText = await page.locator('body').textContent()
    expect(bodyText?.toLowerCase()).toMatch(/inhale|exhale|hold|paused/)
  })

  test('should handle 100 rapid start/stop cycles', async ({ page }) => {
    await page.goto('/breathe?debug=1')

    // Rapid start/stop - stress test state management
    for (let i = 0; i < 100; i++) {
      await page.locator('button[aria-label*="Full Experience"]').click()
      await page.waitForTimeout(50)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(50)
    }

    // Page should still work
    await expect(page.locator('button[aria-label*="Full Experience"]')).toBeVisible({ timeout: 5000 })
  })

  test('should handle orientation changes during session', async ({ page }) => {
    await page.goto('/breathe?debug=1')

    // Start session
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(4500)

    // Get initial viewport
    const initialSize = page.viewportSize()

    // Simulate orientation changes
    const sizes = [
      { width: 844, height: 390 },  // Landscape
      { width: 390, height: 844 },  // Portrait
      { width: 844, height: 390 },  // Landscape
      { width: 390, height: 844 },  // Portrait
    ]

    for (const size of sizes) {
      await page.setViewportSize(size)
      await page.waitForTimeout(500)
    }

    // Restore and verify
    if (initialSize) {
      await page.setViewportSize(initialSize)
    }

    await page.waitForTimeout(1000)
    const bodyText = await page.locator('body').textContent()
    expect(bodyText).toBeTruthy()
  })

  test('should handle background/foreground cycles', async ({ page, context }) => {
    await page.goto('/breathe?debug=1')

    // Start session
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(4500)

    // Simulate app switching 5 times
    for (let i = 0; i < 5; i++) {
      const newPage = await context.newPage()
      await newPage.goto('about:blank')
      await newPage.waitForTimeout(2000)
      await newPage.close()
      await page.bringToFront()
      await page.waitForTimeout(1000)
    }

    // Should still be running or recoverable
    const bodyText = await page.locator('body').textContent()
    expect(bodyText?.toLowerCase()).toMatch(/inhale|exhale|hold|paused|remaining|start/)
  })
})

test.describe('Mobile Viewport Edge Cases', () => {
  test('should work on small viewport (320px)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 })
    await page.goto('/breathe')

    await expect(page.locator('button[aria-label*="Full Experience"]')).toBeVisible()

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(320)
  })

  test('should work on large phone viewport (428px)', async ({ page }) => {
    await page.setViewportSize({ width: 428, height: 926 })
    await page.goto('/breathe')

    await expect(page.locator('button[aria-label*="Full Experience"]')).toBeVisible()

    // Start and verify
    await page.locator('button[aria-label*="Full Experience"]').click()
    await expect(page.getByText('Get Ready')).toBeVisible({ timeout: 5000 })
  })

  test('should handle landscape mode', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 })
    await page.goto('/breathe')

    // Should still be usable in landscape
    await expect(page.locator('button[aria-label*="Full Experience"]')).toBeVisible()

    // Start session
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(4500)

    // Breathing circle should be visible
    const bodyText = await page.locator('body').textContent()
    expect(bodyText?.toLowerCase()).toMatch(/inhale|exhale|hold/)
  })
})

test.describe('Mobile Audio Reliability', () => {
  test('should handle visibility changes without audio errors', async ({ page }) => {
    const audioErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().toLowerCase().includes('audio')) {
        audioErrors.push(msg.text())
      }
    })

    await page.goto('/breathe?debug=1')

    // Start session
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(5000)

    // Simulate visibility change
    await page.evaluate(() => {
      document.dispatchEvent(new Event('visibilitychange'))
    })
    await page.waitForTimeout(3000)

    // No audio errors
    expect(audioErrors.length).toBe(0)
  })

  test('should not leak memory after many sessions', async ({ page }) => {
    await page.goto('/breathe?debug=1')

    // Get initial memory if available
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })

    // Run 20 quick sessions
    for (let i = 0; i < 20; i++) {
      await page.locator('button[aria-label*="Full Experience"]').click()
      await page.waitForTimeout(1000)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(200)
    }

    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })

    // Memory shouldn't grow excessively (50MB max)
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryGrowth = finalMemory - initialMemory
      expect(memoryGrowth).toBeLessThan(50 * 1024 * 1024)
    }

    // Page should still work
    await expect(page.locator('button[aria-label*="Full Experience"]')).toBeVisible()
  })
})

test.describe('Mobile Full Session Test', () => {
  test('should complete 60 second breathing session without issues', async ({ page }) => {
    test.setTimeout(90000) // 90 second timeout for this long test
    await page.goto('/breathe?debug=1')

    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    // Start session
    await page.locator('button[aria-label*="Full Experience"]').click()
    await page.waitForTimeout(4500) // Countdown

    // Run for 60 seconds
    await page.waitForTimeout(60000)

    // Should still be running with no critical errors
    const bodyText = await page.locator('body').textContent()
    expect(bodyText?.toLowerCase()).toMatch(/inhale|exhale|hold|remaining/)

    // Filter critical errors
    const criticalErrors = errors.filter(e =>
      !e.includes('favicon') && !e.includes('404') && !e.includes('net::')
    )
    expect(criticalErrors.length).toBe(0)
  })
})
