import React, { useRef, useState } from 'react';
// import emailjs from 'emailjs-com'; // Removed as per request
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaTwitter, FaInstagram,
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa';

const Footer = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    if (!db) {
      console.error("FIREBASE ERROR: Database instance undefined.");
      setStatus('error');
      return;
    }

    const formData = new FormData(form.current);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const messageContent = formData.get('message');

    const emailData = {
      to: 'rishabhtomar9999@gmail.com',
      message: {
        subject: `Portfolio Inquiry from ${name}`,
        html: `
          <div style="font-family: monospace; padding: 20px; background: #f4f4f5; border-radius: 8px;">
            <h2 style="color: #6366f1;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: 1px solid #e4e4e7;" />
            <p style="white-space: pre-wrap;">${messageContent}</p>
          </div>
        `,
      },
      name: name,
      email: email,
      content: messageContent,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "mail"), emailData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
      form.current.reset();
    } catch (error) {
      console.error("FIREBASE ERROR:", error);
      setStatus('error');
    }
  };

  const contactItems = [
    { icon: <FaEnvelope />, label: "Protocol", value: "Email", detail: "rishabhtomar9999@gmail.com", href: "mailto:rishabhtomar9999@gmail.com", color: "purple" },
    { icon: <FaPhoneAlt />, label: "Direct", value: "Phone", detail: "+91 9981909017", href: "tel:+919981909017", color: "blue" },
    { icon: <FaMapMarkerAlt />, label: "Origin", value: "Location", detail: "Bhopal, India", href: "#", color: "yellow" }
  ];

  return (
    <footer className="relative pt-32 pb-12 bg-[#050505] overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Side: Contact Branding */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-purple-500" />
                <span className="text-xs font-mono text-purple-400 tracking-[0.4em] uppercase">Communication</span>
              </div>

              <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase text-white leading-[0.8]">
                Get In <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                  Touch.
                </span>
              </h2>

              <p className="text-zinc-500 text-lg mb-12 max-w-sm leading-relaxed">
                Have a vision? Let's build it. I'm currently looking for new opportunities and high-impact collaborations.
              </p>

              <div className="space-y-6">
                {contactItems.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-lg transition-all duration-300 group-hover:border-${item.color}-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-purple-400 transition-colors">{item.detail}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: High-Tech Form */}
          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              {/* Outer Glow Decor */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl">
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase ml-2">Name</label>
                      <input
                        type="text" name="user_name" required placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-zinc-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase ml-2">Email Address</label>
                      <input
                        type="email" name="user_email" required placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase ml-2">Message</label>
                    <textarea
                      name="message" rows="4" required placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none placeholder:text-zinc-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className={`relative w-full overflow-hidden group py-5 rounded-xl font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 ${status === 'success' ? 'bg-green-500 text-white' : 'bg-white text-black'
                      }`}
                  >
                    <AnimatePresence mode="wait">
                      {status === 'idle' && (
                        <motion.div key="idle" className="flex items-center gap-2">
                          Execute Send <FaPaperPlane className="text-[10px]" />
                        </motion.div>
                      )}
                      {status === 'sending' && (
                        <motion.div key="sending" className="animate-pulse">Encrypting...</motion.div>
                      )}
                      {status === 'success' && (
                        <motion.div key="success" className="flex items-center gap-2">
                          Message Sent <FaCheckCircle />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            {[
              { icon: <FaGithub />, link: "https://github.com/RishabhTomar9" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/rishabhtomar99/" },
              { icon: <FaTwitter />, link: "https://x.com/Rishabh03tomar" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/_._.rishabh_._/" }
            ].map((social, idx) => (
              <a
                key={idx} href={social.link} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 transition-all hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.3em] flex flex-col md:items-end gap-2">
            <p>© {new Date().getFullYear()} / Rishabh Tomar / Local Time {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <div className="flex gap-4 opacity-50">
              <span>System: Stable</span>
              <span className="w-px h-3 bg-zinc-800" />
              <span>Built with React + Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;