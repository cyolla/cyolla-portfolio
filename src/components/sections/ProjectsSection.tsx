import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiExternalLink, FiGithub, FiSearch, FiX } from 'react-icons/fi';
import { projects } from '../../data/portfolio';
import { SectionShell } from '../SectionShell';

export function ProjectsSection() {
  const [query, setQuery] = useState('');
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter((project) => {
      const haystack = `${project.name} ${project.stack.join(' ')} ${project.description}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  return (
    <SectionShell
      id="projects"
      eyebrow="Jupiter"
      title="A rotating project system around a giant innovation core"
      description="Each moon in this orbital gallery represents a different build challenge, from full stack applications to AI experiments and polished frontend exercises."
    >
      <div className="glass-panel p-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search project moons..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-300/50"
            />
          </div>
          <p className="text-slate-300">{filteredProjects.length} project moons in active orbit</p>
        </div>

        <div className="relative mx-auto mb-10 grid min-h-[16rem] place-items-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle,rgba(79,70,229,0.24),rgba(15,23,42,0.6)_55%,rgba(15,23,42,0.9)_100%)] p-8">
          <div className="absolute h-44 w-44 rounded-full bg-[radial-gradient(circle,#f59e0b_0%,#fb7185_20%,#4f46e5_70%,transparent_72%)] blur-sm" />
          <motion.div
            className="absolute h-[20rem] w-[20rem] rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {filteredProjects.slice(0, 8).map((project, index) => {
              const angle = (index / Math.max(filteredProjects.slice(0, 8).length, 1)) * Math.PI * 2;
              const x = Math.cos(angle) * 135;
              const y = Math.sin(angle) * 135;
              return (
                <button
                  key={project.name}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-slate-950/80 px-4 py-2 text-left backdrop-blur-xl transition hover:border-cyan-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                >
                  <p className="text-sm text-white">{project.orbit}</p>
                  <p className="text-xs text-slate-400">{project.name}</p>
                </button>
              );
            })}
          </motion.div>
          <div className="relative text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-orange-200/70">Jupiter Core</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Projects Galaxy</h3>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <button
              key={project.name}
              type="button"
              onClick={() => setActiveProject(project)}
              className="glass-panel group p-5 text-left transition hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">{project.orbit}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center bg-slate-950/78 px-4 py-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="glass-panel relative max-h-[90vh] w-full max-w-3xl overflow-y-auto p-8"
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-3 text-white"
                onClick={() => setActiveProject(null)}
              >
                <FiX />
              </button>
              <div className="mb-6 rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_35%),linear-gradient(135deg,rgba(79,70,229,0.18),rgba(15,23,42,0.95))] p-8">
                <p className="text-xs uppercase tracking-[0.5em] text-cyan-300/70">{activeProject.orbit}</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{activeProject.name}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{activeProject.description}</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div>
                  <h4 className="text-lg font-semibold text-white">Features</h4>
                  <div className="mt-4 space-y-3">
                    {activeProject.features.map((feature) => (
                      <p key={feature} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Tech Stack</h4>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {activeProject.stack.map((item) => (
                      <span key={item} className="skill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href={activeProject.github} target="_blank" rel="noreferrer" className="button-secondary">
                      GitHub
                      <FiGithub />
                    </a>
                    <a href={activeProject.demo} target="_blank" rel="noreferrer" className="button-primary">
                      Live Demo
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
