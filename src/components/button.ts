export type ButtonVariant = 'primary' | 'secondary'

const buttonBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-[0.9375rem] font-semibold whitespace-nowrap transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0'

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white shadow-[0_1px_2px_rgb(16_24_40/0.12)] hover:bg-brand-hover hover:shadow-[0_4px_12px_-4px_rgb(23_105_245/0.5)] active:bg-brand-ink active:shadow-none',
  secondary: 'border border-line-strong bg-white text-ink hover:border-ink-3/50 hover:bg-canvas active:bg-line/60',
}

export function buttonClass(variant: ButtonVariant = 'primary', extra = '') {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`
}
