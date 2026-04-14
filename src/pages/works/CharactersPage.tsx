import { useParams, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { WORLDS } from '@/constants'
import { useWorldTheme } from '@/hooks/useWorldTheme'
import type { WorldId } from '@/types'
import characters from '@/data/characters.json'

export default function CharactersPage() {
  const { worldId }    = useParams<{ worldId: string }>()
  const currentWorld   = WORLDS.find(w => w.id === worldId) ?? WORLDS[0]
  useWorldTheme(currentWorld.id as WorldId)

  const worldChars = characters.filter(c => c.worldId === currentWorld.id)

  return (
    <div>
      {/* 세계관 탭 */}
      <div className="flex gap-2 mb-10 overflow-x-auto">
        {WORLDS.map(world => (
          <NavLink
            key={world.id}
            to={`/works/characters/${world.id}`}
            className={({ isActive }) =>
              `font-mono text-[11px] tracking-widest px-4 py-2 border transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-accent text-accent'
                  : 'border-[var(--color-border)] text-sub hover:border-[rgba(255,255,255,0.2)] hover:text-[#f0f0f0]'
              }`
            }
          >
            {world.name}
          </NavLink>
        ))}
      </div>

      {/* 세계관 소개 + 캐릭터 그리드
          AnimatePresence mode="sync": 이전 내용이 fade-out 하는 동안 새 내용이 fade-in
          key 변경(세계관 전환) 시 부드럽게 교차 전환 */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentWorld.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {/* 세계관 소개 */}
          <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
            <div className="flex items-baseline gap-4">
              <h3 className="font-serif text-2xl text-accent">{currentWorld.name}</h3>
              <span className="font-mono text-[10px] tracking-widest text-dim border border-[var(--color-border)] px-2 py-0.5">
                {currentWorld.artStyle}
              </span>
            </div>
            <p className="text-sub text-sm mt-2 max-w-lg">{currentWorld.description}</p>
          </div>

          {/* 캐릭터 그리드 */}
          {worldChars.length === 0 ? (
            <EmptyState worldName={currentWorld.name} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {worldChars.map((char, i) => (
                <CharacterCard key={char.id} char={char} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CharacterCard({ char, index }: { char: typeof characters[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-[var(--color-border)] hover:border-accent hover:glow-border transition-all duration-300"
    >
      {/* 이미지 영역 */}
      <div className="aspect-[3/4] bg-[var(--color-surface)] relative overflow-hidden">
        {char.imageSrc ? (
          <img
            src={char.imageSrc}
            alt={char.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            {/* 플레이스홀더 */}
            <div className="w-12 h-12 border border-[var(--color-border)] rounded-full flex items-center justify-center">
              <span className="font-mono text-xs text-dim">?</span>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-dim text-center px-4">
              이미지 준비 중
            </span>
          </div>
        )}
        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 정보 */}
      <div className="p-3 border-t border-[var(--color-border)]">
        <p className="font-mono text-[11px] tracking-wider text-[#f0f0f0] group-hover:text-accent transition-colors truncate">
          {char.name}
        </p>
        <p className="font-mono text-[9px] tracking-widest text-dim mt-0.5 truncate">
          {char.tools.join(' · ')}
        </p>
      </div>
    </motion.div>
  )
}

function EmptyState({ worldName }: { worldName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 flex flex-col items-center gap-4"
    >
      <div className="w-16 h-16 border border-[var(--color-border)] flex items-center justify-center relative">
        <span className="font-mono text-2xl text-dim">∅</span>
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent" />
      </div>
      <p className="font-mono text-[11px] tracking-[0.3em] text-dim uppercase">
        {worldName} — Preparing
      </p>
      <p className="text-sub text-xs text-center max-w-xs">
        이미지 파일을 WebP 포맷으로 준비하여 업로드하면<br />캐릭터 카드가 자동으로 표시됩니다.
      </p>
    </motion.div>
  )
}
