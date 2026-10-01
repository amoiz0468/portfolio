import Head from 'next/head';
import { useState } from 'react';
import {
  FiClock,
  FiCpu,
  FiCloud,
  FiCode,
  FiLayers,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiHeart,
} from 'react-icons/fi';
import ProjectModal from '../components/ProjectModal';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import SpotlightCard from '../components/SpotlightCard';
import AppleHero from '../components/AppleHero';
import AppleStickyStory from '../components/AppleStickyStory';
import AppleProjectCard from '../components/AppleProjectCard';
import AppleSkillsSection from '../components/AppleSkillsSection';
import InteractiveTerminal from '../components/InteractiveTerminal';
import {
  achievements,
  experience,
  profile,
  projects,
  stats,
  passions,
} from '../data/portfolio';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Categories for interactive filter
  const categories = ['All', 'AI & ML', 'DevOps & Cloud', 'Full-Stack'];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'AI & ML') return /medical|ai|ml|cv|benchmarking/i.test(p.category + p.title + p.stack.join(' '));
    if (activeCategory === 'DevOps & Cloud') return /devops|infrastructure|cloud|deployment/i.test(p.category + p.title + p.stack.join(' '));
    if (activeCategory === 'Full-Stack') return /platform|web|solidarity|conversational/i.test(p.category + p.title + p.stack.join(' '));
    return true;
  });

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FiClock className="text-indigo-400" size={20} />;
      case 1:
        return <FiCpu className="text-violet-400" size={20} />;
      case 2:
        return <FiCloud className="text-emerald-400" size={20} />;
      case 3:
        return <FiCode className="text-amber-400" size={20} />;
      default:
        return <FiLayers className="text-indigo-400" size={20} />;
    }
  };

  return (
    <>
      <Head>
        <title>{profile.name} | Software & Machine Learning Engineer</title>
        <meta
          name="description"
          content="Portfolio of Muhammad Abdul Moiz — Machine Learning Engineer, GenAI & MLOps specialist, Full-Stack and DevOps Engineer based in Paris."
        />
      </Head>

      {/* Global Background Ambient Glow Lights (High-Performance GPU Radial Gradients - Zero Gaussian Blur lag) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transform-gpu">
        <div className="absolute -left-[10%] top-[5%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,rgba(99,102,241,0.02)_50%,transparent_70%)]" />
        <div className="absolute right-[5%] top-[25%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.11)_0%,rgba(139,92,246,0.02)_50%,transparent_70%)]" />
        <div className="absolute bottom-[15%] left-[20%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,rgba(245,158,11,0.01)_50%,transparent_70%)]" />
      </div>

      <main className="relative z-10">
        {/* 1. HERO SECTION (Scale-down & fade on scroll) */}
        <AppleHero />

        {/* 2. STATS & METRICS (Apple Bento Grid - Compact Widget Glance on Mobile, 4 Across on Desktop) */}
        <section id="stats" className="content-auto border-y border-white/[0.08] bg-black/40 py-6 sm:py-20 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.08}>
                  <SpotlightCard className="text-left sm:text-center transition-all duration-300 hover:-translate-y-1.5 p-3 sm:p-7 rounded-[1.25rem] sm:rounded-[2rem] active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 ring-1 ring-white/10 text-xs sm:text-base text-indigo-400">
                        {getStatIcon(index)}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 sm:mt-5 text-xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 sm:mt-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-300 sm:text-slate-400 line-clamp-1 sm:line-clamp-none">
                      {stat.label}
                    </p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SCROLL-DRIVEN STICKY KEYNOTE STORY (The 3 Pillars) */}
        <AppleStickyStory />

        {/* 4. LIVE SYSTEM TELEMETRY (Interactive Experience Widget) */}
        <section className="content-auto mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <InteractiveTerminal />
          </Reveal>
        </section>

        {/* 5. SELECTED PROJECTS (Scroll-linked card scale 0.9 -> 1 & stagger) */}
        <section id="projects" className="content-auto mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Portfolio Gallery"
              eyebrowIcon={<FiLayers />}
              title="Selected Inventions & Deployments"
              subtitle="End-to-end architectures across Generative AI, cloud deployments, and scalable backend platforms."
            />
          </Reveal>

          {/* Interactive Category Filter Pills */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'border border-indigo-400/40 bg-indigo-500/25 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Staggered & Scroll-Linked Project Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <AppleProjectCard
                key={project.title}
                project={project}
                index={index}
                onSelect={() => {
                  const idx = projects.findIndex((p) => p.title === project.title);
                  setSelectedProject(idx >= 0 ? idx : index);
                }}
              />
            ))}
          </div>
        </section>

        {/* 6. SKILLS ECOSYSTEM (Staggered items reveal) */}
        <AppleSkillsSection />

        {/* 7. CAREER TIMELINE */}
        <section
          id="experience"
          className="content-auto border-y border-white/[0.08] bg-[linear-gradient(180deg,rgba(15,23,42,0.6),rgba(3,7,18,0.9))] py-28 text-white backdrop-blur-md"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle
                eyebrow="Career Timeline"
                eyebrowIcon={<FiTrendingUp />}
                title="Engineering depth and delivery leadership"
                subtitle="Hands-on experience in production environments, pedagogical training, and software architecture."
              />
            </Reveal>

            <div className="mt-16 space-y-8">
              {experience.map((item, index) => (
                <Reveal key={item.role} delay={index * 0.1}>
                  <SpotlightCard className="transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                          {item.company}
                        </span>
                        <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                          {item.role}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                          {item.period}
                        </span>
                        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200">
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-slate-200 sm:text-base">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. EDUCATION & HIGHLIGHTS */}
        <section className="content-auto mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <SpotlightCard className="flex h-full flex-col justify-between">
                <div>
                  <SectionTitle
                    eyebrow="Education"
                    eyebrowIcon={<FiBookOpen />}
                    title="Academic Foundation"
                  />
                  <div className="mt-8 space-y-4">
                    {[
                      {
                        title: 'Master of Science in Information Technology (MSc IT)',
                        school: 'EPITECH Paris (Paris, France)',
                        period: '2025 – 2027',
                        focus: 'Advanced software systems, distributed architecture, and technical leadership.',
                      },
                      {
                        title: 'Bachelor of Science in Computer Science (BSCS)',
                        school: 'FAST-NUCES',
                        period: '2020 – 2024',
                        focus: 'Data structures, algorithms, machine learning, and operating systems.',
                      },
                    ].map((edu) => (
                      <div
                        key={edu.title}
                        className="rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-indigo-400/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-bold text-white leading-snug">{edu.title}</p>
                          <span className="shrink-0 whitespace-nowrap rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300 shadow-sm">
                            {edu.period}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-300">{edu.school}</p>
                        <p className="mt-2 text-xs leading-relaxed text-slate-400">{edu.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.1}>
              <SpotlightCard className="flex h-full flex-col justify-between">
                <div>
                  <SectionTitle
                    eyebrow="Key Highlights"
                    eyebrowIcon={<FiAward />}
                    title="What I Bring"
                  />
                  <div className="mt-8 grid gap-4">
                    {achievements.map((item, idx) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-relaxed text-slate-200 transition hover:border-indigo-400/40"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 font-mono text-xs font-bold text-indigo-300">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* 9. PASSIONS & LIFE BEYOND CODE */}
        <section id="passions" className="content-auto border-t border-white/[0.08] bg-black/40 py-24 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionTitle
                align="center"
                eyebrow="Life Beyond Code"
                eyebrowIcon={<FiHeart />}
                title="Passions, Disciplines & Creative Pursuits"
                subtitle="The activities that fuel curiosity, structured thinking, physical resilience, and well-rounded perspective."
              />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {passions.map((passion, pIdx) => (
                <Reveal key={passion.title} delay={pIdx * 0.06}>
                  <SpotlightCard className="flex h-full flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
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

        {/* Project Inspection Modal */}
        {selectedProject !== null ? (
          <ProjectModal
            open={selectedProject !== null}
            title={projects[selectedProject].title}
            description={projects[selectedProject].description}
            stack={projects[selectedProject].stack}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </main>
    </>
  );
}
