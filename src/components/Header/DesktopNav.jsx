import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

const SECTION_ICONS = {
    'home': 'Home',
    'about': 'Info',
    'experience': 'BriefcaseBusiness',
    'skills': 'Binary',
    'milestones': 'Trophy',
    'projects': 'Shapes',
    'contact': 'Mail'
};

const DesktopNav = ({ scrollItems, activeSection }) => {
    const renderIcon = (item, isActive) => {
        const IconName = SECTION_ICONS[item] || 'Zap';
        const Icon = Lucide[IconName];
        return Icon ? (
            <Icon
                size={12}
                strokeWidth={isActive ? 3 : 2.5}
                className={`transition-all duration-500 ${isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}
            />
        ) : null;
    };

    return (
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl">
            {scrollItems.map((item, index) => {
                const isActive = activeSection === item;
                return (
                    <a
                        key={item}
                        href={`/#${item}`}
                        className={`group relative flex items-center gap-3 px-5 py-2.5 transition-all duration-500 z-10
                            ${isActive ? 'text-white font-black' : 'text-zinc-500 font-bold hover:text-zinc-300'}
                        `}
                    >
                        {/* High-Fidelity Liquid Active Fill */}
                        {isActive && (
                            <motion.div
                                layoutId="nav-liquid-pill"
                                className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg -z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
                                <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                            </motion.div>
                        )}

                        {/* Hover Trace (Inactive Only) */}
                        {!isActive && (
                            <div className="absolute inset-x-2 bottom-1.5 h-[1px] bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        )}

                        <div className="flex items-center gap-2.5 transition-transform duration-500 group-hover:-translate-y-0.5">
                            <span className={`text-[7px] font-black font-bold transition-colors duration-500 ${isActive ? 'text-white/60' : 'text-zinc-800 group-hover:text-zinc-600'
                                }`}>
                                0{index + 1}
                            </span>

                            <span className="flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                {renderIcon(item, isActive)}
                            </span>

                            <span className="text-[9px] uppercase tracking-[0.15em] font-sans leading-none">
                                {item}
                            </span>
                        </div>
                    </a>
                );
            })}
        </nav>
    );
};

export default DesktopNav;