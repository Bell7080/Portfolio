import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const rafId   = useRef<number>(0)
  const visible = useRef(false)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    /* ── 마우스 이동 ── */
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        dot.style.opacity  = '1'
        rng.style.opacity  = '1'
        // 첫 진입 시 ring 위치도 초기화해서 날아오는 느낌 제거
        ring.current = { x: e.clientX, y: e.clientY }
      }
    }

    /* ── 창 이탈 / 재진입 ── */
    const onLeave = () => {
      visible.current = false
      dot.style.opacity = '0'
      rng.style.opacity = '0'
    }
    const onEnter = () => {
      /* onMove에서 처리 */
    }

    /* ── hover 감지: 이벤트 위임 (동적 요소 포함) ── */
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        rng.classList.add('hovering')
        dot.style.transform = 'translate(-50%, -50%) scale(1.8)'
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        rng.classList.remove('hovering')
        dot.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }

    /* ── 클릭 피드백 ── */
    const onDown = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(0.5)'
      rng.style.transform = 'translate(-50%, -50%) scale(0.75)'
    }
    const onUp = () => {
      const isHover = (document.querySelector(':hover') as Element)?.closest(INTERACTIVE)
      dot.style.transform = isHover
        ? 'translate(-50%, -50%) scale(1.8)'
        : 'translate(-50%, -50%) scale(1)'
      rng.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    /* ── RAF: dot 즉시 이동, ring lerp 추적 ── */
    const animate = () => {
      dot.style.left = `${pos.current.x}px`
      dot.style.top  = `${pos.current.y}px`

      // lerp 0.22 → 적당한 끌림감
      ring.current.x += (pos.current.x - ring.current.x) * 0.22
      ring.current.y += (pos.current.y - ring.current.y) * 0.22
      rng.style.left = `${ring.current.x}px`
      rng.style.top  = `${ring.current.y}px`

      rafId.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove',  onMove,   { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover',  onOver,   { passive: true })
    document.addEventListener('mouseout',   onOut,    { passive: true })
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  aria-hidden style={{ opacity: 0 }} />
      <div id="cursor-ring" ref={ringRef} aria-hidden style={{ opacity: 0 }} />
    </>
  )
}
