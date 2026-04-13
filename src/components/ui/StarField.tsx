import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  twinkleOffset: number
}

/**
 * Canvas 기반 별빛 배경.
 * 너무 강하지 않게 — 소수의 작은 별, 낮은 opacity.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 14000)
      stars = Array.from({ length: count }, () => ({
        x:             Math.random() * canvas.width,
        y:             Math.random() * canvas.height,
        r:             Math.random() * 0.9 + 0.2,
        opacity:       Math.random() * 0.4 + 0.1,
        speed:         Math.random() * 0.006 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      for (const s of stars) {
        const twinkle = Math.sin(t * s.speed * 60 + s.twinkleOffset) * 0.15
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, s.opacity + twinkle)})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.65,
      }}
    />
  )
}
