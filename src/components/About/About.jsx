import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaCode, FaLaptopCode, FaUserAstronaut, FaExternalLinkAlt } from 'react-icons/fa';
import Button from '../Buttons/Buttons';

const cardData = [
  {
    id: 'who-i-am',
    icon: <FaUserAstronaut />,
    title: 'The Architect',
    tag: 'STRATEGY',
    description: "I bridge the gap between complex data systems and intuitive user interfaces. My approach is centered on scalability and performance-first architecture.",
    borderColor: "group-hover:border-purple-500/50",
    accent: "bg-purple-500"
  },
  {
    id: 'my-skills',
    icon: <FaCode />,
    title: 'The Toolkit',
    tag: 'TECHNOLOGY',
    description: 'Expertise across the MERN stack and Data Engineering mastery in Snowflake. I build modern, data-driven solutions.',
    borderColor: "group-hover:border-blue-500/50",
    accent: "bg-blue-500"
  },
  {
    id: 'what-i-do',
    icon: <FaLaptopCode />,
    title: 'The Mission',
    tag: 'INNOVATION',
    description: 'Co-founding Zintrix Technologies to empower businesses with cutting-edge tech. Solving real-world challenges with elegant code.',
    borderColor: "group-hover:border-orange-500/50",
    accent: "bg-orange-500"
  },
];

const AboutCard = ({ card, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden transition-all duration-500 ${index === 0 ? 'sm:col-span-2' : 'sm:col-span-1'
        } ${card.borderColor}`}
    >
      {/* Dynamic Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.05), transparent 80%)`
          ),
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start justify-between mb-8">
            <div className={`p-4 rounded-2xl bg-zinc-950 border border-white/10 text-2xl text-white group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 shadow-2xl`}>
              {card.icon}
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-white/5`}>
              <div className={`w-1.5 h-1.5 rounded-full ${card.accent} animate-pulse`} />
              <span className="text-[8px] font-mono text-zinc-500 tracking-widest">{card.tag}</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4 font-tech tracking-tight uppercase italic">
            {card.title}
          </h3>
          <p className="text-zinc-500 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors duration-300">
            {card.description}
          </p>
        </div>

        {/* Decorative scan line bottom */}
        <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </motion.article>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 relative bg-[#050505] overflow-hidden" aria-label="About Section">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-purple-500" />
              <span className="text-xs font-mono text-purple-400 tracking-[0.4em] uppercase">Identity</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black font-tech leading-[0.85] tracking-tighter text-white uppercase">
              Core <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Engine.</span>
            </h2>
          </motion.div>

          <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest hidden md:block text-right">
            Location: India <br />
            Status: Available
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Text Content - Adjusted to remove old header elements */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-zinc-400 text-lg leading-relaxed max-w-md"
            >
              <p className="font-light italic">
                "I don't just write code; I architect ecosystems where data flows seamlessly into experience."
              </p>
              <p className="text-base font-light">
                Currently optimizing high-velocity data pipelines at
                <span className="text-white font-mono border-b border-purple-500/30 ml-1">HCLTech</span>
                and co-founding
                <a
                  href="https://zintrixtechnologies.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors ml-1 group font-medium"
                >
                  Zintrix <FaExternalLinkAlt className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>.
              </p>


              <div className="mt-12 flex items-center gap-6">
                <Button />
                <div className="hidden md:block text-[10px] font-mono text-zinc-600 leading-tight uppercase tracking-widest">
                  Location: India <br />
                  Focus: Full-Stack & Data
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Cards Content */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cardData.map((card, index) => (
              <AboutCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </div >
    </section >
  );
};

export default About;