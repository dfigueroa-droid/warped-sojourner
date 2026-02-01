import React from 'react';

const CLIENTS = [
    { id: 'C-001', name: 'FarmaGlobal S.A.', risk: 'LOW', assets: 15 },
    { id: 'C-002', name: 'MedTech Imports', risk: 'HIGH', assets: 4 }
];

const ALERTS = [
    { id: 1, type: 'EXPIRY', msg: 'Registro Sanitario RS-001 vence en 18 meses. Iniciar Prórroga.' },
    { id: 2, type: 'AUDIT', msg: 'Cliente MedTech solicita Auditoría NOM-241.' }
];

export default function CRMPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                        SANITARY CRM 360
                    </h1>
                    <p className="text-slate-400 mt-2">Gestión de Activos Regulatorios y Relaciones</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-500">CLIENTES ACTIVOS</div>
                    <div className="text-2xl font-bold text-white">142</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Alerts Panel */}
                <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-rose-400 mb-4">🚨 Alertas Regulatorias</h2>
                    <div className="space-y-4">
                        {ALERTS.map(alert => (
                            <div key={alert.id} className="bg-slate-800 p-4 rounded border-l-4 border-rose-500">
                                <div className="text-xs font-bold text-rose-300 mb-1">{alert.type}</div>
                                <p className="text-sm text-slate-300">{alert.msg}</p>
                                <button className="mt-3 text-xs bg-rose-900/50 hover:bg-rose-900 text-rose-200 px-3 py-1 rounded transition-colors">
                                    Actuar Ahora
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Client Portfolio */}
                <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">🏢 Cartera de Clientes</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 border-b border-slate-700">
                                    <th className="pb-3 pl-2">Cliente</th>
                                    <th className="pb-3">Riesgo</th>
                                    <th className="pb-3">Activos</th>
                                    <th className="pb-3 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {CLIENTS.map(client => (
                                    <tr key={client.id} className="group hover:bg-slate-800/50 transition-colors">
                                        <td className="py-4 pl-2 font-medium text-white">{client.name}</td>
                                        <td className="py-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${client.risk === 'HIGH' ? 'bg-orange-900/30 text-orange-400' : 'bg-emerald-900/30 text-emerald-400'}`}>
                                                {client.risk}
                                            </span>
                                        </td>
                                        <td className="py-4 text-slate-400">{client.assets} Regs.</td>
                                        <td className="py-4 text-right">
                                            <button className="text-cyan-500 hover:text-cyan-400 text-sm font-bold">
                                                Ver Perfil &rarr;
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}
