import { motion } from 'framer-motion'
import achievements from '@/data/achievements.json'

export default function Achievements() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-4xl md:text-5xl mb-12"
      >
        Achievements
      </motion.h2>

      <div className="space-y-6">
        {achievements.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-5 p-5 border border-white/10 hover:border-accent transition-colors group"
          >
            <div className="text-3xl flex-shrink-0">{item.icon}</div>
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <h3 className="text-sm font-medium group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs text-text-sub">{item.date}</span>
              </div>
              <p className="text-text-sub text-sm">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent mt-2 inline-block hover:underline"
                >
                  자세히 보기 →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
