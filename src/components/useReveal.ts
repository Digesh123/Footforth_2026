import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export type RevealState = 'idle' | 'hidden' | 'shown'

// One shared observer for every reveal on the page.
let observer: IntersectionObserver | null = null
const onEnter = new WeakMap<Element, () => void>()

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        onEnter.get(entry.target)?.()
        onEnter.delete(entry.target)
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  )
  return observer
}

function motionAllowed() {
  return 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Tracks whether an element has scrolled into view. Content stays fully visible ('idle')
 * unless the browser supports IntersectionObserver and the visitor allows motion.
 */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>('idle')

  // Layout effect so the element is hidden before first paint, avoiding a flash.
  useLayoutEffect(() => {
    if (ref.current && motionAllowed()) setState('hidden')
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || state !== 'hidden') return
    onEnter.set(el, () => setState('shown'))
    getObserver().observe(el)
    return () => {
      onEnter.delete(el)
      observer?.unobserve(el)
    }
  }, [state])

  return [ref, state] as const
}
