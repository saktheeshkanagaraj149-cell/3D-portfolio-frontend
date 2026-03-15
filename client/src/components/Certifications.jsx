/**
 * Certifications.jsx
 * Horizontal scrollable row of glassmorphism certification cards.
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ciscoCert, fallback } from '../assets/generatedImages';

const CERTS = [
    {
        title: 'Generative AI Internship',
        issuer: 'AI Training Partner',
        year: '2025',
        emoji: '🤖',
        color: '#00f5d4',
        image: null,
        desc: 'Hands-on internship covering LLM integration, prompt engineering, and AI workflow design.',
    },
    {
        title: 'Full Stack Web Development',
        issuer: 'Training Institute',
        year: '2025',
        emoji: '💻',
        color: '#6c63ff',
        image: null,
        desc: 'MERN stack, REST APIs, React.js, Node.js, MongoDB, and deployment practices.',
    },
    {
        title: 'Cybersecurity Training Program',
        issuer: 'Cisco / Partner',
        year: '2025',
        emoji: '🛡️',
        color: '#f59e0b',
        image: ciscoCert,
        desc: 'Network security, ethical hacking concepts, and cybersecurity fundamentals from Cisco.',
    },
];

function CertCard({ cert, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="glass-card"
            style={{
                minWidth: '300px', maxWidth: '320px',
                padding: 0, overflow: 'hidden',
                flexShrink: 0, position: 'relative',
                borderColor: `${cert.color}30`,
            }}
            whileHover={{ scale: 1.03, y: -6 }}
        >
            {/* Shimmer bar */}
            <div className="animate-shimmer" style={{
                position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none', zIndex: 1,
            }} />

            {/* Certificate image or gradient header */}
            {cert.image ? (
                <img
                    src={cert.image}
                    alt={cert.title}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                    style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                />
            ) : (
                <div style={{
                    height: '120px', background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}08)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '3rem', borderBottom: `1px solid ${cert.color}20`,
                }}>
                    {cert.emoji}
                </div>
            )}

            <div style={{ padding: '1.4rem' }}>
                <h3 style={{
                    fontFamily: 'Space Grotesk', fontSize: '1rem',
                    color: cert.color, marginBottom: '0.4rem',
                }}>
                    {cert.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'var(--color-muted)' }}>
                        {cert.issuer}
                    </span>
                    <span className="badge" style={{ fontSize: '0.68rem' }}>{cert.year}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
                    {cert.desc}
                </p>
            </div>
        </motion.div>
    );
}

export default function Certifications() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="certifications" style={{ background: 'rgba(10,10,15,0.6)', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(108,99,255,0.07)', top: '20%', right: '-5%' }} />

            <div className="section-wrapper">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <p className="section-subheading">// credentials</p>
                    <h2 className="section-heading">Certifications</h2>
                </motion.div>

                {/* Horizontal scroll row */}
                <div style={{
                    display: 'flex', gap: '1.5rem',
                    overflowX: 'auto', paddingBottom: '1rem',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--color-primary) transparent',
                    justifyContent: CERTS.length < 4 ? 'center' : 'flex-start',
                    flexWrap: 'wrap',
                }}>
                    {CERTS.map((cert, i) => (
                        <CertCard key={cert.title} cert={cert} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
