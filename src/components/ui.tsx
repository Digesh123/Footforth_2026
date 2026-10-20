import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { buttonClass } from './button'
import type { ButtonVariant } from './button'
import { selectEnquiry } from '../lib/enquiry'
import type { EnquiryType } from '../lib/enquiry'
import { Reveal } from './Reveal'

export function ButtonLink({
  variant = 'primary',
  enquiry,
  className = '',
  onClick,
  ...props
}: ComponentPropsWithoutRef<'a'> & { variant?: ButtonVariant; enquiry?: EnquiryType }) {
  return (
    <a
      className={buttonClass(variant, className)}
      onClick={(e) => {
        if (enquiry) selectEnquiry(enquiry)
        onClick?.(e)
      }}
      {...props}
    />
  )
}

export function SectionHeader({
  title,
  children,
  id,
  className = '',
}: {
  title: ReactNode
  children?: ReactNode
  id?: string
  className?: string
}) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <h2 id={id} className="heading-section">
        {title}
      </h2>
      {children && <div className="lede mt-4">{children}</div>}
    </Reveal>
  )
}

export type Tone = 'ok' | 'warn' | 'alert' | 'neutral' | 'brand'

const toneClasses: Record<Tone, { pill: string; dot: string }> = {
  ok: { pill: 'bg-ok-tint text-ok', dot: 'bg-ok-dot' },
  warn: { pill: 'bg-warn-tint text-warn', dot: 'bg-warn-dot' },
  alert: { pill: 'bg-alert-tint text-alert', dot: 'bg-alert-dot' },
  neutral: { pill: 'bg-canvas text-ink-2 ring-1 ring-inset ring-line', dot: 'bg-ink-3/60' },
  brand: { pill: 'bg-brand-tint text-brand-ink', dot: 'bg-brand' },
}

export function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  const t = toneClasses[tone]
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.pill}`}
    >
      <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${t.dot}`} />
      {children}
    </span>
  )
}

export function StatusDot({ tone }: { tone: Tone }) {
  return <span aria-hidden="true" className={`inline-block size-2 shrink-0 rounded-full ${toneClasses[tone].dot}`} />
}
