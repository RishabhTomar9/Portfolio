import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { fadeUpDownOnScroll } from '../../animations/animations';
import Typewriter from 'typewriter-effect';
import useWindowSize from '../../hooks/useWindowSize';
import './index.css';

const Hero = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 576;
  const isTablet = width > 576 && width <= 992;

  useEffect(() => {
    fadeUpDownOnScroll('.fade-up-down');
    
    // Enhanced animations with staggered timing
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-heading', 
      { opacity: 0, y: 50, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo('.highlight-name', 
      { opacity: 0, x: -50, scale: 0.95 }, 
      { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }, 
      '-=0.3'
    )
    .fromTo('.typing-text', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
      '-=0.2'
    )
    .fromTo('.hero-description', 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 
      '-=0.1'
    )
    .fromTo('.hero-buttons', 
      { opacity: 0, scale: 0.8, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }, 
      '-=0.3'
    )
    .fromTo('.hero-image', 
      { opacity: 0, x: 50, scale: 0.9 }, 
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, 
      '-=1'
    );

    // Add floating animation to the image
    gsap.to('.transparent-image', {
      y: -10,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    });

  }, []);

  return (
    <section className="hero-section" id="home" style={{ position: 'relative', overflow: 'hidden' }}>
      
             {/* Background Tech Elements */}
       <div className="hero-bg-elements">
         <div className="tech-circle tech-circle-1"></div>
         <div className="tech-circle tech-circle-2"></div>
         <div className="tech-circle tech-circle-3"></div>
         <div className="tech-grid"></div>
       </div>

      <div className="container fade-up-down" style={{ position: 'relative', zIndex: 1, flexDirection: isMobile || isTablet ? 'column-reverse' : 'row' }}>
        <div className="hero-text" style={{ textAlign: isMobile ? 'center' : 'left' }}>
          
          <h1 className="hero-heading">
            Crafting Digital 
            <span className="gradient-text"> Excellence</span>
          </h1>
          
          <h2 className="highlight-name fade-up-down">
            I'm <span className="name">Rishabh Tomar</span>
          </h2>

          <h3 className="typing-text fade-up-down">
            <Typewriter
              options={{
                strings: [
                  "Full-Stack Developer",
                  "MERN Stack Expert", 
                  "Problem Solver",
                  "UI/UX Designer",
                  "Tech Innovator",
                  "Code Architect",
                  "Digital Creator",
                  "Software Engineer"
                ],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 60,
                pauseFor: 2000,
                cursor: '|',
                cursorClassName: 'typing-cursor'
              }}
            />
          </h3>

          <p className="hero-description fade-up-down">
            Transforming ideas into powerful digital solutions with expertise in React, Node.js, MongoDB, and modern web technologies. I build scalable applications that deliver exceptional user experiences and drive business growth.
          </p>

          {/* Tech Stack Preview */}
          <div className="tech-stack-preview fade-up-down">
            <span className="tech-item">React</span>
            <span className="tech-item">Node.js</span>
            <span className="tech-item">MongoDB</span>
            <span className="tech-item">Python</span>
            <span className="tech-item">SQL</span>
          </div>

          <div className="hero-buttons fade-up-down" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <a href="#projects" className="btn primary-btn" aria-label="Navigate to Projects Section">
              <span className="btn-text">View Projects</span>
              <span className="btn-icon">→</span>
            </a>
            <a href="#about" className="btn secondary-btn" aria-label="Navigate to About Section">
              <span className="btn-text">About Me</span>
              <span className="btn-icon">👨‍💻</span>
            </a>
          </div>

          {/* Stats */}
          {/* <div className="hero-stats fade-up-down">
            <div className="stat">
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div> */}
        </div>

        <div className="hero-image fade-up-down">
          <div className="image-wrapper" style={{ margin: isMobile ? 'auto' : '' }}>
            <div className="image-container">
              <div className="image-frame">
                <img src="/Images/hero-image.jpg" className="transparent-image" alt="Rishabh Tomar - Full Stack Developer" />
                <div className="image-overlay"></div>
              </div>
                             {/* Floating elements around image */}
               <div className="floating-element fe-1">⚡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;