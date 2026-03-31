import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEnvelope, FaSignOutAlt, FaClock, FaSearch, FaTrash, FaReply,
    FaProjectDiagram, FaBriefcase, FaGraduationCap, FaHome, FaPowerOff,
    FaBars, FaTimes, FaUserAlt, FaTools, FaWrench, FaCogs, FaTrophy, FaLayerGroup
} from 'react-icons/fa';
import ProjectManager from './ProjectManager';
import ExperienceManager from './ExperienceManager';
import CertificateManager from './CertificateManager';
import SkillsManager from './SkillsManager';
import HeroAboutManager from './HeroAboutManager';
import SettingsManager from './SettingsManager';

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);
    const [userAuth, setUserAuth] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('messages'); 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    // Stats
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(m => !m.read).length;

    useEffect(() => {
        // Auth State Listener
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user && user.email === 'rishabhtomar9999@gmail.com') {
                setUserAuth(user);
                setAuthLoading(false);
            } else {
                setAuthLoading(false);
                navigate('/admin');
            }
        });

        return () => unsubscribeAuth();
    }, [navigate]);

    useEffect(() => {
        // Only register listeners if authenticated as admin
        if (!userAuth) return;

        // Messages Listener
        const q = query(collection(db, "mail"), orderBy("timestamp", "desc"));
        const unsubscribeSnapshot = onSnapshot(q,
            (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoadingMessages(false);
            },
            (err) => {
                console.error("Firestore Error in listener:", err);
                if (err.code === 'permission-denied') {
                    setError("Permission Denied: Please check your security rules if you newly added collections.");
                } else {
                    setError("Failed to load messages. " + err.message);
                }
                setLoadingMessages(false);
            }
        );

        return () => unsubscribeSnapshot();
    }, [userAuth]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin');
    };

    const handleReturnToSite = () => {
        navigate('/');
    };

    const handleDelete = (msg, e) => {
        e.stopPropagation();
        setMessageToDelete(msg);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (messageToDelete) {
            try {
                await deleteDoc(doc(db, "mail", messageToDelete.id));
                if (selectedMessage?.id === messageToDelete.id) setSelectedMessage(null);
                setIsDeleteModalOpen(false);
                setMessageToDelete(null);
            } catch (err) {
                console.error("Error deleting message:", err);
                alert("Failed to delete message");
            }
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setMessageToDelete(null);
    };

    const handleToggleRead = async (id, currentStatus, e) => {
        e.stopPropagation();
        try {
            await updateDoc(doc(db, "mail", id), {
                read: !currentStatus
            });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const getRelativeTime = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = new Date(timestamp.seconds * 1000);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch =
            msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.content?.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filter === 'unread') return !msg.read;
        if (filter === 'read') return msg.read;
        return true;
    });

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!userAuth) return null;

    const TABS = [
        { id: 'messages', label: 'Transmissions', icon: FaEnvelope, color: 'text-purple-400' },
        { id: 'hero-about', label: 'Identity', icon: FaUserAlt, color: 'text-blue-400' },
        { id: 'skills', label: 'Capabilities', icon: FaLayerGroup, color: 'text-emerald-400' },
        { id: 'projects', label: 'Showcase', icon: FaProjectDiagram, color: 'text-purple-400' },
        { id: 'experience', label: 'Timeline', icon: FaBriefcase, color: 'text-blue-400' },
        { id: 'certificates', label: 'Vault', icon: FaGraduationCap, color: 'text-orange-400' },
        { id: 'settings', label: 'Protocol', icon: FaCogs, color: 'text-red-400' },
    ];

    const MenuItem = ({ tab, isActive }) => {
        const Icon = tab.icon;
        return (
            <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 relative group text-[10px] font-black uppercase tracking-[0.2em] ${isActive
                    ? 'text-white bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
                    }`}
            >
                <Icon className={`text-base ${isActive ? tab.color : 'group-hover:text-zinc-300'}`} />
                <span className="hidden xl:inline">{tab.label}</span>
                {isActive && (
                    <motion.div 
                        layoutId="activeTabGlow"
                        className={`absolute inset-0 rounded-xl border border-white/20 opacity-50`}
                    />
                )}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white relative font-sans selection:bg-purple-500/30 pb-20">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-6">
                <div className="max-w-[1600px] mx-auto h-16 md:h-20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                            <FaWrench className="text-purple-400 rotate-45" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg md:text-xl font-black tracking-tighter text-white font-tech uppercase italic">Core OS // <span className="text-purple-500">Admin</span></h1>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-2xl border border-white/5 bg-zinc-900/50">
                        {TABS.map((tab) => (
                            <MenuItem key={tab.id} tab={tab} isActive={activeTab === tab.id} />
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={handleReturnToSite} className="p-2.5 md:px-5 md:py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <FaHome /> <span className="hidden md:inline">Site</span>
                        </button>
                        <button onClick={handleLogout} className="p-2.5 md:px-5 md:py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <FaPowerOff /> <span className="hidden md:inline">End Session</span>
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-3 text-white bg-white/5 rounded-xl border border-white/10">
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden fixed top-20 left-4 right-4 z-50 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-2 gap-2">
                        {TABS.map((tab) => (
                            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border transition-all ${activeTab === tab.id ? 'bg-white/5 border-white/20 text-white' : 'bg-black/20 border-transparent text-zinc-500'}`}>
                                <tab.icon className={`text-xl ${activeTab === tab.id ? tab.color : ''}`} />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 relative z-10 mt-20 md:mt-24">
                {error && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest">
                        <FaTimes className="shrink-0" /> {error}
                    </div>
                )}

                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                    <motion.div key={activeTab} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-3 font-tech italic">
                            {TABS.find(t => t.id === activeTab)?.label}
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-zinc-800" />
                            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.4em]">Subsystem // v04.02.26</p>
                        </div>
                    </motion.div>

                    {activeTab === 'messages' && (
                        <div className="flex gap-10">
                            <div className="text-right">
                                <div className="text-3xl font-black text-white font-tech italic tracking-tighter uppercase">{totalMessages}</div>
                                <div className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-black">Total Units</div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black text-purple-500 font-tech italic tracking-tighter uppercase">{unreadMessages}</div>
                                <div className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-black">Unread Pings</div>
                            </div>
                        </div>
                    )}
                </header>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'messages' && (
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-4 sticky top-24 z-20 bg-black/50 backdrop-blur-xl p-4 -mx-4 md:mx-0 rounded-2xl border border-white/5 mb-8">
                                        <div className="relative flex-1">
                                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                            <input type="text" placeholder="Search transmissions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:border-purple-500 outline-none text-zinc-300" />
                                        </div>
                                        <div className="flex bg-black/60 p-1 rounded-xl border border-white/10">
                                            {['all', 'unread', 'read'].map((f) => (
                                                <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-purple-600 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>{f}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        {loadingMessages ? (
                                            <div className="text-center py-20 text-zinc-600 font-bold animate-pulse uppercase tracking-[0.3em]">Decoding Signal...</div>
                                        ) : filteredMessages.length === 0 ? (
                                            <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl">
                                                <FaEnvelope className="text-5xl text-zinc-800 mx-auto mb-4" />
                                                <p className="text-zinc-600 font-black uppercase tracking-[0.3em]">No Transmission Records Found</p>
                                            </div>
                                        ) : (
                                            filteredMessages.map((msg) => (
                                                <div key={msg.id} onClick={() => setSelectedMessage(selectedMessage?.id === msg.id ? null : msg)} className={`group relative bg-zinc-900/30 border rounded-2xl p-6 cursor-pointer transition-all duration-500 ${selectedMessage?.id === msg.id ? 'border-purple-500/50 bg-zinc-900/60 shadow-[0_0_50px_rgba(168,85,247,0.1)]' : 'border-white/5 hover:border-white/10 hover:bg-zinc-900/40'} ${!msg.read ? 'border-l-4 border-l-purple-500' : ''}`}>
                                                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black border transition-all ${!msg.read ? 'bg-purple-600 border-purple-400 shadow-lg shadow-purple-900/30' : 'bg-black border-white/5 text-zinc-600'}`}>{msg.name?.charAt(0).toUpperCase()}</div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <h3 className={`text-lg font-black uppercase tracking-tight ${!msg.read ? 'text-white' : 'text-zinc-500'}`}>{msg.name}</h3>
                                                                {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />}
                                                            </div>
                                                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{msg.email}</p>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full border border-white/5 flex items-center gap-2"><FaClock /> {getRelativeTime(msg.timestamp)}</div>
                                                            <div className="flex gap-1">
                                                                <button onClick={(e) => handleToggleRead(msg.id, msg.read, e)} className={`p-3 rounded-xl transition-all ${msg.read ? 'text-zinc-600 hover:text-white' : 'text-purple-500 hover:text-purple-400 bg-purple-500/10'}`}>{msg.read ? <div className="w-4 h-4 rounded-full border-2 border-current" /> : <div className="w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />}</button>
                                                                <button onClick={(e) => handleDelete(msg, e)} className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl flex items-center justify-center"><FaTrash /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <AnimatePresence>
                                                        {selectedMessage?.id === msg.id && (
                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                                <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                                                                    <div className="bg-black/60 p-8 rounded-2xl border border-white/5 text-zinc-400 text-base leading-relaxed font-medium whitespace-pre-wrap">{msg.content}</div>
                                                                    <div className="flex justify-end"><a href={`mailto:${msg.email}`} className="bg-white text-black px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"><FaReply /> Respond via Protocol</a></div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'hero-about' && <HeroAboutManager />}
                            {activeTab === 'skills' && <SkillsManager />}
                            {activeTab === 'projects' && <ProjectManager />}
                            {activeTab === 'experience' && <ExperienceManager />}
                            {activeTab === 'certificates' && <CertificateManager />}
                            {activeTab === 'settings' && <SettingsManager />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <AnimatePresence>
                {isDeleteModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl" onClick={cancelDelete}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border-2 border-white/10 rounded-3xl p-10 max-w-sm w-full shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600" />
                            <div className="text-center space-y-6">
                                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center border border-red-500/20 mx-auto shadow-[0_0_50px_rgba(239,68,68,0.2)]"><FaTrash className="text-3xl text-red-500" /></div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Confirm Deletion</h3>
                                    <p className="text-zinc-500 text-sm font-bold leading-relaxed">Permanently purge transmission from <span className="text-white">{messageToDelete?.name}</span>?</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={cancelDelete} className="px-6 py-4 rounded-xl border border-white/5 text-zinc-500 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest font-tech">Abort</button>
                                    <button onClick={confirmDelete} className="px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-all text-[10px] font-black uppercase tracking-widest font-tech shadow-lg shadow-red-900/40">Purge</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
