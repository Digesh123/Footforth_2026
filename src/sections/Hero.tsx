import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight, CalendarClock, DatabaseBackup, Globe, LockKeyhole, Mail, Radar, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ButtonLink, StatusPill } from '../components/ui'
import type { Tone } from '../components/ui'
import { useReveal } from '../components/useReveal'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line bg-canvas">
      {/* Faint grid, echoing the structure of a management console */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e3e8f0 1px, transparent 1px), linear-gradient(to bottom, #e3e8f0 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-2 sm:text-sm">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ok-dot" />
            Managed digital infrastructure for small businesses
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2rem] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[2.75rem] lg:text-[2.875rem]"
          >
            Your business depends on your digital infrastructure. We'll help you keep it running.
          </h1>
          <p className="lede mt-6 max-w-lg">
            We monitor and manage your website, domain, email and essential digital services, so you can focus on your
            business.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" enquiry="audit">
              Book an Infrastructure Audit
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>

        <OverviewPanel />
      </div>
    </section>
  )
}

function OverviewPanel() {
  const [ref, state] = useReveal<HTMLElement>()
  return (
    <figure
      ref={ref}
      data-reveal={state}
      style={{ '--reveal-delay': '120ms' } as CSSProperties}
      className="mx-auto w-full max-w-xl lg:max-w-none"
      aria-labelledby="overview-caption"
    >
      <div className="rounded-2xl border border-line bg-white shadow-panel">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="hidden gap-1 sm:flex">
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
            </span>
            <span className="text-sm font-semibold">Infrastructure overview</span>
          </div>
          <span className="rounded-md bg-canvas px-2 py-0.5 text-xs font-medium text-ink-3">Illustrative example</span>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2.5 sm:gap-3 sm:p-4">
          <StatusCard
            icon={Globe}
            label="Website"
            status="Online"
            tone="ok"
            detail="Availability monitoring"
            visual={<CheckTicks />}
          />
          <StatusCard
            icon={CalendarClock}
            label="Domain"
            status="Renewal tracking"
            tone="warn"
            detail="Expiry reminders"
            visual={<RenewalTrack />}
          />
          <StatusCard
            icon={LockKeyhole}
            label="SSL"
            status="Certificate checks"
            tone="ok"
            detail="Validity monitoring"
            visual={<Chips items={['HTTPS', 'Certificate valid']} />}
          />
          <StatusCard
            icon={DatabaseBackup}
            label="Backups"
            status="Status review"
            tone="neutral"
            detail="Verification where available"
            visual={<Chips items={['Arrangement recorded', 'Status reviewed']} />}
          />
        </div>

        <div className="border-t border-line px-4 py-4 sm:px-5">
          <p className="text-xs font-semibold text-ink-3">When something needs attention</p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">
            <FlowStep icon={Radar} title="Tool detects" note="Scheduled check" />
            <FlowArrow />
            <FlowStep icon={UserRound} title="Footforth reviews" note="A person investigates" highlight />
            <FlowArrow />
            <FlowStep icon={Mail} title="You're informed" note="Plain-language email" />
          </ol>
        </div>
      </div>
      <figcaption id="overview-caption" className="mt-3 text-center text-xs text-ink-3">
        Illustrative monitoring overview. Not live data.
      </figcaption>
    </figure>
  )
}

function StatusCard({
  icon: Icon,
  label,
  status,
  tone,
  detail,
  visual,
}: {
  icon: LucideIcon
  label: string
  status: string
  tone: Tone
  detail: string
  visual: ReactNode
}) {
  return (
    <div className="group min-w-0 rounded-xl border border-line bg-white p-3 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_8px_20px_-12px_rgb(16_24_40/0.25)] sm:p-4">
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-canvas text-ink-2 ring-1 ring-line transition-colors duration-200 group-hover:text-brand-ink sm:size-8">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <div className="mt-3">
        <StatusPill tone={tone}>{status}</StatusPill>
      </div>
      <p className="mt-2 text-[0.8125rem] leading-snug text-ink-3 sm:text-sm">{detail}</p>
      <div className="mt-3 hidden sm:block">{visual}</div>
    </div>
  )
}

function CheckTicks() {
  return (
    <div aria-hidden="true" className="flex h-5 items-end gap-[3px]">
      {Array.from({ length: 22 }, (_, i) => (
        <span
          key={i}
          style={{ '--i': i } as CSSProperties}
          className="tick h-full flex-1 origin-bottom rounded-[2px] bg-ok-dot/70"
        />
      ))}
    </div>
  )
}

function RenewalTrack() {
  return (
    <div aria-hidden="true">
      <div className="relative h-1.5 rounded-full bg-canvas ring-1 ring-line">
        <span className="track-fill absolute inset-y-0 left-0 w-full origin-left rounded-full">
          <span className="absolute inset-y-0 left-0 w-[72%] rounded-l-full bg-line-strong" />
          <span className="absolute inset-y-0 right-0 left-[72%] rounded-r-full bg-warn-dot/50" />
        </span>
        <span className="track-marker absolute top-1/2 left-[72%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-warn-dot" />
      </div>
      <div className="mt-1.5 flex justify-between text-[0.6875rem] text-ink-3">
        <span>Registered</span>
        <span>Reminder window</span>
      </div>
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="rounded-md bg-canvas px-2 py-0.5 text-[0.6875rem] font-medium text-ink-2">
          {item}
        </span>
      ))}
    </div>
  )
}

function FlowStep({
  icon: Icon,
  title,
  note,
  highlight = false,
}: {
  icon: LucideIcon
  title: string
  note: string
  highlight?: boolean
}) {
  return (
    <li
      className={`flex h-full items-center gap-2.5 rounded-lg px-3 py-2.5 sm:flex-col sm:items-start sm:gap-2 ${
        highlight ? 'bg-brand-tint text-brand-ink' : 'bg-canvas text-ink-2'
      }`}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-[0.8125rem] leading-tight font-semibold">{title}</span>
        <span className={`block text-[0.6875rem] leading-tight ${highlight ? 'text-brand-ink/80' : 'text-ink-3'}`}>
          {note}
        </span>
      </span>
    </li>
  )
}

function FlowArrow() {
  return (
    <li aria-hidden="true" className="hidden items-center justify-center text-line-strong sm:flex">
      <ArrowRight className="size-4" />
    </li>
  )
}
