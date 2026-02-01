'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, FileText, Activity, ArrowRight, CheckCircle, Search, User, Lock, Server, BarChart3, Database, Cpu, Microscope } from 'lucide-react';
import { fetchSystemStatus, validateTransparency } from '@/lib/api';
import StitchInterface from '@/components/StitchInterface';

type UserRole = 'USER' | 'ADMIN';

export default function Home() {
    const [systemStatus, setSystemStatus] = useState<any>({ status: 'LOADING...' });
    const [transparencyQuery, setTransparencyQuery] = useState('');
    const [validationResult, setValidationResult] = useState<any>(null);
    const [forensicReport, setForensicReport] = useState<string | null>(null);

    // Role-Based Access Control State
    const [userRole, setUserRole] = useState<UserRole>('USER');

    useEffect(() => {
        fetchSystemStatus().then(setSystemStatus);
    }, []);

    const handleSearch = async () => {
        if (!transparencyQuery) return;
        const result = await validateTransparency(transparencyQuery);
        setValidationResult(result);
    };

    const handleForensicSim = async () => {
        setForensicReport("GENERATING SIMULATION...");
        setTimeout(() => setForensicReport("FORENSIC REPORT [ID: 9928]: Evidence Chain Validated. Jurisdiction: Federal."), 1500);
    };

    return (
        <div className="flex flex-col gap-10 min-h-screen">
            {/* Top Bar with Role Switcher */}
            <header className="flex justify-between items-center py-4 px-6 bg-black/20 border-b border-white/5 backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neo-accent to-blue-600 flex items-center justify-center">
                        <span className="font-bold text-white text-lg">N</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight">Neo-Iuris <span className="text-neo-accent font-light">v8.0</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-full p-1">
                        <button
                            onClick={() => setUserRole('USER')}
                            className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${userRole === 'USER' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            User View
                        </button>
                        <button
                            onClick={() => setUserRole('ADMIN')}
                            className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${userRole === 'ADMIN' ? 'bg-neo-accent text-black shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Admin View
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 border-l border-white/10 pl-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        {userRole === 'ADMIN' ? 'ROOT ACCESS' : 'CONNECTED'}
                    </div>
                </div>
            </header>

            <div className="px-6 pb-20 flex flex-col gap-12">
                <div className="text-center py-10 relative">
                    {/* Background decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 relative z-10">
                        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            Consultoría Forense
                        </span>
                        <br />
                        <span className="text-neo-accent font-light italic text-4xl md:text-5xl">Preventiva</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10 font-light">
                        Operationalizing Vision 2025. Integrating Regulatory Management, Forensic Defense, and Corporate Compliance into a single ecosystem.
                    </p>

                    {/* Transparency Quick Check */}
                    <div className="mt-10 max-w-xl mx-auto relative group z-20">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-2 pl-6 shadow-2xl">
                            <input
                                type="text"
                                placeholder="Verify Procedure (Transparency Engine)..."
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500 font-mono text-sm"
                                value={transparencyQuery}
                                onChange={(e) => setTransparencyQuery(e.target.value)}
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-900/50"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {validationResult && (
                        <div className="mt-6 max-w-md mx-auto bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-bold text-sm tracking-wide">OFFICIAL SOURCE VERIFIED</span>
                            </div>
                            <div className="text-xs text-slate-300 font-mono bg-black/40 p-3 rounded-lg border border-white/5 overflow-auto max-h-40">
                                {JSON.stringify(validationResult.validation_matrix, null, 2)}
                            </div>
                        </div>
                    )}
                </div>

                {/* STITCH TOPOLOGICAL INTERFACE */}
                <div className="w-full">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-neo-accent/10 rounded-lg">
                                <Activity className="w-5 h-5 text-neo-accent" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white leading-none">
                                    Stitch Topological Engine
                                </h2>
                                <span className="text-xs text-slate-500 font-mono tracking-wider">LIVE NODE GRAPH v8.0</span>
                            </div>
                        </div>
                        {userRole === 'ADMIN' && (
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-slate-800 text-xs rounded border border-slate-700 hover:bg-slate-700 text-slate-300 transition-colors">Force Refresh</button>
                                <button className="px-3 py-1 bg-slate-800 text-xs rounded border border-slate-700 hover:bg-slate-700 text-slate-300 transition-colors">Add Node +</button>
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                        <StitchInterface />
                    </div>
                </div>

                {/* Main App Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* App 1: Gestor Regulatorio */}
                    <div className="group relative bg-neo-panel border border-white/5 rounded-3xl p-8 hover:border-neo-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <FileText className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white">Gestor Regulatorio</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            "Cash Cow" automation for registries, licenses, and renewals. Automated form filling via RPA.
                        </p>
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Success Rate</span>
                                <span className="text-lg font-mono text-emerald-400">98.2%</span>
                            </div>
                            <Link href="/regulatory" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neo-accent hover:text-black transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* App 2: Forensic Shield */}
                    <div className="group relative bg-gradient-to-b from-slate-900 to-black border border-white/10 rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-500 shadow-2xl hover:shadow-emerald-900/20 col-span-1 md:col-span-1 ring-1 ring-emerald-500/20">
                        <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                            PREMIUM
                        </div>
                        <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Shield className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white">Forensic Shield</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            Expert witness preparation and evidence integrity verification. Deep heuristic analysis.
                        </p>

                        <div className="space-y-3 mb-8">
                            <button onClick={handleForensicSim} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-2">
                                <Activity className="w-4 h-4" /> Run Simulation
                            </button>
                        </div>

                        {forensicReport && (
                            <div className="mb-6 p-3 bg-black/60 rounded-lg border border-emerald-500/30 animate-pulse">
                                <p className="text-xs font-mono text-emerald-300 leading-tight">{forensicReport}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Defense Status</span>
                                <span className="text-lg font-mono text-emerald-400">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* App 3: Compliance Guardian */}
                    <div className="group relative bg-neo-panel border border-white/5 rounded-3xl p-8 hover:border-neo-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white">Compliance Guardian</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            Art. 421 CNPP Corporate Defense. Risk mapping for hospitals and pharma sectors.
                        </p>
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Risk Score</span>
                                <span className="text-lg font-mono text-emerald-400">LOW (12/100)</span>
                            </div>
                            <Link href="/compliance" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neo-accent hover:text-black transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* App 4: Jules Code Audit */}
                    <div className="group relative bg-neo-panel border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)]">
                        <div className="w-14 h-14 bg-purple-900/30 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-purple-500/30">
                            <Cpu className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white">Jules: Code Audit</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            Autonomous logic scanner and vulnerability detection via Google Jules Agent.
                        </p>
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Agent Status</span>
                                <span className="text-lg font-mono text-emerald-400 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ONLINE
                                </span>
                            </div>
                            <Link href="/jules/code-audit" className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all border border-purple-500/30">
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* App 5: Jules Bio-Forense */}
                    <div className="group relative bg-neo-panel border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]">
                        <div className="w-14 h-14 bg-cyan-900/30 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/30">
                            <Microscope className="w-7 h-7" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white">Jules: Bio-Forense</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            3D Molecular Analysis and Chemical Intelligence via Google Labs.
                        </p>
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Labs Link</span>
                                <span className="text-lg font-mono text-cyan-400">ACTIVE</span>
                            </div>
                            <Link href="/jules/forensic-bio" className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all border border-cyan-500/30">
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ADMIN DASHBOARD SECTION (Conditional Render) */}
                {userRole === 'ADMIN' && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px bg-white/10 flex-1"></div>
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-black px-3 py-1 rounded border border-slate-800">
                                Admin / DevOps Console
                            </span>
                            <div className="h-px bg-white/10 flex-1"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Metric 1 */}
                            <div className="bg-slate-900/50 border border-red-500/20 rounded-xl p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-red-500/10 rounded">
                                        <Server className="w-4 h-4 text-red-400" />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono">CPU LOAD</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">12%</div>
                                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-[12%]"></div>
                                </div>
                            </div>

                            {/* Metric 2 */}
                            <div className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-blue-500/10 rounded">
                                        <Database className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono">DB LATENCY</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">24ms</div>
                                <div className="flex gap-1 mt-2">
                                    <div className="h-4 w-1 bg-blue-500/80 rounded-sm"></div>
                                    <div className="h-4 w-1 bg-blue-500/60 rounded-sm"></div>
                                    <div className="h-4 w-1 bg-blue-500/40 rounded-sm"></div>
                                    <div className="h-4 w-1 bg-blue-500/20 rounded-sm"></div>
                                </div>
                            </div>

                            {/* Metric 3 */}
                            <div className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-purple-500/10 rounded">
                                        <Shield className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono">TOKEN AUTH</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">VALID</div>
                                <div className="text-xs text-slate-500 truncate">SHA256: e3b0c44...</div>
                            </div>

                            {/* Metric 4 */}
                            <div className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-amber-500/10 rounded">
                                        <BarChart3 className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono">STITCH NODES</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">3 <span className="text-xs text-slate-500 font-normal">Active</span></div>
                            </div>
                        </div>

                        <div className="mt-6 bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-xs text-slate-400">
                            <div className="mb-2 text-slate-500 uppercase font-bold">System Logs (Live Stream)</div>
                            <div className="space-y-1">
                                <p><span className="text-emerald-500">[19:00:22]</span> API Gateway Handshake <span className="text-blue-500">ACK</span></p>
                                <p><span className="text-emerald-500">[19:00:23]</span> Stitch Environment Initialized (Topology v8)</p>
                                <p><span className="text-emerald-500">[19:00:25]</span> Identity: dfigueroa.juridico@gmail.com authenticated.</p>
                                <p><span className="text-emerald-500">[19:00:45]</span> User switched to ADMIN view.</p>
                            </div>
                        </div>
                    </div>
                )}


                <div className="mt-10 bg-neo-panel/30 border border-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Ecosystem Status</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-black/20 p-3 rounded-lg">
                            <div className="text-xs text-slate-500 uppercase">Identity Core</div>
                            <div className="text-neo-accent font-mono text-sm">dfigueroa.juridico (ROOT)</div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg">
                            <div className="text-xs text-slate-500 uppercase">Global Nodes</div>
                            <div className="text-emerald-400 font-mono text-sm">5/5 Active</div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg">
                            <div className="text-xs text-slate-500 uppercase">API Gateway</div>
                            <div className={`font-mono text-sm ${systemStatus.status === 'ONLINE' ? 'text-blue-400' : 'text-red-400'}`}>
                                {systemStatus.status || systemStatus.detail || "OFFLINE"}
                            </div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg">
                            <div className="text-xs text-slate-500 uppercase">System Time</div>
                            <div className="text-slate-300 font-mono text-sm">{new Date().toISOString().split('T')[0]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
