import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P24FlowNetworksLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P24FlowNetworksLab = ({ state, onStateChange }: P24FlowNetworksLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [pressure, setPressure] = useState(60);
    const [resistance, setResistance] = useState(35);
    const phase = (state.phase as string) || 'intro';

    const throughput = useMemo(() => Math.max(0, Math.min(100, Math.round(pressure * 0.75 - resistance * 0.5 + 15))), [pressure, resistance]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        const nodes = [
            { x: W * 0.12, y: H * 0.5, label: 'Source' },
            { x: W * 0.35, y: H * 0.28, label: 'A' },
            { x: W * 0.35, y: H * 0.72, label: 'B' },
            { x: W * 0.6, y: H * 0.28, label: 'C' },
            { x: W * 0.6, y: H * 0.72, label: 'D' },
            { x: W * 0.85, y: H * 0.5, label: 'Sink' },
        ];

        const edges = [
            [0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5],
        ];

        const resFrac = resistance / 100;
        const presFrac = pressure / 100;

        // Draw edges (pipes)
        edges.forEach(([fi, ti], idx) => {
            const from = nodes[fi];
            const to = nodes[ti];
            const pipeW = Math.max(1, (1 - resFrac * 0.7) * 6);
            ctx.strokeStyle = `rgba(100,116,139,${0.3 + (1 - resFrac) * 0.4})`;
            ctx.lineWidth = pipeW;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();

            // Exaggerated flow dots
            const speed = 0.2 + presFrac * 0.6;
            const numDots = Math.max(2, Math.round(throughput / 18));
            for (let d = 0; d < numDots; d++) {
                const p = ((t * speed + d / numDots + idx * 0.12) % 1 + 1) % 1;
                const dx = from.x + (to.x - from.x) * p;
                const dy = from.y + (to.y - from.y) * p;
                // Outer glow
                ctx.save();
                ctx.shadowColor = 'rgba(59,130,246,0.7)';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(dx, dy, 7, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59,130,246,0.45)';
                ctx.fill();
                ctx.restore();
                // Inner dot
                ctx.beginPath();
                ctx.arc(dx, dy, 4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59,130,246,0.95)';
                ctx.fill();
                // White highlight
                ctx.beginPath();
                ctx.arc(dx + 2, dy - 2, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.fill();
            }
        });

        // Highlight a main return path (Source → A → C → Sink)
        ctx.save();
        ctx.strokeStyle = 'rgba(34,197,94,0.85)';
        ctx.lineWidth = 4;
        ctx.setLineDash([10, 6]);
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y); // Source
        ctx.lineTo(nodes[1].x, nodes[1].y); // A
        ctx.lineTo(nodes[3].x, nodes[3].y); // C
        ctx.lineTo(nodes[5].x, nodes[5].y); // Sink
        ctx.stroke();
        ctx.setLineDash([]);
        // Label the return path
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = 'rgba(34,197,94,0.95)';
        ctx.textAlign = 'center';
        ctx.fillText('return path', (nodes[0].x + nodes[5].x) / 2, H * 0.22);
        ctx.restore();

        // Draw nodes
        nodes.forEach(n => {
            ctx.fillStyle = n.label === 'Source' ? '#3b82f6' : n.label === 'Sink' ? '#22c55e' : '#475569';
            ctx.beginPath();
            ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y + 22);
        });

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Throughput ${throughput}%`, 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText('High throughput = good match', 14, 38);

        animRef.current = requestAnimationFrame(draw);
    }, [pressure, resistance, throughput]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = node.clientWidth;
            canvas.height = node.clientHeight;
        });
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [draw]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[200px] shadow-md z-10">
                <label className="text-[13px] font-extrabold text-[#3b82f6] drop-shadow">Pressure: <span className="font-extrabold">{pressure}</span></label>
                <input className="w-full accent-indigo-500 mb-0.5" type="range" min={0} max={100} value={pressure}
                    onChange={e => { const v = Number(e.target.value); setPressure(v); onStateChange('pressure', v); }} />
                <label className="text-[13px] font-extrabold text-[#f59e42] drop-shadow">Resistance: <span className="font-extrabold">{resistance}</span></label>
                <input className="w-full accent-amber-500" type="range" min={0} max={100} value={resistance}
                    onChange={e => { const v = Number(e.target.value); setResistance(v); onStateChange('resistance', v); }} />
            </div>
            {/* Legend forced above control box with z-20 and margin */}
            <div className="absolute right-2 top-2 bg-white/90 border border-slate-300 rounded-lg p-2 w-[220px] shadow-md text-xs z-20 mt-2">
                <div className="flex items-center mb-1"><span className="inline-block w-3 h-3 rounded-full mr-2" style={{background:'#3b82f6',border:'2px solid #2563eb'}}></span> <span className="text-slate-700">Source</span></div>
                <div className="flex items-center mb-1"><span className="inline-block w-3 h-3 rounded-full mr-2" style={{background:'#22c55e',border:'2px solid #16a34a'}}></span> <span className="text-slate-700">Sink</span></div>
                <div className="flex items-center mb-1"><span className="inline-block w-4 h-1 mr-2" style={{background:'#64748b'}}></span> <span className="text-slate-700">Pipe (edge)</span></div>
                <div className="flex items-center mb-1"><span className="inline-block w-4 h-1 mr-2" style={{background:'#22c55e',borderRadius:'2px'}}></span> <span className="text-slate-700">Return path (highlighted)</span></div>
                <div className="flex items-center"><span className="inline-block w-3 h-3 mr-2" style={{background:'#3b82f6',borderRadius:'2px'}}></span> <span className="text-slate-700">Other nodes (A, B, C, D)</span></div>
            </div>
        </div>
    );
};
