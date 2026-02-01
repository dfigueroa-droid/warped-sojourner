import React from 'react';
import StitchXR from '@/components/StitchXR';

export default function StitchWarRoomPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                        WAR ROOM 3D
                    </h1>
                    <p className="text-slate-400 mt-2">Visualización Topológica de Riesgos y Activos</p>
                </div>
                <div className="px-4 py-2 bg-rose-900/20 border border-rose-500 text-rose-400 rounded-full text-sm font-bold animate-pulse">
                    DEFCON 3
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Main XR Viewport */}
                <section className="lg:col-span-3">
                    <StitchXR />
                </section>

                {/* Tactical Side Panel */}
                <aside className="space-y-6">
                    <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-emerald-400 mb-4 border-b border-slate-700 pb-2">
                            Amenazas Activas
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex items-center justify-between">
                                <span>Contrato A (Expiring)</span>
                                <span className="text-rose-500 font-mono">HIGH</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Compliance COFEPRIS</span>
                                <span className="text-yellow-500 font-mono">MED</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>Firma Pendiente (PQC)</span>
                                <span className="text-cyan-500 font-mono">LOW</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-purple-400 mb-4 border-b border-slate-700 pb-2">
                            Acciones Tácticas
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="px-3 py-2 bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-700 rounded text-xs transition-colors">
                                Simular Impacto
                            </button>
                            <button className="px-3 py-2 bg-rose-900/30 hover:bg-rose-900/50 border border-rose-700 rounded text-xs transition-colors">
                                Protocolo Killswitch
                            </button>
                            <button className="col-span-2 px-3 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-700 rounded text-xs transition-colors">
                                Contactar Experto HITL
                            </button>
                        </div>
                    </div>
                </aside>

            </main>
        </div>
    );
}
