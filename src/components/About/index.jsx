import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { fadeUpDownOnScroll } from '../../animations/animations'; // Import the animation function
import { FaCode, FaLaptopCode, FaUserAlt } from 'react-icons/fa';
import Button from '../Buttons';
import './index.css';

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const cardData = [
  {
    id: 'who-i-am',
    icon: <FaUserAlt className="about-icon" />,
    title: 'Who I Am',
    description:
      "I'm a passionate developer with expertise in React, JavaScript, and web development. I specialize in creating dynamic, high-performance applications that deliver exceptional user experiences.",
  },
  {
    id: 'my-skills',
    icon: <FaCode className="about-icon" />,
    title: 'My Skills',
    description:
      'My stack includes React, HTML, CSS, Node.js, Express, MongoDB, and SQL. I build full-stack solutions that are innovative and scalable.',
  },
  {
    id: 'what-i-do',
    icon: <FaLaptopCode className="about-icon" />,
    title: 'What I Do',
    description:
      'I thrive on learning and staying updated with the latest trends to deliver cutting-edge digital products that solve real-world problems.',
  },
];

const About = () => {
  useEffect(() => {
    fadeUpDownOnScroll('.fade-up-down');  // Apply the fade-up-down effect to elements

    return () => {
      // Clean up ScrollTriggers when the component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="about-section" aria-label="About Section">
      <div className="about-container">
        <h2 className="about-title fade-up-down">ABOUT ME</h2>
        <p className="about-subtitle fade-up-down">
          Passionate developer crafting innovative and scalable digital solutions.
        </p>

        <div className="about-content fade-up-down">
          <div className="about-cards" role="group" aria-label="Developer Information Cards">
            {cardData.map((card) => (
              <article
                key={card.id}
                className="about-card fade-up-down"
                aria-labelledby={`card-title-${card.id}`}
              >
                {card.icon}
                <h3 id={`card-title-${card.id}`}>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <div className="about-cta fade-up-down">
            <Button />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
