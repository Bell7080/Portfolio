/* ─── World / Character ──────────────────────────────────────── */

export type WorldId = 'Neural-Rust' | 'AsmoTherapy' | '판타지모험'

export interface World {
  id: WorldId
  name: string
  description: string
  artStyle: string
  accent: string
  accentSub: string
  /** 세계관 전체 시놉시스 (펼쳐보기) */
  synopsis?: string
  /** 기획/컨셉 노트 */
  conceptNote?: string
  /** 세계관 공통 이미지 (캐릭터 외 배경·무드샷 등) */
  extraImages?: string[]
  /** 장르·무드 태그 */
  tags?: string[]
}

export interface CharacterVersion {
  /** 버전 레이블 (초기 스케치 / v2 / 파이널 등) */
  label: string
  /** WebP 이미지 경로 */
  src: string
}

export interface Character {
  id: string
  worldId: WorldId
  name: string
  /** 캐릭터 역할/포지션 (주인공, 조력자 등) */
  role?: string
  description: string
  /** 메인 정지 일러스트 (WebP) */
  imageSrc: string
  /** 메인 움직이는 일러스트 (WebM — Live2D·영상) */
  videoSrc?: string
  tools: string[]
  note: string
  /** 변천사 — 초기 스케치부터 파이널까지 */
  versions?: CharacterVersion[]
}

/* ─── Works ──────────────────────────────────────────────────── */

export interface Background {
  id: string
  worldId: WorldId | null
  title: string
  imageSrc: string
  tags: string[]
}

export interface Asset {
  id: string
  worldId: WorldId | null
  title: string
  description: string
  imageSrc: string
  tags: string[]
}

export interface ThreeDWork {
  id: string
  title: string
  description: string
  imageSrcs: string[]
  turntableGif?: string
  sketchfabUrl: string
  tools: string[]
}

export interface EtcWork {
  id: string
  title: string
  description: string
  type: 'video' | 'image' | 'other'
  embedUrl?: string
  imageSrc?: string
  tags: string[]
}

/* ─── Projects ───────────────────────────────────────────────── */

export interface Project {
  id: string
  title: string
  description: string
  intent: string
  result: string
  imageSrc?: string
  githubUrl?: string
  demoUrl?: string
  tags: string[]
}

/* ─── Achievements ───────────────────────────────────────────── */

export type AchievementCategory = 'serial' | 'education' | 'collaboration' | 'academic'

export interface Achievement {
  id: string
  category: AchievementCategory
  title: string
  description: string
  date: string
  link?: string
  icon: string
}
