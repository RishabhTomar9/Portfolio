import { useState, useEffect } from 'react';

const useScrollSpy = (ids, offset = 0) => {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const listener = () => {
            const scrollPosition = window.scrollY + offset;

            let foundId = ''; // Default to no active section

            // Find the last section that is above the scroll position
            for (const id of ids) {
                const element = document.getElementById(id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    // Look ahead to the next section to see if we are currently "in" this one
                    const nextElement = document.getElementById(ids[ids.indexOf(id) + 1]);
                    const nextOffsetTop = nextElement ? nextElement.offsetTop : Infinity;

                    if (scrollPosition >= offsetTop - 150 && scrollPosition < nextOffsetTop - 150) {
                        foundId = id;
                        break;
                    }
                }
            }

            // If no section found but we are at the top, maybe activate the first one?
            // Or if we are past everything, maybe the last one?
            // For now, let's keep it simple. If we break the loop, we found it.

            // Fallback: Check if we are at the very bottom of the page
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                foundId = ids[ids.length - 1];
            }

            setActiveId(foundId);
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
