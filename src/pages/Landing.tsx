import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MarqueeText from '@/components/ui/MarqueeText'
import worlds from '@/data/worlds.json'
import characters from '@/data/characters.json'
import { asset } from '@/utils/asset'

const MARQUEE_ITEMS = [
  'AI Art Director', 'Character Design', 'Worldbuilding',
  'Concept Creation', 'Vibe Coding', 'Storytelling',
  'AI Prompt Engineering', 'Content Direction',
]

const STATS = [
  { value: '03', label: 'Worlds' },
  { value: '10+', label: 'AI Tools' },
  { value: '∞', label: 'Ideas' },
]

/* ── 세계관 쇼케이스 카드 ───────────────────────────── */
function WorldCard({
  world,
  layoutClass,
  delay,
  interval = 4200,
}: {
  world: typeof worlds[0]
  layoutClass: string
  delay: number
  interval?: number
}) {
  const chars = characters.filter(c => c.worldId === world.id)
  const [idx, setIdx] = useState(0)

  // 캐릭터 2명 이상일 때만 자동 순환
  useEffect(() => {
    if (chars.length <= 1) return
    const id = setInterval(() => setIdx(i => (i + 1) % chars.length), interval)
    return () => clearInterval(id)
  }, [chars.length, interval])

  const char = chars[idx] ?? null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden border border-[rgba(255,255,255,0.07)] group ${layoutClass}`}
      style={{ '--card-accent': world.accent, '--card-glow': `${world.accent}22` } as React.CSSProperties}
    >
      {/* ── 슬라이딩 미디어 레이어 ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-105%' }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          {char?.videoSrc ? (
            <video
              src={asset(char.videoSrc)}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ objectPosition: 'center 20%' }}
            />
          ) : char?.imageSrc ? (
            <img
              src={asset(char.imageSrc)}
              alt={char.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ objectPosition: 'center 20%' }}
            />
          ) : (
            <PlaceholderVisual world={world} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* 항상 있는 그라디언트 오버레이 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.45) 40%, transparent 100%)` }}
      />

      {/* hover 시 사이드 glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px ${world.accent}28` }}
      />

      {/* 텍스트 오버레이 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] mb-1.5 opacity-70"
               style={{ color: world.accent }}>
              {world.artStyle.toUpperCase()}
            </p>
            <h3 className="font-serif text-lg md:text-xl text-white leading-none">
              {world.name}
            </h3>
          </div>
          <Link
            to={`/works/characters/${world.id}`}
            className="shrink-0 font-mono text-[10px] tracking-widest px-3 py-1.5 border opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            style={{ borderColor: world.accent, color: world.accent }}
          >
            VIEW →
          </Link>
        </div>

        {/* 캐릭터 인디케이터 (2명 이상일 때만) */}
        {chars.length > 1 && (
          <div className="flex gap-1 mt-2.5">
            {chars.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="h-px transition-all duration-300"
                style={{
                  width: i === idx ? '18px' : '6px',
                  background: i === idx ? world.accent : `${world.accent}40`,
                }}
                aria-label={`캐릭터 ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 코너 액센트 (hover) */}
      <span className="absolute top-3 right-3 w-3 h-3 border-t border-r z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderColor: world.accent }} />
    </motion.div>
  )
}

/* ── 이미지 없을 때 플레이스홀더 ──────────────────────── */
function PlaceholderVisual({ world }: { world: typeof worlds[0] }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center"
         style={{ background: `radial-gradient(ellipse at 60% 40%, ${world.accent}18 0%, #0d0d0d 70%)` }}>
      <span
        className="absolute font-serif text-[clamp(4rem,12vw,9rem)] font-bold select-none pointer-events-none opacity-[0.06] leading-none"
        style={{ color: world.accent }}
      >
        {world.name}
      </span>
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-12 h-12 border flex items-center justify-center"
             style={{ borderColor: `${world.accent}50` }}>
          <span className="font-mono text-lg opacity-40" style={{ color: world.accent }}>∅</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.3em] opacity-40" style={{ color: world.accent }}>
          PREPARING
        </span>
      </div>
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `linear-gradient(${world.accent}15 1px, transparent 1px), linear-gradient(90deg, ${world.accent}15 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
           }} />
    </div>
  )
}

/* ── 좌측 히어로 배경 슬라이드쇼 ─────────────────────── */
const ALL_CHARS = characters.filter(c => c.imageSrc || c.videoSrc)

function HeroBg() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (ALL_CHARS.length <= 1) return
    const id = setInterval(() => setIdx(i => (i + 1) % ALL_CHARS.length), 5500)
    return () => clearInterval(id)
  }, [])

  const char = ALL_CHARS[idx]
  if (!char) return null

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={idx}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      >
        {char.videoSrc ? (
          <video
            src={asset(char.videoSrc)}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 15%', opacity: 0.18 }}
          />
        ) : (
          <img
            src={asset(char.imageSrc!)}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 15%', opacity: 0.18 }}
          />
        )}
        {/* 텍스트 가독성 보호 그라디언트 */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.82) 35%, rgba(13,13,13,0.55) 100%)' }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

/* ── 메인 랜딩 ────────────────────────────────────────── */
export default function Landing() {
  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 3.5rem)' }}>

      {/* ── 히어로: 좌우 분할 ──────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[38%_1fr] min-h-0">

        {/* 왼쪽: 아이덴티티 */}
        <div className="relative flex flex-col justify-between px-8 md:px-12 py-10 md:py-14 border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.07)] overflow-hidden">
          <HeroBg />

          {/* 상단 레이블 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative z-10 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                  style={{ animation: 'pulse 2s infinite' }} />
            <span className="font-mono text-[10px] tracking-[0.35em] text-[rgba(255,255,255,0.4)]">
              OPEN TO WORK
            </span>
          </motion.div>

          {/* 메인 타이틀 */}
          <div className="relative z-10 py-8 lg:py-0">
            {['상상을', '기획하고', '실현시킨다.'].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className={`font-serif leading-[1.0] tracking-tight ${
                    i === 1 ? 'text-accent' : 'text-[#f0f0f0]'
                  }`}
                  style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="font-mono text-[11px] tracking-[0.3em] text-[rgba(255,255,255,0.35)] mt-5"
            >
              AI × STORY × VISUAL × CODE
            </motion.p>
          </div>

          {/* 하단 CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="relative z-10 flex flex-col gap-3"
          >
            <div className="text-[rgba(255,255,255,0.35)] font-mono text-[10px] tracking-widest mb-1">
              AI Art Director / Content Creator / Vibe Coder
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                to="/works/characters/Neural-Rust"
                className="group relative inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)] font-mono text-xs tracking-widest text-accent overflow-hidden hover:text-[#0d0d0d] transition-colors"
              >
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative">Works 보기</span>
                <span className="relative">→</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-[rgba(255,255,255,0.12)] font-mono text-xs tracking-widest text-[rgba(255,255,255,0.4)] hover:border-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.8)] transition-colors"
              >
                연락하기
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 오른쪽: 세계관 쇼케이스 벤토 그리드 */}
        <div className="grid grid-cols-2 grid-rows-2 gap-px bg-[rgba(255,255,255,0.04)]"
             style={{ minHeight: 'clamp(360px, 55vh, 600px)' }}>
          {/* 왼쪽: 크게 (row 1~2 span) — 순환 간격 살짝 다르게 */}
          <WorldCard
            world={worlds[0]}
            layoutClass="row-span-2 col-span-1"
            delay={0.4}
            interval={4000}
          />
          {/* 오른쪽 상단 */}
          <WorldCard
            world={worlds[1]}
            layoutClass=""
            delay={0.5}
            interval={3800}
          />
          {/* 오른쪽 하단 */}
          <WorldCard
            world={worlds[2]}
            layoutClass=""
            delay={0.6}
            interval={4400}
          />
        </div>
      </div>

      {/* ── 스탯 바 ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="border-t border-[rgba(255,255,255,0.07)] grid grid-cols-3 divide-x divide-[rgba(255,255,255,0.07)]"
      >
        {STATS.map(({ value, label }) => (
          <div key={label} className="py-4 flex flex-col items-center gap-0.5">
            <span className="font-mono text-xl md:text-2xl text-accent font-bold">{value}</span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.25)] uppercase">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── 마퀴 ───────────────────────────────────────── */}
      <div className="border-t border-[rgba(255,255,255,0.07)] py-3">
        <MarqueeText items={MARQUEE_ITEMS} />
      </div>
    </div>
  )
}
