// Lets any call to action preselect the enquiry type in the contact form.

export type EnquiryType = 'audit' | 'quote' | 'general'

export const enquiryTypes: Record<EnquiryType, { option: string; label: string; action: string; subject: string }> = {
  audit: {
    option: 'Infrastructure audit',
    label: 'Infrastructure audit',
    action: 'Book an Infrastructure Audit',
    subject: 'Infrastructure audit enquiry',
  },
  quote: {
    option: 'Ongoing care quote',
    label: 'Quote for Infrastructure Care',
    action: 'Request a Quote',
    subject: 'Quote request',
  },
  general: { option: 'Something else', label: 'General question', action: 'Send enquiry', subject: 'General enquiry' },
}

const EVENT = 'footforth:enquiry'

export function selectEnquiry(type: EnquiryType) {
  window.dispatchEvent(new CustomEvent<EnquiryType>(EVENT, { detail: type }))
}

export function onEnquirySelected(handler: (type: EnquiryType) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<EnquiryType>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
