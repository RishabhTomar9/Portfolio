import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { FaUserAstronaut, FaCode, FaLaptopCode, FaRocket, FaIdCard, FaImage, FaFileAlt, FaSave, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from './ImageUpload';

const HeroAboutManager = () => {
    const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'about'
    const [loading, setLoading] = useState(false);
    const [heroData, setHeroData] = useState({
        name: 'Rishabh Tomar',
        role1: 'Architecting Scalable Systems...',
        role2: 'Building The Future of Tech...',
        role3: 'Data Engineering Expert...',
        role4: 'Forging Digital Experiences...',
        company: 'Zintrix Technologies',
        companyLink: 'https://zintrixtechnologies.com/',
        description: "I'm Rishabh Tomar. Co-Founder & Co-CTO at Zintrix Technologies. I build high-performance ecosystems where data meets design.",
        resumeLink: '',
        heroImage: '/Images/hero-image.jpg'
    });

    const [aboutData, setAboutData] = useState({
        heading: 'Core Engine.',
        subheading: 'Identity',
        location: 'Bhopal, India',
        status: 'Available',
        quote: "I don't just write code; I architect ecosystems where data flows seamlessly into experience.",
        mainDescription: "I bridge the gap between complex data systems and intuitive user interfaces. My approach is centered on scalability and performance-first architecture.",
        card1Title: 'The Architect',
        card1Tag: 'STRATEGY',
        card1Desc: "I bridge the gap between complex data systems and intuitive user interfaces. My approach is centered on scalability and performance-first architecture.",
        card2Title: 'The Toolkit',
        card2Tag: 'TECHNOLOGY',
        card2Desc: 'Expertise across the MERN stack and Data Engineering mastery in Snowflake. I build modern, data-driven solutions.',
        card3Title: 'The Mission',
        card3Tag: 'INNOVATION',
        card3Desc: 'Co-founding Zintrix Technologies to empower businesses with cutting-edge tech. Solving real-world challenges with elegant code.'
    });

    useEffect(() => {
        const unsubHero = onSnapshot(doc(db, 'content', 'hero'), (docSnap) => {
            if (docSnap.exists()) setHeroData(docSnap.data());
        });

        const unsubAbout = onSnapshot(doc(db, 'content', 'about'), (docSnap) => {
            if (docSnap.exists()) setAboutData(docSnap.data());
        });

        return () => {
            unsubHero();
            unsubAbout();
        };
    }, []);

    const handleHeroSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await setDoc(doc(db, 'content', 'hero'), heroData);
            alert('Hero data updated successfully!');
        } catch (error) {
            console.error("Error updating hero:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAboutSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await setDoc(doc(db, 'content', 'about'), aboutData);
            alert('About data updated successfully!');
        } catch (error) {
            console.error("Error updating about:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-6 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        Identity Modules
                        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 font-bold">v3.0</span>
                    </h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1 font-bold">Configure Personal Core & Brand</p>
                </div>

                <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10 w-fit">
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'hero' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                    >
                        Hero Section
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'about' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                    >
                        About Section
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'hero' ? (
                        <motion.form 
                            key="hero-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleHeroSubmit} 
                            className="bg-zinc-900/60 p-6 md:p-8 rounded-xl border border-white/5 space-y-6 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-50" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaIdCard /> Display Name</label>
                                        <input
                                            type="text"
                                            value={heroData.name}
                                            onChange={(e) => setHeroData({...heroData, name: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none font-bold"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Typewriter Roles (4 Strings)</label>
                                        <div className="space-y-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <input
                                                    key={i}
                                                    type="text"
                                                    value={heroData[`role${i}`]}
                                                    onChange={(e) => setHeroData({...heroData, [`role${i}`]: e.target.value})}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none text-sm"
                                                    placeholder={`Role ${i}`}
                                                    required
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Company Name</label>
                                        <input
                                            type="text"
                                            value={heroData.company}
                                            onChange={(e) => setHeroData({...heroData, company: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Company URL</label>
                                        <input
                                            type="text"
                                            value={heroData.companyLink}
                                            onChange={(e) => setHeroData({...heroData, companyLink: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none text-sm"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 font-tech italic"><FaImage /> Direct Asset Upload (Cloudinary)</label>
                                        <ImageUpload 
                                            currentImage={heroData.heroImage} 
                                            onUpload={(url) => setHeroData({...heroData, heroImage: url})}
                                            folder="hero"
                                        />
                                        <input
                                            type="text"
                                            value={heroData.heroImage}
                                            onChange={(e) => setHeroData({...heroData, heroImage: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-[10px] text-zinc-500 focus:border-blue-500 outline-none truncate"
                                            placeholder="Asset URL (Auto-filled on upload)"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><FaFileAlt /> Resume Link</label>
                                        <input
                                            type="text"
                                            value={heroData.resumeLink}
                                            onChange={(e) => setHeroData({...heroData, resumeLink: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none text-sm"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description Brief</label>
                                <textarea
                                    value={heroData.description}
                                    onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none h-32 resize-none leading-relaxed text-sm"
                                    required
                                />
                            </div>

                            <div className="flex justify-end pt-4 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-900/40 transition-all text-xs font-bold uppercase tracking-wider font-tech"
                                >
                                    <FaSave /> {loading ? 'Synchronizing...' : 'Update Hero Matrix'}
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form 
                            key="about-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleAboutSubmit} 
                            className="bg-zinc-900/60 p-6 md:p-8 rounded-xl border border-white/5 space-y-6 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-50" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Main Heading</label>
                                        <input
                                            type="text"
                                            value={aboutData.heading}
                                            onChange={(e) => setAboutData({...aboutData, heading: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Location Status</label>
                                        <input
                                            type="text"
                                            value={aboutData.location}
                                            onChange={(e) => setAboutData({...aboutData, location: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sub-Heading / Tag</label>
                                        <input
                                            type="text"
                                            value={aboutData.subheading}
                                            onChange={(e) => setAboutData({...aboutData, subheading: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Availability Status</label>
                                        <input
                                            type="text"
                                            value={aboutData.status}
                                            onChange={(e) => setAboutData({...aboutData, status: e.target.value})}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quote (Highlighted Text)</label>
                                <textarea
                                    value={aboutData.quote}
                                    onChange={(e) => setAboutData({...aboutData, quote: e.target.value})}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none h-20 resize-none italic font-bold text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Core Values Cards</h3>
                                
                                {[1, 2, 3].map(num => (
                                    <div key={num} className="bg-black/20 p-5 rounded-xl border border-white/5 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Card {num} Title</label>
                                                <input
                                                    type="text"
                                                    value={aboutData[`card${num}Title`]}
                                                    onChange={(e) => setAboutData({...aboutData, [`card${num}Title`]: e.target.value})}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Card {num} Tag</label>
                                                <input
                                                    type="text"
                                                    value={aboutData[`card${num}Tag`]}
                                                    onChange={(e) => setAboutData({...aboutData, [`card${num}Tag`]: e.target.value})}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none text-xs font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Card {num} Description</label>
                                            <textarea
                                                value={aboutData[`card${num}Desc`]}
                                                onChange={(e) => setAboutData({...aboutData, [`card${num}Desc`]: e.target.value})}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none h-16 resize-none text-[10px] leading-relaxed"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-emerald-900/40 transition-all text-xs font-bold uppercase tracking-wider font-tech"
                                >
                                    <FaSave /> {loading ? 'Synchronizing...' : 'Update Engine Config'}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default HeroAboutManager;
