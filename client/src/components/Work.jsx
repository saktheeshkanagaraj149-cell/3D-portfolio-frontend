const host = url => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

function updated(p) {
    if (!p.lastPush) return null;
    const d = new Date(p.lastPush);
    if (Number.isNaN(d.getTime())) return null;
    return `updated ${d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}`;
}

function Links({ p }) {
    return (
        <div className="links">
            {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live site ↗</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">{p.repo2 ? 'Frontend code ↗' : 'Code ↗'}</a>}
            {p.repo2 && <a href={p.repo2} target="_blank" rel="noreferrer">API code ↗</a>}
        </div>
    );
}

function Shot({ p }) {
    return (
        <div className="shot">
            <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
            <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" width="1280" height="800" />
        </div>
    );
}

function Feature({ p, n }) {
    const meta = [p.kind, p.year, p.stars ? `${p.stars}★` : null, updated(p)].filter(Boolean);
    return (
        <li className="feature reveal">
            <div className="feature-meta">
                <span className="feature-num">{String(n).padStart(2, '0')}</span>
                {meta.map(m => <span key={m} className="mono muted">{m}</span>)}
            </div>
            <div className="feature-body">
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <Links p={p} />
            </div>
            <div className="feature-side">
                {p.image && p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
                        <Shot p={p} />
                    </a>
                )}
                {p.detail && <p className="feature-detail">{p.detail}</p>}
                <ul className="stack mono">
                    {p.stack.map(s => <li key={s}>{s}</li>)}
                </ul>
            </div>
        </li>
    );
}

function Card({ p }) {
    return (
        <li className="card reveal">
            {p.image && p.live ? (
                <a className="card-img" href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
                    <Shot p={p} />
                </a>
            ) : null}
            <h3>{p.title}</h3>
            <p className="mono muted" style={{ margin: '0 0 0.5rem' }}>
                {[p.kind, p.live ? host(p.live) : null].filter(Boolean).join(' · ')}
            </p>
            <p>{p.summary}</p>
            <Links p={p} />
        </li>
    );
}

export default function Work({ projects }) {
    const sorted = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const featured = sorted.filter(p => p.featured);
    const rest = sorted.filter(p => !p.featured);

    return (
        <section id="work">
            <div className="wrap">
                <div className="section-head reveal">
                    <span className="mono muted">Work</span>
                    <h2>Things I've built</h2>
                    <p>
                        Most of these started as college projects or something a friend or local business
                        needed. Every one links to its code, and the ones that are live link to the site.
                    </p>
                </div>

                <ol className="featured">
                    {featured.map((p, i) => <Feature key={p.slug} p={p} n={i + 1} />)}
                </ol>

                {rest.length > 0 && (
                    <>
                        <h3 className="more-title reveal">Smaller projects, all live</h3>
                        <ul className="grid">
                            {rest.map(p => <Card key={p.slug} p={p} />)}
                        </ul>
                    </>
                )}
            </div>
        </section>
    );
}
