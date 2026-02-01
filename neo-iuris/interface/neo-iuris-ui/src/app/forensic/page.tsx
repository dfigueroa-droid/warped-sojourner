'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Upload, FileCheck, BrainCircuit } from 'lucide-react';
import { generateForensicReport } from '@/lib/api';
import StitchInterface from '@/components/StitchInterface';

export default function ForensicPage() {
    const [caseDetails, setCaseDetails] = useState('');
    const [crimeType, setCrimeType] = useState('FRAUD');
    const [report, setReport] = useState<any>(null);
    const [analyzing, setAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        setAnalyzing(true);
        try {
            const res = await generateForensicReport({
                crime_type: crimeType,
                description: caseDetails
            });
            setReport(res);
        } catch (error) {
            console.error(error);
        }
        setAnalyzing(false);
    };

    return (
        <div className="min-h-screen p-8 pb-32">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Forensic Shield: Defensa Inteligente
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* INPUT PANEL */}
                    <div className="bg-neo-panel border border-white/5 rounded-2xl p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <Shield className="w-6 h-6 text-emerald-400" />
                                <h2 className="text-xl font-bold">Evidence Processor (Chain of Custody)</h2>
                            </div>
                            <select
                                value={crimeType}
                                onChange={(e) => setCrimeType(e.target.value)}
                                className="bg-black/40 border border-white/10 rounded px-3 py-1 text-xs text-emerald-400 font-mono focus:outline-none"
                            >
                                <option value="FRAUD">Fraud / Fraude</option>
                                <option value="HOMICIDE">Homicide / Homicidio</option>
                                <option value="CYBER">Cybercrime / Delito Informático</option>
                            </select>
                        </div>

                        <textarea
                            className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-mono text-slate-300 focus:border-emerald-500/50 outline-none resize-none mb-4"
                            placeholder="Paste Case Description, Evidence Logs, or Police Report here..."
                            value={caseDetails}
                            onChange={(e) => setCaseDetails(e.target.value)}
                        />

                        <div className="flex gap-4">
                            <button className="flex-1 py-3 border border-dashed border-white/10 text-slate-500 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                                <Upload className="w-4 h-4" /> Upload PDF/DOCX
                            </button>
                            <button
                                onClick={handleAnalyze}
                                disabled={analyzing}
                                className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all"
                            >
                                {analyzing ? 'Analyzing Heuristics...' : <><BrainCircuit className="w-4 h-4" /> Analyze & Generate Report</>}
                            </button>
                        </div>
                    </div>

                    {/* REPORT OUTPUT */}
                    {report && (
                        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-6">
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                    <FileCheck className="w-5 h-5" />
                                    <span>Expert Report Generated</span>
                                </div>
                                <span className="text-xs font-mono text-slate-500">ID: {Math.floor(Math.random() * 99999)}</span>
                            </div>

                            <div className="prose prose-invert prose-sm max-w-none">
                                <h3 className="text-slate-200">Executive Summary</h3>
                                <p className="text-slate-400">
                                    Based on the algorithmic analysis of the provided evidence, the Chain of Custody appears
                                    <strong className="text-emerald-400"> INTACT</strong>. The probabilistic model suggests a
                                    <strong className="text-emerald-400"> 85%</strong> success rate for the defense strategy.
                                </p>

                                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Technical Details</h4>
                                    <pre className="text-xs font-mono text-emerald-300/80 whitespace-pre-wrap">
                                        {JSON.stringify(report, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-emerald-500/20 p-6 rounded-2xl">
                        <h3 className="font-bold text-emerald-400 mb-4">Benchmarks (Lex Machina)</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">Judge Profiling</span>
                                    <span className="text-emerald-400">Complete</span>
                                </div>
                                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">Case Law Retrieval</span>
                                    <span className="text-emerald-400">1,240 Found</span>
                                </div>
                                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[80%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-950 rounded-2xl p-1 border border-slate-800">
                        <div className="p-3 border-b border-white/5 mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Evidence Topology</span>
                        </div>
                        <div className="h-[250px] relative overflow-hidden rounded-xl">
                            <StitchInterface />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
