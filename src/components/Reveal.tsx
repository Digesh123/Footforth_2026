import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from './useReveal'

export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}: {
  as?: ElementType
  delay?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
  id?: string
}) {
  const [ref, state] = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={className}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
