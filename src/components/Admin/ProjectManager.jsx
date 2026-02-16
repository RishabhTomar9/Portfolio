import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState({ title: '', description: '', link: '', media: '', technologies: '' });
    const [loading, setLoading] = useState(false);

    // Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
        });
        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProject({ ...currentProject, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const technologiesArray = typeof currentProject.technologies === 'string'
                ? currentProject.technologies.split(',').map(tech => tech.trim())
                : currentProject.technologies;

            const projectData = {
                ...currentProject,
                technologies: technologiesArray,
                createdAt: currentProject.createdAt || new Date().toISOString()
            };

            if (currentProject.id) {
                await updateDoc(doc(db, 'projects', currentProject.id), projectData);
            } else {
                await addDoc(collection(db, 'projects'), projectData);
            }

            setCurrentProject({ title: '', description: '', link: '', media: '', technologies: '' });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving project: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setCurrentProject({
            ...project,
            technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies
        });
        setIsEditing(true);
    };

    const handleDelete = (project) => {
        setProjectToDelete(project);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (projectToDelete) {
            try {
                await deleteDoc(doc(db, 'projects', projectToDelete.id));
                setIsDeleteModalOpen(false);
                setProjectToDelete(null);
            } catch (error) {
                console.error("Error deleting project: ", error);
            }
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setProjectToDelete(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 md:space-y-12 relative pb-20"
        >
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/5 pb-6 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        Project Access Node
                        <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20 font-mono">v2.0</span>
                    </h2>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1 font-bold">Manage Portfolio Showcase</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                {/* Editor Section */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                            <FaEdit className="text-purple-400 text-sm" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Editor Interface</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-zinc-900/60 p-6 md:p-8 rounded-3xl border border-white/5 space-y-6 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />

                        <div className="space-y-5 relative z-10">
                            {/* Title Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Project Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter project designation..."
                                    value={currentProject.title}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-zinc-700 font-bold tracking-wide"
                                    required
                                />
                            </div>

                            {/* Link Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Live Endpoint</label>
                                <div className="relative group">
                                    <FaExternalLinkAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors text-xs" />
                                    <input
                                        type="text"
                                        name="link"
                                        placeholder="https://..."
                                        value={currentProject.link}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-zinc-700 text-sm font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Media Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Media Asset</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-zinc-800 border border-white/10 overflow-hidden">
                                        {currentProject.media && <img src={currentProject.media} alt="" className="w-full h-full object-cover" />}
                                    </div>
                                    <input
                                        type="text"
                                        name="media"
                                        placeholder="Image URL (Cloudinary recommended)"
                                        value={currentProject.media}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-zinc-700 text-sm font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Tech Stack</label>
                                <div className="relative group">
                                    <FaCode className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors text-xs" />
                                    <input
                                        type="text"
                                        name="technologies"
                                        placeholder="React, Node.js, Firebase..."
                                        value={currentProject.technologies}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-zinc-700 font-mono text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Describe the project details..."
                                    value={currentProject.description}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none h-32 resize-none transition-all placeholder:text-zinc-700 leading-relaxed text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4 border-t border-white/5 relative z-10">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setCurrentProject({ title: '', description: '', link: '', media: '', technologies: '' });
                                    }}
                                    className="px-6 py-3.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider w-full md:w-auto"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 text-xs font-bold uppercase tracking-wider w-full md:w-auto"
                            >
                                {loading ? 'Processing...' : (isEditing ? 'Update Node' : 'Deploy Node')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Live Preview Section */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            <FaExternalLinkAlt className="text-emerald-500 text-sm" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Visual Output</h3>
                    </div>

                    <div className="bg-black/40 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-md min-h-[400px] md:min-h-[600px] flex items-center justify-center relative lg:sticky lg:top-24 transition-all">
                        {/* Preview Card */}
                        <div className="group relative rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden w-full max-w-xl mx-auto shadow-2xl transition-all hover:border-white/10">
                            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-white/5">
                                {currentProject.media ? (
                                    <img
                                        src={currentProject.media}
                                        alt="Preview"
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700 flex-col gap-2">
                                        <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center opacity-20">
                                            <FaExternalLinkAlt />
                                        </div>
                                        <span className="text-xs uppercase tracking-widest font-bold opacity-50">No Media Signal</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                        <FaExternalLinkAlt className="text-black" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <h3 className="text-2xl md:text-3xl font-black text-white font-tech tracking-tight mb-3">
                                    {currentProject.title || 'Project Designation'}
                                </h3>
                                <p className="text-zinc-400 text-sm md:text-base mb-6 leading-relaxed font-medium line-clamp-3">
                                    {currentProject.description || 'Description parameters pending input...'}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {(typeof currentProject.technologies === 'string' ? currentProject.technologies.split(',') : currentProject.technologies || []).map((tech, i) => (
                                        tech && (
                                            <span key={i} className="text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-purple-300 border-purple-500/30">
                                                {tech.trim()}
                                            </span>
                                        )
                                    ))}
                                    {!currentProject.technologies && (
                                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-600 animate-pulse">
                                            Waiting for stack...
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 text-[10px] font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-emerald-400 uppercase tracking-widest pointer-events-none flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Preview
                        </div>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="space-y-6 pt-10 border-t border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Nodes ({projects.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/30 hover:bg-zinc-900/60 transition-all flex flex-col hover:shadow-2xl hover:shadow-purple-900/10"
                            >
                                <div className="aspect-video relative overflow-hidden bg-zinc-950 border-b border-white/5">
                                    <img src={project.media} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-all shadow-lg hover:scale-110"
                                            title="Edit Node"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project)}
                                            className="p-3 bg-red-600 rounded-xl text-white hover:bg-red-500 transition-all shadow-lg hover:scale-110"
                                            title="Delete Node"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-purple-400 transition-colors">{project.title}</h3>
                                    <p className="text-zinc-500 text-xs line-clamp-2 mb-4 font-medium flex-grow leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {project.technologies.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-[9px] bg-white/5 px-2 py-1 rounded-md border border-white/5 text-zinc-400 font-bold uppercase tracking-wider">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-[9px] bg-white/5 px-2 py-1 rounded-md border border-white/5 text-zinc-600 font-bold">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
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
                                        Are you sure you want to permanently delete node <span className="text-white font-bold">{projectToDelete?.title}</span>?
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
        </motion.div>
    );
};

export default ProjectManager;
