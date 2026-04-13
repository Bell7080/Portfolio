import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-bg/80 backdrop-blur-sm border-b border-white/5">
      {/* 로고 */}
      <NavLink to="/" className="font-serif text-lg tracking-widest text-accent">
        PORTFOLIO
      </NavLink>

      {/* 데스크탑 네비 */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              `text-sm tracking-wider transition-colors ${
                isActive ? 'text-accent' : 'text-text-sub hover:text-text'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* 모바일 햄버거 */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="메뉴 열기"
      >
        <span className="block w-6 h-px bg-text" />
        <span className="block w-6 h-px bg-text" />
        <span className="block w-4 h-px bg-text" />
      </button>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-surface border-b border-white/5 py-4 flex flex-col items-center gap-6 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm tracking-wider transition-colors ${
                    isActive ? 'text-accent' : 'text-text-sub hover:text-text'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
