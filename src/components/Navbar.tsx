import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, ArrowUpRight, ShieldCheck, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenAdminInbox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenAdminInbox }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isIdentityDropdownOpen, setIsIdentityDropdownOpen] = useState(false);

  const logoRef = useRef<HTMLDivElement | null>(null);

  // Top window scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  // Close identity dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (logoRef.current && !logoRef.current.contains(e.target as Node)) {
        setIsIdentityDropdownOpen(false);
      }
    };

    if (isIdentityDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isIdentityDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsIdentityDropdownOpen((prev) => !prev);
  };

  const letters = "Debdulal Sahoo".split("");

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#365FF5] via-[#7955E8] to-[#009BB8] dark:from-[#557CFF] dark:via-[#9B6BFF] dark:to-[#00D4FF] z-50 origin-left"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#07080D]/90 backdrop-blur-xl border-b border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] shadow-md dark:shadow-xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Interactive DS Logo with hover reveal & click panel */}
          <div className="relative" ref={logoRef}>
            <button
              onClick={handleLogoClick}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              aria-label="Debdulal Sahoo - Identity Details"
              className="group flex items-center gap-2.5 p-1 rounded-2xl transition-all outline-none"
            >
              {/* Logo icon box with animated gradient border and glow */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#365FF5] via-[#6366F1] to-[#7955E8] dark:from-[#557CFF] dark:via-[#6366F1] dark:to-[#9B6BFF] p-[1.5px] shadow-[0_0_20px_rgba(85,124,255,0.4)] group-hover:shadow-[0_0_30px_rgba(85,124,255,0.65)] transition-shadow flex items-center justify-center shrink-0"
              >
                <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#07080D] flex items-center justify-center">
                  <span className="text-[#111827] dark:text-white text-xs font-black tracking-tight font-display">
                    DS
                  </span>
                </div>
              </motion.div>

              {/* Smoothly expanding full name on hover */}
              <motion.div
                initial={false}
                animate={{
                  width: isLogoHovered ? 'auto' : 'auto',
                  opacity: 1,
                }}
                className="overflow-hidden flex items-center"
              >
                {isLogoHovered ? (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm sm:text-base font-bold bg-gradient-to-r from-[#111827] via-[#365FF5] to-[#7955E8] dark:from-white dark:via-slate-200 dark:to-[#557CFF] bg-clip-text text-transparent whitespace-nowrap font-display flex"
                  >
                    {letters.map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.015 }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                ) : (
                  <span className="text-sm sm:text-base font-bold text-[#111827] dark:text-white whitespace-nowrap font-display tracking-tight">
                    DS.
                  </span>
                )}
              </motion.div>
            </button>

            {/* Interactive Identity Popup Panel on Click */}
            <AnimatePresence>
              {isIdentityDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 left-0 w-72 rounded-2xl bg-white dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.22)] p-5 shadow-2xl z-50 text-left"
                >
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#DCE3EF] dark:border-white/5">
                    <img
                      src={PORTFOLIO_DATA.personal.avatarUrl}
                      alt="Debdulal Sahoo"
                      className="w-12 h-12 rounded-xl object-cover object-top border border-[#365FF5]/40 dark:border-[#557CFF]/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#111827] dark:text-white font-display">
                        Debdulal Sahoo
                      </h4>
                      <p className="text-[11px] text-[#365FF5] dark:text-[#557CFF] font-medium leading-tight">
                        AI/ML Developer & AI Product Builder
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#475569] dark:text-[#A7B2C5] font-light mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#009BB8] dark:text-[#00D4FF]" />
                      <span>West Bengal, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      <span>Open to Global Opportunities</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DCE3EF] dark:border-white/5 flex items-center justify-between">
                    <a
                      href="#about"
                      onClick={(e) => {
                        handleNavClick(e, '#about');
                        setIsIdentityDropdownOpen(false);
                      }}
                      className="text-[11px] font-mono text-[#365FF5] dark:text-[#557CFF] hover:underline"
                    >
                      Read Bio →
                    </a>
                    <button
                      onClick={() => setIsIdentityDropdownOpen(false)}
                      className="text-[11px] text-[#64748B] dark:text-[#8491A5] hover:text-[#111827] dark:hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-[#475569] dark:text-[#A7B2C5]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#111827] dark:hover:text-white relative py-1 ${
                    isActive ? 'text-[#365FF5] dark:text-white font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#365FF5] to-[#009BB8] dark:from-[#557CFF] dark:to-[#00D4FF] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-xl text-[#475569] dark:text-[#A7B2C5] hover:text-[#111827] dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#111827] border border-transparent hover:border-[#DCE3EF] dark:hover:border-white/10 transition-all"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#365FF5] animate-in spin-in-180 duration-300" />
              )}
            </button>

            {/* Discreet Admin Vault Trigger */}
            <button
              onClick={onOpenAdminInbox}
              title="Private Inquiries Vault"
              aria-label="Private Inquiries Vault"
              className="p-2.5 rounded-xl text-slate-400 hover:text-[#365FF5] dark:hover:text-[#557CFF] hover:bg-slate-200/60 dark:hover:bg-[#111827] transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Let's Talk CTA */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-[#365FF5] via-[#6366F1] to-[#7955E8] dark:from-[#557CFF] dark:via-[#6366F1] dark:to-[#9B6BFF] hover:opacity-95 shadow-md shadow-[#365FF5]/20 dark:shadow-[#557CFF]/25 whitespace-nowrap shrink-0"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-xl text-[#475569] dark:text-[#A7B2C5] hover:text-[#111827] dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#111827]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#07080D] border-b border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-base font-medium py-1.5 transition-colors ${
                    activeSection === item.href.substring(1)
                      ? 'text-[#365FF5] dark:text-[#557CFF] font-semibold'
                      : 'text-[#475569] dark:text-[#A7B2C5] hover:text-[#111827] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full text-center py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF]"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
