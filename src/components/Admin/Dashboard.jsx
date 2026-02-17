
import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEnvelope, FaSignOutAlt, FaClock, FaSearch, FaTrash, FaReply,
    FaProjectDiagram, FaBriefcase, FaGraduationCap, FaHome, FaPowerOff,
    FaBars, FaTimes
} from 'react-icons/fa';
import ProjectManager from './ProjectManager';
import ExperienceManager from './ExperienceManager';
import CertificateManager from './CertificateManager';

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('messages'); // 'messages', 'projects', 'experience', 'certificates'
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    // Stats
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(m => !m.read).length;
    const readMessages = messages.filter(m => m.read).length;

    useEffect(() => {
        // Auth State Listener
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user && user.email === 'rishabhtomar9999@gmail.com') {
                setAuthLoading(false);
            } else {
                setAuthLoading(false);
                navigate('/admin');
            }
        });

        // Messages Listener
        const q = query(collection(db, "mail"), orderBy("timestamp", "desc"));
        const unsubscribeSnapshot = onSnapshot(q,
            (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoadingMessages(false);
            },
            (err) => {
                console.error("Firestore Error:", err);
                setError("Failed to load messages. " + err.message);
                setLoadingMessages(false);
            }
        );

        return () => {
            unsubscribeAuth();
            unsubscribeSnapshot();
        };
    }, [navigate]);

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

    const MenuItem = ({ id, icon: Icon, label, isActive }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative group text-sm font-bold uppercase tracking-wider ${isActive
                    ? 'text-white bg-purple-500/10 border border-purple-500/20'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon className={`text-base ${isActive ? 'text-purple-400' : 'group-hover:text-purple-300'}`} />
            {label}
            {isActive && (
                <div className="absolute inset-0 rounded-lg bg-purple-500/5 animate-pulse pointer-events-none" />
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-black text-white relative font-sans selection:bg-purple-500/30 pb-20">
            {/* Background Texture - Consistent with About Page */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-6">
                <div className="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between gap-4">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                            <FaEnvelope className="text-purple-400" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-base md:text-lg font-bold tracking-tight text-white font-tech uppercase">Mission Control</h1>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-xl border border-white/5">
                        {['messages', 'projects', 'experience', 'certificates'].map((tab) => (
                            <MenuItem
                                key={tab}
                                id={tab}
                                icon={
                                    tab === 'messages' ? FaEnvelope :
                                        tab === 'projects' ? FaProjectDiagram :
                                            tab === 'experience' ? FaBriefcase : FaGraduationCap
                                }
                                label={tab === 'certificates' ? 'Awards' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                isActive={activeTab === tab}
                            />
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            onClick={handleReturnToSite}
                            className="p-2 md:px-4 md:py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                            title="Return to Site"
                        >
                            <FaHome /> <span className="hidden md:inline">Site</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="p-2 md:px-4 md:py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                            title="Logout"
                        >
                            <FaPowerOff /> <span className="hidden md:inline">Logout</span>
                        </button>
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10 ml-2"
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden fixed top-[64px] left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 overflow-hidden"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {['messages', 'projects', 'experience', 'certificates'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
                                    className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl border transition-all ${activeTab === tab
                                            ? 'bg-purple-900/20 border-purple-500/30 text-white'
                                            : 'bg-zinc-900 border-white/5 text-zinc-500'
                                        }`}
                                >
                                    {tab === 'messages' && <FaEnvelope className="text-xl mb-1" />}
                                    {tab === 'projects' && <FaProjectDiagram className="text-xl mb-1" />}
                                    {tab === 'experience' && <FaBriefcase className="text-xl mb-1" />}
                                    {tab === 'certificates' && <FaGraduationCap className="text-xl mb-1" />}
                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                        {tab === 'certificates' ? 'Awards' : tab}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative z-10 mt-20 md:mt-24">

                {/* Page Title (Changes based on tab) */}
                <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter loading-none mb-2 font-tech">
                            {activeTab === 'messages' && 'Transmissions'}
                            {activeTab === 'projects' && 'Project Grid'}
                            {activeTab === 'experience' && 'Career Matrix'}
                            {activeTab === 'certificates' && 'Vault Access'}
                        </h2>
                        <p className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            /System/Admin/{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </p>
                    </motion.div>

                    {/* Global Stats (Visible mostly on Messages tab) */}
                    {activeTab === 'messages' && !loadingMessages && (
                        <div className="flex gap-4">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white font-mono">{totalMessages}</div>
                                <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Total</div>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div className="text-right">
                                <div className="text-2xl font-bold text-purple-400 font-mono">{unreadMessages}</div>
                                <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Pending</div>
                            </div>
                        </div>
                    )}
                </header>

                {/* Content Rendering */}
                <AnimatePresence mode="wait">
                    {activeTab === 'messages' ? (
                        <motion.div
                            key="messages"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Message Toolbar */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6 sticky top-20 z-20 bg-black/80 pb-4 backdrop-blur-md -mx-4 px-4 md:mx-0 md:px-0 pt-2 transition-all rounded-b-xl border-b border-white/5 md:border-none md:rounded-b-none">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                                    <input
                                        type="text"
                                        placeholder="Search transmissions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 placeholder:text-zinc-600 transition-all text-zinc-300 shadow-inner"
                                    />
                                </div>

                                {/* Filter Tabs */}
                                <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/10 shadow-sm">
                                    {['all', 'unread', 'read'].map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex-1 ${filter === f
                                                ? 'bg-purple-500/10 text-purple-400 shadow-sm border border-purple-500/20'
                                                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <div className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400">
                                    <FaEnvelope /> {error}
                                </div>
                            )}

                            {/* Messages List */}
                            <div className="grid gap-3 pb-8">
                                {loadingMessages ? (
                                    <div className="text-center py-12 text-zinc-500 text-sm animate-pulse">Scanning frequencies...</div>
                                ) : filteredMessages.length === 0 ? (
                                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                                        <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5 p-4">
                                            <FaEnvelope className="text-3xl text-zinc-700" />
                                        </div>
                                        <p className="text-zinc-500 font-bold text-sm">No transmissions found.</p>
                                    </div>
                                ) : (
                                    filteredMessages.map((msg, index) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={msg.id}
                                            onClick={() => setSelectedMessage(selectedMessage?.id === msg.id ? null : msg)}
                                            className={`group relative bg-zinc-900/40 border p-5 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 ${selectedMessage?.id === msg.id
                                                    ? 'border-purple-500/30 bg-zinc-900/90 ring-1 ring-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]'
                                                    : 'border-white/5 hover:border-white/10 hover:bg-zinc-900/60'
                                                } ${!msg.read ? 'border-l-4 border-l-purple-500' : ''}`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 transition-all ${!msg.read ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-900/20' : 'bg-zinc-800 text-zinc-500'}`}>
                                                        {msg.name?.charAt(0).toUpperCase() || '?'}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className={`truncate text-sm md:text-base ${!msg.read ? 'font-bold text-white' : 'font-medium text-zinc-400'}`}>
                                                                {msg.name}
                                                            </h3>
                                                            {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />}
                                                        </div>
                                                        <p className="text-xs text-zinc-500 truncate font-mono">{msg.email}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                                                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold bg-zinc-950/30 px-3 py-1.5 rounded-full border border-white/5">
                                                        <FaClock /> {getRelativeTime(msg.timestamp)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button onClick={(e) => handleToggleRead(msg.id, msg.read, e)} className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                                            {msg.read ? <div className="w-3 h-3 rounded-full border-2 border-current" /> : <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]" />}
                                                        </button>
                                                        <button onClick={(e) => handleDelete(msg, e)} className="p-2 hover:bg-red-500/20 rounded-lg text-zinc-400 hover:text-red-400 transition-colors">
                                                            <FaTrash className="text-xs" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {selectedMessage?.id === msg.id && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                        <div className="pt-6 mt-6 border-t border-white/5">
                                                            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 mb-4 font-mono text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap shadow-inner">{msg.content}</div>
                                                            <div className="flex justify-end">
                                                                <a href={`mailto:${msg.email}`} className="text-xs bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/10">
                                                                    <FaReply /> Reply via Email
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    ) : activeTab === 'projects' ? (
                        <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ProjectManager />
                        </motion.div>
                    ) : activeTab === 'experience' ? (
                        <motion.div key="experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ExperienceManager />
                        </motion.div>
                    ) : activeTab === 'certificates' ? (
                        <motion.div key="certificates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <CertificateManager />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </main>

            {/* Global Delete Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={cancelDelete}>
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-2 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                    <FaTrash className="text-2xl text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Delete message from <span className="text-white font-bold">{messageToDelete?.name}</span>?</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full pt-4">
                                    <button onClick={cancelDelete} className="px-4 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-wider">Abort</button>
                                    <button onClick={confirmDelete} className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:shadow-red-900/40 transition-all text-sm font-bold uppercase tracking-wider border border-red-500/30">Execute</button>
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
