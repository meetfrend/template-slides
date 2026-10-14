import { type ComponentType, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SLIDE_HEIGHT, SLIDE_WIDTH } from './size'

/** `#/3` opens the third slide, so a reload or a shared link keeps your place. */
function slideFromHash(count: number): number {
  const n = Number(window.location.hash.replace(/^#\/?/, ''))
  return Number.isInteger(n) && n >= 1 && n <= count ? n - 1 : 0
}

/** `?print` lays every slide out as a page, for "Save as PDF" from the browser's print dialog. */
const printing = new URLSearchParams(window.location.search).has('print')

/**
 * Shows one slide at a time, scaled to fit the window. Arrow keys, space, Page Up/Down, Home/End
 * and clicks (right half forward, left half back) move between slides; F toggles fullscreen.
 */
export function Deck({ slides }: { slides: ComponentType[] }) {
  const [index, setIndex] = useState(() => slideFromHash(slides.length))
  const [scale, setScale] = useState(1)
  const viewport = useRef<HTMLDivElement>(null)

  const go = useCallback((next: number) => setIndex(Math.max(0, Math.min(slides.length - 1, next))), [slides.length])

  useEffect(() => {
    if (!printing) window.history.replaceState(null, '', `#/${index + 1}`)
  }, [index])

  useEffect(() => {
    const onHash = () => setIndex(slideFromHash(slides.length))
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) go(index + 1)
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) go(index - 1)
      else if (event.key === 'Home') go(0)
      else if (event.key === 'End') go(slides.length - 1)
      else if (event.key === 'f') void (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())
      else return
      event.preventDefault()
    }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('keydown', onKey)
    }
  }, [go, index, slides.length])

  useLayoutEffect(() => {
    const el = viewport.current
    if (!el) return
    const fit = () => setScale(Math.min(el.clientWidth / SLIDE_WIDTH, el.clientHeight / SLIDE_HEIGHT))
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (printing) {
    return (
      <>
        <style>{`@page { size: ${SLIDE_WIDTH}px ${SLIDE_HEIGHT}px; margin: 0 } body { margin: 0 }`}</style>
        {slides.map((Current, i) => (
          <section key={i} style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT, breakAfter: 'page', overflow: 'hidden' }}>
            <Current />
          </section>
        ))}
      </>
    )
  }

  const Current = slides[index]!
  return (
    <div
      ref={viewport}
      className="relative flex h-svh w-full select-none items-center justify-center overflow-hidden bg-black"
      onClick={(event) => go(event.clientX > window.innerWidth / 2 ? index + 1 : index - 1)}
    >
      <section
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} of ${slides.length}`}
        className="shrink-0 overflow-hidden"
        style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT, transform: `scale(${scale})` }}
      >
        <Current />
      </section>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/10">
        <div className="h-full bg-white/60 transition-[width] duration-300" style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
      </div>
    </div>
  )
}
