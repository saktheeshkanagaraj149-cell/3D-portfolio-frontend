/**
 * Journey.jsx
 * Animated vertical timeline with GSAP ScrollTrigger.
 * Each milestone slides in as the user scrolls.
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MILESTONES = [
    {
        phase: 'Phase 1',
        period: '2017 – 2018',
        icon: '🎓',
        title: 'Higher Secondary (Pure Science)',
        org: 'AVM Mari Muthu Nadar HSS, Vilampatti',
        color: '#a78bfa',
    },
    {
        phase: 'Phase 2',
        period: '2018 – 2021',
        icon: '🎓',
        title: 'Diploma in Mechanical Engineering',
        org: 'PSR Polytechnic College, Sevalpatti',
        color: '#6c63ff',
    },
    {
        phase: 'Phase 3',
        period: '2021 – 2022',
        icon: '🔧',
        title: 'Automobile Technician',
        org: 'VTK Automobile Pvt Ltd, Chennai',
        color: '#f59e0b',
    },
    {
        phase: 'Phase 4',
        period: '2022 – 2024',
        icon: '⚙️',
        title: 'Welding Technician',
        org: 'JBM Automobile Pvt Ltd, Chennai',
        color: '#f97316',
    },
    {
        phase: 'Phase 5',
        period: '2024 – Present',
        icon: '🚗',
        title: 'Service Technician',
        org: 'Mahindra Automotive Service',
        color: '#ef4444',
    },
    {
        phase: 'Phase 6',
        period: '2025 – Present',
        icon: '💻',
        title: 'B.E. Computer Science (Lateral Entry)',
        org: 'PSR Engineering College',
        color: '#6c63ff',
    },
    {
        phase: 'Phase 7',
        period: '2025 – Present',
        icon: '🤖',
        title: 'Generative AI Internship + Full Stack Training',
        org: 'Exploring LLMs, Prompt Engineering, Web Development',
        color: '#00f5d4',
    },
    {
        phase: 'Phase 8',
        period: '2026',
        icon: '🚀',
        title: 'AptIQ — LAUNCHED',
        org: 'Founded and delivered open-source aptitude prep platform for Indian engineering students with a multi-college team',
        color: '#4ade80',
        highlight: true,
    },
];

function MilestoneItem({ item, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const isLeft = index % 2 === 0;

    return (
        <div ref={ref} className="timeline-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 40px 1fr',
            gap: '0',
            alignItems: 'center',
            marginBottom: '3rem',
            position: 'relative',
        }}>
            {/* Left side content */}
            {isLeft ? (
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="glass-card"
                    style={{
                        padding: '1.4rem',
                        borderColor: item.highlight ? `${item.color}60` : 'var(--glass-border)',
                        boxShadow: item.highlight ? `0 0 20px ${item.color}30` : 'none',
                        gridColumn: '1',
                        textAlign: 'right',
                    }}
                >
                    <span style={{
                        fontFamily: 'JetBrains Mono', fontSize: '0.7rem',
                        color: item.color, letterSpacing: '0.1em',
                    }}>
                        {item.period}
                    </span>
                    <h3 style={{
                        fontFamily: 'Space Grotesk', fontSize: '1rem',
                        color: item.highlight ? item.color : 'var(--color-text)',
                        margin: '0.3rem 0',
                    }}>
                        {item.icon} {item.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                        {item.org}
                    </p>
                    {item.highlight && (
                        <span className="badge badge-success" style={{ marginTop: '0.5rem', display: 'inline-flex' }}>
                            ✅ Completed
                        </span>
                    )}
                </motion.div>
            ) : (
                <div style={{ gridColumn: '1' }} />
            )}

            {/* Center dot + line */}
            <div style={{
                gridColumn: '2', display: 'flex', flexDirection: 'column',
                alignItems: 'center', position: 'relative',
            }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                    style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: item.color,
                        boxShadow: `0 0 12px ${item.color}`,
                        zIndex: 2, flexShrink: 0,
                        border: '2px solid var(--bg-primary)',
                    }}
                />
            </div>

            {/* Right side content */}
            {!isLeft ? (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="glass-card"
                    style={{
                        padding: '1.4rem',
                        borderColor: item.highlight ? `${item.color}60` : 'var(--glass-border)',
                        boxShadow: item.highlight ? `0 0 20px ${item.color}30` : 'none',
                        gridColumn: '3',
                    }}
                >
                    <span style={{
                        fontFamily: 'JetBrains Mono', fontSize: '0.7rem',
                        color: item.color, letterSpacing: '0.1em',
                    }}>
                        {item.period}
                    </span>
                    <h3 style={{
                        fontFamily: 'Space Grotesk', fontSize: '1rem',
                        color: item.highlight ? item.color : 'var(--color-text)',
                        margin: '0.3rem 0',
                    }}>
                        {item.icon} {item.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                        {item.org}
                    </p>
                    {item.highlight && (
                        <span className="badge badge-success" style={{ marginTop: '0.5rem', display: 'inline-flex' }}>
                            ✅ Completed
                        </span>
                    )}
                </motion.div>
            ) : (
                <div style={{ gridColumn: '3' }} />
            )}
        </div>
    );
}

export default function Journey() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="journey" style={{ position: 'relative' }}>
            <div className="glow-orb" style={{ width: 350, height: 350, background: 'rgba(108,99,255,0.07)', top: '10%', right: '-5%' }} />
            <div className="glow-orb" style={{ width: 280, height: 280, background: 'rgba(0,245,212,0.06)', bottom: '20%', left: '-5%' }} />

            <div className="section-wrapper">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <p className="section-subheading">// how I got here</p>
                    <h2 className="section-heading">My Journey</h2>
                    <p style={{ maxWidth: '500px', margin: '1rem auto 0', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                        From a mechanic's toolbox to a developer's keyboard — every phase built the next.
                    </p>
                </motion.div>

                {/* Timeline container with center line */}
                <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Vertical line */}
                    <div style={{
                        position: 'absolute', left: '50%', top: 0, bottom: 0,
                        width: 2, transform: 'translateX(-50%)',
                        background: 'linear-gradient(180deg, transparent, #6c63ff 10%, #00f5d4 90%, transparent)',
                        zIndex: 0,
                    }} />

                    {MILESTONES.map((item, i) => (
                        <MilestoneItem key={i} item={item} index={i} />
                    ))}
                </div>
            </div>

            {/* Mobile: collapse to single-column stacked layout */}
            <style>{`
                @media (max-width: 640px) {
                    .timeline-grid {
                        grid-template-columns: 20px 1fr !important;
                    }
                    .timeline-grid > div:first-child:empty,
                    .timeline-grid > div:last-child:empty {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
}
