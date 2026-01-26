import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Magnetic from '../common/Magnetic';

const DesktopNav = ({ scrollItems, activeSection }) => {
    return (
        <nav className="hidden md:flex items-center gap-6 px-6 py-3 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm shadow-sm">
            {scrollItems.map((item) => (
                <div key={item} className="relative group">
                    <a
                        href={`#${item}`}
                        className={`relative text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeSection === item
                            ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                            : "text-zinc-500 hover:text-white"
                            }`}
                    >
                        {item}
                    </a>
                    {activeSection === item && (
                        <motion.div
                            layoutId="nav-glow"
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,1)]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-white transition-all duration-300 group-hover:w-full ${activeSection === item ? 'w-0' : ''}`}></span>
                </div>
            ))}
        </nav>
    );
};

export default DesktopNav;