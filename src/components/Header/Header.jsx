import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import useScrollSpy from '../../hooks/useScrollSpy';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { Button } from '../ui/button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  // Smooth scroll progress for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dynamic header width based on scroll
  const headerWidth = useTransform(scrollY, [0, 100], ['100%', '90%']);
  const headerPadding = useTransform(scrollY, [0, 100], ['1.5rem', '1rem']);

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
    <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none">
      <motion.div
        layout
        className="pointer-events-auto flex items-center justify-between w-full h-16 md:h-20 transition-all duration-500 ease-[0.22, 1, 0.36, 1] shadow-2xl relative overflow-hidden backdrop-blur-3xl border-b border-white/10 px-6 md:px-10 lg:px-20 bg-black/60"
      >
        {/* Dashboard Aesthetics: Grid & Mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

        {/* LEFT: BRANDING ONLY */}
        <div className="flex items-center gap-8 min-w-[200px]">
          <a href="/#home" className="flex items-center gap-3 group/logo relative">
            <motion.div className="flex items-center gap-2" whileHover={{ x: 2 }}>
              <div className="relative">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-tech italic">
                    R<span className="text-purple-500">.</span>
                </span>
                <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500 blur-[2px]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-black tracking-tighter text-white uppercase leading-none">Rishabh.</span>
              </div>
            </motion.div>
          </a>
        </div>

        {/* CENTER: UNIFIED NAVIGATION */}
        <div className="hidden md:block">
          <DesktopNav scrollItems={scrollItems} activeSection={activeSection} isDocked={true} />
        </div>

        {/* RIGHT: ACTION CENTER */}
        <div className="flex items-center gap-6 md:min-w-[200px] justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex group relative overflow-hidden rounded-full font-black transition-all text-[9px] tracking-[0.2em] uppercase bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-purple-500/30 h-11 px-8"
            asChild
          >
            <a href="mailto:rishabhtomar9999@gmail.com?subject=Project%20Inquiry">
              <span className="relative z-10 flex items-center gap-3">
                Drop Mail 
                <div className="flex gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-white group-hover:bg-purple-500 transition-all" />
                    <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-purple-800 transition-all" />
                </div>
              </span>
            </a>
          </Button>

          <div className="md:hidden flex items-center">
            <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollItems={scrollItems} activeSection={activeSection} />
          </div>
        </div>

        {/* HUD Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent origin-left z-20"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Ambiant Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-purple-500/5 blur-[120px] pointer-events-none transition-opacity duration-1000 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  );
};

export default Header;
