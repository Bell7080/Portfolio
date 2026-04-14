import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import NoiseBg from '@/components/ui/NoiseBg'
import StarField from '@/components/ui/StarField'

export default function Layout() {
  const { pathname } = useLocation()

  // 최상위 섹션 키만 사용 — Works 내부 탭은 Works 컴포넌트가 자체 처리
  // AnimatePresence mode="wait" 제거: 빠른 탭 전환 시 exit 큐가 꼬여
  // 새 컴포넌트가 opacity:0 에 stuck 되는 버그 원인이었음
  const sectionKey = '/' + (pathname.split('/')[1] ?? '')

  return (
    <>
      <CustomCursor />
      <StarField />
      <NoiseBg />

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f0f0f0]">
        <Header />

        <motion.main
          key={sectionKey}
          className="flex-1 pt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.main>

        <Footer />
      </div>
    </>
  )
}
