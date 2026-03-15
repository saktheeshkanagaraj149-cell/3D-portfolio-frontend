/**
 * App.jsx
 * Main application shell.
 * Lazy loads heavy sections, shows LoadingScreen on first render.
 */
import { useState, lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

// Eagerly load above-the-fold sections
import Hero from './components/Hero';

// Lazy load below-the-fold sections for performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const AIStack = lazy(() => import('./components/AIStack'));
const Projects = lazy(() => import('./components/Projects'));
const Journey = lazy(() => import('./components/Journey'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Section loading skeleton
const SectionLoader = () => (
  <div style={{
    minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '2rem',
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      border: '3px solid rgba(108,99,255,0.15)',
      borderTop: '3px solid #6c63ff',
      animation: 'spin-slow 0.8s linear infinite',
    }} />
  </div>
);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <>
      {/* Custom cursor — hidden on touch devices via CSS */}
      <CustomCursor />

      {/* Fixed navigation */}
      <Navbar />

      {/* Main page content */}
      <main>
        {/* Hero — eagerly loaded (above fold) */}
        <Hero />

        {/* All other sections — lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AIStack />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Journey />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
