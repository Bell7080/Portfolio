import { useEffect } from 'react'
import type { WorldId } from '@/types'

export function useWorldTheme(worldId: WorldId | null) {
  useEffect(() => {
    const root = document.documentElement
    if (worldId) {
      root.setAttribute('data-world', worldId)
    } else {
      root.removeAttribute('data-world')
    }
    return () => root.removeAttribute('data-world')
  }, [worldId])
}
