import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hexChars = "0123456789ABCDEF";
const generateRandomHex = () => {
  let hex = "0x";
  for (let i = 0; i < 8; i++) {
    hex += hexChars[Math.floor(Math.random() * 16)];
  }
  return hex;
};

const loadingStates = [
  "INITIALIZING_CORE...",
  "LOADING_ASSETS...",
  "DECRYPTING_DATA...",
  "ESTABLISHING_UPLINK...",
  "VERIFYING_SIGNATURES...",
  "SYSTEM_READY"
];

const Loader = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const [currentHex, setCurrentHex] = useState(generateRandomHex());
  const [loadingText, setLoadingText] = useState(loadingStates[0]);

  useEffect(() => {
    // Percentage timer
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 1200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 2) + 1;
      });
    }, 40);

    // Random Hex Timer
    const hexInterval = setInterval(() => {
      setCurrentHex(generateRandomHex());
    }, 100);

    // Text Timer
    const textInterval = setInterval(() => {
      setLoadingText(loadingStates[Math.floor(Math.random() * (loadingStates.length - 1))]);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(hexInterval);
      clearInterval(textInterval);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden font-bold"
      exit={{
        opacity: 0,
        scale: 1.2,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] pointer-events-none opacity-20" />

      {/* Main Reactor Structure */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">

        {/* Outer Tech Ring - Static with simple rotation */}
        <motion.div
          className="absolute inset-0 border-[1px] border-zinc-800 rounded-full opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 w-1 h-3 bg-zinc-600 -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-1 h-3 bg-zinc-600 -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 h-1 w-3 bg-zinc-600 -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 h-1 w-3 bg-zinc-600 -translate-y-1/2" />
        </motion.div>

        {/* Middle Energy Ring - Dashed */}
        <motion.div
          className="absolute inset-8 border-[2px] border-dashed border-zinc-700/50 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Reactor Ring - Glowing */}
        <motion.div
          className="absolute inset-12 border-2 border-transparent border-t-purple-500 border-l-blue-500 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Pulse Core */}
        <motion.div
          className="absolute inset-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full backdrop-blur-sm border border-white/10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central Data Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.div
            className="text-6xl md:text-8xl font-black text-white tracking-tighter mix-blend-screen"
            key={percent}
          >
            {Math.min(percent, 100)}
            <span className="text-2xl md:text-3xl text-zinc-600 ml-1">%</span>
          </motion.div>

          <div className="flex flex-col items-center mt-4 space-y-1">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
            <div className="text-[10px] font-bold text-purple-400 tracking-[0.2em] uppercase">
              {percent === 100 ? "ACCESS_GRANTED" : loadingText}
            </div>
            <div className="text-[9px] font-bold text-zinc-600 uppercase">
              MEM_ADDR: {currentHex}
            </div>
          </div>
        </div>

      </div>

      {/* Decorative Scanline */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.3)] z-50 pointer-events-none"
        animate={{ top: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

    </motion.div>
  );
};

export default Loader;
