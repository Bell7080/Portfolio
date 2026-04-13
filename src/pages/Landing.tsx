import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function FadeUp({ delay, children, className }: { delay: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Landing() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 5%, transparent), transparent 70%)' }} />

      <FadeUp delay={0} className="text-text-sub text-xs tracking-[0.4em] uppercase mb-6">
        AI Art Director · Content Creator · Vibe Coder
      </FadeUp>

      <FadeUp delay={0.15}>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
          기획하고,<br />
          <span className="text-accent">그리고,</span><br />
          만든다
        </h1>
      </FadeUp>

      <FadeUp delay={0.3} className="text-text-sub text-lg md:text-xl mb-12 max-w-md">
        AI와 함께 — 스토리텔링 × 비주얼 × 실행력
      </FadeUp>

      <FadeUp delay={0.45}>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/works/characters/심해"
            className="px-8 py-3 border border-accent text-accent text-sm tracking-wider hover:bg-accent hover:text-bg transition-colors"
          >
            Works 보기
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white/20 text-text-sub text-sm tracking-wider hover:border-white/60 hover:text-text transition-colors"
          >
            연락하기
          </Link>
        </div>
      </FadeUp>

      {/* 스크롤 화살표 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-sub text-xs tracking-widest"
      >
        <span>SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="block w-px h-8 bg-text-sub/40"
        />
      </motion.div>
    </section>
  )
}
