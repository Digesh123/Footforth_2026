import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Service } from './sections/Service'
import { HowItWorks } from './sections/HowItWorks'
import { Audit } from './sections/Audit'
import { Pricing } from './sections/Pricing'
import { About } from './sections/About'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Service />
        <HowItWorks />
        <Audit />
        <Pricing />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
