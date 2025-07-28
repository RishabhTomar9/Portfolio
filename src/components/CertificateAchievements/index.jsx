import React, { useEffect } from 'react';
import { fadeUpDownOnScroll } from '../../animations/animations'; // Import the animation function
import './index.css';

const CertificateAchievements = () => {
  useEffect(() => {
    // Apply the fadeUpDownOnScroll animation to every element
    fadeUpDownOnScroll('.section-heading', 0.5);
    fadeUpDownOnScroll('.subheading', 0.4);
    fadeUpDownOnScroll('.certificate-card', 0.3);
    fadeUpDownOnScroll('.achievement-item', 0.3);
  }, []);

  const certificates = [
    {
      title: 'AWS Academy Cloud Foundations',
      description: 'Certified by AWS Academy for completing the AWS Academy Cloud Foundations course.',
      date: 'May 2025',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1748260666/Screenshot_2025-05-26_172133_lkg753.png', // You can add an image URL if available
      driveLink: 'https://www.jioaicloud.com/l/?u=kcIluVmkXp6xM12t7TueIeymDqgmg-Cx5hBpUFkejDE=doB',
    },
    {
      title: 'Node.js and Express.js',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Node.js and Express.js course.',
      date: 'April 2025',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746971296/Screenshot_2025-05-11_191751_ue4va1.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=hjbN1JPii5CCg61hiyDXwcoQr64YycyFyEYHxdvuiQ4=Oe5',
    },
    {
      title: 'Developer Foundations',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Developer Foundations for GIT, GITHUB and Command Line.',
      date: 'December 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746955411/Screenshot_2025-05-11_145258_dsmdoo.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=LgbHYxH-m9gdHagJK9ITE9UudsFF1jHcMWqn2iqs-Cg=VaU',
    },
    {
      title: 'Introduction to DataBases',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Introduction to DataBases in SQL.',
      date: 'September 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746954120/Screenshot_2025-05-11_143141_uoul4w.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=-b5ZP3QF616YeACnvyteOxqDRP5W6NHxfxgjy7FKES0=PuU',
    },
    {
      title: 'Programming Foundation with Python',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Programming Foundation with Python.',
      date: 'February 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746953656/Screenshot_2025-05-11_142347_e7e0nc.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=a-vfOZs5kAITTNbQiQVg41u09INcwT9XI4GEhGauyaA=Oe5',
    },
    {
      title: 'XPM 4.0',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Programming Foundation with Python.',
      date: 'January 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746996899/1746993018249_pc2kfr.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=nEH2FKBehkNfovuhMKF6uHC-kqDNNxoo3SV_YdBBoJ4=hkW',
    },
    {
      title: 'Build Your Own Responsive Website',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the BootStrap and Flexbox.',
      date: 'November 2023',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746953825/Screenshot_2025-05-11_142613_o10cku.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=mB4__GiFNzIxmyUzwX_AO5gww2GTGWiOPT4083p6HIA=jqE',
    },
  ];
  

  const achievements = [
    {
      title: 'Tech25 Gamified Internship Program',
      description: 'Successfully completed the Tech25 Gamified Internship conducted by GetInterned, recognized for dedication and performance.',
      date: 'July 2025',
      certificateUrl: 'https://www.jioaicloud.com/l/?u=q_R8VGzMuySsJNCf6VImTVNm8s4FcNRp8YRkCl07W7w=VaU', // Replace with actual URL if available
      certificateImage: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1752135319/Screenshot_2025-07-10_134341_ryfzi8.png' // Upload this certificate somewhere and add the URL
    },
    {
      title: 'Frontend Hackathon Winner',
      description: 'Won the Frontend Hackathon organized by the Student Council at Technocrats Institute of Technology, Bhopal. Event held on 21st June, 2025 and declared winner on 8th July, 2025.',
      date: 'July 2025',
      certificateUrl: 'https://getinterned.verification.url', // Replace with actual URL if available
      certificateImage: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1752135319/Screenshot_2025-07-_134341_ryfzi8.png' // Upload this certificate somewhere and add the URL
    },    
  ];
  
  // Add a new array for badges
  const badges = [
    {
      title: 'Google Cloud Skills Boost',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753703682/badgeskill_dv4tzr.jpg',
      link: 'https://developers.google.com/profile/u/rishabhtomar9/my-community/gca_agents',
    },
    {
      title: 'Firebase Studio Developer Community',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753700985/badge_1_e5tguo.svg',
      link: 'https://developers.google.com/profile/badges/community/firebasestudio/firebase-studio',
    },
    {
      title: 'Gemini Code Assist Agents',
      image: 'https://developers.google.com/static/profile/badges/community/sdlcagents/gca-agents/badge.svg',
      link: 'https://developers.google.com/ai/gemini-code-assist',
    },
    {
      title: 'AWS Academy',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1753702767/aws-academy-graduate-aws-academy-cloud-foundations_vrpczx.png',
      link: 'https://www.credly.com/badges/09927c28-2ec8-4cb4-88d9-ea0737eaa496/public_url',
    },
    {
      title: 'Google Cloud Innovators Member 2021',
      image: 'https://developers.google.com/static/profile/badges/community/innovators/cloud/2021_member/badge.svg',
      link: 'https://developers.google.com/profile/badges/community/innovators/cloud/2021_member',
    },
    // Add more badges as needed
  ];

  return (
    <section className="certificates-achievements" id="milestones">
      <h2 className="section-heading">Milestones</h2>

      <div className="certificates">
        <h3 className="subheading">Certificates</h3>
        <div className="certificates-grid">
          {certificates.map((certificate, index) => (
            <div key={index} className="certificate-card">
             <a
                href={certificate.driveLink} // Replace with the actual property holding the link
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="certificate-image"
                />
              </a>
              <div className="certificate-info">
                <p className="certificate-date">{certificate.date}</p>
                <h4 className="certificate-title">{certificate.title}</h4>
                {/* <p className="certificate-description">{certificate.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

            {/* Badges Section */}
            <div className="badges">
        <h3 className="subheading">Badges</h3>
        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div key={index} className="badge-card">
              <div className="badge-tooltip">{badge.title}</div>
              <a
                href={badge.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={badge.image}
                  alt={badge.title}
                  className="badge-image"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}

      <div className="achievements">
        <h3 className="subheading">Achievements</h3>
        <ul className="achievements-list">
          {achievements.map((achievement, index) => (
            <li key={index} className="achievement-item">
              {achievement.certificateUrl && (
                <a
                  href={achievement.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-link"
                >
                  <img
                    src={achievement.certificateImage}
                    alt={achievement.title}
                    className="certificate-image"
                  />
                </a>
              )}
              <h4 className="achievement-title">{achievement.title}</h4>
              <p className="achievement-description">{achievement.description}</p>
              <p className="achievement-date">{achievement.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CertificateAchievements;