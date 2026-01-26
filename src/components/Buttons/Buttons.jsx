import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const Button = ({
  href = "https://drive.google.com/file/d/1jbqOROtleFOd6Qi-ASxT1arK_rqWliSL/view?usp=sharing",
  children = "Download CV",
  className = "",
  variant = "primary", // primary, ghost
  ...props
}) => {
  const isPrimary = variant === 'primary';
  const isExternal = href.startsWith('http');

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-3 px-10 py-4 
        font-bold rounded-xl overflow-hidden transition-all duration-300
        ${isPrimary
          ? 'bg-white text-black hover:bg-zinc-100'
          : 'bg-zinc-950 text-white border border-white/10 hover:border-white/20'}
        ${className}
      `}
      {...props}
    >
      {/* Background Gradient Animation */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none`} />

      {/* Border Glow for Primary */}
      {isPrimary && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-white/50 group-hover:ring-purple-500/50 transition-all duration-500" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3 tracking-wide">
        {children === "Download CV" && (
          <FaDownload className="text-lg group-hover:-translate-y-0.5 group-hover:text-purple-600 transition-all duration-300" />
        )}
        <span className={isPrimary ? 'group-hover:text-purple-700 transition-colors' : ''}>
          {children}
        </span>
      </span>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-purple-500 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500 h-[2px]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-500 h-[2px]" />
    </motion.a>
  );
};

export default Button;
