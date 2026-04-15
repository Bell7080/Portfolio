/**
 * public/ 폴더 경로를 현재 배포 base URL 기준으로 변환
 * - dev:  /assets/... → /assets/...
 * - prod: /assets/... → /Portfolio/assets/...
 */
const BASE = import.meta.env.BASE_URL  // 항상 trailing slash 포함

export function asset(path: string): string {
  if (!path) return ''
  return BASE + path.replace(/^\//, '')
}
