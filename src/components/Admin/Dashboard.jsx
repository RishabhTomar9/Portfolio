import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaSignOutAlt, FaUser, FaClock, FaSearch, FaTrash, FaReply, FaProjectDiagram } from 'react-icons/fa';
import ProjectManager from './ProjectManager';

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('messages'); // 'messages', 'projects'
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const navigate = useNavigate();

    // Stats
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(m => !m.read).length;
    const readMessages = messages.filter(m => m.read).length;

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (!user || user.email !== 'rishabhtomar9999@gmail.com') {
                navigate('/admin');
            }
        });

        const q = query(collection(db, "mail"), orderBy("timestamp", "desc"));
        const unsubscribeSnapshot = onSnapshot(q,
            (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Firestore Error:", err);
                setError("Failed to load messages. " + err.message);
                setLoading(false);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white relative font-sans selection:bg-purple-500/30">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            {/* Header */}
            <header className="border-b border-white/5 bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                    <FaEnvelope className="text-purple-400" />
                                </div>
                                <div>
                                    <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">Mission Control</h1>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold hidden sm:block">Incoming Transmissions</p>
                                </div>
                            </div>

                            {/* Mobile Logout (visible only on small screens) */}
                            <button
                                onClick={handleLogout}
                                className="md:hidden flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-red-400 transition-colors bg-white/5 p-2 rounded-lg"
                            >
                                <FaSignOutAlt />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                            <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10 w-full md:w-auto">
                                <button
                                    onClick={() => setActiveTab('messages')}
                                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'messages' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <FaEnvelope /> Messages
                                </button>
                                <button
                                    onClick={() => setActiveTab('projects')}
                                    className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'projects' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <FaProjectDiagram /> Projects
                                </button>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="hidden md:flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-red-400 transition-colors border border-white/5 px-4 py-2.5 rounded-xl hover:border-red-500/30 hover:bg-red-500/5 whitespace-nowrap"
                            >
                                <FaSignOutAlt /> Terminate
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 md:px-6 py-8 relative z-10 pb-20">

                {activeTab === 'messages' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                            {[
                                { label: 'Total Messages', value: totalMessages, color: 'text-white', bg: 'from-zinc-800/50 to-zinc-900/50' },
                                { label: 'Unread', value: unreadMessages, color: 'text-purple-400', bg: 'from-purple-900/10 to-zinc-900/50' },
                                { label: 'Read', value: readMessages, color: 'text-zinc-500', bg: 'from-zinc-800/50 to-zinc-900/50' }
                            ].map((stat, idx) => (
                                <div key={idx} className={`bg-gradient-to-br ${stat.bg} border border-white/5 p-5 rounded-2xl backdrop-blur-sm relative overflow-hidden group`}>
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <FaEnvelope className="text-4xl" />
                                    </div>
                                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                                    <p className={`text-2xl md:text-3xl font-bold ${stat.color} font-mono`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 mb-6 sticky top-[80px] z-30 bg-black/80 md:bg-transparent p-3 -mx-3 md:mx-0 rounded-2xl md:rounded-none md:p-0 backdrop-blur-xl md:backdrop-blur-none border border-white/10 md:border-none shadow-xl md:shadow-none">
                            {/* Search */}
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search transmissions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 placeholder:text-zinc-600 transition-all text-zinc-300 shadow-inner"
                                />
                            </div>

                            {/* Filter Tabs */}
                            <div className="grid grid-cols-3 md:flex bg-zinc-900/80 p-1 rounded-xl border border-white/10 min-w-[300px]">
                                {['all', 'unread', 'read'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 md:px-6 py-2.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all md:flex-1 ${filter === f
                                            ? 'bg-purple-500/10 text-purple-400 shadow-sm border border-purple-500/20'
                                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Error Banner */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400"
                            >
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                    <FaEnvelope className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Access Denied</h3>
                                    <p className="text-sm opacity-80">{error}</p>
                                    <p className="text-xs mt-2 text-white/50">Ensure Firestore rules allow read access for {auth.currentUser?.email}.</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Messages List */}
                        <div className="space-y-3">
                            <AnimatePresence>
                                {filteredMessages.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20 border border-dashed border-white/10 rounded-3xl"
                                    >
                                        <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5 p-4">
                                            <FaEnvelope className="text-3xl text-zinc-700" />
                                        </div>
                                        <p className="text-zinc-500 font-bold text-sm">No transmissions found.</p>
                                    </motion.div>
                                ) : (
                                    filteredMessages.map((msg, index) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.03 }}
                                            key={msg.id}
                                            onClick={() => setSelectedMessage(selectedMessage?.id === msg.id ? null : msg)}
                                            className={`group relative bg-zinc-900/40 border p-4 md:p-5 rounded-2xl transition-all cursor-pointer overflow-hidden ${selectedMessage?.id === msg.id
                                                ? 'border-purple-500/30 bg-zinc-900/90 shadow-[0_0_30px_rgba(168,85,247,0.05)] ring-1 ring-purple-500/20'
                                                : 'border-white/5 hover:border-white/10 hover:bg-zinc-900/60'
                                                } ${!msg.read ? 'border-l-4 border-l-purple-500' : ''
                                                }`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    {/* Avatar */}
                                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 transition-all ${!msg.read ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-900/20' : 'bg-zinc-800 text-zinc-500'
                                                        }`}>
                                                        {msg.name?.charAt(0).toUpperCase() || '?'}
                                                    </div>

                                                    {/* Info */}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className={`truncate text-sm md:text-base ${!msg.read ? 'font-bold text-white' : 'font-medium text-zinc-400'}`}>
                                                                {msg.name}
                                                            </h3>
                                                            {!msg.read && (
                                                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-zinc-500 truncate font-mono">{msg.email}</p>
                                                    </div>
                                                </div>

                                                {/* Actions & Meta */}
                                                <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                                                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold bg-zinc-950/30 px-3 py-1.5 rounded-full border border-white/5">
                                                        <FaClock />
                                                        {getRelativeTime(msg.timestamp)}
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={(e) => handleToggleRead(msg.id, msg.read, e)}
                                                            className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                            title={msg.read ? "Mark as Unread" : "Mark as Read"}
                                                        >
                                                            {msg.read ? <FaEnvelope className="text-xs" /> : <div className="w-3 h-3 rounded-full border-2 border-current" />}
                                                        </button>

                                                        <button
                                                            onClick={(e) => handleDelete(msg, e)}
                                                            className="p-2 hover:bg-red-500/20 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                                                            title="Delete Message"
                                                        >
                                                            <FaTrash className="text-xs" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Content */}
                                            <AnimatePresence>
                                                {selectedMessage?.id === msg.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-6 mt-6 border-t border-white/5">
                                                            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 mb-4 font-mono text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
                                                                {msg.content}
                                                            </div>
                                                            <div className="flex justify-end">
                                                                <a
                                                                    href={`mailto:${msg.email}`}
                                                                    className="text-xs bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/10"
                                                                >
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
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ) : (
                    <ProjectManager />
                )}
            </main>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={cancelDelete}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden ring-1 ring-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]" />

                            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-2 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                    <FaTrash className="text-2xl text-red-500" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Are you sure you want to permanently execute deletion protocol for message from <span className="text-white font-bold">{messageToDelete?.name}</span>?
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 w-full pt-4">
                                    <button
                                        onClick={cancelDelete}
                                        className="px-4 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-wider"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:shadow-red-900/40 transition-all text-sm font-bold uppercase tracking-wider border border-red-500/30"
                                    >
                                        Execute
                                    </button>
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
