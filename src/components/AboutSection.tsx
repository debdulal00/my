import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  GraduationCap,
  Sparkles,
  Milestone,
  CheckCircle2,
  Rocket,
  Brain,
  Layers,
  Terminal,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const AboutSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(2);

  const statsCards = [
    {
      icon: <GraduationCap className="w-5 h-5 text-[#365FF5] dark:text-[#557CFF]" />,
      label: 'Academic Track',
      value: 'B.Tech in CSE (AI & ML)',
      sub: 'Brainware University (2023 - 2027)',
      accent: 'border-[#365FF5]/30 dark:border-[#557CFF]/40',
    },
    {
      icon: <Code2 className="w-5 h-5 text-[#7955E8] dark:text-[#9B6BFF]" />,
      label: 'Performance',
      value: 'CGPA 8.6 / 10',
      sub: 'Specialized AI Honors Curriculum',
      accent: 'border-[#7955E8]/30 dark:border-[#9B6BFF]/40',
    },
    {
      icon: <Brain className="w-5 h-5 text-[#009BB8] dark:text-[#00D4FF]" />,
      label: 'Venture Execution',
      value: '2 Live Platforms',
      sub: 'ToolsVerse AI & IndoNest',
      accent: 'border-[#009BB8]/30 dark:border-[#00D4FF]/40',
    },
    {
      icon: <Rocket className="w-5 h-5 text-emerald-500 dark:text-emerald-400]" />,
      label: 'Engineering Philosophy',
      value: 'Product Builder',
      sub: 'Multi-Agent Frameworks & Production Apps',
      accent: 'border-emerald-500/30 dark:border-emerald-400/40',
    },
  ];

  const phaseIcons = [
    <Terminal className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF]" />,
    <Brain className="w-4 h-4 text-[#7955E8] dark:text-[#9B6BFF]" />,
    <Sparkles className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />,
    <Layers className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />,
    <Rocket className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />,
  ];

  return (
    <section
      id="about"
      className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#365FF5]/10 dark:bg-[#557CFF]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
            <Sparkles className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
            <span>Executive Biography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-4 text-balance font-display">
            Turning Ideas Into{' '}
            <span className="bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] bg-clip-text text-transparent">
              Intelligent Solutions.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] leading-relaxed font-light">
            Combining rigorous academic computer science foundations with independent entrepreneurial software execution.
          </p>
        </div>

        {/* 4 Information Metric Cards with Glowing Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {statsCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-6 rounded-3xl bg-white dark:bg-[#111827] border ${card.accent} shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25 relative group overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-200/50 dark:from-white/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-white/5 inline-block mb-4 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <span className="text-xs uppercase tracking-wider text-[#64748B] dark:text-[#8491A5] block mb-1 font-mono">
                {card.label}
              </span>
              <h3 className="text-lg font-bold text-[#111827] dark:text-[#F8FAFC] mb-1 font-display">
                {card.value}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B2C5] font-light">
                {card.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two-Column Narrative Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-[#475569] dark:text-[#A7B2C5] font-light">
            <p>
              I am currently pursuing a{' '}
              <strong className="text-[#111827] dark:text-white font-semibold">
                B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at Brainware University
              </strong>
              .
            </p>
            <p>
              I am passionate about{' '}
              <span className="text-[#365FF5] dark:text-[#557CFF] font-medium">machine learning</span>,{' '}
              <span className="text-[#7955E8] dark:text-[#9B6BFF] font-medium">generative AI</span>, large language models, and autonomous AI agents.
            </p>
            <p>
              I enjoy developing practical applications, experimenting with emerging technologies, and building digital products.
            </p>
            <p>
              Alongside my academic journey, I have worked on independent projects involving AI-powered platforms, SaaS applications, and e-commerce solutions.
            </p>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D1220] border-l-4 border-[#365FF5] dark:border-[#557CFF] border-y border-r border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] text-[#111827] dark:text-[#F8FAFC] text-base italic font-normal shadow-md dark:shadow-lg">
              "I believe the future belongs to people who can combine technical knowledge with creativity and execution."
            </div>
          </div>

          <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] space-y-4 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-[#009BB8] dark:text-[#00D4FF] font-mono block font-semibold">
              Core Principles
            </span>
            <div className="space-y-4 text-xs sm:text-sm text-[#475569] dark:text-[#A7B2C5]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#111827] dark:text-white block font-medium">Zero-Hype Pragmatism</strong>
                  <span className="text-[#64748B] dark:text-slate-400 font-light">
                    Prioritizing verifiable real-world utility over vanity metrics.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7955E8] dark:text-[#9B6BFF] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#111827] dark:text-white block font-medium">Autonomous Multi-Agent Design</strong>
                  <span className="text-[#64748B] dark:text-slate-400 font-light">
                    Orchestrating agent workflows that break complex tasks into reliable sub-goals.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-[#111827] dark:text-white block font-medium">End-to-End Ownership</strong>
                  <span className="text-[#64748B] dark:text-slate-400 font-light">
                    From foundation models and RAG pipelines to intuitive frontend engineering.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: "My Journey Into AI & Product Building." */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase font-mono mb-1">
                <Milestone className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
                <span>Interactive Career Progression</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight font-display">
                My Journey Into AI & Product Building.
              </h3>
            </div>

            {/* Phase Selector Stepper */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 max-w-full">
              {PORTFOLIO_DATA.journey.map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activePhaseIndex === idx
                      ? 'bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] text-white shadow-lg shadow-[#365FF5]/25 dark:shadow-[#557CFF]/25'
                      : 'bg-slate-100 dark:bg-[#111827] text-[#475569] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white border border-[#DCE3EF] dark:border-white/5'
                  }`}
                >
                  <span>{phaseIcons[idx]}</span>
                  <span>{phase.year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Phase Card */}
          <motion.div
            key={activePhaseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-7 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/10 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
              <h4 className="text-xl font-bold text-[#111827] dark:text-white font-display flex items-center gap-2.5">
                <span>{phaseIcons[activePhaseIndex]}</span>
                <span>{PORTFOLIO_DATA.journey[activePhaseIndex].title}</span>
              </h4>
              <span className="text-xs font-mono text-[#009BB8] dark:text-[#00D4FF] font-medium">
                {PORTFOLIO_DATA.journey[activePhaseIndex].subtitle}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#475569] dark:text-[#A7B2C5] leading-relaxed mb-5 font-light">
              {PORTFOLIO_DATA.journey[activePhaseIndex].description}
            </p>

            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.journey[activePhaseIndex].highlights.map((h, hIdx) => (
                <span
                  key={hIdx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white dark:bg-[#0D1220] text-[#365FF5] dark:text-[#557CFF] border border-[#DCE3EF] dark:border-[#557CFF]/30 font-medium"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
