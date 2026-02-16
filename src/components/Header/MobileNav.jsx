import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { Button } from '../ui/button';

const MobileNav = ({ menuOpen, setMenuOpen, scrollItems, activeSection }) => {

    // Lock Body Scroll when Menu is Open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [menuOpen]);

    const socialLinks = [
        { icon: <FaGithub />, link: "https://github.com/RishabhTomar9" },
        { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/rishabhtomar99/" },
        { icon: <FaInstagram />, link: "https://www.instagram.com/_._.rishabh_._/" },
        { icon: <FaEnvelope />, link: "mailto:rishabhtomar9999@gmail.com" }
    ];

    const menuVariants = {
        closed: {
            x: "100%",
            rotateY: -10,
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.32, 0, 0.67, 0]
            }
        },
        open: {
            x: "0%",
            rotateY: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                ease: [0.33, 1, 0.68, 1] // Smoother, more natural ease
            }
        }
    };

    const containerVariants = {
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: {
            y: 40, // Slide up from bottom
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.3 }
        },
        open: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
        }
    };

    const socialContainerVariants = {
        open: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.4
            }
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const socialItemVariants = {
        closed: { y: 20, opacity: 0 },
        open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`relative z-[1100] p-3 text-white focus:outline-none transition-all duration-300 rounded-full ${menuOpen ? 'bg-transparent' : 'bg-black/20 backdrop-blur-md border border-white/5'}`}
            >
                <AnimatePresence mode="wait">
                    {menuOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <HiOutlineX size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <HiOutlineMenuAlt3 size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {createPortal(
                <AnimatePresence>
                    {menuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                onClick={() => setMenuOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                            />

                            {/* Perspective Container for 3D effect */}
                            <div className="fixed inset-0 z-[10000] pointer-events-none flex justify-end" style={{ perspective: "1500px" }}>
                                <motion.div
                                    className="pointer-events-auto w-full sm:w-[500px] h-full bg-[#050505] border-l border-white/10 flex flex-col justify-between py-12 px-8 sm:px-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative transform-gpu origin-right overflow-hidden"
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={menuVariants}
                                >
                                    {/* Background Grid Pattern */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />

                                    {/* Header inside Drawer */}
                                    <div className="flex justify-between items-center mb-8 pb-6 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse box-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                            <span className="text-xs font-bold text-zinc-500 tracking-[0.25em] uppercase">Rishabh's Portfolio</span>
                                        </div>
                                        <button
                                            onClick={() => setMenuOpen(false)}
                                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all transform hover:rotate-90 duration-300 backdrop-blur-sm border border-white/5"
                                        >
                                            <HiOutlineX size={20} />
                                        </button>
                                    </div>


                                    {/* Navigation Links */}
                                    <motion.nav
                                        variants={containerVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        className="flex flex-col gap-2 relative z-10"
                                    >
                                        {scrollItems.map((item, i) => (
                                            <motion.div
                                                key={item}
                                                variants={itemVariants}
                                                className="overflow-hidden"
                                            >
                                                <a
                                                    href={`#${item}`}
                                                    className="group flex items-baseline gap-6 py-2 transition-colors relative"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    <span className={`text-xs font-mono transition-colors duration-300 ${activeSection === item ? 'text-purple-500' : 'text-zinc-700 group-hover:text-zinc-500'}`}>
                                                        0{i + 1}
                                                    </span>
                                                    <span className={`text-5xl sm:text-7xl font-black font-tech tracking-tighter uppercase transition-all duration-500 ${activeSection === item
                                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 pl-4"
                                                        : "text-zinc-600 group-hover:text-white group-hover:pl-2"
                                                        }`}>
                                                        {item}
                                                    </span>
                                                </a>
                                            </motion.div>
                                        ))}
                                    </motion.nav>

                                    {/* Footer Section */}
                                    <div className="flex flex-col gap-8 mt-auto relative z-10 pt-12">
                                        <motion.div
                                            variants={socialContainerVariants}
                                            initial="closed"
                                            animate="open"
                                            className="grid grid-cols-4 gap-4"
                                        >
                                            {socialLinks.map((social, idx) => (
                                                <motion.a
                                                    key={idx}
                                                    variants={socialItemVariants}
                                                    href={social.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="aspect-square rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all group backdrop-blur-sm shadow-lg shadow-black/20"
                                                >
                                                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                                                        {social.icon}
                                                    </span>
                                                </motion.a>
                                            ))}
                                        </motion.div>

                                        <motion.div
                                            variants={{ closed: { opacity: 0 }, open: { opacity: 1, transition: { delay: 0.4 } } }}
                                            className="text-center"
                                        >
                                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
                                                © 2026 Rishabh Tomar
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default MobileNav;