import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaMedal, FaTrophy } from 'react-icons/fa';

const certificates = [
  { title: 'AWS Academy Cloud Foundations', date: 'May 2025', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1748260666/Screenshot_2025-05-26_172133_lkg753.png', link: 'https://www.jioaicloud.com/l/?u=kcIluVmkXp6xM12t7TueIeymDqgmg-Cx5hBpUFkejDE=doB' },
  { title: 'Node.js and Express.js', date: 'April 2025', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746971296/Screenshot_2025-05-11_191751_ue4va1.png', link: 'https://www.jioaicloud.com/l/?u=hjbN1JPii5CCg61hiyDXwcoQr64YycyFyEYHxdvuiQ4=Oe5' },
  { title: 'Developer Foundations', date: 'Dec 2024', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746955411/Screenshot_2025-05-11_145258_dsmdoo.png', link: 'https://www.jioaicloud.com/l/?u=LgbHYxH-m9gdHagJK9ITE9UudsFF1jHcMWqn2iqs-Cg=VaU' },
  { title: 'Introduction to DataBases', date: 'Sept 2024', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746954120/Screenshot_2025-05-11_143141_uoul4w.png', link: 'https://www.jioaicloud.com/l/?u=-b5ZP3QF616YeACnvyteOxqDRP5W6NHxfxgjy7FKES0=PuU' },
  { title: 'Programming with Python', date: 'Feb 2024', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746953656/Screenshot_2025-05-11_142347_e7e0nc.png', link: 'https://www.jioaicloud.com/l/?u=a-vfOZs5kAITTNbQiQVg41u09INcwT9XI4GEhGauyaA=Oe5' },
  { title: 'XPM 4.0', date: 'Jan 2024', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746996899/1746993018249_pc2kfr.png', link: 'https://www.jioaicloud.com/l/?u=nEH2FKBehkNfovuhMKF6uHC-kqDNNxoo3SV_YdBBoJ4=hkW' },
  { title: 'Build Responsive Website', date: 'Nov 2023', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746953825/Screenshot_2025-05-11_142613_o10cku.png', link: 'https://www.jioaicloud.com/l/?u=mB4__GiFNzIxmyUzwX_AO5gww2GTGWiOPT4083p6HIA=jqE' },
];

const badges = [
  { title: 'Google Cloud Skills Boost', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753703682/badgeskill_dv4tzr.jpg', link: 'https://developers.google.com/profile/u/rishabhtomar9/my-community/gca_agents' },
  { title: 'Firebase Studio Community', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753700985/badge_1_e5tguo.svg', link: 'https://developers.google.com/profile/badges/community/firebasestudio/firebase-studio' },
  { title: 'Gemini Code Assist Agents', image: 'https://developers.google.com/static/profile/badges/community/sdlcagents/gca-agents/badge.svg', link: 'https://developers.google.com/ai/gemini-code-assist' },
  { title: 'AWS Academy', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753702767/aws-academy-graduate-aws-academy-cloud-foundations_vrpczx.png', link: 'https://www.credly.com/badges/09927c28-2ec8-4cb4-88d9-ea0737eaa496/public_url' },
  { title: 'Google Cloud Innovators', image: 'https://developers.google.com/static/profile/badges/community/innovators/cloud/2021_member/badge.svg', link: 'https://developers.google.com/profile/badges/community/innovators/cloud/2021_member' },
];

const achievements = [
  { title: 'Tech25 Gamified Internship', date: 'July 2025', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1752135319/Screenshot_2025-07-10_134341_ryfzi8.png', link: 'https://www.jioaicloud.com/l/?u=q_R8VGzMuySsJNCf6VImTVNm8s4FcNRp8YRkCl07W7w=VaU' },
  { title: 'Frontend Hackathon Winner', date: 'July 2025', image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1754231732/IMG20250803195609_k1yyfy.jpg', link: 'https://www.jioaicloud.com/l/?u=9Y7o5guuwrH62va1a6O44UvQPbourQFr0cf_UfCBvqU=MZA' },
];

const CertificateAchievements = () => {
  return (
    <section id="milestones" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4"
          >
            Proof // Excellence
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-4 font-tech tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            MILESTONES <span className="text-gradient">ACHIEVED</span>
          </motion.h2>
        </div>

        {/* Certificates Section */}
        <div className="mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.image}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <img src={cert.image} alt={cert.title} className="w-full h-full object-contain transition-all duration-700 opacity-40 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] text-purple-400 font-mono mb-2 tracking-widest uppercase">{cert.date}</span>
                  <h4 className="text-lg font-bold text-white leading-tight group-hover:text-purple-300 transition-colors font-tech">{cert.title}</h4>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Badges Column */}
          <div className="lg:col-span-12">
            <h3 className="text-3xl font-black text-white mb-12 font-tech tracking-tight flex items-center gap-4">
              BADGES <span className="h-px flex-grow bg-gradient-to-r from-zinc-800 to-transparent"></span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {badges.map((badge, index) => (
                <motion.a
                  key={index}
                  href={badge.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-6 rounded-full bg-zinc-950 border border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-500 shadow-2xl">
                    <img src={badge.image} alt={badge.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-x-0 -bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-blue-500 text-[8px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-tighter">Verified</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] text-center max-w-[120px] group-hover:text-zinc-300 transition-colors">
                    {badge.title}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Major Wins Column */}
          <div className="lg:col-span-12 mt-12">
            <h3 className="text-3xl font-black text-white mb-12 font-tech tracking-tight flex items-center gap-4">
              MAJOR WINS <span className="h-px flex-grow bg-gradient-to-r from-orange-800 to-transparent"></span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((ach, index) => (
                <motion.a
                  key={index}
                  href={ach.image}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col sm:flex-row gap-8 p-8 glass-card rounded-[2rem] border border-white/5 hover:border-orange-500/20 transition-all group overflow-hidden"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="w-full sm:w-56 aspect-video rounded-2xl overflow-hidden shrink-0 bg-zinc-950 border border-white/5">
                    <img src={ach.image} alt={ach.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <FaTrophy className="text-orange-500 text-lg" />
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{ach.date}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors font-tech leading-tight">{ach.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono tracking-tighter group-hover:text-zinc-400 transition-colors">
                      {'>'} CLICK_TO_AUTHENTICATE
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default CertificateAchievements;