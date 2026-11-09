import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, Building2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
            <GraduationCap className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-4 text-balance font-display">
            Education & Foundation.
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
            Specialized honors curriculum in Artificial Intelligence and Machine Learning backed by rigorous computational foundations.
          </p>
        </div>

        {/* Vertical Animated Timeline */}
        <div className="relative border-l-2 border-[#DCE3EF] dark:border-[#262B38] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {PORTFOLIO_DATA.educationTimeline.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Glowing Node Indicator */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] top-2 w-6 h-6 rounded-full border-4 ${
                  item.current
                    ? 'border-[#365FF5] dark:border-[#557CFF] bg-white dark:bg-[#07080D] shadow-[0_0_20px_rgba(85,124,255,0.7)]'
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0D1220]'
                }`}
              />

              <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] hover:border-[#365FF5]/50 dark:hover:border-[#557CFF]/50 transition-all shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/25 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF]" />
                    <span className="text-sm sm:text-base font-bold text-[#111827] dark:text-white font-display">
                      {item.institution}
                    </span>
                    {item.current && (
                      <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#365FF5]/10 dark:bg-[#557CFF]/15 text-[#365FF5] dark:text-[#557CFF] font-semibold border border-[#365FF5]/20 dark:border-[#557CFF]/30">
                        Active Candidate
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#009BB8] dark:text-[#00D4FF]" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white mb-2 font-display">
                  {item.degree}
                </h3>

                {item.boardOrAffiliation && (
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mb-3">
                    Board: <span className="text-[#475569] dark:text-slate-300">{item.boardOrAffiliation}</span>
                  </p>
                )}

                {item.score && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-slate-100 dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-white/5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 mb-4">
                    <Award className="w-3.5 h-3.5" />
                    <span>{item.score}</span>
                  </div>
                )}

                <p className="text-sm sm:text-base text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
