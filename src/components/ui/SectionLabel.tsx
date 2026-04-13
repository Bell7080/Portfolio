interface Props {
  number: string   // "01"
  label: string    // "ABOUT"
  className?: string
}

export default function SectionLabel({ number, label, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 mb-10 ${className}`}>
      <span className="font-mono text-xs text-dim">{number}</span>
      <span className="flex-1 h-px bg-[var(--color-border)]" />
      <span className="font-mono text-xs tracking-[0.3em] text-sub uppercase">{label}</span>
    </div>
  )
}
