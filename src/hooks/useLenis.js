import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const useLenis = (enable = true) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        if (!enable) return;

        const lenis = new Lenis({
            duration: 1.5, // Increased from 0.8
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for better feel
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.0,
            smoothTouch: true, // Enable for mobile smoothness
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;

        let rafId;

        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [enable]);

    return lenisRef;
};

export default useLenis;
