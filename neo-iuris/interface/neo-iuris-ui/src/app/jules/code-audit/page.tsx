'use client';

import React, { useState } from 'react';
import { FileCode, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

export default function JulesCodeAuditPage() {
    const [auditStatus, setAuditStatus] = useState('IDLE'); // IDLE, RUNNING, COMPLETE
    const [repoUrl, setRepoUrl] = useState('');

    const runAudit = () => {
        setAuditStatus('RUNNING');
        setTimeout(() => {
            setAuditStatus('COMPLETE');
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-purple-500/30">

            {/* Header Panel */}
            <header className="mb-8 flex justify-between items-center border-b border-purple-500/20 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 flex items-center gap-3">
                        <Cpu className="text-purple-400" />
                        JULES: CODE AUDIT
                    </h1>
                    <p className="text-slate-500 mt-2 font-mono text-sm">Autonomous Logic & Vulnerability Scanner</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded flex flex-col items-end">
                        <span className="text-xs text-slate-400">Jules Agent Status</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            ONLINE
                        </span>
                    </div>
                </div>
            </header>

            {/* Control Panel */}
            <section className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-8 flex gap-4 items-end">
                <div className="flex-1">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Repositorio o Archivo Fuente:</label>
                    <div className="flex bg-slate-950 border border-slate-800 rounded px-3 py-2">
                        <FileCode size={18} className="text-slate-500 mr-2" />
                        <input
                            type="text"
                            placeholder="https://github.com/..."
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            className="bg-transparent text-sm w-full focus:outline-none text-white placeholder-slate-600 font-mono"
                        />
                    </div>
                </div>
                <div className="w-64">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Tipo de Auditoría:</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none">
                        <option>Vulnerabilidad Crítica</option>
                        <option>Cumplimiento de Licencias</option>
                        <option>Optimización Lógica</option>
                    </select>
                </div>
                <div className="w-48">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Ref. Caso:</label>
                    <input
                        type="text"
                        placeholder="CASO-2025-..."
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none placeholder-slate-600"
                    />
                </div>
                <button
                    onClick={runAudit}
                    disabled={auditStatus === 'RUNNING'}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-2 px-6 rounded shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {auditStatus === 'RUNNING' ? 'Analizando...' : 'Ejecutar Auditoría'}
                </button>
            </section>

            {/* Main Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">

                {/* Code Viewer */}
                <div className="lg:col-span-3 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col">
                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-mono text-slate-400">smart_contract_v2.py</span>
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Python</span>
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto text-slate-300 relative">
                        {/* Mock Code with Highlight */}
                        <div className="opacity-50">1  import os</div>
                        <div className="opacity-50">2  import sys</div>
                        <div className="opacity-50">3  </div>
                        <div className="opacity-50">4  def execute_transfer(amount, recipient):</div>
                        <div className={`${auditStatus === 'COMPLETE' ? 'bg-rose-900/30 text-rose-200 w-full' : ''}`}>
                            5      os.system(f"echo Sending {amount} to {recipient}")  {/* VULNERABLE */}
                        </div>
                        <div className="opacity-50">6      return "DONE"</div>
                        <div className="opacity-50">7  </div>

                        {auditStatus === 'COMPLETE' && (
                            <div className="absolute top-24 left-1/2 bg-black/80 backdrop-blur border border-rose-500 p-3 rounded shadow-xl text-xs w-96 transform -translate-x-12">
                                <strong className="text-rose-400 flex items-center gap-1"><ShieldAlert size={14} /> ALERT: Code Injection Risk</strong>
                                <p className="mt-1 text-slate-300">Using `os.system` with unsanitized input enables Remote Code Execution (RCE). Use `subprocess.run` instead.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Jules Audit Log */}
                <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-4 flex flex-col">
                    <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                        <Cpu size={18} /> Análisis XAI
                    </h3>

                    {auditStatus === 'IDLE' && (
                        <div className="text-center text-slate-600 mt-20">
                            Esperando ejecución...
                        </div>
                    )}

                    {auditStatus === 'RUNNING' && (
                        <div className="space-y-2 animate-pulse">
                            <div className="h-2 bg-slate-800 rounded w-3/4"></div>
                            <div className="h-2 bg-slate-800 rounded w-1/2"></div>
                            <div className="h-2 bg-slate-800 rounded w-5/6"></div>
                        </div>
                    )}

                    {auditStatus === 'COMPLETE' && (
                        <div className="space-y-4 overflow-y-auto">
                            <div className="bg-slate-900 border-l-2 border-rose-500 p-3 rounded">
                                <span className="text-xs font-bold text-rose-400">CRITICAL FINDING</span>
                                <p className="text-xs text-slate-300 mt-1">RCE Vulnerability detected on line 5.</p>
                            </div>
                            <div className="p-3 bg-purple-900/10 border border-purple-500/20 rounded">
                                <span className="text-xs font-bold text-purple-300">Recomendación Jules</span>
                                <p className="text-xs text-slate-400 mt-1">Refactorizar usando librerías seguras. Se ha generado un parche automático.</p>
                                <button className="mt-2 text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded w-full">
                                    Aplicar Parche Seguro
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
