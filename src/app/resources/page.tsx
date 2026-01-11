import { Metadata } from 'next'
import { Book, Smartphone, Mountain, Users, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Books, apps, retreat centers, and guidance on finding a teacher. Curated resources for deepening your practice.',
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Books, apps, retreat centers, and guidance on finding a teacher.
            Curated to support practice at all levels.
          </p>
        </div>

        {/* Books */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Book className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Books</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'The Mind Illuminated',
                author: 'Culadasa (John Yates)',
                level: 'All levels',
                description: 'Comprehensive meditation manual with clear stages. Combines Buddhist insight with neuroscience. Highly structured approach.',
              },
              {
                title: 'Mindfulness in Plain English',
                author: 'Bhante Gunaratana',
                level: 'Beginner',
                description: 'Classic introduction to mindfulness meditation. Clear, practical, no-nonsense. Great starting point.',
              },
              {
                title: 'Waking Up',
                author: 'Sam Harris',
                level: 'All levels',
                description: 'Secular approach to meditation and spirituality. Good for those skeptical of religious framing.',
              },
              {
                title: 'The Attention Revolution',
                author: 'B. Alan Wallace',
                level: 'Intermediate',
                description: 'Deep dive into concentration practice (shamatha). Detailed instructions for developing stable attention.',
              },
              {
                title: 'Seeing That Frees',
                author: 'Rob Burbea',
                level: 'Advanced',
                description: 'Sophisticated exploration of emptiness and insight. For practitioners with established foundations.',
              },
              {
                title: 'Radical Acceptance',
                author: 'Tara Brach',
                level: 'All levels',
                description: 'Integrates meditation with emotional healing and self-compassion. Particularly good for those struggling with self-criticism.',
              },
              {
                title: 'Altered Traits',
                author: 'Goleman & Davidson',
                level: 'All levels',
                description: 'Research-based look at what meditation does (and doesn\'t) do. Good for understanding the science.',
              },
            ].map((book, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{book.title}</h4>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <Badge variant="secondary">{book.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{book.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Apps & Tools */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Apps & Tools</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                name: 'Insight Timer',
                type: 'Free / Premium',
                description: 'Large library of guided meditations, timer with bells, community features. Good free tier.',
              },
              {
                name: 'Waking Up',
                type: 'Subscription',
                description: 'Sam Harris\'s app. Secular approach, theory content alongside practice. Free access available on request.',
              },
              {
                name: '10% Happier',
                type: 'Subscription',
                description: 'Practical, skeptic-friendly content. Good for beginners who want structure.',
              },
              {
                name: 'Plum Village',
                type: 'Free',
                description: 'From Thich Nhat Hanh\'s tradition. Gentle, accessible practices.',
              },
              {
                name: 'Simple timer apps',
                type: 'Various',
                description: 'Any timer works. Some prefer minimal apps without content libraries.',
              },
            ].map((app, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold">{app.name}</h4>
                    <Badge variant="outline">{app.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Retreat Types */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Mountain className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Retreat Types</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                type: 'Day retreats',
                description: 'Good introduction. A few hours to a full day of practice. No overnight stay.',
              },
              {
                type: 'Weekend retreats',
                description: '2-3 days. Enough to settle in and get a taste of intensive practice.',
              },
              {
                type: 'Week-long retreats',
                description: 'The traditional &quot;first serious retreat.&quot; 5-7 days allows for deeper settling.',
              },
              {
                type: '10-day Vipassana (Goenka)',
                description: 'Free, donation-based. Very structured, intensive. Good for experiencing full immersion.',
              },
              {
                type: 'MBSR/MBCT programs',
                description: '8-week courses meeting weekly. Secular, research-based. Good for stress and emotional regulation.',
              },
              {
                type: 'Longer residential retreats',
                description: '2 weeks to months. For established practitioners. Usually require application/interview.',
              },
            ].map((retreat, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <h4 className="font-semibold">{retreat.type}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{retreat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Finding a Teacher */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Finding a Teacher</h2>
          </div>

          <p className="text-muted-foreground">
            A good teacher can accelerate progress and help navigate challenges. Here&apos;s
            what to look for—and watch out for.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="border-callout-success-border bg-callout-success-bg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-callout-success-title">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  Green Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-callout-success-text">
                  <li>• Has their own sustained practice and teacher</li>
                  <li>• Encourages questions and critical thinking</li>
                  <li>• Transparent about their training and limitations</li>
                  <li>• Supports you seeking other perspectives</li>
                  <li>• Maintains appropriate boundaries</li>
                  <li>• Doesn&apos;t claim special powers or enlightenment</li>
                  <li>• Community members seem healthy and balanced</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-callout-danger-border bg-callout-danger-bg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-callout-danger-title">
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                  Red Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-callout-danger-text">
                  <li>• Claims unique access to truth</li>
                  <li>• Discourages outside relationships or perspectives</li>
                  <li>• Requests excessive money or devotion</li>
                  <li>• Sexual or financial impropriety</li>
                  <li>• Reacts poorly to questions or criticism</li>
                  <li>• Students seem overly dependent or cult-like</li>
                  <li>• Promises quick enlightenment or special powers</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            <p>
              <strong>Where to look:</strong> Local meditation centers, retreat organizations,
              online communities. Many teachers offer online instruction now.
            </p>
            <p className="mt-2">
              <strong>Starting out:</strong> You don&apos;t need a personal teacher immediately.
              Books, apps, and group classes work well for beginners. Consider finding a
              teacher when you&apos;ve established regular practice and want personalized guidance.
            </p>
          </div>
        </section>

        {/* Bottom note */}
        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground">
            This list isn&apos;t exhaustive or endorsed—it&apos;s a starting point. Explore what
            resonates with you. Different approaches work for different people.
          </p>
        </div>
      </div>
    </div>
  )
}
