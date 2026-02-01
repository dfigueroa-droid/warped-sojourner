"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Mock Data representing the Graph
const MOCK_GRAPH_DATA = {
    nodes: [
        { id: 'ROOT', group: 1, label: 'Maestro Kukulkán' },
        { id: 'MOD_1', group: 2, label: 'Forensic Shield' },
        { id: 'MOD_2', group: 2, label: 'Quantum Búnker' },
        { id: 'MOD_3', group: 3, label: 'Regulatory Bot' },
        { id: 'ENT_1', group: 4, label: 'Contract A' },
        { id: 'ENT_2', group: 4, label: 'Evidence B' },
        { id: 'RISK_1', group: 5, label: 'Compliance Risk' },
    ],
    links: [
        { source: 'ROOT', target: 'MOD_1' },
        { source: 'ROOT', target: 'MOD_2' },
        { source: 'MOD_1', target: 'ENT_2' },
        { source: 'MOD_3', target: 'RISK_1' },
        { source: 'ENT_1', target: 'RISK_1' },
    ]
};

const StitchXR: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let params = { t: 0 };
        let animationFrameId: number;

        const render = () => {
            params.t += 0.01;
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = 600;

            // Clear
            ctx.fillStyle = '#0f172a'; // Slate-950
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Grid (Retro Sci-Fi)
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)'; // Cyan-500 low opacity
            ctx.lineWidth = 1;
            const gridSize = 50;
            // Perspective shift simulation simply by moving lines
            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw Nodes (Orbiting Center)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            MOCK_GRAPH_DATA.nodes.forEach((node, i) => {
                const angle = (i / MOCK_GRAPH_DATA.nodes.length) * Math.PI * 2 + params.t;
                const radius = i === 0 ? 0 : 150; // Root at center
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                // Draw Link (if not root)
                if (i !== 0) {
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)'; // Emerald
                    ctx.stroke();
                }

                // Draw Node
                ctx.beginPath();
                ctx.arc(x, y, i === 0 ? 20 : 10, 0, 2 * Math.PI);
                ctx.fillStyle = i === 0 ? '#f43f5e' : '#06b6d4'; // Rose for Root, Cyan for others
                ctx.shadowBlur = 15;
                ctx.shadowColor = ctx.fillStyle;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Label
                ctx.fillStyle = '#fff';
                ctx.font = '12px Inter';
                ctx.fillText(node.label, x + 15, y + 4);
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-full h-[600px] border border-slate-700 rounded-xl overflow-hidden shadow-2xl bg-black">
            <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded text-cyan-400 font-mono text-xs">
                STITCH XR // WAR ROOM VIEW Mode: 3D_TOPOLOGY
            </div>
            <canvas ref={canvasRef} className="w-full h-full" />

            {/* HUD Overlay */}
            <div className="absolute bottom-4 right-4 text-right">
                <div className="text-xs text-slate-500">NODES ACTIVE</div>
                <div className="text-xl font-bold text-emerald-400">28</div>
                <div className="text-xs text-slate-500 mt-2">RISK LEVEL</div>
                <div className="text-xl font-bold text-rose-500 animate-pulse">CRITICAL</div>
            </div>
        </div>
    );
};

export default StitchXR;
