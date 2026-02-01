import React, { useState } from 'react';
import { Activity, Share2, Shield, FileText, X, AlertTriangle, User, Scale } from 'lucide-react';

// Data types for the Topological Graph
interface NodeData {
    id: string;
    type: 'CONTRACT' | 'PERSON' | 'LAW';
    label: string;
    x: number;
    y: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    details: string;
    connections: string[];
}

const StitchTopologicalNode = ({ node, onSelect, isSelected }: { node: NodeData, onSelect: (node: NodeData) => void, isSelected: boolean }) => {
    const colors = {
        CONTRACT: 'bg-emerald-500/10 border-emerald-500 text-emerald-400',
        PERSON: 'bg-cyan-500/10 border-cyan-500 text-cyan-400',
        LAW: 'bg-rose-500/10 border-rose-500 text-rose-400'
    };

    const icons = {
        CONTRACT: <FileText className="w-4 h-4" />,
        PERSON: <User className="w-4 h-4" />,
        LAW: <Scale className="w-4 h-4" />
    };

    return (
        <div
            style={{ top: node.y, left: node.x }}
            onClick={(e) => { e.stopPropagation(); onSelect(node); }}
            className={`absolute z-10 p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]
                ${colors[node.type]}
                ${isSelected ? 'scale-110 ring-2 ring-white ring-opacity-50 z-20 bg-opacity-30' : 'hover:scale-105 opacity-80 hover:opacity-100'}
            `}
        >
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-black/30 border border-white/10`}>
                    {icons[node.type]}
                </div>
                <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-bold tracking-widest opacity-70">{node.type}</span>
                    <span className="font-bold text-sm text-slate-100 truncate w-32">{node.label}</span>
                </div>
            </div>

            {/* Pseudo-connections visualizer (in a real app, use SVG lines) */}
            <div className="flex gap-1 mt-2">
                {node.connections.map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-current opacity-50" />
                ))}
            </div>
        </div>
    );
};

const StitchInterface = () => {
    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

    const nodes: NodeData[] = [
        {
            id: '1', type: 'CONTRACT', label: 'NDA Telecomm', x: 80, y: 120,
            riskLevel: 'MEDIUM', details: 'Clause 5.2 conflicts with recent LFPDPPP reforms.', connections: ['2', '3']
        },
        {
            id: '2', type: 'PERSON', label: 'Juan Perez (CEO)', x: 350, y: 80,
            riskLevel: 'HIGH', details: 'Flagged in "Listas Negras" SAT (Art 69-B). Verify immediately.', connections: ['1']
        },
        {
            id: '3', type: 'LAW', label: 'Ley Fintech Art 25', x: 250, y: 300,
            riskLevel: 'LOW', details: 'Requires Audit Log immutability for all transactions.', connections: ['1']
        },
    ];

    return (
        <div className="relative w-full h-[500px] bg-slate-950 overflow-hidden border border-slate-800 rounded-2xl shadow-2xl group"
            onClick={() => setSelectedNode(null)}
        >
            {/* Header */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded-full">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 tracking-wider">LIVE TOPOLOGY</span>
            </div>

            {/* Background Grid & Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointing-events-none" />

            {/* Nodes */}
            {nodes.map(node => (
                <StitchTopologicalNode
                    key={node.id}
                    node={node}
                    isSelected={selectedNode?.id === node.id}
                    onSelect={setSelectedNode}
                />
            ))}

            {/* Detail Sidebar (Glassmorphism) */}
            <div className={`absolute top-4 right-4 bottom-4 w-80 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-transform duration-500 ease-out shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-30
                ${selectedNode ? 'translate-x-0' : 'translate-x-[120%]'}
            `}>
                {selectedNode && (
                    <div className="h-full flex flex-col">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-white/5 border border-white/10`}>
                                    {selectedNode.type === 'CONTRACT' && <FileText className="w-5 h-5 text-emerald-400" />}
                                    {selectedNode.type === 'PERSON' && <User className="w-5 h-5 text-cyan-400" />}
                                    {selectedNode.type === 'LAW' && <Scale className="w-5 h-5 text-rose-400" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white leading-tight">{selectedNode.label}</h3>
                                    <span className="text-[10px] font-mono text-slate-400">{selectedNode.id}</span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6 flex-1 overflow-y-auto">
                            {/* Heuristic Analysis */}
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                                    <Activity className="w-3 h-3" /> Heuristic Analysis
                                </h4>
                                <p className="text-sm text-slate-300 leading-relaxed font-light">
                                    {selectedNode.details}
                                </p>
                            </div>

                            {/* Risk Meter */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Risk Assessment</h4>
                                <div className="flex items-center gap-3">
                                    <div className={`flex-1 h-2 rounded-full bg-slate-800 overflow-hidden`}>
                                        <div className={`h-full rounded-full ${selectedNode.riskLevel === 'HIGH' ? 'bg-rose-500 w-full' :
                                                selectedNode.riskLevel === 'MEDIUM' ? 'bg-amber-500 w-2/3' : 'bg-emerald-500 w-1/3'
                                            }`} />
                                    </div>
                                    <span className={`text-xs font-bold ${selectedNode.riskLevel === 'HIGH' ? 'text-rose-400' :
                                            selectedNode.riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
                                        }`}>{selectedNode.riskLevel}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto pt-4 flex flex-col gap-2">
                                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/5">
                                    Open Full Dossier
                                </button>
                                <button className="w-full py-2 bg-neo-accent/20 hover:bg-neo-accent/30 text-neo-accent rounded-lg text-sm font-medium transition-colors border border-neo-accent/30">
                                    Heuristic Zoom
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StitchInterface;
