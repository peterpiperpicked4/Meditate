import { Metadata } from 'next'
import { Phone, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Callout } from '@/components/ui/callout'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Important disclaimers about meditation, mental health, and the limitations of this educational resource.',
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Disclaimer</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Please read this before using the site.
        </p>

        <div className="mt-8 space-y-8">
          {/* Not Medical Advice */}
          <Callout variant="warning" title="This Is Not Medical Advice">
            <div className="space-y-3">
              <p>
                The content on this website is for educational and informational purposes
                only. It is not intended to be a substitute for professional medical advice,
                diagnosis, or treatment.
              </p>
              <p>
                <strong className="text-callout-warning-title">Always seek the advice of your physician, mental health provider,
                or other qualified health provider</strong> with any questions you may have
                regarding a medical condition or mental health concerns.
              </p>
              <p>
                Never disregard professional medical advice or delay in seeking it because
                of something you have read on this website.
              </p>
            </div>
          </Callout>

          {/* Mental Health */}
          <section>
            <h2 className="text-2xl font-bold">Mental Health Considerations</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Meditation is generally safe for most people. However, for some individuals,
                it can occasionally surface difficult emotions, memories, or psychological
                material.
              </p>

              <p>
                <strong className="text-foreground">If you have any of the following,
                please consult with a mental health professional before beginning or
                continuing a meditation practice:</strong>
              </p>

              <ul className="list-disc pl-6 space-y-1">
                <li>History of trauma or PTSD</li>
                <li>Current or past psychosis or dissociative disorders</li>
                <li>Severe anxiety or panic disorder</li>
                <li>Severe depression</li>
                <li>Bipolar disorder</li>
                <li>Any condition involving breaks from reality</li>
              </ul>

              <p>
                <strong className="text-foreground">Stop your practice and seek support if you experience:</strong>
              </p>

              <ul className="list-disc pl-6 space-y-1">
                <li>Persistent or worsening distress</li>
                <li>Flashbacks or intrusive memories</li>
                <li>Dissociation or feeling disconnected from reality</li>
                <li>Increased suicidal thoughts</li>
                <li>Paranoia or unusual perceptual experiences</li>
                <li>Severe anxiety or panic that doesn&apos;t resolve</li>
              </ul>
            </div>
          </section>

          {/* Limitations */}
          <section>
            <h2 className="text-2xl font-bold">Limitations of This Resource</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                This website is created by someone with limited meditation experience
                (approximately 4-5 months of regular practice at the time of creation).
                While efforts have been made to provide accurate information, the creator
                is not a meditation teacher, therapist, or healthcare provider.
              </p>
              <p>
                The content represents one approach among many. Different traditions and
                teachers may offer different—and equally valid—perspectives.
              </p>
              <p>
                For serious practice or challenging territory, we recommend working with
                qualified teachers and/or mental health professionals.
              </p>
            </div>
          </section>

          {/* No Guarantees */}
          <section>
            <h2 className="text-2xl font-bold">No Guarantees</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                We make no guarantees about:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Any specific outcomes from meditation practice</li>
                <li>The accuracy or completeness of information provided</li>
                <li>The suitability of these practices for your specific situation</li>
                <li>Any particular benefits or experiences</li>
              </ul>
              <p>
                Individual results vary widely. What works for one person may not work
                for another.
              </p>
            </div>
          </section>

          {/* Data */}
          <section>
            <h2 className="text-2xl font-bold">Data & Privacy</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                All practice data (sessions, journal entries, plans) is stored locally
                in your browser&apos;s localStorage. We do not collect, transmit, or store
                any of your personal practice data on our servers.
              </p>
              <p>
                You are responsible for backing up your data if you want to preserve it.
                Use the export feature regularly if your data is important to you.
              </p>
            </div>
          </section>

          {/* Crisis Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Crisis Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you are in crisis or experiencing a mental health emergency:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="font-semibold">USA:</span>
                  <span className="text-muted-foreground">
                    988 Suicide & Crisis Lifeline (call or text 988)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">International:</span>
                  <span className="text-muted-foreground">
                    <a
                      href="https://findahelpline.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline inline-flex items-center gap-1"
                    >
                      findahelpline.com
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                    {' '}(find resources in your country)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Emergency:</span>
                  <span className="text-muted-foreground">
                    Contact local emergency services or go to your nearest emergency room
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold">By Using This Site</h2>
            <p className="mt-4 text-muted-foreground">
              By using this website and its tools, you acknowledge that you have read
              and understood this disclaimer, that you accept full responsibility for
              your meditation practice, and that you will seek appropriate professional
              help if needed.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
