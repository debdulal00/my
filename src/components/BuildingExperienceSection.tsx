import React from 'react';
import { motion } from 'motion/react';
import {
  Rocket,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const BuildingExperienceSection: React.FC = () => {
  const ecosystem = PORTFOLIO_DATA.productBuilderEcosystem;

  const ventureCards = [
    {
      name: 'ToolsVerse AI',
      role: 'Founder & Full-Stack AI Engineer',
      domain: 'toolsverseai.com',
      status: 'Live & Operational',
      statusColor: 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      desc: 'High-utility AI tools hub consolidating multi-model generation, prompt workflows, and automated micro-services for modern creators.',
      features: ['Multi-Model Generative AI APIs', 'Fast Global Tool Discovery', 'Production SEO Architecture'],
      link: 'https://toolsverseai.com/',
      badge: 'Flagship Platform',
    },
    {
      name: 'IndoNest',
      role: 'Founder & System Architect',
      domain: 'indonest.online',
      status: 'Live & Operating',
      statusColor: 'text-[#365FF5] dark:text-[#557CFF] bg-[#365FF5]/10 border-[#365FF5]/25',
      desc: 'Curated modern home living and decor e-commerce venture integrating conversion-optimized catalogs and secure transactions.',
      features: ['Responsive Next-Gen Storefront', 'Fast Edge Catalog Loading', 'End-to-End Cart Checkout'],
      link: 'https://indonest.online/',
      badge: 'E-Commerce Platform',
    },
    {
      name: 'SivInd AI Healthcare Suite',
      role: 'Lead ML Developer',
      domain: 'Diagnostic AI Concept',
      status: 'Academic & Diagnostic Demo',
      statusColor: 'text-[#7955E8] dark:text-[#9B6BFF] bg-[#7955E8]/10 border-[#7955E8]/25',
      desc: 'Specialized diagnostic machine learning assist suite prioritizing rapid clinical symptom assessment and disease likelihood estimation.',
      features: ['Multimodal Clinical Inference', 'Real-Time Risk Scoring', 'FastAPI Microservice Backend'],
      link: null,
      badge: 'Healthcare AI',
    },
    {
      name: 'Autonomous Multi-Agent Workflow Engine',
      role: 'Research & Systems Builder',
      domain: 'Multi-Agent Framework',
      status: 'Framework v1.2',
      statusColor: 'text-[#009BB8] dark:text-[#00D4FF] bg-[#009BB8]/10 border-[#009BB8]/25',
      desc: 'Stateful LangGraph agent orchestrator capable of autonomous tool execution, sub-task recursion, and dynamic self-correction.',
      features: ['LangGraph State Machine', 'Dynamic Tool Fallback Protocol', 'Strict JSON Structured Outputs'],
      link: null,
      badge: 'Autonomous AI',
    },
  ];

  return (
    <section className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#365FF5]/10 via-[#7955E8]/10 to-[#009BB8]/10 dark:from-[#557CFF]/15 dark:via-[#9B6BFF]/10 dark:to-[#00D4FF]/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
            <Rocket className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
            <span>Entrepreneurial Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-4 text-balance font-display">
            {ecosystem.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
            {ecosystem.subheadline}
          </p>
        </div>

        {/* Visual Ecosystem Flow: 4 Interconnected Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 relative">
          {ecosystem.nodes.map((node: { stage: string; label: string; desc: string; color: string }, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5]/50 dark:hover:border-[#557CFF]/50 transition-all flex flex-col justify-between group shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] opacity-80" />

              <div>
                <span className="text-xs font-mono text-[#009BB8] dark:text-[#00D4FF] block mb-2 font-semibold">
                  {node.stage}
                </span>
                <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2 font-display">
                  {node.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
                  {node.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE3EF] dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#8491A5]">
                <span>Phase 0{idx + 1}</span>
                <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Active</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventureCards.map((v, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5]/40 dark:hover:border-[#557CFF]/40 shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#365FF5]/10 dark:bg-[#557CFF]/15 text-[#365FF5] dark:text-[#557CFF] border border-[#365FF5]/20 dark:border-[#557CFF]/30 font-semibold">
                    {v.badge}
                  </span>
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full border ${v.statusColor}`}
                  >
                    {v.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-1 font-display">
                  {v.name}
                </h3>

                <span className="text-xs font-mono text-[#64748B] dark:text-slate-400 block mb-4">
                  {v.role}
                </span>

                <p className="text-sm text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed mb-6">
                  {v.desc}
                </p>

                <div className="space-y-2 mb-6">
                  {v.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-xs text-[#475569] dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#365FF5] dark:text-[#557CFF] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-[#DCE3EF] dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-[#64748B] dark:text-slate-400">
                  {v.domain}
                </span>
                {v.link ? (
                  <a
                    href={v.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#365FF5] dark:text-[#557CFF] hover:underline"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-[#64748B] dark:text-slate-500 font-mono">
                    System Architecture Demo
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
