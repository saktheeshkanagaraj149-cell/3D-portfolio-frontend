const GROUPS = [
    {
        title: 'Use every week',
        note: 'What most of my projects are built with.',
        items: [
            ['JavaScript, React, Vite', 'Skillora, AptIQ, TenderAI, client sites'],
            ['Node.js and Express', 'REST APIs, JWT auth, file uploads'],
            ['MongoDB and Mongoose', 'Atlas in production; this site too'],
            ['HTML and CSS', 'responsive layouts without a framework'],
            ['Git and GitHub', 'everything on this page is public'],
        ],
    },
    {
        title: 'Comfortable with',
        note: 'Used in at least one finished project.',
        items: [
            ['Python, pandas, scikit-learn', 'MediDiagnose, hospital shortage model'],
            ['XGBoost, SHAP, LIME', 'explaining what a model predicts'],
            ['Three.js', 'CS Odyssey, the gears above'],
            ['Supabase and Postgres', 'login demo, NeuralPress'],
            ['Docker', 'deploying Skillora with Cerbos'],
        ],
    },
    {
        title: 'Learning now',
        note: 'Picked up recently, still getting better.',
        items: [
            ['Running LLMs locally', 'llama.cpp, QLoRA fine-tuning (AI Bot)'],
            ['Policy-based access control', 'Cerbos in Skillora'],
            ['Java and C++', 'college coursework'],
            ['Network security basics', 'Cisco Introduction to Cybersecurity'],
            ['n8n automation', 'Instagram posting pipeline for AptIQ'],
        ],
    },
];

const COURSES = [
    'Cisco — Introduction to Cybersecurity',
    'AMD Developer Cloud — Building Your First AI Chatbot (100%)',
    'Anthropic — Claude Code in Action',
];

export default function Skills() {
    return (
        <section id="skills">
            <div className="wrap">
                <div className="section-head reveal">
                    <span className="mono muted">Skills</span>
                    <h2>What I work with</h2>
                    <p>No percentages. Each line says where I've actually used it.</p>
                </div>
                <div className="skills">
                    {GROUPS.map(g => (
                        <div key={g.title} className="reveal">
                            <h3>{g.title}</h3>
                            <p className="muted" style={{ fontSize: '0.92rem', margin: 0 }}>{g.note}</p>
                            <ul>
                                {g.items.map(([name, where]) => (
                                    <li key={name}>
                                        {name}
                                        <span>{where}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="courses reveal">
                    <h3>Courses finished</h3>
                    <ul className="mono">
                        {COURSES.map(c => <li key={c}>{c}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    );
}
