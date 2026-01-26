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
    whileHover={{ y: -5 }}
    className="relative p-6 bg-zinc-900/50 rounded-2xl group overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
  >
    {/* Dynamic Background Glow */}
    <div
      className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-[60px] -z-10"
      style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
    />

    <div className="flex items-start gap-5 mb-6">
      <div
        className="text-3xl w-14 h-14 rounded-xl bg-zinc-950 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all shadow-inner shrink-0"
        style={{ color: skill.color.replace('0.3', '1') }}
      >
        {skill.icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-white font-tech tracking-tight group-hover:text-purple-300 transition-colors">{skill.name}</h3>
        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-1">{skill.description}</p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(to right, ${skill.color.replace('0.3', '0.5')}, ${skill.color.replace('0.3', '1')})`
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.3 + index * 0.05 }}
        />
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600">
        <span className="uppercase tracking-widest">{skill.tools}</span>
        <span className="text-white">{skill.level}%</span>
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative bg-[#050505] overflow-hidden" ref={ref}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col gap-20">

          {/* New Header Design */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-purple-500" />
                <span className="text-xs font-mono text-purple-400 tracking-[0.4em] uppercase">Capabilities</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white font-tech tracking-tighter uppercase leading-[0.8]">
                Tech
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500"> Arsenal.</span>
              </h2>
            </motion.div>
            <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest hidden md:block text-right">
              System: Operational<br />
              Stack: Modern_V2
            </div>
          </div>

          {/* SKILLS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
