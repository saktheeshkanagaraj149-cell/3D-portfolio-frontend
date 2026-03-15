/**
 * Footer.jsx
 * Site footer with social links and back-to-top button.
 */
import { motion } from 'framer-motion';

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer style={{
            background: 'rgba(8,8,12,0.95)',
            borderTop: '1px solid rgba(108,99,255,0.12)',
            padding: '2.5rem 1.5rem',
            position: 'relative',
        }}>
            <div style={{
                maxWidth: '1200px', margin: '0 auto',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
            }}>
                {/* Logo */}
                <div style={{
                    width: 44, height: 44, borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6c63ff, #00f5d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.1rem', color: '#fff',
                    boxShadow: '0 0 20px rgba(108,99,255,0.35)',
                }}>SK</div>

                {/* Social row */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a href="https://github.com/saktheeshkanagaraj149-cell" target="_blank" rel="noopener noreferrer"
                        className="social-link" title="GitHub">🐙</a>
                    <a href="https://linkedin.com/in/saktheesh-kanagaraj-9539a0379" target="_blank" rel="noopener noreferrer"
                        className="social-link" title="LinkedIn">💼</a>
                    <a href="mailto:saktheeshkanagaraj149@gmail.com" className="social-link" title="Email">📧</a>
                    <a href="tel:+916374401495" className="social-link" title="Phone">📞</a>
                </div>

                {/* Nav links */}
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['About', 'Skills', 'Projects', 'Journey', 'AI Stack', 'Contact'].map(link => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            style={{
                                fontFamily: 'Space Grotesk', fontSize: '0.82rem',
                                color: 'var(--color-muted)', textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Tagline */}
                <p style={{
                    fontFamily: 'JetBrains Mono', fontSize: '0.8rem',
                    color: 'var(--color-muted)', textAlign: 'center',
                }}>
                    Built with <span style={{ color: '#ef4444' }}>❤️</span> in 2026 by{' '}
                    <strong style={{ color: 'var(--color-primary)' }}>Saktheesh Kanagaraj</strong>
                    {' '}•{' '}
                    <span style={{ color: 'var(--color-accent)' }}>
                        Powered by MERN + Three.js + Antigravity AI
                    </span>
                </p>

                {/* Copyright */}
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'rgba(148,163,184,0.4)' }}>
                    © 2026 Saktheesh Kanagaraj. All rights reserved.
                </p>
            </div>

            {/* Back to top */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'absolute', right: '2rem', bottom: '2rem',
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6c63ff, #00f5d4)',
                    border: 'none', cursor: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', boxShadow: '0 0 16px rgba(108,99,255,0.4)',
                    color: '#fff',
                }}
                title="Back to top"
            >
                ↑
            </motion.button>
        </footer>
    );
}
