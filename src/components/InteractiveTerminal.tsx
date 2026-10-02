import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function InteractiveTerminal() {
  const [activeLine, setActiveLine] = useState(0);
  const { t } = useLanguage();
  const logs = t.telemetry.logs;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % logs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [logs.length]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 font-mono text-xs shadow-lg shadow-slate-200/50 backdrop-blur-md transition-colors duration-200 dark:border-white/15 dark:bg-black/90 dark:shadow-2xl">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-100/90 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {t.telemetry.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span>{t.telemetry.live}</span>
        </div>
      </div>

      {/* Terminal Log Lines */}
      <div className="space-y-3 p-5 text-slate-700 dark:text-slate-300">
        {logs.map((log, index) => {
          const isCurrent = index === activeLine;
          return (
            <motion.div
              key={log.label}
              animate={{ opacity: isCurrent ? 1 : 0.65 }}
              className={`flex items-start justify-between gap-3 rounded-xl border px-2.5 py-1.5 transition-colors ${
                isCurrent
                  ? 'border-indigo-200/80 bg-indigo-50/90 text-slate-900 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-white'
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-slate-500 dark:text-slate-400">{log.time}</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">[{log.label}]</span>
                <span className="text-slate-800 dark:text-slate-200">{log.text}</span>
              </div>
              <span className="shrink-0 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:border-transparent dark:bg-white/10 dark:text-emerald-300">
                {log.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
