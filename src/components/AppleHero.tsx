import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  FiArrowRight,
  FiChevronDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiMessageSquare,
} from 'react-icons/fi';
import SpotlightCard from './SpotlightCard';
import { profile } from '../data/portfolio';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

export default function AppleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll-linked scale down and fade out (applied only on desktop where columns are side-by-side)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[95vh] w-full">
      <motion.section
        id="overview"
        style={shouldReduceMotion || isMobile ? undefined : { scale: heroScale, opacity: heroOpacity }}
        className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Headlines & Call to Actions */}
          <div>
            {/* Top Available Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 shadow-inner backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Available for Web &bull; AI &bull; DevOps Roles</span>
            </motion.div>

            {/* Main Fluid Tight Headline (Apple style) */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: APPLE_EASE }}
              className="mt-8 text-[clamp(2.75rem,6.5vw+1rem,5.6rem)] font-black leading-[0.95] tracking-[-0.04em] text-white"
            >
              Engineering
              <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-200 bg-clip-text text-transparent">
                Intelligence.
              </span>
              <span className="block text-slate-400">Architecting Scale.</span>
            </motion.h1>

            {/* Subtitle / Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: APPLE_EASE }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              {profile.summary}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: APPLE_EASE }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_45px_rgba(99,102,241,0.6)] active:scale-95"
                >
                  <span>Get in Touch</span>
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <a href="#projects">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-xl hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-95"
                >
                  View Inventions
                </motion.button>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-chat'));
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-semibold text-indigo-300 backdrop-blur-xl hover:bg-indigo-500/20 hover:text-white active:scale-95"
                >
                  <FiMessageSquare /> Ask My AI
                </motion.div>
              </button>
            </motion.div>

            {/* Quick Contact Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: APPLE_EASE }}
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-slate-400"
            >
              <span className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 sm:px-3.5 sm:py-1.5">
                <FiMapPin className="text-indigo-400" /> {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 sm:px-3.5 sm:py-1.5 transition hover:text-white"
              >
                <FiMail className="text-indigo-400" /> {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 sm:px-3.5 sm:py-1.5 transition hover:text-white"
              >
                <FiPhone className="text-indigo-400" /> {profile.phone}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Apple-Style Spotlight Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: APPLE_EASE }}
          >
            <SpotlightCard className="mx-auto w-full max-w-[500px] p-4 sm:p-7">
              {/* Top Bar Indicators */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  EPITECH Paris MSc IT
                </span>
              </div>

              {/* Profile Image & Highlights - Horizontal on mobile, Grid on desktop */}
              <div className="mt-4 sm:mt-6 flex flex-row items-center gap-4 sm:grid sm:grid-cols-[160px_1fr] sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative h-20 w-20 sm:h-auto sm:w-full sm:aspect-[4/5] sm:max-w-[160px] shrink-0 overflow-hidden rounded-2xl sm:rounded-[1.8rem] border border-white/20 bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                >
                  <Image
                    src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                    alt="Muhammad Abdul Moiz"
                    fill
                    sizes="(max-width: 640px) 80px, 160px"
                    className="object-cover object-[center_18%]"
                    priority
                  />
                </motion.div>

                <div className="space-y-1.5 sm:space-y-3 min-w-0">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white truncate">
                      Muhammad Abdul Moiz
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-300">
                      ML &bull; GenAI &bull; DevOps
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-300 hidden sm:block">
                    Bridging high-performance machine learning models, modern web microservices, and automated cloud operations.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5 sm:pt-1">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-200">
                      Paris, France
                    </span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="mt-6 space-y-2.5 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Core Focus</span>
                  <span className="font-semibold text-white">GenAI Pipelines & SaaS Systems</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Primary Stack</span>
                  <span className="font-semibold text-white">Python / FastAPI / Docker / AWS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Role</span>
                  <span className="font-semibold text-white">EPITECH Paris (Pedagogical Asst.)</span>
                </div>
              </div>

              {/* Social Quick Bar */}
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  <FiLinkedin /> LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  <FiGithub /> GitHub
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#stats"
            aria-label="Scroll down to explore"
            className="flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-white"
          >
            <span>Explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiChevronDown size={18} />
            </motion.div>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
