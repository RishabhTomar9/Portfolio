import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaUserAstronaut } from 'react-icons/fa';
import Button from '../Buttons/Buttons';

const cardData = [
  {
    id: 'who-i-am',
    icon: <FaUserAstronaut />,
    title: 'The Architect',
    tag: 'STRATEGY',
    description: "I bridge the gap between complex data systems and intuitive user interfaces. My approach is centered on scalability and performance-first architecture.",
    gradient: "from-purple-500/20 to-blue-500/20",
    glow: "shadow-purple-500/20"
  },
  {
    id: 'my-skills',
    icon: <FaCode />,
    title: 'The Toolkit',
    tag: 'TECHNOLOGY',
    description: 'Expertise across the MERN stack, combined with Data Engineering mastery in Snowflake and PL/SQL. I build modern, data-driven solutions.',
    gradient: "from-blue-500/20 to-teal-500/20",
    glow: "shadow-blue-500/20"
  },
  {
    id: 'what-i-do',
    icon: <FaLaptopCode />,
    title: 'The Mission',
    tag: 'INNOVATION',
    description: 'Co-founding Zintrix Technologies to empower businesses with cutting-edge tech. I thrive on solving real-world challenges with elegant code.',
    gradient: "from-orange-500/20 to-red-500/20",
    glow: "shadow-orange-500/20"
  },
];

const About = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden" aria-label="About Section">
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Text Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-8 font-tech leading-none tracking-tighter">
                UNVEILING <br />
                <span className="text-gradient">THE CORE</span>
              </h2>

              <div className="space-y-6 text-zinc-400 text-lg font-light leading-relaxed">
                <p>
                  I am a <span className="text-white font-medium">Digital Architect</span> and
                  <span className="text-white font-medium"> Data Engineer</span> obsessed with building
                  the next generation of web experiences.
                </p>
                <p>
                  With a solid foundation in Data Engineering from{" "}
                  <span className="text-purple-400">HCLTech</span>
                  and entrepreneurial drive as Co-CTO of{" "}
                  <a
                    href="https://zintrixtechnologies.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    Zintrix Technologies
                  </a>,
                  I combine technical rigor with creative innovation.
                </p>
                <div className="h-px w-24 bg-gradient-to-r from-purple-500 to-transparent my-8"></div>
              </div>

              <div className="mt-12">
                <Button />
              </div>
            </motion.div>
          </div>

          {/* Right Cards Content */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cardData.map((card, index) => (
              <motion.article
                key={card.id}
                className={`group relative p-8 glass-card rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500 ${index === 0 ? 'sm:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`}></div>

                <div className="relative z-10">
                  <div className="text-4xl text-white mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">
                    {card.icon}
                  </div>

                  <div className="mb-4">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">{card.tag}</span>
                    <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-purple-300 transition-colors font-tech">{card.title}</h3>
                  </div>

                  <p className="text-zinc-400 leading-relaxed text-base group-hover:text-zinc-200 transition-colors">
                    {card.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default About;
