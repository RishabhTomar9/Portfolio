import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import useWindowSize from '../../hooks/useWindowSize';
import { Button } from '../ui/button';

const MovingGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-[-50%] w-[200%] h-[200%] opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        animate={{
          transform: ['translate(0, 0)', 'translate(-50px, -50px)']
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950"></div>
    </div>
  );
};

const Hero = () => {
  const { width } = useWindowSize();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  const isMobile = width <= 768;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Moving Grid Background */}
      <MovingGrid />

      {/* Floating Ambient Orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
      />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-2 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <span className="text-sm font-bold tracking-wider text-purple-300 uppercase font-mono">
              🚀 Welcome to the Future
            </span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight font-tech">
            Designing the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-yellow-400 animate-gradient-x">
              Future of Web
            </span>
          </h1>

          <div className="text-2xl lg:text-3xl font-medium text-blue-200/90 mb-8 h-12 flex items-center font-tech">
            <span className="mr-3 text-zinc-500 font-mono">{'//'}</span>
            <Typewriter
              options={{
                strings: [
                  "Building Zintrix Technologies...",
                  "Mastering Data Engineering...",
                  "PL/SQL & Snowflake Expert...",
                  "Architecting Scalable Systems..."
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          <p className="text-lg text-zinc-400 max-w-lg mb-10 leading-relaxed border-l-2 border-zinc-700 pl-6">
            I'm <strong className="text-white">Rishabh Tomar</strong>. <br />
            Selected as <strong className="text-purple-400">Data Engineer</strong> at <strong className="text-white">HCLTech</strong> (PL/SQL & Snowflake). <br />
            <strong className="text-blue-400">Co-Founder & Co-CTO</strong> at <strong className="text-white">Zintrix Technologies</strong>.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="relative overflow-hidden group px-8 py-4 bg-white text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <a href="#projects">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-blue-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative flex items-center gap-2">
                  Explore Work <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a href="#contact">
                Contact_Me_
              </a>
            </Button>
          </div>

          {/* Tech Stack Mini-Grid */}
          <div className="mt-14 flex items-center gap-6 text-zinc-500 text-sm font-mono">
            <span>// STACK_INIT</span>
            <div className="h-px w-12 bg-zinc-800"></div>
            <div className="flex gap-4 text-2xl">
              <i className="devicon-react-original hover:text-blue-400 transition-colors cursor-help" title="React"></i>
              <i className="devicon-nodejs-plain hover:text-green-500 transition-colors cursor-help" title="Node.js"></i>
              <i className="devicon-mongodb-plain hover:text-green-400 transition-colors cursor-help" title="MongoDB"></i>
              <i className="devicon-python-plain hover:text-yellow-300 transition-colors cursor-help" title="Python"></i>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Futuristic Card/Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ y: y1 }} className="relative z-10 w-full max-w-md perspective-1000">
            {/* Glitch/Holographic Container */}
            <div className="relative group rounded-2xl p-1 bg-gradient-to-br from-zinc-700/50 to-zinc-900/50 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative overflow-hidden rounded-xl bg-zinc-950 aspect-[4/5] object-cover">
                <img
                  src="/Images/hero-image.jpg"
                  alt="Rishabh Tomar"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:saturate-150"
                />

                {/* Tech Overlay Lines */}
                <div className="absolute inset-0 border-[1px] border-white/5 m-4 pointer-events-none rounded-lg">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-purple-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-yellow-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-lg border-l-4 border-l-yellow-400 !bg-zinc-950/80"
                >
                  <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 font-mono">System Status</div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-mono text-sm font-bold text-white tracking-tight">Open to Opportunities</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements behind image */}
          <motion.div style={{ y: y2 }} className="absolute -z-10 top-0 left-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-[80px] opacity-30"></motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;