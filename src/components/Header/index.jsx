import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import Magnetic from '../common/Magnetic';
import useScrollSpy from '../../hooks/useScrollSpy';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ScrollSpy Hook
  const scrollItems = ['home', 'about', 'experience', 'skills', 'milestones', 'projects', 'contact'];
  const activeSection = useScrollSpy(scrollItems, 100);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className={`fixed top-4 left-0 right-0 z-[999] mx-auto w-[95%] max-w-6xl transition-all duration-300 rounded-2xl border ${scrolled || menuOpen
          ? 'bg-zinc-950/80 backdrop-blur-xl border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-transparent'
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center px-6 py-4">

          {/* Logo */}
          <Magnetic>
            <a href="#home" className="text-xl font-bold tracking-tighter flex items-center gap-2 group font-tech">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-mono text-sm group-hover:rotate-12 transition-transform">
                RT
              </div>
              <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-colors">
                Portfolio_
              </span>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 text-sm font-medium text-zinc-400">
              {scrollItems.map((item) => (
                <li key={item} className="relative group list-none">
                  <Magnetic>
                    <a
                      href={`#${item}`}
                      className={`block transition-colors py-2 uppercase tracking-wide text-xs font-tech relative ${activeSection === item ? "text-white" : "hover:text-white"}`}
                    >
                      {item}
                      <span className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-purple-500 to-yellow-500 transition-all duration-300 ${activeSection === item ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>

            <Magnetic>
              <Button variant="neon" size="sm" asChild>
                <a
                  href="https://www.linkedin.com/in/rishabhtomar99/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Let's Talk
                </a>
              </Button>
            </Magnetic>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[800] bg-zinc-950/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className="flex flex-col gap-6 text-center">
              {scrollItems.map((item) => (
                <li key={item} className="list-none">
                  <a
                    href={`#${item}`}
                    className={`text-2xl font-bold uppercase tracking-widest transition-colors ${activeSection === item ? "text-purple-400" : "text-zinc-400 hover:text-white"}`}
                    onClick={closeMenu}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <Button variant="glow" size="lg" asChild>
              <a
                href="https://www.linkedin.com/in/rishabhtomar99/"
                target="_blank"
                onClick={closeMenu}
              >
                Connect Now
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
