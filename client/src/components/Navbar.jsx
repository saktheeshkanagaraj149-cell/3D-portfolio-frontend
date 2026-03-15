/**
 * Navbar.jsx
 * Fixed glassmorphism navigation with scroll spy, mobile hamburger.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'AI Stack', href: '#ai-stack' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNav = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0,
                zIndex: 1000,
                background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(108,99,255,0.15)' : 'none',
                transition: 'all 0.4s ease',
                padding: '0 1.5rem',
            }}
        >
            <div style={{
                maxWidth: '1200px', margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                height: '70px',
            }}>
                {/* Logo */}
                <a href="#hero" onClick={() => handleNav('#hero')}
                    style={{ textDecoration: 'none' }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                            width: 44, height: 44, borderRadius: '12px',
                            background: 'linear-gradient(135deg, #6c63ff, #00f5d4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(108,99,255,0.4)',
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontWeight: 800, fontSize: '1.1rem', color: '#fff',
                        }}>
                        SK
                    </motion.div>
                </a>

                {/* Desktop links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    className="hidden-mobile">
                    {LINKS.map(link => (
                        <button
                            key={link.label}
                            onClick={() => handleNav(link.href)}
                            style={{
                                background: 'none', border: 'none',
                                color: active === link.href ? 'var(--color-accent)' : 'var(--color-muted)',
                                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
                                fontSize: '0.9rem', padding: '0.5rem 0.9rem',
                                borderRadius: '8px', cursor: 'none',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
                        >
                            {link.label}
                        </button>
                    ))}
                    <a
                        href="/resume.pdf"
                        download
                        className="btn-primary"
                        style={{ marginLeft: '1rem', padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                    >
                        ↓ Resume
                    </a>
                </div>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(o => !o)}
                    className="show-mobile"
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'none', flexDirection: 'column', gap: '5px', padding: '4px',
                    }}
                >
                    {[0, 1, 2].map(i => (
                        <motion.span
                            key={i}
                            animate={menuOpen
                                ? i === 0 ? { rotate: 45, y: 7 }
                                    : i === 1 ? { opacity: 0 }
                                        : { rotate: -45, y: -7 }
                                : { rotate: 0, y: 0, opacity: 1 }}
                            style={{
                                display: 'block', width: 24, height: 2,
                                background: 'var(--color-primary)', borderRadius: 2,
                            }}
                        />
                    ))}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'rgba(10,10,15,0.97)',
                            backdropFilter: 'blur(20px)',
                            borderTop: '1px solid rgba(108,99,255,0.15)',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {LINKS.map(link => (
                                <button key={link.label} onClick={() => handleNav(link.href)}
                                    style={{
                                        background: 'none', border: 'none',
                                        color: 'var(--color-text)', fontFamily: 'Space Grotesk, sans-serif',
                                        fontSize: '1.1rem', fontWeight: 500, padding: '0.7rem 0',
                                        textAlign: 'left', cursor: 'pointer',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    }}>
                                    {link.label}
                                </button>
                            ))}
                            <a href="/resume.pdf" download className="btn-primary"
                                style={{ marginTop: '1rem', justifyContent: 'center' }}>
                                ↓ Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
        </motion.nav>
    );
}
