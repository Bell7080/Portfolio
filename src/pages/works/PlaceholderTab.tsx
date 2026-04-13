import { motion } from 'framer-motion'

interface Props {
  title: string
}

export default function PlaceholderTab({ title }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-24 text-text-sub"
    >
      <p className="font-serif text-2xl text-text mb-3">{title}</p>
      <p className="text-sm text-text-sub/60">작업물이 추가되면 여기에 표시됩니다</p>
    </motion.div>
  )
}
