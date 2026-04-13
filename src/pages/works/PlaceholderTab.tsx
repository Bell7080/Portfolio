import { motion } from 'framer-motion'

interface Props {
  title: string
}

export default function PlaceholderTab({ title }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-32 gap-5"
    >
      <div className="relative w-20 h-20 border border-[var(--color-border)] flex items-center justify-center">
        <span className="font-serif text-3xl text-dim">{title[0]}</span>
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent" />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent" />
      </div>
      <div className="text-center">
        <p className="font-serif text-xl text-[#f0f0f0] mb-2">{title}</p>
        <p className="font-mono text-[10px] tracking-[0.35em] text-dim uppercase">
          Work in Progress
        </p>
      </div>
      <p className="text-sub text-xs text-center max-w-xs">
        작업물이 추가되면 이 탭에 자동으로 표시됩니다
      </p>
    </motion.div>
  )
}
