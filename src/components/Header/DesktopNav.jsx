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

const DesktopNav = ({ scrollItems, activeSection, isDocked }) => {
    const renderIcon = (item, isActive) => {
        const IconName = SECTION_ICONS[item] || 'Zap';
        const Icon = Lucide[IconName];
        return Icon ? <Icon size={14} strokeWidth={2.5} className={isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'} /> : null;
    };

    return (
        <nav className={`hidden md:flex items-center gap-1.5 transition-all duration-500 
            ${isDocked 
                ? 'bg-transparent border-none p-0' 
                : 'p-1.5 rounded-2xl bg-zinc-950/80 border border-white/5 backdrop-blur-3xl shadow-inner'
            }`}
        >
            {scrollItems.map((item) => {
                const isActive = activeSection === item;
                return (
                    <a
                        key={item}
                        href={`/#${item}`}
                        className={`group relative flex items-center gap-2.5 px-4 py-2 transition-all duration-300 z-10
                            ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
                        `}
                    >
                        {/* Background Active Pill (Exactly like reference image capsule) */}
                        {isActive && (
                            <motion.div
                                layoutId="nav-active-pill"
                                className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10 shadow-lg shadow-black/40"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}

                        <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                            {renderIcon(item, isActive)}
                        </span>
                        
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] font-sans leading-none">
                            {item}
                        </span>
                    </a>
                );
            })}
        </nav>
    );
};

export default DesktopNav;