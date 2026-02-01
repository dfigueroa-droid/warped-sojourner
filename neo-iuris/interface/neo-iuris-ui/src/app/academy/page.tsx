'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, BookOpen, GraduationCap, FileText } from 'lucide-react';
import StitchInterface from '@/components/StitchInterface';

export default function AcademyPage() {
    const [activeModule, setActiveModule] = useState('BASICS');

    const tutorials = {
        BASICS: {
            title: "System Fundamentals",
            description: "Learn how to navigate the Neo-Iuris Topological Interface.",
            videos: [
                { id: 1, title: "Navigating the Stitch Graph", duration: "04:20" },
                { id: 2, title: "Identity & Roles Explained", duration: "03:15" },
            ]
        },
        FORENSIC: {
            title: "Advanced Forensics",
            description: "Mastering the Chain of Custody tools.",
            videos: [
                { id: 3, title: "Uploading Evidence Correctly", duration: "08:10" },
                { id: 4, title: "Interpreting Probability Scores", duration: "05:45" },
            ]
        }
    };

    return (
        <div className="min-h-screen p-8 pb-32">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Neo-Iuris Academy
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* MENU */}
                <div className="space-y-4">
                    <div className="bg-neo-panel border border-white/5 rounded-2xl p-6">
                        <GraduationCap className="w-8 h-8 text-amber-400 mb-4" />
                        <h2 className="text-lg font-bold mb-4">Training Modules</h2>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setActiveModule('BASICS')}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors border ${activeModule === 'BASICS' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'border-transparent hover:bg-white/5'}`}
                            >
                                1. System Fundamentals
                            </button>
                            <button
                                onClick={() => setActiveModule('FORENSIC')}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors border ${activeModule === 'FORENSIC' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'border-transparent hover:bg-white/5'}`}
                            >
                                2. Forensic Mastery
                            </button>
                            <button className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed border border-transparent">
                                3. Crisis Management (Locked)
                            </button>
                        </div>
                    </div>
                </div>

                {/* CONTENT VIEWER */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-black/40 border border-amber-500/30 rounded-3xl p-8 min-h-[500px]">
                        {/* @ts-ignore */}
                        <h2 className="text-2xl font-bold text-white mb-2">{tutorials[activeModule].title}</h2>
                        {/* @ts-ignore */}
                        <p className="text-slate-400 mb-8">{tutorials[activeModule].description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* @ts-ignore */}
                            {tutorials[activeModule].videos.map((vid) => (
                                <div key={vid.id} className="group relative bg-slate-900/50 rounded-xl overflow-hidden border border-white/5 hover:border-amber-400/50 transition-all cursor-pointer">
                                    <div className="aspect-video bg-black flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                                        <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-amber-400 transition-all group-hover:scale-110" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-sm text-slate-200">{vid.title}</h3>
                                        <span className="text-xs text-slate-500 font-mono">{vid.duration} mins</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-amber-900/10 border border-amber-500/10 rounded-xl flex gap-4">
                            <BookOpen className="w-6 h-6 text-amber-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm text-amber-400">Documentation Library</h4>
                                <p className="text-xs text-slate-400 mt-1">
                                    Access detailed PDF manuals for this module.
                                </p>
                                <button className="mt-3 text-xs flex items-center gap-1 text-white hover:underline">
                                    <FileText className="w-3 h-3" /> Download Manual (v8.0)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
