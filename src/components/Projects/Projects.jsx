import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const projects = [
  {
    title: 'Nutrithy',
    description:
    'A health and wellness web app that delivers personalized meal plans, AI-powered diet insights, recipe discovery, and real-time cooking sessions — all within a sleek, responsive interface built with React and TailwindCSS.',    technologies: ['React', 'TailwindCSS', 'Socket.io', 'Express.js', 'MongoDB', 'AI APIs', 'WebRTC', 'Firebase'],
    link: 'https://nutrithy.web.app/',
    media: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1761326841/Screenshot_2025-10-24_225700_pgohys.png', // Replace with actual screenshot URL
  },
  {
    title: 'WorkHub',
    description:
    'WorkHub is an attendance, worker, and payout management app designed to simplify workforce operations. It allows businesses to manage employee attendance, track tasks, handle payments, and monitor productivity — all from one intuitive dashboard.',    technologies: ['React', 'Node.js', 'Firebase', 'MongoDB', 'Express.js'],
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
      className="group relative rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Border Follower */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-zinc-950">
          <img
            src={project.media}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              title="Live Demo"
            >
              <FaExternalLinkAlt />
            </motion.a>
            <motion.a
              href="https://github.com/RishabhTomar9"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-zinc-800 text-white border border-zinc-600 rounded-full hover:bg-zinc-700"
              title="View Code"
            >
              <FaCode />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow bg-zinc-900/40 relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 font-tech">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/5 text-zinc-300 group-hover:border-purple-500/30 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 font-tech"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Projects</span>
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-yellow-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;