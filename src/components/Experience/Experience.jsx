import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaRocket, FaShieldAlt, FaBriefcase } from 'react-icons/fa';

const experiences = [
    {
        company: 'Zintrix Technologies',
        role: 'Co-Founder & Co-CTO',
        period: 'Present',
        description: 'Leading technical strategy and product development. Architecting scalable full-stack solutions and driving innovation in tech services.',
        icon: <FaRocket />,
        color: 'text-purple-400',
        accent: 'bg-purple-500',
        status: 'LIVE_OPERATIONS'
    },
    {
        company: 'Shiksha Salahkar',
        role: 'Intern',
        period: 'Dec 2025 - Mar 2026',
        description: 'Contributing to software development projects and gaining hands-on experience in full-stack technologies. Assisting team in delivering high-quality solutions.',
        icon: <FaBriefcase />,
        color: 'text-yellow-400',
        accent: 'bg-yellow-500',
        status: 'ACTIVE_INTERNSHIP'
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-20 md:py-32 relative bg-[#050505] overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-purple-500" />
                            <span className="text-xs font-bold text-purple-400 tracking-[0.4em] uppercase">Timeline</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-white font-tech tracking-tighter uppercase leading-tight md:leading-[0.8]">
                            Career<br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> Matrix.</span>
                        </h2>
                    </motion.div>

                    <div className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest hidden md:block text-right">
                        Log_Version: 2.0<br />
                        Sync: Auto
                    </div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line - Mobile: Fixed to left | Desktop: Centered */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-1/2 overflow-hidden">
                        <motion.div
                            initial={{ y: "-100%" }}
                            whileInView={{ y: "100%" }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-full h-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                        />
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Timeline Node - Positioned on the line */}
                                <motion.div
                                    className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 md:w-10 md:h-10 md:-ml-5 rounded-xl bg-zinc-950 border border-white/10 md:-translate-x-1/2 z-20 flex items-center justify-center top-0 md:top-8"
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`${exp.color} text-xs md:text-sm`}>
                                        {exp.period === 'Present' ? <FaShieldAlt className="animate-pulse" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                    </div>
                                    <div className={`absolute inset-0 rounded-xl animate-ping opacity-10 ${exp.accent}`}></div>
                                </motion.div>

                                {/* Content Card - Full width on mobile */}
                                <motion.div
                                    className="pl-10 md:pl-0 w-full md:w-[calc(50%-60px)]"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="group relative p-[1px] rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 hover:scale-[1.01] active:scale-[0.98]">
                                        <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-10 transition-opacity rounded-[2rem] ${exp.accent}`}></div>

                                        <div className="relative p-5 md:p-8 bg-[#0a0a0a] border border-white/5 rounded-[1.4rem] md:rounded-[1.8rem] h-full">
                                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-xl md:text-3xl ${exp.color} border border-white/5 group-hover:border-white/20 transition-colors`}>
                                                    {exp.icon}
                                                </div>
                                                <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 border border-zinc-800 px-2 py-1 rounded-full whitespace-nowrap uppercase tracking-tighter">
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <h3 className="text-xl md:text-3xl font-bold text-white mb-1 tracking-tight">{exp.company}</h3>
                                            <h4 className={`text-xs md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6 ${exp.color}`}>
                                                {exp.role}
                                            </h4>

                                            <p className="text-zinc-500 leading-relaxed text-sm mb-6 md:mb-8 font-bold">
                                                {exp.description}
                                            </p>

                                            <div className="flex items-center gap-3 pt-4 md:pt-6 border-t border-white/5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${exp.period === 'Present' ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                                                <span className="text-[8px] md:text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">
                                                    Status: {exp.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Spacing column for Desktop */}
                                <div className="hidden md:block w-[calc(50%-60px)]"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;