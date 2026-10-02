import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiActivity,
  FiLayers,
  FiMail,
  FiMessageSquare,
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

type NavTab = {
  id: string;
  label: string;
  href: string;
  icon: typeof FiHome;
  isSpecial?: boolean;
};

export default function MobileBottomNav() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { t } = useLanguage();

  const tabs: NavTab[] = [
    { id: 'overview', label: t.mobileNav.home, href: '/#overview', icon: FiHome },
    { id: 'milestones', label: t.mobileNav.impact, href: '/#milestones', icon: FiActivity },
    { id: 'chat', label: t.mobileNav.aiTwin, href: '#chat', icon: FiMessageSquare, isSpecial: true },
    { id: 'projects', label: t.mobileNav.projects, href: '/#projects', icon: FiLayers },
    { id: 'contact', label: t.mobileNav.contact, href: '/contact', icon: FiMail },
  ];

  // Auto-detect active section on scroll
  useEffect(() => {
    if (router.pathname === '/contact') {
      setActiveTab('contact');
      return;
    }
    if (router.pathname === '/about') {
      setActiveTab('overview');
      return;
    }

    const handleScroll = () => {
      // Determine active section on homepage
      const sections = ['contact', 'projects', 'milestones', 'overview'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router.pathname]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: NavTab) => {
    if (tab.isSpecial) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-chat'));
      return;
    }

    if (tab.href.startsWith('/#') || tab.href.startsWith('#')) {
      const id = tab.href.replace('/#', '#');
      if (router.pathname === '/') {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el as HTMLElement, { offset: -60 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setActiveTab(tab.id);
        return;
      }
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none pb-[max(env(safe-area-inset-bottom),0.6rem)] pt-1 px-3"
    >
      <div className="mx-auto max-w-md pointer-events-auto">
        <div className="relative flex items-center justify-around rounded-full border border-slate-200/90 bg-white/92 px-2 py-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl ring-1 ring-slate-200/50 dark:border-white/15 dark:bg-black/85 dark:shadow-[0_-8px_30px_rgba(0,0,0,0.7)] dark:ring-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            if (tab.isSpecial) {
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                  aria-label="Open AI Assistant"
                  className="relative -top-2 flex flex-col items-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border border-indigo-400/50 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.55)] backdrop-blur-xl"
                  >
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white dark:border-slate-950 bg-emerald-400" />
                    </span>
                    <Icon size={18} />
                  </motion.div>
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                    {tab.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={(e) => handleTabClick(e, tab)}
                className="relative flex flex-col items-center py-1 px-2.5 transition-colors"
              >
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className={`flex h-6 w-6 items-center justify-center transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-300'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon size={17} />
                </motion.div>
                <span
                  className={`text-[9px] font-semibold tracking-wider transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-white font-bold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="mobileNavActiveDot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,1)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
