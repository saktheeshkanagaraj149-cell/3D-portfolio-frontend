/**
 * CustomCursor.jsx
 * Glowing custom cursor: outer ring + inner dot that follow the mouse with lerp.
 * Hidden on touch devices.
 */
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        const onMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            // Dot follows immediately
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
            }
        };

        const onEnter = () => {
            if (dotRef.current) dotRef.current.style.transform += ' scale(2.5)';
            if (ringRef.current) ringRef.current.style.opacity = '0.5';
        };
        const onLeave = () => {
            if (ringRef.current) ringRef.current.style.opacity = '1';
        };

        // Smooth ring lerp animation
        const animate = () => {
            ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
            ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMove, { passive: true });
        document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            {/* Inner dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed', top: 0, left: 0,
                    width: 10, height: 10,
                    background: 'var(--color-accent)',
                    borderRadius: '50%',
                    pointerEvents: 'none', zIndex: 99999,
                    boxShadow: '0 0 6px var(--color-accent), 0 0 12px var(--color-accent)',
                    transition: 'transform 0.05s ease, background 0.2s',
                    willChange: 'transform',
                }}
            />
            {/* Outer ring */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed', top: 0, left: 0,
                    width: 36, height: 36,
                    border: '1.5px solid var(--color-primary)',
                    borderRadius: '50%',
                    pointerEvents: 'none', zIndex: 99998,
                    boxShadow: '0 0 10px rgba(108,99,255,0.3)',
                    transition: 'opacity 0.2s',
                    willChange: 'transform',
                }}
            />
        </>
    );
}
