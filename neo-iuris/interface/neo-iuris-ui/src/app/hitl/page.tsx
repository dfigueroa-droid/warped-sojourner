import React from 'react';

const VALIDATION_QUEUE = [
    {
        id: 'TASK-001',
        module: 'AI Judge',
        risk: 'HIGH',
        description: 'Predicción de Fallo del 92% en Caso Penal 45/2025. Requiere validación de jurisprudencia citada.',
        status: 'PENDING',
        time_left: '2h 15m'
    },
    {
        id: 'TASK-002',
        module: 'Forensic Shield',
        risk: 'CRITICAL',
        description: 'Anomalía detectada en Cadena de Custodia (Hash Mismatch). Confirmar ruptura.',
        status: 'URGENT',
        time_left: '45m'
    },
    {
        id: 'TASK-003',
        module: 'Contract Engine',
        risk: 'LOW',
        description: 'Revisión de Cláusula de Rescisión generada por Agente de Negociación.',
        status: 'PENDING',
        time_left: '4h 00m'
    }
];

export default function HITLPortalPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
            <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-6">
                <div>
                    <div className="text-xs font-mono text-emerald-500 mb-2">NEO-IURIS TRUST LAYER</div>
                    <h1 className="text-3xl font-bold text-white">
                        Portal de Certificación Humana (HITL)
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Valide las decisiones críticas de los agentes autónomos.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-500">EXPERT RATING</div>
                    <div className="text-2xl font-bold text-emerald-400">98.5%</div>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Task Queue */}
                <section className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-white mb-4">Cola de Validación</h2>
                    {VALIDATION_QUEUE.map(task => (
                        <div key={task.id} className="bg-slate-900 border border-slate-800 p-6 rounded-lg flex gap-4 hover:border-slate-600 transition-colors">
                            <div className={`w-1 h-full rounded-full ${task.risk === 'CRITICAL' ? 'bg-rose-500' : task.risk === 'HIGH' ? 'bg-orange-500' : 'bg-cyan-500'}`}></div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-mono text-xs text-slate-500">{task.id} // {task.module}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${task.risk === 'CRITICAL' ? 'bg-rose-900/30 text-rose-400' : 'bg-slate-800 text-slate-300'}`}>
                                        {task.risk}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-white mb-4">
                                    {task.description}
                                </p>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded transition-colors">
                                        ✅ Validar
                                    </button>
                                    <button className="px-4 py-2 bg-rose-900/50 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold rounded transition-colors">
                                        ❌ Rechazar
                                    </button>
                                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded transition-colors">
                                        🔍 Investigar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Stats & Expert Profile */}
                <aside className="space-y-6">
                    <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Sus Métricas</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-300">Precisión (Benchmark)</span>
                                    <span className="text-emerald-400">99.2%</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 w-[99.2%] h-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-300">Tiempo de Respuesta</span>
                                    <span className="text-cyan-400">12m</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-cyan-500 w-[85%] h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 p-6 rounded-lg border border-indigo-800/50 text-indigo-100 italic text-sm">
                        "La Inteligencia Artificial propone, el Experto Humano dispone. Su juicio es la última línea de defensa de la justicia."
                        <div className="text-right mt-2 text-indigo-400 font-bold not-italic">- Protocolo Neo-Iuris</div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
