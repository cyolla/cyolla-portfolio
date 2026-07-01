import { motion } from 'framer-motion';
import { certifications } from '../../data/portfolio';
import { SectionShell } from '../SectionShell';

export function CertificationsSection() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="Saturn"
      title="Certifications drifting through a bright ring system"
      description="The certification deck showcases continuous learning across software testing, cloud, cybersecurity, AI, and development tooling."
    >
      <div className="glass-panel overflow-hidden p-6">
        <motion.div
          className="flex gap-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        >
          {[...certifications, ...certifications].map((certificate, index) => (
            <article
              key={`${certificate}-${index}`}
              className="min-w-[20rem] rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-yellow-200/70">Certification</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{certificate}</h3>
            </article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
