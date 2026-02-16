import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const DesktopNav = ({ scrollItems, activeSection }) => {
    return (
        <nav className="hidden md:flex items-center p-1 rounded-xl bg-black/20 border border-white/5 backdrop-blur-md shadow-lg shadow-purple-500/5">
            {scrollItems.map((item) => (
                <a
                    key={item}
                    href={`#${item}`}
                    className={`relative px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${activeSection === item ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    {activeSection === item && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
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