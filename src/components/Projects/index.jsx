import React, { useEffect } from 'react';
import './index.css';
import { fadeUpDownOnScroll } from '../../animations/animations'; // Import the animation function
import { FaExternalLinkAlt, FaCode } from 'react-icons/fa'; // Modern icons

const projects = [
  {
    title: 'Jobby App',
    description:
      'Jobby is a job search platform with user authentication, job filters, detailed job listings, and a responsive design, providing an intuitive and accessible experience across devices for job seekers.',
    technologies: ['React', 'JWT Auth', 'CSS', 'REST API','Loader'],
    link: 'https://jobbyrishabh.ccbp.tech',
  media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746998651/Screenshot_2025-05-12_024301_qccmwz.png', // Add actual thumbnail link
  },
  {
    title: 'Nxt Trendz',
    description:
      'An e-commerce application featuring user authentication, product filters, cart management, and protected routes, ensuring secure browsing, seamless shopping experience, and efficient management of products and user data.',
    technologies: ['React', 'Context API', 'Routing', 'REST API','Loader'],
    link: 'https://rishabhnxttrend.ccbp.tech',
  media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746998912/Screenshot_2025-05-12_025816_h7vswd.png', // Add actual thumbnail link
  },
  {
    title: 'GenAI ChatBot',
    description:
    'A conversational AI chatbot using OpenAI, LangChain, and Hugging Face, built with Gradio and deployed on Google Colab. It supports natural chat, custom prompts, and audio replies via PlayHT.',
    technologies: [
      'Google Colab',
      'OpenAI API',
      'LangChain',
      'Gradio',
      'PlayHT',
      'Hugging Face'
    ],
    link: 'https://yaaruaichatbox.ccbp.tech',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746787008/Screenshot_2025-05-09_160029_rguql4_c_fill_ar_1_1_g_auto_icz3t8.png', // Add actual thumbnail link
  },
  {
    title: 'Sticker Canvas App',
    description:
      'A creative sticker application built with React and Konva.js that lets users add, move, resize, and layer stickers on a canvas. Features include undo/redo, image upload, download, and an interactive onboarding tour for guidance.',
    technologies: ['React', 'Konva.js', 'use-image', 'CSS', 'Canvas', 'Tour UI'],
    link: 'https://my-sticker-app-3ae38.web.app/',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1749318142/Screenshot_2025-06-07_231149_om7duc.png', // Replace with actual screenshot if needed
  },  
  {
    title: 'Cryptocurrency Tracker',
    description:
      'A dynamic cryptocurrency tracker with live price updates, responsive UI, and real-time data fetched via API integration, offering users an engaging and up-to-date experience across devices.',
    technologies: ['React', 'API', 'CSS', 'Loader', 'Routing'],
    link: 'https://cryptorishabh.ccbp.tech',
  media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746998828/Screenshot_2025-05-12_025650_oqhcxt.png', // Add actual thumbnail link
  },
];

const Projects = () => {
  useEffect(() => {
    fadeUpDownOnScroll('.project-card'); // Apply animation to project cards
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <h2 className="projects-heading">PROJECTS</h2>
        <p className="projects-subheading">
          A selection of real-world apps I've built to sharpen my skills.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Project Link Icon */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-icon"
              title="View Project"
            >
              <FaExternalLinkAlt />
            </a>

            {/* Media Section (Image or Video) */}
            <div className="project-media">
              <img
                src={project.media}
                alt={project.title}
                className="project-media-content"
                onError={(e) => (e.target.style.display = 'none')} // Hide image if link fails
              />
              <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              title="View Project"
            >
              <div className="media-overlay"><p>Click to View</p></div>
            </a>
            </div>

            <div className="card-header">
              <h3 className="project-title">{project.title}</h3>
            </div>
            <p className="project-description">{project.description}</p>
            <ul className="project-technologies">
              {project.technologies.map((tech, techIndex) => (
                <li key={techIndex} className="technology-badge">
                  {tech}
                </li>
              ))}
            </ul>
            {/* Deep Seek Code Button */}
            <a
              href="https://github.com/RishabhTomar9"
              target="_blank"
              rel="noopener noreferrer"
              title="View Code"
            >
            <button class="cssbuttons-io">
              <span
                ><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                    fill="currentColor"
                  ></path>
                </svg>
                View Code
                </span>
            </button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;