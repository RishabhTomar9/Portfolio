import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaSnowflake,
  FaFire,
  FaTerminal
} from "react-icons/fa";

const skills = [
  { name: "React", level: 90, icon: <FaReact />, color: "rgba(97, 218, 251, 0.3)", description: "Frontend Architecture", tools: "Next.js, Tailwind, Framer" },
  { name: "JavaScript", level: 85, icon: <FaJs />, color: "rgba(247, 223, 30, 0.3)", description: "Core Logic / ES6+", tools: "Typescript, OOP, DOM" },
  { name: "Node.js", level: 80, icon: <FaNodeJs />, color: "rgba(104, 160, 99, 0.3)", description: "Server-side Runtime", tools: "Express, PM2, MVC" },
  { name: "Python", level: 90, icon: <FaPython />, color: "rgba(55, 118, 171, 0.3)", description: "Automation & Scripting", tools: "Pandas, BeautifulSoup" },
  { name: "Snowflake", level: 80, icon: <FaSnowflake />, color: "rgba(41, 181, 232, 0.3)", description: "Cloud Data Warehouse", tools: "SnowSQL, Tasks, Pipes" },
  { name: "SQL", level: 85, icon: <FaDatabase />, color: "rgba(0, 117, 143, 0.3)", description: "Complex Querying", tools: "PostgreSQL, PL/SQL" },
  { name: "Firebase", level: 82, icon: <FaFire />, color: "rgba(255, 202, 40, 0.3)", description: "BaaS & Realtime DB", tools: "Firestore, Auth, Cloud Functions" },
  { name: "Git", level: 85, icon: <FaGitAlt />, color: "rgba(240, 80, 50, 0.3)", description: "Version Control", tools: "GitHub Actions, CI/CD" },
  { name: "Terminal", level: 95, icon: <FaTerminal />, color: "rgba(255, 255, 255, 0.2)", description: "System Ops", tools: "Shell Scripting, Linux" },
];

const softSkills = [
  "Leadership",
  "Architecture",
  "Optimization",
  "Teamwork",
  "Adaptability",
  "Strategy",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SkillCard = ({ skill, index, isInView }) => (
  <motion.div
    custom={index}
    variants={fadeUp}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    whileHover={{ y: -8, scale: 1.02 }}
    className="relative p-8 glass-card rounded-[2.5rem] group overflow-hidden border border-white/5"
  >
    {/* Dynamic Background Glow */}
    <div
      className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-[60px] -z-10"
      style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
    />

    <div className="flex items-center gap-6 mb-8">
      <div
        className="text-4xl w-16 h-16 rounded-2xl bg-zinc-950 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all shadow-inner"
        style={{ color: skill.color.replace('0.3', '1') }}
      >
        {skill.icon}
      </div>
      <div>
        <h3 className="text-xl font-black text-white font-tech tracking-tight">{skill.name}</h3>
        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mt-1 shrink-0">
          {skill.description}
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Tech Stack</span>
          <span className="text-xs text-zinc-400 font-light italic">{skill.tools}</span>
        </div>
        <span className="text-xs font-tech font-bold text-white">{skill.level}%</span>
      </div>

      <div
        className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden p-[2px] border border-white/5"
        role="progressbar"
      >
        <motion.div
          className="h-full rounded-full relative group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow"
          style={{
            background: `linear-gradient(to right, ${skill.color.replace('0.3', '0.5')}, ${skill.color.replace('0.3', '1')})`
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.3 + index * 0.05 }}
        >
          {/* Animated Glow Tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white opacity-40 blur-md translate-x-1/2"></div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden" ref={ref}>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-20">

          {/* HEADER SECTION (Refactored from Left Side) */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12"
            >
              <div className="max-w-2xl">
                <div className="inline-block px-4 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-6">
                  Capabilities // 02
                </div>
                <h2 className="text-6xl md:text-8xl font-black font-tech tracking-tighter leading-none">
                  TECH <span className="text-gradient italic">ARSENAL</span>
                </h2>
              </div>

              <div className="max-w-md">
                <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                  A professional suite of tools and libraries I use to architect, build, and deploy high-performance software.
                </p>

                <div className="flex flex-wrap gap-3">
                  {softSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      custom={index + 5}
                      variants={fadeUp}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="px-5 py-2 rounded-xl border border-white/5 bg-zinc-950/50 text-[9px] text-zinc-500 font-mono tracking-widest uppercase hover:text-white hover:border-white/20 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* SKILLS GRID (Shifted to Bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
