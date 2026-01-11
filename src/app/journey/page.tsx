import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Journey',
  description:
    'Learning in public. Follow along as the creator documents their meditation journey from beginner to deepening practice.',
}

// Helper to format relative dates
function getRelativeTime(daysAgo: number): string {
  if (daysAgo === 0) return 'Today'
  if (daysAgo === 1) return 'Yesterday'
  if (daysAgo < 7) return `${daysAgo} days ago`
  if (daysAgo < 14) return '1 week ago'
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`
  if (daysAgo < 60) return '1 month ago'
  return `${Math.floor(daysAgo / 30)} months ago`
}

// Sample blog posts with relative timing
const posts = [
  {
    slug: 'week-20-finding-the-edge',
    title: 'Week 20: Finding the Edge',
    daysAgo: 3,
    excerpt: 'Discovering what happens when you push just past comfortable duration. The surprising value of mild discomfort.',
    tags: ['concentration', 'duration', 'insight'],
  },
  {
    slug: 'week-19-the-plateau',
    title: 'Week 19: The Plateau',
    daysAgo: 10,
    excerpt: 'Everything feels the same. Progress invisible. How to keep going when nothing seems to be happening.',
    tags: ['challenges', 'consistency', 'doubt'],
  },
  {
    slug: 'week-18-body-awareness',
    title: 'Week 18: Body Awareness Breakthrough',
    daysAgo: 17,
    excerpt: 'After weeks of body scan practice, something clicked. Sensations I never noticed before.',
    tags: ['body-scan', 'technique', 'progress'],
  },
  {
    slug: 'week-1-beginning',
    title: 'Week 1: Beginning',
    daysAgo: 140,
    excerpt: 'The first week. 10 minutes feels long. Mind everywhere. But I showed up every day.',
    tags: ['beginning', 'consistency', 'foundation'],
  },
]

export default function JourneyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">The Journey</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Learning in public. Following the path from beginner to... wherever
            this goes. Documenting what works, what doesn&apos;t, and what remains
            mysterious.
          </p>
        </div>

        {/* About this section */}
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardContent className="py-6">
            <h2 className="font-semibold">What is &quot;Learning in Public&quot;?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Rather than waiting until I&apos;m an &quot;expert&quot; to share, I&apos;m documenting
              the journey as it happens. This means you&apos;ll see mistakes, confusion,
              plateaus, and breakthroughs—all in real time. The goal isn&apos;t to present
              a polished image but to show what learning actually looks like.
            </p>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.slug} className="group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardDescription>{getRelativeTime(post.daysAgo)}</CardDescription>
                      <CardTitle className="mt-1 text-lg">
                        {post.title}
                      </CardTitle>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground opacity-50" aria-hidden="true" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    Full posts coming soon...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Stats */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-lg">Current Stats</CardTitle>
            <CardDescription>As of the latest update</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold">~5</p>
                <p className="text-sm text-muted-foreground">months practicing</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">10-15</p>
                <p className="text-sm text-muted-foreground">min daily</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">Stage 1-2</p>
                <p className="text-sm text-muted-foreground">on the path</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">~90%</p>
                <p className="text-sm text-muted-foreground">consistency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post template hint */}
        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <h2 className="font-semibold">Weekly Post Template</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Each week I try to document:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>• What I practiced (techniques, duration, frequency)</li>
            <li>• What changed or shifted</li>
            <li>• What was hard or confusing</li>
            <li>• What I&apos;m exploring next</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
