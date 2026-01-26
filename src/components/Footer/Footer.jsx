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
    <footer className="relative pt-32 pb-16 overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 items-start">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-8">
              Available // Contact
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-10 font-tech tracking-tighter leading-none">
              LET'S <br />
              <span className="text-gradient">CONNECT</span>
            </h2>

            <p className="text-zinc-400 mb-12 max-w-md text-lg font-light leading-relaxed">
              Open for collaborations, interesting projects, or just a coffee chat about the future of tech.
            </p>

            <div className="space-y-8 mb-12">
              {[
                { icon: <FaEnvelope />, label: "Email", value: "rishabhtomar9999@gmail.com", href: "mailto:rishabhtomar9999@gmail.com", color: "text-purple-400" },
                { icon: <FaPhoneAlt />, label: "Phone", value: "+91 9981909017", href: "tel:+919981909017", color: "text-blue-400" },
                { icon: <FaMapMarkerAlt />, label: "Location", value: "Bhopal, India", href: "#", color: "text-yellow-400" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-xl ${item.color} group-hover:scale-110 transition-transform shadow-2xl`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{item.label}</div>
                    <a href={item.href} className="text-xl font-bold text-white hover:text-purple-400 transition-colors font-tech tracking-tight">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {[
                { icon: <FaGithub />, link: "https://github.com/RishabhTomar9" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/rishabhtomar99/" },
                { icon: <FaTwitter />, link: "https://x.com/Rishabh03tomar" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/_._.rishabh_._/" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all shadow-xl"
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>

              <form ref={form} onSubmit={sendEmail} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Identity</label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="NAME_INIT"
                      className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all font-mono text-sm shadow-inner placeholder:text-zinc-800"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Contact</label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="EMAIL_ADDR"
                      className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono text-sm shadow-inner placeholder:text-zinc-800"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Transmission</label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    placeholder="MESSAGE_CONTENT..."
                    className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-yellow-500/50 transition-all font-mono text-sm shadow-inner resize-none placeholder:text-zinc-800"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 rounded-2xl font-black text-sm tracking-[0.3em] uppercase transition-all shadow-2xl flex items-center justify-center gap-4 ${status === 'success'
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-white text-black hover:bg-zinc-100'
                    }`}
                >
                  {status === 'sending' ? 'Sending_Transmission' : status === 'success' ? 'Transmission_Sent' : 'Execute_Send'}
                  <span className="text-xl">→</span>
                </motion.button>

                {status === 'error' && <p className="text-red-500 text-[10px] font-mono text-center uppercase tracking-widest">Error: Transmission_Failed</p>}
              </form>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 font-mono text-[10px] tracking-[0.2em] uppercase">
          <p>© {new Date().getFullYear()} Rishabh Tomar // all_rights_reserved</p>
          <div className="flex gap-8">
            <span>Deployed via Firebase</span>
            <span>Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
