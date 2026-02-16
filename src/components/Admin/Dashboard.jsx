import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaSignOutAlt, FaUser, FaClock, FaSearch, FaTrash, FaReply } from 'react-icons/fa';

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
    const [selectedMessage, setSelectedMessage] = useState(null);
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

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteDoc(doc(db, "mail", id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
            } catch (err) {
                console.error("Error deleting message:", err);
                alert("Failed to delete message");
            }
        }
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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />

            {/* Header */}
            <header className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                            <FaEnvelope className="text-purple-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white/90">Mission Control</h1>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Incoming Transmissions</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-red-400 transition-colors border border-white/5 px-4 py-2 rounded-lg hover:border-red-500/30 hover:bg-red-500/5"
                    >
                        <FaSignOutAlt /> TERMINATE SESSION
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 md:px-6 py-8 relative z-10">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Total Messages', value: totalMessages, color: 'text-white' },
                        { label: 'Unread', value: unreadMessages, color: 'text-purple-400' },
                        { label: 'Read', value: readMessages, color: 'text-zinc-500' }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-zinc-900/40 border border-white/5 p-5 rounded-2xl backdrop-blur-sm">
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-2">{stat.label}</p>
                            <p className={`text-3xl font-bold ${stat.color} font-bold`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 sticky top-24 z-40 bg-black/80 p-2 -mx-2 rounded-xl border border-white/0 backdrop-blur-xl md:static md:bg-transparent md:p-0 md:rounded-none md:border-none md:backdrop-blur-none transition-all">
                    {/* Search */}
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 placeholder:text-zinc-600 transition-all text-zinc-300"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10">
                        {['all', 'unread', 'read'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f
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
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
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
                                    className={`group relative bg-zinc-900/40 border p-5 rounded-2xl transition-all cursor-pointer overflow-hidden ${selectedMessage?.id === msg.id
                                        ? 'border-purple-500/30 bg-zinc-900/80 shadow-[0_0_30px_rgba(168,85,247,0.05)]'
                                        : 'border-white/5 hover:border-white/10 hover:bg-zinc-900/60'
                                        } ${!msg.read ? 'border-l-4 border-l-purple-500' : ''
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            {/* Avatar */}
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 transition-all ${!msg.read ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-900/20' : 'bg-zinc-800 text-zinc-500'
                                                }`}>
                                                {msg.name?.charAt(0).toUpperCase() || '?'}
                                            </div>

                                            {/* Info */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className={`truncate text-sm ${!msg.read ? 'font-bold text-white' : 'font-medium text-zinc-400'}`}>
                                                        {msg.name}
                                                    </h3>
                                                    {!msg.read && (
                                                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-zinc-500 truncate font-bold">{msg.email}</p>
                                            </div>
                                        </div>

                                        {/* Actions & Meta */}
                                        <div className="flex items-center gap-4 md:justify-end mt-4 md:mt-0">
                                            <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold bg-zinc-950/30 px-3 py-1.5 rounded-full border border-white/5">
                                                <FaClock />
                                                {getRelativeTime(msg.timestamp)}
                                            </div>

                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => handleToggleRead(msg.id, msg.read, e)}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                    title={msg.read ? "Mark as Unread" : "Mark as Read"}
                                                >
                                                    {msg.read ? <FaEnvelope className="text-xs" /> : <div className="w-3 h-3 rounded-full border-2 border-current" />}
                                                </button>

                                                <button
                                                    onClick={(e) => handleDelete(msg.id, e)}
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
                                                    <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-sm">
                                                        {msg.content}
                                                    </p>
                                                    <div className="mt-6 flex justify-end">
                                                        <a
                                                            href={`mailto:${msg.email}`}
                                                            className="text-xs bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2"
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
            </main>
        </div>
    );
};

export default Dashboard;
