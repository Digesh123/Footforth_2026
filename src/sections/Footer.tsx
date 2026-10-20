import { nav, site } from '../config/site'
import { Logo } from '../components/Logo'
import { InstagramIcon, LinkedInIcon } from '../components/SocialIcons'

const services = [
  { label: 'Website monitoring', href: '#website-monitoring' },
  { label: 'Domain and SSL tracking', href: '#domain-ssl' },
  { label: 'Business email checks', href: '#email-health' },
  { label: 'Backup status review', href: '#backups' },
  { label: 'Infrastructure audit', href: '#audit' },
  { label: 'Pricing', href: '#pricing' },
]

const year = new Date().getFullYear()

const linkClass = 'text-[0.9375rem] text-ink-2 hover:text-brand-ink'

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <Logo className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-ink-3">
            Managed digital infrastructure for small businesses: monitoring, renewal tracking and practical technical
            support.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {[...nav, { label: 'FAQ', href: '#faq' }].map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="text-sm font-semibold">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phone.href} className={linkClass}>
                {site.phone.display}
              </a>
            </li>
            <li className="text-[0.9375rem] text-ink-3">{site.location}</li>
          </ul>
          <div className="mt-5 flex gap-2">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-lg text-ink-2 ring-1 ring-line hover:bg-canvas hover:text-ink"
            >
              <LinkedInIcon />
              <span className="sr-only">Footforth on LinkedIn (opens in a new tab)</span>
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-lg text-ink-2 ring-1 ring-line hover:bg-canvas hover:text-ink"
            >
              <InstagramIcon />
              <span className="sr-only">Footforth on Instagram (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="page py-5 text-sm text-ink-3">
          © {year} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
