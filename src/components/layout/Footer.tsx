import MarqueeText from '@/components/ui/MarqueeText'

const FOOTER_ITEMS = [
  'AI Art Director',
  'Worldbuilding',
  'Character Design',
  'Vibe Coder',
  'Content Creator',
  'Storyteller',
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="py-2.5 border-b border-[var(--color-border)]">
        <MarqueeText items={FOOTER_ITEMS} separator="—" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-5 gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-dim">
          © 2026 · PORTFOLIO
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-dim">
          기획하고, 그리고, 만든다 — AI와 함께
        </span>
      </div>
    </footer>
  )
}
