import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiCheck, FiLayers } from 'react-icons/fi';

type ProjectModalProps = {
  open: boolean;
  title: string;
  description: string;
  stack: string[];
  onClose: () => void;
};

export default function ProjectModal({ open, title, description, stack, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
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
            className="relative w-full max-w-2xl rounded-[2rem] border border-white/15 bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close project details"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              onClick={onClose}
            >
              <FiX size={18} />
            </motion.button>

            {/* Header Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                <FiLayers size={13} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                Architecture & Implementation
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
              {title}
            </h3>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Technologies & Architecture
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/10"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
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
                className="rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
