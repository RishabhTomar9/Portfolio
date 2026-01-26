import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Magnetic from '../common/Magnetic';
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
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <motion.div
        className={`w-full transition-all duration-500 ${scrolled || menuOpen
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 py-3 shadow-lg shadow-purple-900/10'
          : 'bg-transparent py-5'
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto flex justify-between items-center px-6 relative">
          <div className="flex-1">
            <Magnetic>
              <a href="#home" className="flex items-center gap-2 group">
                <span className="font-tech text-xl font-bold tracking-tighter text-white">
                  Rishabh<span className="text-purple-500">.</span>
                </span>
              </a>
            </Magnetic>
          </div>

          <div className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:block">
            <DesktopNav scrollItems={scrollItems} activeSection={activeSection} />
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            <Magnetic>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex group relative overflow-hidden rounded-full bg-white text-black font-bold px-6 py-2 hover:bg-zinc-200 transition-all"
                asChild
              >
                <a href="mailto:rishabhtomar9999@gmail.com?subject=I%20want%20to%20work%20with%20you">
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Talk
                    <svg
                      className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              </Button>
            </Magnetic>

            <div className="md:hidden">
              <MobileNav
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                scrollItems={scrollItems}
                activeSection={activeSection}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;