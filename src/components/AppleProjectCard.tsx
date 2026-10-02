import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SpotlightCard from './SpotlightCard';

type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
};

type AppleProjectCardProps = {
  project: Project;
  index: number;
  onSelect: () => void;
};

export default function AppleProjectCard({ project, index, onSelect }: AppleProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked scaling from 0.94 to 1.0 and fade in
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0.75, 1]);

  return (
    <div ref={cardRef}>
      <motion.div
        style={shouldReduceMotion ? undefined : { scale: cardScale, opacity: cardOpacity }}
        className="transform-gpu will-change-[transform,opacity]"
        transition={{ delay: index * 0.1 }}
      >
        <SpotlightCard
          onClick={onSelect}
          className="group flex h-full cursor-pointer flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(79,70,229,0.14)] dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] active:scale-[0.98]"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-200">
                {project.category}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 transition-all duration-200 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:group-hover:border-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white group-hover:translate-x-0.5">
                <FiArrowRight size={14} />
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-200">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
          </div>

          <div className="mt-6 border-t border-slate-200/80 dark:border-white/10 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
