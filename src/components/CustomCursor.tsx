import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const enter = () => setActive(true);
    const leave = () => setActive(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseenter', enter);
    window.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseenter', enter);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[80] hidden h-3 w-3 rounded-full bg-cyan-300 mix-blend-screen transition-transform duration-150 md:block"
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${active ? 1 : 0})`,
        }}
      />
      <div
        className="pointer-events-none fixed z-[79] hidden h-12 w-12 rounded-full border border-cyan-300/50 transition-transform duration-300 md:block"
        style={{
          transform: `translate3d(${position.x - 24}px, ${position.y - 24}px, 0) scale(${active ? 1 : 0})`,
          boxShadow: '0 0 30px rgba(34, 211, 238, 0.25)',
        }}
      />
    </>
  );
}
