import { motion } from 'framer-motion';
import { experiences } from '../../data/portfolio';
import { SectionShell } from '../SectionShell';

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Mars"
      title="Mission timeline across live product work"
      description="Internship experience here is presented like expedition milestones, highlighting hands-on delivery across frontend systems, full stack integration, and iterative teamwork."
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent sm:left-1/2" />
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className={`relative sm:w-[calc(50%_-_1.5rem)] ${
                index % 2 === 0 ? 'sm:ml-auto' : ''
              }`}
            >
              <div className="absolute left-4 top-8 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)] sm:left-auto sm:right-[-1.82rem]" />
              <div className={`glass-panel ml-10 p-6 sm:ml-0 ${index % 2 === 0 ? 'sm:mr-10' : 'sm:ml-10'}`}>
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">{experience.duration}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{experience.role}</h3>
                <p className="mt-1 text-lg text-violet-200">{experience.company}</p>
                <div className="mt-5 space-y-3 text-slate-300">
                  {experience.responsibilities.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
