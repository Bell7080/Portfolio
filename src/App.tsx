import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'

const Landing = lazy(() => import('@/pages/Landing'))
const About = lazy(() => import('@/pages/About'))
const Skills = lazy(() => import('@/pages/Skills'))
const Works = lazy(() => import('@/pages/Works'))
const CharactersPage = lazy(() => import('@/pages/works/CharactersPage'))
const PlaceholderTab = lazy(() => import('@/pages/works/PlaceholderTab'))
const Projects = lazy(() => import('@/pages/Projects'))
const Achievements = lazy(() => import('@/pages/Achievements'))
const Contact = lazy(() => import('@/pages/Contact'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh] text-text-sub text-xs tracking-widest">
      Loading...
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/works" element={<Works />}>
            <Route index element={<Navigate to="/works/characters/심해" replace />} />
            <Route path="characters" element={<Navigate to="/works/characters/심해" replace />} />
            <Route path="characters/:worldId" element={<CharactersPage />} />
            <Route path="backgrounds" element={<PlaceholderTab title="배경·환경" />} />
            <Route path="assets" element={<PlaceholderTab title="에셋" />} />
            <Route path="3d" element={<PlaceholderTab title="3D" />} />
            <Route path="etc" element={<PlaceholderTab title="기타" />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
