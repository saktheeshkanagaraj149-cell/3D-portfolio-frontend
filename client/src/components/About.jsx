const TIMELINE = [
    ['2017 – 2018', 'Higher Secondary, Pure Science', 'AVM Mari Muthu Nadar HSS, Vilampatti'],
    ['2018 – 2021', 'Diploma in Mechanical Engineering', 'PSR Polytechnic College, Sevalpatti'],
    ['2021 – 2022', 'Automobile Technician', 'VTK Automobile, Chennai'],
    ['2022 – 2024', 'Welding Technician', 'JBM Automobile, Chennai'],
    ['2024', 'Service Technician', 'Mahindra Automotive Service'],
    ['Now', 'B.E. Computer Science, 3rd year (lateral entry)', 'PSR Engineering College, Sivakasi'],
];

export default function About() {
    return (
        <section id="about">
            <div className="wrap about-grid">
                <span className="mono muted reveal">About</span>

                <div className="about-text reveal">
                    <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '1.5rem' }}>
                        From spanner to source code
                    </h2>
                    <p>
                        After my diploma I went straight to the shop floor. Diagnosing a car that won't start
                        teaches you to check one thing at a time, write down what you changed, and never trust
                        a fix you can't explain. Four years of that turned out to be good training for debugging.
                    </p>
                    <p>
                        Then I joined Computer Science through lateral entry; I'm now in my third (pre-final) year. I learn by building: a tender
                        analyser for a course project, an ML model for a datathon, websites for shops in
                        Sivakasi, and Skillora, a free learning platform I'm still working on.
                    </p>
                    <p>
                        I'm looking for an internship or junior role where I can work on real products with
                        people who review my code.
                    </p>
                </div>

                <figure className="photo reveal">
                    <img src="/assets/profile.jpg" alt="Saktheesh Kanagaraj" loading="lazy" width="600" height="750" />
                </figure>

                <ol className="timeline reveal">
                    {TIMELINE.map(([when, what, where]) => (
                        <li key={what}>
                            <span className="mono muted">{when}</span>
                            <span><b>{what}</b> · <span className="muted">{where}</span></span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
