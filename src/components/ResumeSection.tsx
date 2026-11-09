import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Eye, CheckCircle2 } from 'lucide-react';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
  onDownloadResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  onOpenResumeModal,
  onDownloadResume,
}) => {
  return (
    <section
      id="resume"
      className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="rounded-3xl p-1 bg-gradient-to-br from-[#365FF5]/30 via-[#DCE3EF] to-[#7955E8]/30 dark:from-[#557CFF]/30 dark:via-[#262B38]/50 dark:to-[#9B6BFF]/30 shadow-xl dark:shadow-2xl">
          <div className="rounded-[22px] bg-white dark:bg-[#0D1220] p-8 sm:p-14 relative overflow-hidden border border-[#DCE3EF] dark:border-transparent">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#365FF5]/10 dark:bg-[#557CFF]/15 blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-4 font-mono">
                <FileText className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
                <span>Curriculum Vitae</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-4 text-balance font-display">
                Let's Create Something Impactful.
              </h2>

              <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed mb-8">
                Explore my verified academic background, technical skills, projects, and development experience in a standardized ATS format.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-xs sm:text-sm text-[#475569] dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>B.Tech in CSE (AI & ML) · CGPA 8.6/10</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>ToolsVerse AI & SivInd AI Flagship Builds</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>LangGraph Multi-Agent Architecture</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>ATS-Friendly Document Layout</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenResumeModal}
                  className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#6366F1] shadow-lg shadow-[#365FF5]/20 dark:shadow-[#557CFF]/20 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Interactive Resume</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onDownloadResume}
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#111827] dark:text-slate-300 hover:text-[#365FF5] dark:hover:text-white bg-slate-100 dark:bg-[#111827] border border-[#DCE3EF] dark:border-[#262B38] hover:border-[#365FF5] dark:hover:border-[#557CFF] flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF]" />
                  <span>Download Resume (PDF)</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
