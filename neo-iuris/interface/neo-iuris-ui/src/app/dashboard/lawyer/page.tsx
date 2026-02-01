"use client";

import React from 'react';

// Mock Data: New Leads (Uber Style)
const NEW_LEADS = [
    {
        id: "LEAD-992",
        service: "Divorcio Incausado",
        location: "CDMX - Benito Juárez",
        fee: "$4,250.00 MXN (Neto)",
        timeLeft: "04:59"
    }
];

// Mock Data: Active Cases
const MY_CASES = [
    {
        id: "CASE-2025-8821",
        client: "Daniel Figueroa",
        status: "EN_PROCESO",
        actionRequired: "Presentar Demanda",
        escrowStatus: "LOCKED 🔒"
    }
];

export default function LawyerDashboard() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
            <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Panel de Socio <span className="text-purple-500">PRO</span>
                    </h1>
                    <p className="text-gray-400">Bufete Jurídico Digital</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                        En Línea 🟢
                    </div>
                </div>
            </header>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="p-6 bg-slate-800 rounded-xl border border-white/5">
                    <div className="text-gray-400 text-sm">Ingresos Mes Actual</div>
                    <div className="text-3xl font-bold text-white">$24,500</div>
                    <div className="text-green-400 text-xs mt-1">↑ 12% vs mes anterior</div>
                </div>
                <div className="p-6 bg-slate-800 rounded-xl border border-white/5">
                    <div className="text-gray-400 text-sm">Retenciones SAT (Mes)</div>
                    <div className="text-2xl font-bold text-red-300">-$245.00</div>
                    <div className="text-gray-500 text-xs mt-1">1% ISR (Plataformas)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Lead Inbox */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        📨 Nuevas Oportunidades
                    </h2>

                    {NEW_LEADS.map(lead => (
                        <div key={lead.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 bg-red-500 text-white text-xs font-bold rounded-bl-lg">
                                Expira: {lead.timeLeft}
                            </div>
                            <h3 className="text-xl font-bold mb-1">{lead.service}</h3>
                            <p className="text-gray-300 mb-4 text-sm">{lead.location}</p>
                            <div className="text-2xl font-bold text-green-400 mb-6">{lead.fee}</div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
                                    Ignorar
                                </button>
                                <button className="py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold shadow-lg transition-colors">
                                    Aceptar Caso
                                </button>
                            </div>
                        </div>
                    ))}

                    {NEW_LEADS.length === 0 && (
                        <div className="p-8 text-center text-gray-500 bg-slate-800/50 rounded-xl border border-dashed border-gray-700">
                            No hay leads nuevos por el momento.
                        </div>
                    )}
                </div>

                {/* Right Col: Active Cases */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-6">🗂️ Mis Casos Activos</h2>
                    <div className="bg-slate-800 rounded-xl overflow-hidden border border-white/5">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 text-gray-400 text-sm uppercase">
                                <tr>
                                    <th className="p-4">ID Caso</th>
                                    <th className="p-4">Cliente</th>
                                    <th className="p-4">Estatus</th>
                                    <th className="p-4">Escrow</th>
                                    <th className="p-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {MY_CASES.map(c => (
                                    <tr key={c.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="p-4 font-mono text-sm text-purple-300">{c.id}</td>
                                        <td className="p-4">{c.client}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs">
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-400">{c.escrowStatus}</td>
                                        <td className="p-4">
                                            <button className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded hover:bg-blue-600/30 transition-colors text-sm">
                                                Gestionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
