import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiLayers } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

type ProjectModalProps = {
  open: boolean;
  title: string;
  description: string;
  stack: string[];
  onClose: () => void;
};

export default function ProjectModal({ open, title, description, stack, onClose }: ProjectModalProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl rounded-[2rem] border border-slate-200/90 bg-white/95 p-6 text-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur-2xl dark:border-white/15 dark:bg-slate-900 dark:text-white dark:shadow-[0_30px_90px_rgba(0,0,0,0.8)] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t.projectsSection.close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white"
              onClick={onClose}
            >
              <FiX size={18} />
            </motion.button>

            {/* Header Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                <FiLayers size={13} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                {t.projectsSection.modalTitle}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              {title}
            </h3>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-6 border-t border-slate-200/80 dark:border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t.projectsSection.modalTechTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                {t.projectsSection.close}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
