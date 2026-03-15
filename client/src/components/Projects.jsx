/**
 * Projects.jsx
 * Projects section: filter tabs + 3D CSS perspective flip cards.
 */
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { aptiqThumbnail, antigravityThumbnail, javaDojoThumbnail, fallback } from '../assets/generatedImages';

const PROJECTS = [
    {
        id: 1,
        title: 'AptIQ',
        emoji: '📚',
        thumbnail: aptiqThumbnail,
        status: '✅ COMPLETED — 2026',
        statusType: 'success',
        description: 'Free and open-source aptitude preparation platform for Indian engineering students. Led a multi-college team across Tamil Nadu and Karnataka. Full platform with admin dashboard, auth, and question bank.',
        stack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Vercel'],
        github: 'https://github.com/saktheeshkanagaraj149-cell',
        live: '#',
        category: ['Open Source', 'Web'],
    },
    {
        id: 2,
        title: 'Antigravity',
        emoji: '🤖',
        thumbnail: antigravityThumbnail,
        status: 'Active — 2026',
        statusType: 'active',
        description: 'Open-source multi-LLM development environment. Integrated Claude Sonnet 4.6, Gemini, DeepSeek, Kimi AI, and Qwen for AI-driven automation and prompt engineering experiments.',
        stack: ['React', 'Node.js', 'LLMs', 'Prompt Engineering'],
        github: 'https://github.com/saktheeshkanagaraj149-cell',
        live: '',
        category: ['AI', 'Open Source'],
    },
    {
        id: 3,
        title: 'Java Dojo',
        emoji: '☕',
        thumbnail: javaDojoThumbnail,
        status: 'Completed',
        statusType: 'success',
        description: 'Interactive Java coding game with LLM-powered code evaluation using the Claude API. Gamified environment for engineering students to master Java.',
        stack: ['React', 'Claude API', 'JavaScript'],
        github: 'https://github.com/saktheeshkanagaraj149-cell',
        live: '',
        category: ['AI', 'Web'],
    },
    {
        id: 4,
        title: 'Portfolio Website',
        emoji: '🌌',
        status: 'Completed — 2026',
        statusType: 'success',
        description: 'This very portfolio — MERN stack + Three.js 3D animations, GSAP timeline, Framer Motion scroll reveals, and a live contact form backend.',
        stack: ['React', 'Three.js', 'Node.js', 'MongoDB', 'GSAP'],
        github: '',
        live: '#',
        category: ['Web'],
    },
    {
        id: 5,
        title: 'Vehicle Diagnostic System',
        emoji: '🚗',
        status: 'Concept',
        statusType: 'concept',
        description: 'Combines 4+ years of automobile expertise with software logic to diagnose mechanical issues through structured troubleshooting flows.',
        stack: ['JavaScript', 'Node.js'],
        github: '',
        live: '',
        category: ['Web'],
    },
];

const FILTERS = ['All', 'AI', 'Web', 'Open Source'];
const STATUS_COLORS = {
    success: '#4ade80',
    active: '#00f5d4',
    concept: '#94a3b8',
};

function FlipCard({ project }) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div
            style={{
                perspective: '1200px', height: '320px', cursor: 'none',
                position: 'relative',
            }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    width: '100%', height: '100%',
                    transformStyle: 'preserve-3d', position: 'relative',
                }}
            >
                {/* Front */}
                <div className="flip-card-front glass-card" style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    backfaceVisibility: 'hidden', overflow: 'hidden',
                }}>
                    {/* Thumbnail image */}
                    {project.thumbnail ? (
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            onError={e => { e.currentTarget.src = fallback; }}
                            style={{
                                width: '100%', height: '150px',
                                objectFit: 'cover', borderRadius: '16px 16px 0 0',
                                display: 'block',
                            }}
                        />
                    ) : (
                        <div style={{
                            height: '120px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '3rem',
                            background: 'rgba(108,99,255,0.08)',
                            borderRadius: '16px 16px 0 0',
                        }}>{project.emoji}</div>
                    )}
                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', color: 'var(--color-text)' }}>
                            {project.title}
                        </h3>
                        <span
                            className={`badge ${project.statusType === 'success' ? 'badge-success' : project.statusType === 'active' ? 'badge-accent' : ''}`}
                            style={{ alignSelf: 'flex-start', fontSize: '0.72rem' }}
                        >
                            {project.status}
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                            {project.stack.slice(0, 3).map(t => (
                                <span key={t} className="badge" style={{ fontSize: '0.68rem' }}>{t}</span>
                            ))}
                        </div>
                        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'var(--color-muted)' }}>
                            Hover to flip →
                        </p>
                    </div>
                </div>

                {/* Back */}
                <div className="flip-card-back glass-card" style={{
                    position: 'absolute', inset: 0, padding: '1.75rem',
                    display: 'flex', flexDirection: 'column', gap: '0.8rem',
                    backfaceVisibility: 'hidden',
                    borderColor: 'rgba(108,99,255,0.35)',
                    background: 'rgba(20,20,40,0.95)',
                }}>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                        {project.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.6, flex: 1, overflow: 'hidden' }}>
                        {project.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {project.stack.map(t => (
                            <span key={t} className="badge badge-accent" style={{ fontSize: '0.68rem' }}>{t}</span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="btn-outline" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
                                🐙 GitHub
                            </a>
                        )}
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer"
                                className="btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
                                🚀 Live
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const filtered = filter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category.includes(filter));

    return (
        <section id="projects" style={{ background: 'rgba(12,12,20,0.55)' }}>
            <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(0,245,212,0.05)', bottom: '15%', left: '-8%' }} />

            <div className="section-wrapper">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <p className="section-subheading">// what I've built</p>
                    <h2 className="section-heading">Projects</h2>
                </motion.div>

                {/* Filter buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '0.45rem 1.1rem', borderRadius: '50px',
                            border: `1px solid ${filter === f ? 'var(--color-primary)' : 'rgba(108,99,255,0.2)'}`,
                            background: filter === f ? 'rgba(108,99,255,0.15)' : 'transparent',
                            color: filter === f ? 'var(--color-primary)' : 'var(--color-muted)',
                            fontFamily: 'Space Grotesk', fontWeight: 600,
                            fontSize: '0.85rem', cursor: 'none', transition: 'all 0.2s',
                        }}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Cards grid */}
                <motion.div
                    layout
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.5rem' }}
                >
                    <AnimatePresence>
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <FlipCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
