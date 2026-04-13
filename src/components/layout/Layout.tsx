import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import NoiseBg from '@/components/ui/NoiseBg'
import StarField from '@/components/ui/StarField'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <CustomCursor />
      <StarField />
      <NoiseBg />

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f0f0f0]">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            className="flex-1 pt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}
