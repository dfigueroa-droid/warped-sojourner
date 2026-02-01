'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Siren, CheckSquare, BarChart3 } from 'lucide-react';
import { auditIso } from '@/lib/api';
import StitchInterface from '@/components/StitchInterface';

export default function CompliancePage() {
    const [facility, setFacility] = useState('FACTORY_LEON_MX');
    const [standard, setStandard] = useState('ISO_14001');
    const [auditResult, setAuditResult] = useState<any>(null);
    const [auditing, setAuditing] = useState(false);

    const runAudit = async () => {
        setAuditing(true);
        try {
            const res = await auditIso({ facility, standard });
            setAuditResult(res);
        } catch (error) {
            console.error('Audit failed', error);
        }
        setAuditing(false);
    };

    return (
        <div className="min-h-screen p-8 pb-32">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Compliance Guardian
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* CONFIG CARD */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-neo-panel border border-white/5 rounded-2xl p-6">
                        <Activity className="w-8 h-8 text-purple-400 mb-4" />
                        <h2 className="text-lg font-bold mb-4">Audit Config</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Target Facility</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm"
                                    value={facility}
                                    onChange={e => setFacility(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Standard</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm"
                                    value={standard}
                                    onChange={e => setStandard(e.target.value)}
                                >
                                    <option value="ISO_14001">ISO 14001 (Environment)</option>
                                    <option value="ISO_45001">ISO 45001 (Safety)</option>
                                    <option value="NOM_035">NOM-035 (Psychosocial)</option>
                                </select>
                            </div>
                            <button
                                onClick={runAudit}
                                disabled={auditing}
                                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-900/40"
                            >
                                {auditing ? 'Scanning...' : 'Run Audit'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MAIN DASHBOARD */}
                <div className="lg:col-span-2 space-y-6">
                    {!auditResult ? (
                        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl text-slate-500">
                            <Siren className="w-12 h-12 mb-4 opacity-50" />
                            <p>Ready to Scan Facility Protocols</p>
                        </div>
                    ) : (
                        <div className="bg-black/40 border border-purple-500/30 rounded-3xl p-8 animate-in zoom-in-95">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Audit Report: {auditResult.status || 'GENERATED'}</h2>
                                    <p className="text-sm text-slate-400">Score: {auditResult.score}/100</p>
                                </div>
                                <div className={`px-4 py-2 rounded-lg font-bold ${auditResult.score > 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {auditResult.score > 80 ? 'COMPLIANT' : 'NON-CONFORMANT'}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-slate-900/50 p-4 rounded-xl">
                                    <div className="text-xs text-slate-500 uppercase">Documents</div>
                                    <div className="text-lg font-mono text-purple-400">12/15 Valid</div>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl">
                                    <div className="text-xs text-slate-500 uppercase">Critical Risks</div>
                                    <div className="text-lg font-mono text-pink-400">None Detected</div>
                                </div>
                            </div>

                            <div className="p-4 bg-red-900/10 border border-red-500/10 rounded-xl">
                                <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Action Items
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                                    <li>Update "Manifesto de Impacto Ambiental" (Expired 2 days ago).</li>
                                    <li>Recalibrate Water Sensors in Sector 7.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-slate-950 rounded-2xl p-1 border border-slate-800 h-[400px]">
                    <div className="p-3 border-b border-white/5 mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Risk Topology</span>
                    </div>
                    <div className="h-[340px] relative overflow-hidden rounded-xl">
                        <StitchInterface />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AlertTriangle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2001/XMLSchema"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}
