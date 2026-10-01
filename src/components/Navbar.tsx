import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX, FiMessageSquare } from 'react-icons/fi';

const navItems = [
  { href: '/#overview', label: 'Overview' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#chat', label: 'AI Assistant', highlight: true },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll through Lenis & chat triggers
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/#chat' || href === '#chat') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-chat'));
      setMobileMenuOpen(false);
      return;
    }

    if (href.startsWith('/#') || href.startsWith('#')) {
      const id = href.replace('/#', '#');
      if (router.pathname === '/') {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el as HTMLElement, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Apple-style Scroll Progress Indicator */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        style={{ scaleX }}
      />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/[0.08] bg-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-[20px]'
            : 'border-b border-white/[0.04] bg-black/40 backdrop-blur-[16px]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-400/40 shadow-[0_0_16px_rgba(99,102,241,0.45)]"
            >
              <Image
                src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                alt="Muhammad Abdul Moiz"
                fill
                priority
                sizes="36px"
                className="object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-indigo-200">
                Muhammad Abdul Moiz
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Engineer &bull; Paris
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 backdrop-blur-xl md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  item.highlight
                    ? 'border border-indigo-500/30 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 hover:text-white'
                    : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.highlight && <FiMessageSquare className="text-[11px]" />}
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Social Icons & Contact CTA */}
          <div className="hidden items-center gap-2.5 sm:flex">
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="https://github.com/amoiz0468"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <FiGithub size={15} />
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="https://linkedin.com/in/moizghauri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <FiLinkedin size={15} />
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="mailto:amoiz0468@gmail.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <FiMail size={15} />
            </motion.a>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="ml-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-200 hover:from-indigo-400 hover:to-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
              >
                Hire Me
              </motion.button>
            </Link>
          </div>

          {/* Mobile Quick Action & Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/contact">
              <motion.button
                whileTap={{ scale: 0.93 }}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
              >
                Hire Me
              </motion.button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition-colors hover:text-white active:scale-95"
            >
              {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-white/10 bg-black/95 px-4 pb-6 pt-3 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    item.highlight
                      ? 'border border-indigo-500/30 bg-indigo-500/20 text-indigo-300'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.highlight && <FiMessageSquare />}
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/amoiz0468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 p-2 text-slate-300 hover:text-white"
                >
                  <FiGithub size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/moizghauri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 p-2 text-slate-300 hover:text-white"
                >
                  <FiLinkedin size={16} />
                </a>
                <a
                  href="mailto:amoiz0468@gmail.com"
                  className="rounded-lg border border-white/10 p-2 text-slate-300 hover:text-white"
                >
                  <FiMail size={16} />
                </a>
              </div>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="rounded-xl bg-indigo-500 px-4 py-2 text-xs font-semibold text-white">
                  Hire Me
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
