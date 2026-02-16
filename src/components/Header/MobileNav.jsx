import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { Button } from '../ui/button'; // Assuming Button is available

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
        { icon: <FaInstagram />, link: "https://www.instagram.com/_._.rishabh_._/" }
    ];

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                duration: 0.8,
                ease: [0.32, 0, 0.67, 0]
            }
        },
        open: {
            x: "0%",
            transition: {
                duration: 0.8,
                ease: [0.32, 0, 0.67, 0]
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
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: {
            x: 100,
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.4 }
        },
        open: {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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
                className="relative z-[1100] p-3 text-white focus:outline-none mix-blend-difference"
            >
                <AnimatePresence mode="wait">
                    {menuOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <HiOutlineX size={28} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <HiOutlineMenuAlt3 size={28} />
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
                                transition={{ duration: 0.5 }}
                                onClick={() => setMenuOpen(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9999]"
                            />

                            <motion.div
                                className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] z-[10000] bg-[#0a0a0a] border-l border-white/5 flex flex-col justify-between py-16 px-8 sm:px-12 shadow-2xl"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={menuVariants}
                            >
                                {/* Header inside Drawer */}
                                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                                    <span className="text-sm font-bold text-zinc-500 tracking-widest uppercase">Navigation</span>

                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        className="p-2 text-white/50 hover:text-white transition-colors lg:hidden"
                                    >
                                        <HiOutlineX size={24} />
                                    </button>
                                </div>


                                {/* Navigation Links */}
                                <motion.nav
                                    variants={containerVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="flex flex-col gap-4 relative z-10"
                                >
                                    {scrollItems.map((item, i) => (
                                        <motion.div
                                            key={item}
                                            variants={itemVariants}
                                            className="overflow-hidden" // Clip overflow for cleaner text slide
                                        >
                                            <a
                                                href={`#${item}`}
                                                className={`group flex items-center gap-6 py-2 transition-all duration-500`}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <span className={`text-xs font-bold transition-colors duration-300 ${activeSection === item ? 'text-purple-400' : 'text-zinc-600 group-hover:text-purple-300'
                                                    }`}>
                                                    0{i + 1}
                                                </span>
                                                <span className={`text-4xl sm:text-5xl font-bold font-tech tracking-tighter uppercase transition-all duration-300 ${activeSection === item
                                                    ? "text-white translate-x-4"
                                                    : "text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-2"
                                                    }`}>
                                                    {item}
                                                </span>
                                            </a>
                                        </motion.div>
                                    ))}
                                </motion.nav>

                                {/* Footer Section */}
                                <div className="flex flex-col gap-8 mt-3">
                                    <motion.div
                                        variants={{
                                            closed: { opacity: 0, y: 20 },
                                            open: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }
                                        }}
                                    >
                                        <Button variant="glow" size="lg" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white" asChild>
                                            <a
                                                href="mailto:rishabhtomar9999@gmail.com"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Let's Work Together
                                            </a>
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        variants={socialContainerVariants}
                                        initial="closed"
                                        animate="open"
                                        className="flex gap-4 justify-between pt-6 border-t border-white/5"
                                    >
                                        {socialLinks.map((social, idx) => (
                                            <motion.a
                                                key={idx}
                                                variants={socialItemVariants}
                                                href={social.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-xl group"
                                            >
                                                <span className="group-hover:scale-110 transition-transform duration-300">
                                                    {social.icon}
                                                </span>
                                            </motion.a>
                                        ))}
                                    </motion.div>
                                </div>
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