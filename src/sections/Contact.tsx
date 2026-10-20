import { useEffect, useRef, useState } from 'react'
import type { FormEvent, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, MailOpen, Phone } from 'lucide-react'
import { site } from '../config/site'
import { buttonClass } from '../components/button'
import { Reveal } from '../components/Reveal'
import { enquiryTypes, onEnquirySelected } from '../lib/enquiry'
import type { EnquiryType } from '../lib/enquiry'

type Status = 'idle' | 'sending' | 'sent' | 'mail-opened' | 'error'
type FieldName = 'name' | 'business' | 'email' | 'website' | 'message'
type Values = Record<FieldName, string>

const emptyValues: Values = { name: '', business: '', email: '', website: '', message: '' }
const fieldOrder: FieldName[] = ['name', 'business', 'email', 'website', 'message']

function validate(field: FieldName, raw: string): string | null {
  const value = raw.trim()
  switch (field) {
    case 'name':
      return value ? null : 'Enter your name.'
    case 'business':
      return value ? null : 'Enter your business name.'
    case 'email':
      if (!value) return 'Enter your business email.'
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? null : 'Enter an email address like name@yourbusiness.com.'
    case 'website':
      if (!value) return null
      return /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i.test(value) ? null : 'Enter a web address like yourbusiness.com.'
    case 'message':
      return value ? null : 'Tell us briefly what you need help with.'
  }
}

function subjectFor(type: EnquiryType, v: Values) {
  return `${enquiryTypes[type].subject}: ${v.business.trim() || v.name.trim()}`
}

function buildMailto(type: EnquiryType, v: Values) {
  const body = [
    `Enquiry: ${enquiryTypes[type].label}`,
    `Name: ${v.name.trim()}`,
    `Business: ${v.business.trim()}`,
    `Email: ${v.email.trim()}`,
    `Website: ${v.website.trim() || 'Not provided'}`,
    '',
    'What we need help with:',
    v.message.trim(),
  ].join('\n')
  return `mailto:${site.email}?subject=${encodeURIComponent(subjectFor(type, v))}&body=${encodeURIComponent(body)}`
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [type, setType] = useState<EnquiryType>('audit')
  const [values, setValues] = useState<Values>(emptyValues)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const usesEndpoint = Boolean(site.formEndpoint)

  useEffect(() => onEnquirySelected(setType), [])

  const errors = Object.fromEntries(fieldOrder.map((f) => [f, validate(f, values[f])])) as Record<FieldName, string | null>
  const visibleError = (f: FieldName) => ((touched[f] || submitted) && errors[f]) || null
  const errorCount = fieldOrder.filter((f) => errors[f]).length

  const fieldProps = (f: FieldName) => ({
    name: f,
    value: values[f],
    error: visibleError(f),
    onChange: (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [f]: e.target.value }))
      if (status === 'mail-opened' || status === 'error') setStatus('idle')
    },
    onBlur: () => values[f] && setTouched((t) => ({ ...t, [f]: true })),
  })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    const firstInvalid = fieldOrder.find((f) => errors[f])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus()
      return
    }

    if (!usesEndpoint) {
      window.location.assign(buildMailto(type, values))
      setStatus('mail-opened')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          enquiry: enquiryTypes[type].label,
          ...Object.fromEntries(fieldOrder.map((f) => [f, values[f].trim()])),
          _subject: subjectFor(type, values),
        }),
      })
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)
      setValues(emptyValues)
      setTouched({})
      setSubmitted(false)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const action = enquiryTypes[type].action

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y border-t border-line bg-canvas">
      <div className="page grid gap-12 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
        <Reveal>
          <h2 id="contact-title" className="heading-section">
            Book an Infrastructure Audit
          </h2>
          <p className="lede mt-4 max-w-md">Tell us what your business relies on. We’ll reply by email.</p>

          <ol className="mt-8 space-y-3">
            {[
              'We reply to arrange a short conversation.',
              'We ask about your website, domain, email and hosting.',
              'You get a written scope and quote before anything starts.',
            ].map((step, i) => (
              <li key={step} className="flex gap-3 text-[0.9375rem] text-ink-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white text-xs font-bold text-ink">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[0.9375rem]">
            <ContactLine icon={<Mail className="size-4" aria-hidden="true" />}>
              <a href={`mailto:${site.email}`} className="font-medium text-ink transition-colors hover:text-brand-ink">
                {site.email}
              </a>
            </ContactLine>
            <ContactLine icon={<Phone className="size-4" aria-hidden="true" />}>
              <a href={site.phone.href} className="font-medium text-ink transition-colors hover:text-brand-ink">
                {site.phone.display}
              </a>
            </ContactLine>
            <ContactLine icon={<MapPin className="size-4" aria-hidden="true" />}>
              <span className="text-ink-2">{site.location}</span>
            </ContactLine>
          </ul>
        </Reveal>

        <Reveal delay={100} className="rounded-2xl border border-line bg-white p-5 shadow-panel sm:p-8">
          {status === 'sent' ? (
            <div role="status" className="py-8 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-ok-tint">
                <CircleCheck className="size-7 text-ok" aria-hidden="true" />
              </span>
              <p className="mt-4 text-lg font-semibold">Enquiry sent</p>
              <p className="mt-2 text-[0.9375rem] text-ink-3">We’ll reply to the email address you gave us.</p>
              <button type="button" onClick={() => setStatus('idle')} className={buttonClass('secondary', 'mt-6')}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note">
              <fieldset>
                <legend className="text-sm font-medium">What would you like?</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(Object.keys(enquiryTypes) as EnquiryType[]).map((t) => (
                    <label
                      key={t}
                      className="flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-line-strong bg-white px-2 py-2 text-center text-[0.8125rem] leading-tight font-medium sm:px-3 sm:text-sm text-ink-2 transition-colors hover:border-ink-3/50 has-checked:border-brand has-checked:bg-brand-tint has-checked:text-brand-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
                    >
                      <input
                        type="radio"
                        name="enquiry"
                        value={t}
                        checked={type === t}
                        onChange={() => setType(t)}
                        className="sr-only"
                      />
                      {enquiryTypes[t].option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Name" autoComplete="name" required {...fieldProps('name')} />
                <Field label="Business name" autoComplete="organization" required {...fieldProps('business')} />
                <Field
                  label="Business email"
                  type="email"
                  autoComplete="email"
                  required
                  className="sm:col-span-2"
                  {...fieldProps('email')}
                />
                <Field
                  label="Website URL"
                  optional
                  inputMode="url"
                  autoComplete="url"
                  placeholder="yourbusiness.com"
                  className="sm:col-span-2"
                  {...fieldProps('website')}
                />
                <TextArea
                  label="What do you need help with?"
                  hint="Please don’t include passwords or login details."
                  required
                  rows={4}
                  maxLength={1500}
                  placeholder="For example: our domain renews soon and we’re not sure who manages it."
                  className="sm:col-span-2"
                  {...fieldProps('message')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={buttonClass('primary', 'mt-6 w-full disabled:cursor-wait disabled:opacity-80')}
              >
                {status === 'sending' ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  action
                )}
              </button>

              <div aria-live="polite" className="empty:hidden">
                {submitted && errorCount > 0 && (
                  <p className="mt-3 text-sm text-alert">
                    {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`}
                  </p>
                )}
                {status === 'mail-opened' && (
                  <Notice tone="info" icon={<MailOpen className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}>
                    <strong className="font-semibold">Not sent yet.</strong> Your email app should be open with the
                    enquiry filled in. Press Send there to reach us. Nothing opened? Email{' '}
                    <a href={`mailto:${site.email}`} className="font-semibold underline">
                      {site.email}
                    </a>
                    .
                  </Notice>
                )}
                {status === 'error' && (
                  <Notice tone="error" icon={<CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}>
                    <strong className="font-semibold">Not sent.</strong> Check your connection and try again, or
                    email{' '}
                    <a href={`mailto:${site.email}`} className="font-semibold underline">
                      {site.email}
                    </a>
                    .
                  </Notice>
                )}
              </div>

              <p id="form-note" className="mt-4 text-xs leading-relaxed text-ink-3">
                {usesEndpoint
                  ? 'We use these details only to respond to your enquiry.'
                  : `This opens your email app with a message to ${site.email}. We use these details only to respond.`}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Notice({ tone, icon, children }: { tone: 'info' | 'error'; icon: ReactNode; children: ReactNode }) {
  const styles = tone === 'info' ? 'border-brand/20 bg-brand-tint text-brand-ink' : 'border-alert/20 bg-alert-tint text-alert'
  return <p className={`mt-4 flex gap-2 rounded-lg border p-3 text-sm leading-relaxed ${styles}`}>{icon}<span>{children}</span></p>
}

function ContactLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex size-8 items-center justify-center rounded-lg bg-white text-ink-3 ring-1 ring-line">{icon}</span>
      {children}
    </li>
  )
}

const controlClass = (error: string | null) =>
  `mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-ink-3/70 transition-[border-color,box-shadow] duration-150 hover:border-ink-3/50 focus:outline-none focus:ring-4 ${
    error ? 'border-alert focus:border-alert focus:ring-alert/15' : 'border-line-strong focus:border-brand focus:ring-brand/15'
  }`

function FieldShell({
  id,
  label,
  optional,
  hint,
  error,
  className,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: string
  error: string | null
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-ink-3"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-alert">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-3">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

type ControlProps = { label: string; name: FieldName; error: string | null; optional?: boolean; hint?: string; className?: string }

function describedBy(name: string, error: string | null, hint?: string) {
  return error ? `${name}-error` : hint ? `${name}-hint` : undefined
}

function Field({ label, name, error, optional, hint, className, ...props }: ControlProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={name} label={label} optional={optional} hint={hint} error={error} className={className}>
      <input
        id={name}
        type="text"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={controlClass(error)}
        {...props}
        name={name}
      />
    </FieldShell>
  )
}

function TextArea({ label, name, error, optional, hint, className, ...props }: ControlProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={name} label={label} optional={optional} hint={hint} error={error} className={className}>
      <textarea
        id={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={`${controlClass(error)} resize-y`}
        {...props}
        name={name}
      />
    </FieldShell>
  )
}
