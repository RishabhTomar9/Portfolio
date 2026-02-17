import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const DesktopNav = ({ scrollItems, activeSection }) => {
    return (
        <nav className="hidden md:flex items-center p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-purple-900/10 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
            {scrollItems.map((item) => (
                <a
                    key={item}
                    href={`#${item}`}
                    className={`relative px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 z-10 font-mono ${activeSection === item ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                    {activeSection === item && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    {item}
                </a>
            ))}
        </nav>
    );
};

export default DesktopNav;