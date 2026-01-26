import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { Button } from '../ui/button'; // Assuming Button is available

const MobileNav = ({ menuOpen, setMenuOpen, scrollItems, activeSection }) => {

    // Lock Body Scroll when Menu is Open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
            // Only add padding on larger screens to prevent mobile layout shift
            if (window.innerWidth >= 768) {
                const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = `${scrollBarWidth}px`;
            }
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '0px';
        };
    }, [menuOpen]);

    const socialLinks = [
        { icon: <FaGithub />, link: "https://github.com/RishabhTomar9" },
        { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/rishabhtomar99/" },
        { icon: <FaTwitter />, link: "#" },
        { icon: <FaInstagram />, link: "#" }
    ];

    const menuVariants = {
        closed: {
            x: "100%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        },
        open: {
            x: "0%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-[1100] p-3 text-white focus:outline-none"
            >
                <AnimatePresence mode="wait">
                    {menuOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <HiOutlineX size={28} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <HiOutlineMenuAlt3 size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {createPortal(
                <AnimatePresence>
                    {menuOpen && (
                        <>
                            {/* Backdrop for click-away closure */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMenuOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                            />

                            <motion.div
                                className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] z-[10000] bg-black/80 backdrop-blur-2xl border-l border-white/10 flex flex-col justify-between py-24 px-8 shadow-2xl"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={menuVariants}
                            >
                                {/* Close Button inside Drawer */}
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                                >
                                    <HiOutlineX size={32} />
                                </button>

                                {/* Navigation Links */}
                                <nav className="relative z-10 flex flex-col gap-2 mt-8">
                                    <span className="text-white/40 text-[10px] tracking-widest font-mono mb-6 block border-b border-white/10 pb-2 w-24">MENU</span>
                                    {scrollItems.map((item, i) => (
                                        <motion.div
                                            key={item}
                                            custom={i}
                                            variants={{
                                                closed: { x: 50, opacity: 0 },
                                                open: (i) => ({
                                                    x: 0,
                                                    opacity: 1,
                                                    transition: { delay: 0.1 + i * 0.05, ease: [0.76, 0, 0.24, 1] }
                                                })
                                            }}
                                        >
                                            <a
                                                href={`#${item}`}
                                                className={`text-4xl sm:text-5xl font-bold font-tech uppercase tracking-tighter transition-all duration-300 block ${activeSection === item
                                                    ? "text-white pl-6 border-l-4 border-purple-500"
                                                    : "text-zinc-600 hover:text-zinc-300"
                                                    }`}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <span className={`text-sm align-top mr-3 font-mono font-normal transition-opacity ${activeSection === item ? 'opacity-100 text-purple-400' : 'opacity-30'}`}>0{i + 1}</span>
                                                {item}
                                            </a>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Footer Section: Button & Socials */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="relative z-10 flex flex-col gap-8"
                                >
                                    <Button variant="glow" size="lg" className="w-full bg-white/5 border-white/10 hover:bg-white/10" asChild>
                                        <a
                                            href="mailto:rishabhtomar9999@gmail.com?subject=I%20want%20to%20work%20with%20you"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Let's Work Together
                                        </a>
                                    </Button>

                                    <div className="flex gap-4 justify-between pt-6 border-t border-white/10">
                                        {socialLinks.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-xl"
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default MobileNav;