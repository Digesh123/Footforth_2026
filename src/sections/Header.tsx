import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav } from '../config/site'
import { Logo } from '../components/Logo'
import { ButtonLink } from '../components/ui'

/** Highlights the nav link whose section crosses a band just above the middle of the viewport. */
function useActiveLink() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const owner = new Map<string, string>()
    for (const item of nav) for (const id of item.sections) owner.set(id, item.href)

    const inBand = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id)
          else inBand.delete(e.target.id)
        }
        const current = [...owner.keys()].find((id) => inBand.has(id))
        setActive(current ? owner.get(current)! : null)
      },
      { rootMargin: '-30% 0px -65% 0px' },
    )
    for (const id of owner.keys()) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  return active
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)
  const active = useActiveLink()

  // A sentinel at the top of the page replaces a scroll listener.
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-2 w-px" />
      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ${
          scrolled || open ? 'border-line shadow-[0_1px_12px_-6px_rgb(16_24_40/0.12)]' : 'border-transparent'
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:shadow"
        >
          Skip to content
        </a>
        <div className="page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <a href="#top" className="shrink-0 rounded-md" aria-label="Footforth Solutions, back to top" onClick={close}>
            <Logo className="h-8 w-auto lg:h-9" />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => {
                const isActive = active === item.href
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-150 hover:bg-canvas hover:text-ink ${
                        isActive ? 'text-ink' : 'text-ink-2'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 -bottom-px h-0.5 origin-center rounded-full bg-brand transition-transform duration-200 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href="#contact" enquiry="audit" onClick={close}>
                Book an Infrastructure Audit
              </ButtonLink>
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-canvas active:bg-line/60 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Overlay below the header so opening it never shifts the page. Animated with grid rows;
            `inert` keeps the closed menu out of the tab order and accessibility tree. */}
        <div
          id="mobile-nav"
          inert={!open}
          className={`absolute inset-x-0 top-full grid bg-white transition-[grid-template-rows] duration-250 ease-out lg:hidden ${
            open ? 'grid-rows-[1fr] shadow-[0_16px_32px_-16px_rgb(16_24_40/0.25)]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Mobile"
              className={`page border-t border-line py-3 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
            >
              <ul className="divide-y divide-line">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={close}
                      aria-current={active === item.href ? 'true' : undefined}
                      className={`flex min-h-12 items-center justify-between text-base font-medium transition-colors hover:text-brand-ink ${
                        active === item.href ? 'text-brand-ink' : 'text-ink'
                      }`}
                    >
                      {item.label}
                      {active === item.href && <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />}
                    </a>
                  </li>
                ))}
              </ul>
              <ButtonLink href="#contact" enquiry="audit" onClick={close} className="mt-3 mb-2 w-full">
                Book an Infrastructure Audit
              </ButtonLink>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
