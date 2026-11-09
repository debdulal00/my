import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  X,
  Bot,
  ArrowRight,
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData.ts';

// 3D Tilt Project Card Component with Mouse Lighting
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpenSpecs: (p: Project) => void;
}> = ({ project, index, onOpenSpecs }) => {
  const isEven = index % 2 === 0;
  const projectNumber = `0${index + 1}`;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-[#365FF5]/20 via-[#DCE3EF] to-[#7955E8]/20 dark:from-[#557CFF]/20 dark:via-[#262B38]/60 dark:to-[#9B6BFF]/20 hover:from-[#365FF5]/50 hover:to-[#009BB8]/50 dark:hover:from-[#557CFF]/50 dark:hover:to-[#00D4FF]/50 transition-all duration-300 shadow-xl dark:shadow-2xl group overflow-hidden"
    >
      {/* Mouse-responsive radial lighting highlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(85, 124, 255, 0.25), transparent 60%)`,
          }}
        />
      )}

      <div className="rounded-[22px] bg-white dark:bg-[#111827] overflow-hidden border border-[#DCE3EF] dark:border-white/5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Visual Preview Column */}
          <div
            className={`lg:col-span-6 relative overflow-hidden bg-slate-900 min-h-[320px] sm:min-h-[420px] ${
              isEven ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {/* Project Index Stamp */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-2">
              <span className="text-[#00D4FF] font-black">{projectNumber}</span>
              <span className="text-slate-400">/ 05</span>
            </div>

            <img
              src={project.imageUrl}
              alt={`${project.name} Interface Preview`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            {/* Interactive Architecture Button */}
            <button
              onClick={() => onOpenSpecs(project)}
              className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/10 transition-all flex items-center gap-1.5 text-xs font-medium hover:scale-105 shadow-lg"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Interactive Specs</span>
            </button>
          </div>

          {/* Content Column */}
          <div
            className={`lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between ${
              isEven ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div>
              {/* Category & Role */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-3">
                <span className="text-[#365FF5] dark:text-[#557CFF] font-semibold">{project.category}</span>
                <span aria-hidden="true" className="text-[#64748B] dark:text-slate-600">·</span>
                <span className="text-[#475569] dark:text-slate-400">{project.role}</span>
                {project.isFlagship && (
                  <>
                    <span aria-hidden="true" className="text-[#64748B] dark:text-slate-600">·</span>
                    <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Flagship Build</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-3 font-display">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#475569] dark:text-[#A7B2C5] leading-relaxed mb-6 font-light">
                {project.description}
              </p>

              {/* Notice */}
              {project.statusNotice && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-300 text-xs mb-6 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{project.statusNotice}</span>
                </div>
              )}

              {/* Key Features */}
              <div className="space-y-2 mb-6">
                <span className="text-xs uppercase tracking-wider text-[#64748B] dark:text-slate-400 font-mono block font-semibold">
                  Key Capabilities
                </span>
                <ul className="space-y-2">
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#475569] dark:text-slate-300 font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-[#0D1220] text-[#111827] dark:text-slate-200 border border-[#DCE3EF] dark:border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Live Demo + Repository */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#DCE3EF] dark:border-white/5">
              {project.liveUrl && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] hover:opacity-95 shadow-md shadow-[#365FF5]/20 dark:shadow-[#557CFF]/25 inline-flex items-center gap-2 group/btn"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </motion.a>
              )}

              {project.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#111827] dark:text-white bg-slate-100 dark:bg-[#0D1220] hover:bg-slate-200 dark:hover:bg-[#162033] border border-[#DCE3EF] dark:border-white/5 inline-flex items-center gap-2 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </motion.a>
              )}

              <button
                onClick={() => onOpenSpecs(project)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#475569] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white inline-flex items-center gap-1.5 ml-auto transition-colors"
              >
                <span>Full System Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterOptions = [
    'All',
    'Generative AI',
    'Healthcare AI',
    'Autonomous Agents',
    'Computer Vision',
    'E-Commerce',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.filterCategory === activeFilter);

  return (
    <section
      id="projects"
      className="py-20 relative bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300 border-t border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#365FF5]/10 dark:bg-[#557CFF]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#7955E8]/10 dark:bg-[#9B6BFF]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
              <Sparkles className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF]" />
              <span>Flagship Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] mb-3 font-display">
              Engineered Products & Systems.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] font-light leading-relaxed">
              Living platforms, multi-agent frameworks, and commercial ventures built with zero compromise.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] shadow-sm dark:shadow-none overflow-x-auto max-w-full">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  activeFilter === opt
                    ? 'bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] text-white shadow-md shadow-[#365FF5]/20 dark:shadow-[#557CFF]/20'
                    : 'text-[#475569] dark:text-[#A7B2C5] hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards: Alternating Editorial Layout with 3D Tilt */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenSpecs={(p) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Project Architecture Deep-Dive Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0D1220] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.22)] p-6 sm:p-8 shadow-2xl text-left">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-[#111827] hover:bg-slate-200 dark:hover:bg-[#1A2234] text-[#475569] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#365FF5] dark:text-[#557CFF] font-semibold uppercase tracking-wider mb-2 font-mono">
                <Bot className="w-4 h-4" />
                <span>{selectedProject.category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white mb-2 font-display">
                {selectedProject.name}
              </h3>

              <p className="text-xs text-[#64748B] dark:text-slate-400 mb-6 font-mono">
                Role: <strong className="text-[#111827] dark:text-slate-200">{selectedProject.role}</strong>
              </p>

              <div className="rounded-2xl overflow-hidden mb-6 border border-[#DCE3EF] dark:border-white/10 aspect-video bg-slate-900">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6 text-sm text-[#475569] dark:text-slate-300">
                <div>
                  <h4 className="text-sm font-bold text-[#111827] dark:text-white mb-2 font-display">
                    Platform Summary
                  </h4>
                  <p className="leading-relaxed font-light">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#111827] dark:text-white mb-2 font-display">
                    Full Architectural Capabilities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#365FF5] dark:text-[#557CFF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#111827] dark:text-white mb-2 font-display">
                    Verified Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 dark:bg-[#111827] text-[#365FF5] dark:text-[#557CFF] border border-[#DCE3EF] dark:border-[#557CFF]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DCE3EF] dark:border-white/5 flex items-center justify-between">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#365FF5] to-[#7955E8] dark:from-[#557CFF] dark:to-[#9B6BFF] inline-flex items-center gap-1.5"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#64748B] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white ml-auto"
                >
                  Close Blueprint
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
