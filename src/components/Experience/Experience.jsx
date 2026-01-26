import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaBriefcase, FaDatabase, FaRocket } from 'react-icons/fa';
import Parallax from '../common/Parallax';

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
        <section id="experience" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none -translate-y-1/2 transform skew-y-6"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4 font-tech"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Voyage</span>
                    </motion.h2>
                    <motion.div
                        className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    />
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent md:-translate-x-1/2 ml-8 md:ml-0"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <Parallax key={index} offset={30} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Timeline Dot */}
                                <motion.div
                                    className="absolute left-0 md:left-1/2 w-16 h-16 flex items-center justify-center md:-translate-x-1/2 ml-0 md:ml-0 z-10"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`w-12 h-12 rounded-full bg-zinc-950 border-2 ${exp.border} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] ${exp.glow} `}>
                                        <div className={`text-xl ${exp.color}`}>{exp.icon}</div>
                                    </div>
                                </motion.div>

                                {/* Content Card */}
                                <motion.div
                                    className={`ml-20 md:ml-0 w-full md:w-[calc(50%-40px)]`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className={`p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all group hover:bg-zinc-900/60 backdrop-blur-sm relative overflow-hidden`}>
                                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${exp.color.replace('text-', 'from-').replace('-400', '-500')} to-transparent opacity-50`}></div>

                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all font-tech">{exp.company}</h3>
                                            <span className="text-xs font-mono py-1 px-2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">{exp.period}</span>
                                        </div>

                                        <h4 className={`text-lg font-medium mb-3 ${exp.color} flex items-center gap-2`}>
                                            {exp.role}
                                        </h4>

                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Empty Space for Grid Balance */}
                                <div className="hidden md:block w-[calc(50%-40px)]"></div>
                            </Parallax>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
