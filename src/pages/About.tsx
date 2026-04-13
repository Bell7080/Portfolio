import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-4xl md:text-5xl mb-12"
      >
        About
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6 text-text-sub leading-relaxed"
      >
        <p className="text-text text-xl font-light">
          세계관을 설계하고, AI로 시각화하고, 코드로 완성합니다.
        </p>
        <p>
          AI 아트 디렉터로서 다양한 세계관의 캐릭터와 배경을 기획하고 제작합니다.
          단순한 이미지 생성을 넘어, 세계관의 맥락과 캐릭터의 서사를 설계하는 것이 핵심 역량입니다.
        </p>
        <p>
          바이브 코딩으로 아이디어를 직접 구현합니다.
          기획에서 실제 작동하는 결과물까지, AI와 협업하여 빠르게 만들어냅니다.
        </p>

        {/* Open to Work 뱃지 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent text-sm tracking-wider mt-4">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Open to Work
        </div>
      </motion.div>
    </section>
  )
}
