import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

type Item = {
  id: string;
  label: string;
  subtitle: string;
  icon: IconType;
  color: string;
};

type OrbitalNavProps = {
  activeId: string;
  items: readonly Item[];
};

export function OrbitalNav({ activeId, items }: OrbitalNavProps) {
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="relative flex h-[32rem] w-[32rem] items-center justify-center">
          <div className="absolute h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.95),rgba(250,204,21,0.2)_55%,transparent_72%)] blur-sm" />
          <div className="absolute h-[26rem] w-[26rem] rounded-full border border-white/10" />
          <div className="absolute h-[18rem] w-[18rem] rounded-full border border-white/10" />
          <motion.div
            className="absolute h-[26rem] w-[26rem]"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {items.map((item, index) => {
              const angle = (index / items.length) * Math.PI * 2;
              const x = Math.cos(angle) * 208;
              const y = Math.sin(angle) * 208;
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                  aria-label={item.subtitle}
                >
                  <motion.div
                    className="grid h-16 w-16 place-items-center rounded-full border text-white backdrop-blur-xl"
                    animate={{
                      scale: isActive ? 1.14 : 1,
                      boxShadow: isActive
                        ? `0 0 35px ${item.color}`
                        : '0 0 12px rgba(148, 163, 184, 0.18)',
                    }}
                    style={{
                      borderColor: isActive ? item.color : 'rgba(255,255,255,0.18)',
                      background: isActive ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.58)',
                    }}
                  >
                    <item.icon />
                  </motion.div>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-40 xl:hidden">
        <div className="flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-slate-950/75 p-2 backdrop-blur-xl">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className="flex min-w-fit items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition"
                style={{
                  background: isActive ? 'rgba(79, 70, 229, 0.42)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? item.color : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                <item.icon />
                {item.subtitle}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
