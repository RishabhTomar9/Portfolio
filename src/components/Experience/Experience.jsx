import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaRocket, FaShieldAlt } from 'react-icons/fa';

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
        company: 'HCLTech',
        role: 'Data Engineer (Selected)',
        period: 'Upcoming',
        description: 'Selected for the Data Engineer role. Specializing in extensive data warehousing, PL/SQL, and Snowflake architecture for enterprise-level solutions.',
        icon: <FaDatabase />,
        color: 'text-blue-400',
        accent: 'bg-blue-500',
        status: 'INITIALIZING_SEQUENCE'
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-32 relative bg-[#050505] overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-purple-500" />
                            <span className="text-xs font-mono text-purple-400 tracking-[0.4em] uppercase">Timeline</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white font-tech tracking-tighter uppercase leading-[0.8]">
                            Career 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> Matrix.</span>
                        </h2>
                    </motion.div>

                    <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest hidden md:block text-right">
                        Log_Version: 2.0<br />
                        Sync: Auto
                    </div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Animated Central Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-1/2 overflow-hidden">
                        <motion.div
                            initial={{ y: "-100%" }}
                            whileInView={{ y: "100%" }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-full h-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                        />
                    </div>

                    <div className="space-y-24">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Timeline Node */}
                                <motion.div
                                    className="absolute left-8 md:left-1/2 w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 md:-translate-x-1/2 z-20 flex items-center justify-center top-8"
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`${exp.color} text-sm`}>
                                        {exp.period === 'Present' ? <FaShieldAlt className="animate-pulse" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                    </div>
                                    <div className={`absolute inset-0 rounded-xl animate-ping opacity-10 ${exp.accent}`}></div>
                                </motion.div>

                                {/* Content Card */}
                                <motion.div
                                    className="ml-16 md:ml-0 w-full md:w-[calc(50%-60px)]"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="group relative p-1 rounded-[2rem] transition-all duration-500 hover:scale-[1.02]">
                                        {/* Background glow effect */}
                                        <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-10 transition-opacity rounded-[2rem] ${exp.accent}`}></div>

                                        <div className="relative p-8 bg-[#0a0a0a] border border-white/5 rounded-[1.8rem] h-full">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl ${exp.color} border border-white/5 group-hover:border-white/20 transition-colors`}>
                                                    {exp.icon}
                                                </div>
                                                <span className="text-[10px] font-mono text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{exp.company}</h3>
                                            <h4 className={`text-sm font-mono uppercase tracking-widest mb-6 ${exp.color}`}>
                                                {exp.role}
                                            </h4>

                                            <p className="text-zinc-500 leading-relaxed text-sm mb-8 font-light">
                                                {exp.description}
                                            </p>

                                            <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                                                <div className={`w-2 h-2 rounded-full ${exp.period === 'Present' ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                                                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">
                                                    Status: {exp.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

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