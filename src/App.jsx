import React, { useEffect, useState } from 'react'
import { app } from './firebase'
import useLenis from './hooks/useLenis'
import Hero from './components/Hero'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Experience from './components/Experience'
import Skills from './components/Skills'
import CertificateAchievements from './components/CertificateAchievements'
import Loader from './components/Loader'
import CursorTracker from './components/CursorTracker'
import ScrollReveal from './components/ScrollReveal'


function App() {
  const [loading, setLoading] = useState(true)

  // Initialize Lenis smooth scrolling when not loading
  useLenis(!loading);

  useEffect(() => {


    // Simulate initial loading (can be replaced with real asset/image loading logic)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5500)

    return () => clearTimeout(timer)
  }, [])

  return loading ? (
    <Loader onFinish={() => setLoading(false)} />
  ) : (
    <div className="App">
      <CursorTracker />
      <Header />

      <ScrollReveal>
        <Hero />
      </ScrollReveal>

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Experience />
      </ScrollReveal>

      <ScrollReveal>
        <Skills />
      </ScrollReveal>

      <ScrollReveal>
        <CertificateAchievements />
      </ScrollReveal>

      <ScrollReveal>
        <Projects />
      </ScrollReveal>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </div>
  )
}

export default App
