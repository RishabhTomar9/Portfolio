import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaBriefcase, FaDatabase, FaRocket } from 'react-icons/fa';


const experiences = [
    {
        company: 'Zintrix Technologies',
        role: 'Co-Founder & Co-CTO',
        period: 'Present',
        description: 'Leading technical strategy and product development. Architecting scalable full-stack solutions and driving innovation in tech services.',
        icon: <FaRocket />,
        color: 'text-purple-400',
        border: 'border-purple-500/50',
        glow: 'shadow-purple-500/20'
    },
    {
        company: 'HCLTech',
        role: 'Data Engineer (Selected)',
        period: 'Upcoming',
        description: 'Selected for the Data Engineer role. Specializing in extensive data warehousing, PL/SQL, and Snowflake architecture for enterprise-level solutions.',
        icon: <FaDatabase />,
        color: 'text-blue-400',
        border: 'border-blue-500/50',
        glow: 'shadow-blue-500/20'
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4"
                    >
                        Timeline // Log
                    </motion.div>
                    <motion.h2
                        className="text-5xl md:text-7xl font-black mb-4 font-tech tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        CAREER <span className="text-gradient">MATRIX</span>
                    </motion.h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent md:-translate-x-1/2"></div>

                    <div className="space-y-24">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Timeline Dot */}
                                <motion.div
                                    className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-zinc-950 border-2 border-white/20 md:-translate-x-1/2 z-20 top-8"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${exp.color.replace('text-', 'bg-')}`}></div>
                                </motion.div>

                                {/* Content Card */}
                                <motion.div
                                    className={`ml-16 md:ml-0 w-full md:w-[calc(50%-48px)]`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <div className="group relative p-8 glass-card rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500">
                                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${exp.color.replace('text-', 'from-').replace('-400', '-500')} to-transparent opacity-30`}></div>

                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-2xl ${exp.color} group-hover:scale-110 transition-transform`}>
                                                    {exp.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white font-tech">{exp.company}</h3>
                                                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{exp.period}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className={`text-lg font-medium mb-4 ${exp.color} flex items-center gap-2`}>
                                            <span className="w-4 h-px bg-current"></span>
                                            {exp.role}
                                        </h4>

                                        <p className="text-zinc-400 text-base leading-relaxed font-light">
                                            {exp.description}
                                        </p>

                                        {/* Status Chip */}
                                        <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-zinc-600">
                                            <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                                            DEPLOYED_SUCCESS
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Empty Space */}
                                <div className="hidden md:block w-[calc(50%-48px)]"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Experience;
