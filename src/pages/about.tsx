import Head from 'next/head';
import { FiBookOpen, FiCompass, FiGlobe, FiHeart } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import SpotlightCard from '../components/SpotlightCard';
import { education, profile, passions } from '../data/portfolio';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Muhammad Abdul Moiz</title>
        <meta
          name="description"
          content="About Muhammad Abdul Moiz — software and machine learning engineer focused on AI systems, cloud-native products, delivery leadership, and personal passions."
        />
      </Head>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="Profile Overview"
            eyebrowIcon={<FiCompass />}
            title="Engineering with product, leadership, and operational depth"
            subtitle="Bridging high-performance machine learning models, modern web microservices, and automated cloud operations."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent p-8 shadow-2xl backdrop-blur-md transform-gpu sm:p-10">
            <p className="text-lg leading-relaxed text-slate-200 sm:text-xl">
              {profile.summary}
            </p>
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              I work at the intersection of software engineering, cloud infrastructure, and applied AI. My experience spans full-stack development,
              DevOps automation, containerized deployment workflows, and GenAI production systems that combine LLM reasoning with structured, real-world data pipelines.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 shadow-xl backdrop-blur-md transform-gpu">
              <div>
                <SectionTitle
                  eyebrow="Academic Background"
                  eyebrowIcon={<FiBookOpen />}
                  title="Education"
                />
                <div className="mt-8 space-y-4">
                  {education.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-indigo-400/40"
                    >
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.school}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                        {item.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 shadow-xl backdrop-blur-md transform-gpu">
              <div>
                <SectionTitle
                  eyebrow="Core Principles"
                  eyebrowIcon={<FiGlobe />}
                  title="What I Value"
                />
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    'Rigorous engineering',
                    'Problem-solving',
                    'Team leadership',
                    'Autonomous execution',
                    'Technical vulgarization',
                    'Agile delivery',
                  ].map((value) => (
                    <div
                      key={value}
                      className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs font-medium text-slate-200 transition hover:border-indigo-400/40"
                    >
                      {value}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                    Spoken Languages
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-300">
                    <li>English: C1 (Fluent / Professional & Technical)</li>
                    <li>French: B1 (Intermediate / Working Proficiency)</li>
                    <li>Urdu: Native</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Passions, Hobbies & Life Beyond Code */}
        <div className="mt-20">
          <Reveal>
            <SectionTitle
              eyebrow="Passions & Hobbies"
              eyebrowIcon={<FiHeart />}
              title="Life Beyond Code"
              subtitle="Personal pursuits that drive curiosity, discipline, creativity, and balanced focus."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {passions.map((passion, pIdx) => (
              <Reveal key={passion.title} delay={pIdx * 0.06}>
                <SpotlightCard className="flex h-full flex-col justify-between transition hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                        {passion.tag}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        0{pIdx + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-white">
                      {passion.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-indigo-200/80">
                      {passion.subtitle}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-slate-300">
                      {passion.description}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
