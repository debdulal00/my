import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Bot,
  Brain,
  Rocket,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface IdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const IdentityModal: React.FC<IdentityModalProps> = ({
  isOpen,
  onClose,
  onContactClick,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.22)] p-6 sm:p-8 shadow-2xl text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close profile panel"
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-[#111827] hover:bg-slate-200 dark:hover:bg-[#1A2234] text-[#475569] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Identity Header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)]">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-[2px] bg-gradient-to-br from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] shrink-0">
              <img
                src={PORTFOLIO_DATA.personal.avatarUrl}
                alt="Debdulal Sahoo"
                className="w-full h-full object-cover object-top rounded-[14px]"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-[#0D1220]" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-[#009BB8] dark:text-[#00D4FF] font-semibold">
                  Founder & Developer
                </span>
                <span className="text-[#64748B] dark:text-slate-500">·</span>
                <span className="text-xs text-[#64748B] dark:text-slate-400 font-mono">India</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white font-display">
                {PORTFOLIO_DATA.personal.name}
              </h3>
              <p className="text-xs text-[#365FF5] dark:text-[#557CFF] font-medium">
                AI/ML Developer | AI Product Builder | Entrepreneur
              </p>
            </div>
          </div>

          {/* Professional Introduction */}
          <div className="space-y-4 mb-6 text-xs sm:text-sm text-[#475569] dark:text-slate-300 font-light leading-relaxed">
            <p>
              Hello! I'm Debdulal Sahoo, an engineering student at Brainware University specializing in Artificial Intelligence and Machine Learning (Current CGPA: 8.6/10).
            </p>
            <p>
              I bridge the gap between theoretical machine learning and scalable real-world digital solutions. Beyond studying models, I actively build, launch, and operate independent platforms with real users.
            </p>
          </div>

          {/* AI & ML Engineering Interests */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-[#64748B] dark:text-slate-400 font-mono block mb-2.5">
              Core Technical Passions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/5 flex items-center gap-2.5">
                <Brain className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF] shrink-0" />
                <span className="text-[#111827] dark:text-slate-200">Autonomous Multi-Agent Graphs</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/5 flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-[#7955E8] dark:text-[#9B6BFF] shrink-0" />
                <span className="text-[#111827] dark:text-slate-200">Stateful RAG & Deep Learning</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/5 flex items-center gap-2.5">
                <Rocket className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF] shrink-0" />
                <span className="text-[#111827] dark:text-slate-200">Micro-SaaS & Commercial Platforms</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/5 flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span className="text-[#111827] dark:text-slate-200">FastAPI & High-Concurrency APIs</span>
              </div>
            </div>
          </div>

          {/* Ventures Snapshot */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-[#64748B] dark:text-slate-400 font-mono block mb-2.5">
              Live Platforms Operated
            </span>
            <div className="space-y-2">
              <a
                href={PORTFOLIO_DATA.socialLinks.toolsverse}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/5 hover:border-[#365FF5]/40 dark:hover:border-[#557CFF]/40 flex items-center justify-between text-xs transition-all group"
              >
                <div>
                  <strong className="text-[#111827] dark:text-white font-medium block">
                    ToolsVerse AI
                  </strong>
                  <span className="text-[#64748B] dark:text-slate-400">toolsverseai.com · High-Utility AI Hub</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={PORTFOLIO_DATA.socialLinks.indonest}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/5 hover:border-[#7955E8]/40 dark:hover:border-[#9B6BFF]/40 flex items-center justify-between text-xs transition-all group"
              >
                <div>
                  <strong className="text-[#111827] dark:text-white font-medium block">
                    IndoNest
                  </strong>
                  <span className="text-[#64748B] dark:text-slate-400">indonest.online · Modern Living E-Commerce</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#7955E8] dark:text-[#9B6BFF] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Location & Contact CTA */}
          <div className="pt-4 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#365FF5] dark:text-[#557CFF]" />
              <span>Contai, West Bengal, India</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onContactClick();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] shadow-md flex items-center gap-1.5"
              >
                <span>Send Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
