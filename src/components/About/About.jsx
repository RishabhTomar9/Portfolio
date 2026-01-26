import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaUserAstronaut } from 'react-icons/fa';
import Button from '../Buttons/Buttons';

const cardData = [
  {
    id: 'who-i-am',
    icon: <FaUserAstronaut className="text-4xl text-purple-400 mb-4" />,
    title: 'The Architect',
    description:
      "I'm a passionate developer with expertise in React, JavaScript, and web development. I specialize in creating dynamic, high-performance applications that deliver exceptional user experiences.",
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    id: 'my-skills',
    icon: <FaCode className="text-4xl text-blue-400 mb-4" />,
    title: 'The Toolkit',
    description:
      'My stack includes React, HTML, CSS, Node.js, Express, MongoDB, and SQL. I build full-stack solutions that are innovative and scalable.',
    gradient: "from-blue-500/20 to-teal-500/20"
  },
  {
    id: 'what-i-do',
    icon: <FaLaptopCode className="text-4xl text-yellow-400 mb-4" />,
    title: 'The Mission',
    description:
      'I thrive on learning and staying updated with the latest trends to deliver cutting-edge digital products that solve real-world problems.',
    gradient: "from-yellow-500/20 to-red-500/20"
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden" aria-label="About Section">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-tech"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Unveiling the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Developer</span>
          </motion.h2>
          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Combining logic and creativity to build digital masterpieces.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cardData.map((card, index) => (
            <motion.article
              key={card.id}
              className="relative group p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="h-full bg-zinc-950/90 backdrop-blur-xl p-8 rounded-xl flex flex-col items-center text-center border border-white/5 group-hover:border-transparent transition-all">
                <div className={`p-4 rounded-full bg-gradient-to-br ${card.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/10`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Button />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
