import { useParams, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WORLDS } from '@/constants'
import { useWorldTheme } from '@/hooks/useWorldTheme'
import type { WorldId } from '@/types'
import characters from '@/data/characters.json'

export default function CharactersPage() {
  const { worldId } = useParams<{ worldId: string }>()
  const currentWorld = WORLDS.find((w) => w.id === worldId) ?? WORLDS[0]
  useWorldTheme(currentWorld.id as WorldId)

  const worldCharacters = characters.filter((c) => c.worldId === currentWorld.id)

  return (
    <div>
      {/* 세계관 탭 */}
      <div className="flex gap-4 mb-10 overflow-x-auto">
        {WORLDS.map((world) => (
          <NavLink
            key={world.id}
            to={`/works/characters/${world.id}`}
            className={({ isActive }) =>
              `px-4 py-2 text-xs tracking-widest border transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-accent text-accent'
                  : 'border-white/20 text-text-sub hover:border-white/60 hover:text-text'
              }`
            }
          >
            {world.name}
          </NavLink>
        ))}
      </div>

      {/* 세계관 설명 */}
      <motion.div
        key={currentWorld.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-10"
      >
        <h3 className="font-serif text-2xl text-accent mb-2">{currentWorld.name}</h3>
        <p className="text-text-sub text-sm">{currentWorld.description}</p>
        <span className="text-xs text-text-sub/60 mt-1 block">아트풍: {currentWorld.artStyle}</span>
      </motion.div>

      {/* 캐릭터 카드 그리드 */}
      {worldCharacters.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-text-sub"
        >
          <p className="text-lg mb-2">준비 중입니다</p>
          <p className="text-sm text-text-sub/60">이미지 업로드 후 캐릭터 카드가 표시됩니다</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {worldCharacters.map((char, i) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="border border-white/10 hover:border-accent transition-colors cursor-pointer group"
            >
              <div className="aspect-[3/4] bg-surface flex items-center justify-center text-text-sub/30 text-xs">
                {char.imageSrc ? (
                  <img src={char.imageSrc} alt={char.name} className="w-full h-full object-cover" />
                ) : (
                  '이미지 없음'
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium group-hover:text-accent transition-colors">
                  {char.name}
                </p>
                <p className="text-xs text-text-sub mt-1 line-clamp-2">{char.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
