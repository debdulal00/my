import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Brain,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Database,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Skills' },
    { id: 'programming', label: 'Languages' },
    { id: 'ml-data', label: 'ML & Deep Learning' },
    { id: 'genai', label: 'GenAI & Agents' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'development', label: 'Development & Cloud' },
    { id: 'fundamentals', label: 'CS Fundamentals' },
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    programming: <Code2 className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF]" />,
    'ml-data': <Brain className="w-4 h-4 text-[#7955E8] dark:text-[#9B6BFF]" />,
    genai: <Sparkles className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />,
    frameworks: <Layers className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />,
    development: <Globe className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
    fundamentals: <Cpu className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
  };

  const filteredCategories =
    activeCategory === 'all'
      ? PORTFOLIO_DATA.skillsCategories
      : PORTFOLIO_DATA.skillsCategories.filter((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7955E8]/10 dark:bg-[#9B6BFF]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
              <Cpu className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-3 font-display">
              Technical Proficiencies.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
              Hands-on mastery across modern machine learning architectures, autonomous agent frameworks, and production full-stack tooling.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] shadow-sm dark:shadow-none overflow-x-auto max-w-full">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveCategory(opt.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === opt.id
                    ? 'bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] text-white shadow-md shadow-[#365FF5]/20 dark:shadow-[#557CFF]/20'
                    : 'text-[#475569] dark:text-[#A7B2C5] hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Skills Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-7 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5]/50 dark:hover:border-[#557CFF]/50 shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#365FF5]/5 dark:from-[#557CFF]/5 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-white/5">
                      {categoryIcons[cat.id] || <Sparkles className="w-4 h-4 text-[#365FF5]" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#111827] dark:text-white font-display">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#64748B] dark:text-[#8491A5]">
                        {cat.skills.length} verified competencies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#DCE3EF] dark:border-white/5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-colors ${
                        skill.highlight
                          ? 'bg-slate-100 dark:bg-[#0D1220] text-[#365FF5] dark:text-[#557CFF] border-[#365FF5]/30 dark:border-[#557CFF]/30 font-semibold'
                          : 'bg-slate-100 dark:bg-[#0D1220] text-[#111827] dark:text-slate-200 border-[#DCE3EF] dark:border-white/5'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
