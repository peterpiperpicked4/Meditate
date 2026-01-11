import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Scan, Hand, Brain, Sun, Pocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'My Practice',
  description:
    'Personal lessons from 6 months of meditation and therapy. Practical grounding exercises for anxiety, dissociation, and overthinking.',
}

export default function MyPracticePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">My Practice</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          What I&apos;ve learned from 6 months of meditation and therapy—practices
          that actually help when you&apos;re anxious, dissociating, or stuck in your head.
        </p>

        {/* Personal intro */}
        <div className="mt-10 space-y-6 text-muted-foreground">
          <p>
            I started meditating about six months ago. At first, it was just breath
            focus—ten minutes a day, trying to follow the instructions on this site.
            It helped. But when anxiety showed up, or my mind fogged over, or I felt
            disconnected from my body, I didn&apos;t have tools for that.
          </p>

          <p>
            That&apos;s where therapy came in. Working with a somatic therapist, I learned
            exercises that bridge the gap between &quot;mindfulness meditation&quot; and
            &quot;what do I actually do when I&apos;m dysregulated?&quot; These aren&apos;t
            replacements for meditation—they&apos;re companions to it.
          </p>

          <p>
            I&apos;m sharing them here because they&apos;ve been genuinely useful, and
            because the line between &quot;meditation technique&quot; and
            &quot;therapeutic grounding tool&quot; is blurrier than most apps suggest.
          </p>
        </div>

        {/* Practice 1: Body Scan */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Scan className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Body Scan as Felt-Sense Training</h2>
              <p className="text-sm text-muted-foreground">Not relaxation—awareness</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              The body scan on this site is framed as &quot;releasing tension.&quot; That&apos;s
              one use. But my therapist taught it differently: as training to <em>notice</em> where
              anxiety lives in your body—so you can catch it before it hijacks your behavior.
            </p>

            <p>
              The goal isn&apos;t to feel good. It&apos;s to build the skill of <em>contact</em>:
              knowing what&apos;s actually happening in your body right now, without arguing with it
              or trying to fix it.
            </p>
          </div>

          <Card className="mt-6 border-primary/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Felt-Sense Body Scan</CardTitle>
              <p className="text-sm text-muted-foreground">10-20 minutes • sitting or lying down</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">1. Arrive</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Let your body be supported (chair, couch, floor).</li>
                  <li>Take 2-3 slow breaths.</li>
                  <li>Don&apos;t try to &quot;clear your mind.&quot; Just show up.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">2. Scan for &quot;what&apos;s here&quot;</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Bring attention to your feet: pressure, temperature, tingling, numbness—anything.</li>
                  <li>If it&apos;s blank, that&apos;s still information. Don&apos;t force sensation.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">3. Move upward, one region at a time</h4>
                <p className="text-sm text-muted-foreground">
                  Feet → calves → knees → thighs → hips → lower belly → chest →
                  upper back → shoulders → arms → hands → neck → jaw/face → forehead/top of head
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">4. Name it lightly (optional)</h4>
                <p className="text-sm text-muted-foreground">
                  &quot;Tight.&quot; &quot;Warm.&quot; &quot;Buzzing.&quot; &quot;Blank.&quot; &quot;Heavy.&quot;
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  The goal is not analysis. It&apos;s contact.
                </p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="font-semibold text-foreground mb-2">Key instruction</h4>
                <ul className="space-y-1 text-sm">
                  <li>Don&apos;t argue with the sensation.</li>
                  <li>Don&apos;t fix it.</li>
                  <li>Don&apos;t narrate a story about it.</li>
                  <li className="text-primary">Just notice: &quot;This is where it lives right now.&quot;</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practice 2: Bilateral Stimulation */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sage/20">
              <Hand className="h-6 w-6 text-sage" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bilateral Grounding</h2>
              <p className="text-sm text-muted-foreground">Simple left-right input for reset</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              This one sounds &quot;woo&quot; until you try it. Bilateral stimulation—alternating
              left-right input—is used in EMDR therapy, but you don&apos;t need a therapist to
              use a simplified version as a grounding tool.
            </p>

            <p>
              My therapist emphasized there&apos;s no &quot;perfect&quot; response. Sometimes
              you notice nothing. Sometimes you notice body sensations or memories surface.
              The point is the reset, not the revelation.
            </p>
          </div>

          <Card className="mt-6 border-sage/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Bilateral Grounding</CardTitle>
              <p className="text-sm text-muted-foreground">60-120 seconds • use as a reset</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sage mb-2">1. Choose your method</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><strong>Thigh taps:</strong> Tap left thigh → right thigh → left → right</li>
                  <li><strong>Foot taps:</strong> Alternate tapping feet on floor</li>
                  <li><strong>Butterfly:</strong> Cross arms and tap shoulders alternating (left-right)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sage mb-2">2. Do 20-40 taps</h4>
                <p className="text-sm text-muted-foreground">
                  Keep it steady, not intense.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sage mb-2">3. Pause and breathe</h4>
                <p className="text-sm text-muted-foreground">
                  One slow inhale, longer exhale.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sage mb-2">4. Ask one question</h4>
                <p className="text-sm text-primary">
                  &quot;What do I notice in my body right now?&quot;
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sage mb-2">5. Repeat 1-3 rounds</h4>
                <p className="text-sm text-muted-foreground">
                  If you start spacing out: tap your feet to come back.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practice 3: Parts Check-in */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <Brain className="h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Parts Check-In</h2>
              <p className="text-sm text-muted-foreground">When the mind fogs or overthinks</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Here&apos;s something that changed how I relate to mental fog: when I couldn&apos;t
              &quot;get a hold&quot; of a sensation during therapy, my therapist didn&apos;t treat
              it as failure. She treated it as a <em>protector</em>.
            </p>

            <p>
              The &quot;thinking part&quot; that was analyzing everything? It had a job: distract
              from painful feelings. The fog wasn&apos;t a bug—it was a feature, doing exactly
              what it was designed to do.
            </p>

            <p>
              This check-in is especially useful for &quot;high-cognition brains&quot;—people who
              default to thinking their way through everything (that&apos;s me).
            </p>
          </div>

          <Card className="mt-6 border-accent/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Parts Check-In</CardTitle>
              <p className="text-sm text-muted-foreground">90 seconds • for mental fog or analysis paralysis</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground italic">
                  &quot;I notice I&apos;m thinking / analyzing / fogging.&quot;
                </p>
                <p className="text-muted-foreground italic">
                  &quot;Is this part trying to protect me from feeling something?&quot;
                </p>
                <p className="text-muted-foreground italic">
                  &quot;If yes—what is it protecting me from?&quot;
                </p>
                <p className="text-primary italic">
                  &quot;Could it step aside 10%… just for one breath?&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  The point is not to kill the thinking—just to reduce it enough to re-enter the body.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practice 4: Safe Place + Warm Light */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ember/20">
              <Sun className="h-6 w-6 text-ember" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Safe Place + Warm Light</h2>
              <p className="text-sm text-muted-foreground">Closing practice for regulation</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              My therapist closed almost every session this way: guide me into a safe place
              (real or imagined), then run a &quot;warm light&quot; scan from head to feet.
              It sounds simple—it is—but it works.
            </p>

            <p>
              The important part: when you hit a &quot;blocked&quot; zone (mine was always
              the chest), you don&apos;t fight it. You just notice it and let the light
              pause or flow around it. The block is another protector doing its job.
            </p>
          </div>

          <Card className="mt-6 border-ember/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Safe Place + Warm Light</CardTitle>
              <p className="text-sm text-muted-foreground">2-3 minutes • end of practice</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-ember mb-2">1. Pick a safe place</h4>
                <p className="text-sm text-muted-foreground">
                  Real or imaginary. Nature, a room, your studio—anywhere you feel grounded.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-ember mb-2">2. Place yourself there</h4>
                <p className="text-sm text-muted-foreground">
                  Sitting or lying down. Breathing normally. Take a moment to arrive.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-ember mb-2">3. Warm light</h4>
                <p className="text-sm text-muted-foreground">
                  Imagine a warm, sunlike light above you. Let it move slowly:
                </p>
                <p className="text-sm text-primary mt-2">
                  Top of head → face → throat → chest → belly → legs → feet
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-ember mb-2">4. If you hit a blocked zone</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Don&apos;t fight it.</li>
                  <li>Just notice: &quot;Something tight is here.&quot;</li>
                  <li>Let the light pause or flow around it—no forcing.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Portable Grounding Tools */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Pocket className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Portable Grounding Tools</h2>
              <p className="text-sm text-muted-foreground">For dissociation and spacing out</p>
            </div>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              When I would dissociate or space out during sessions, my therapist recommended
              sensory anchors—physical objects that bring you back into the present through
              immediate body contact.
            </p>

            <p>
              These are embarrassingly simple. They also work. Low drama, high utility.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card className="bg-card/50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Essential oils</h4>
                <p className="text-sm text-muted-foreground">
                  Smell = immediate body contact. Keep a small bottle in your pocket or bag.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Stone or rock</h4>
                <p className="text-sm text-muted-foreground">
                  Something smooth to rub in your pocket. The texture grounds you.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Small object</h4>
                <p className="text-sm text-muted-foreground">
                  Trinket, squishy ball, anything you can touch and feel with intention.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Foot tapping</h4>
                <p className="text-sm text-muted-foreground">
                  No objects needed. Tap your feet on the floor to come back from spacing out.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Closing */}
        <section className="mt-16 rounded-xl border border-border/30 bg-card/20 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h3 className="font-display text-lg font-semibold">A note on all this</h3>
              <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                <p>
                  These practices came from therapy, not from a meditation tradition. I&apos;m
                  sharing them because the boundary between &quot;meditation&quot; and
                  &quot;somatic therapy&quot; is fuzzier than it seems—and because they&apos;ve
                  helped me when pure mindfulness wasn&apos;t enough.
                </p>
                <p>
                  If you&apos;re dealing with anxiety, dissociation, trauma, or dysregulation
                  that feels bigger than what a meditation app can handle: please work with
                  a therapist. These exercises are supplements, not substitutes.
                </p>
                <p className="text-primary">
                  The real lesson from six months of practice: showing up matters more than
                  doing it perfectly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/practice">
              Open Timer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/techniques/body-scan">Body Scan Technique</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/troubleshooting">Troubleshooting Guide</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
