import React from 'react';

const TASKS = [
    { id: 1, name: 'Armado de Dossier', start: '2025-01-10', end: '2025-01-25', user: 'Ing. Pedro' },
    { id: 2, name: 'Ingreso COFEPRIS', start: '2025-01-26', end: '2025-01-27', user: 'Lic. Ana' },
    { id: 3, name: 'Espera Legal (Prevención)', start: '2025-01-28', end: '2025-03-08', user: 'COFEPRIS', isWait: true }
];

export default function ERPPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    LEGAL ERP: GANTT TÁCTICO
                </h1>
                <p className="text-slate-400 mt-2">Planificación de Recursos y Plazos Fatales</p>
            </header>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-x-auto">
                <h2 className="text-xl font-bold text-purple-400 mb-6">Línea de Tiempo del Proyecto: Alta Dispositivo Clase II</h2>

                {/* Simple Gantt Visualization */}
                <div className="relative h-64 min-w-[800px] border-l border-b border-slate-700">
                    {/* Axis */}
                    <div className="absolute bottom-[-30px] left-0 text-xs text-slate-500">Jan 2025</div>
                    <div className="absolute bottom-[-30px] left-1/3 text-xs text-slate-500">Feb 2025</div>
                    <div className="absolute bottom-[-30px] left-2/3 text-xs text-slate-500">Mar 2025</div>

                    {/* Bars */}
                    {TASKS.map((task, i) => (
                        <div
                            key={task.id}
                            className={`absolute h-8 rounded-md flex items-center px-3 text-xs font-bold shadow-lg
                        ${task.isWait ? 'bg-slate-700/50 border border-slate-600 text-slate-400 dashed-border' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'}
                    `}
                            style={{
                                top: `${i * 50 + 20}px`,
                                left: `${(i * 150) + 20}px`, // Mock positioning
                                width: task.isWait ? '200px' : '140px'
                            }}
                        >
                            {task.name} ({task.user})
                        </div>
                    ))}
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded text-sm">
                        <div className="text-slate-400">Eficiencia de Recursos</div>
                        <div className="text-2xl font-bold text-emerald-400">87%</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded text-sm">
                        <div className="text-slate-400">Horas Facturables (Proyectadas)</div>
                        <div className="text-2xl font-bold text-cyan-400">$45,000 MXN</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
