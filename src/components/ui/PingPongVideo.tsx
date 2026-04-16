import { useEffect, useRef } from 'react'

/**
 * 정재생 → 역재생 → 정재생 핑퐁 루프 비디오.
 * 영상 끝에서 끊기는 점프 없이 매끄럽게 무한 반복됩니다.
 */
interface Props {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default function PingPongVideo({ src, className, style }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let dir: 1 | -1 = 1
    let lastT = 0
    let rafId = 0
    let ready = false

    const tick = (now: number) => {
      if (!ready || !video.duration) {
        rafId = requestAnimationFrame(tick)
        return
      }

      // 탭 비활성 등으로 dt가 너무 크면 최대 50ms로 제한
      const dt = Math.min((now - lastT) / 1000, 0.05)
      lastT = now

      const dur = video.duration
      // 경계에서 1프레임(≈0.034s @30fps) 여유를 두고 방향 전환
      const margin = 0.034
      let next = video.currentTime + dir * dt

      if (next >= dur - margin) {
        dir = -1
        next = dur - margin
      } else if (next <= margin) {
        dir = 1
        next = margin
      }

      video.currentTime = next
      rafId = requestAnimationFrame(tick)
    }

    const start = () => {
      ready = true
      video.pause()
      video.currentTime = 0
      lastT = performance.now()
    }

    // 이미 메타데이터가 로드된 경우 즉시 시작
    if (video.readyState >= 1) {
      start()
    } else {
      video.addEventListener('loadedmetadata', start, { once: true })
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      ready = false
      video.removeEventListener('loadedmetadata', start)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      className={className}
      style={style}
    />
  )
}
