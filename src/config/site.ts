// Central place for business details. Edit these values before launch.
// Contact details and social links below were taken from the previous Footforth website.

export const site = {
  name: 'Footforth Solutions',
  shortName: 'Footforth',
  email: 'support@footforth.in',
  phone: {
    display: '+91 96190 40970',
    href: 'tel:+919619040970',
  },
  location: 'Mumbai, Maharashtra, India',
  social: {
    linkedin: 'https://www.linkedin.com/company/footforth-solutions/',
    instagram: 'https://www.instagram.com/footforth_solutions',
  },
  // Optional indicative starting price for Infrastructure Care, shown in the pricing section.
  // Leave as null to hide it. Example: { amount: '₹X,XXX', period: 'per month' }
  indicativePrice: null as null | { amount: string; period: string },
  // Optional form endpoint (Formspree, Web3Forms, Getform or similar) that accepts a JSON POST.
  // Set VITE_FORM_ENDPOINT in your hosting provider's environment variables.
  // When it is not set, the enquiry form opens the visitor's email app with the message prefilled.
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || '',
}

// `sections` lists the page sections that highlight each link while in view.
export const nav = [
  { label: 'Home', href: '#top', sections: ['top', 'problem'] },
  { label: 'Services', href: '#services', sections: ['services'] },
  { label: 'How It Works', href: '#how-it-works', sections: ['how-it-works', 'audit'] },
  { label: 'Pricing', href: '#pricing', sections: ['pricing'] },
  { label: 'About', href: '#about', sections: ['about', 'faq'] },
  { label: 'Contact', href: '#contact', sections: ['contact'] },
]
