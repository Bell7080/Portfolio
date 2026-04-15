import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Character } from '@/types'
import { asset } from '@/utils/asset'

interface Props {
  char: Character | null
  onClose: () => void
}

export default function CharacterModal({ char, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    if (char) {
      document.body.style.overflow = 'hidden'
      scrollRef.current?.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [char])

  return (
    <AnimatePresence>
      {char && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.88)] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 모달 패널
              - inset-x-4 md:inset-x-[5vw]: 좌우 margin 보장 → 화면 밖으로 나가지 않음
              - top/bottom 고정으로 높이 제어
              - maxWidth로 너무 넓어지는 것 방지
          */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 bg-[#0d0d0d] border border-[var(--color-border)] overflow-hidden flex flex-col md:flex-row"
            style={{
              top: '4vh', bottom: '4vh',
              left: '50%', transform: 'translateX(-50%)',
              width: 'min(92vw, 1060px)',
            }}
          >
            {/* 닫기 */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center border border-[var(--color-border)] hover:border-accent text-sub hover:text-accent transition-colors"
              aria-label="닫기"
            >
              <span className="font-mono text-[10px]">✕</span>
            </button>

            {/* ── 왼쪽: 메인 미디어 ─────────────────────────────── */}
            <div
              className="relative bg-[var(--color-surface)] overflow-hidden flex-shrink-0"
              style={{ width: '42%', minWidth: 0, minHeight: '38vh' }}
            >
              <MediaPanel char={char} />

              {/* 세계관·역할 뱃지 */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
                <span
                  className="font-mono text-[8px] tracking-[0.25em] px-2 py-0.5"
                  style={{
                    color: 'var(--accent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                    background: 'rgba(13,13,13,0.75)',
                  }}
                >
                  {char.worldId}
                </span>
                {char.role && (
                  <span
                    className="font-mono text-[8px] tracking-widest text-dim px-2 py-0.5"
                    style={{ background: 'rgba(13,13,13,0.75)', border: '1px solid var(--color-border)' }}
                  >
                    {char.role}
                  </span>
                )}
              </div>

              {/* 하단 그라디언트 */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #0d0d0d, transparent)' }}
              />
            </div>

            {/* ── 오른쪽: 정보 패널 ─────────────────────────────── */}
            <div
              ref={scrollRef}
              className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-6 py-7 md:px-8 flex flex-col gap-6"
            >
              {/* 이름 + 설명 */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#f0f0f0] mb-2 break-words">{char.name}</h2>
                <p className="text-sub text-sm leading-relaxed">{char.description}</p>
              </div>

              {/* Creator's Note */}
              {char.note && (
                <div
                  className="border-l-2 pl-4"
                  style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}
                >
                  <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase mb-1">Creator's Note</p>
                  <p className="text-sub text-xs leading-relaxed">{char.note}</p>
                </div>
              )}

              {/* Tools */}
              {char.tools.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase mb-2">Tools</p>
                  <div className="flex flex-wrap gap-1.5">
                    {char.tools.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-widest border border-[var(--color-border)] px-2 py-0.5 text-sub">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 변천사 */}
              {char.versions && char.versions.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase mb-3">변천사</p>
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {char.versions.map((v, i) => (
                      <VersionThumb key={i} version={v} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── MediaPanel ───────────────────────────────────────────────── */

function MediaPanel({ char }: { char: Character }) {
  if (char.videoSrc) {
    return (
      <video
        src={asset(char.videoSrc)}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }
  if (char.imageSrc) {
    return (
      <img
        src={asset(char.imageSrc)}
        alt={char.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div className="relative w-20 h-20">
        <div className="w-full h-full border border-[var(--color-border)] flex items-center justify-center">
          <span className="font-serif text-3xl text-dim">?</span>
        </div>
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
      </div>
      <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase">Image Pending</p>
    </div>
  )
}

/* ── VersionThumb ─────────────────────────────────────────────── */

function VersionThumb({ version, index }: { version: { label: string; src: string }; index: number }) {
  return (
    <div className="flex-shrink-0 w-[4.5rem]">
      <div className="aspect-[3/4] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden mb-1 hover:border-accent transition-colors">
        {version.src ? (
          <img
            src={asset(version.src)}
            alt={version.label}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-dim">{index + 1}</span>
          </div>
        )}
      </div>
      <p className="font-mono text-[7px] tracking-wider text-dim text-center leading-tight">{version.label}</p>
    </div>
  )
}
