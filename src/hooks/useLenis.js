import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const useLenis = (enable = true) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        if (!enable) return;

        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic easing
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.2,
            smoothTouch: false,
            touchMultiplier: 2,
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
