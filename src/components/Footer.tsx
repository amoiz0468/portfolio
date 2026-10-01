import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-28 border-t border-white/[0.08] bg-black/60 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          {/* Brand & Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <Image
                  src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                  alt="Muhammad Abdul Moiz"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="text-base font-bold text-white">Muhammad Abdul Moiz</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Software & Machine Learning Engineer based in Paris. Focused on production GenAI pipelines, high-throughput backend services, and automated DevOps infrastructure.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Navigation
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-slate-300">
              <Link href="/#overview" className="transition hover:text-white">Overview</Link>
              <Link href="/#projects" className="transition hover:text-white">Selected Projects</Link>
              <Link href="/#experience" className="transition hover:text-white">Experience Timeline</Link>
              <Link href="/#skills" className="transition hover:text-white">Technical Ecosystem</Link>
              <Link
                href="/#chat"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-chat'));
                  }
                }}
                className="text-indigo-400 transition hover:text-indigo-300"
              >
                AI Assistant
              </Link>
              <Link href="/about" className="transition hover:text-white">About Moiz</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Direct Contact
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <a
                href="mailto:amoiz0468@gmail.com"
                className="flex items-center gap-2.5 transition hover:text-white"
              >
                <FiMail className="text-indigo-400" size={15} /> amoiz0468@gmail.com
              </a>
              <a
                href="tel:+33759247911"
                className="flex items-center gap-2.5 transition hover:text-white"
              >
                <FiPhone className="text-indigo-400" size={15} /> +33 7 59 24 79 11
              </a>
              <a
                href="https://linkedin.com/in/moizghauri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition hover:text-white"
              >
                <FiLinkedin className="text-indigo-400" size={15} /> linkedin.com/in/moizghauri
              </a>
              <a
                href="https://github.com/amoiz0468"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition hover:text-white"
              >
                <FiGithub className="text-indigo-400" size={15} /> github.com/amoiz0468
              </a>
            </div>

            {/* Back to top button */}
            <div className="mt-6">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <FiArrowUp size={13} /> Back to top
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
