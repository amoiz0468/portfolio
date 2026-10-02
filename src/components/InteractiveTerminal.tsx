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
    <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950 font-mono text-xs shadow-xl dark:border-white/15 dark:bg-black/90 dark:shadow-2xl">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-400">
            {t.telemetry.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.telemetry.live}</span>
        </div>
      </div>

      {/* Terminal Log Lines */}
      <div className="space-y-3 p-5 text-slate-300">
        {logs.map((log, index) => {
          const isCurrent = index === activeLine;
          return (
            <motion.div
              key={log.label}
              animate={{ opacity: isCurrent ? 1 : 0.6 }}
              className={`flex items-start justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors ${
                isCurrent ? 'bg-indigo-500/15 text-white' : ''
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-slate-500">{log.time}</span>
                <span className="font-semibold text-indigo-400">[{log.label}]</span>
                <span className="text-slate-200">{log.text}</span>
              </div>
              <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                {log.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
