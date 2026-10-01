import { motion } from 'framer-motion';
import { FiTerminal } from 'react-icons/fi';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import SpotlightCard from './SpotlightCard';
import { skillGroups, languages, values } from '../data/portfolio';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AppleSkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
      <Reveal>
        <SectionTitle
          eyebrow="Skill Ecosystem"
          eyebrowIcon={<FiTerminal />}
          title="Modern technologies, proven in production"
          subtitle="Specialized in asynchronous Python APIs, deep learning, containerized workflows, and cloud deployments."
        />
      </Reveal>

      {/* 4 Core Domain Cards */}
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, groupIdx) => (
          <Reveal key={group.title} delay={groupIdx * 0.08}>
            <SpotlightCard className="group flex h-full flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                    Domain {groupIdx + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-indigo-400 transition group-hover:scale-125" />
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{group.title}</h3>

                {/* Staggered Pills */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      variants={itemVariants}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-indigo-400/40 hover:bg-indigo-500/15 hover:text-white"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-[11px] font-medium text-slate-400">
                Production vetted
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      {/* Languages & Values Mini-Bento */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Reveal delay={0.1}>
          <SpotlightCard>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Spoken Languages
            </span>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {languages.map((l) => (
                <div
                  key={l.language}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center transition hover:border-indigo-400/30"
                >
                  <p className="text-base font-bold text-white">{l.language}</p>
                  <p className="mt-1 text-xs font-semibold text-indigo-300">{l.level}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{l.proficiency}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.16}>
          <SpotlightCard>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Engineering Values
            </span>
            <div className="mt-5 flex flex-wrap gap-2">
              {values.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-colors duration-200 hover:border-indigo-400/30"
                >
                  {v}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
