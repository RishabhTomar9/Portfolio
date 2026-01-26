import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const projects = [
  {
    title: 'Nutrithy',
    description:
      'A health and wellness web app that delivers personalized meal plans, AI-powered diet insights, recipe discovery, and real-time cooking sessions — all within a sleek, responsive interface built with React and TailwindCSS.', technologies: ['React', 'TailwindCSS', 'Socket.io', 'Express.js', 'MongoDB', 'AI APIs', 'WebRTC', 'Firebase'],
    link: 'https://nutrithy.web.app/',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1761326841/Screenshot_2025-10-24_225700_pgohys.png', // Replace with actual screenshot URL
  },
  {
    title: 'WorkHub',
    description:
      'WorkHub is an attendance, worker, and payout management app designed to simplify workforce operations. It allows businesses to manage employee attendance, track tasks, handle payments, and monitor productivity — all from one intuitive dashboard.', technologies: ['React', 'Node.js', 'Firebase', 'MongoDB', 'Express.js'],
    link: 'https://workhub-three.vercel.app',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1761327423/Screenshot_2025-10-24_230633_ei7ngh.png', // Replace with actual screenshot URL
  },
  {
    title: 'MCP MegaWorkshop 2025',
    description:
      'An interactive Streamlit-based project from the MCP MegaWorkshop 2025, integrating YouTube, Google Drive, and Notion APIs via Pipedream for rich media and content workflows.',
    technologies: [
      'Streamlit',
      'Python',
      'Pipedream',
      'YouTube API',
      'Google Drive API',
      'Notion API',
    ],
    link: 'https://mcp-megaworkshop-2025.streamlit.app/',
    media:
      'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753452324/Screenshot_2025-07-25_193459_yqhwol.png',
  },
  {
    title: 'Jobby App',
    description:
      'Jobby is a job search platform with user authentication, job filters, detailed job listings, and a responsive design, providing an intuitive and accessible experience across devices for job seekers.',
    technologies: ['React', 'JWT Auth', 'CSS', 'REST API', 'Loader'],
    link: 'https://jobbyrishabh.ccbp.tech',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746998651/Screenshot_2025-05-12_024301_qccmwz.png', // Add actual thumbnail link
  },
  {
    title: 'Nxt Trendz',
    description:
      'An e-commerce application featuring user authentication, product filters, cart management, and protected routes, ensuring secure browsing, seamless shopping experience, and efficient management of products and user data.',
    technologies: ['React', 'Context API', 'Routing', 'REST API', 'Loader'],
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
    title: 'Sticker Canvas',
    description:
      'A creative sticker application built with React and Konva.js that lets users add, move, resize, and layer stickers on a canvas. Features include undo/redo, image upload, download, and an interactive onboarding tour for guidance.',
    technologies: ['React', 'Konva.js', 'use-image', 'CSS', 'Canvas', 'Tour UI'],
    link: 'https://my-sticker-app-3ae38.web.app/',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1749321289/Screenshot_2025-06-08_000425_l7f0te.png', // Replace with actual screenshot if needed
  },
  {
    title: 'GrowthPro AI',
    description:
      'SEO headline generator that helps marketers. Built with MERN stack and OpenAI.',
    technologies: ['MERN', 'OpenAI', 'MongoDB'],
    link: 'https://growthproai-1.onrender.com/',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753444052/Screenshot_2025-07-25_171633_zrrj0r.png', // Replace with actual image if available
  },
  {
    title: 'MCP MegaWorkshop 2025',
    description:
      'An interactive Streamlit‑based project from the MCP MegaWorkshop 2025, integrating YouTube, Google Drive, and Notion APIs via Pipedream for rich media and content workflows.',
    technologies: ['Streamlit', 'Python', 'Pipedream', 'YouTube API', 'Google Drive API', 'Notion API'],
    link: 'https://mcp-megaworkshop-2025.streamlit.app/',
    media:
      'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753444052/Screenshot_2025-07-25_171633_zrrj0r.png',
  },
  {
    title: 'Crypto Tracker',
    description:
      'Dynamic cryptocurrency tracker with live price updates and real-time data integration.',
    technologies: ['React', 'API', 'Chart.js'],
    link: 'https://cryptorishabh.ccbp.tech',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746998828/Screenshot_2025-05-12_025650_oqhcxt.png', // Add actual thumbnail link
  },
];


const ProjectCard = ({ project }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="group relative rounded-[2rem] glass-card border border-white/5 overflow-hidden transition-all duration-700 hover:border-white/20"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full flex flex-col p-4">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-950 border border-white/5">
          <img
            src={project.media}
            alt={project.title}
            className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 transition-all duration-1000 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-[4px]">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-zinc-100 transition-colors"
              title="Live Demo"
            >
              <FaExternalLinkAlt className="text-xl" />
            </motion.a>
            <motion.a
              href="https://github.com/RishabhTomar9"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-zinc-900 text-white border border-white/10 rounded-full flex items-center justify-center shadow-2xl hover:bg-zinc-800 transition-colors"
              title="View Code"
            >
              <FaCode className="text-xl" />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black text-white font-tech tracking-tight group-hover:text-purple-400 transition-colors duration-500">
              {project.title}
            </h3>
          </div>

          <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-light line-clamp-3 group-hover:text-zinc-300 transition-colors">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={i} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-500 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-600">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4"
          >
            Showcase // Work
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-8 font-tech tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            FEATURED <span className="text-gradient">WORKS</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <a
            href="https://github.com/RishabhTomar9"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 text-zinc-500 hover:text-white transition-colors group font-mono text-sm tracking-widest"
          >
            VIEW_ARCHIVE_GITHUB
            <span className="w-12 h-px bg-zinc-800 group-hover:w-20 group-hover:bg-white transition-all"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};


export default Projects;