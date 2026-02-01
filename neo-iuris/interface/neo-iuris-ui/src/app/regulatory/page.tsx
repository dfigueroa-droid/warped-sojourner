'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Send } from 'lucide-react';
import { submitRegulatoryAviso } from '@/lib/api';
import StitchInterface from '@/components/StitchInterface';

export default function RegulatoryPage() {
    const [formData, setFormData] = useState({
        business_name: '',
        license_type: 'SALUD_PUBLICA',
        owner: '',
        address: ''
    });
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await submitRegulatoryAviso(formData);
            setStatus(res);
        } catch (err) {
            setStatus({ status: 'ERROR', detail: 'Connection Failed' });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen p-8 flex flex-col gap-8 pb-32">
            <header className="flex items-center gap-4">
                <Link href="/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Gestor Regulatorio Automático
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORM SECTION */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-neo-panel border border-white/5 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-6 h-6 text-blue-400" />
                            <h2 className="text-xl font-bold">DIGIPRiS Auto-Filing</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">Business Name / Razón Social</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-blue-500/50 outline-none transition-all"
                                        value={formData.business_name}
                                        onChange={e => setFormData({ ...formData, business_name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">Owner / Representante</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-blue-500/50 outline-none transition-all"
                                        value={formData.owner}
                                        onChange={e => setFormData({ ...formData, owner: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-500 mb-1">Permit Type</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-blue-500/50 outline-none"
                                    value={formData.license_type}
                                    onChange={e => setFormData({ ...formData, license_type: e.target.value })}
                                >
                                    <option value="SALUD_PUBLICA">Aviso de Funcionamiento (Salud)</option>
                                    <option value="COFEPRIS_05">Licencia Sanitaria (Insumos Médicos)</option>
                                    <option value="PUBLICIDAD">Permiso de Publicidad</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-500 mb-1">Facility Address</label>
                                <textarea
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-blue-500/50 outline-none"
                                    rows={3}
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Bot Negotiating...' : <><Send className="w-4 h-4" /> Submit to COFEPRIS</>}
                            </button>
                        </form>
                    </div>

                    {status && (
                        <div className={`p-6 rounded-2xl border ${status.submission_status === 'SUCCESS' ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-red-900/20 border-red-500/30'} animate-in fade-in slide-in-from-bottom-4`}>
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                {status.submission_status === 'SUCCESS' ? <CheckCircle className="text-emerald-400" /> : <AlertTriangle className="text-red-400" />}
                                <span className={status.submission_status === 'SUCCESS' ? 'text-emerald-400' : 'text-red-400'}>
                                    Operation Result
                                </span>
                            </h3>
                            <pre className="text-xs font-mono text-slate-400 whitespace-pre-wrap">{JSON.stringify(status, null, 2)}</pre>
                        </div>
                    )}
                </div>

                {/* SIDEBAR CONTEXT (Stitch) */}
                <div className="space-y-6">
                    <div className="bg-slate-950 rounded-2xl p-1 border border-slate-800">
                        <div className="p-3 border-b border-white/5 mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Regulatory Topology</span>
                        </div>
                        <div className="h-[300px] relative overflow-hidden rounded-xl">
                            {/* In a real app, passing specific context nodes */}
                            <StitchInterface />
                        </div>
                    </div>

                    <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl">
                        <h4 className="font-bold text-blue-400 text-sm mb-2">Bot Status</h4>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-xs text-slate-300">Port 443 (SSL) Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-xs text-slate-300">RPA Worker Idle</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
