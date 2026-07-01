import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function SectionShell({ id, eyebrow, title, description, children }: SectionShellProps) {
  return (
    <section id={id} className="relative mx-auto min-h-screen w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mb-14 max-w-3xl"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.6em] text-cyan-300/80">{eyebrow}</p>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">{title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p>
      </motion.div>
      {children}
    </section>
  );
}
