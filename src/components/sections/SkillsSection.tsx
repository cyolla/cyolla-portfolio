import { motion } from 'framer-motion';
import { achievements, skillGroups } from '../../data/portfolio';
import { SectionShell } from '../SectionShell';

const radarPoints = [
  [50, 5],
  [84, 28],
  [92, 68],
  [67, 94],
  [33, 94],
  [8, 68],
  [16, 28],
];

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Moon"
      title="Energy crystals of the skill constellation"
      description="The skills bay is organised like a lunar laboratory: bright, modular, and tuned for shipping real software with clarity and confidence."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <h3 className="text-xl font-semibold text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span key={item} className="skill-chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="space-y-8">
          <div className="glass-panel p-7">
            <h3 className="text-2xl font-semibold text-white">Mission Radar</h3>
            <div className="mt-6 flex justify-center">
              <svg viewBox="0 0 100 100" className="h-72 w-72">
                <defs>
                  <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                {[15, 30, 45].map((radius) => (
                  <circle key={radius} cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" />
                ))}
                {Array.from({ length: 7 }, (_, index) => (
                  <line
                    key={index}
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos((index / 7) * Math.PI * 2 - Math.PI / 2) * 45}
                    y2={50 + Math.sin((index / 7) * Math.PI * 2 - Math.PI / 2) * 45}
                    stroke="rgba(255,255,255,0.12)"
                  />
                ))}
                <polygon
                  points={radarPoints.map(([x, y]) => `${x},${y}`).join(' ')}
                  fill="url(#radarGradient)"
                  fillOpacity="0.35"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                />
                {radarPoints.map(([x, y], index) => (
                  <circle key={index} cx={x} cy={y} r="2.1" fill="#fff" />
                ))}
              </svg>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="glass-panel p-5">
                <p className="text-4xl font-semibold text-white">{achievement.value}+</p>
                <p className="mt-2 text-slate-300">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
