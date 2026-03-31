import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

/**
 * Hook to prefetch critical Firestore data and track initialization state.
 * Debounces the 'ready' state to ensure the UI has settled.
 */
const useDataPrefetch = (delay = 800) => {
    const [dataReady, setDataReady] = useState({
        projects: false,
        experience: false,
        skills: false,
        hero: false,
    });
    const [isFullyInitialized, setIsFullyInitialized] = useState(false);

    useEffect(() => {
        // Updated to match actual collection names in firestore.rules
        const collections = ['projects', 'experiences', 'skills_tech', 'content'];
        const unsubscribes = [];

        collections.forEach(colName => {
            const q = query(collection(db, colName), limit(1));
            const unsub = onSnapshot(q, () => {
                setDataReady(prev => ({ ...prev, [colName === 'content' ? 'hero' : (colName === 'experiences' ? 'experience' : (colName === 'skills_tech' ? 'skills' : colName))]: true }));
            }, (error) => {
                console.error(`Prefetch error for ${colName}:`, error);
                // Even on error, we mark as ready so we don't hang the loader
                setDataReady(prev => ({ ...prev, [colName === 'content' ? 'hero' : (colName === 'experiences' ? 'experience' : (colName === 'skills_tech' ? 'skills' : colName))]: true }));
            });
            unsubscribes.push(unsub);
        });

        return () => unsubscribes.forEach(u => u());
    }, []);

    useEffect(() => {
        const allReady = Object.values(dataReady).every(v => v);
        
        if (allReady) {
            // Debounce the final 'ready' signal to allow browser to calculate layout
            const timer = setTimeout(() => {
                setIsFullyInitialized(true);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [dataReady, delay]);

    return isFullyInitialized;
};

export default useDataPrefetch;
