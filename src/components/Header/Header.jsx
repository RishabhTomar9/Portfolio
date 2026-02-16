import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import useScrollSpy from '../../hooks/useScrollSpy';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { Button } from '../ui/button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const scrollItems = ['home', 'about', 'experience', 'skills', 'milestones', 'projects', 'contact'];
  const activeSection = useScrollSpy(scrollItems, 100);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setScrolled(false);
    } else {
      setScrolled(true);
    }
  });

  return (
    // Fixed: Full width, always visible
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 md:pt-6 pointer-events-none">
      <motion.div
        className={`pointer-events-auto transition-all duration-500 ease-in-out flex items-center justify-between ${scrolled
          ? 'w-[90%] md:w-[80%] lg:w-[1000px] bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 shadow-2xl shadow-purple-900/10'
          : 'w-full bg-transparent px-6 py-4 border-b border-transparent'
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex-1">
          <a href="#home" className="flex items-center gap-3 group px-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <span className="font-tech text-sm md:text-base font-bold text-white group-hover:text-purple-400 transition-colors">R</span>
            </div>
            <span className="font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-zinc-200 text-lg font-tech">
              Rishabh<span className="text-purple-500">.</span>
            </span>
          </a>
        </div>

        <div className="hidden md:block">
          <DesktopNav scrollItems={scrollItems} activeSection={activeSection} />
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`hidden md:flex group relative overflow-hidden rounded-full font-bold transition-all font-mono text-[10px] tracking-widest uppercase ${scrolled ? 'h-9 px-5 bg-white text-black hover:bg-zinc-200' : 'h-10 px-6 bg-white/10 text-white hover:bg-white/20 border border-white/5'}`}
            asChild
          >
            <a href="mailto:rishabhtomar9999@gmail.com?subject=I%20want%20to%20work%20with%20you">
              <span className="relative z-10 flex items-center gap-2">
                Let's Talk <span className={`w-1.5 h-1.5 rounded-full ${scrolled ? 'bg-purple-500' : 'bg-green-400'} animate-pulse`} />
              </span>
            </a>
          </Button>

          <div className="md:hidden">
            <MobileNav
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              scrollItems={scrollItems}
              activeSection={activeSection}
            />
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;