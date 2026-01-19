import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AmbientParticles } from '@/components/ambient-particles'
import { MusicProvider } from '@/contexts/MusicContext'
import { MusicPlayer } from '@/components/MusicPlayer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // Enables safe-area-inset CSS variables
}

export const metadata: Metadata = {
  title: {
    default: 'Zero → Deep: A Practical Mindfulness Training Path',
    template: '%s | Zero → Deep',
  },
  description:
    'Learn mindfulness meditation from your first sit to deep practice. A practical, tradition-agnostic guide with timer, tracking, and progressive training.',
  keywords: [
    'meditation',
    'mindfulness',
    'meditation training',
    'learn to meditate',
    'meditation timer',
    'mindfulness practice',
    'concentration',
    'awareness',
  ],
  authors: [{ name: 'Zero → Deep' }],
  creator: 'Zero → Deep',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zeroto.deep',
    title: 'Zero → Deep: A Practical Mindfulness Training Path',
    description:
      'Learn mindfulness meditation from your first sit to deep practice. A practical, tradition-agnostic guide.',
    siteName: 'Zero → Deep',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero → Deep: A Practical Mindfulness Training Path',
    description:
      'Learn mindfulness meditation from your first sit to deep practice.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <MusicProvider>
          {/* Ambient floating particles for library dust effect */}
          <AmbientParticles />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  )
}
