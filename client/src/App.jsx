import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useProjects, useReveal } from './lib/hooks';

export default function App() {
    const { projects } = useProjects();
    useReveal([projects]);

    return (
        <>
            <Nav />
            <main>
                <Hero />
                <Work projects={projects} />
                <About />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
