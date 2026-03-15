/**
 * Contact.jsx
 * Contact section: TorusKnot background + contact form + social links.
 */
import { useRef, useState, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';

const TorusKnot = lazy(() => import('../three/TorusKnot'));

const CONTACT_DETAILS = [
    { icon: '📍', label: 'Location', value: 'Sivakasi, Tamil Nadu, India — 626124', href: null },
    { icon: '📞', label: 'Phone', value: '+91 6374401495', href: 'tel:+916374401495' },
    { icon: '📧', label: 'Email', value: 'saktheeshkanagaraj149@gmail.com', href: 'mailto:saktheeshkanagaraj149@gmail.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/saktheesh-kanagaraj-9539a0379', href: 'https://linkedin.com/in/saktheesh-kanagaraj-9539a0379' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/saktheeshkanagaraj149-cell', href: 'https://github.com/saktheeshkanagaraj149-cell' },
];

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errMsg, setErrMsg] = useState('');

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setErrMsg('Please fill in all fields.');
            return;
        }
        setStatus('loading');
        setErrMsg('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            // Safely parse JSON — backend may return empty body if offline
            let data = {};
            const text = await res.text();
            if (text) {
                try { data = JSON.parse(text); } catch (_) { /* non-JSON body */ }
            }
            if (res.ok && data.success !== false) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' });
            } else {
                throw new Error(data.message || `Server responded with ${res.status}`);
            }
        } catch (err) {
            setStatus('error');
            setErrMsg(
                err.message?.includes('fetch') || err.message?.includes('Failed')
                    ? 'Unable to reach server. Please email me directly at saktheeshkanagaraj149@gmail.com'
                    : err.message || 'Something went wrong. Please try again.'
            );
        }
    };

    const inputStyle = {
        width: '100%', padding: '0.85rem 1rem',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(108,99,255,0.25)',
        borderRadius: '10px', color: 'var(--color-text)',
        fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
        outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    };

    return (
        <section id="contact" style={{ position: 'relative', overflow: 'hidden', minHeight: '700px' }}>
            {/* TorusKnot background */}
            <Suspense fallback={null}>
                <TorusKnot />
            </Suspense>

            {/* Dark overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.7) 40%, rgba(10,10,15,0.92) 100%)',
                pointerEvents: 'none',
            }} />

            <div className="section-wrapper" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                >
                    <p className="section-subheading">// let's connect</p>
                    <h2 className="section-heading">Get In Touch</h2>
                    <p style={{ maxWidth: '480px', margin: '1rem auto 0', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                        Open to collaborations, internships, and interesting conversations. Drop a message — I reply within 24 hours.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem', alignItems: 'start',
                }}>
                    {/* Left: Contact details */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                            Contact Details
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {CONTACT_DETAILS.map((d) => (
                                <div key={d.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{d.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'var(--color-primary)', marginBottom: 2 }}>
                                            {d.label}
                                        </div>
                                        {d.href ? (
                                            <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined}
                                                rel="noopener noreferrer"
                                                style={{ color: 'var(--color-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                                                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
                                            >
                                                {d.value}
                                            </a>
                                        ) : (
                                            <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{d.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <a href="https://github.com/saktheeshkanagaraj149-cell" target="_blank" rel="noopener noreferrer"
                                className="social-link" title="GitHub">🐙</a>
                            <a href="https://linkedin.com/in/saktheesh-kanagaraj-9539a0379" target="_blank" rel="noopener noreferrer"
                                className="social-link" title="LinkedIn">💼</a>
                            <a href="mailto:saktheeshkanagaraj149@gmail.com" className="social-link" title="Email">📧</a>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="glass-card"
                        style={{ padding: '2rem' }}
                    >
                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <h3 style={{ fontFamily: 'Space Grotesk', color: '#4ade80', marginBottom: '0.5rem' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                                    Thanks for reaching out! I'll get back to you within 24 hours.
                                </p>
                                <button onClick={() => setStatus('idle')} className="btn-outline"
                                    style={{ marginTop: '1.5rem', cursor: 'none' }}>
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <label style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                                        Your Name
                                    </label>
                                    <input
                                        name="name" type="text" placeholder="Ravi Kumar"
                                        value={form.name} onChange={handleChange}
                                        style={inputStyle}
                                        onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 12px rgba(108,99,255,0.3)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'rgba(108,99,255,0.25)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                                        Email Address
                                    </label>
                                    <input
                                        name="email" type="email" placeholder="ravi@example.com"
                                        value={form.email} onChange={handleChange}
                                        style={inputStyle}
                                        onFocus={e => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.boxShadow = '0 0 12px rgba(0,245,212,0.2)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'rgba(108,99,255,0.25)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                                        Message
                                    </label>
                                    <textarea
                                        name="message" rows={5} placeholder="Hi Saktheesh, I'd love to collaborate..."
                                        value={form.message} onChange={handleChange}
                                        style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                                        onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 12px rgba(108,99,255,0.3)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'rgba(108,99,255,0.25)'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>

                                {errMsg && (
                                    <p style={{ color: '#f87171', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>⚠ {errMsg}</p>
                                )}

                                <button type="submit" className="btn-primary" disabled={status === 'loading'}
                                    style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
                                    {status === 'loading' ? '⏳ Sending...' : '🚀 Send Message'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
