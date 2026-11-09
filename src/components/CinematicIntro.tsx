import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Auto-dismiss after 1.35 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400); // Allow fade out
    }, 1350);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080D] overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient center glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.35 }}
            transition={{ duration: 1 }}
            className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#4F8CFF] to-[#9B72F2] blur-[120px] pointer-events-none"
          />

          {/* Sweeping Laser Line */}
          <motion.div
            initial={{ x: '-100vw', opacity: 0 }}
            animate={{ x: '100vw', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute top-1/2 left-0 w-64 h-[1.5px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent shadow-[0_0_20px_#06B6D4]"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Custom DS Monogram Logo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F8CFF] via-[#6366F1] to-[#9B72F2] p-[1.5px] shadow-[0_0_35px_rgba(79,140,255,0.4)] mb-5"
            >
              <div className="w-full h-full rounded-[14px] bg-[#07080D] flex items-center justify-center">
                <span className="text-2xl font-black tracking-tight text-white font-display">
                  DS
                </span>
              </div>
            </motion.div>

            {/* Name Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display mb-1.5"
            >
              DEBDULAL SAHOO
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-[#06B6D4] uppercase"
            >
              AI/ML Developer · Product Builder
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
