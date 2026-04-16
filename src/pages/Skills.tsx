import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

const SKILL_GROUPS = [
  {
    category: 'CREATIVE',
    skills: [
      { label: 'AI 아트 디렉팅', level: 90, tag: 'CORE' },
      { label: '세계관 설계', level: 88, tag: 'CORE' },
      { label: '캐릭터 기획·설정', level: 85, tag: '' },
      { label: '스토리텔링', level: 87, tag: '' },
    ],
  },
  {
    category: 'TECHNICAL',
    skills: [
      { label: '바이브 코딩', level: 75, tag: '' },
      { label: 'AI 프롬프트 엔지니어링', level: 92, tag: 'CORE' },
      { label: '콘텐츠 기획', level: 82, tag: '' },
    ],
  },
]

const TOOL_TAGS = [
  'Midjourney', 'Runway', 'Sora', 'CapCut',
  'Claude', 'Cursor', 'Blender', 'Figma',
  'Stable Diffusion', 'ChatGPT',
]

interface SkillBarProps {
  label: string
  level: number
  tag: string
  delay: number
}

function SkillBar({ label, level, tag, delay }: SkillBarProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#f0f0f0] group-hover:text-accent transition-colors duration-200">
            {label}
          </span>
          {tag && (
            <span className="font-mono text-[9px] tracking-widest text-accent border border-accent px-1.5 py-0.5">
              {tag}
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-dim">{level}</span>
      </div>
      <div className="h-px bg-[var(--color-border)] relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const toolRef  = useRef<HTMLDivElement>(null)
  const toolView = useInView(toolRef, { once: true })

  return (
    <section className="max-w-4xl mx-auto px-8 md:px-16 py-24">
      <SectionLabel number="02" label="Skills" />

      {/* RPG 스탯 패널 */}
      <div className="mb-16 border border-[var(--color-border)] p-6 md:p-10 relative">
        {/* 코너 장식 */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent" />

        <div className="font-mono text-[10px] tracking-[0.4em] text-dim mb-8">
          — STATUS PANEL —
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {SKILL_GROUPS.map(({ category, skills }) => (
            <div key={category}>
              <div className="font-mono text-[10px] tracking-[0.35em] text-accent mb-5">
                {category}
              </div>
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <SkillBar
                    key={skill.label}
                    {...skill}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 툴 태그 클라우드 */}
      <div ref={toolRef}>
        <div className="font-mono text-[10px] tracking-[0.35em] text-dim mb-5">
          — TOOLS & STACK —
        </div>
        <div className="flex flex-wrap gap-2">
          {TOOL_TAGS.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={toolView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="font-mono text-xs px-3 py-1.5 border border-[var(--color-border)] text-sub hover:border-accent hover:text-accent transition-colors"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
