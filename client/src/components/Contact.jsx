import { useState } from 'react';
import { API_URL } from '../lib/hooks';

const EMAIL = 'saktheeshkanagaraj149@gmail.com';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [state, setState] = useState({ status: 'idle', text: '' });

    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

    async function submit(e) {
        e.preventDefault();
        setState({ status: 'sending', text: 'Sending…' });
        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.success) throw new Error(json.message || 'Something went wrong.');
            setForm({ name: '', email: '', message: '' });
            setState({ status: 'ok', text: json.message });
        } catch (err) {
            const msg = err instanceof TypeError ? "Couldn't reach the server." : err.message;
            setState({ status: 'err', text: `${msg} You can also email me at ${EMAIL}.` });
        }
    }

    return (
        <section id="contact">
            <div className="wrap">
                <div className="section-head reveal">
                    <span className="mono muted">Contact</span>
                    <h2>Say hello</h2>
                    <p>Hiring, a project for your shop, or a question about something above.</p>
                </div>

                <div className="contact-grid">
                    <div className="reveal">
                        <a className="contact-big" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        <ul className="contact-list">
                            <li><span className="mono muted">Phone</span><a href="tel:+916374401495">+91 63744 01495</a></li>
                            <li><span className="mono muted">GitHub</span><a href="https://github.com/saktheeshkanagaraj149-cell" target="_blank" rel="noreferrer">saktheeshkanagaraj149-cell</a></li>
                            <li><span className="mono muted">LinkedIn</span><a href="https://linkedin.com/in/saktheesh-kanagaraj-9539a0379" target="_blank" rel="noreferrer">saktheesh-kanagaraj</a></li>
                            <li><span className="mono muted">Based in</span><span>Sivakasi, Tamil Nadu</span></li>
                        </ul>
                    </div>

                    <form onSubmit={submit} className="reveal">
                        <label>
                            <span className="mono muted">Your name</span>
                            <input required maxLength={100} value={form.name} onChange={set('name')} autoComplete="name" />
                        </label>
                        <label>
                            <span className="mono muted">Your email</span>
                            <input required type="email" value={form.email} onChange={set('email')} autoComplete="email" />
                        </label>
                        <label>
                            <span className="mono muted">Message</span>
                            <textarea required maxLength={2000} value={form.message} onChange={set('message')} />
                        </label>
                        <button className="btn" type="submit" disabled={state.status === 'sending'}>
                            Send message
                        </button>
                        <p className={`form-note${state.status === 'err' ? ' err' : ''}`} role="status">{state.text}</p>
                    </form>
                </div>
            </div>
        </section>
    );
}
