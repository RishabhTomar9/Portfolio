import React, { useEffect } from 'react'
import { app, analytics } from './firebase'
import Hero from './components/Hero'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Skills from './components/Skills'
import CertificateAchievements from './components/CertificateAchievements'
import AnimatedLines from './components/AnimatedLines'
import './App.css'

function App() {
  useEffect(() => {
    // Ensures Firebase analytics is initialized if needed
    if (analytics) {
      console.log('Firebase Analytics Initialized')
    }
  }, [])

  return (
    <div className="App">
      <AnimatedLines />
      <Header />
      <Hero />
      <About />
      <Skills />
      <CertificateAchievements />
      <Projects />
      <Footer />
    </div>
  )
}

export default App
