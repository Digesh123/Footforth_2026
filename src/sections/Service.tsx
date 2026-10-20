import { BellRing, Check, DatabaseBackup, Globe, LifeBuoy, LockKeyhole, MailCheck, Radar, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '../components/ui'
import { Reveal } from '../components/Reveal'

const pillars = [
  { title: 'Monitor', body: 'We watch the services your business depends on and catch problems early.' },
  { title: 'Keep track', body: 'Ownership, renewals, configuration and backups, recorded in one place.' },
  { title: 'Support', body: 'One clear point of contact when something goes wrong.' },
]

type Mode = 'assisted' | 'led'

const capabilities: { id: string; icon: LucideIcon; title: string; mode: Mode; points: string[]; note?: string }[] = [
  {
    id: 'website-monitoring',
    icon: Globe,
    title: 'Website availability',
    mode: 'assisted',
    points: ['Availability checks on your agreed website', 'Alerts for detected outages', 'Investigation within the agreed scope'],
  },
  {
    id: 'domain-ssl',
    icon: LockKeyhole,
    title: 'Domain and SSL tracking',
    mode: 'assisted',
    points: [
      'Registrar and expiry details recorded',
      'Certificate validity tracked where supported',
      'Renewal reminders and help with basic DNS issues',
    ],
  },
  {
    id: 'email-health',
    icon: MailCheck,
    title: 'Business email checks',
    mode: 'led',
    points: ['Provider and configuration documented', 'Related DNS records reviewed', 'Help with reported email problems'],
  },
  {
    id: 'backups',
    icon: DatabaseBackup,
    title: 'Backup status review',
    mode: 'led',
    points: [
      'Backup arrangements recorded',
      'Status or logs reviewed where access permits',
      'Missing or unverified backups flagged',
    ],
    note: 'Restore testing and disaster recovery are scoped separately.',
  },
  {
    id: 'support',
    icon: LifeBuoy,
    title: 'Email-based support',
    mode: 'led',
    points: ['One support contact for your business', 'Practical help within the agreed scope', 'Clear advice when a provider must act'],
  },
  {
    id: 'updates',
    icon: BellRing,
    title: 'Ongoing updates',
    mode: 'led',
    points: ['Alerts about detected issues', 'Advance notice of renewals', 'A concise status email, where included'],
  },
]

const modes: Record<Mode, { label: string; icon: LucideIcon; className: string }> = {
  assisted: {
    label: 'Tool-assisted, reviewed by us',
    icon: Radar,
    className: 'bg-canvas text-ink-2 ring-1 ring-inset ring-line',
  },
  led: { label: 'Handled by Footforth', icon: UserRound, className: 'bg-brand-tint text-brand-ink' },
}

function ModeTag({ mode }: { mode: Mode }) {
  const { label, icon: Icon, className } = modes[mode]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold ${className}`}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  )
}

export function Service() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y border-y border-line bg-canvas">
      <div className="page">
        <SectionHeader id="services-title" title="Footforth Infrastructure Care">
          <p>
            A managed service that monitors your essential digital infrastructure, tracks important renewals and gives
            you practical technical support.
          </p>
        </SectionHeader>

        <dl className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="border-t-2 border-ink pt-4">
              <dt className="font-semibold">{p.title}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{p.body}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">What’s included</h3>
          <div className="flex flex-wrap items-center gap-2" aria-label="Legend">
            <ModeTag mode="assisted" />
            <ModeTag mode="led" />
          </div>
        </div>
        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-3">
          Established monitoring tools spot changes. We review what they find, check what tools can’t, and tell you
          what it means.
        </p>

        <ul className="mt-6 grid overflow-hidden rounded-2xl border border-line bg-line [gap:1px] md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ id, icon: Icon, title, mode, points, note }, i) => (
            <li key={id} id={id} className="bg-white">
              <Reveal delay={(i % 3) * 70} className="flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-canvas text-brand-ink ring-1 ring-line">
                    <Icon className="size-[1.125rem]" aria-hidden="true" />
                  </span>
                  <h4 className="leading-snug font-semibold">{title}</h4>
                </div>
                <div className="mt-3">
                  <ModeTag mode={mode} />
                </div>
                <ul className="mt-4 flex-1 space-y-2">
                  {points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                {note && <p className="mt-4 border-t border-line pt-3 text-sm text-ink-3">{note}</p>}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
