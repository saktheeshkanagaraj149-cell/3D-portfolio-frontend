import { lazy, Suspense } from 'react';

const Gears = lazy(() => import('../three/Gears'));

export default function Hero() {
    return (
        <div className="hero" id="top">
            <div className="wrap">
                <div>
                    <p className="hero-kicker mono muted">Sivakasi, Tamil Nadu · CS student · open to internships and jobs</p>
                    <h1>
                        I spent four years fixing cars. Now I <em>build software</em>.
                    </h1>
                    <p className="hero-lede">
                        I'm Saktheesh. I worked as an automobile technician at VTK, JBM and Mahindra before
                        starting a B.E. in Computer Science at PSR Engineering College. These days I build
                        full-stack apps with React, Node and MongoDB, and machine learning projects in Python.
                    </p>
                    <div className="hero-actions">
                        <a className="btn" href="#work">See my work</a>
                        <a href="https://github.com/saktheeshkanagaraj149-cell" target="_blank" rel="noreferrer">GitHub ↗</a>
                        <a href="/resume/" target="_blank" rel="noreferrer">Résumé ↗</a>
                        <a href="https://linkedin.com/in/saktheesh-kanagaraj-9539a0379" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                    </div>
                </div>
                <div className="gear-box">
                    <Suspense fallback={null}>
                        <Gears />
                    </Suspense>
                    <span className="gear-caption mono muted">14 : 9 — scroll to turn</span>
                </div>
            </div>
        </div>
    );
}
