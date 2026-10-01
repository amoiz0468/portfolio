import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiCheckCircle, FiActivity } from 'react-icons/fi';
import { STORIES, StoryItem } from '../data/stories';

export { STORIES };
export type { StoryItem };

export default function AppleStickyStory() {
  const targetRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [mobileStepIndex, setMobileStepIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Track active chapter for sidebar highlights on desktop
  useEffect(() => {
    let lastIdx = 0;
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const stepFraction = 1 / STORIES.length;
      const currentIdx = Math.min(
        STORIES.length - 1,
        Math.floor(latest / stepFraction)
      );
      if (currentIdx !== lastIdx) {
        lastIdx = currentIdx;
        setActiveStepIndex(currentIdx);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Phase intervals for 5 chapters across [0, 1] on desktop
  const step1Opacity = useTransform(scrollYProgress, [0, 0.14, 0.20], [1, 1, 0]);
  const step1Scale = useTransform(scrollYProgress, [0, 0.14, 0.20], [1, 1, 0.94]);
  const step1Y = useTransform(scrollYProgress, [0, 0.14, 0.20], [0, 0, -25]);

  const step2Opacity = useTransform(scrollYProgress, [0.18, 0.24, 0.36, 0.42], [0, 1, 1, 0]);
  const step2Scale = useTransform(scrollYProgress, [0.18, 0.24, 0.36, 0.42], [0.94, 1, 1, 0.94]);
  const step2Y = useTransform(scrollYProgress, [0.18, 0.24, 0.36, 0.42], [25, 0, 0, -25]);

  const step3Opacity = useTransform(scrollYProgress, [0.40, 0.46, 0.58, 0.64], [0, 1, 1, 0]);
  const step3Scale = useTransform(scrollYProgress, [0.40, 0.46, 0.58, 0.64], [0.94, 1, 1, 0.94]);
  const step3Y = useTransform(scrollYProgress, [0.40, 0.46, 0.58, 0.64], [25, 0, 0, -25]);

  const step4Opacity = useTransform(scrollYProgress, [0.62, 0.68, 0.80, 0.86], [0, 1, 1, 0]);
  const step4Scale = useTransform(scrollYProgress, [0.62, 0.68, 0.80, 0.86], [0.94, 1, 1, 0.94]);
  const step4Y = useTransform(scrollYProgress, [0.62, 0.68, 0.80, 0.86], [25, 0, 0, -25]);

  const step5Opacity = useTransform(scrollYProgress, [0.84, 0.90, 1], [0, 1, 1]);
  const step5Scale = useTransform(scrollYProgress, [0.84, 0.90, 1], [0.94, 1, 1]);
  const step5Y = useTransform(scrollYProgress, [0.84, 0.90, 1], [25, 0, 0]);

  // Overall scrub progress line height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const stepMotionProps = [
    { opacity: step1Opacity, scale: step1Scale, y: step1Y },
    { opacity: step2Opacity, scale: step2Scale, y: step2Y },
    { opacity: step3Opacity, scale: step3Scale, y: step3Y },
    { opacity: step4Opacity, scale: step4Scale, y: step4Y },
    { opacity: step5Opacity, scale: step5Scale, y: step5Y },
  ];

  // Jump to step on desktop
  const handleJumpToStep = (index: number) => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const sectionHeight = targetRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionStart + (index / (STORIES.length - 1)) * sectionHeight;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll);
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // Scroll to step on mobile carousel
  const scrollToMobileStep = (index: number) => {
    setMobileStepIndex(index);
    if (!mobileCarouselRef.current) return;
    const container = mobileCarouselRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  const handleMobileScroll = () => {
    if (!mobileCarouselRef.current) return;
    const container = mobileCarouselRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < STORIES.length && newIndex !== mobileStepIndex) {
      setMobileStepIndex(newIndex);
    }
  };

  return (
    <section id="milestones" className="relative w-full bg-black">
      {/* ======================================================== */}
      {/* 1. MOBILE & TABLET APP-FIRST EXPERIENCE (lg:hidden) */}
      {/* ======================================================== */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-xl">
          {/* Header */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              <FiActivity size={13} className="animate-pulse" />
              <span>The Engineering Experience</span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Built for impact.
              <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-200 bg-clip-text text-transparent">
                Proven in production.
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
              Swipe through the 5 milestones defining systems depth, from applied GenAI to mentorship.
            </p>
          </div>

          {/* Interactive Mobile Segmented Pill Bar */}
          <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {STORIES.map((s, idx) => {
              const isActive = mobileStepIndex === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => scrollToMobileStep(idx)}
                  className={`relative shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'border border-indigo-400/50 bg-indigo-500/25 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono text-indigo-300 mr-1">{s.step}</span>
                  <span>{s.eyebrow.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Snap Card Deck (Silky 120Hz native touch momentum) */}
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            className="mt-6 -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 pt-1 touch-pan-x"
          >
            {STORIES.map((story, idx) => {
              const Icon = story.icon;
              const isActive = mobileStepIndex === idx;

              return (
                <div
                  key={story.step}
                  className={`w-[86vw] max-w-[380px] shrink-0 snap-center rounded-[1.75rem] border bg-gradient-to-b from-[#0e1426] via-[#0a0f1d] to-[#060a14] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'border-indigo-400/50 shadow-[0_0_35px_rgba(99,102,241,0.22)]'
                      : 'border-white/10'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon + Eyebrow + Live Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/40">
                          <Icon size={17} />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
                          {story.eyebrow}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${story.badgeColor}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                          {story.badge}
                        </span>
                        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-200">
                          {story.step}/05
                        </span>
                      </div>
                    </div>

                    {/* Headline & Subtitle */}
                    <h3 className="mt-3 text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
                      {story.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-indigo-200">
                      {story.subtitle}
                    </p>

                    {/* Description Paragraph */}
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {story.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-3 space-y-1.5">
                      {story.highlights.slice(0, 2).map((h) => (
                        <div key={h} className="flex items-start gap-2 text-xs leading-normal text-slate-200">
                          <span className="mt-0.5 text-indigo-400 shrink-0">
                            <FiCheckCircle size={13} />
                          </span>
                          <span className="line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Metric & Tech Stack Box (Fixed & guaranteed not to overflow) */}
                  <div className="mt-5 border-t border-white/10 pt-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="shrink-0">
                        <span className="font-mono text-2xl font-black tracking-tight text-white block">
                          {story.metric}
                        </span>
                        <p className="text-[10px] text-slate-400 line-clamp-1 max-w-[140px]">
                          {story.metricLabel}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 justify-end max-w-[180px]">
                        {story.stack.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                          >
                            {item}
                          </span>
                        ))}
                        {story.stack.length > 3 && (
                          <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-slate-400">
                            +{story.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {STORIES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToMobileStep(idx)}
                aria-label={`Jump to Milestone ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  mobileStepIndex === idx
                    ? 'w-6 bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,1)]'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP STICKY SCRUBBED STORY (hidden lg:block) */}
      {/* ======================================================== */}
      <div ref={targetRef} className="hidden lg:block relative h-[450vh]">
        <div className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden px-8">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center transform-gpu">
            <div className="h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.2)_0%,rgba(139,92,246,0.08)_45%,transparent_70%)] transform-gpu" />
            <div className="h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,rgba(168,85,247,0.02)_45%,transparent_70%)]" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left Column: Progress Indicator & Step Navigation */}
            <div className="flex flex-col justify-between py-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  <FiActivity size={13} className="animate-pulse" />
                  <span>The Engineering Experience</span>
                </div>

                <h2 className="mt-6 text-[clamp(2.2rem,3.8vw+0.5rem,3.6rem)] font-black tracking-[-0.035em] leading-[1.05] text-white">
                  Built for impact.
                  <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-200 bg-clip-text text-transparent">
                    Proven in production.
                  </span>
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                  Scroll to experience the 5 engineering milestones that define Muhammad Abdul Moiz&apos;s capabilities, from applied GenAI to systems mentorship.
                </p>
              </div>

              {/* Vertical Scroll Scrub Track with 5 Interactive Chapters & Morphing Highlight */}
              <div className="mt-10 flex items-center gap-6">
                <div className="relative h-64 w-1 rounded-full bg-white/10">
                  <motion.div
                    style={{ height: progressHeight }}
                    className="w-full rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-amber-400 shadow-[0_0_16px_rgba(99,102,241,0.85)]"
                  />
                </div>

                <div className="flex flex-col gap-3.5 text-xs font-semibold uppercase tracking-[0.16em]">
                  {STORIES.map((s, idx) => {
                    const isActive = activeStepIndex === idx;
                    return (
                      <button
                        key={s.step}
                        onClick={() => handleJumpToStep(idx)}
                        className={`relative flex items-center gap-3 rounded-xl px-3 py-1.5 text-left transition-all duration-300 ${
                          isActive
                            ? 'text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-xl border border-indigo-400/30 bg-indigo-500/15" />
                        )}

                        <span
                          className={`relative z-10 font-mono transition-colors duration-200 ${
                            isActive
                              ? 'font-bold text-indigo-300'
                              : 'text-slate-600'
                          }`}
                        >
                          {s.step}
                        </span>
                        <span className="relative z-10 line-clamp-1">{s.eyebrow}</span>
                        {isActive && (
                          <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,1)] animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Layered Sticky Story Cards with High-Performance GPU Compositing */}
            <div className="relative h-[580px] w-full">
              {STORIES.map((story, idx) => {
                const Icon = story.icon;
                const motionStyle = shouldReduceMotion
                  ? undefined
                  : {
                      opacity: stepMotionProps[idx].opacity,
                      scale: stepMotionProps[idx].scale,
                      y: stepMotionProps[idx].y,
                    };

                const isActive = activeStepIndex === idx;
                const isNearby = Math.abs(activeStepIndex - idx) <= 1;

                return (
                  <motion.div
                    key={story.step}
                    style={{
                      ...motionStyle,
                      visibility: isNearby ? 'visible' : 'hidden',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] border bg-[#0a0f1d] p-9 shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-colors duration-200 transform-gpu will-change-[transform,opacity] ${
                      isActive
                        ? 'border-indigo-400/40 shadow-[0_0_40px_rgba(99,102,241,0.18)]'
                        : 'border-white/10'
                    }`}
                  >
                    <div>
                      {/* Header Row: Eyebrow + Live Badge + Step Counter */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/40">
                            <Icon size={19} />
                          </span>
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                              {story.eyebrow}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${story.badgeColor}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                            {story.badge}
                          </span>
                          <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-0.5 text-xs font-mono font-bold text-indigo-200">
                            {story.step} / 05
                          </span>
                        </div>
                      </div>

                      {/* Headline & Subtitle */}
                      <h3 className="mt-4 text-3xl font-black tracking-tight text-white leading-tight">
                        {story.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-indigo-200">
                        {story.subtitle}
                      </p>

                      {/* Description Paragraph */}
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {story.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 space-y-2">
                        {story.highlights.map((h) => (
                          <div
                            key={h}
                            className="flex items-start gap-2.5 text-xs leading-normal text-slate-200"
                          >
                            <span className="mt-0.5 text-indigo-400 shrink-0">
                              <FiCheckCircle size={13} />
                            </span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Specs & Signature Metric */}
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex flex-row items-center justify-between gap-4">
                        <div className="shrink-0">
                          <motion.span
                            animate={isActive ? { scale: [0.96, 1] } : {}}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="font-mono text-4xl font-black tracking-tight text-white"
                          >
                            {story.metric}
                          </motion.span>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {story.metricLabel}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 justify-end max-w-xs">
                          {story.stack.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:border-indigo-400/40 hover:text-white"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
