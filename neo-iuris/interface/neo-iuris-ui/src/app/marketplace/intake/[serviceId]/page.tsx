"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IntakePage({ params }: { params: { serviceId: string } }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else {
            // Submit form (Mock)
            alert("Redirigiendo a Pasarela de Pago (Escrow)...");
            router.push('/dashboard/client');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Diagnóstico</span>
                        <span>Datos</span>
                        <span>Confirmación</span>
                    </div>
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-purple-500 transition-all duration-500"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-6">
                    {params.serviceId === 'DIVORCIO_EXPRESS' ? 'Configurar Divorcio' : 'Iniciar Trámite'}
                </h2>

                {/* Form Content */}
                <div className="min-h-[300px]">
                    {step === 1 && (
                        <div className="space-y-4">
                            <label className="block text-gray-300 mb-1">¿En qué estado se casaron?</label>
                            <select className="w-full bg-slate-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors">
                                <option>Ciudad de México (CDMX)</option>
                                <option>Estado de México</option>
                                <option>Jalisco</option>
                                <option>Nuevo León</option>
                            </select>

                            <label className="block text-gray-300 mb-1 mt-4">¿Tienen hijos menores de edad?</label>
                            <div className="flex gap-4">
                                <button className="flex-1 py-3 rounded-lg bg-slate-800 border border-gray-600 hover:bg-slate-700 hover:border-purple-500 focus:ring-2 ring-purple-500 transition-all">
                                    Sí
                                </button>
                                <button className="flex-1 py-3 rounded-lg bg-slate-800 border border-gray-600 hover:bg-slate-700 hover:border-purple-500 transition-all">
                                    No
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-fadeIn">
                            <label className="block text-gray-300 mb-1">Nombre Completo del Solicitante</label>
                            <input type="text" className="w-full bg-slate-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="Juan Pérez..." />

                            <label className="block text-gray-300 mb-1">Nombre del Cónyuge</label>
                            <input type="text" className="w-full bg-slate-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500" placeholder="María González..." />
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-fadeIn text-center">
                            <div className="text-6xl mb-4">🛡️</div>
                            <h3 className="text-xl font-bold">Todo listo para iniciar</h3>
                            <p className="text-gray-400">
                                Un abogado especialista en CDMX revisará tu caso.<br />
                                El costo estimado es de <span className="text-green-400 font-bold">$5,000 MXN</span>.
                            </p>
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm">
                                Tu dinero estará protegido en Escrow hasta que se admita la demanda.
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        className={`px-6 py-2 text-gray-400 hover:text-white transition-colors ${step === 1 ? 'invisible' : ''}`}
                    >
                        Atrás
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all transform hover:scale-105"
                    >
                        {step === 3 ? 'Proceder al Pago' : 'Continuar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
