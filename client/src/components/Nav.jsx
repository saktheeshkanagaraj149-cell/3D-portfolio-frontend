import { useEffect, useState } from 'react';

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`nav${scrolled ? ' scrolled' : ''}`}>
            <div className="wrap">
                <a href="#top" className="nav-name">Saktheesh Kanagaraj</a>
                <nav aria-label="Sections">
                    <ul className="nav-links">
                        <li><a href="#work">Work</a></li>
                        <li className="hide-sm"><a href="#about">About</a></li>
                        <li className="hide-sm"><a href="#skills">Skills</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="/resume/" target="_blank" rel="noreferrer">Résumé</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
