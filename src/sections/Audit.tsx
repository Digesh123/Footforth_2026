import { Info, KeyRound, LockKeyhole, Mail, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ButtonLink, SectionHeader, StatusDot } from '../components/ui'
import type { Tone } from '../components/ui'
import { Reveal } from '../components/Reveal'

const coverage: { icon: LucideIcon; title: string; items: string }[] = [
  { icon: Server, title: 'Website and hosting', items: 'Availability, obvious issues, hosting provider and basic configuration' },
  { icon: LockKeyhole, title: 'Domain, DNS and SSL', items: 'Registrar, expiry, renewal ownership, DNS setup and certificate validity' },
  { icon: Mail, title: 'Business email', items: 'Email provider and the DNS records it relies on' },
  {
    icon: KeyRound,
    title: 'Access, backups and records',
    items: 'Who owns and can administer each account, visible backup status, and documentation gaps',
  },
]

const findings: { tone: Tone; title: string; items: string[] }[] = [
  {
    tone: 'alert',
    title: 'Needs attention now',
    items: ['Domain registered to a former employee’s personal account', 'No record of who holds hosting admin access'],
  },
  {
    tone: 'warn',
    title: 'Should be addressed soon',
    items: ['Domain not set to renew automatically', 'Email authentication records partly configured'],
  },
  {
    tone: 'ok',
    title: 'Currently appears satisfactory',
    items: ['SSL certificate valid and HTTPS available', 'Website responding normally during checks'],
  },
]

export function Audit() {
  return (
    <section id="audit" aria-labelledby="audit-title" className="section-y border-y border-line bg-canvas">
      <div className="page grid gap-12 lg:grid-cols-[1fr_minmax(0,27rem)] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-brand-ink">One-time onboarding audit</p>
          <SectionHeader id="audit-title" title="Know what you have. Know what needs attention." className="mt-2">
            <p>
              Before ongoing management begins, we review your setup, document the essentials and flag obvious risks
              and gaps.
            </p>
          </SectionHeader>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {coverage.map(({ icon: Icon, title, items }, i) => (
              <Reveal as="li" key={title} delay={i * 60} className="rounded-xl border border-line bg-white p-4">
                <p className="flex items-center gap-2 font-semibold">
                  <Icon className="size-4 text-brand" aria-hidden="true" />
                  {title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{items}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-5 flex gap-3 text-sm leading-relaxed text-ink-2">
            <Info className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden="true" />
            <p>
              A basic, non-intrusive infrastructure review. It isn’t a cybersecurity audit or penetration test, and it
              can’t guarantee security. Fixes, migrations and restores are quoted separately and need your approval.
            </p>
          </div>

          <ButtonLink href="#contact" enquiry="audit" className="mt-8">
            Book an Infrastructure Audit
          </ButtonLink>
        </div>

        <Reveal as="figure" delay={120} aria-labelledby="findings-caption" className="self-start lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-white shadow-panel">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <p className="font-semibold">Findings summary</p>
                <p className="mt-0.5 text-sm text-ink-3">What you receive after the audit</p>
              </div>
              <span className="rounded-md bg-canvas px-2 py-0.5 text-xs font-medium text-ink-3">Sample layout</span>
            </div>
            <div className="divide-y divide-line">
              {findings.map((group) => (
                <div key={group.title} className="px-5 py-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <StatusDot tone={group.tone} />
                    {group.title}
                  </p>
                  <ul className="mt-2.5 space-y-1.5 pl-4">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm leading-snug text-ink-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <figcaption id="findings-caption" className="mt-3 text-center text-xs text-ink-3">
            Example findings for illustration only.
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
