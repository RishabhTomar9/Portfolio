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
    <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pt-4 md:pt-6 pointer-events-none">
      <motion.div
        className="pointer-events-auto flex items-center justify-between w-[95%] md:w-[90%] lg:w-[1200px] bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl px-6 py-3 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:border-white/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Left Section: Logo & Status */}
        <div className="flex-1 flex items-center gap-4">
          <a href="/#home" className="flex items-center gap-2 group/logo relative overflow-hidden">
            <motion.div
              className="flex items-center gap-1.5"
              whileHover={{ x: 2 }}
            >
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-white font-tech">
                Rishabh<span className="text-purple-500">.</span>
              </span>
              <span className="hidden sm:block text-xs font-bold text-zinc-500 tracking-widest uppercase opacity-0 group-hover/logo:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover/logo:translate-x-0">
                Portfolio
              </span>
            </motion.div>
          </a>
        </div>

        {/* Center Section: Navigation */}
        <div className="hidden md:block">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <DesktopNav scrollItems={scrollItems} activeSection={activeSection} />
          </motion.div>
        </div>

        {/* Right Section: CTA & Mobile Nav */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex group relative overflow-hidden rounded-xl font-bold transition-all font-bold text-[10px] tracking-widest uppercase h-10 px-6 bg-white/5 text-white hover:bg-white/10 border border-white/10"
            asChild
          >
            <a href="mailto:rishabhtomar9999@gmail.com?subject=Project%20Inquiry">
              <span className="relative z-10 flex items-center gap-2">
                Get In Touch <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-purple-500 transition-colors duration-300" />
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

        {/* Bottom Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent origin-left z-20"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Background Shadow/Glow effect on scroll */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-purple-500/10 blur-[100px] pointer-events-none transition-opacity duration-1000 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  );
};

export default Header;
