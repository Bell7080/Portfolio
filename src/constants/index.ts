import type { World } from '@/types'

export const WORLDS: World[] = [
  {
    id: '심해',
    name: '심해',
    description: '깊은 바다 아래, 알려지지 않은 세계의 이야기',
    artStyle: '일본풍',
    accent: '#005f73',
    accentSub: '#0a9396',
  },
  {
    id: '마법학원',
    name: '마법학원',
    description: '마법과 음모가 얽힌 학원의 비밀',
    artStyle: '미국 카툰풍',
    accent: '#7b2d8b',
    accentSub: '#f4c430',
  },
  {
    id: '판타지모험',
    name: '판타지 모험',
    description: '픽셀로 그린 모험의 서사',
    artStyle: '픽셀풍',
    accent: '#3a7d44',
    accentSub: '#f9c74f',
  },
]

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Works', href: '/works/characters/심해' },
  { label: 'Projects', href: '/projects' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Contact', href: '/contact' },
] as const
