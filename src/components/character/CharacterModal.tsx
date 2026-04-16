import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Character } from '@/types'
import { asset } from '@/utils/asset'
import ImageLightbox from '@/components/ui/ImageLightbox'

interface Props {
  char: Character | null
  onClose: () => void
}

export default function CharacterModal({ char, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

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
    <>
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
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              onClick={onClose}
            />

            {/*
              우측 슬라이드 패널
              ─ 항상 right:0 top:0 bottom:0 고정
              ─ width: min(640px, 100vw) → 화면 크기에 자동 대응
              ─ 애니메이션: x: '100%' → x: 0  (오른쪽에서 슬라이드인)
              ─ 내부 레이아웃: 모바일 flex-col / 태블릿+ flex-row
            */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 bg-[#0d0d0d] border-l border-[var(--color-border)] flex flex-col md:flex-row overflow-hidden"
              style={{ width: 'min(640px, 100vw)' }}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center border border-[var(--color-border)] hover:border-accent text-white/50 hover:text-accent transition-colors bg-[#0d0d0d]"
                aria-label="닫기"
              >
                <span className="font-mono text-sm">✕</span>
              </button>

              {/* ── 이미지/동영상 패널 ─────────────────────────
                  모바일 (flex-col): 전체 너비, 고정 높이
                  데스크탑 (flex-row): 42% 너비, 전체 높이 stretch  */}
              <div className="char-media relative bg-[var(--color-surface)] overflow-hidden flex-shrink-0">
                <style>{`
                  .char-media { width: 100%; height: min(52vw, 280px); }
                  @media (min-width: 768px) {
                    .char-media { width: 50%; height: auto; align-self: stretch; }
                  }
                `}</style>

                <div className="absolute inset-0">
                  <MediaPanel char={char} />
                </div>

                {/* 세계관·역할 뱃지 */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
                  <span
                    className="font-mono text-xs px-2 py-0.5"
                    style={{
                      color: 'var(--accent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                      background: 'rgba(13,13,13,0.85)',
                    }}
                  >
                    {char.worldId}
                  </span>
                  {char.role && (
                    <span
                      className="font-mono text-xs text-white/50 px-2 py-0.5"
                      style={{ background: 'rgba(13,13,13,0.85)', border: '1px solid var(--color-border)' }}
                    >
                      {char.role}
                    </span>
                  )}
                </div>

                {/* 하단 그라디언트 */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #0d0d0d, transparent)' }}
                />
              </div>

              {/* ── 정보 패널 ──────────────────────────────── */}
              <div
                ref={scrollRef}
                className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden px-5 py-6 md:px-7 md:py-8 flex flex-col gap-5"
              >
                {/* 이름 + 설명 */}
                <div className="w-full min-w-0 pr-8">
                  <h2 className="font-serif text-2xl md:text-3xl text-white mb-2 break-words leading-snug">
                    {char.name}
                  </h2>
                  <p className="text-white/60 text-base leading-relaxed break-words">{char.description}</p>
                </div>

                {/* Creator's Note */}
                {char.note && (
                  <div
                    className="border-l-2 pl-4 w-full min-w-0"
                    style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}
                  >
                    <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-1">Creator's Note</p>
                    <p className="text-white/55 text-sm leading-relaxed break-words">{char.note}</p>
                  </div>
                )}

                {/* Tools */}
                {char.tools.length > 0 && (
                  <div className="w-full">
                    <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-2">Tools</p>
                    <div className="flex flex-wrap gap-1.5">
                      {char.tools.map(t => (
                        <span key={t} className="font-mono text-xs border border-[var(--color-border)] px-2.5 py-1 text-white/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 다른 버전 */}
                {(char.imageSrc || (char.versions && char.versions.length > 0)) && (
                  <div className="w-full">
                    <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-3">다른 버전</p>
                    <div className="flex gap-3 overflow-x-auto pb-2 pr-4 no-scrollbar">

                      {/* 원본 */}
                      {char.imageSrc && (
                        <button
                          onClick={() => setLightboxSrc(char.imageSrc)}
                          className="flex-shrink-0 group"
                        >
                          <div
                            className="w-20 md:w-24 aspect-[3/4] bg-[var(--color-surface)] border-2 overflow-hidden mb-1.5"
                            style={{ borderColor: 'var(--accent)' }}
                          >
                            <img
                              src={asset(char.imageSrc)}
                              alt="원본"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="font-mono text-xs text-center" style={{ color: 'var(--accent)' }}>원본</p>
                        </button>
                      )}

                      {/* 버전들 */}
                      {char.versions?.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => v.src && setLightboxSrc(v.src)}
                          className="flex-shrink-0 group"
                          disabled={!v.src}
                        >
                          <div className="w-14 md:w-16 aspect-[3/4] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden mb-1.5 hover:border-accent transition-colors">
                            {v.src ? (
                              <img
                                src={asset(v.src)}
                                alt={v.label}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="font-mono text-xs text-white/20">{i + 1}</span>
                              </div>
                            )}
                          </div>
                          <p className="font-mono text-xs text-white/40 text-center leading-tight">{v.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="h-2 flex-shrink-0" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 라이트박스 */}
      <ImageLightbox
        src={lightboxSrc}
        alt={char?.name}
        onClose={() => setLightboxSrc(null)}
      />
    </>
  )
}

/* ── MediaPanel ──────────────────────────────────────────────── */

function MediaPanel({ char }: { char: Character }) {
  if (char.videoSrc) {
    return (
      <video
        src={asset(char.videoSrc)}
        autoPlay loop muted playsInline
        className="w-full h-full object-cover"
      />
    )
  }
  if (char.imageSrc) {
    return (
      <img
        src={asset(char.imageSrc)}
        alt={char.name}
        className="w-full h-full object-cover"
      />
    )
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="relative w-20 h-20">
        <div className="w-full h-full border border-[var(--color-border)] flex items-center justify-center">
          <span className="font-serif text-3xl text-white/20">?</span>
        </div>
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: 'var(--accent)' }} />
      </div>
      <p className="font-mono text-xs tracking-widest text-white/30 uppercase">Image Pending</p>
    </div>
  )
}
