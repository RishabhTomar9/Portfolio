import React, { useEffect, useState } from 'react'
import { app } from './firebase'
import { motion, useScroll, useSpring } from 'framer-motion'
import useLenis from './hooks/useLenis'
import Hero from './components/Hero/Hero'
import Header from './components/Header/Header'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Footer from './components/Footer/Footer'
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import CertificateAchievements from './components/CertificateAchievements/CertificateAchievements'
import Loader from './components/Loader/Loader'
import CursorTracker from './components/CursorTracker/CursorTracker'
import ScrollReveal from './components/ScrollReveal'
import ScrollStatus from './components/ScrollStatus'


import GlobalBackground from './components/common/GlobalBackground'

function App() {
  const [loading, setLoading] = useState(true)

  // Initialize Lenis smooth scrolling when not loading
  useLenis(!loading);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      <GlobalBackground />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <CursorTracker />
      <ScrollStatus />
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
