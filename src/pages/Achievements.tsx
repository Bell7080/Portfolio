import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import achievements from '@/data/achievements.json'

const CATEGORY_LABELS: Record<string, string> = {
  serial:        '연재',
  education:     '교육',
  collaboration: '협업',
  academic:      '학력',
}

export default function Achievements() {
  return (
    <section className="max-w-4xl mx-auto px-8 md:px-16 py-24">
      <SectionLabel number="06" label="Achievements" />

      <p className="text-sub text-sm mb-12 font-mono tracking-widest">
        — 외부 검증 · 경력 · 수료
      </p>

      <div className="space-y-3">
        {achievements.map((item, i) => (
          <AchievementRow key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

function AchievementRow({ item, index }: { item: typeof achievements[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group flex gap-5 p-5 border border-[var(--color-border)] hover:border-accent transition-all relative"
    >
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* 아이콘 */}
      <div className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center shrink-0 text-lg group-hover:border-accent transition-colors">
        {item.icon}
      </div>

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-sm text-[#f0f0f0] group-hover:text-accent transition-colors leading-snug">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[9px] tracking-widest text-dim border border-[var(--color-border)] px-1.5 py-0.5">
              {CATEGORY_LABELS[item.category] ?? item.category}
            </span>
            <span className="font-mono text-[10px] text-dim">{item.date}</span>
          </div>
        </div>
        <p className="text-sub text-xs leading-relaxed">{item.description}</p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-[10px] tracking-widest text-accent mt-2 hover:underline"
          >
            자세히 보기 →
          </a>
        )}
      </div>
    </motion.div>
  )
}
