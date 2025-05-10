import React, { useState, useEffect } from 'react';
import Scrollspy from 'react-scrollspy';
import { FaBars, FaTimes } from 'react-icons/fa';
import './index.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const header = document.querySelector('.header');
    header.classList.add('float-in');
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const scrollItems = ['home', 'about', 'skills', 'milestones', 'projects', 'contact'];

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Portfolio</h1>

        {/* Desktop Navigation */}
        <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
          <Scrollspy
            items={scrollItems}
            currentClassName="active"
            className="nav-links"
            offset={-120}
            onUpdate={(el) => {
              if (el) setActiveSection(el.id);
            }}
          >
            {scrollItems.map((item) => (
              <li key={item}>
                <a href={`#${item}`} className="nav-link" onClick={closeMenu}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <button
                className="contact-me"
                onClick={() =>
                  window.open('https://www.linkedin.com/in/rishabhtomar99/', '_blank')
                }
              >
                Connect Me
              </button>
            </li>
          </Scrollspy>
        </nav>

        {/* Active Tab Name + Hamburger */}
        <div className="menu-wrapper">
          <div className="active-tab-name">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Scrollspy
              items={scrollItems}
              currentClassName="active"
              className="nav-links"
              offset={-120}
              onUpdate={(el) => {
                if (el) setActiveSection(el.id);
              }}
            >
              {scrollItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="nav-link" onClick={closeMenu}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
              <li>
                <button
                  className="contact-me"
                  onClick={() =>
                    window.open('https://www.linkedin.com/in/rishabhtomar99/', '_blank')
                  }
                >
                  Connect Me
                </button>
              </li>
            </Scrollspy>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
