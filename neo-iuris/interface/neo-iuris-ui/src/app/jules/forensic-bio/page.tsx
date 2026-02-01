'use client';

import React, { useState } from 'react';
import { Microscope, Activity, AlertTriangle, FileText } from 'lucide-react';

export default function JulesForensicBioPage() {
    const [queryStatus, setQueryStatus] = useState('IDLE');

    const handleQuery = () => {
        setQueryStatus('SEARCHING');
        setTimeout(() => {
            setQueryStatus('FOUND');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-cyan-500/30">

            {/* Header */}
            <header className="mb-8 border-b border-cyan-900/50 pb-6">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-3">
                    <Microscope className="text-cyan-400" />
                    JULES: BIO-FORENSIC
                </h1>
                <p className="text-slate-500 mt-2 font-mono text-sm">Molecular Analysis & Chemical Intelligence</p>
            </header>

            {/* Query Bar */}
            <div className="flex gap-4 mb-8 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Buscar Sustancia (ej. Fentanilo, Ácido Sulfúrico...)"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                </div>
                <select className="w-48 bg-slate-950 border border-slate-700 rounded text-slate-300 px-4">
                    <option>Toxicidad</option>
                    <option>Regulación COFEPRIS</option>
                    <option>Uso Industrial</option>
                </select>
                <button
                    onClick={handleQuery}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 rounded flex items-center gap-2 shadow-lg shadow-cyan-900/20"
                >
                    <Activity size={18} />
                    Consultar
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 3D Viewer Mockup */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl h-[500px] relative overflow-hidden flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Fentanyl_3D_ball.png/640px-Fentanyl_3D_ball.png')] bg-contain bg-no-repeat bg-center">
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-900">
                        MOLECULE_VIEWER_WEBGL_2.0
                    </div>
                    {queryStatus === 'SEARCHING' && (
                        <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center z-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                        </div>
                    )}
                </div>

                {/* Results Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col h-[500px]">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Resultados Jules</h2>

                    {queryStatus === 'IDLE' && <p className="text-slate-500 italic">Ingrese una sustancia para iniciar.</p>}

                    {queryStatus === 'FOUND' && (
                        <div className="space-y-6 overflow-y-auto pr-2">

                            {/* General Info */}
                            <div>
                                <h3 className="text-sm font-bold text-cyan-400 uppercase mb-2">Identificación</h3>
                                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm">
                                    <p><span className="text-slate-500">IUPAC:</span> N-(1-(2-phenylethyl)-4-piperidinyl)-N-phenylpropanamide</p>
                                    <p><span className="text-slate-500">CAS:</span> 437-38-7</p>
                                    <p><span className="text-slate-500">Masa Molar:</span> 336.471 g/mol</p>
                                </div>
                            </div>

                            {/* Regulatory Alert */}
                            <div className="bg-orange-900/20 border border-orange-500/50 p-3 rounded">
                                <div className="flex items-center gap-2 mb-1">
                                    <AlertTriangle size={16} className="text-orange-500" />
                                    <span className="font-bold text-orange-400 text-sm">Alerta Controlada</span>
                                </div>
                                <p className="text-xs text-orange-200/80">Listada en Grupo I (Estupefacientes) de la Ley General de Salud (México).</p>
                            </div>

                            {/* Jules XAI */}
                            <div>
                                <h3 className="text-sm font-bold text-purple-400 uppercase mb-2 flex items-center gap-2">
                                    <FileText size={14} /> Análisis Legal/Forense
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Jules detecta alta probabilidad de trazabilidad inconsistente en el lote consultado. La estructura molecular sugiere precursores no estándar (Ruta Siegfried). Se recomienda solicitar Cadena de Custodia Química completa.
                                </p>
                            </div>

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
