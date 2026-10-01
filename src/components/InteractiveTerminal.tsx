import { useState, useEffect } from 'react';
import { FiTerminal, FiCheck, FiCpu, FiWifi } from 'react-icons/fi';
import { motion } from 'framer-motion';

const LOGS = [
  { time: '12:00:01', label: 'RUNTIME', text: 'Initializing high-throughput FastAPI & Celery workers', status: 'OK' },
  { time: '12:00:02', label: 'AI_PIPELINE', text: 'DoctorIQ OCR & OpenAI LLM extraction pipeline online', status: 'READY' },
  { time: '12:00:03', label: 'WEBSOCKET', text: 'Brackets Genie bi-directional stream router connected', status: 'ACTIVE' },
  { time: '12:00:04', label: 'CONTAINER', text: 'Docker multi-stage workloads verified on AWS / GCP', status: 'HEALTHY' },
  { time: '12:00:05', label: 'AVAILABILITY', text: 'Paris, France &bull; Open for Web, AI & DevOps opportunities', status: 'OPEN' },
];

export default function InteractiveTerminal() {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % LOGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/80 font-mono text-xs shadow-2xl backdrop-blur-2xl">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-400">
            system_telemetry.sh &mdash; bash
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Terminal Log Lines */}
      <div className="space-y-3 p-5 text-slate-300">
        {LOGS.map((log, index) => {
          const isCurrent = index === activeLine;
          return (
            <motion.div
              key={log.label}
              animate={{ opacity: isCurrent ? 1 : 0.6 }}
              className={`flex items-start justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors ${
                isCurrent ? 'bg-indigo-500/10 text-white' : ''
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
