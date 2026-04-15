import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { asset } from '@/utils/asset'

interface Props {
  src: string | null
  alt?: string
  onClose: () => void
}

export default function ImageLightbox({ src, alt = '', onClose }: Props) {
  useEffect(() => {
    if (!src) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [src, onClose])

  useEffect(() => {
    if (src) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [src])

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 cursor-pointer"
          onClick={onClose}
        >
          <motion.img
            src={asset(src)}
            alt={alt}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[90vh] max-w-[90vw] object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-colors font-mono text-sm"
            aria-label="닫기"
          >
            ✕
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30 tracking-widest">
            클릭 또는 ESC 로 닫기
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
