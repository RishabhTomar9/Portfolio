import { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { fadeUpDownOnScroll } from '../../animations/animations';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import './index.css';

const Footer = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    fadeUpDownOnScroll('.footer__heading', 0.5);
    fadeUpDownOnScroll('.footer__section', 0.2);
    fadeUpDownOnScroll('.footer__contact-container', 0.3);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailError(validateEmail(email) ? '' : 'Please enter a valid email address');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = form.current.user_email.value;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    emailjs
      .sendForm(
        'service_yx20o37',
        'template_ferysey',
        form.current,
        'XPeUDsKOZlXR6SmO1'
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setSubmitMessage('Message sent successfully!');
          form.current.reset();
          setEmailError('');
        },
        (error) => {
          console.error('FAILED...', error.text);
          setSubmitMessage(`Failed to send message: ${error.text}`);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <footer className="footer">
      <div className="footer__content-header">
        <h1 className="footer__heading">Contact Me</h1>
      </div>

      <div className="footer__section">
        <section id="contact" className="footer__contact-section">
          <div className="footer__contact-container">
            <h2 className="footer__contact-heading">Get in Touch</h2>
            <form ref={form} onSubmit={handleSubmit} className="footer__form" noValidate>
              <div className="footer__input-wrapper">
                <div className="input">
                  <input required autoComplete="off" type="text" name="user_name" id="user_name" placeholder="Name" />
                  <label htmlFor="user_name">Name</label>
                </div>
              </div>

              <div className="footer__input-wrapper">
                <div className="input">
                  <input
                    required autoComplete="off"
                    name="user_email"
                    type="email"
                    id="user_email"
                    className={`footer__form-input ${emailError ? 'footer__input-error' : ''}`}
                    onChange={handleEmailChange}
                    placeholder="E-mail"
                  />
                  <label htmlFor="user_email">E-mail</label>
                </div>
              </div>

              {emailError && <p className="footer__error-message">{emailError}</p>}

              <div className="footer__input-wrapper">
                <div className="input">
                  <textarea required cols="30" rows="1" name="message" id="message" placeholder="Message"></textarea>
                  <label htmlFor="message">Message</label>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="footer__submit-button">
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>

              {submitMessage && (
                <p className={`footer__submit-message ${submitMessage.includes('successfully') ? 'footer__success' : 'footer__error'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="footer__info" aria-labelledby="footer__contact">
          <div className="footer__card">
            <h3 id="footer__contact" className="footer__info-heading">Let’s Connect</h3>

            <div className="footer__avatar-container">
              <img src="/Images/hero-image.jpg" alt="Rishabh Avatar" className="footer__avatar" />
            </div>

            <ul className="footer__contact-list">
              <li><FaEnvelope /> <a href="mailto:rishabhtomar9999@gmail.com">rishabhtomar9999@gmail.com</a></li>
              <li><FaPhoneAlt /> <a href="tel:+919981909017">+91 9981909017</a></li>
              <li><FaMapMarkerAlt /> <span>Bhopal, India</span></li>
            </ul>

            <div className="footer__social-links">
              <a href="https://github.com/RishabhTomar9" className="footer__icon footer__icon--github" aria-label="GitHub"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/rishabhtomar99/" className="footer__icon footer__icon--linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://x.com/Rishabh03tomar" className="footer__icon footer__icon--twitter" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://www.instagram.com/_._.rishabh_._/" className="footer__icon footer__icon--instagram" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Add your license here at the very bottom */}
      <div className="footer__copyright">
        <p>© 2025 Rishabh Tomar. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
