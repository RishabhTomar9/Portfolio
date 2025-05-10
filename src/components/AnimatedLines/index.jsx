// components/AnimatedLines.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './index.css';

const AnimatedLines = () => {
  const linesRef = useRef([]);

  useEffect(() => {
    linesRef.current.forEach((line) => {
      const randomX = gsap.utils.random(-50, window.innerWidth + 50); // Randomize X position beyond viewport
      const randomY = gsap.utils.random(window.innerHeight, window.innerHeight * 2); // Randomize Y end position
      const randomDuration = gsap.utils.random(3, 20); // Wider range for duration
      const randomDelay = gsap.utils.random(0, 10); // Wider range for delay
      const randomOpacity = gsap.utils.random(0.2, 0.8); // More variation in opacity
      const randomScaleY = gsap.utils.random(0.3, 2); // More variation in scale

      gsap.fromTo(
        line,
        {
          x: randomX,
          y: -100,
          opacity: randomOpacity,
          scaleY: randomScaleY,
        },
        {
          y: randomY,
          opacity: 0,
          duration: randomDuration,
          delay: randomDelay,
          ease: 'power2.inOut', // Smoother easing
          repeat: -1,
        }
      );
    });
  }, []);

  return (
    <div className="lines-global-wrapper">
      {[...Array(300)].map((_, index) => ( // Increased number of lines for a denser effect
        <div
          key={index}
          className="line"
          ref={(el) => (linesRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default AnimatedLines;
