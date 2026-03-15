/**
 * Skills.jsx  — Skills section (redesigned: icon grid + progress bars, no 3D cubes)
 * Cleaner, faster, more readable than the 3D canvas approach.
 */
import { useState, useRef, Suspense, lazy } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skillsBg } from '../assets/generatedImages';

const FloatingCubes = lazy(() => import('../three/FloatingCubes'));

const TABS = ['Programming', 'AI/ML', 'Development', 'Cybersecurity', 'Tools'];

const SKILLS_DATA = {
    Programming: [
        { name: 'JavaScript', level: 80, icon: '𝗝𝗦' },
        { name: 'Java', level: 72, icon: '☕' },
        { name: 'C++', level: 68, icon: '⚙️' },
        { name: 'HTML & CSS', level: 88, icon: '🌐' },
        { name: 'Python', level: 60, icon: '🐍' },
    ],
    'AI/ML': [
        { name: 'Prompt Engineering', level: 92, icon: '🎯' },
        { name: 'Generative AI Tools', level: 87, icon: '🤖' },
        { name: 'AI Workflow Integration', level: 80, icon: '🔗' },
        { name: 'LLM Testing & Evaluation', level: 82, icon: '🔬' },
    ],
    Development: [
        { name: 'Full Stack (MERN)', level: 78, icon: '🏗️' },
        { name: 'REST API Development', level: 80, icon: '🔌' },
        { name: 'Git & GitHub', level: 83, icon: '🐙' },
        { name: 'AI-assisted Development', level: 90, icon: '💻' },
    ],
    Cybersecurity: [
        { name: 'Security Fundamentals', level: 65, icon: '🛡️' },
        { name: 'Network Security Basics', level: 60, icon: '🌐' },
        { name: 'Ethical Hacking Concepts', level: 55, icon: '🔐' },
    ],
    Tools: [
        { name: 'VS Code', level: 93, icon: '📝' },
        { name: 'Linux', level: 72, icon: '🐧' },
        { name: 'Local LLM Setup', level: 82, icon: '🖥️' },
        { name: 'AI Dev Tools', level: 87, icon: '🔧' },
    ],
};

const TAB_META = {
    Programming: { color: '#6c63ff', desc: 'Languages & core programming foundations' },
    'AI/ML': { color: '#00f5d4', desc: 'Generative AI, LLMs and prompt engineering' },
    Development: { color: '#f59e0b', desc: 'Full stack, APIs, Git workflow & dev tools' },
    Cybersecurity: { color: '#ef4444', desc: 'Network security & ethical hacking basics' },
    Tools: { color: '#a78bfa', desc: 'Dev environment, editors & AI tooling' },
};

function SkillBar({ skill, color, index, inView }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            style={{ marginBottom: '1.1rem' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>{skill.icon}</span>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>
                        {skill.name}
                    </span>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color }}>{skill.level}%</span>
            </div>
            <div style={{
                height: 6, background: 'rgba(255,255,255,0.06)',
                borderRadius: 3, overflow: 'hidden',
            }}>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: skill.level / 100 } : {}}
                    transition={{ duration: 1.1, delay: index * 0.08 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                        height: '100%', transformOrigin: 'left',
                        background: `linear-gradient(90deg, ${color}, #00f5d4)`,
                        boxShadow: `0 0 10px ${color}60`,
                        borderRadius: 3,
                    }}
                />
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const [activeTab, setActiveTab] = useState('Programming');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { color, desc } = TAB_META[activeTab];
    const skills = SKILLS_DATA[activeTab];

    return (
        <section id="skills" style={{ position: 'relative' }}>
            {/* Circuit board BG at very low opacity */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                backgroundImage: `url(${skillsBg})`,
                backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05,
            }} />
            <div className="glow-orb" style={{ width: 350, height: 350, background: 'rgba(108,99,255,0.08)', top: '20%', right: '-5%', zIndex: 0 }} />

            <div className="section-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                {/* Heading */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <p className="section-subheading">// what I know</p>
                    <h2 className="section-heading">Skills & Expertise</h2>
                </motion.div>

                {/* Tab Row */}
                <div style={{
                    display: 'flex', gap: '0.5rem', justifyContent: 'center',
                    flexWrap: 'wrap', marginBottom: '2.5rem',
                }}>
                    {TABS.map(tab => {
                        const active = activeTab === tab;
                        const tc = TAB_META[tab].color;
                        return (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '0.5rem 1.25rem', borderRadius: 50,
                                    border: `1px solid ${active ? tc : 'rgba(108,99,255,0.2)'}`,
                                    background: active ? `${tc}18` : 'transparent',
                                    color: active ? tc : '#94a3b8',
                                    fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.85rem',
                                    cursor: 'none', transition: 'all 0.2s',
                                    boxShadow: active ? `0 0 16px ${tc}30` : 'none',
                                }}
                            >{tab}</motion.button>
                        );
                    })}
                </div>

                {/* Main content: skills list + 3D cubes */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem', alignItems: 'start',
                }}>
                    {/* Left: skills progress bars */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: 'rgba(18,18,26,0.7)',
                                border: `1px solid ${color}25`,
                                borderRadius: 20, padding: '1.75rem',
                                boxShadow: `0 0 30px ${color}15`,
                            }}
                        >
                            {/* Tab header */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{
                                    fontFamily: 'Space Grotesk', color,
                                    fontSize: '1.1rem', marginBottom: 4,
                                }}>
                                    {activeTab}
                                </h3>
                                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: '#94a3b8' }}>
                                    {desc}
                                </p>
                            </div>
                            {/* Progress bars */}
                            {skills.map((s, i) => (
                                <SkillBar key={s.name} skill={s} color={color} index={i} inView={inView} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Right: 3D floating cubes */}
                    <div style={{
                        background: 'rgba(18,18,26,0.5)',
                        border: '1px solid rgba(108,99,255,0.12)',
                        borderRadius: 20, overflow: 'hidden',
                        minHeight: 300,
                    }}>
                        <div style={{ padding: '1rem 1.5rem 0.5rem', borderBottom: '1px solid rgba(108,99,255,0.1)' }}>
                            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#94a3b8' }}>
                                // 3D skill categories — drag to interact
                            </span>
                        </div>
                        <Suspense fallback={
                            <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#94a3b8' }}>
                                    Loading 3D scene...
                                </div>
                            </div>
                        }>
                            <FloatingCubes activeTab={activeTab} />
                        </Suspense>
                    </div>
                </div>

                {/* Summary stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    style={{
                        display: 'flex', gap: '1rem', flexWrap: 'wrap',
                        justifyContent: 'center', marginTop: '2.5rem',
                    }}
                >
                    {[
                        { label: 'Languages', value: '5+', color: '#6c63ff' },
                        { label: 'AI Tools', value: '5 LLMs', color: '#00f5d4' },
                        { label: 'Frameworks', value: 'MERN', color: '#f59e0b' },
                        { label: 'Certifications', value: '3', color: '#a78bfa' },
                    ].map(stat => (
                        <div key={stat.label} style={{
                            textAlign: 'center',
                            background: `${stat.color}10`,
                            border: `1px solid ${stat.color}25`,
                            borderRadius: 16, padding: '0.9rem 1.75rem',
                            minWidth: 110,
                        }}>
                            <div style={{
                                fontFamily: 'Space Grotesk', fontWeight: 800,
                                fontSize: '1.4rem', color: stat.color,
                            }}>{stat.value}</div>
                            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: '#94a3b8', marginTop: 3 }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Mobile: collapse cubes on smaller screens */}
            <style>{`
                @media (max-width: 640px) {
                    #skills .three-canvas-panel { display: none; }
                }
            `}</style>
        </section>
    );
}
