import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm('service_yx20o37', 'template_ferysey', form.current, 'XPeUDsKOZlXR6SmO1')
      .then((result) => {
        console.log(result.text);
        setStatus('success');
      }, (error) => {
        console.log(error.text);
        setStatus('error');
      });
    e.target.reset();
  };

  return (
    <footer className="relative bg-zinc-950 pt-20 pb-10 overflow-hidden text-white" id="contact">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16">

        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Collaborate</span></h2>
          <p className="text-zinc-400 mb-8 max-w-md text-lg">
            Have a project in mind or just want to chat? Feel free to drop me a message.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-purple-500/50 transition-colors">
                <FaEnvelope className="text-xl" />
              </div>
              <a href="mailto:rishabhtomar9999@gmail.com" className="text-lg">rishabhtomar9999@gmail.com</a>
            </div>

            <div className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
                <FaPhoneAlt className="text-xl" />
              </div>
              <a href="tel:+919981909017" className="text-lg">+91 9981909017</a>
            </div>

            <div className="flex items-center gap-4 text-zinc-300 group">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-yellow-500/50 transition-colors">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <span className="text-lg">Bhopal, India</span>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            {[
              { icon: <FaGithub />, link: "https://github.com/RishabhTomar9", color: "hover:text-white" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/rishabhtomar99/", color: "hover:text-blue-500" },
              { icon: <FaTwitter />, link: "https://x.com/Rishabh03tomar", color: "hover:text-blue-400" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/_._.rishabh_._/", color: "hover:text-pink-500" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:scale-110 ${social.color}`}
              >
                <span className="text-xl">{social.icon}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="bg-zinc-900/30 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${status === 'success'
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] active:scale-[0.98] text-white'
                }`}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
            </button>
            {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
          </form>
        </motion.div>
      </div>

      <div className="border-t border-zinc-800 mt-20 pt-8 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Rishabh Tomar. Crafted with <span className="text-red-500">❤</span> & Code.</p>
      </div>
    </footer>
  );
};

export default Footer;
