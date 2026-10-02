import Head from 'next/head';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { profile } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const { contactPage } = t;

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
              <form action={`mailto:${profile.email}`} method="post" encType="text/plain" className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {contactPage.formName}
                  </label>
                  <input
                    name="name"
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 py-4 text-sm font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.3)] transition hover:shadow-[0_0_35px_rgba(79,70,229,0.5)]"
                >
                  <span>{contactPage.formSubmit}</span>
                  <FiSend size={15} />
                </motion.button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
