/**
 * SVG feTurbulence 기반 노이즈 그레인 오버레이.
 * 고급 다크 UI의 표준 텍스처 레이어.
 */
export default function NoiseBg() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        pointerEvents: 'none',
        opacity: 0.032,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px',
      }}
    />
  )
}
