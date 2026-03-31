import React from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaDatabase, FaRocket, FaShieldAlt, FaBriefcase, FaGraduationCap, FaLaptopCode, FaTerminal, FaChevronRight } from 'react-icons/fa';

const ICON_MAP = {
    'Rocket': <FaRocket />,
    'Briefcase': <FaBriefcase />,
    'LaptopCode': <FaLaptopCode />,
    'GraduationCap': <FaGraduationCap />,
    'ShieldAlt': <FaShieldAlt />,
    'Database': <FaDatabase />
};

const Experience = () => {
    const [experiences, setExperiences] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const q = query(collection(db, 'experiences'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setExperiences(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return null;

    return (
        <section id="experience" className="py-24 lg:py-48 relative bg-[#050505] overflow-hidden">
            {/* Background Grid Pattern - Blueprint Style */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header - High Fidelity Sync with About */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 lg:mb-40 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-10 h-[2px] bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                            <span className="text-[10px] font-black text-purple-400 tracking-[0.5em] uppercase">Architecture//Timeline</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black font-tech leading-[0.8] tracking-tighter text-white uppercase italic">
                            Career
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 block sm:inline sm:ml-4">Matrix.</span>
                        </h2>
                    </motion.div>

                    <div className="hidden md:flex flex-col items-end gap-3 text-right">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-zinc-900 border border-white/5 uppercase font-black text-[9px] tracking-widest text-zinc-500">
                           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                           System_Sync: Active
                        </div>
                        <span className="text-[8px] font-black text-zinc-700 tracking-[0.3em] uppercase">Bhopal//India_Region</span>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto">

                    {/* Central High-Tech Rail */}
                    <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] md:-translate-x-1/2 bg-zinc-900">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_10px,#a855f710_10px,#a855f720_12px)]" />
                        
                        <motion.div
                            className="absolute top-0 w-full h-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent origin-top"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                        />
                    </div>

                    <div className="space-y-24 md:space-y-56">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-32 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Timeline Node */}
                                <div className="absolute left-4 md:left-1/2 w-10 h-10 -ml-5 md:-ml-5 z-30 flex items-center justify-center top-0 md:top-1/2 md:-translate-y-1/2 group">
                                    <div className="absolute inset-0 bg-purple-500/5 blur-xl group-hover:bg-purple-400/20 transition-all duration-700" />
                                    <motion.div
                                        className={`w-5 h-5 rounded-sm bg-zinc-950 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-purple-500 group-hover:rotate-45 shadow-2xl`}
                                        initial={{ scale: 0, rotate: 0 }}
                                        whileInView={{ scale: 1, rotate: 45 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${exp.period === 'Present' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600 group-hover:bg-purple-400'}`} />
                                    </motion.div>
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    className="pl-12 md:pl-0 w-full md:w-[calc(50%-100px)]"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                                >
                                    <div className="group relative">
                                        {/* Background Ghost Number */}
                                        <div className="absolute -z-10 top-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.02] left-[-3rem] pointer-events-none select-none group-hover:text-purple-500/[0.03] transition-colors leading-none">
                                            0{index + 1}
                                        </div>

                                        <div 
                                            className={`relative bg-[#080808] border border-white/5 p-6 md:p-10 rounded-2xl transition-all duration-700 group-hover:bg-[#0c0c0c] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden hover:border-opacity-50`}
                                        >
                                            {/* Glow Hover Layer */}
                                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,rgba(168,85,247,0.1),transparent_70%)]`} />

                                            {/* Watermark/Background Icon */}
                                            <div className={`absolute -right-8 -bottom-8 text-[12rem] md:text-[18rem] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none flex items-center justify-center ${exp.color} rotate-12`}>
                                                {ICON_MAP[exp.iconName] || <FaBriefcase />}
                                            </div>

                                            {/* Top Metadata Header bar */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 pb-5 border-b border-white/5 relative z-10 gap-4 md:gap-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex gap-1">
                                                        <div className={`w-1 h-3 rounded-full ${exp.accent} bg-opacity-80`} />
                                                        <div className={`w-1 h-3 rounded-full ${exp.accent} bg-opacity-40`} />
                                                        <div className="w-1 h-3 rounded-full bg-zinc-800" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-zinc-600 tracking-[0.3em] uppercase">VERIFIED_LOG_00{index + 1}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${exp.period === 'Present' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-zinc-800'}`} />
                                                    <span className="text-[10px] font-black text-zinc-500 tracking-widest uppercase transition-colors group-hover:text-zinc-300">{exp.period}</span>
                                                </div>
                                            </div>

                                            {/* Company - Expanding to Full Container Width */}
                                            <div className="mb-10 group/header relative z-10">
                                                <div className="w-full">
                                                    <h3 className={`text-3xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase italic transition-all duration-700 group-hover:${exp.color} break-words`}>
                                                        {exp.company}
                                                    </h3>
                                                    <div className="flex items-center gap-3 mt-4">
                                                        <div className="h-[2px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-purple-500/50 transition-all duration-500" />
                                                        <span className="px-3 py-1 bg-white/5 rounded-md text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-zinc-200 group-hover:bg-white/10 transition-all">
                                                            {exp.tag}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Technical Dossier Content */}
                                            <div className="relative mb-10 bg-zinc-950/40 border border-white/5 rounded-2xl p-6 md:p-8 group-hover:bg-black/60 transition-all duration-500 z-10">
                                                {/* Industrial Corner Decals */}
                                                <div className={`absolute top-4 left-4 w-2 h-2 border-l-2 border-t-2 border-zinc-900 group-hover:border-white transition-colors`} />
                                                <div className={`absolute bottom-4 right-4 w-2 h-2 border-r-2 border-b-2 border-zinc-900 group-hover:border-white transition-colors`} />

                                                <div className="flex items-center gap-4 mb-4">
                                                    <FaTerminal className={`text-[12px] ${exp.color} opacity-80`} />
                                                    <span className="text-[11px] font-black text-white uppercase tracking-[0.3em] font-tech text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">{exp.role}</span>
                                                </div>
                                                <p className="text-zinc-500 leading-relaxed text-sm md:text-base font-bold group-hover:text-zinc-300 transition-colors selection:bg-purple-500 selection:text-white">
                                                    {exp.description}
                                                </p>
                                            </div>

                                            {/* Professional Status Bar */}
                                            <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10 transition-all duration-500 group-hover:border-white/20">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-2">VALID_STATE:</span>
                                                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-white/5 group-hover:border-current transition-all ${exp.period === 'Present' ? 'text-emerald-500' : 'text-zinc-600'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${exp.period === 'Present' ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-zinc-800'}`} />
                                                            <span className="text-[9px] font-black uppercase tracking-[0.1em]">{exp.status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-2">INDEX_UID:</span>
                                                    <div className={`font-tech text-3xl font-black tracking-tighter opacity-20 group-hover:opacity-100 group-hover:${exp.color} transition-all duration-500 italic`}>
                                                        XP#0{index + 1}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Interactive Border Pulse Effect */}
                                            <motion.div 
                                                className="absolute inset-0 pointer-events-none rounded-2xl"
                                                initial={false}
                                                whileHover={{ scale: 1 }}
                                            >
                                                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity`} />
                                                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity`} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Neutral Spacer */}
                                <div className="hidden md:block w-[calc(50%-100px)]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scan {
                    animation: scan 2.5s cubic-bezier(0.33, 1, 0.68, 1) infinite;
                }
            `}</style>
        </section>
    );
};

export default Experience;