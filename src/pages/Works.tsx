import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WORLDS } from '@/constants'
import SectionLabel from '@/components/ui/SectionLabel'

const WORK_TABS = [
  { label: '캐릭터',  href: `/works/characters/${WORLDS[0].id}`, match: '/works/characters' },
  { label: '배경·환경', href: '/works/backgrounds', match: '/works/backgrounds' },
  { label: '에셋',    href: '/works/assets', match: '/works/assets' },
  { label: '3D',      href: '/works/3d', match: '/works/3d' },
  { label: '기타',    href: '/works/etc', match: '/works/etc' },
]

export default function Works() {
  const { pathname } = useLocation()

  return (
    <section className="min-h-[calc(100vh-3.5rem)] px-8 md:px-16 py-16">
      <SectionLabel number="04" label="Works" />

      {/* 탭 바 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-0 mb-12 border-b border-[var(--color-border)] overflow-x-auto"
      >
        {WORK_TABS.map(({ label, href, match }) => {
          const isActive = pathname.startsWith(match)
          return (
            <NavLink
              key={href}
              to={href}
              className={`relative px-5 py-3 font-mono text-[11px] tracking-widest whitespace-nowrap transition-colors ${
                isActive ? 'text-accent' : 'text-sub hover:text-[#f0f0f0]'
              }`}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId="works-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                />
              )}
            </NavLink>
          )
        })}
      </motion.div>

      <Outlet />
    </section>
  )
}
