import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import NoiseBg from '@/components/ui/NoiseBg'
import StarField from '@/components/ui/StarField'

export default function Layout() {
  const { pathname } = useLocation()

  // ── 최상위 섹션 키 ──────────────────────────────────────────
  // '/works/characters/심해' → '/works'
  // '/about'                → '/about'
  // Works 내부 탭 전환은 애니메이션 없이 즉시 전환 (깜빡임 방지)
  const sectionKey = '/' + (pathname.split('/')[1] ?? '')

  return (
    <>
      <CustomCursor />
      <StarField />
      <NoiseBg />

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f0f0f0]">
        <Header />

        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={sectionKey}
            className="flex-1 pt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  )
}
