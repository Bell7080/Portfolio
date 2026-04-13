import { motion } from 'framer-motion'
import projects from '@/data/projects.json'

export default function Projects() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-4xl md:text-5xl mb-12"
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-white/10 hover:border-accent transition-colors p-6 group"
          >
            {project.imageSrc && (
              <div className="aspect-video bg-surface mb-4 overflow-hidden">
                <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-text-sub text-sm mb-4">{project.description}</p>
            <p className="text-text-sub text-xs mb-4 border-l border-accent pl-3">
              <span className="text-accent">기획 의도:</span> {project.intent}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 border border-white/20 text-text-sub">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wider text-text-sub hover:text-text transition-colors"
                >
                  GitHub →
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wider text-accent"
                >
                  Demo →
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
