import logoUrl from '../assets/footforth-logo.png'

export function Logo({ className = 'h-9 w-auto' }: { className?: string }) {
  return <img src={logoUrl} alt="Footforth, the next step" width={560} height={167} className={className} />
}
