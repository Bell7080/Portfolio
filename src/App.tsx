import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'

// ── 최상위 페이지만 lazy ──────────────────────────────────────
const Landing      = lazy(() => import('@/pages/Landing'))
const About        = lazy(() => import('@/pages/About'))
const Skills       = lazy(() => import('@/pages/Skills'))
const Projects     = lazy(() => import('@/pages/Projects'))
const Achievements = lazy(() => import('@/pages/Achievements'))
const Contact      = lazy(() => import('@/pages/Contact'))

// Works 섹션은 Works 자체만 lazy — 내부 탭 컴포넌트는 즉시 import
// (Works가 이미 lazy라서 내부를 또 lazy 하면 로딩이 두 번 발생)
const Works         = lazy(() => import('@/pages/Works'))
import CharactersPage from '@/pages/works/CharactersPage'
import PlaceholderTab  from '@/pages/works/PlaceholderTab'

// ── 최소한의 로딩 화면 ─────────────────────────────────────────
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <span className="font-mono text-xs tracking-[0.3em] text-[rgba(255,255,255,0.2)] animate-pulse">
        ···
      </span>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={
          <Suspense fallback={<PageFallback />}><Landing /></Suspense>
        } />

        <Route path="/about" element={
          <Suspense fallback={<PageFallback />}><About /></Suspense>
        } />

        <Route path="/skills" element={
          <Suspense fallback={<PageFallback />}><Skills /></Suspense>
        } />

        {/* Works: 내부 탭은 Suspense 없이 즉시 렌더 */}
        <Route path="/works" element={
          <Suspense fallback={<PageFallback />}><Works /></Suspense>
        }>
          <Route index element={<Navigate to="characters/Neural-Rust" replace />} />
          <Route path="characters" element={<Navigate to="Neural-Rust" replace />} />
          <Route path="characters/:worldId" element={<CharactersPage />} />
          <Route path="backgrounds" element={<PlaceholderTab title="배경·환경" />} />
          <Route path="assets"      element={<PlaceholderTab title="에셋" />} />
          <Route path="3d"          element={<PlaceholderTab title="3D" />} />
          <Route path="etc"         element={<PlaceholderTab title="기타" />} />
        </Route>

        <Route path="/projects" element={
          <Suspense fallback={<PageFallback />}><Projects /></Suspense>
        } />

        <Route path="/achievements" element={
          <Suspense fallback={<PageFallback />}><Achievements /></Suspense>
        } />

        <Route path="/contact" element={
          <Suspense fallback={<PageFallback />}><Contact /></Suspense>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
