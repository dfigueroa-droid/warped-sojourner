'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, File, Image, Film, Music, Mic, FileText, Database, Download, Eye, MoreVertical, Search, Folder, Mail } from 'lucide-react';
import { uploadFile, listFiles } from '@/lib/api';

export default function RepositoryPage() {
    const [files, setFiles] = useState<any[]>([]);
    const [category, setCategory] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadFiles();
    }, [category]);

    const loadFiles = async () => {
        const res = await listFiles(category || undefined);
        setFiles(res);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        try {
            await uploadFile(e.target.files[0]);
            await loadFiles();
        } catch (err) {
            console.error(err);
        }
        setUploading(false);
    };

    const getIcon = (cat: string) => {
        switch (cat) {
            case 'image': return <Image className="w-5 h-5 text-purple-400" />;
            case 'video': return <Film className="w-5 h-5 text-red-400" />;
            case 'audio': return <Music className="w-5 h-5 text-pink-400" />;
            case 'document': return <FileText className="w-5 h-5 text-blue-400" />;
            case 'email': return <Mail className="w-5 h-5 text-amber-400" />;
            case 'archive': return <Folder className="w-5 h-5 text-yellow-400" />;
            default: return <File className="w-5 h-5 text-slate-400" />;
        }
    };

    return (
        <div className="min-h-screen p-8 pb-32">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                        Universal Repository
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <label className={`cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all ${uploading ? 'opacity-50' : ''}`}>
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload File'}
                        <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                    </label>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* FILTERS */}
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 px-2">File Types</h3>
                    {['', 'document', 'image', 'video', 'audio', 'email', 'archive'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3
                                ${category === cat ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
                            `}
                        >
                            {getIcon(cat || 'file')}
                            <span className="capitalize">{cat || 'All Files'}</span>
                        </button>
                    ))}
                </div>

                {/* GRID */}
                <div className="lg:col-span-3">
                    <div className="bg-black/20 border border-white/5 rounded-2xl p-6 min-h-[600px]">
                        {files.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                                <Database className="w-12 h-12 mb-4 opacity-30" />
                                <p>Repository is empty.</p>
                                <p className="text-xs">Upload PDF, DOCX, MP4, JPG, PST, EML, etc.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {files.map((file) => (
                                    <div key={file.id} className="group bg-slate-900/50 border border-white/5 hover:border-blue-500/50 rounded-xl p-4 transition-all hover:-translate-y-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-black/40 rounded-lg">
                                                {getIcon(file.category)}
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <a href={`http://localhost:8000${file.download_url}`} target="_blank" className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white">
                                                    <Download className="w-4 h-4" />
                                                </a>
                                                <button className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-sm text-slate-200 truncate mb-1" title={file.name}>{file.name}</h3>
                                        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                                            <span>{(file.size_bytes / 1024).toFixed(1)} KB</span>
                                            <span className="uppercase">{file.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
