import { Check, Minus } from 'lucide-react'
import { site } from '../config/site'
import { ButtonLink, SectionHeader } from '../components/ui'
import { Reveal } from '../components/Reveal'

const feeCovers = [
  'Onboarding audit and documentation',
  'Monitoring setup and recurring checks',
  'Renewal tracking',
  'Issue investigation and email support within scope',
]

const thirdParty = [
  'Domain registrations and renewals',
  'Hosting and cloud infrastructure',
  'SSL certificates',
  'Google Workspace, Zoho Workplace and other email plans',
  'Premium monitoring tools, licences and other external services',
]

export function Pricing() {
  const price = site.indicativePrice
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y">
      <div className="page">
        <SectionHeader id="pricing-title" title="Transparent pricing. No bundled infrastructure costs.">
          <p>
            You pay Footforth for management and support. Third-party products are charged separately, and anything
            outside your scope is quoted and approved before we start.
          </p>
        </SectionHeader>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-brand/25 bg-white p-6 shadow-[0_8px_24px_-16px_rgb(23_105_245/0.35)] sm:p-8">
            <h3 className="text-lg font-semibold">Your Footforth fee</h3>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-medium">Onboarding infrastructure audit</dt>
                <dd className="shrink-0 text-sm text-ink-3">One-time</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-medium">Infrastructure Care</dt>
                <dd className="shrink-0 text-sm text-ink-3">Recurring</dd>
              </div>
            </dl>

            <ul className="mt-5 space-y-2.5">
              {feeCovers.map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.9375rem] text-ink-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-lg bg-brand-tint px-4 py-3 text-sm text-brand-ink">
              {price ? (
                <>
                  Indicative starting price: <strong className="font-semibold">{price.amount}</strong> {price.period}.{' '}
                </>
              ) : null}
              Your quote depends on how many websites, domains and mailboxes we look after, and is confirmed in
              writing.
            </p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col rounded-2xl border border-line bg-canvas p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Charged separately</h3>
            <p className="mt-1 text-[0.9375rem] text-ink-3">Third-party costs, where your setup needs them.</p>
            <ul className="mt-5 space-y-2.5">
              {thirdParty.map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.9375rem] text-ink-2">
                  <Minus className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-[0.9375rem] leading-relaxed text-ink-2">
              <span className="font-semibold text-ink">Out-of-scope work</span> such as migrations, restores or major
              changes is quoted first. Nothing goes ahead until you approve it.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="#contact" enquiry="quote">
            Request a Quote
          </ButtonLink>
          <p className="text-sm text-ink-3">Or start with the audit, and we’ll quote for ongoing care afterwards.</p>
        </div>
      </div>
    </section>
  )
}
