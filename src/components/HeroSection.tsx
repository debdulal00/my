import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import {
  FileText,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Brain,
  Code2,
  Cpu,
  Bot,
  Zap,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

interface SignalParticle {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.play().catch(() => {});
    }
  }, [prefersReducedMotion]);

  // Typewriter / cycling text effect
  const roles = [
    'AI/ML Developer',
    'Generative AI Developer',
    'AI Product Builder',
    'Multi-Agent Systems Developer',
    'Entrepreneur',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 65;
    const pauseDelay = isDeleting ? 250 : 2200;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseDelay);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  // 3D Card Tilt Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  // Parallax Scroll for Signature Watermark
  const { scrollY } = useScroll();
  const watermarkY = useTransform(scrollY, [0, 600], [0, 90]);
  const watermarkOpacity = useTransform(scrollY, [0, 450], [0.065, 0.015]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleCardMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Upgraded Interactive Canvas Neural Network with Traveling Signals
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        render();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Responsive node count: 35 nodes on mobile, 70 on desktop
    const nodeCount = window.innerWidth < 768 ? 32 : 68;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    const getPalette = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark
        ? ['#557CFF', '#9B6BFF', '#00D4FF', '#6366F1']
        : ['#365FF5', '#7955E8', '#009BB8', '#4F46E5'];
    };

    let palette = getPalette();

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.6 + 0.3,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    // Traveling signal packets along synapses
    const signals: SignalParticle[] = [];
    const maxSignals = 12;

    const spawnSignal = (fromIdx: number, toIdx: number) => {
      if (signals.length < maxSignals && Math.random() < 0.08) {
        signals.push({
          fromIdx,
          toIdx,
          progress: 0,
          speed: Math.random() * 0.02 + 0.015,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    let mouse = { x: -2000, y: -2000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouse = { x: -2000, y: -2000 };
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handleMouseMove);
    parent?.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      if (!isTabVisible) return;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      palette = isDark
        ? ['#557CFF', '#9B6BFF', '#00D4FF', '#6366F1']
        : ['#365FF5', '#7955E8', '#009BB8', '#4F46E5'];

      // Draw Synaptic lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 135;

          if (dist < maxDist) {
            // Brighten near cursor
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
            const mouseBoost = mDist < 130 ? ((130 - mDist) / 130) * 0.4 : 0;

            const alpha = Math.min(1, (1 - dist / maxDist) * (isDark ? 0.22 : 0.16) + mouseBoost);
            ctx.strokeStyle = isDark
              ? `rgba(85, 124, 255, ${alpha})`
              : `rgba(54, 95, 245, ${alpha})`;
            ctx.lineWidth = mouseBoost > 0 ? 1.3 : 0.75;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Chance to spawn energy pulse
            spawnSignal(i, j);
          }
        }
      }

      // Update and draw traveling signals
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }

        const p1 = nodes[sig.fromIdx];
        const p2 = nodes[sig.toIdx];
        if (!p1 || !p2) {
          signals.splice(s, 1);
          continue;
        }

        const currentX = p1.x + (p2.x - p1.x) * sig.progress;
        const currentY = p1.y + (p2.y - p1.y) * sig.progress;

        ctx.fillStyle = sig.color;
        ctx.shadowColor = sig.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Cursor repulsion
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 130) {
          const force = (130 - mDist) / 130;
          node.x += (mdx / mDist) * force * 1.6;
          node.y += (mdy / mDist) * force * 1.6;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Glow near mouse
        const nodeMouseDist = Math.sqrt((node.x - mouse.x) ** 2 + (node.y - mouse.y) ** 2);
        const nodeGlow = nodeMouseDist < 120 ? 0.95 : node.alpha;

        ctx.fillStyle = node.color;
        ctx.globalAlpha = nodeGlow;
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          nodeMouseDist < 120 ? node.radius * 1.4 : node.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      parent?.removeEventListener('mousemove', handleMouseMove);
      parent?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[94vh] flex items-center justify-center pt-24 pb-14 overflow-hidden bg-[#F5F7FC] dark:bg-[#07080D] transition-colors duration-300"
    >
      {/* Background Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-65 z-0"
      />

      {/* Signature Portrait Watermark (Faint, Cinematic, Non-Intrusive) */}
      <motion.div
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.065 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[680px] pointer-events-none z-0 select-none overflow-hidden"
      >
        <img
          src={PORTFOLIO_DATA.personal.avatarUrl}
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover grayscale contrast-125 brightness-110 blur-[1px] mix-blend-multiply dark:mix-blend-screen opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F7FC] via-transparent to-[#F5F7FC] dark:from-[#07080D] dark:via-transparent dark:to-[#07080D]" />
      </motion.div>

      {/* Moving Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-gradient-to-tr from-[#365FF5]/10 to-[#7955E8]/10 dark:from-[#557CFF]/20 dark:to-[#9B6BFF]/15 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-gradient-to-br from-[#009BB8]/10 to-[#365FF5]/10 dark:from-[#00D4FF]/15 dark:to-[#557CFF]/20 blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle Neural Perspective Grid */}
      <div className="absolute inset-0 bg-neural-grid opacity-35 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* Availability Notification Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center lg:justify-start"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-[#0D1220]/90 border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.25)] shadow-md dark:shadow-lg backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <span className="text-xs sm:text-sm font-medium text-[#475569] dark:text-slate-200 tracking-wide font-mono">
              {PORTFOLIO_DATA.personal.availabilityNotice}
            </span>
          </div>
        </motion.div>

        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Animated Headline, Typewriter & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Animated Intro Label */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#365FF5] dark:text-[#557CFF] uppercase mb-3 font-mono">
              <Sparkles
                className="w-4 h-4 text-[#009BB8] dark:text-[#00D4FF] animate-spin"
                style={{ animationDuration: '6s' }}
              />
              <span>{PORTFOLIO_DATA.personal.headlineKicker}</span>
            </div>

            {/* Main Headline with Staggered Word Reveal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111827] dark:text-[#F8FAFC] leading-[1.08] mb-4 text-balance font-display">
              Creating Intelligent Experiences with{' '}
              <span className="bg-gradient-to-r from-[#365FF5] via-[#7955E8] to-[#009BB8] dark:from-[#557CFF] dark:via-[#9B6BFF] dark:to-[#00D4FF] bg-clip-text text-transparent animate-gradient-flow inline-block">
                Artificial Intelligence.
              </span>
            </h1>

            {/* Dynamic Typewriter Role Subline */}
            <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold text-[#111827] dark:text-slate-200 mb-5 min-h-[42px]">
              <span className="text-[#64748B] dark:text-slate-400 font-normal">Specializing as</span>
              <span className="text-[#365FF5] dark:text-[#00D4FF] border-b-2 border-[#365FF5]/40 dark:border-[#00D4FF]/50 pb-0.5">
                {displayText}
              </span>
              <span className="w-0.5 h-6 bg-[#365FF5] dark:bg-[#00D4FF] animate-pulse inline-block" />
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B2C5] leading-relaxed mb-4 max-w-2xl font-light">
              {PORTFOLIO_DATA.personal.subheadline}
            </p>

            <p className="text-sm sm:text-base font-medium text-[#64748B] dark:text-[#8491A5] mb-8">
              {PORTFOLIO_DATA.personal.missionLine}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#365FF5] via-[#6366F1] to-[#7955E8] dark:from-[#557CFF] dark:via-[#6366F1] dark:to-[#9B6BFF] hover:opacity-95 shadow-lg shadow-[#365FF5]/25 dark:shadow-[#557CFF]/30 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenResumeModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-[#111827] dark:text-white bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.25)] hover:border-[#365FF5] dark:hover:border-[#557CFF] hover:bg-slate-50 dark:hover:bg-[#162033] transition-all flex items-center justify-center gap-2 shadow-md dark:shadow-none"
              >
                <FileText className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF]" />
                <span>Download Resume</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-[#475569] dark:text-[#A7B2C5] hover:text-[#111827] dark:hover:text-white bg-slate-200/60 dark:bg-[#0D1220]/80 hover:bg-slate-200 dark:hover:bg-[#111827] border border-transparent hover:border-[#DCE3EF] dark:hover:border-[rgba(148,163,184,0.2)] transition-all text-center flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Let's Connect</span>
              </motion.a>
            </div>

            {/* Social Links & Trust Strip */}
            <div className="flex flex-wrap items-center gap-3.5 text-sm text-[#64748B] dark:text-slate-400">
              <span className="text-xs uppercase tracking-wider text-[#64748B] dark:text-slate-500 font-mono">
                Connect:
              </span>
              <a
                href={PORTFOLIO_DATA.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] hover:border-[#365FF5] dark:hover:border-[#557CFF] text-[#475569] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white transition-all hover:scale-105 shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] hover:border-[#365FF5] dark:hover:border-[#557CFF] text-[#475569] dark:text-slate-300 hover:text-[#365FF5] dark:hover:text-[#557CFF] transition-all hover:scale-105 shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.socialLinks.emailMailto}
                className="p-2.5 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] hover:border-[#7955E8] dark:hover:border-[#9B6BFF] text-[#475569] dark:text-slate-300 hover:text-[#7955E8] dark:hover:text-[#9B6BFF] transition-all hover:scale-105 shadow-sm"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.socialLinks.toolsverse}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#365FF5] dark:text-slate-200 hover:text-[#7955E8] dark:hover:text-white px-3 py-1.5 rounded-xl bg-white dark:bg-[#111827] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.2)] hover:border-[#365FF5] transition-all shadow-sm"
              >
                <span>ToolsVerse AI</span>
                <ExternalLink className="w-3 h-3 text-[#365FF5] dark:text-[#557CFF]" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Lifelike Animated Portrait in Profile Card with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            {/* Perspective Tilt Container */}
            <div
              className="relative w-full max-w-sm sm:max-w-md perspective-container py-6"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Floating Technology Labels: Python, Machine Learning, LangGraph, LLMs, Generative AI */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1 -left-4 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-[#0D1220]/95 backdrop-blur-md border border-[#DCE3EF] dark:border-[#557CFF]/50 text-[#365FF5] dark:text-[#557CFF] text-xs font-mono font-semibold shadow-lg shadow-[#365FF5]/10 dark:shadow-[#557CFF]/20 flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-[#009BB8] dark:text-[#00D4FF]" />
                <span>Python</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute top-1/4 -right-6 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-[#0D1220]/95 backdrop-blur-md border border-[#DCE3EF] dark:border-[#9B6BFF]/50 text-[#7955E8] dark:text-[#9B6BFF] text-xs font-mono font-semibold shadow-lg shadow-[#7955E8]/10 dark:shadow-[#9B6BFF]/20 flex items-center gap-1.5"
              >
                <Brain className="w-3.5 h-3.5 text-[#7955E8] dark:text-[#9B6BFF]" />
                <span>LangGraph</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-28 -left-6 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-[#0D1220]/95 backdrop-blur-md border border-[#DCE3EF] dark:border-[#00D4FF]/50 text-[#009BB8] dark:text-[#00D4FF] text-xs font-mono font-semibold shadow-lg shadow-[#009BB8]/10 dark:shadow-[#00D4FF]/20 flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-[#009BB8] dark:text-[#00D4FF]" />
                <span>Machine Learning</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute bottom-12 -right-4 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-[#0D1220]/95 backdrop-blur-md border border-[#DCE3EF] dark:border-indigo-400/50 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold shadow-lg flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>LLMs</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                className="absolute -bottom-2 left-6 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-[#0D1220]/95 backdrop-blur-md border border-[#DCE3EF] dark:border-emerald-400/50 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold shadow-lg flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Generative AI</span>
              </motion.div>

              {/* Main 3D Tilt Frame with Cinematic Animated Gradient Borders */}
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative rounded-[28px] p-[2px] bg-gradient-to-br from-[#365FF5] via-[#7955E8] to-[#009BB8] dark:from-[#557CFF] dark:via-[#9B6BFF] dark:to-[#00D4FF] shadow-[0_15px_45px_rgba(54,95,245,0.2)] dark:shadow-[0_0_60px_rgba(85,124,255,0.35)] transition-shadow hover:shadow-[0_20px_60px_rgba(54,95,245,0.3)] dark:hover:shadow-[0_0_80px_rgba(85,124,255,0.5)]"
              >
                <div className="rounded-[26px] bg-white dark:bg-[#111827] overflow-hidden border border-[#DCE3EF] dark:border-white/10 relative">
                  {/* Portrait Media: Debdulal Sahoo's Real Animated Portrait Video with Photo Poster */}
                  <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-slate-900 group">
                    {!prefersReducedMotion ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={PORTFOLIO_DATA.personal.avatarUrl}
                        preload="auto"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        aria-label="Debdulal Sahoo - Realistic Animated AI/ML Engineer Portrait"
                      >
                        <source
                          src={PORTFOLIO_DATA.personal.avatarVideoUrl}
                          type="video/mp4"
                        />
                        {/* Fallback image if video fails or is unsupported */}
                        <img
                          src={PORTFOLIO_DATA.personal.avatarUrl}
                          alt="Debdulal Sahoo - AI/ML Developer & AI Product Builder"
                          className="w-full h-full object-cover object-top"
                        />
                      </video>
                    ) : (
                      <img
                        src={PORTFOLIO_DATA.personal.avatarUrl}
                        alt="Debdulal Sahoo - AI/ML Developer & AI Product Builder"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Animated Light Reflection Sweep across Portrait */}
                    <div className="absolute inset-0 pointer-events-none opacity-35 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] -translate-x-full animate-[shimmer_5s_infinite]" />

                    {/* Subtle cinematic gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 pointer-events-none" />

                    {/* Profile Overlay Identity */}
                    <div className="absolute bottom-4 left-4 right-4 text-left z-10 pointer-events-none">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wider font-mono">
                          {PORTFOLIO_DATA.personal.roleTitle}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"
                          title="Live Animated Portrait"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight font-display">
                        {PORTFOLIO_DATA.personal.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#557CFF]" />
                        <span>West Bengal, India</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Credential Bar */}
                  <div className="p-4 bg-slate-50 dark:bg-[#0D1220] border-t border-[#DCE3EF] dark:border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[#64748B] dark:text-slate-400 block text-[10px] uppercase font-mono">
                        University
                      </span>
                      <span className="font-semibold text-[#111827] dark:text-white truncate block">
                        Brainware
                      </span>
                    </div>
                    <div className="border-x border-[#DCE3EF] dark:border-white/10">
                      <span className="text-[#64748B] dark:text-slate-400 block text-[10px] uppercase font-mono">
                        Current CGPA
                      </span>
                      <span className="font-semibold font-mono text-[#365FF5] dark:text-[#00D4FF] block">
                        8.6 / 10
                      </span>
                    </div>
                    <div>
                      <span className="text-[#64748B] dark:text-slate-400 block text-[10px] uppercase font-mono">
                        Graduation
                      </span>
                      <span className="font-semibold text-[#111827] dark:text-white block">
                        2027
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
