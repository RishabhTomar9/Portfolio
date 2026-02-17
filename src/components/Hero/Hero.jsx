import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../Buttons/Buttons';

const DataStream = () => {
  const codes = [
    "SELECT * FROM future WHERE status = 'innovative';",
    "const tech = { stack: ['React', 'Snowflake', 'PL/SQL'] };",
    "git commit -m 'revolutionizing digital experiences'",
    "while(true) { build(); innovate(); repeat(); }",
    "export default function Solution() { return <Future />; }",
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 hidden lg:block select-none">
      {codes.map((code, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] font-bold text-purple-500/40 whitespace-nowrap will-change-transform"
          style={{
            top: `${(i + 1) * 15}%`,
            x: '-100%',
            left: 0
          }}
          animate={{
            x: '100vw',
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

  // Optimize parallax with spring smoothing or simplified transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 100]); // Reduced range for lighter feel
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const textY = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 selection:bg-purple-500/30 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
      <DataStream />

      <div className="container mx-auto max-w-7xl px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md hover:bg-purple-500/10 transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.25em] text-purple-300 uppercase font-mono">
              System Online // 2026
            </span>
          </motion.div>

          <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter font-tech">
            CRAFTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-yellow-400 animate-gradient-x drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              DIGITAL ARC
            </span>
          </h1>

          <div className="text-xl lg:text-3xl font-bold text-zinc-400 mb-10 h-10 flex items-center font-mono tracking-tight gap-4">
            <span className="text-purple-500">{'>'}</span>
            <Typewriter
              options={{
                strings: [
                  "Architecting Scalable Systems...",
                  "Building The Future of Tech...",
                  "Data Engineering Expert...",
                  "Forging Digital Experiences..."
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
                wrapperClassName: "text-zinc-200",
                cursorClassName: "text-purple-500 animate-pulse"
              }}
            />
          </div>

          <p className="text-lg text-zinc-400 max-w-lg mb-12 leading-relaxed font-medium border-l-2 border-white/10 pl-6">
            I'm <span className="text-white font-bold">Rishabh Tomar</span>.
            Co-Founder & Co-CTO at <a href="https://zintrixtechnologies.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold border-b border-purple-500/30 hover:border-purple-500 transition-colors">Zintrix Technologies</a>.
            I build high-performance ecosystems where data meets design.
          </p>

          <div className="flex flex-wrap gap-5 items-center">
            <Button
              href="#projects"
              variant="primary"
              className="!rounded-full !px-6 !py-3 group"
            >
              View Projects <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </Button>

            <Button
              href="#contact"
              variant="ghost"
              className="!rounded-full !px-6 !py-4 hover:bg-white/5"
            >
              Contact Me
            </Button>
          </div>

          {/* Mini Stack */}
          <div className="mt-16 flex items-center gap-8 text-zinc-600">
            <div className="h-px w-12 bg-zinc-800"></div>
            <div className="flex gap-6 text-2xl opacity-60 hover:opacity-100 transition-opacity duration-300">
              <motion.i whileHover={{ color: '#61dafb', y: -4 }} className="devicon-react-original cursor-help transition-all"></motion.i>
              <motion.i whileHover={{ color: '#68a063', y: -4 }} className="devicon-nodejs-plain cursor-help transition-all"></motion.i>
              <motion.i whileHover={{ color: '#3776ab', y: -4 }} className="devicon-python-plain cursor-help transition-all"></motion.i>
              <motion.i whileHover={{ color: '#29b5e8', y: -4 }} className="devicon-snowflake-plain cursor-help transition-all"></motion.i>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Tech Frame Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ y: y1 }} className="relative z-10 w-full max-w-[420px] aspect-[4/5] perspective-1000 group">

            {/* Tech Frame Canvas */}
            <div className="absolute -inset-4 border border-white/10 rounded-2xl pointer-events-none z-20">
              {/* Corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/50 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl" />
            </div>

            <div className="relative h-full w-full bg-zinc-900 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/20 transition-all duration-700 ease-out border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

              <img
                src="/Images/hero-image.jpg"
                alt="Rishabh Tomar"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 will-change-transform"
                loading="eager"
              />

              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mixed-blend-overlay pointer-events-none" />

              {/* Floating ID Card Info */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Authenticated User</div>
                    <div className="text-white font-bold font-tech text-lg">RISHABH TOMAR</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;