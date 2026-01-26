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
          setTimeout(onFinish, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-zinc-950"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-8">
          <motion.div
            className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-t-transparent border-r-white border-b-transparent border-l-yellow-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="h-8 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-white font-mono text-sm tracking-widest uppercase"
            >
              {loadingMessages[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
