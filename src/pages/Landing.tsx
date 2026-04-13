import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import MarqueeText from '@/components/ui/MarqueeText'

const MARQUEE_ITEMS = [
  'AI Art Director',
  'Character Design',
  'Worldbuilding',
  'Concept Creation',
  'Vibe Coding',
  'Storytelling',
  'AI Prompt Engineering',
  'Content Direction',
]

const STATS = [
  { value: '03', label: 'Worlds' },
  { value: '5+', label: 'AI Tools' },
  { value: '∞', label: 'Ideas' },
]

/** 단어 하나씩 순차 등장 */
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * 0.09,
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Landing() {
  const statsRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(statsRef, { once: true, margin: '-40px' })

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 배경 그리드 */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* 성운 빛 — 우측 상단에 은은하게 */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          right: '-5%',
          width: '55vw',
          height: '55vw',
          background: 'radial-gradient(ellipse at center, var(--accent-glow), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {/* 성운 빛 — 좌측 하단 보조 */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: '-8%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.025), transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 세로 중앙 메인 */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20 pb-10">

        {/* 상단 레이블 */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-3 mb-10 md:mb-14"
        >
          <span className="font-mono text-xs text-dim">00</span>
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <span className="font-mono text-xs tracking-[0.35em] text-sub uppercase">
            AI Art Director · 2026
          </span>
          {/* Open to Work 점멸 뱃지 */}
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pulse 2s infinite' }} />
            Open to Work
          </span>
        </motion.div>

        {/* 메인 헤딩 */}
        <div className="mb-10 md:mb-14">
          <h1 className="font-serif leading-[0.95] tracking-tight">
            <div className="text-[clamp(3.5rem,10vw,8rem)] text-[#f0f0f0]">
              <WordReveal text="기획하고," delay={0.3} />
            </div>
            <div className="text-[clamp(3.5rem,10vw,8rem)] text-accent glow-text">
              <WordReveal text="그리고," delay={0.52} />
            </div>
            <div className="text-[clamp(3.5rem,10vw,8rem)] text-[#f0f0f0]">
              <WordReveal text="만든다." delay={0.74} />
            </div>
          </h1>
        </div>

        {/* 서브카피 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-sub text-base md:text-lg mb-12 max-w-sm leading-relaxed"
        >
          AI와 함께 —<br />
          스토리텔링 × 비주얼 × 실행력
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.5 }}
          className="flex gap-4 flex-wrap"
        >
          <Link
            to="/works/characters/심해"
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 border border-accent text-accent font-mono text-xs tracking-widest overflow-hidden transition-colors hover:text-[#0d0d0d]"
          >
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative">Works 보기</span>
            <span className="relative">→</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 border border-[var(--color-border)] text-sub font-mono text-xs tracking-widest hover:border-[rgba(255,255,255,0.2)] hover:text-[#f0f0f0] transition-colors"
          >
            연락하기
          </Link>
        </motion.div>
      </div>

      {/* 스탯 바 */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="border-t border-[var(--color-border)] grid grid-cols-3 divide-x divide-[var(--color-border)]"
      >
        {STATS.map(({ value, label }) => (
          <div key={label} className="py-5 px-8 flex flex-col items-center gap-1">
            <span className="font-mono text-2xl md:text-3xl text-accent font-bold tracking-tight">
              {value}
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-dim uppercase">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* 마퀴 */}
      <div className="border-t border-[var(--color-border)] py-3">
        <MarqueeText items={MARQUEE_ITEMS} />
      </div>
    </section>
  )
}
