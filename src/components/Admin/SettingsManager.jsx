import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaSave, FaTools, FaShareAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsManager = () => {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        email: 'rishabhtomar9999@gmail.com',
        github: 'https://github.com/RishabhTomar9',
        linkedin: 'https://www.linkedin.com/in/rishabhtomar9/',
        twitter: '',
        instagram: '',
        location: 'India',
        footerCredit: 'Designed & Built by Rishabh Tomar',
        contactHeading: 'Get In Touch',
        contactSubheading: 'Let\'s build something together.'
    });

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'content', 'settings'), (docSnap) => {
            if (docSnap.exists()) setSettings(docSnap.data());
        });
        return () => unsub();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await setDoc(doc(db, 'content', 'settings'), settings);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error("Error updating settings:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-6 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        Global Protocol
                        <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-1 rounded border border-orange-500/20 font-bold">v1.5</span>
                    </h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1 font-bold">Manage Social Links & Global Metadata</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-zinc-900/60 p-6 md:p-8 rounded-xl border border-white/5 space-y-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 opacity-50" />
                    
                    {/* Social Section */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 border-l-2 border-orange-500 pl-3">
                            <FaShareAlt className="text-orange-400" /> Digital Presence
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaGithub /> GitHub URL</label>
                                <input
                                    type="text"
                                    value={settings.github}
                                    onChange={(e) => setSettings({...settings, github: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaLinkedin /> LinkedIn URL</label>
                                <input
                                    type="text"
                                    value={settings.linkedin}
                                    onChange={(e) => setSettings({...settings, linkedin: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaTwitter /> Twitter / X URL</label>
                                <input
                                    type="text"
                                    value={settings.twitter}
                                    onChange={(e) => setSettings({...settings, twitter: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaInstagram /> Instagram URL</label>
                                <input
                                    type="text"
                                    value={settings.instagram}
                                    onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact & Misc */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 border-l-2 border-orange-500 pl-3">
                            <FaTools className="text-orange-400" /> System Params
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaEnvelope /> Primary Email</label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaMapMarkerAlt /> Global Location</label>
                                <input
                                    type="text"
                                    value={settings.location}
                                    onChange={(e) => setSettings({...settings, location: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Footer Attribution</label>
                                <input
                                    type="text"
                                    value={settings.footerCredit}
                                    onChange={(e) => setSettings({...settings, footerCredit: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact Heading</label>
                                    <input
                                        type="text"
                                        value={settings.contactHeading}
                                        onChange={(e) => setSettings({...settings, contactHeading: e.target.value})}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contact Subheading</label>
                                    <input
                                        type="text"
                                        value={settings.contactSubheading}
                                        onChange={(e) => setSettings({...settings, contactSubheading: e.target.value})}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500 outline-none text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-orange-900/40 transition-all text-xs font-bold uppercase tracking-wider font-tech"
                        >
                            <FaSave /> {loading ? 'Synchronizing...' : 'Apply Protocol Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default SettingsManager;
