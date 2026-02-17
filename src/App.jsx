import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useLenis from './hooks/useLenis';

// Global Layout Components - Keep Header/Footer eager for perceived performance
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import CursorTracker from './components/CursorTracker/CursorTracker';

// Lazy Load Page Components
const Hero = lazy(() => import('./components/Hero/Hero'));
const About = lazy(() => import('./components/About/About'));
const Resume = lazy(() => import('./components/Resume/Resume'));
const Experience = lazy(() => import('./components/Experience/Experience'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const CertificateAchievements = lazy(() => import('./components/CertificateAchievements/CertificateAchievements'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const ProjectDetail = lazy(() => import('./components/Projects/ProjectDetail'));
const Footer = lazy(() => import('./components/Footer/Footer'));

// Lazy Load Admin Components
const Login = lazy(() => import('./components/Admin/Login'));
const Dashboard = lazy(() => import('./components/Admin/Dashboard'));

// Scroll To Top Utility
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Home Page Component (Renders all sections for SPA feel)
const Home = () => (
  <>
    <Hero />
    <About />
    <Experience />
    <Skills />
    <CertificateAchievements />
    <Projects />
  </>
);

// AppContent component to handle conditional layout
const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <CursorTracker />

      {/* Header stays visible on all pages, hidden on admin */}
      {!isAdmin && <Header />}

      <main className="min-h-screen">
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            {/* Home Route Renders All Sections */}
            <Route path="/" element={<Home />} />

            {/* Individual Page Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/credentials" element={<CertificateAchievements />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />

            {/* Redirect any unknown route to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer stays visible on all pages, hidden on admin */}
      {!isAdmin && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scrolling
  useLenis(!loading);

  return loading ? (
    <Loader onFinish={() => setLoading(false)} />
  ) : (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;