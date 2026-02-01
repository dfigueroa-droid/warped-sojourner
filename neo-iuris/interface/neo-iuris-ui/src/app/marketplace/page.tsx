"use client";

import React from 'react';
import Link from 'next/link';

// Mock Data (In real app, fetch from /api/marketplace/pricing/suggest)
const SERVICES = [
    {
        id: "DIVORCIO_EXPRESS",
        title: "Divorcio Incausado",
        description: "Disolución del vínculo matrimonial sin necesidad de justificar causa. Rápido y seguro.",
        priceRange: "$4,500 - $6,000 MXN",
        tags: ["Civil", "Familiar", "Express"],
        icon: "⚖️"
    },
    {
        id: "CONST_SAS",
        title: "Crear Empresa (SAS)",
        description: "Constitución de Sociedad por Acciones Simplificada. 100% Digital y gratuita ante Economía.",
        priceRange: "$2,000 - $3,500 MXN (Gestión)",
        tags: ["Corporativo", "PyME", "Emprendedor"],
        icon: "🏢"
    },
    {
        id: "REV_CONTRATO",
        title: "Revisión de Contrato",
        description: "Análisis de riesgos en contratos de arrendamiento, prestación de servicios o laborales.",
        priceRange: "$800 - $1,500 MXN",
        tags: ["Preventivo", "Blindaje"],
        icon: "📄"
    }
];

export default function MarketplacePage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                    Marketplace Jurídico
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Servicios legales estandarizados, precios transparentes y garantía de satisfacción.
                    Seleccione su trámite para comenzar.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {SERVICES.map((service) => (
                    <Link href={`/marketplace/intake/${service.id}`} key={service.id} className="group">
                        <div className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden">

                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-75" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 mb-6 flex-grow">
                                    {service.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-sm text-gray-400">Desde</span>
                                        <span className="text-lg font-bold text-green-400">{service.priceRange}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
