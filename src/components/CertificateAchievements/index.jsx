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
      title: 'Build Your Own Responsive Website',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the BootStrap and Flexbox.',
      date: 'November 2023',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746953825/Screenshot_2025-05-11_142613_o10cku.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=mB4__GiFNzIxmyUzwX_AO5gww2GTGWiOPT4083p6HIA=jqE',
    },
    {
      title: 'Programming Foundation with Python', 
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Programming Foundation with Python.',
      date: 'February 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746953656/Screenshot_2025-05-11_142347_e7e0nc.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=a-vfOZs5kAITTNbQiQVg41u09INcwT9XI4GEhGauyaA=Oe5',
    },
    {
      title: 'Introduction to DataBases',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Introduction to DataBases in SQL.',
      date: 'September 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746954120/Screenshot_2025-05-11_143141_uoul4w.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=-b5ZP3QF616YeACnvyteOxqDRP5W6NHxfxgjy7FKES0=PuU',
    },
    {
      title: 'Developer Foundations',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Developer Foundations for GIT, GITHUB and Command Line.',
      date: 'December 2024',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746955411/Screenshot_2025-05-11_145258_dsmdoo.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=LgbHYxH-m9gdHagJK9ITE9UudsFF1jHcMWqn2iqs-Cg=VaU',
    },
    {
      title: 'Node.js and Express.js',
      description: 'Certified by NXTWave CCBP 4.0 Academy for completing the Node.js and Express.js course.',
      date: 'April 2025',
      image: 'https://res.cloudinary.com/dvkzdok8c/image/upload/v1746971296/Screenshot_2025-05-11_191751_ue4va1.png',
      driveLink: 'https://www.jioaicloud.com/l/?u=hjbN1JPii5CCg61hiyDXwcoQr64YycyFyEYHxdvuiQ4=Oe5',
    },
  ];

  // const achievements = [
  //   {
  //     title: 'Hackathon Winner',
  //     description: 'Won 1st place in the 2025 Global Hackathon for building a productivity app.',
  //     date: 'April 2025',
  //   },
  //   {
  //     title: 'Open Source Contributor',
  //     description: 'Contributed to multiple open-source projects on GitHub.',
  //     date: 'February 2025',
  //   },
  //   {
  //     title: 'Top Performer Award',
  //     description: 'Recognized as a top performer in the XYZ Internship Program.',
  //     date: 'November 2024',
  //   },
  //   {
  //     title: 'Speaker at Tech Conference',
  //     description: 'Delivered a talk on React best practices at the 2025 Tech Summit.',
  //     date: 'March 2025',
  //   },
  //   {
  //     title: 'Published Technical Blog',
  //     description: 'Published a blog on advanced JavaScript concepts on Medium.',
  //     date: 'January 2025',
  //   },
  // ];

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

      {/* <div className="achievements">
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
      </div> */}
    </section>
  );
};

export default CertificateAchievements;