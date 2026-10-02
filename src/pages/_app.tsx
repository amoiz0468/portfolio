import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortfolioChat from '../components/PortfolioChat';
import MobileBottomNav from '../components/MobileBottomNav';

export default function App({ Component, pageProps, router }: AppProps & { router: { route: string } }) {
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // On mobile touch devices, bypass virtual scrolling so the OS handles 100% native 120Hz momentum scrolling
    const isMobileTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768;
    if (isMobileTouch) return;

    // Initialize Lenis smooth scroll tuned for 120Hz ProMotion (MacBook Pro M4)
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    // Attach to window for global access
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept anchor clicks for smooth scrolling with offset
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      // Special handling for chat triggers
      if (href === '#chat' || href === '/#chat') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-chat'));
        return;
      }

      if (href.startsWith('/#')) {
        const id = href.replace('/#', '#');
        const targetEl = document.querySelector(id);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, { offset: -80 });
        }
      } else if (href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, { offset: -80 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#030712" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Moiz" />
        <meta name="application-name" content="Moiz" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 selection:text-white pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        {/* Native Mobile Bottom Navigation Bar */}
        <MobileBottomNav />
        {/* Global Floating Chat Bubble */}
        <PortfolioChat />
      </div>
    </>
  );
}
