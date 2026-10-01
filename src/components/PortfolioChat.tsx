import { FormEvent, useState, useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiRefreshCw, FiCopy, FiCheck, FiSend } from 'react-icons/fi';

// Inline lightweight SVGs (Icons & Logos)
function ChatBubbleIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      width="22"
      height="22"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function BriefcaseIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ActivityIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function TerminalIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function CloudIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function GraduationCapIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function TargetIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function HeartIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function AwardIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} width="14" height="14">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

type ChatMessage = {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: string;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: 'assistant',
    content: `Hello! I'm **Muhammad Abdul Moiz**'s AI twin.

Ask me anything about my production engineering background, DevOps Software Factory capabilities, or 8 featured inventions.

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? What are your passions and hobbies outside of work (cooking, travel, etc.)?
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).`,
  },
];

type SuggestedTopic = {
  label: string;
  query: string;
  icon: (props: { className?: string }) => ReactNode;
};

const SUGGESTED_TOPICS: SuggestedTopic[] = [
  { label: 'DevOps & Services', query: 'Do you have experiences of DevOps and what services do you offer as DevOps?', icon: CloudIcon },
  { label: 'Why Hire Moiz?', query: 'Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?', icon: AwardIcon },
  { label: 'Alternance & Hire', query: 'What is your current availability, alternance status, and location preference in Paris?', icon: TargetIcon },
  { label: 'Featured Projects', query: 'Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).', icon: ActivityIcon },
  { label: 'Passions & Hobbies', query: 'What are your passions and hobbies outside of work (cooking, travel, photography, etc.)?', icon: HeartIcon },
  { label: 'Experience & Roles', query: 'Tell me about your work experience and roles at Brackets and EPITECH Paris.', icon: BriefcaseIcon },
  { label: 'Core Skills & Stack', query: 'What are your core technical skills, programming languages, and tools?', icon: TerminalIcon },
  { label: 'EPITECH & Education', query: 'Tell me about your academic background at EPITECH Paris and FAST-NUCES.', icon: GraduationCapIcon },
];

/**
 * Renders an intelligent interactive question card button.
 * Clickable to instantly send that query to the AI representative.
 */
function renderQuestionCard(
  text: string,
  key: string | number,
  onPromptClick?: (query: string) => void
) {
  const isClickable = Boolean(onPromptClick);
  return (
    <button
      key={key}
      type="button"
      onClick={isClickable ? () => onPromptClick!(text) : undefined}
      className="group my-1 flex w-full items-center justify-between gap-3 rounded-xl border border-indigo-500/25 bg-gradient-to-r from-indigo-500/10 via-slate-900/80 to-purple-500/10 p-2.5 text-left transition-all duration-200 hover:border-indigo-400/60 hover:bg-indigo-500/20 hover:shadow-[0_0_18px_rgba(99,102,241,0.25)] active:scale-[0.99] cursor-pointer"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-[11px] font-bold text-indigo-300 ring-1 ring-indigo-400/30">
          ?
        </span>
        <span className="text-xs font-medium text-slate-200 transition group-hover:text-white line-clamp-2">
          {renderInlineStyles(text)}
        </span>
      </div>
      <span className="shrink-0 text-[10px] font-semibold text-indigo-400 opacity-80 transition-opacity group-hover:opacity-100 flex items-center gap-0.5">
        Ask &rarr;
      </span>
    </button>
  );
}

/**
 * Helper to render beautifully formatted Markdown text.
 * Informational bullet points and lists render cleanly as readable typography.
 * Only explicit suggestion prompts starting with '? ' render as interactive cards.
 * Contact links (mailto, tel, https) render as direct clickable hyperlinks.
 * Strictly without emojis.
 */
function FormattedText({
  content,
  onPromptClick,
}: {
  content: string;
  onPromptClick?: (query: string) => void;
}) {
  // Split into paragraphs / logical blocks
  const rawParagraphs = content.split(/\n{2,}/);

  return (
    <div className="space-y-3 text-xs leading-relaxed text-slate-200">
      {rawParagraphs.map((para, pIdx) => {
        const lines = para.split('\n').map((l) => l.trim()).filter(Boolean);

        // Explicit question prompt block (lines starting with '? ' or '- ? ')
        const isQuestionPromptBlock =
          lines.length > 0 &&
          lines.every((l) => l.startsWith('? ') || /^[-*]\s+\?\s+/.test(l));
        if (isQuestionPromptBlock) {
          return (
            <div key={pIdx} className="my-1.5 space-y-1.5">
              {lines.map((line, lIdx) => {
                const text = line.replace(/^(?:[-*]\s+)?\?\s+/, '').trim();
                return renderQuestionCard(text, lIdx, onPromptClick);
              })}
            </div>
          );
        }

        // Case 1: Pure bullet list block -> ALWAYS render as clean readable list items with direct links
        const isBulletList = lines.length > 0 && lines.every((l) => l.startsWith('- ') || l.startsWith('* '));
        if (isBulletList) {
          return (
            <div key={pIdx} className="my-1.5 space-y-1.5 pl-0.5">
              {lines.map((line, lIdx) => {
                const text = line.replace(/^[-*]\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
                    <div className="flex-1 leading-relaxed text-slate-200">
                      {renderInlineStyles(text)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // Case 2: Pure numbered list block -> render with step number badge chips (clean, non-clickable)
        const isNumberedList = lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l));
        if (isNumberedList) {
          return (
            <div key={pIdx} className="my-1.5 space-y-2 pl-0.5">
              {lines.map((line, lIdx) => {
                const match = line.match(/^(\d+)\.\s+(.*)/);
                const num = match ? match[1] : String(lIdx + 1);
                const text = match ? match[2] : line;
                return (
                  <div key={lIdx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 font-mono text-[10px] font-bold text-indigo-300 ring-1 ring-indigo-400/30">
                      {num}
                    </span>
                    <div className="flex-1 leading-relaxed text-slate-200">
                      {renderInlineStyles(text)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // Case 3: Mixed or paragraph content
        return (
          <div key={pIdx} className="space-y-2">
            {lines.map((line, lIdx) => {
              // Interactive question line inside mixed block
              if (line.startsWith('? ') || /^[-*]\s+\?\s+/.test(line)) {
                const text = line.replace(/^(?:[-*]\s+)?\?\s+/, '').trim();
                return renderQuestionCard(text, lIdx, onPromptClick);
              }

              // Section Header level 3
              if (line.startsWith('### ')) {
                return (
                  <div
                    key={lIdx}
                    className="flex items-center gap-2 border-b border-white/[0.08] pb-1 pt-1.5"
                  >
                    <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,1)]" />
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                      {line.replace(/^###\s+/, '')}
                    </h4>
                  </div>
                );
              }

              // Section Header level 2
              if (line.startsWith('## ')) {
                return (
                  <div
                    key={lIdx}
                    className="flex items-center gap-2 border-b border-white/[0.08] pb-1 pt-1.5"
                  >
                    <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,1)]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      {line.replace(/^##\s+/, '')}
                    </h3>
                  </div>
                );
              }

              // Italic Subtext
              if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                return (
                  <p key={lIdx} className="pl-0.5 text-[11px] font-medium italic text-indigo-300/80">
                    {renderInlineStyles(line.slice(1, -1))}
                  </p>
                );
              }

              // Standalone Bullet -> non-clickable clean readable item
              if (line.startsWith('- ') || line.startsWith('* ')) {
                const text = line.replace(/^[-*]\s+/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 py-0.5 pl-0.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
                    <div className="flex-1 leading-relaxed text-slate-200">
                      {renderInlineStyles(text)}
                    </div>
                  </div>
                );
              }

              // Standalone Numbered item -> non-clickable clean readable item
              const numMatch = line.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 py-0.5 pl-0.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 font-mono text-[10px] font-bold text-indigo-300 ring-1 ring-indigo-400/30">
                      {numMatch[1]}
                    </span>
                    <div className="flex-1 leading-relaxed text-slate-200">
                      {renderInlineStyles(numMatch[2])}
                    </div>
                  </div>
                );
              }

              // Regular paragraph line
              return (
                <p key={lIdx} className="leading-relaxed text-slate-200">
                  {renderInlineStyles(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineStyles(text: string) {
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const rawHref = linkMatch[2].trim();
      const isSafe = /^https?:\/\/|^mailto:|^tel:/i.test(rawHref);
      const safeHref = isSafe ? rawHref : '#';
      const isExternal = safeHref.startsWith('http') || safeHref.startsWith('mailto:') || safeHref.startsWith('tel:');
      return (
        <a
          key={i}
          href={safeHref}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="font-semibold text-indigo-300 underline decoration-indigo-400/40 underline-offset-2 transition hover:text-indigo-200"
        >
          {linkMatch[1]}
        </a>
      );
    }

    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          className="rounded-md border border-indigo-400/30 bg-indigo-950/60 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-indigo-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getTimeString = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  // Keep focus on input whenever chat opens or finishes formulating
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, isLoading]);

  // Global listener to open chat bubble from any CTA button or link
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    const checkHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#chat') {
        handleOpen();
      }
    };

    checkHash();
    window.addEventListener('open-chat', handleOpen);
    window.addEventListener('hashchange', checkHash);
    return () => {
      window.removeEventListener('open-chat', handleOpen);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
  };

  const sendMessage = async (questionOverride?: string) => {
    const nextQuestion = (questionOverride ?? input).trim();
    if (!nextQuestion || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: nextQuestion,
      timestamp: getTimeString(),
    };

    const nextMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    // Keep focus in textbox immediately so user doesn't lose cursor
    inputRef.current?.focus();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();
      const reply = data?.reply || 'I hit a small issue getting the answer. Feel free to rephrase or ask again.';

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: reply,
          timestamp: getTimeString(),
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'I am having trouble connecting right now, but feel free to explore my portfolio or reach me directly at **amoiz0468@gmail.com**.',
          timestamp: getTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating Chat Bubble Launcher (Bottom Right, elevated above mobile tab bar on mobile) */}
      <AnimatePresence>
        {!isOpen && (
          <div id="chat" className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
            {/* Floating Invitation Teaser Pill */}
            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-900/90 py-2 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:border-indigo-400/50 hover:bg-slate-800/90 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition">
                Chat with Moiz AI
              </span>
            </motion.button>

            {/* Circular Chat Bubble Trigger */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open AI Portfolio Chat"
              className="group relative flex h-14 w-14 sm:h-[58px] sm:w-[58px] items-center justify-center rounded-full border border-indigo-400/40 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-[0_10px_35px_rgba(99,102,241,0.55)] backdrop-blur-xl"
            >
              {/* Live pulsing online indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
              </span>

              <ChatBubbleIcon className="transition-transform duration-300 group-hover:scale-110" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Expanded Floating Glass Chat Window (Native Sheet on Mobile, Anchored on Desktop) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Sheet Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm sm:hidden pointer-events-auto"
            />

            <div className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 flex justify-center sm:block pointer-events-none">
              <motion.div
                data-lenis-prevent="true"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto relative flex h-[88dvh] sm:h-[590px] w-full sm:w-[420px] max-w-[420px] max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100vh-5rem)] flex-col rounded-t-[2rem] sm:rounded-[2.2rem] border-t border-x sm:border border-white/20 bg-[#090d16] p-3.5 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transform-gpu will-change-[transform,opacity] pb-[max(env(safe-area-inset-bottom),1rem)]"
              >
                {/* Mobile Drag Handle Bar */}
                <div
                  onClick={() => setIsOpen(false)}
                  className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-white/25 sm:hidden cursor-pointer active:bg-white/40"
                  title="Close chat"
                />

                {/* Header Bar */}
                <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-indigo-400/40">
                    <Image
                      src="https://portfolio-image-moiz.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-09-25+at+5.49.35+PM.jpeg"
                      alt="Muhammad Abdul Moiz"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-white">Moiz AI Twin</p>
                      <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-300">
                        AI
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online &bull; Instant Answers
                    </span>
                  </div>
                </div>

                {/* Header Controls (Reset & Close/Minimize) */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetChat}
                    title="Reset chat"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <FiRefreshCw size={13} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Minimize chat"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <FiMinus size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close chat"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>

              {/* Messages Scroll Area (Lenis prevented so user can smoothly scroll history) */}
              <div
                ref={scrollRef}
                data-lenis-prevent="true"
                className="flex-1 space-y-3 overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-black/50 p-3.5 scrollbar-thin scrollbar-thumb-white/20 touch-pan-y"
              >
                {messages.map((message, index) => {
                  const isAssistant = message.role === 'assistant';

                  return (
                    <div
                      key={`${message.role}-${index}`}
                      className={`flex flex-col gap-1.5 ${
                        isAssistant ? 'items-start' : 'items-end'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 px-1 text-[10px] font-medium text-slate-400">
                        {isAssistant && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)] animate-pulse" />
                        )}
                        <span className={isAssistant ? 'font-semibold text-slate-300' : 'text-slate-400'}>
                          {isAssistant ? 'Moiz AI Twin' : 'You'}
                        </span>
                        {message.timestamp && <span>&bull; {message.timestamp}</span>}
                      </div>

                      <div
                        className={`group relative max-w-[92%] rounded-2xl text-xs leading-relaxed transition-all ${
                          isAssistant
                            ? 'rounded-tl-sm border border-white/15 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 p-3.5 text-slate-100 shadow-[0_6px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl'
                            : 'rounded-tr-sm border border-indigo-400/30 bg-gradient-to-r from-indigo-600 to-violet-600 p-3 text-white shadow-[0_4px_16px_rgba(99,102,241,0.35)]'
                        }`}
                      >
                        {isAssistant ? (
                          <FormattedText content={message.content} onPromptClick={sendMessage} />
                        ) : (
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        )}

                        {isAssistant && (
                          <button
                            onClick={() => handleCopy(message.content, index)}
                            className="absolute right-2.5 top-2.5 rounded-lg border border-white/10 bg-slate-800/90 p-1.5 text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:border-indigo-400/40 hover:bg-slate-700 hover:text-white shadow-sm"
                            title="Copy message"
                          >
                            {copiedIndex === index ? (
                              <FiCheck size={12} className="text-emerald-400" />
                            ) : (
                              <FiCopy size={12} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 px-3 py-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" />
                    </div>
                    <span className="text-[10px] text-slate-400">Formulating response...</span>
                  </div>
                )}
              </div>

              {/* Recruiter Quick Questions Bar */}
              <div className="mt-2.5 border-t border-white/[0.08] pt-2">
                <div className="mb-1.5 flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                    Recruiter Quick Questions
                  </span>
                  <span className="text-[9px] text-slate-500">Click to ask</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {SUGGESTED_TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <button
                        key={topic.label}
                        type="button"
                        onClick={() => sendMessage(topic.query)}
                        disabled={isLoading}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/15 hover:text-white disabled:opacity-50"
                      >
                        <Icon className="text-indigo-400" />
                        <span>{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLoading ? "Moiz AI is thinking..." : "Ask about projects, stack, experience..."}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-400/60 focus:bg-white/[0.08] focus:outline-none transition"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={13} />
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
