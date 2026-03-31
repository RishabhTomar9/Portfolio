import React, { useState } from 'react';
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ImageUpload = ({ onUpload, currentImage, folder = 'portfolio' }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(currentImage);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!cloudName || !uploadPreset) {
            setError("Cloudinary configuration missing in .env (VITE_CLOUDINARY_CLOUD_NAME & VITE_CLOUDINARY_UPLOAD_PRESET)");
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', folder);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                setPreview(data.secure_url);
                onUpload(data.secure_url);
            } else {
                setError(data.error?.message || "Upload failed");
            }
        } catch (err) {
            setError("Connection error: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative group w-20 h-20 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center shadow-inner">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    ) : (
                        <FaCloudUploadAlt className="text-zinc-700 text-2xl" />
                    )}
                    {uploading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <FaSpinner className="text-white animate-spin text-xl" />
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-2">
                    <label className="relative cursor-pointer group">
                        <div className={`px-4 py-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                            uploading ? 'bg-zinc-800 border-white/5 text-zinc-500 cursor-not-allowed' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                        }`}>
                            {uploading ? 'Uploading...' : (preview ? 'Change Image' : 'Upload Image')}
                            {!uploading && <FaCloudUploadAlt className="text-base" />}
                        </div>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleUpload} 
                            disabled={uploading}
                        />
                    </label>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest px-1 flex items-center gap-2">
                        {uploading ? (
                            <span className="flex items-center gap-1"><FaSpinner className="animate-spin" /> Transferring to Cloudinary...</span>
                        ) : error ? (
                            <span className="text-red-400 flex items-center gap-1"><FaExclamationTriangle /> {error}</span>
                        ) : preview ? (
                            <span className="text-emerald-500 flex items-center gap-1"><FaCheckCircle /> Asset Live</span>
                        ) : (
                            'Max Size: 5MB // PNG, JPG, WEBP'
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
