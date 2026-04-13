import { NavLink, Outlet, useMatch } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WORLDS } from '@/constants'

const WORK_TABS = [
  { label: '캐릭터', href: `/works/characters/${WORLDS[0].id}` },
  { label: '배경·환경', href: '/works/backgrounds' },
  { label: '에셋', href: '/works/assets' },
  { label: '3D', href: '/works/3d' },
  { label: '기타', href: '/works/etc' },
]

export default function Works() {
  const isCharacters = useMatch('/works/characters/*')

  return (
    <section className="min-h-screen px-6 py-16">
      {/* 메인 탭 */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-6 mb-12 border-b border-white/10 pb-0 overflow-x-auto"
        >
          {WORK_TABS.map(({ label, href }) => {
            const isActive =
              label === '캐릭터' ? !!isCharacters : location.pathname === href
            return (
              <NavLink
                key={href}
                to={href}
                className={`text-sm tracking-wider pb-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-sub hover:text-text'
                }`}
              >
                {label}
              </NavLink>
            )
          })}
        </motion.div>

        <Outlet />
      </div>
    </section>
  )
}
