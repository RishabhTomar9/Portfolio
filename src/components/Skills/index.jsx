import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaPencilRuler,
<<<<<<< HEAD
  FaSnowflake,
  FaFire,
=======
  FaFire
>>>>>>> 5d1bba68460bba14259667e28c77768a2b593ff3
} from 'react-icons/fa';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

<<<<<<< HEAD
  const skills = [
    { name: 'React', level: 90, icon: <FaReact className="text-[#61dafb]" /> },
    { name: 'Node.js', level: 80, icon: <FaNodeJs className="text-[#68a063]" /> },
    { name: 'JavaScript', level: 85, icon: <FaJs className="text-[#f7df1e]" /> },
    { name: 'PL/SQL', level: 85, icon: <FaDatabase className="text-[#c0c0c0]" /> },
    { name: 'Snowflake', level: 80, icon: <FaSnowflake className="text-[#29b5e8]" /> },
    { name: 'Firebase', level: 75, icon: <FaFire className="text-[#ffca28]" /> },
    { name: 'MongoDB', level: 75, icon: <FaDatabase className="text-[#4db33d]" /> },
    { name: 'Python', level: 85, icon: <FaPython className="text-[#3776ab]" /> },
    { name: 'Git', level: 85, icon: <FaGitAlt className="text-[#f05032]" /> },
=======
  const technicalSkills = [
    { name: 'React', level: 90, icon: <FaReact className="skill-icon react" />, description: 'UI Components' },
    { name: 'JavaScript', level: 85, icon: <FaJs className="skill-icon javascript" />, description: 'Web Logic' },
    { name: 'Node.js', level: 80, icon: <FaNodeJs className="skill-icon nodejs" />, description: 'Backend Runtime' },
    { name: 'HTML', level: 95, icon: <FaHtml5 className="skill-icon html" />, description: 'Page Structure' },
    { name: 'CSS', level: 95, icon: <FaCss3Alt className="skill-icon css" />, description: 'Web Styling' },
    { name: 'Python', level: 90, icon: <FaPython className="skill-icon python" />, description: 'Scripting Language' },
    { name: 'MongoDB', level: 75, icon: <FaDatabase className="skill-icon mongodb" />, description: 'NoSQL Database' },
    { name: 'SQL', level: 80, icon: <FaDatabase className="skill-icon sql" />, description: 'Relational Queries' },
    { name: 'Git', level: 85, icon: <FaGitAlt className="skill-icon git" />, description: 'Version Control' },
    { name: 'Firebase', level: 82, icon: <FaFire className="skill-icon firebase" />, description: 'Backend as a Service' },
    { name: 'Design', level: 70, icon: <FaPencilRuler className="skill-icon design" />, description: 'UI/UX Basics' },
>>>>>>> 5d1bba68460bba14259667e28c77768a2b593ff3
  ];

  const softSkills = ["Leadership", "Problem Solving", "Creativity", "Teamwork", "Adaptability", "Communication"];

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 font-tech"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">Arsenal</span>
          </motion.h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm group hover:border-blue-500/30 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl p-3 rounded-lg bg-zinc-950 shadow-inner group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                  <div className="text-xs text-zinc-500 font-mono">Level: {skill.level}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills Chips */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <motion.span
                key={index}
                className="px-6 py-2 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-300 font-medium hover:bg-white hover:text-black transition-all cursor-default"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + (index * 0.05) }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
