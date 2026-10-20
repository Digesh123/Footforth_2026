import { useState } from 'react'
import { SectionHeader } from '../components/ui'
import { useReveal } from '../components/useReveal'

const steps = [
  { title: 'Understand', body: 'We learn how your website, domain, email and hosting are set up.' },
  { title: 'Audit', body: 'We review ownership, renewals, visible risks and backup arrangements.' },
  { title: 'Set up', body: 'We agree the scope and configure the available monitoring and checks.' },
  { title: 'Manage', body: 'We monitor the agreed systems, send alerts and support you by email.' },
]

export function HowItWorks() {
  // Highlighting is a visual aid only: every step's text is always visible.
  const [active, setActive] = useState<number | null>(null)
  const [ref, reveal] = useReveal<HTMLOListElement>()
  const last = steps.length - 1
  const progress = reveal === 'hidden' ? 0 : active === null ? 1 : active / last

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y">
      <div className="page">
        <SectionHeader id="how-title" title="How it works">
          <p>Four steps from first conversation to ongoing care.</p>
        </SectionHeader>

        <ol
          ref={ref}
          onMouseLeave={() => setActive(null)}
          className="relative mt-10 grid lg:grid-cols-4 lg:gap-4"
        >
          {/* Rail: horizontal between the first and last markers on desktop, vertical on mobile */}
          <span aria-hidden="true" className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-px bg-line-strong lg:block">
            <span
              className="absolute inset-0 origin-left bg-brand transition-transform duration-700 ease-out"
              style={{ transform: `scaleX(${progress})` }}
            />
          </span>
          <span aria-hidden="true" className="absolute top-8 bottom-8 left-8 w-px bg-line-strong lg:hidden">
            <span
              className="absolute inset-0 origin-top bg-brand transition-transform duration-700 ease-out"
              style={{ transform: `scaleY(${progress})` }}
            />
          </span>

          {steps.map((step, i) => {
            const isActive = active === i
            const reached = reveal !== 'hidden' && (active === null || i <= active)
            const dimmed = active !== null && !isActive
            return (
              <li
                key={step.title}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive((cur) => (cur === i ? null : i))}
                className={`relative flex cursor-default gap-5 rounded-xl p-4 transition-colors duration-200 lg:flex-col lg:items-center lg:gap-4 lg:text-center ${
                  isActive ? 'bg-canvas' : ''
                }`}
              >
                <span
                  className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-[background-color,border-color,color,box-shadow] duration-300 ${
                    isActive
                      ? 'border-brand bg-brand text-white shadow-[0_0_0_4px_rgb(23_105_245/0.15)]'
                      : reached
                        ? 'border-brand bg-white text-brand-ink'
                        : 'border-line-strong bg-white text-ink'
                  }`}
                  style={{ transitionDelay: reveal === 'shown' && active === null ? `${i * 150}ms` : '0ms' }}
                >
                  {i + 1}
                </span>
                <div className="pt-1 lg:pt-0">
                  <h3 className={`font-semibold transition-colors duration-200 ${isActive ? 'text-brand-ink' : ''}`}>
                    {step.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-[0.9375rem] leading-relaxed transition-colors duration-200 lg:mx-auto lg:max-w-[15rem] ${
                      dimmed ? 'text-ink-3' : 'text-ink-2'
                    }`}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="mt-8 max-w-3xl border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-ink-3">
          Monitoring catches some problems early. Others only surface when someone reports them, which is what the
          support is for.
        </p>
      </div>
    </section>
  )
}
