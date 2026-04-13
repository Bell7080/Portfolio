# CLAUDE.md — 포트폴리오 사이트 작업 가이드

## 모델 설정

- 기본 모델: `claude-sonnet-4-6`
- 하위 에이전트 / 서브태스크: `claude-haiku-4-5-20251001` (비용 절감)
- 추론(thinking): 짧게 유지 — 불필요한 장황한 추론 금지

---

## 프로젝트 개요

개인 포트폴리오 사이트. 채용·협업·의뢰 유입을 위한 개인 브랜딩 사이트.  
이 사이트 하나로 이력서·포트폴리오·연락처·브랜딩을 대체한다.

**포지션:** AI Art Director / Content Creator / Vibe Coder

---

## 기술 스택 (전부 무료)

| 역할 | 기술 | 비고 |
|------|------|------|
| 번들러 | Vite | 빠른 HMR, GitHub Pages 배포 용이 |
| 프레임워크 | React | 컴포넌트 단위 구조 |
| 언어 | TypeScript | 타입 정의로 AI 코드 생성 정확도 향상 |
| 스타일링 | Tailwind CSS + CSS Variables | 포인트 컬러 전환은 CSS Variables로 처리 |
| 애니메이션 | Framer Motion | 탭 전환, 팝업, 스크롤 페이드인 |
| 파티클 | tsParticles | 별빛 파티클 트랜지션 연출 |
| 라우팅 | React Router v6 | 세계관별 URL 분리 |
| 문의 폼 | EmailJS | 서버 없이 이메일 전송, 무료 월 200건 |
| 배포 | GitHub Pages | 무료, 커스텀 도메인 지원 |

**사용하지 않는 것**
- Next.js — SSR 불필요, 복잡도만 증가
- GSAP — Framer Motion으로 충분
- styled-components — Tailwind와 충돌, 중복
- Three.js — 3D 뷰어는 Sketchfab 외부 링크로 위임

---

## 데이터 구조

캐릭터·세계관·프로젝트 데이터는 JSON으로 분리 관리.  
새 콘텐츠 추가 시 코드가 아닌 JSON만 수정.

```
/src/data/
  characters.json
  worlds.json
  projects.json
  achievements.json
```

TypeScript 타입 정의는 `/src/types/` 에 별도 파일로 분리.

---

## 미디어 파일 처리 규칙

### ⚠️ AI가 직접 처리하지 않는 항목 — 사용자에게 먼저 요청할 것

아래 항목은 코드로 자동 변환하지 말고, **작업 전에 사용자에게 먼저 요청**한다.

| 항목 | 요청 내용 |
|------|----------|
| 이미지 포맷 | PNG/JPG → WebP 변환을 사용자가 직접 수행 후 제공 (Squoosh 사용 권장, 무료 웹툴) |
| 영상 포맷 | 캡컷 원본 → WebM 변환을 사용자가 직접 수행 후 제공 (HandBrake 사용 권장, 무료) |
| 3D 뷰어 | Sketchfab에 업로드 후 링크만 제공 — 사이트 내 뷰어 직접 구현 금지 |

### AI가 처리하는 항목
- WebP/WebM 파일을 받아서 컴포넌트에 연결
- React Lazy + Suspense로 탭별 지연 로딩 구현
- 이미지 alt 텍스트, 파일 경로 관리

---

## 디자인 시스템

### 기본 컬러
```
배경:        #0d0d0d
텍스트:      #ffffff
서브텍스트:  #aaaaaa
기본 액센트: #ffffff
```

### 세계관별 포인트 컬러 (CSS Variables로 전환)
```
심해:        --accent: #005f73 / --accent-sub: #0a9396
마법학원:    --accent: #7b2d8b / --accent-sub: #f4c430
판타지모험:  --accent: #3a7d44 / --accent-sub: #f9c74f
```

세력 탭 전환 시 CSS Variable만 교체하는 방식으로 구현.  
세력 외 탭(배경·에셋·3D·기타)은 포인트 컬러 전환 없이 기본 흰색 유지.

### 폰트
- 영문: Playfair Display (Google Fonts, 무료)
- 한글: Noto Sans KR (Google Fonts, 무료)

---

## 페이지 구조

```
/ (랜딩)
/about
/skills
/works
  /works/characters/:worldId
  /works/backgrounds
  /works/assets
  /works/3d
  /works/etc
/projects
/achievements
/contact
```

---

## 컴포넌트 작성 규칙

- 컴포넌트 파일명: PascalCase (`CharacterCard.tsx`)
- 훅 파일명: camelCase with use prefix (`useWorldTheme.ts`)
- 스타일은 Tailwind 클래스 우선, 복잡한 애니메이션만 Framer Motion
- 하드코딩 금지 — 텍스트·컬러·데이터는 반드시 JSON 또는 상수 파일에서 참조
- 컴포넌트 하나당 역할 하나 — 너무 커지면 분리

---

## 작업 요청 시 우선순위

1. 미디어 파일(이미지/영상) 필요 시 → 코드 작성 전에 사용자에게 포맷 변환 요청 먼저
2. 새 세계관/캐릭터 추가 → JSON 데이터 추가 후 컴포넌트 자동 반영 구조 유지
3. 애니메이션 추가 → Framer Motion 우선, CSS 애니메이션은 간단한 hover에만
4. 외부 서비스 연동(폼 등) → EmailJS 사용, 백엔드 서버 구축 금지
