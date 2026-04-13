import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafId   = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => ringRef.current?.classList.add('hovering')
    const onLeave = () => ringRef.current?.classList.remove('hovering')

    const animate = () => {
      // dot: snappy
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`
        dotRef.current.style.top  = `${pos.current.y}px`
      }
      // ring: lerp for smooth follow
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top  = `${ring.current.y}px`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)

    // interactive 요소에 hover 반응
    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addHover()

    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  aria-hidden />
      <div id="cursor-ring" ref={ringRef} aria-hidden />
    </>
  )
}
