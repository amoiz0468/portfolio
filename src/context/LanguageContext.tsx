import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, Translations, translations } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANG_STORAGE_KEY = 'moiz_portfolio_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    // Check saved language or browser preference
    const stored = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (stored === 'en' || stored === 'fr') {
      setLangState(stored);
      applyLang(stored);
    } else {
      // Auto-detect browser language if French
      const browserLang = navigator.language?.toLowerCase() || '';
      const initial: Language = browserLang.startsWith('fr') ? 'fr' : 'en';
      setLangState(initial);
      applyLang(initial);
    }
  }, []);

  const applyLang = (activeLang: Language) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = activeLang;
    }
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      // Ignore quota / security restrictions
    }
    applyLang(newLang);
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'en',
      setLang: () => {},
      toggleLang: () => {},
      t: translations.en,
    };
  }
  return context;
}
