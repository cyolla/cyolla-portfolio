import { motion } from 'framer-motion';
import { education, personalInfo } from '../../data/portfolio';
import { SectionShell } from '../SectionShell';

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="Earth"
      title="A grounded mission with systems thinking"
      description="Cyolla combines academic depth, internship-driven execution, and a practical approach to building products that perform reliably in the real world."
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="glass-panel overflow-hidden p-6"
        >
          <div className="profile-orb mb-6">
            <span>CM</span>
          </div>
          <h3 className="text-2xl font-semibold text-white">{personalInfo.name}</h3>
          <p className="mt-3 text-slate-300">{personalInfo.headline}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">Mission Status</p>
              <p className="mt-3 text-lg text-white">{personalInfo.availability}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">Location</p>
              <p className="mt-3 text-lg text-white">{personalInfo.location}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-8"
        >
          <div className="glass-panel p-7">
            <h3 className="text-2xl font-semibold text-white">About Me</h3>
            <p className="mt-5 text-lg leading-8 text-slate-300">{personalInfo.about}</p>
          </div>
          <div className="glass-panel p-7">
            <h3 className="text-2xl font-semibold text-white">Education Timeline</h3>
            <div className="mt-6 space-y-6">
              {education.map((item, index) => (
                <div key={item.degree} className="relative pl-8">
                  <div className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent" />
                  <div className="absolute left-[-6px] top-2 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">Stage {index + 1}</p>
                  <h4 className="mt-2 text-xl font-medium text-white">{item.degree}</h4>
                  <p className="mt-1 text-slate-300">{item.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
