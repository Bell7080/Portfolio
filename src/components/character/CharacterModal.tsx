import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Character } from '@/types'

interface Props {
  char: Character | null
  onClose: () => void
}

export default function CharacterModal({ char, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // ESC 키 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // 모달 열릴 때 스크롤 초기화 + body 스크롤 잠금
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

          {/* 모달 패널 */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 flex flex-col md:flex-row bg-[#0d0d0d] border border-[var(--color-border)] overflow-hidden"
            style={{
              top: '4vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '92vw',
              height: '92vh',
              maxWidth: 1100,
            }}
          >
            {/* ── 닫기 버튼 ───────────────────────────────── */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center border border-[var(--color-border)] hover:border-accent text-sub hover:text-accent transition-colors"
              aria-label="닫기"
            >
              <span className="font-mono text-xs">✕</span>
            </button>

            {/* ── 왼쪽: 메인 미디어 ────────────────────── */}
            <div className="md:w-[42%] flex-shrink-0 relative bg-[var(--color-surface)] overflow-hidden"
              style={{ minHeight: '38vh' }}
            >
              <MediaPanel char={char} />

              {/* 세계관 뱃지 (미디어 위 레이어) */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="font-mono text-[9px] tracking-[0.3em] px-2 py-1"
                  style={{ color: 'var(--accent)', border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)', background: 'rgba(13,13,13,0.7)' }}>
                  {char.worldId}
                </span>
                {char.role && (
                  <span className="font-mono text-[9px] tracking-widest text-dim px-2 py-1"
                    style={{ background: 'rgba(13,13,13,0.7)', border: '1px solid var(--color-border)' }}>
                    {char.role}
                  </span>
                )}
              </div>

              {/* 하단 그라디언트 */}
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #0d0d0d 0%, transparent 100%)' }} />
            </div>

            {/* ── 오른쪽: 정보 패널 ───────────────────── */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 md:px-10 flex flex-col gap-7">

              {/* 캐릭터명 + 설명 */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#f0f0f0] mb-3">{char.name}</h2>
                <p className="text-sub text-sm leading-relaxed">{char.description}</p>
              </div>

              {/* Creator's Note */}
              {char.note && (
                <div className="border-l-2 pl-4" style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase mb-1.5">Creator's Note</p>
                  <p className="text-sub text-xs leading-relaxed">{char.note}</p>
                </div>
              )}

              {/* Tools */}
              {char.tools.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase mb-2">Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {char.tools.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-widest border border-[var(--color-border)] px-2 py-1 text-sub">
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
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {char.versions.map((v, i) => (
                      <VersionThumb key={i} version={v} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* 캐릭터 추가 이미지 갤러리 */}
              {char.extras && char.extras.length > 0 && (
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase mb-3">갤러리</p>
                  <div className="grid grid-cols-3 gap-2">
                    {char.extras.map((src, i) => (
                      <div key={i} className="aspect-square bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
                        <img src={src} alt={`extra-${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 플레이스홀더: 이미지 없을 때 안내 */}
              {!char.imageSrc && !char.videoSrc && (
                <div className="border border-dashed border-[var(--color-border)] p-5 text-center">
                  <p className="font-mono text-[9px] tracking-[0.25em] text-dim">
                    이미지/영상을 WebP·WebM 포맷으로 준비하면 여기에 표시됩니다
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── 서브 컴포넌트 ──────────────────────────────────────────── */

function MediaPanel({ char }: { char: Character }) {
  if (char.videoSrc) {
    return (
      <video
        src={char.videoSrc}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }
  if (char.imageSrc) {
    return (
      <img
        src={char.imageSrc}
        alt={char.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }
  // 플레이스홀더
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      {/* 장식 프레임 */}
      <div className="relative w-24 h-24">
        <div className="w-full h-full border border-[var(--color-border)] flex items-center justify-center">
          <span className="font-serif text-4xl text-dim">?</span>
        </div>
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
      </div>
      <div className="text-center">
        <p className="font-mono text-[9px] tracking-[0.3em] text-dim uppercase">Image Pending</p>
        <p className="font-mono text-[8px] tracking-wider text-dim/50 mt-1">WebP / WebM</p>
      </div>
    </div>
  )
}

function VersionThumb({ version, index }: { version: { label: string; src: string }; index: number }) {
  return (
    <div className="flex-shrink-0 w-20">
      <div className="aspect-[3/4] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden mb-1.5 hover:border-accent transition-colors cursor-pointer">
        {version.src ? (
          <img src={version.src} alt={version.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs text-dim">{index + 1}</span>
          </div>
        )}
      </div>
      <p className="font-mono text-[8px] tracking-wider text-dim text-center leading-tight">{version.label}</p>
    </div>
  )
}
