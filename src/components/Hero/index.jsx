import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { fadeUpDownOnScroll } from '../../animations/animations';
import { FaReact, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import useWindowSize from '../../hooks/useWindowSize';
import HeroEarthScene from './HeroEarthScene';
import './index.css';

const Hero = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 576;
  const isTablet = width > 576 && width <= 992;

  useEffect(() => {
    fadeUpDownOnScroll('.fade-up-down');
    gsap.fromTo('.hero-heading', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.highlight-name', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.hero-description', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power3.out' });
    gsap.fromTo('.hero-buttons', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 1.5, ease: 'power3.out' });
  }, []);

  return (
    <section className="hero-section" id="home" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Earth Scene */}
      <HeroEarthScene />

      <div className="container fade-up-down" style={{ position: 'relative', zIndex: 1, flexDirection: isMobile || isTablet ? 'column-reverse' : 'row' }}>
        <div className="hero-text" style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <h1 className="hero-heading">Let's Build Digital Excellence Together</h1>
          <h2 className="highlight-name fade-up-down">I'm <span className="name">Rishabh Tomar</span></h2>

          <h3 className="typing-text fade-up-down">
            <Typewriter
              options={{
                strings: ["Developer", "Creator", "Coder", "Problem Solver", "Innovator", "Thinker", "Builder", "Designer", "Engineer", "Explorer", "Tech Enthusiast", "Visionary", "Leader"],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                pauseFor: 1500,
              }}
            />
          </h3>

          <p className="hero-description fade-up-down">
            A Full-Stack Developer fueled by creativity and code. I specialize in the MERN stack, Python, SQL, HTML, and CSS, delivering intuitive, high-performance digital experiences that captivate users, solve real problems, and create measurable value.
          </p>

          <div className="hero-buttons fade-up-down" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <a href="#projects" className="btn primary-btn" aria-label="Navigate to Projects Section">Get Started</a>
            <a href="#about" className="btn secondary-btn" aria-label="Navigate to About Section">About Me</a>
          </div>
        </div>

        <div className="hero-image fade-up-down">
          <div className="image-wrapper" style={{ margin: isMobile ? 'auto' : '' }}>
            <div className="image-container">
              <img src="/Images/hero-image.jpg" className="transparent-image" alt="Rishabh Tomar Hero Section" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
