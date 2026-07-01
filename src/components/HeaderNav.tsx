import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type HeaderNavItem = {
  id: string;
  label: string;
};

type HeaderNavProps = {
  activeId: string;
  controls: ReactNode;
  items: HeaderNavItem[];
};

export function HeaderNav({ activeId, controls, items }: HeaderNavProps) {
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed left-4 right-4 top-4 z-50 hidden md:block xl:left-[22rem]">
      <div className="header-nav mx-auto flex w-full max-w-7xl items-center gap-4 rounded-[2rem] px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <button
            type="button"
            onClick={() => goTo('home')}
            className="shrink-0 text-sm font-semibold tracking-[0.32em] text-cyan-200"
          >
            MISSION CYOLLA
          </button>
          <nav className="header-links flex min-w-0 items-center gap-2 overflow-x-auto">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className="relative shrink-0 rounded-full px-4 py-2 text-sm text-slate-200 transition hover:text-white"
                >
                  {isActive && (
                    <motion.span
                      layoutId="header-nav-pill"
                      className="absolute inset-0 rounded-full border border-cyan-300/30 bg-cyan-300/10"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="header-controls flex shrink-0 items-center gap-2">{controls}</div>
      </div>
    </div>
  );
}
