import Head from 'next/head';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { profile } from '../data/portfolio';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Muhammad Abdul Moiz</title>
        <meta
          name="description"
          content="Get in touch with Muhammad Abdul Moiz for machine learning, GenAI, cloud, or software engineering opportunities."
        />
      </Head>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="Get In Touch"
            eyebrowIcon={<FiMail />}
            title="Let's build something extraordinary"
            subtitle="I'm open to full-time engineering roles, high-impact collaborations, and technical consulting."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left Column: Direct Links */}
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent p-8 shadow-2xl backdrop-blur-md transform-gpu">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  Reach Out Directly
                </p>
                <div className="mt-8 space-y-4 text-sm text-slate-300">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-indigo-400/40 hover:bg-white/10 hover:text-white"
                  >
                    <FiMail className="text-indigo-400" size={18} />
                    <span>{profile.email}</span>
                  </a>

                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-indigo-400/40 hover:bg-white/10 hover:text-white"
                  >
                    <FiPhone className="text-indigo-400" size={18} />
                    <span>{profile.phone}</span>
                  </a>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <FiMapPin className="text-indigo-400" size={18} />
                    <span>{profile.location}</span>
                  </div>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-indigo-400/40 hover:bg-white/10 hover:text-white"
                  >
                    <FiLinkedin className="text-indigo-400" size={18} />
                    <span>LinkedIn Profile</span>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-indigo-400/40 hover:bg-white/10 hover:text-white"
                  >
                    <FiGithub className="text-indigo-400" size={18} />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-400">
                Based in Paris, France &bull; Available for on-site, hybrid, or remote roles.
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Form */}
          <Reveal delay={0.08}>
            <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent p-8 shadow-2xl backdrop-blur-md transform-gpu">
              <form action={`mailto:${profile.email}`} method="post" encType="text/plain" className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Your Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 transition focus:border-indigo-400/60 focus:bg-white/[0.08] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 transition focus:border-indigo-400/60 focus:bg-white/[0.08] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Project or Opportunity Details
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your team, tech stack, and what you're building..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 transition focus:border-indigo-400/60 focus:bg-white/[0.08] focus:outline-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] transition hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
                >
                  <span>Send Message</span>
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
