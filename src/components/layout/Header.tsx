import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { num: '01', label: 'About',        href: '/about',        section: 'about' },
  { num: '02', label: 'Skills',       href: '/skills',       section: 'skills' },
  { num: '03', label: 'Works',        href: '/works/characters/Neural-Rust', section: 'works' },
  { num: '04', label: 'Projects',     href: '/projects',     section: 'projects' },
  { num: '05', label: 'Achievements', href: '/achievements', section: 'achievements' },
  { num: '06', label: 'Contact',      href: '/contact',      section: 'contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()

  // 현재 최상위 섹션 (라우팅 key와 동일 기준)
  const currentSection = pathname.split('/')[1] ?? ''

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(13,13,13,0.92)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          {/* 로고 */}
          <Link
            to="/"
            className="font-mono text-xs tracking-[0.35em] text-[#f0f0f0] hover:text-accent transition-colors"
          >
            PORTFOLIO
          </Link>

          {/* 데스크탑 네비 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(({ num, label, href, section }) => {
              const isActive = currentSection === section

              return (
                <Link
                  key={href}
                  to={href}
                  className="group flex items-baseline gap-1.5 relative py-1"
                >
                  <span className={`font-mono text-[9px] transition-colors ${
                    isActive ? 'text-accent' : 'text-[rgba(255,255,255,0.25)] group-hover:text-[rgba(255,255,255,0.5)]'
                  }`}>
                    {num}
                  </span>
                  <span className={`font-mono text-[11px] tracking-widest transition-colors ${
                    isActive ? 'text-accent' : 'text-[rgba(255,255,255,0.5)] group-hover:text-[#f0f0f0]'
                  }`}>
                    {label}
                  </span>
                  {/* 언더라인 */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px origin-left transition-transform duration-300"
                    style={{
                      backgroundColor: 'var(--accent)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                  {/* hover 언더라인 (isActive 아닐 때) */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.2)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px]"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-[#f0f0f0] origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block w-3 h-px bg-[#f0f0f0]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-[#f0f0f0] origin-center"
            />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0d0d0d] flex flex-col justify-center items-start px-10 gap-6 md:hidden"
          >
            {NAV.map(({ num, label, href, section }, i) => {
              const isActive = currentSection === section
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    to={href}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className="font-mono text-xs text-[rgba(255,255,255,0.25)]">{num}</span>
                    <span className={`font-serif text-3xl transition-colors ${
                      isActive ? 'text-accent' : 'text-[#f0f0f0] group-hover:text-accent'
                    }`}>
                      {label}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
