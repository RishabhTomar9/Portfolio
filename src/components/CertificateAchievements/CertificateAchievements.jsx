import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaMedal, FaTrophy, FaExternalLinkAlt } from 'react-icons/fa';

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
    <section id="milestones" className="py-32 relative bg-[#050505] overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-purple-500" />
              <span className="text-xs font-bold text-purple-400 tracking-[0.4em] uppercase">Credentials</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white font-tech tracking-tighter uppercase leading-[0.8]">
              Verified
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500"> Milestones.</span>
            </h2>
          </motion.div>
          <div className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest hidden md:block">
            Status: Archive_Updated_2026<br />
            Auth: 2FA_Verified
          </div>
        </div>

        {/* 1. Certificates Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {certificates.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer block"
            >
              <div className="aspect-[4/3] overflow-hidden bg-zinc-950 relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />

                {/* Hover Overlay with Link Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                <div className="absolute top-4 right-4 bg-purple-500 p-2 rounded-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <FaExternalLinkAlt className="text-white text-xs" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] font-bold text-purple-500 uppercase tracking-tighter">
                    {cert.date}
                  </p>
                  {/* Subtle "Verify" text on hover */}
                  <span className="text-[8px] font-bold text-zinc-600 opacity-0 group-hover:opacity-100 uppercase transition-opacity">
                    Verify_ID
                  </span>
                </div>
                <h4 className="text-white font-bold leading-tight group-hover:text-purple-400 transition-colors">
                  {cert.title}
                </h4>
              </div>
            </motion.a>
          ))}
        </div>

        {/* 2. Badges Hex-Style Row */}
        <div className="mb-32">
          <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-[0.5em] mb-12 text-center underline decoration-zinc-800 underline-offset-8">
            Digital_Collectibles
          </h3>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {badges.map((badge, index) => (
              <motion.a
                key={index}
                href={badge.link}
                target="_blank"
                rel="noreferrer"
                className="group relative"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 relative z-10 flex items-center justify-center transition-all duration-500">
                  <img src={badge.image} alt={badge.title} className="w-full h-full object-contain" />
                </div>
                {/* Background Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold text-zinc-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all uppercase tracking-tighter">
                  {badge.title}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* 3. Major Wins (The "Trophy Room") */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-white font-tech uppercase flex items-center gap-4">
            <FaTrophy className="text-orange-500" />
            Major Wins
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((ach, idx) => (
              <motion.a
                key={idx}
                href={ach.image}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="p-8 bg-gradient-to-r from-zinc-900/80 to-transparent border-l-4 border-orange-500 rounded-r-2xl border-y border-white/5 flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-bold text-orange-400/60 uppercase tracking-widest">
                    {ach.date}
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-1 group-hover:text-orange-400 transition-colors tracking-tight">
                    {ach.title}
                  </h4>
                  {/* Note: I added 'Verified Achievement' here, but you could add an 'org' field to your achievements array if you want specific issuers */}
                  <p className="text-zinc-500 text-xs font-bold uppercase mt-2">
                    Status: Verified_Credential
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-700 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all">
                    <FaMedal className="text-xl" />
                  </div>
                  <FaExternalLinkAlt className="text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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