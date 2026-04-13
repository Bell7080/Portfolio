import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import projects from '@/data/projects.json'

export default function Projects() {
  return (
    <section className="max-w-5xl mx-auto px-8 md:px-16 py-24">
      <SectionLabel number="05" label="Projects" />

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-[var(--color-border)] hover:border-accent transition-all duration-300 p-6 relative"
    >
      {/* 코너 장식 (hover 시 등장) */}
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* 인덱스 */}
      <span className="font-mono text-[10px] text-dim mb-4 block">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* 이미지 */}
      {project.imageSrc && (
        <div className="aspect-video bg-[var(--color-surface)] mb-5 overflow-hidden">
          <img
            src={project.imageSrc}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* 제목 */}
      <h3 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sub text-sm mb-5 leading-relaxed">{project.description}</p>

      {/* 기획 의도 */}
      <div className="border-l-2 border-accent pl-3 mb-5">
        <p className="font-mono text-[10px] tracking-widest text-dim mb-1">INTENT</p>
        <p className="text-sub text-xs leading-relaxed">{project.intent}</p>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-wider px-2 py-1 border border-[var(--color-border)] text-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 링크 */}
      <div className="flex gap-4 pt-4 border-t border-[var(--color-border)]">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest text-sub hover:text-accent transition-colors"
          >
            GitHub →
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest text-accent hover:text-[#f0f0f0] transition-colors"
          >
            Demo →
          </a>
        )}
      </div>
    </motion.article>
  )
}
