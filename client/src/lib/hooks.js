import { useEffect, useState } from 'react';
import bundled from '../data/projects.json';

const API = import.meta.env.VITE_API_URL || '';

// Shows the bundled list right away, then swaps in the MongoDB copy
// (with GitHub stars / last push) once the API answers.
export function useProjects() {
    const [projects, setProjects] = useState(bundled);
    const [source, setSource] = useState('bundled');

    useEffect(() => {
        const ctrl = new AbortController();
        fetch(`${API}/api/projects`, { signal: ctrl.signal })
            .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
            .then(json => {
                if (json.success && Array.isArray(json.data) && json.data.length) {
                    setProjects(json.data);
                    setSource(json.source || 'db');
                }
            })
            .catch(() => {});
        return () => ctrl.abort();
    }, []);

    return { projects, source };
}

// Adds .in to every .reveal element once it scrolls into view.
export function useReveal(deps = []) {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal:not(.in)');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(
            entries =>
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                }),
            { rootMargin: '0px 0px -8% 0px' }
        );
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export const API_URL = API;
