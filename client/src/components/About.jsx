import { Suspense, lazy, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profilePhoto, fallback } from '../assets/generatedImages';

const SkillGlobe = lazy(() => import('../three/SkillGlobe'));

const STATS = [
    { value: '4+', label: 'Years Exp.' },
    { value: '5+', label: 'Projects' },
    { value: '5+', label: 'LLMs Used' },
    { value: '2026', label: 'BE grad.' },
];

function StatCard({ value, label, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-card"
            style={{ padding: '1.2rem', textAlign: 'center', flex: 1, minWidth: 100 }}
        >
            <div style={{
                fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #6c63ff, #00f5d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{value}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: 4 }}>{label}</div>
        </motion.div>
    );
}

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" style={{ background: 'rgba(12,12,20,0.5)', position: 'relative' }}>
            {/* Glow orbs */}
            <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(108,99,255,0.07)', top: '10%', left: '-10%' }} />
            <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(0,245,212,0.06)', bottom: '10%', right: '-5%' }} />

            <div className="section-wrapper">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <p className="section-subheading">// who I am</p>
                    <h2 className="section-heading">About Me</h2>
                </motion.div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))',
                    gap: '4rem', alignItems: 'center',
                }}>
                    {/* Left: photo + bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        {/* Profile photo with glowing spinning ring */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                            <div style={{ position: 'relative', width: 180, height: 180 }}>
                                {/* Spinning gradient ring */}
                                <div className="animate-spin-slow" style={{
                                    position: 'absolute', inset: -4,
                                    borderRadius: '50%',
                                    background: 'conic-gradient(from 0deg, #6c63ff, #00f5d4, #a78bfa, #6c63ff)',
                                    zIndex: 0,
                                }} />
                                {/* Photo */}
                                <img
                                    src={profilePhoto}
                                    alt="Saktheesh Kanagaraj"
                                    onError={e => { e.currentTarget.src = fallback; }}
                                    style={{
                                        position: 'relative', width: '100%', height: '100%',
                                        borderRadius: '50%', objectFit: 'cover', zIndex: 1,
                                        border: '4px solid var(--bg-primary)',
                                        boxShadow: '0 0 40px rgba(108,99,255,0.5)',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
                                From Spanner to{' '}
                                <span className="text-gradient-primary">Source Code</span>
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                I'm <strong style={{ color: 'var(--color-accent)' }}>Saktheesh Kanagaraj</strong> — a
                                {' '}<strong style={{ color: 'var(--color-primary)' }}>B.E. Computer Science</strong> student
                                (Lateral Entry) at PSR Engineering College, Tamil Nadu.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                My journey started in a garage: 4+ years as an{' '}
                                <strong style={{ color: 'var(--color-accent)' }}>automobile technician</strong> at
                                Mahindra, JBM, and VTK — learning problem-solving the hard way. In 2025, I pivoted
                                to{' '}<strong style={{ color: 'var(--color-primary)' }}>Computer Science</strong>,
                                bringing that same methodical, zero-bugs mindset to code.
                            </p>
                            <p>
                                I build open-source tools, explore{' '}
                                <strong style={{ color: 'var(--color-accent)' }}>Generative AI</strong>, and love
                                working at the intersection of{' '}
                                <strong style={{ color: 'var(--color-primary)' }}>engineering and creativity</strong>.
                                Already launched <strong style={{ color: '#4ade80' }}>AptIQ</strong> — a real platform
                                used by engineering students across Tamil Nadu and Karnataka.
                            </p>
                        </div>

                        {/* Stats row */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
                        </div>
                    </motion.div>

                    {/* Right: 3D Globe */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{ position: 'relative' }}
                    >
                        <p className="section-subheading" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              // drag to rotate
                        </p>
                        <Suspense fallback={
                            <div style={{ height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ color: 'var(--color-muted)', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>Loading globe...</div>
                            </div>
                        }>
                            <SkillGlobe />
                        </Suspense>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
