import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

const WORK_TABS = [
  { label: '캐릭터',    basePath: '/works/characters', href: '/works/characters/Neural-Rust' },
  { label: '배경·환경', basePath: '/works/backgrounds', href: '/works/backgrounds' },
  { label: '에셋',      basePath: '/works/assets',      href: '/works/assets' },
  { label: '3D',        basePath: '/works/3d',           href: '/works/3d' },
  { label: '기타',      basePath: '/works/etc',          href: '/works/etc' },
]

export default function Works() {
  const { pathname } = useLocation()

  return (
    <section className="min-h-[calc(100vh-3.5rem)] px-8 md:px-16 py-16">
      <SectionLabel number="04" label="Works" />

      {/* 탭 바 */}
      <div className="flex mb-12 border-b border-[var(--color-border)] overflow-x-auto">
        {WORK_TABS.map(({ label, basePath, href }) => {
          // basePath로 시작하면 active — 세계관 전환(/works/characters/마법학원)도 캐릭터 탭 active 유지
          const isActive = pathname.startsWith(basePath)

          return (
            <NavLink
              key={href}
              to={href}
              className="relative px-5 py-3 font-mono text-[11px] tracking-widest whitespace-nowrap transition-colors"
              style={{ color: isActive ? 'var(--accent)' : 'var(--color-text-sub)' }}
            >
              {label}
              {/* 탭 인디케이터 — CSS transition 사용 (layoutId 충돌 제거) */}
              <span
                className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-200"
                style={{
                  backgroundColor: 'var(--accent)',
                  opacity: isActive ? 1 : 0,
                }}
              />
            </NavLink>
          )
        })}
      </div>

      {/* 탭 콘텐츠
          key = 2번째 경로 세그먼트 (characters / backgrounds / ...)
          세계관 전환(characters/심해 → characters/마법학원)은 같은 key → fade 없음
          상위 탭 전환(characters → backgrounds)은 key 변경 → fade 적용 */}
      <motion.div
        key={pathname.split('/')[2] ?? ''}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.div>
    </section>
  )
}
