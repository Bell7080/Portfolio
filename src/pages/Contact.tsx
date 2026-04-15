import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto px-8 md:px-16 py-24">
      <SectionLabel number="07" label="Contact" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center py-24 gap-6 text-center"
      >
        {/* 아이콘 */}
        <div className="relative w-20 h-20">
          <div className="w-full h-full border border-[var(--color-border)] flex items-center justify-center">
            <span className="font-serif text-3xl text-dim">✉</span>
          </div>
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase">개발 중</p>
          <p className="font-serif text-2xl text-white">Contact</p>
          <p className="text-sub text-sm max-w-xs">
            문의 폼을 준비하고 있습니다.<br />현재는 GitHub로 연락 부탁드립니다.
          </p>
        </div>

        <a
          href="https://github.com/bell7080"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-widest px-6 py-3 border border-[var(--color-border)] text-sub hover:border-accent hover:text-accent transition-colors"
        >
          GitHub →
        </a>
      </motion.div>
    </section>
  )
}
