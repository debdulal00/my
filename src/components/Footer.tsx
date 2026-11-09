import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navShortcuts = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-[#050608] border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] text-[#475569] dark:text-slate-400 py-16 transition-colors relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)]">
          {/* Brand Info with Interactive DS Logo */}
          <div className="md:col-span-5 space-y-4">
            <div
              className="flex items-center gap-3 cursor-pointer inline-flex"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] p-[1.5px] shadow-[0_0_20px_rgba(85,124,255,0.4)] flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#07080D] flex items-center justify-center">
                  <span className="text-[#111827] dark:text-white text-xs font-black tracking-tight font-display">
                    DS
                  </span>
                </div>
              </div>

              <div>
                <span className="text-lg font-bold text-[#111827] dark:text-white tracking-tight font-display block">
                  Debdulal Sahoo
                </span>
                <span className="text-[11px] font-mono text-[#009BB8] dark:text-[#00D4FF]">
                  AI/ML Developer & AI Product Builder
                </span>
              </div>
            </div>

            <p className="text-sm text-[#475569] dark:text-slate-300 max-w-sm leading-relaxed font-light">
              "Built with curiosity, AI, and creativity."
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#365FF5] dark:text-[#557CFF]" />
              <span>Contai, West Bengal, India · Brainware University</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <span className="text-xs uppercase font-mono tracking-wider text-[#111827] dark:text-slate-300 block mb-4 font-semibold">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navShortcuts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#365FF5] dark:hover:text-white transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Directly */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-[#111827] dark:text-slate-300 block font-semibold">
              Connect Directly
            </span>
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_DATA.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-[#0D1220] hover:bg-slate-200 dark:hover:bg-[#121826] text-[#475569] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5] dark:hover:border-[#557CFF] transition-all shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-[#0D1220] hover:bg-slate-200 dark:hover:bg-[#121826] text-[#475569] dark:text-slate-300 hover:text-[#365FF5] dark:hover:text-[#557CFF] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5] dark:hover:border-[#557CFF] transition-all shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.socialLinks.emailMailto}
                className="p-3 rounded-xl bg-white dark:bg-[#0D1220] hover:bg-slate-200 dark:hover:bg-[#121826] text-[#475569] dark:text-slate-300 hover:text-[#7955E8] dark:hover:text-[#9B6BFF] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#7955E8] dark:hover:border-[#9B6BFF] transition-all shadow-sm"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs text-[#64748B] dark:text-slate-400">
              Email: <span className="text-[#111827] dark:text-slate-300 font-mono">{PORTFOLIO_DATA.personal.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Debdulal Sahoo. All rights reserved.</span>
            <span>·</span>
            <span className="text-[#111827] dark:text-white font-medium">Designed & Built by Debdulal Sahoo.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0D1220] hover:bg-slate-200 dark:hover:bg-[#121826] text-[#475569] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] transition-all text-xs font-medium shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#365FF5] dark:text-[#557CFF]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
