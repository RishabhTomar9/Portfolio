import React, { useEffect, useState } from 'react'
import { app, initAnalytics } from './firebase'
import Hero from './components/Hero'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Skills from './components/Skills'
import CertificateAchievements from './components/CertificateAchievements'
import Loader from './components/Loader'
import CursorTracker from './components/CursorTracker'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lazily initialize analytics; ignore failures
    initAnalytics && initAnalytics()

    // Simulate initial loading (can be replaced with real asset/image loading logic)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5500)

    return () => clearTimeout(timer)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <div className="App">
      <CursorTracker />
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
