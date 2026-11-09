import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, CheckCircle2, Calendar, MapPin, PlusCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
            <Briefcase className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
            <span>Building Track</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-4 text-balance font-display">
            Development & Engineering Experience.
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
            Honest track record of self-directed product engineering, agent state machines, and real-world system deployments.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5]/50 dark:hover:border-[#557CFF]/50 transition-all shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs font-mono">
                    <span className="font-semibold text-[#111827] dark:text-white">
                      {exp.organization}
                    </span>
                    <span aria-hidden="true" className="text-[#64748B] dark:text-slate-600">·</span>
                    <span className="text-[#009BB8] dark:text-[#00D4FF] font-medium">{exp.type}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white font-display">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B] dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-white/5">
                    <Calendar className="w-3.5 h-3.5 text-[#365FF5] dark:text-[#557CFF]" /> {exp.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-[#7955E8] dark:text-[#9B6BFF]" /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Focus Areas */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-[#64748B] dark:text-slate-400 font-mono block mb-3">
                  Applied Engineering Focus Areas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exp.focusAreas.map((area, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569] dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF] shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applied Technologies */}
              <div className="pt-5 border-t border-[#DCE3EF] dark:border-white/5">
                <span className="text-xs uppercase tracking-wider text-[#64748B] dark:text-slate-400 font-mono block mb-2">
                  Applied Frameworks & Tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-[#0D1220] text-[#111827] dark:text-slate-300 border border-[#DCE3EF] dark:border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Internship Availability Card */}
          <div className="p-8 rounded-3xl border-2 border-dashed border-[#DCE3EF] dark:border-[#262B38] bg-white/60 dark:bg-[#0D1220]/40 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-[#111827] border border-[#DCE3EF] dark:border-white/5 flex items-center justify-center text-[#365FF5] dark:text-[#557CFF]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider font-mono">
              Ready for AI/ML Engineering Internships & Startup Roles
            </span>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 max-w-lg font-light leading-relaxed">
              Open to summer and semester internship positions in machine learning engineering, autonomous multi-agent systems, and generative AI product teams globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
