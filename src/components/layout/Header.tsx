import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { num: '01', label: 'About',        href: '/about' },
  { num: '02', label: 'Skills',       href: '/skills' },
  { num: '03', label: 'Works',        href: '/works/characters/심해' },
  { num: '04', label: 'Projects',     href: '/projects' },
  { num: '05', label: 'Achievements', href: '/achievements' },
  { num: '06', label: 'Contact',      href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[rgba(13,13,13,0.9)] backdrop-blur-md border-b border-[var(--color-border)]' : ''
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          {/* 로고 */}
          <NavLink
            to="/"
            className="font-mono text-xs tracking-[0.35em] text-[#f0f0f0] hover:text-accent transition-colors"
          >
            PORTFOLIO
          </NavLink>

          {/* 데스크탑 네비 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(({ num, label, href }) => {
              const isActive = location.pathname === href ||
                (href.startsWith('/works') && location.pathname.startsWith('/works'))

              return (
                <NavLink
                  key={href}
                  to={href}
                  className="group flex items-baseline gap-1.5 relative"
                >
                  <span className="font-mono text-[9px] text-dim group-hover:text-accent-sub transition-colors">
                    {num}
                  </span>
                  <span className={`font-mono text-[11px] tracking-widest transition-colors ${
                    isActive ? 'text-accent' : 'text-sub group-hover:text-[#f0f0f0]'
                  }`}>
                    {label}
                  </span>
                  {/* 언더라인 */}
                  <span className={`absolute -bottom-0.5 left-0 right-0 h-px bg-accent origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </NavLink>
              )
            })}
          </nav>

          {/* 모바일 토글 */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-[#f0f0f0] origin-center transition-colors"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block w-3 h-px bg-[#f0f0f0]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-[#f0f0f0] origin-center"
            />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0d0d0d] flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {NAV.map(({ num, label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `flex items-baseline gap-3 ${isActive ? 'text-accent' : 'text-[#f0f0f0] hover:text-accent'} transition-colors`
                  }
                >
                  <span className="font-mono text-xs text-dim">{num}</span>
                  <span className="font-serif text-3xl">{label}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
