import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaMedal, FaTrophy } from 'react-icons/fa';

const CertificateAchievements = () => {
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

  return (
    <section id="milestones" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-purple-500/10 text-purple-400"
          >
            <FaTrophy className="text-xl" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 font-tech"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Milestones & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">Glory</span>
          </motion.h2>
          <p className="text-zinc-400">A timeline of my growth and certifications.</p>
        </div>

        {/* Certificates Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-white">Certifications</h3>
            <div className="h-px flex-grow bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-zinc-900"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs text-purple-400 font-mono mb-1">{cert.date}</span>
                  <h4 className="text-white font-bold leading-tight group-hover:text-purple-300 transition-colors">{cert.title}</h4>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Badges Row */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-white">Badges</h3>
            <div className="h-px flex-grow bg-zinc-800"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {badges.map((badge, index) => (
              <motion.a
                key={index}
                href={badge.link}
                target="_blank"
                rel="noreferrer"
                className="relative group w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-4 rounded-full bg-zinc-900/50 border border-white/5 hover:border-blue-500/50 hover:bg-zinc-800/80 transition-all hover:-translate-y-2 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={badge.image} alt={badge.title} className="w-full h-full object-contain" />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black px-2 py-1 rounded">
                  {badge.title}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-white">Major Wins</h3>
            <div className="h-px flex-grow bg-zinc-800"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((ach, index) => (
              <motion.a
                key={index}
                href={ach.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-white/5 hover:border-yellow-500/30 transition-all group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden shrink-0">
                  <img src={ach.image} alt={ach.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaMedal className="text-yellow-500" />
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{ach.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{ach.title}</h4>
                  <p className="text-sm text-zinc-400">Click to view credential.</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CertificateAchievements;