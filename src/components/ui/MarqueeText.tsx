interface Props {
  items: string[]
  separator?: string
  className?: string
  /** px/s 기준 속도 (기본 40) */
  speed?: number
}

export default function MarqueeText({ items, separator = '·', className = '' }: Props) {
  const text = items.join(` ${separator} `) + ` ${separator} `

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <span className="marquee-track font-mono text-xs tracking-[0.25em] text-sub select-none">
        {/* 두 번 반복해서 끊김 없이 루프 */}
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </span>
    </div>
  )
}
