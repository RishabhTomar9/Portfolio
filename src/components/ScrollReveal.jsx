import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({ children, width = "100%", className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75, scale: 0.98 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1], delay: 0.1 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
