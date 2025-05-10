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
      title: 'React Developer Certification',
      description: 'Certified by XYZ Academy for completing the React Developer course.',
      date: 'March 2025',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746787008/Screenshot_2025-05-09_160029_rguql4_c_fill_ar_1_1_g_auto_icz3t8.png',
    },
    {
      title: 'JavaScript Mastery',
      description: 'Completed advanced JavaScript training from ABC Institute.',
      date: 'January 2025',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746787008/Screenshot_2025-05-09_160029_rguql4_c_fill_ar_1_1_g_auto_icz3t8.png',
    },
    {
      title: 'UI/UX Design Fundamentals',
      description: 'Awarded for completing the UI/UX design fundamentals course.',
      date: 'December 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746787008/Screenshot_2025-05-09_160029_rguql4_c_fill_ar_1_1_g_auto_icz3t8.png',
    },
    {
      title: 'Full-Stack Web Development',
      description: 'Completed a full-stack web development bootcamp from DEF Academy.',
      date: 'February 2025',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746787008/Screenshot_2025-05-09_160029_rguql4_c_fill_ar_1_1_g_auto_icz3t8.png',
    },
    {
      title: 'Cloud Computing Basics',
      description: 'Certified in cloud computing fundamentals by GHI Institute.',
      date: 'November 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746787008/Screenshot_2025-05-09_160029_rguql4_c_fill_ar_1_1_g_auto_icz3t8.png',
    },
  ];

  const achievements = [
    {
      title: 'Hackathon Winner',
      description: 'Won 1st place in the 2025 Global Hackathon for building a productivity app.',
      date: 'April 2025',
    },
    {
      title: 'Open Source Contributor',
      description: 'Contributed to multiple open-source projects on GitHub.',
      date: 'February 2025',
    },
    {
      title: 'Top Performer Award',
      description: 'Recognized as a top performer in the XYZ Internship Program.',
      date: 'November 2024',
    },
    {
      title: 'Speaker at Tech Conference',
      description: 'Delivered a talk on React best practices at the 2025 Tech Summit.',
      date: 'March 2025',
    },
    {
      title: 'Published Technical Blog',
      description: 'Published a blog on advanced JavaScript concepts on Medium.',
      date: 'January 2025',
    },
  ];

  return (
    <section className="certificates-achievements" id="milestones">
      <h2 className="section-heading">Milestones</h2>

      <div className="certificates">
        <h3 className="subheading">Certificates</h3>
        <div className="certificates-grid">
          {certificates.map((certificate, index) => (
            <div key={index} className="certificate-card">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="certificate-image"
              />
              <div className="certificate-info">
                <h4 className="certificate-title">{certificate.title}</h4>
                <p className="certificate-description">{certificate.description}</p>
                <p className="certificate-date">{certificate.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements">
        <h3 className="subheading">Achievements</h3>
        <ul className="achievements-list">
          {achievements.map((achievement, index) => (
            <li key={index} className="achievement-item">
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