"use client";

import React from 'react';

// Mock Data: Active Cases
const MY_CASES = [
    {
        id: "CASE-2025-8821",
        type: "Divorcio Incausado",
        status: "EN_PROCESO",
        lawyer: "Lic. Ana Torres",
        lastUpdate: "Hace 2 horas",
        progress: 50,
        steps: [
            { name: "Solicitud", completed: true },
            { name: "Pago Garantía", completed: true },
            { name: "Asignación", completed: true },
            { name: "Demanda Admitida", completed: false },
            { name: "Sentencia", completed: false }
        ]
    }
];

export default function ClientDashboard() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
            <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Mi Escritorio Legal
                    </h1>
                    <p className="text-gray-400">Bienvenido, Daniel.</p>
                </div>
                <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-sm">
                    🔔 Notificaciones (2)
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="text-gray-400 mb-1">Casos Activos</div>
                    <div className="text-3xl font-bold text-white">1</div>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="text-gray-400 mb-1">Documentos Pendientes</div>
                    <div className="text-3xl font-bold text-yellow-400">1</div>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <div className="text-gray-400 mb-1">Próxima Audiencia</div>
                    <div className="text-lg font-bold text-purple-400">Por definir</div>
                </div>
            </div>

            {/* Active Cases List */}
            <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    📁 Expedientes en Curso
                </h2>

                {MY_CASES.map(caseItem => (
                    <div key={caseItem.id} className="bg-slate-800/50 rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all shadow-lg">

                        {/* Header */}
                        <div className="flex flex-wrap justify-between items-start mb-8 gap-4">
                            <div>
                                <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded mb-2 inline-block">
                                    {caseItem.id}
                                </span>
                                <h3 className="text-2xl font-bold">{caseItem.type}</h3>
                                <p className="text-gray-400 text-sm mt-1">Abogado: <span className="text-white">{caseItem.lawyer}</span></p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-400">Última actualización</div>
                                <div className="text-white font-medium">{caseItem.lastUpdate}</div>
                            </div>
                        </div>

                        {/* Timeline / Progress */}
                        <div className="relative mb-8">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-700">
                                <div style={{ width: `${caseItem.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-1000"></div>
                            </div>
                            <div className="flex justify-between mt-4 text-sm">
                                {caseItem.steps.map((step, idx) => (
                                    <div key={idx} className={`flex flex-col items-center ${step.completed ? 'text-purple-400' : 'text-gray-600'}`}>
                                        <div className={`w-4 h-4 rounded-full mb-2 ${step.completed ? 'bg-purple-500' : 'bg-slate-700'}`}></div>
                                        <span>{step.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                📤 Subir Acta de Matrimonio
                            </button>
                            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-colors">
                                💬 Mensaje al Abogado
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
