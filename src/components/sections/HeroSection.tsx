import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';

type HeroSectionProps = {
  onOpenAssistant: () => void;
};

export function HeroSection({ onOpenAssistant }: HeroSectionProps) {
  const roles = useMemo(() => personalInfo.heroRoles, []);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="home" className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-10">
      <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8 }}
        >
          <p className="mb-5 text-xs uppercase tracking-[0.75em] text-cyan-300/80">Mission Cyolla</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-7xl">
            Hello, I&apos;m <span className="text-cyan-300">{personalInfo.name}</span>
          </h1>
          <div className="mt-6 h-10 overflow-hidden text-xl text-slate-200 sm:text-2xl">
            <motion.div
              key={roles[roleIndex]}
              initial={{ y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -34, opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {roles[roleIndex]}
            </motion.div>
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            A cinematic portfolio journey through software engineering, scalable product thinking,
            QA precision, and applied AI problem solving.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#about" className="button-primary">
              Launch Mission
              <FiArrowRight />
            </a>
            <a href="/Cyolla-Monthi-Menezes-Resume.txt" download className="button-secondary">
              Download Resume
              <FiDownload />
            </a>
            <button type="button" onClick={onOpenAssistant} className="button-secondary">
              Contact Mission Control
              <FiMail />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="glass-panel relative overflow-hidden p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.2),transparent_35%)]" />
          <motion.div
            className="astronaut-illustration"
            animate={{ y: [0, -14, 0], rotate: [-3, 2, -3] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="astronaut-cable" />
            <div className="astronaut-helmet">
              <div className="astronaut-visor" />
            </div>
            <div className="astronaut-body" />
            <div className="astronaut-arm astronaut-arm-left" />
            <div className="astronaut-arm astronaut-arm-right" />
            <div className="astronaut-leg astronaut-leg-left" />
            <div className="astronaut-leg astronaut-leg-right" />
          </motion.div>
          <div className="relative">
            <div className="mb-8 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              Launch sequence complete
            </div>
            <div className="space-y-5">
              {[
                'Nebula-grade product design intuition',
                'Production-minded full stack execution',
                'Testing discipline with QA awareness',
                'Curiosity for AI, ML, and emerging systems',
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                  <p className="text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
