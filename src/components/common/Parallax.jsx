import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useWindowSize from "../../hooks/useWindowSize";

export default function Parallax({ children, offset = 50, className = "" }) {
    const ref = useRef(null);
    const { width } = useWindowSize();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    // Disable on mobile for performance/UX usually
    if (width < 768) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}
