import { FileText, ListChecks, MessagesSquare, UserRound } from 'lucide-react'
import { site } from '../config/site'
import { Reveal } from '../components/Reveal'

const reasons = [
  {
    icon: UserRound,
    title: 'One point of contact',
    body: 'You know exactly who to email when something isn’t working.',
  },
  {
    icon: FileText,
    title: 'Documented ownership',
    body: 'Who owns and administers each account, written down, not stuck in someone’s head.',
  },
  {
    icon: MessagesSquare,
    title: 'Plain-language updates',
    body: 'Clear explanations of what happened and what, if anything, you need to do.',
  },
  {
    icon: ListChecks,
    title: 'Transparent scope',
    body: 'You know what’s included, what costs extra and what third parties charge.',
  },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y border-y border-line bg-canvas">
      <div className="page grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <Reveal>
          <h2 id="about-title" className="heading-section">
            About Footforth
          </h2>
          <p className="lede mt-4">
            Footforth exists to make essential digital infrastructure easier to manage for small businesses through
            practical monitoring, maintenance and responsive technical support.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-3">
            Based in {site.location.replace(', India', '')}, working with businesses that don’t have an IT
            administrator of their own.
          </p>
        </Reveal>

        <ul className="grid gap-x-10 border-t border-line sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 60} className="flex gap-3.5 border-b border-line py-5">
              <Icon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
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
