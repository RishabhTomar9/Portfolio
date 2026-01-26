import { useState, useEffect } from 'react';

const useScrollSpy = (ids, offset = 0) => {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const listener = () => {
            const scrollInfo = ids.map(id => {
                const element = document.getElementById(id);
                if (!element) return { id, top: 0, bottom: 0 };
                const rect = element.getBoundingClientRect();
                return {
                    id,
                    top: rect.top + window.scrollY,
                    height: rect.height
                };
            });

            // Calculate current scroll position (middle of viewport is a good trigger)
            const viewportMiddle = window.scrollY + (window.innerHeight / 3);

            // Default to first section if at top
            if (window.scrollY < 100) {
                setActiveId(ids[0]);
                return;
            }

            // check if we are at bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveId(ids[ids.length - 1]);
                return;
            }

            // Find section containing the viewport middle
            for (let i = 0; i < scrollInfo.length; i++) {
                const section = scrollInfo[i];
                const nextSection = scrollInfo[i + 1];

                // If it's the last section, or if viewport is between this and next
                if (!nextSection || (viewportMiddle >= section.top && viewportMiddle < nextSection.top)) {
                    setActiveId(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', listener);
        // Call once on mount to set initial state
        listener();

        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, [ids, offset]);

    return activeId;
};

export default useScrollSpy;
