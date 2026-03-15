/**
 * AIStack.jsx  — AI Arsenal section (redesigned for premium look)
 * Horizontal scroll LLM cards + expertise meter + Antigravity credit.
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LLMs = [
    {
        name: 'Claude Sonnet 4.6',
        org: 'Anthropic',
        color: '#D97706',
        bg: 'rgba(217,119,6,0.08)',
        icon: '☁️',
        badge: 'Primary',
        badgeColor: '#D97706',
        level: 95,
        tags: ['Code Gen', 'Portfolio Dev', 'Java Dojo'],
        use: 'Main coding assistant — powers Java Dojo evaluation engine and this portfolio via Antigravity.',
    },
    {
        name: 'Gemini (Latest)',
        org: 'Google DeepMind',
        color: '#4285F4',
        bg: 'rgba(66,133,244,0.08)',
        icon: '✨',
        badge: 'Research',
        badgeColor: '#4285F4',
        level: 85,
        tags: ['Multimodal', 'Research', 'Workflow'],
        use: 'Multimodal reasoning, research queries, and AI workflow design for complex systems.',
    },
    {
        name: 'DeepSeek R1',
        org: 'DeepSeek AI',
        color: '#06B6D4',
        bg: 'rgba(6,182,212,0.08)',
        icon: '🔍',
        badge: 'Reasoning',
        badgeColor: '#06B6D4',
        level: 80,
        tags: ['Deep Reasoning', 'Code Review', 'Algorithms'],
        use: 'Deep reasoning tasks, code review, and algorithmic analysis with chain-of-thought outputs.',
    },
    {
        name: 'Kimi AI',
        org: 'Moonshot AI',
        color: '#8B5CF6',
        bg: 'rgba(139,92,246,0.08)',
        icon: '🌙',
        badge: 'Long Context',
        badgeColor: '#8B5CF6',
        level: 75,
        tags: ['Long Context', 'Documents', 'Prompting'],
        use: 'Long-context document analysis and complex multi-turn prompting experiments.',
    },
    {
        name: 'Qwen (Local)',
        org: 'Alibaba Cloud',
        color: '#10B981',
        bg: 'rgba(16,185,129,0.08)',
        icon: '🖥️',
        badge: 'Local',
        badgeColor: '#10B981',
        level: 70,
        tags: ['Local Inference', 'Offline AI', 'Edge'],
        use: 'Local LLM inference — full offline AI development without API costs.',
    },
];

const SKILLS_EXPERTISE = [
    { label: 'Prompt Engineering', level: 92, color: '#00f5d4' },
    { label: 'AI Workflow Design', level: 85, color: '#6c63ff' },
    { label: 'LLM Integration', level: 88, color: '#D97706' },
    { label: 'AI-Assisted Dev', level: 90, color: '#4285F4' },
];

function LLMCard({ llm, index, inView }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{
                background: llm.bg,
                border: `1px solid ${llm.color}35`,
                borderRadius: 20,
                padding: '1.6rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s',
                cursor: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${llm.color}30`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
            {/* Top glow line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${llm.color}, transparent)`,
            }} />

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    {/* Icon box */}
                    <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: `${llm.color}20`,
                        border: `1px solid ${llm.color}50`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: `0 0 20px ${llm.color}30`,
                        flexShrink: 0,
                    }}>
                        {llm.icon}
                    </div>
                    <div>
                        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '0.95rem', color: '#e2e8f0', marginBottom: 2 }}>
                            {llm.name}
                        </h3>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: '#94a3b8' }}>
                            {llm.org}
                        </span>
                    </div>
                </div>
                {/* Badge */}
                <span style={{
                    fontFamily: 'JetBrains Mono', fontSize: '0.64rem',
                    color: llm.badgeColor,
                    background: `${llm.badgeColor}15`,
                    border: `1px solid ${llm.badgeColor}40`,
                    borderRadius: 50, padding: '0.2rem 0.6rem',
                    whiteSpace: 'nowrap',
                }}>
                    {llm.badge}
                </span>
            </div>

            {/* Proficiency bar */}
            <div style={{ marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.66rem', color: '#94a3b8' }}>Proficiency</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.66rem', color: llm.color }}>{llm.level}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: llm.level / 100 } : {}}
                        transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                            height: '100%', transformOrigin: 'left',
                            background: `linear-gradient(90deg, ${llm.color}, ${llm.color}80)`,
                            boxShadow: `0 0 6px ${llm.color}`,
                        }}
                    />
                </div>
            </div>

            {/* Use case */}
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                {llm.use}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {llm.tags.map(tag => (
                    <span key={tag} style={{
                        fontFamily: 'JetBrains Mono', fontSize: '0.62rem',
                        color: llm.color, background: `${llm.color}10`,
                        border: `1px solid ${llm.color}25`,
                        borderRadius: 50, padding: '0.2rem 0.55rem',
                    }}>{tag}</span>
                ))}
            </div>
        </motion.div>
    );
}

export default function AIStack() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="ai-stack" style={{ background: 'rgba(8,8,14,0.7)', position: 'relative' }}>
            <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(0,245,212,0.06)', top: '15%', left: '-8%' }} />
            <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(108,99,255,0.07)', bottom: '10%', right: '-5%' }} />

            <div className="section-wrapper">
                {/* Heading */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                >
                    <p className="section-subheading">// AI tools I use daily</p>
                    <h2 className="section-heading">AI Arsenal</h2>
                    <p style={{ maxWidth: '520px', margin: '1rem auto 0', color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                        Integrated, tested, and shipped real products using these LLMs —
                        from code generation to AI-driven product features.
                    </p>
                </motion.div>

                {/* LLM Cards — 3-col on large, 2-col on mid, 1-col on small */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '3rem',
                }}>
                    {LLMs.map((llm, i) => (
                        <LLMCard key={llm.name} llm={llm} index={i} inView={inView} />
                    ))}
                </div>

                {/* Bottom: expertise bars + Antigravity credit */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {/* AI Skill Bars */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        style={{
                            background: 'rgba(18,18,26,0.7)',
                            border: '1px solid rgba(108,99,255,0.15)',
                            borderRadius: 20, padding: '1.75rem',
                        }}
                    >
                        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#e2e8f0', marginBottom: '1.4rem' }}>
                            🎯 AI Expertise
                        </h3>
                        {SKILLS_EXPERTISE.map((s, i) => (
                            <div key={s.label} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.82rem', color: '#e2e8f0' }}>{s.label}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: s.color }}>{s.level}%</span>
                                </div>
                                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={inView ? { scaleX: s.level / 100 } : {}}
                                        transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        style={{
                                            height: '100%', transformOrigin: 'left',
                                            background: `linear-gradient(90deg, ${s.color}, #00f5d4)`,
                                            boxShadow: `0 0 8px ${s.color}60`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Antigravity credit */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.7 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,245,212,0.06))',
                            border: '1px solid rgba(108,99,255,0.25)',
                            borderRadius: 20, padding: '1.75rem',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.2rem',
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                                <motion.span
                                    animate={{ boxShadow: ['0 0 8px #6c63ff40', '0 0 20px #6c63ff80', '0 0 8px #6c63ff40'] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{
                                        fontFamily: 'JetBrains Mono', fontSize: '0.78rem',
                                        color: '#6c63ff', background: 'rgba(108,99,255,0.15)',
                                        border: '1px solid rgba(108,99,255,0.35)',
                                        borderRadius: 50, padding: '0.3rem 0.9rem',
                                    }}
                                >🎯 Prompt Engineer</motion.span>
                                <span style={{
                                    fontFamily: 'JetBrains Mono', fontSize: '0.78rem',
                                    color: '#00f5d4', background: 'rgba(0,245,212,0.1)',
                                    border: '1px solid rgba(0,245,212,0.3)',
                                    borderRadius: 50, padding: '0.3rem 0.9rem',
                                }}>🔬 LLM Evaluator</span>
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>
                                This portfolio was built inside{' '}
                                <strong style={{ color: '#00f5d4' }}>Antigravity</strong> — an open-source
                                multi-LLM environment. Every component was crafted with AI-assisted workflow.
                            </p>
                        </div>
                        <a
                            href="https://github.com/saktheeshkanagaraj149-cell"
                            target="_blank" rel="noopener noreferrer"
                            className="btn-outline"
                            style={{ alignSelf: 'flex-start', padding: '0.5rem 1.2rem', fontSize: '0.82rem' }}
                        >
                            🐙 View on GitHub
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
