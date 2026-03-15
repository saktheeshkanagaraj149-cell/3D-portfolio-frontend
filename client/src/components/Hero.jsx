/**
 * Hero.jsx
 * Full-screen hero section: particle galaxy background, typewriter title,
 * name, bio, CTA buttons, and bouncing scroll indicator.
 */
import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { heroBg } from '../assets/generatedImages';

const ParticleGalaxy = lazy(() => import('../three/ParticleGalaxy'));


const TITLES = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Open Source Builder',
    'Prompt Engineer',
];

function TypewriterText() {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = TITLES[idx];
        let timeout;
        if (!deleting && text.length < current.length) {
            timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 85);
        } else if (!deleting && text.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && text.length > 0) {
            timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 45);
        } else if (deleting && text.length === 0) {
            setDeleting(false);
            setIdx(i => (i + 1) % TITLES.length);
        }
        return () => clearTimeout(timeout);
    }, [text, deleting, idx]);

    return (
        <span style={{ color: 'var(--color-accent)', fontFamily: 'Space Grotesk, sans-serif' }}>
            {text}
            <span className="typewriter-cursor" />
        </span>
    );
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
    return (
        <section id="hero" style={{
            position: 'relative', minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Static galaxy image fallback (low-end devices / Three.js load delay) */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.4,
            }} />

            {/* Three.js background */}
            <Suspense fallback={null}>
                <ParticleGalaxy />
            </Suspense>

            {/* Dark vignette overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.7) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Content */}
            <div style={{
                position: 'relative', zIndex: 2,
                textAlign: 'center', padding: '0 1.5rem',
                maxWidth: '800px',
            }}>
                {/* Greeting badge */}
                <motion.div {...fadeUp(0.1)} style={{ marginBottom: '1.2rem' }}>
                    <span className="badge">
                        👋 Hey there, I'm
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1 {...fadeUp(0.25)} style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                    fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #6c63ff 50%, #00f5d4 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    Saktheesh Kanagaraj
                </motion.h1>

                {/* Typewriter role */}
                <motion.div {...fadeUp(0.4)} style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: 'var(--color-muted)', marginBottom: '1.5rem', minHeight: '2.2rem',
                }}>
                    <TypewriterText />
                </motion.div>

                {/* Short bio */}
                <motion.p {...fadeUp(0.55)} style={{
                    fontSize: '1rem', lineHeight: 1.7,
                    color: 'rgba(226,232,240,0.65)', marginBottom: '2.5rem',
                    maxWidth: '540px', margin: '0 auto 2.5rem',
                }}>
                    B.E. Computer Science student & automobile technician turned Full Stack Developer.
                    Building open-source tools with AI and passion from Tamil Nadu, India. 🇮🇳
                </motion.p>

                {/* CTA Buttons */}
                <motion.div {...fadeUp(0.7)}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="#projects" className="btn-primary"
                        onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        🚀 View Projects
                    </a>
                    <a href="#contact" className="btn-outline"
                        onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        💬 Contact Me
                    </a>
                </motion.div>

                {/* Tech stack row */}
                <motion.div {...fadeUp(0.85)} style={{
                    display: 'flex', gap: '0.5rem', justifyContent: 'center',
                    flexWrap: 'wrap', marginTop: '2.5rem',
                }}>
                    {['React', 'Node.js', 'Three.js', 'MongoDB', 'AI/LLMs'].map(t => (
                        <span key={t} className="badge badge-accent">{t}</span>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                    position: 'absolute', bottom: '2rem', left: '50%',
                    transform: 'translateX(-50%)', zIndex: 2,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                }}
            >
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>SCROLL</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                    style={{
                        width: 24, height: 38, border: '2px solid rgba(108,99,255,0.4)',
                        borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6,
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1.4 }}
                        style={{ width: 4, height: 8, background: 'var(--color-primary)', borderRadius: 2 }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
