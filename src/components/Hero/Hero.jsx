import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../Buttons/Buttons';


const MovingGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-[-50%] w-[200%] h-[200%] opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        animate={{
          transform: ['translate(0, 0)', 'translate(-60px, -60px)']
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950"></div>
    </div>
  );
};

const DataStream = () => {
  const codes = [
    "SELECT * FROM future WHERE status = 'innovative';",
    "const tech = { stack: ['React', 'Snowflake', 'PL/SQL'] };",
    "git commit -m 'revolutionizing digital experiences'",
    "while(true) { build(); innovate(); repeat(); }",
    "export default function Solution() { return <Future />; }",
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 hidden lg:block">
      {codes.map((code, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] font-mono text-purple-500/40 whitespace-nowrap"
          style={{
            top: `${(i + 1) * 15}%`,
            left: '-20%',
          }}
          animate={{
            left: ['-20%', '110%'],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
};

const Hero = () => {
  const { width } = useWindowSize();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const textY = useTransform(scrollY, [0, 500], [0, 80]);

  const isMobile = width <= 768;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#050505]">

      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <DataStream />

      {/* Floating Ambient Orbs */}
      {/* <motion.div
        animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"
      /> */}

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-purple-300 uppercase font-mono">
              System Ready // 2026
            </span>
          </motion.div>

          <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter font-tech">
            CRAFTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-yellow-400 animate-gradient-x drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              DIGITAL ARC
            </span>
          </h1>

          <div className="text-xl lg:text-3xl font-light text-zinc-300 mb-10 h-10 flex items-center font-tech tracking-tight">
            <span className="mr-4 text-purple-500 font-bold">{'>'}</span>
            <Typewriter
              options={{
                strings: [
                  "Architecting Scalable Systems",
                  "Mastering Data Engineering",
                  "Building Zintrix Technologies",
                  "PL/SQL & Snowflake Expert"
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
              }}
            />
          </div>

          <p className="text-lg text-zinc-400 max-w-lg mb-12 leading-relaxed font-light">
            I'm <span className="text-white font-semibold">Rishabh Tomar</span>.
            Selected as <span className="text-purple-400 font-medium underline underline-offset-4 decoration-purple-500/30">Data Engineer</span> at HCLTech.
            Co-Founder & Co-CTO at <span className="text-blue-400 font-medium">Zintrix Technologies</span>.
            Transforming complex data into seamless experiences.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <Button
              href="#projects"
              variant="primary"
              className="!rounded-full !px-8 !py-4"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Projects <span className="text-xl">→</span>
            </Button>

            <Button
              href="#contact"
              variant="ghost"
              className="!rounded-full !px-8 !py-4"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me!
            </Button>
          </div>

          {/* Mini Stack */}
          <div className="mt-16 flex items-center gap-8 text-zinc-600">
            <div className="flex gap-6 text-2xl">
              <motion.i whileHover={{ color: '#61dafb', y: -5 }} className="devicon-react-original cursor-help transition-all"></motion.i>
              <motion.i whileHover={{ color: '#68a063', y: -5 }} className="devicon-nodejs-plain cursor-help transition-all"></motion.i>
              <motion.i whileHover={{ color: '#3776ab', y: -5 }} className="devicon-python-plain cursor-help transition-all"></motion.i>
              <motion.i whileHover={{ color: '#29b5e8', y: -5 }} className="devicon-snowflake-plain cursor-help transition-all"></motion.i>
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            <span className="text-[10px] font-mono tracking-widest uppercase">Tech_Stack_Initialized</span>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ y: y1 }} className="relative z-10 w-full max-w-[420px] aspect-[4/5] perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl opacity-50 -z-10 animate-pulse"></div>

            <div className="relative h-full w-full glass-card rounded-3xl overflow-hidden border border-white/20 preserve-3d group shadow-2xl">
              <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-700"></div>

              <img
                src="/Images/hero-image.jpg"
                alt="Rishabh Tomar"
                className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000"
              />

              {/* HUD Elements */}
              <div className="absolute inset-0 p-8 pointer-events-none flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 border-t-2 border-l-2 border-white/40"></div>
                  <div className="w-12 h-12 border-t-2 border-r-2 border-white/40"></div>
                </div>

                <div className="space-y-4">
                  <div className="glass-card !bg-zinc-950/80 p-5 rounded-2xl border-l-4 border-l-yellow-400 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-2 font-mono">Current Identity</div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      <span className="font-tech text-xl font-bold text-white tracking-wider">RISHABH TOMAR</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="w-12 h-12 border-b-2 border-l-2 border-white/40"></div>
                    <div className="w-12 h-12 border-b-2 border-r-2 border-white/40"></div>
                  </div>
                </div>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2 w-full animate-scanline pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Background decoration */}
          <motion.div style={{ y: y2 }} className="absolute -z-10 top-0 -right-4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent"></div>
        <span className="text-[10px] font-mono text-zinc-500 tracking-[0.4em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;