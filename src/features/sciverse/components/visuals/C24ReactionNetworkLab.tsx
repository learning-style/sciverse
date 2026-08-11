import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C24ReactionNetworkLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C24ReactionNetworkLab = ({ onStateChange }: C24ReactionNetworkLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [catalyst, setCatalyst] = useState(40);
    const [bottleneck, setBottleneck] = useState(50);

    const yieldScore = useMemo(() => Math.max(0, Math.min(100, Math.round(catalyst * 0.65 - bottleneck * 0.45 + 30))), [catalyst, bottleneck]);

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

        const catFrac = catalyst / 100;
        const bnFrac = bottleneck / 100;

        // Reaction nodes
        const nodes = [
            { x: W * 0.12, y: H * 0.5, label: 'A', color: '#3b82f6' },
            { x: W * 0.35, y: H * 0.28, label: 'B', color: '#22c55e' },
            { x: W * 0.35, y: H * 0.72, label: 'C', color: '#f59e0b' },
            { x: W * 0.6, y: H * 0.5, label: 'D', color: bnFrac > 0.5 ? '#ef4444' : '#8b5cf6' },
            { x: W * 0.85, y: H * 0.5, label: 'Product', color: '#22c55e' },
        ];

        const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];

        // Draw edges
        edges.forEach(([fi, ti], idx) => {
            const from = nodes[fi];
            const to = nodes[ti];
            const isBottleneck = ti === 3;
            const pipeW = isBottleneck ? Math.max(1, (1 - bnFrac) * 5) : 3 + catFrac * 2;
            ctx.strokeStyle = isBottleneck ? `rgba(239,68,68,${0.3 + bnFrac * 0.5})` : `rgba(100,116,139,${0.3 + catFrac * 0.4})`;
            ctx.lineWidth = pipeW;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();

            // Flow particles
            const speed = 0.2 + catFrac * 0.5;
            const dots = isBottleneck ? Math.max(1, Math.round((1 - bnFrac) * 4)) : Math.max(1, Math.round(catFrac * 4));
            for (let d = 0; d < dots; d++) {
                const p = ((t * speed + d / dots + idx * 0.15) % 1 + 1) % 1;
                ctx.save();
                if (isBottleneck) {
                    ctx.shadowColor = 'rgba(239,68,68,0.7)';
                    ctx.shadowBlur = 8;
                } else {
                    ctx.shadowColor = 'rgba(34,197,94,0.5)';
                    ctx.shadowBlur = 5;
                }
                ctx.fillStyle = from.color;
                ctx.beginPath();
                ctx.arc(from.x + (to.x - from.x) * p, from.y + (to.y - from.y) * p, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        });

        // Exaggerate a main return path (A → B → D → Product)
        ctx.save();
        ctx.strokeStyle = 'rgba(34,197,94,0.85)';
        ctx.lineWidth = 4;
        ctx.setLineDash([10, 6]);
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y); // A
        ctx.lineTo(nodes[1].x, nodes[1].y); // B
        ctx.lineTo(nodes[3].x, nodes[3].y); // D
        ctx.lineTo(nodes[4].x, nodes[4].y); // Product
        ctx.stroke();
        ctx.setLineDash([]);
        // Label the return path
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = 'rgba(34,197,94,0.95)';
        ctx.textAlign = 'center';
        ctx.fillText('return path', (nodes[0].x + nodes[4].x) / 2, H * 0.22);
        ctx.restore();

        // Draw nodes
        nodes.forEach(n => {
            const r = n.label === 'D' ? 12 + bnFrac * 4 : 10;
            ctx.fillStyle = n.color;
            ctx.beginPath();
            ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(n.label, n.x, n.y + r + 14);
        });

        // Catalyst glow around pathway
        if (catFrac > 0.3) {
            ctx.strokeStyle = `rgba(34,197,94,${(catFrac - 0.3) * 0.3 + Math.sin(t * 3) * 0.05})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            nodes.slice(0, 3).forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
                ctx.stroke();
            });
            ctx.setLineDash([]);
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Yield Score ${yieldScore}%`, 14, 22);

        animRef.current = requestAnimationFrame(draw);
    }, [catalyst, bottleneck, yieldScore]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[180px] shadow-md">
                <label className="text-[10px] text-slate-600">Catalyst Strength: {catalyst}</label>
                <input className="w-full accent-emerald-500 mb-0.5" type="range" min={0} max={100} value={catalyst}
                    onChange={e => { const v = Number(e.target.value); setCatalyst(v); onStateChange('catalyst', v); }} />
                <label className="text-[10px] text-slate-600">Bottleneck Severity: {bottleneck}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={bottleneck}
                    onChange={e => { const v = Number(e.target.value); setBottleneck(v); onStateChange('bottleneck', v); }} />
            </div>
        </div>
    );
};
