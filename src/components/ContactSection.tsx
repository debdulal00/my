import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface ContactSectionProps {
  onOpenAdminInbox: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAdminInbox }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please provide a subject for your message.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus('error');
      setErrorMessage('Please write a message with at least 5 characters.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setSuccessMessage(data.message || 'Message delivered to Debdulal successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(
        err.message || 'Network error delivering message. Please try again or reach out directly.'
      );
    }
  };

  const contactChannels = [
    {
      title: 'Email Address',
      value: PORTFOLIO_DATA.personal.email,
      href: `mailto:${PORTFOLIO_DATA.personal.email}`,
      icon: <Mail className="w-5 h-5 text-[#365FF5] dark:text-[#557CFF]" />,
      action: 'Send Direct Email',
    },
    {
      title: 'LinkedIn Network',
      value: 'Debdulal Sahoo',
      href: PORTFOLIO_DATA.socialLinks.linkedin,
      icon: <Linkedin className="w-5 h-5 text-[#009BB8] dark:text-[#00D4FF]" />,
      action: 'Connect on LinkedIn',
    },
    {
      title: 'GitHub Repositories',
      value: 'github.com/debdulal00',
      href: PORTFOLIO_DATA.socialLinks.github,
      icon: <Github className="w-5 h-5 text-[#7955E8] dark:text-[#9B6BFF]" />,
      action: 'Inspect Source Code',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#365FF5]/10 to-[#7955E8]/10 dark:from-[#557CFF]/15 dark:to-[#9B6BFF]/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with exact headline */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
            <Sparkles className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
            <span>Collaboration & Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-4 text-balance font-display">
            Let's Turn Your Next Idea Into{' '}
            <span className="bg-gradient-to-r from-[#365FF5] via-[#7955E8] to-[#009BB8] dark:from-[#557CFF] via-[#9B6BFF] to-[#00D4FF] bg-clip-text text-transparent">
              Reality.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
            I'm interested in connecting with developers, recruiters, founders, and people working on AI, machine learning, and innovative technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Animated Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            {contactChannels.map((c, idx) => (
              <motion.a
                key={idx}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5]/50 dark:hover:border-[#557CFF]/50 transition-all flex items-center justify-between group shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-white/5 group-hover:scale-110 transition-transform">
                    {c.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-[#64748B] dark:text-slate-400 block mb-0.5">
                      {c.title}
                    </span>
                    <strong className="text-sm sm:text-base text-[#111827] dark:text-white font-medium block">
                      {c.value}
                    </strong>
                    <span className="text-[11px] text-[#365FF5] dark:text-[#557CFF] font-mono">
                      {c.action} →
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#111827] dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            {/* Location Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] flex items-center justify-between shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-white/5">
                  <MapPin className="w-5 h-5 text-[#365FF5] dark:text-[#557CFF]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#64748B] dark:text-slate-400 block mb-0.5">
                    Location
                  </span>
                  <strong className="text-sm sm:text-base text-[#111827] dark:text-white font-medium block">
                    Contai, West Bengal, India
                  </strong>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                    Open to Remote & Global Relocation
                  </span>
                </div>
              </div>
            </div>

            {/* Private Vault Notice */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#0D1220]/60 border border-[#DCE3EF] dark:border-white/5 flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#365FF5] dark:text-[#557CFF]" />
                <span>Backend Store & Secure Vault Enabled</span>
              </div>
              <button
                onClick={onOpenAdminInbox}
                className="text-[11px] text-[#365FF5] dark:text-[#557CFF] hover:underline font-mono"
              >
                Admin Unlock
              </button>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] shadow-xl dark:shadow-2xl shadow-black/5 dark:shadow-black/30">
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white mb-2 font-display">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#A7B2C5] mb-6 font-light">
                Submissions are stored securely in the local backend inbox and monitored personally.
              </p>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                  <span>{successMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#475569] dark:text-slate-400 mb-2 font-medium"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] focus:border-[#365FF5] dark:focus:border-[#557CFF] text-[#111827] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-slate-500 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#475569] dark:text-slate-400 mb-2 font-medium"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] focus:border-[#365FF5] dark:focus:border-[#557CFF] text-[#111827] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-slate-500 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-[#475569] dark:text-slate-400 mb-2 font-medium"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="AI Collaboration / Engineering Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] focus:border-[#365FF5] dark:focus:border-[#557CFF] text-[#111827] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-slate-500 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#475569] dark:text-slate-400 mb-2 font-medium"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, team opportunity, or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] focus:border-[#365FF5] dark:focus:border-[#557CFF] text-[#111827] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-slate-500 text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#365FF5] via-[#6366F1] to-[#7955E8] dark:from-[#557CFF] dark:via-[#6366F1] dark:to-[#9B6BFF] hover:opacity-95 shadow-lg shadow-[#365FF5]/25 dark:shadow-[#557CFF]/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
