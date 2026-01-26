import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import Button from '../Buttons/Buttons';

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
      className="group relative rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden transition-all duration-700 hover:border-white/20 hover:-translate-y-2"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
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
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-500 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative bg-[#050505] overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-purple-500" />
              <span className="text-xs font-mono text-purple-400 tracking-[0.4em] uppercase">Showcase</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white font-tech tracking-tighter uppercase leading-[0.8]">
              Featured 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500"> Works.</span>
            </h2>
          </motion.div>

          <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest hidden md:block text-right">
            Selection: Top_tier<br />
            Status: Deployed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center flex justify-center"
        >
          <Button
            href="https://github.com/RishabhTomar9"
            variant="ghost"
            className="!px-10 !py-5 uppercase tracking-widest text-xs"
          >
            Access_Full_Archive
          </Button>
        </motion.div>
      </div>
    </section>
  );
};


export default Projects;