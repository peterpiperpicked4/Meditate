import { Metadata } from 'next'
import Link from 'next/link'
import { Brain, Moon, Frown, HelpCircle, Zap, Heart, CloudFog } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Callout } from '@/components/ui/callout'

export const metadata: Metadata = {
  title: 'Troubleshooting',
  description:
    'Common meditation challenges and how to work with them. Solutions for wandering mind, sleepiness, doubt, and more.',
}

const issues = [
  {
    id: 'monkey-mind',
    title: 'Monkey Mind / Racing Thoughts',
    icon: Brain,
    description: 'Mind won\'t stop jumping from thought to thought',
    whatsHappening: `This is completely normal, especially early in practice. Your mind hasn't
      suddenly become more chaotic—you're just noticing what was always there. The mental
      chatter continues whether we meditate or not; practice reveals it.

      Racing thoughts often intensify at the start of a session as you transition from
      activity. They may also spike during stressful periods of life.`,
    interventions: [
      {
        title: 'Shorten sessions temporarily',
        detail: 'If 15 minutes feels overwhelming, try 5. Success builds momentum.',
      },
      {
        title: 'Count breaths',
        detail: 'Count exhales 1-10, then restart. The counting gives your mind something to do.',
      },
      {
        title: 'Use noting',
        detail: 'Label each distraction briefly: "thinking... planning... remembering..." then return to breath.',
      },
      {
        title: 'Emphasize the return, not the staying',
        detail: 'Each return IS the practice. More wandering = more practice.',
      },
      {
        title: 'Try body scan first',
        detail: 'Moving attention through the body can help settle a scattered mind before breath focus.',
      },
    ],
    whenToStop: `Racing thoughts alone are not a reason to stop. However, if thoughts become
      intrusive, distressing, or feel compulsive, take a break. Consider working with a teacher
      or therapist if this persists.`,
  },
  {
    id: 'sleepiness',
    title: 'Sleepiness / Dullness',
    icon: Moon,
    description: 'Feeling drowsy, foggy, or falling asleep',
    whatsHappening: `Some sleepiness is common, especially if you're sleep-deprived or practicing
      in a comfortable position. There's also a subtler form called "dullness"—a foggy, spaced-out
      state that can feel calm but lacks clarity.

      Dullness often masquerades as good meditation. The mind feels quiet because awareness has
      dimmed, not because it's genuinely settled. Learning to distinguish calm clarity from dull
      fog is important.`,
    interventions: [
      {
        title: 'Open your eyes',
        detail: 'Practice with eyes slightly open, soft gaze downward. Light helps alertness.',
      },
      {
        title: 'Sit up straighter',
        detail: 'Adjust posture. Slumping encourages drowsiness.',
      },
      {
        title: 'Increase intention',
        detail: 'Actively commit to staying alert for the next 60 seconds. Repeat.',
      },
      {
        title: 'Try walking meditation',
        detail: 'Movement naturally counters sleepiness while maintaining mindfulness.',
      },
      {
        title: 'Shorten the session',
        detail: 'Better 10 minutes of clear attention than 30 minutes of dull fog.',
      },
      {
        title: 'Practice earlier in the day',
        detail: 'If you always meditate when tired, change the time.',
      },
    ],
    whenToStop: `If you're genuinely sleep-deprived, sometimes the kind thing is to sleep.
      Chronic sleepiness during meditation might indicate a sleep debt that needs addressing
      before practice can progress.`,
  },
  {
    id: 'boredom',
    title: 'Boredom / Impatience',
    icon: Frown,
    description: 'Sessions feel tedious, can\'t wait for them to end',
    whatsHappening: `Boredom arises when the mind craves more stimulation than breath provides.
      It's actually an interesting phenomenon to observe—a kind of restlessness, a reaching for
      something "better."

      Impatience often reflects expectations about how practice should feel or how fast you
      should progress. Both are normal and workable.`,
    interventions: [
      {
        title: 'Get curious about boredom itself',
        detail: 'What does boredom actually feel like in the body? Where is it? Does it change?',
      },
      {
        title: 'Zoom in on breath detail',
        detail: 'Examine the texture, temperature, rhythm. There\'s more to notice than first appears.',
      },
      {
        title: 'Vary techniques',
        detail: 'Try body scan or loving-kindness to add variety while maintaining practice.',
      },
      {
        title: 'Check expectations',
        detail: 'Are you expecting bliss? The ordinary breath IS the practice.',
      },
      {
        title: 'Consider session length',
        detail: 'Maybe you\'ve outgrown 10 minutes. Try extending to 20 and see if depth emerges.',
      },
    ],
    whenToStop: `Boredom alone isn't a reason to stop. Often, pushing through it reveals
      deeper states. However, if practice feels like punishment, revisit your motivations
      and perhaps take a day off.`,
  },
  {
    id: 'self-doubt',
    title: 'Self-Doubt',
    icon: HelpCircle,
    description: '"I\'m bad at this" / "Nothing is happening"',
    whatsHappening: `Nearly everyone thinks they're doing it wrong. The mind says "Everyone else
      is calm and I'm a mess" or "I've been practicing for months and nothing has changed."

      This is often the comparing mind doing its thing. Progress in meditation is often gradual
      and non-linear—hard to see from inside.`,
    interventions: [
      {
        title: 'Remember: if you sat and tried, you did it right',
        detail: 'The only way to fail is to not practice. Everything else is data.',
      },
      {
        title: 'Track sessions, not feelings',
        detail: 'Judge practice by showing up, not by how sessions feel.',
      },
      {
        title: 'Review over time',
        detail: 'Compare to a month ago, not yesterday. Look for subtle changes in daily life.',
      },
      {
        title: 'Talk to other practitioners',
        detail: 'You\'ll discover everyone struggles. Shared reality helps.',
      },
      {
        title: 'Add loving-kindness',
        detail: 'Metta practice directly counters self-criticism.',
      },
    ],
    whenToStop: `Persistent negative self-talk that intensifies with practice may need attention
      outside meditation—therapy or support groups can help. Practice should, over time, lead
      to more self-compassion, not less.`,
  },
  {
    id: 'physical-pain',
    title: 'Physical Pain / Posture Issues',
    icon: Zap,
    description: 'Discomfort, aches, or pain during sitting',
    whatsHappening: `Some physical discomfort is normal when the body isn't used to stillness.
      Sitting reveals existing tensions and weaknesses. However, sharp pain or numbness should
      not be ignored.`,
    interventions: [
      {
        title: 'Adjust your setup',
        detail: 'Use cushions, benches, or chairs. Height and support matter more than looking "spiritual."',
      },
      {
        title: 'Don\'t force crossed legs',
        detail: 'If floor sitting hurts, use a chair. The posture should support practice, not hinder it.',
      },
      {
        title: 'Move mindfully if needed',
        detail: 'It\'s okay to shift position during practice. Move slowly and stay aware.',
      },
      {
        title: 'Use discomfort as practice',
        detail: 'Mild discomfort can be observed: "What does this actually feel like? Does it change?"',
      },
      {
        title: 'Try walking meditation',
        detail: 'If sitting is difficult today, walk instead.',
      },
    ],
    whenToStop: `Sharp, shooting, or worsening pain means stop and adjust. Numbness in limbs
      means change position. If pain persists outside meditation, consult a healthcare provider.
      Never push through signals of potential injury.`,
  },
  {
    id: 'difficult-emotions',
    title: 'Difficult Emotions Surfacing',
    icon: Heart,
    description: 'Sadness, anger, fear, grief arising during practice',
    whatsHappening: `As the mind settles, emotions that were suppressed or unprocessed may surface.
      This is often a sign that practice is working—you're developing the capacity to feel what
      was previously avoided.

      These emotions aren't created by meditation; they were already there. Practice reveals them.`,
    interventions: [
      {
        title: 'Acknowledge without amplifying',
        detail: 'Name the emotion: "There\'s sadness." Don\'t dive into the story around it.',
      },
      {
        title: 'Ground in body',
        detail: 'Feel where the emotion lives in your body. Stay with sensation rather than narrative.',
      },
      {
        title: 'Use loving-kindness',
        detail: 'Offer yourself compassion: "May I be at ease with this."',
      },
      {
        title: 'Shorten or pause the session',
        detail: 'If it\'s too intense, open your eyes, ground yourself, take a break.',
      },
      {
        title: 'Process outside meditation',
        detail: 'Journaling, therapy, talking to friends—practice isn\'t the only place to work with emotions.',
      },
    ],
    whenToStop: `If emotions become overwhelming, flashbacks occur, or you feel destabilized,
      stop the session. Ground yourself by feeling your feet, looking around the room, or
      naming objects you see. For trauma histories or intense emotional material, working with
      a therapist experienced in meditation is recommended.`,
  },
  {
    id: 'dissociation',
    title: 'Spacing Out / Dissociation',
    icon: CloudFog,
    description: 'Feeling disconnected, foggy, or "not here"',
    whatsHappening: `Dissociation is a disconnection from present experience—feeling foggy, floaty,
      numb, or like you're watching yourself from outside. It's different from dullness (sleepy fog)
      because it involves a sense of unreality or disconnection from the body.

      Some spacing out during meditation is normal. But if you regularly "leave" during practice,
      or if you feel unable to stay present, that's worth addressing. Dissociation is often a
      protective response—the nervous system's way of handling overwhelm.`,
    interventions: [
      {
        title: 'Open your eyes immediately',
        detail: 'Eyes open reconnects you to external reality. Look around the room and name 5 things you can see.',
      },
      {
        title: 'Tap your feet on the floor',
        detail: 'Alternating left-right foot taps help ground you back in the body. 20-40 taps, then pause and check in.',
      },
      {
        title: 'Use sensory anchors',
        detail: 'Keep a smooth stone, essential oil, or textured object nearby. Touch and smell bring you back to the present through immediate body contact.',
      },
      {
        title: 'Try bilateral grounding',
        detail: 'Butterfly taps (crossing arms and tapping shoulders left-right) can help regulate the nervous system. See the Bilateral Grounding technique.',
      },
      {
        title: 'Shorten sessions',
        detail: 'Practice for 3-5 minutes instead of longer. Build tolerance gradually. Leaving before dissociation starts is better than pushing through.',
      },
      {
        title: 'Keep eyes open during practice',
        detail: 'Soft downward gaze maintains connection to external environment. This can prevent dissociation before it starts.',
      },
    ],
    whenToStop: `If dissociation happens frequently or intensely, pause meditation practice and
      work with a trauma-informed therapist. Dissociation during meditation can indicate that the
      practice is triggering overwhelm that the nervous system can't handle. This isn't failure—it's
      important information. With proper support, you can build capacity and return to practice safely.`,
  },
]

export default function TroubleshootingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Troubleshooting</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Every meditator faces challenges. These difficulties are not signs of
            failure—they&apos;re part of the practice. Here&apos;s how to work with
            the most common ones.
          </p>
        </div>

        {/* Issue Cards */}
        <div className="mt-12 space-y-8">
          {issues.map((issue) => (
            <Card key={issue.id} id={issue.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <issue.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{issue.title}</CardTitle>
                    <CardDescription>{issue.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* What's happening */}
                <div>
                  <h4 className="font-semibold">What&apos;s Happening</h4>
                  <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                    {issue.whatsHappening}
                  </p>
                </div>

                {/* Interventions */}
                <div>
                  <h4 className="font-semibold mb-3">What to Try</h4>
                  <Accordion type="single" collapsible className="w-full">
                    {issue.interventions.map((intervention, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-sm">
                          {intervention.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {intervention.detail}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* When to stop */}
                <Callout variant="warning" title="When to Stop / Seek Support">
                  {issue.whenToStop}
                </Callout>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Advice */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>General Principles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Difficulties are part of practice, not obstacles to it.</strong>{' '}
              Working with restlessness, doubt, and sleepiness IS meditation, not something
              preventing you from meditating.
            </p>
            <p>
              <strong className="text-foreground">Progress is non-linear.</strong> Some days will feel
              easy, others hard. This doesn&apos;t reflect your overall trajectory. Measure in months,
              not sessions.
            </p>
            <p>
              <strong className="text-foreground">Kindness is essential.</strong> Beating yourself up
              for having difficulties makes them worse. Meet challenges with curiosity and
              self-compassion.
            </p>
            <p>
              <strong className="text-foreground">When in doubt, simplify.</strong> Return to basic
              breath focus. Shorten your session. Get back to fundamentals.
            </p>
          </CardContent>
        </Card>

        {/* Safety Note */}
        <div className="mt-12">
          <Callout variant="warning" title="A Note on Safety">
            <div className="space-y-2">
              <p>
                Meditation is generally safe, but for some people—especially those with trauma
                histories, psychosis, or severe anxiety—it can sometimes be destabilizing.
              </p>
              <p>
                If you experience persistent distress, dissociation, intrusive memories, or
                worsening mental health, please pause practice and consult a mental health
                professional experienced in contemplative practices.
              </p>
              <p>
                See our <Link href="/disclaimer" className="underline text-callout-warning-title">full disclaimer</Link> for
                more information.
              </p>
            </div>
          </Callout>
        </div>
      </div>
    </div>
  )
}
