import { CalendarClock, CircleHelp, KeyRound, ServerOff } from 'lucide-react'
import { SectionHeader } from '../components/ui'
import { Reveal } from '../components/Reveal'

const problems = [
  {
    icon: ServerOff,
    title: 'Your website goes down',
    body: 'And nobody notices until a customer mentions it.',
  },
  {
    icon: CalendarClock,
    title: 'A renewal slips past',
    body: 'A domain or SSL certificate expires because nobody was tracking it.',
  },
  {
    icon: KeyRound,
    title: 'Nobody knows who owns what',
    body: 'Domain, hosting and email accounts were set up by someone who has since moved on.',
  },
  {
    icon: CircleHelp,
    title: 'There’s no one to call',
    body: 'Email stops working or backups go unchecked, and there’s no obvious person to ask.',
  },
]

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="section-y">
      <div className="page grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <SectionHeader id="problem-title" title="Small IT issues can become big business disruptions.">
          <p>When an essential service fails, it’s usually one that nobody was watching.</p>
        </SectionHeader>

        <ul className="grid border-t border-line sm:grid-cols-2">
          {problems.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 70}
              className={`flex gap-4 border-b border-line py-5 sm:py-6 ${i % 2 === 0 ? 'sm:pr-8' : 'sm:border-l sm:pl-8'}`}
            >
              <Icon className="mt-0.5 size-5 shrink-0 text-ink-3" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-3">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
