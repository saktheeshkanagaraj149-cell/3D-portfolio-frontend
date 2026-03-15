/**
 * LoadingScreen.jsx
 * Full-screen loading overlay with animated "SK" logo and glowing progress bar.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 350);
                    return 100;
                }
                return p + Math.random() * 14 + 3;
            });
        }, 90);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                key="loading"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: '#0a0a0f',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '2rem',
                }}
            >
                {/* Animated SK logo */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{
                        width: 100, height: 100,
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, #6c63ff, #00f5d4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(108,99,255,0.6), 0 0 80px rgba(108,99,255,0.3)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                    }}
                >
                    <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '2.5rem', fontWeight: 800, color: '#fff',
                        letterSpacing: '-1px',
                    }}>SK</span>
                </motion.div>

                {/* Progress bar */}
                <div style={{ width: '220px' }}>
                    <div style={{
                        height: '3px', background: 'rgba(255,255,255,0.08)',
                        borderRadius: '2px', overflow: 'hidden',
                    }}>
                        <motion.div
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ ease: 'easeOut', duration: 0.1 }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #6c63ff, #00f5d4)',
                                borderRadius: '2px',
                                boxShadow: '0 0 10px #6c63ff',
                            }}
                        />
                    </div>
                    <p style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px', color: '#6c63ff',
                        textAlign: 'center', marginTop: '10px', letterSpacing: '0.1em',
                    }}>
                        Loading... {Math.min(Math.round(progress), 100)}%
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
