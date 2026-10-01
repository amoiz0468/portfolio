import { useRef, ReactNode, MouseEvent } from 'react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
};

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.16)',
  onClick,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotlightRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(550px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent ${
        className.includes('p-') ? '' : 'p-4 sm:p-7'
      } shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-indigo-400/40 transform-gpu ${className}`}
    >
      {/* High-speed Direct DOM Spotlight Layer (Zero React component re-render overhead) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 will-change-[background,opacity]"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
