/* ─── World / Character ──────────────────────────────────────── */

export type WorldId = '심해' | '마법학원' | '판타지모험'

export interface World {
  id: WorldId
  name: string
  description: string
  artStyle: string
  accent: string
  accentSub: string
}

export interface Character {
  id: string
  worldId: WorldId
  name: string
  description: string
  imageSrc: string
  videoSrc?: string
  tools: string[]
  note: string
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
