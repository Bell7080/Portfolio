import { motion } from 'framer-motion'

const SKILLS = [
  { label: 'AI 아트 디렉팅', level: 90 },
  { label: '캐릭터 기획·설정', level: 85 },
  { label: '스토리텔링', level: 88 },
  { label: '세계관 설계', level: 85 },
  { label: '바이브 코딩', level: 75 },
  { label: '콘텐츠 기획', level: 82 },
]

export default function Skills() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-4xl md:text-5xl mb-12"
      >
        Skills
      </motion.h2>

      <div className="space-y-8">
        {SKILLS.map(({ label, level }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm tracking-wider">{label}</span>
              <span className="text-xs text-text-sub">{level}</span>
            </div>
            <div className="h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
