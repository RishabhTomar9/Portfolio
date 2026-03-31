import React from 'react';
import { motion } from 'framer-motion';

const DesktopNav = ({ scrollItems, activeSection }) => {
    return (
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/20">
            {scrollItems.map((item) => (
                <a
                    key={item}
                    href={`/#${item}`}
                    className={`relative px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 z-10 font-bold ${activeSection === item ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                >
                    {activeSection === item && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    {item}
                </a>
            ))}
        </nav>
    );
};

export default DesktopNav;