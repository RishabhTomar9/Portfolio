import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingMessages = [
  'Initializing Core Systems...',
  'Loading Assets...',
  'Compiling Shaders...',
  'Establishing Uplink...',
  'Welcome, User.'
];

const Loader = ({ onFinish }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev === loadingMessages.length - 1) {
          clearInterval(timer);
          setTimeout(onFinish, 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-[#050507]"
      exit={{ opacity: 0, transition: { duration: 1, ease: "circInOut" } }}
    >
      <div className="absolute inset-0 tech-grid-bg opacity-20"></div>

      <div className="flex flex-col items-center relative z-10">
        <div className="relative w-24 h-24 mb-12">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-[1px] border-purple-500/20 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Main Spinner */}
          <motion.div
            className="absolute inset-0 border-t-2 border-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner Spinner */}
          <motion.div
            className="absolute inset-4 border-b-2 border-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          {/* Center Point */}
          <motion.div
            className="absolute inset-[45%] bg-white rounded-full shadow-[0_0_20px_white]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-4 py-2 px-6 rounded-full glass-card border-white/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              <p className="text-white font-tech text-sm tracking-[0.3em] uppercase animate-flicker">
                {loadingMessages[index]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((index + 1) / loadingMessages.length) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
