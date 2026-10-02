import { useState, FormEvent } from 'react';
import Head from 'next/head';
import { FiAlertCircle, FiCheckCircle, FiGithub, FiLinkedin, FiLoader, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { profile } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const { contactPage } = t;

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'c0135e83-c85d-4c24-a75b-fc100a23e5bb';
    formData.append('access_key', accessKey);
    formData.append('subject', 'New Contact Message - Muhammad Abdul Moiz Portfolio');
    formData.append('from_name', 'Portfolio Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMessage(data.message || contactPage.formError);
      }
    } catch {
      setStatus('error');
      setErrorMessage(contactPage.formError);
    }
  };

  return (
    <>
      <Head>
        <title>{contactPage.headTitle}</title>
        <meta name="description" content={contactPage.headDesc} />
      </Head>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={contactPage.eyebrow}
            eyebrowIcon={<FiMail />}
            title={contactPage.title}
            subtitle={contactPage.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left Column: Direct Links */}
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-slate-200/90 bg-white/85 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-gradient-to-b dark:from-white/[0.08] dark:via-white/[0.02] dark:to-transparent dark:shadow-2xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                  {contactPage.reachOutDirectly}
                </p>
                <div className="mt-8 space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-indigo-400 hover:bg-white hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <FiMail className="text-indigo-600 dark:text-indigo-400" size={18} />
                    <span>{profile.email}</span>
                  </a>

                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-indigo-400 hover:bg-white hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <FiPhone className="text-indigo-600 dark:text-indigo-400" size={18} />
                    <span>{profile.phone}</span>
                  </a>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    <FiMapPin className="text-indigo-600 dark:text-indigo-400" size={18} />
                    <span>{profile.location}</span>
                  </div>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-indigo-400 hover:bg-white hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <FiLinkedin className="text-indigo-600 dark:text-indigo-400" size={18} />
                    <span>{contactPage.linkedinLabel}</span>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-indigo-400 hover:bg-white hover:text-slate-900 dark:border-white/5 dark:bg-white/[0.03] dark:hover:border-indigo-400/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <FiGithub className="text-indigo-600 dark:text-indigo-400" size={18} />
                    <span>{contactPage.githubLabel}</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200/80 dark:border-white/10 pt-6 text-xs text-slate-500 dark:text-slate-400">
                {contactPage.availabilityNote}
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Form */}
          <Reveal delay={0.08}>
            <div className="rounded-[2.5rem] border border-slate-200/90 bg-white/85 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transform-gpu dark:border-white/10 dark:bg-gradient-to-b dark:from-white/[0.08] dark:via-white/[0.02] dark:to-transparent dark:shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field for spam prevention */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {contactPage.formName}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={contactPage.formNamePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.08]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {contactPage.formEmail}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={contactPage.formEmailPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.08]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {contactPage.formMessage}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder={contactPage.formMessagePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.08]"
                  />
                </div>

                {status === 'success' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300"
                  >
                    <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" size={18} />
                    <p className="font-medium">{contactPage.formSuccess}</p>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-800 dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-300"
                  >
                    <FiAlertCircle className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" size={18} />
                    <p className="font-medium">{errorMessage || contactPage.formError}</p>
                  </div>
                )}

                <motion.button
                  whileHover={status !== 'loading' ? { scale: 1.02 } : undefined}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : undefined}
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 py-4 text-sm font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.3)] transition hover:shadow-[0_0_35px_rgba(79,70,229,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <FiLoader className="animate-spin" size={16} />
                      <span>{contactPage.formSubmitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{contactPage.formSubmit}</span>
                      <FiSend size={15} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
