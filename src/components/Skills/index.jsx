import React, { useEffect, useRef, useState } from 'react';
import './index.css';

import { fadeUpDownOnScroll } from '../../animations/animations';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaPencilRuler,
} from 'react-icons/fa';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);

  const technicalSkills = [
    { name: 'React', level: 90, icon: <FaReact className="skill-icon react" /> },
    { name: 'JavaScript', level: 85, icon: <FaJs className="skill-icon javascript" /> },
    { name: 'Node.js', level: 80, icon: <FaNodeJs className="skill-icon nodejs" /> },
    { name: 'HTML', level: 95, icon: <FaHtml5 className="skill-icon html" /> },
    { name: 'CSS', level: 95, icon: <FaCss3Alt className="skill-icon css" /> },
    { name: 'Python', level: 90, icon: <FaPython className="skill-icon python" /> },
    { name: 'MongoDB', level: 75, icon: <FaDatabase className="skill-icon mongodb" /> },
    { name: 'SQL', level: 80, icon: <FaDatabase className="skill-icon sql" /> },
    { name: 'Git', level: 85, icon: <FaGitAlt className="skill-icon git" /> },
    { name: 'Design', level: 70, icon: <FaPencilRuler className="skill-icon design" /> },
  ];

  const softSkills = [
    { name: 'Teamwork', emoji: '🤝' },
    { name: 'Leadership', emoji: '👨‍💼' },
    { name: 'Problem Solving', emoji: '🧠' },
    { name: 'Creativity', emoji: '🎨' },
    { name: 'Time Management', emoji: '⏱' },
    { name: 'Goal-Oriented', emoji: '🎯' },
    { name: 'Communication', emoji: '💬' },
    { name: 'Adaptability', emoji: '🔄' },
    { name: 'Critical Thinking', emoji: '🧩' },
    { name: 'Emotional Intelligence', emoji: '❤️' },
    { name: 'Collaboration', emoji: '👥' },
    { name: 'Decision Making', emoji: '🧭' },
    { name: 'Self-Motivation', emoji: '🚀' },
    { name: 'Flexibility', emoji: '🌈' },
    { name: 'Initiative', emoji: '⚡' },
    { name: 'Accountability', emoji: '🧾' },
    { name: 'Resilience', emoji: '🛡️' },
  ];

  useEffect(() => {
    fadeUpDownOnScroll('.skill-card');
    fadeUpDownOnScroll('.soft-skill-card');

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="skills-section" ref={skillsRef}>
      <h2 className="skills-heading">MY SKILLS</h2>
      <p className="skills-subheading">
        A blend of technical power for full-stack impact.
      </p>

      {/* Technical Skills */}
      <div className="skills-container">
        {technicalSkills.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-info">
              {skill.icon}
              <h3 className="skill-name">{skill.name}</h3>
            </div>
            <div className="animated-counter">
              <span className="skill-percentage">
                {isVisible ? (
                  <AnimatedCounter endValue={skill.level} duration={2000} />
                ) : (
                  '0%'
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills */}
      <h2 className="soft-skills-heading">Soft Skills</h2>
      <p className="skills-subheading">
        Personal qualities that empower my technical journey.
      </p>
      <div className="soft-skills-container">
        {softSkills.map((skill, index) => (
          <div key={index} className="soft-skill-card">
            <span className="soft-skill-emoji">{skill.emoji}</span>
            <h3 className="skill-name">{skill.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

const AnimatedCounter = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const currentCount = Math.floor(endValue * percentage);

      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return `${count}%`;
};

export default Skills;
