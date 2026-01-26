import React from 'react';
import { FaDownload } from 'react-icons/fa';

const Button = () => {
  return (
    <a
      href="https://drive.google.com/file/d/1jbqOROtleFOd6Qi-ASxT1arK_rqWliSL/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-blue-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
      <FaDownload className="text-lg group-hover:translate-y-1 transition-transform" />
      <span className="relative">Download CV</span>
    </a>
  );
};

export default Button;