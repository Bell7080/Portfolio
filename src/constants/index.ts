import type { World } from '@/types'

export const WORLDS: World[] = [
  {
    id: 'Neural-Rust',
    name: 'Neural-Rust',
    description: '녹슨 기계와 생명이 공존하는 세계',
    artStyle: '사이버펑크',
    accent: '#005f73',
    accentSub: '#0a9396',
  },
  {
    id: 'AsmoTherapy',
    name: 'AsmoTherapy',
    description: '마법과 음모가 얽힌 학원의 비밀',
    artStyle: '미국 카툰풍',
    accent: '#7b2d8b',
    accentSub: '#f4c430',
  },
  {
    id: 'For-Garden',
    name: 'For-Garden',
    description: '픽셀로 그린 모험의 서사',
    artStyle: '픽셀풍',
    accent: '#3a7d44',
    accentSub: '#f9c74f',
  },
]

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Works', href: '/works/characters/Neural-Rust' },
  { label: 'Projects', href: '/projects' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Contact', href: '/contact' },
] as const
