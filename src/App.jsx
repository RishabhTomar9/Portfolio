import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useLenis from './hooks/useLenis';

// Global Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import CursorTracker from './components/CursorTracker/CursorTracker';
// import GlobalBackground from './components/common/GlobalBackground';

// Page Components
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import CertificateAchievements from './components/CertificateAchievements/CertificateAchievements';
import Projects from './components/Projects/Projects';

// Scroll To Top Utility
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Admin Components
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';

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
      {/* <GlobalBackground /> */}
      <CursorTracker />

      {/* Header stays visible on all pages, hidden on admin */}
      {!isAdmin && <Header />}

      <main className="min-h-screen">
        <Routes>
          {/* Home Route Renders All Sections */}
          <Route path="/" element={<Home />} />

          {/* Individual Page Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/credentials" element={<CertificateAchievements />} />
          <Route path="/projects" element={<Projects />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* Redirect any unknown route to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer stays visible on all pages, hidden on admin */}
      {!isAdmin && <Footer />}
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