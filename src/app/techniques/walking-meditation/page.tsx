import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, AlertTriangle, TrendingUp, Play, Footprints } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Walking Meditation',
  description:
    'Bring mindful attention to the sensations of walking. A practice that integrates meditation with movement.',
}

export default function WalkingMeditationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/techniques"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          All Techniques
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Walking Meditation</h1>
            <Badge variant="success">beginner</Badge>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Walking meditation brings the same quality of attention from sitting
            practice into movement. It&apos;s a bridge between formal practice and
            mindful living—and a valuable practice in its own right.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>10-30 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span>Stages 0, 1, 2, 3</span>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">When to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Walking meditation is especially valuable when:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sitting feels too difficult (restlessness, sleepiness, pain)</li>
              <li>You want variety from seated practice</li>
              <li>Energy is too high for stillness</li>
              <li>Between periods of sitting in longer sessions</li>
              <li>You want to practice meditation in daily activities</li>
              <li>Weather is nice and you want to practice outdoors</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Step-by-Step Instructions</h2>

          <div className="mt-6 space-y-6">
            {[
              {
                title: 'Choose Your Path',
                content: `Find a straight path of 20-40 feet where you can walk back and forth.
                Indoor or outdoor both work.
                Flat ground is easiest, but any terrain can work with practice.
                You'll walk to the end, pause, turn, and return.`,
              },
              {
                title: 'Stand and Settle',
                content: `Begin by standing still at one end of your path.
                Feel your feet on the ground. Notice the sensations of standing.
                Take a few breaths to arrive and set intention.
                Let your arms hang naturally or clasp hands in front or behind.`,
              },
              {
                title: 'Walk Slowly',
                content: `Begin walking slowly—much slower than normal pace.
                The slower you go, the more you can notice.

                Traditional pace: one step every 2-3 seconds.
                But any slower-than-normal pace works.

                Eyes cast down about 6 feet ahead (not at feet, not at horizon).`,
              },
              {
                title: 'Focus on Sensations',
                content: `Bring attention to the sensations in the feet and legs:

                • Lifting: The foot rising from the ground
                • Moving: The foot traveling through space
                • Placing: The foot making contact again
                • Shifting: Weight transferring to the forward foot

                Feel, don't think about, these sensations.`,
              },
              {
                title: 'At the End, Pause and Turn',
                content: `When you reach the end of your path:
                1. Stop and stand for a moment
                2. Notice the intention to turn
                3. Turn slowly, feeling the movement
                4. Pause again
                5. Begin walking back

                The turns are part of the practice, not breaks from it.`,
              },
              {
                title: 'When Mind Wanders',
                content: `The same instruction as sitting: when you notice mind has wandered,
                gently return attention to the sensations of walking.

                You might stop briefly to re-establish presence, then continue.
                Walking meditation builds the same muscle as sitting.`,
              },
              {
                title: 'Close the Practice',
                content: `At the end of your session:
                1. Stand still for a minute
                2. Notice the feeling of the body after walking
                3. Appreciate the aliveness in feet and legs
                4. Transition slowly to normal activity`,
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <div className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                    {step.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-12 border-callout-warning-border bg-callout-warning-bg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-callout-warning-title">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              Common Mistakes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {[
                {
                  mistake: 'Walking at normal speed',
                  fix: 'Slow down significantly. Speed makes it harder to notice sensations.',
                },
                {
                  mistake: 'Watching the feet',
                  fix: 'Feel the feet; don\'t watch them. Gaze ahead, attention inward.',
                },
                {
                  mistake: 'Rushing the turns',
                  fix: 'The turn is part of practice. Pause, turn mindfully, pause again.',
                },
                {
                  mistake: 'Thinking the walk should be relaxing',
                  fix: 'It\'s not a stroll. It\'s attention training. Alert but calm.',
                },
                {
                  mistake: 'Getting self-conscious about looking weird',
                  fix: 'Practice privately at first, or explain to others what you\'re doing.',
                },
              ].map((item, index) => (
                <li key={index}>
                  <span className="font-medium text-callout-warning-title">
                    {item.mistake}
                  </span>
                  <br />
                  <span className="text-callout-warning-text">
                    Fix: {item.fix}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" aria-hidden="true" />
            Variations
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                name: 'Very Slow Walking',
                description: 'One step every 5-10 seconds. Each sub-movement (lift, move, place) becomes distinct. Deep concentration possible.',
              },
              {
                name: 'Normal Pace Walking',
                description: 'Closer to everyday speed. Less concentration, but easier to integrate into daily life. Good for walking to work, etc.',
              },
              {
                name: 'Nature Walking',
                description: 'Include awareness of environment—sounds, air, visual field—while maintaining base attention on movement.',
              },
              {
                name: 'Noting While Walking',
                description: 'Add mental labels: "lifting," "moving," "placing." Combines two techniques for sharper awareness.',
              },
            ].map((variation, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <h4 className="font-semibold">{variation.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {variation.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border bg-muted/30 p-6">
          <div className="flex items-start gap-3">
            <Footprints className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">The Bridge to Daily Life</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Walking meditation is the perfect bridge between cushion and life.
                Once you can maintain attention while walking slowly, you can begin
                to bring awareness to normal-paced walking. Eventually, every step
                becomes an opportunity for presence. This is how meditation escapes
                the cushion and transforms daily life.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/practice">
              <Play className="mr-2 h-5 w-5" aria-hidden="true" />
              Practice Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
