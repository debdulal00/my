/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { BuildingExperienceSection } from './components/BuildingExperienceSection.tsx';
import { EducationSection } from './components/EducationSection.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { ResumeSection } from './components/ResumeSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { AdminInboxModal } from './components/AdminInboxModal.tsx';
import { CinematicIntro } from './components/CinematicIntro.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { IdentityModal } from './components/IdentityModal.tsx';
import { ArrowUp, Sparkles, UserCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from './data/portfolioData.ts';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isAdminInboxOpen, setIsAdminInboxOpen] = useState(false);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Theme Sync
  useEffect(() => {
    const savedTheme = localStorage.getItem('ds_portfolio_theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Scroll detection for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('ds_portfolio_theme', newTheme);
    applyTheme(newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] dark:bg-[#07080D] text-[#111827] dark:text-[#F8FAFC] transition-colors duration-300 selection:bg-[#557CFF]/25 selection:text-[#557CFF] relative overflow-x-hidden">
      {/* 1.1s Cinematic Brand Intro Animation on First Open */}
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      {/* Custom Desktop Spring Follower Cursor */}
      <CustomCursor />

      {/* Sticky Responsive 3-Zone Navigation with Interactive Expanding DS Logo & Progress Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAdminInbox={() => setIsAdminInboxOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <HeroSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BuildingExperienceSection />
        <EducationSection />
        <ExperienceSection />
        <ResumeSection
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onDownloadResume={() => setIsResumeModalOpen(true)}
        />
        <ContactSection onOpenAdminInbox={() => setIsAdminInboxOpen(true)} />
      </main>

      {/* Interactive Footer */}
      <Footer />

      {/* Floating Action Controls on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* "Meet Debdulal" Interactive Floating Identity Button */}
        <button
          onClick={() => setIsIdentityModalOpen(true)}
          aria-label="Meet Debdulal - Profile Overview"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 dark:bg-[#0D1220]/95 hover:bg-slate-50 dark:hover:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_0_25px_rgba(85,124,255,0.35)] backdrop-blur-xl text-[#111827] dark:text-[#F8FAFC] transition-all hover:scale-105"
        >
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#365FF5] dark:border-[#557CFF] shrink-0">
            <img
              src={PORTFOLIO_DATA.personal.avatarUrl}
              alt="Debdulal Sahoo"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="text-xs font-semibold tracking-wide font-display text-[#111827] dark:text-white">
            Meet Debdulal
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
        </button>

        {/* Back to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-3 rounded-2xl bg-white/95 dark:bg-[#0D1220]/95 hover:bg-slate-50 dark:hover:bg-[#111827] text-[#111827] dark:text-white border border-[#DCE3EF] dark:border-[#557CFF]/40 shadow-xl shadow-black/10 dark:shadow-black/40 backdrop-blur-md transition-all hover:scale-110"
          >
            <ArrowUp className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF]" />
          </button>
        )}
      </div>

      {/* Predefined Interactive "Meet Debdulal" Identity Panel Modal */}
      <IdentityModal
        isOpen={isIdentityModalOpen}
        onClose={() => setIsIdentityModalOpen(false)}
        onContactClick={scrollToContact}
      />

      {/* Interactive Resume ATS & PDF Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Private Admin Inquiries Vault */}
      <AdminInboxModal
        isOpen={isAdminInboxOpen}
        onClose={() => setIsAdminInboxOpen(false)}
      />
    </div>
  );
}
