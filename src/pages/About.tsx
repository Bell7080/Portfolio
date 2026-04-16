import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

// CountUp은 데이터 채워지면 활성화 예정
const PROFILE_ITEMS = [
  { label: 'POSITION', value: 'AI Art Director / Content Creator / Vibe Coder' },
  { label: 'STATUS', value: 'Open to Work ●' },
  { label: 'SPECIALTY', value: '세계관 설계 · 캐릭터 기획 · AI 아트 디렉팅' },
  { label: 'TOOLS', value: 'Midjourney · Runway · CapCut · Cursor · Claude' },
]


export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="max-w-5xl mx-auto px-8 md:px-16 py-24">
      <SectionLabel number="01" label="About" />

      <div ref={ref} className="grid md:grid-cols-2 gap-16 items-start">

        {/* 왼쪽: 대형 인용구 */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote className="font-serif text-2xl md:text-3xl leading-[1.5] mb-10 relative">
            <span className="text-accent text-6xl font-serif leading-none absolute -top-4 -left-4 opacity-30">"</span>
            세계관을 설계하고,<br />
            AI로 시각화하고,<br />
            <span className="text-accent">코드로 완성합니다.</span>
          </blockquote>

          <p className="text-sub leading-relaxed mb-6">
            단순한 이미지 생성을 넘어, 세계관의 맥락과 캐릭터의 서사를 기획하는 것이 핵심 역량입니다.
            스토리텔링에서 시각화까지, AI를 도구로 삼아 완성도 높은 크리에이티브를 만들어냅니다.
          </p>
          <p className="text-sub leading-relaxed">
            바이브 코딩으로 아이디어를 직접 구현합니다.
            기획에서 실제 작동하는 결과물까지, AI와 협업해 빠르게 만들어냅니다.
          </p>

          {/* Open to Work 뱃지 */}
          <div className="mt-8 inline-flex items-center gap-2 border border-accent px-4 py-2 font-mono text-xs tracking-widest text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pulse 2s infinite' }} />
            Currently Available
          </div>
        </motion.div>

        {/* 오른쪽: 프로필 그리드 */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-0"
        >
          {PROFILE_ITEMS.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="py-4 border-b border-[var(--color-border)] grid grid-cols-[100px_1fr] gap-4 items-baseline"
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase shrink-0">
                {label}
              </span>
              <span className={`text-sm leading-relaxed ${label === 'STATUS' ? 'text-accent' : 'text-[#f0f0f0]'}`}>
                {value}
              </span>
            </motion.div>
          ))}

          {/* 미니 스탯 */}
          <div className="pt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { n: 3, suffix: '', label: '세계관' },
              { n: 10, suffix: '+', label: 'AI 툴' },
              { n: 3, suffix: '년+', label: '경력' },
            ].map(({ n, suffix, label }) => (
              <div key={label} className="p-4 border border-[var(--color-border)]">
                <div className="font-mono text-2xl text-accent font-bold">
                  {n}{suffix}
                </div>
                <div className="font-mono text-[10px] tracking-widest text-dim mt-1 uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
