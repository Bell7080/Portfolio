import { useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { WORLDS } from '@/constants'
import { useWorldTheme } from '@/hooks/useWorldTheme'
import CharacterModal from '@/components/character/CharacterModal'
import ImageLightbox from '@/components/ui/ImageLightbox'
import { asset } from '@/utils/asset'
import type { WorldId, Character } from '@/types'
import characters from '@/data/characters.json'
import worldsData from '@/data/worlds.json'

export default function CharactersPage() {
  const { worldId }   = useParams<{ worldId: string }>()
  const currentWorld  = WORLDS.find(w => w.id === worldId) ?? WORLDS[0]
  const currentWData  = worldsData.find(w => w.id === currentWorld.id)
  useWorldTheme(currentWorld.id as WorldId)

  const worldChars = characters.filter(c => c.worldId === currentWorld.id) as Character[]

  const [selectedChar, setSelectedChar]       = useState<Character | null>(null)
  const [storyOpen, setStoryOpen]             = useState(false)
  const [galleryLightbox, setGalleryLightbox] = useState<string | null>(null)

  return (
    <div>
      {/* ── 세계관 탭 ─────────────────────────────────────── */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
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

      {/* ── 세계관별 콘텐츠 (AnimatePresence로 교차 fade) ─── */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentWorld.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {/* ── 세계관 헤더 (컴팩트) ─────────────────────── */}
          <div className="mb-8 pb-5 border-b border-[var(--color-border)]">

            {/* 1. 세계관 이름 */}
            <h3 className="font-serif text-3xl text-accent mb-3">{currentWorld.name}</h3>

            {/* 2. 태그 */}
            {currentWData?.tags && currentWData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {currentWData.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-xs tracking-widest px-2.5 py-0.5"
                    style={{
                      color: 'color-mix(in srgb, var(--accent) 90%, white)',
                      border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)',
                      background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 3. 아트스타일 */}
            <p className="font-mono text-xs tracking-widest text-sub mb-4">
              {currentWData?.artStyle ?? currentWorld.artStyle}
            </p>

            {/* 4. 세계관 스토리 토글 버튼 */}
            {(currentWData?.synopsis || currentWData?.conceptNote) && (
              <button
                onClick={() => setStoryOpen(v => !v)}
                className="group flex items-center gap-2.5 px-4 py-2 border transition-all duration-200"
                style={{
                  borderColor: storyOpen
                    ? 'color-mix(in srgb, var(--accent) 60%, transparent)'
                    : 'color-mix(in srgb, var(--accent) 30%, transparent)',
                  background: storyOpen
                    ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                    : 'transparent',
                }}
              >
                <span
                  className="font-mono text-xs tracking-widest transition-colors"
                  style={{ color: 'color-mix(in srgb, var(--accent) 80%, white)' }}
                >
                  ✦ 세계관 스토리 · 기획노트
                </span>
                <span
                  className="font-mono text-xs transition-transform duration-200"
                  style={{
                    color: 'color-mix(in srgb, var(--accent) 60%, white)',
                    display: 'inline-block',
                    transform: storyOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                >
                  →
                </span>
              </button>
            )}

            {/* 5. 스토리 패널 (접힘/펼침) */}
            <AnimatePresence>
              {storyOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 flex flex-col gap-4">
                    {currentWData?.synopsis && (
                      <div>
                        <p className="font-mono text-xs tracking-[0.3em] text-dim uppercase mb-2">Synopsis</p>
                        <p className="text-sub text-base leading-relaxed whitespace-pre-line">{currentWData.synopsis}</p>
                      </div>
                    )}
                    {currentWData?.conceptNote && (
                      <div
                        className="pl-4 border-l-2"
                        style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}
                      >
                        <p className="font-mono text-xs tracking-widest text-dim uppercase mb-1">Concept Note</p>
                        <p className="text-sub text-sm leading-relaxed">{currentWData.conceptNote}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── 캐릭터 그리드 ──────────────────────────── */}
          <div className="mb-14">
            <p className="font-mono text-xs tracking-[0.3em] text-dim uppercase mb-6">
              Characters
              <span className="ml-3 text-dim/40">{worldChars.length > 0 ? `${worldChars.length}` : '—'}</span>
            </p>

            {worldChars.length === 0 ? (
              <EmptyCharacters worldName={currentWorld.name} />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {worldChars.map((char, i) => (
                  <CharacterCard
                    key={char.id}
                    char={char}
                    index={i}
                    onClick={() => setSelectedChar(char)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── 세계관 갤러리 (캐릭터 외 이미지) ───────── */}
          {currentWData?.extraImages && currentWData.extraImages.length > 0 && (
            <div className="border-t border-[var(--color-border)] pt-10">
              <p className="font-mono text-xs tracking-[0.3em] text-dim uppercase mb-2">세계관 갤러리</p>
              <p className="text-sub text-sm mb-6">캐릭터로 만들지 않았지만 같은 세계관에서 출력한 이미지들</p>
              <div className="flex gap-3 overflow-x-auto pb-4">
                {currentWData.extraImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryLightbox(src)}
                    className="flex-shrink-0 w-44 aspect-[3/4] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden group cursor-zoom-in"
                  >
                    <img
                      src={asset(src)}
                      alt={`world-extra-${i}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 세계관 갤러리 플레이스홀더 (이미지 아직 없을 때) */}
          {(!currentWData?.extraImages || currentWData.extraImages.length === 0) && (
            <div className="border-t border-[var(--color-border)] pt-10">
              <p className="font-mono text-xs tracking-[0.3em] text-dim uppercase mb-2">세계관 갤러리</p>
              <p className="text-sub text-sm mb-5">캐릭터로 만들지 않았지만 같은 세계관에서 출력한 이미지들</p>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-44 aspect-[3/4] border border-dashed border-[var(--color-border)] flex items-center justify-center"
                  >
                    <span className="font-mono text-xs text-dim/40 tracking-widest">준비 중</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── 캐릭터 상세 모달 ─────────────────────────────── */}
      <CharacterModal char={selectedChar} onClose={() => setSelectedChar(null)} />
      <ImageLightbox src={galleryLightbox} onClose={() => setGalleryLightbox(null)} />
    </div>
  )
}

/* ── 캐릭터 카드 ───────────────────────────────────────────── */

function CharacterCard({
  char, index, onClick
}: { char: Character; index: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
      onClick={onClick}
      className="group text-left border border-[var(--color-border)] hover:border-accent transition-all duration-300 w-full"
    >
      {/* 이미지/영상 영역 */}
      <div className="aspect-[3/4] bg-[var(--color-surface)] relative overflow-hidden">
        {char.videoSrc ? (
          <video
            src={asset(char.videoSrc)}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : char.imageSrc ? (
          <img
            src={asset(char.imageSrc)}
            alt={char.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <PlaceholderThumb />
        )}

        {/* 변천사 있으면 개수 뱃지 */}
        {char.versions && char.versions.length > 0 && (
          <div className="absolute top-2 right-2 font-mono text-xs tracking-wider px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(13,13,13,0.85)', color: 'var(--accent)', border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)' }}>
            v{char.versions.length}
          </div>
        )}

        {/* hover 오버레이 + 클릭 힌트 */}
        <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 60%)' }}>
          <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">자세히 보기</span>
        </div>
      </div>

      {/* 정보 */}
      <div className="p-3 border-t border-[var(--color-border)]">
        <p className="font-mono text-sm tracking-wider text-[#f0f0f0] group-hover:text-accent transition-colors truncate">
          {char.name}
        </p>
        {char.role && (
          <p className="font-mono text-xs tracking-widest text-dim mt-0.5 truncate">{char.role}</p>
        )}
        <p className="font-mono text-xs tracking-widest text-dim/60 mt-1 truncate">
          {char.tools.join(' · ')}
        </p>
      </div>
    </motion.button>
  )
}

/* ── 플레이스홀더 썸네일 ───────────────────────────────────── */

function PlaceholderThumb() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="relative w-10 h-10">
        <div className="w-full h-full border border-[var(--color-border)] flex items-center justify-center">
          <span className="font-mono text-sm text-dim">?</span>
        </div>
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: 'var(--accent)' }} />
      </div>
      <span className="font-mono text-[8px] tracking-widest text-dim text-center px-4">이미지 준비 중</span>
    </div>
  )
}

/* ── 빈 상태 ─────────────────────────────────────────────── */

function EmptyCharacters({ worldName }: { worldName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 flex flex-col items-center gap-4"
    >
      <div className="relative w-16 h-16 border border-[var(--color-border)] flex items-center justify-center">
        <span className="font-mono text-2xl text-dim">∅</span>
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: 'var(--accent)' }} />
      </div>
      <p className="font-mono text-[11px] tracking-[0.3em] text-dim uppercase">{worldName} — Preparing</p>
      <p className="text-sub text-xs text-center max-w-xs">
        이미지를 WebP 포맷으로, 영상을 WebM 포맷으로 준비하면<br />캐릭터 카드가 자동으로 표시됩니다.
      </p>
    </motion.div>
  )
}
