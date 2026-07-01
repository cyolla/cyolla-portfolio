import { motion } from 'framer-motion';

type LoadingScreenProps = {
  finished: boolean;
};

export function LoadingScreen({ finished }: LoadingScreenProps) {
  if (finished) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),_rgba(3,7,18,0.98)_55%)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.8em] text-cyan-300/80">Mission Cyolla</p>
        <div className="mb-6 flex items-center justify-center gap-4 text-4xl font-semibold text-white sm:text-6xl">
          {['3', '2', '1'].map((tick, index) => (
            <motion.span
              key={tick}
              initial={{ y: 20, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.45 }}
            >
              {tick}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="text-lg text-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Launch Mission
        </motion.p>
      </div>
    </motion.div>
  );
}
