import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaPencilRuler
} from "react-icons/fa";

const technicalSkills = [
  { name: 'React', level: 90, icon: <FaReact />, color: "rgba(97, 218, 251, 0.3)", description: "Frontend Library", tools: "Next.js, Redux, Context" },
  { name: 'JavaScript', level: 85, icon: <FaJs />, color: "rgba(247, 223, 30, 0.3)", description: "Core Language", tools: "ES6+, TypeScript, DOM" },
  { name: 'Node.js', level: 80, icon: <FaNodeJs />, color: "rgba(104, 160, 99, 0.3)", description: "Backend Runtime", tools: "Express, PM2, Event Loop" },
  { name: 'HTML', level: 95, icon: <FaHtml5 />, color: "rgba(227, 76, 38, 0.3)", description: "Structure", tools: "Semantic Elements, SEO" },
  { name: 'CSS', level: 95, icon: <FaCss3Alt />, color: "rgba(38, 77, 228, 0.3)", description: "Styling", tools: "Tailwind, SASS, Animations" },
  { name: 'Python', level: 90, icon: <FaPython />, color: "rgba(55, 118, 171, 0.3)", description: "Scripting & AI", tools: "Pandas, Flask, Automation" },
  { name: 'MongoDB', level: 75, icon: <FaDatabase />, color: "rgba(71, 162, 72, 0.3)", description: "NoSQL Database", tools: "Mongoose, Aggregations" },
  { name: 'SQL', level: 80, icon: <FaDatabase />, color: "rgba(0, 117, 143, 0.3)", description: "Relational DB", tools: "PostgreSQL, MySQL, PL/SQL" },
  { name: 'Git', level: 85, icon: <FaGitAlt />, color: "rgba(240, 80, 50, 0.3)", description: "Version Control", tools: "GitHub, GitLab, CI/CD" },
  { name: 'Design', level: 70, icon: <FaPencilRuler />, color: "rgba(255, 0, 128, 0.3)", description: "UI/UX Concepts", tools: "Figma, Adobe XD, Wireframing" },
];

const softSkills = [
  { name: 'Teamwork', emoji: '🤝' },
  { name: 'Problem Solving', emoji: '🧠' },
  { name: 'Time Management', emoji: '⏱' },
  { name: 'Leadership', emoji: '👨‍💼' },
  { name: 'Goal-Oriented', emoji: '🎯' },
  { name: 'Communication', emoji: '💬' },
  { name: 'Adaptability', emoji: '🔄' },
  { name: 'Creativity', emoji: '🎨' },
  { name: 'Critical Thinking', emoji: '🧩' },
  { name: 'Emotional Intelligence', emoji: '❤️' },
  { name: 'Collaboration', emoji: '👥' },
  { name: 'Decision Making', emoji: '🧭' },
  { name: 'Self-Motivation', emoji: '🚀' },
  { name: 'Flexibility', emoji: '🌈' },
  { name: 'Initiative', emoji: '⚡' },
  { name: 'Accountability', emoji: '🧾' },
  { name: 'Resilience', emoji: '🛡️' },
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
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">{skill.description}</p>
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

      <div className="flex justify-between items-center text-[10px] font-bold text-zinc-600">
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
                <span className="text-xs font-bold text-purple-400 tracking-[0.4em] uppercase">Capabilities</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white font-tech tracking-tighter uppercase leading-[0.8]">
                Tech
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500"> Arsenal.</span>
              </h2>
            </motion.div>
            <div className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest hidden md:block text-right">
              System: Operational<br />
              Stack: Modern_V2
            </div>
          </div>

          {/* TECHNICAL SKILLS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {technicalSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
            ))}
          </div>

          {/* SOFT SKILLS SECTION */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-purple-500" />
                <span className="text-xs font-bold text-purple-400 tracking-[0.4em] uppercase">Human Interface</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white font-tech tracking-tighter uppercase leading-[0.8]">
                Professional
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500"> Ethos.</span>
              </h2>
            </motion.div>

            <div className="space-y-6">

              {/* Row 1: Left to Right (Actually standard marquee moves right to left usually, but user asked 'from left to right' and 'from right to left') 
                  Let's interpret:
                  1. Left -> Right (Content moves towards right)
                  2. Right -> Left (Content moves towards left)
              */}

              <MarqueeRow skills={softSkills.slice(0, Math.ceil(softSkills.length / 2))} direction="right" speed={30} />
              <MarqueeRow skills={softSkills.slice(Math.ceil(softSkills.length / 2))} direction="left" speed={30} />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const MarqueeRow = ({ skills, direction, speed }) => {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-4 pr-4"
        initial={{ x: direction === 'left' ? 0 : "-50%" }}
        animate={{ x: direction === 'left' ? "-50%" : 0 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <div
            key={i}
            className="group relative flex items-center gap-3 px-6 py-4 rounded-xl bg-zinc-900/50 border border-white/5 text-sm md:text-base text-zinc-400 cursor-default hover:text-white hover:border-purple-500/30 transition-all font-bold uppercase tracking-wider shrink-0"
          >
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-md" />
            <span className="text-lg relative z-10">{skill.emoji}</span>
            <span className="relative z-10">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
export default Skills;
