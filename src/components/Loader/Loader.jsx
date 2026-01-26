import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden"
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none" />

      {/* Main Reactor Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        
        {/* Outer Ring - Slow Rotate */}
        <motion.div 
          className="absolute inset-0 border border-zinc-800 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-zinc-600 rounded-full"></div>
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-zinc-600 rounded-full"></div>
        </motion.div>

        {/* Middle Tech Ring - Segmented */}
        <motion.div 
          className="absolute inset-4 border-2 border-transparent border-t-purple-500/50 border-r-purple-500/50 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Fast Scan Ring */}
        <motion.div 
          className="absolute inset-8 border border-blue-500/30 rounded-full"
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
           <div className="absolute inset-0 border-t-2 border-blue-400 rounded-full animate-spin [animation-duration:1s]"></div>
        </motion.div>

        {/* Core & Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-[2px]">
           <motion.div 
             className="text-5xl md:text-7xl font-black text-white font-tech tracking-tighter"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
           >
             {Math.min(percent, 100)}
             <span className="text-2xl text-purple-500 align-top">%</span>
           </motion.div>
           <div className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] mt-2 group">
             <span className="group-hover:text-purple-400 transition-colors">SYSTEM_LOAD</span>
           </div>
        </div>

        {/* Orbits */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
           <div className="absolute top-0 left-1/2 w-1 h-32 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 blur-sm transform -translate-x-1/2 origin-bottom"></div>
        </div>

      </div>

      {/* Loading Scanline Line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.5)] z-20"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Bottom Status Grid */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
         {[...Array(5)].map((_, i) => (
           <motion.div
             key={i}
             className="w-2 h-2 bg-zinc-800 rounded-full"
             animate={{ 
               backgroundColor: percent > (i * 20) ? "#a855f7" : "#27272a",
               scale: percent > (i * 20) ? 1.2 : 1 
             }}
           />
         ))}
      </div>

    </motion.div>
  );
};
export default Loader;
