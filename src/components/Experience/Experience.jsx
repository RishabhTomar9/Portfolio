import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaRocket, FaShieldAlt, FaBriefcase, FaGraduationCap, FaLaptopCode, FaTerminal } from 'react-icons/fa';

const experiences = [
    {
        company: 'Zintrix Technologies',
        role: 'Co-Founder & Co-CTO',
        period: 'Present',
        description: 'Leading technical strategy and product development. Architecting scalable full-stack solutions and driving innovation in tech services.',
        icon: <FaRocket />,
        color: 'text-purple-400',
        accent: 'bg-purple-500',
        status: 'LIVE_OPERATIONS',
        tag: 'STRATEGIC'
    },
    {
        company: 'Shiksha Salahkar',
        role: 'Intern',
        period: 'Dec 2025 - Mar 2026',
        description: 'Contributing to software development projects and gaining hands-on experience in full-stack technologies. Assisting team in delivering high-quality solutions.',
        icon: <FaBriefcase />,
        color: 'text-yellow-400',
        accent: 'bg-yellow-500',
        status: 'ACTIVE_INTERNSHIP',
        tag: 'DEVELOPMENT'
    },
    {
        company: 'NXTWave Academy',
        role: 'Upskilling',
        period: 'Sep 2022 - Present',
        description: 'Intensive full-stack development building. Mastering multiple technology stacks (MERN/Python) and industry-standard practices.',
        icon: <FaLaptopCode />,
        color: 'text-orange-400',
        accent: 'bg-orange-500',
        status: 'SKILL_ACQUISITION',
        tag: 'FULLSTACK'
    },
    {
        company: 'Technocrats Institute',
        role: 'B.Tech (CSE-AIML)',
        period: '2022 - 2026',
        description: 'Pursuing Bachelor of Technology in Computer Science & Engineering with specialization in AI & ML. Maintaining a focus on neural networks and data science.',
        icon: <FaGraduationCap />,
        color: 'text-blue-400',
        accent: 'bg-blue-500',
        status: 'UNDERGRADUATE',
        tag: 'ACADEMIC'
    },
    {
        company: 'VN Convent School',
        role: 'Higher Secondary',
        period: '2022',
        description: 'Completed Class 12th with 87.4%. Specialized in the PCM stream (Physics, Chemistry, and Mathematics).',
        icon: <FaShieldAlt />,
        color: 'text-emerald-400',
        accent: 'bg-emerald-500',
        status: 'COMPLETED',
        tag: 'FOUNDATION'
    },
    {
        company: 'Bhartiyam High School',
        role: 'High School',
        period: '2020',
        description: 'Completed Class 10th with 90.33%. Built a strong analytical foundation in core science and mathematical disciplines.',
        icon: <FaDatabase />,
        color: 'text-pink-400',
        accent: 'bg-pink-500',
        status: 'COMPLETED',
        tag: 'EARLY_LOG'
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-20 lg:py-32 relative bg-[#050505] overflow-hidden">
            {/* Background Grid Pattern - Matched to About */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-32 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-purple-500" />
                            <span className="text-xs font-bold text-purple-400 tracking-[0.4em] uppercase">Timeline</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-black font-tech leading-[0.85] tracking-tighter text-white uppercase">
                            Career
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500"> Matrix.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-col items-end gap-2 font-mono text-[10px] text-zinc-500 text-right uppercase tracking-widest"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span>System_Sync: Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTerminal className="text-zinc-600" />
                            <span>Query_Time: 0.0042s</span>
                        </div>
                    </motion.div>
                </div>

                <div className="relative max-w-6xl mx-auto">

                    {/* The Central Data Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 overflow-hidden bg-zinc-800/50">
                        <motion.div
                            className="absolute top-0 w-full h-full bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 origin-top"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                        />
                        {/* Moving Pulse Line */}
                        <motion.div
                            className="absolute top-0 w-full h-40 bg-gradient-to-b from-transparent via-white/40 to-transparent z-10"
                            animate={{ top: ['-10%', '110%'] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="space-y-16 md:space-y-32">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Center Node Connector */}
                                <motion.div
                                    className="absolute left-8 md:left-1/2 w-4 h-4 md:w-6 md:h-6 -ml-2 md:-ml-3 rounded-full bg-zinc-950 border-2 border-white/20 z-30 flex items-center justify-center top-0 md:top-1/2 md:-translate-y-1/2 group shadow-xl shadow-black/80"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`w-full h-full rounded-full absolute animate-ping opacity-10 ${exp.accent}`} />
                                    <div className={`w-2 h-2 rounded-full z-10 ${exp.period === 'Present' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-zinc-400'}`} />
                                </motion.div>

                                {/* Content Card */}
                                <motion.div
                                    className="pl-20 md:pl-0 w-full md:w-[calc(50%-60px)]"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    <div className="group relative">
                                        {/* Ambient Hover Glow */}
                                        <div className={`absolute -inset-4 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-xl ${exp.accent}`} />

                                        <div className="relative bg-zinc-900/60 border border-white/5 p-5 md:p-8 rounded-xl hover:border-purple-500/30 transition-all duration-500 shadow-2xl backdrop-blur-xl overflow-hidden group-hover:bg-zinc-900/80">

                                            {/* Top Metadata Row */}
                                            <div className="flex items-start justify-between mb-6">
                                                <div className={`p-3 rounded-lg bg-white/5 border border-white/5 text-xl md:text-3xl ${exp.color} transition-colors duration-300`}>
                                                    {exp.icon}
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded">
                                                        {exp.period}
                                                    </span>
                                                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/5 ${exp.color}`}>
                                                        {exp.tag}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Title & Role */}
                                            <div className="mb-4">
                                                <h3 className="text-lg md:text-3xl font-bold text-white mb-1 tracking-tight group-hover:text-purple-400 transition-colors">
                                                    {exp.company}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1 h-1 rounded-full ${exp.accent}`} />
                                                    <h4 className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-80 ${exp.color}`}>
                                                        {exp.role}
                                                    </h4>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-zinc-400 leading-relaxed text-xs md:text-sm font-medium mb-6">
                                                {exp.description}
                                            </p>

                                            {/* Tech Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[9px] text-zinc-600">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-sm bg-zinc-700 rotate-45" />
                                                    <span>ID: 0{index + 1}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={exp.period === 'Present' ? 'text-emerald-500 animate-pulse' : ''}>●</span>
                                                    <span>{exp.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Balanced Spacer */}
                                <div className="hidden md:block w-[calc(50%-60px)]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;