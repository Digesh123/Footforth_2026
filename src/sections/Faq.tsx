import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { site } from '../config/site'
import { SectionHeader } from '../components/ui'
import { Reveal } from '../components/Reveal'

const faqs = [
  {
    q: 'What is managed digital infrastructure?',
    a: 'Someone taking responsibility for the online services your business relies on: website, domain, email, SSL certificates and backups. We monitor what can be monitored, track renewals, keep records and help when something goes wrong.',
  },
  {
    q: 'What does the onboarding audit include?',
    a: 'A review of your website, hosting, domain, DNS, SSL, email setup, account ownership and visible backup status, with a short findings summary. It is a basic review, not a cybersecurity audit or penetration test.',
  },
  {
    q: 'Are domain, hosting, SSL and email subscription costs included?',
    a: 'No. Our fee covers management and support. Third-party subscriptions are charged separately where your setup needs them.',
  },
  {
    q: 'Do we need to change our existing providers?',
    a: 'Usually not. We work with your current registrar, host and email provider. If a change would genuinely help, we’ll explain why and you decide.',
  },
  {
    q: 'What happens if a monitored service has a problem?',
    a: 'We investigate within the agreed scope and email you with what we found and what happens next. Anything needing a provider or out-of-scope work is explained and approved by you first.',
  },
  {
    q: 'Does Footforth provide 24/7 emergency support?',
    a: 'No. Support is by email during working hours agreed in your service. Monitoring tools may alert at any time, but we don’t offer a 24/7 emergency response.',
  },
  {
    q: 'Do you provide website development and migrations?',
    a: 'They aren’t part of Infrastructure Care. Tell us what you need and we can discuss it as a separately quoted project.',
  },
  {
    q: 'Can you manage infrastructure that another provider originally configured?',
    a: 'Yes. The audit establishes what’s in place and who has access. We’ll agree a secure way to share access, so please never send passwords through the form.',
  },
  {
    q: 'Do you guarantee that our website will never go down?',
    a: 'No. Monitoring helps us spot some problems early, but it can’t prevent every outage or guarantee security. Availability also depends on your hosting and other providers.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  // Arrow keys, Home and End move between questions, following the WAI-ARIA accordion pattern.
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = faqs.length - 1
    const target =
      e.key === 'ArrowDown' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowUp' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (target === null) return
    e.preventDefault()
    buttons.current[target]?.focus()
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y">
      <div className="page grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <div>
          <SectionHeader id="faq-title" title="Frequently asked questions" />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-3">
            Something else on your mind? Email{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-ink underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand"
            >
              {site.email}
            </a>
            .
          </p>
        </div>

        <Reveal className="divide-y divide-line rounded-2xl border border-line bg-white">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i
            return (
              <div key={q}>
                <h3>
                  <button
                    ref={(el) => {
                      buttons.current[i] = el
                    }}
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="group flex min-h-14 w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left font-semibold transition-colors hover:text-brand-ink focus-visible:outline-offset-[-2px] sm:px-6"
                  >
                    {q}
                    <ChevronDown
                      className={`size-5 shrink-0 transition-[transform,color] duration-300 ease-out ${
                        isOpen ? 'rotate-180 text-brand' : 'text-ink-3 group-hover:text-brand-ink'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-5 pb-5 text-[0.9375rem] leading-relaxed text-ink-2 transition-opacity duration-300 sm:px-6 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
