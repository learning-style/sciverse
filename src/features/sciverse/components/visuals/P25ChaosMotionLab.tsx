import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P25ChaosMotionLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P25ChaosMotionLab = ({ onStateChange }: P25ChaosMotionLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);
    const trailARef = useRef<{ x: number; y: number }[]>([]);
    const trailBRef = useRef<{ x: number; y: number }[]>([]);

    const [initialOffset, setInitialOffset] = useState(20);
    const [nonlinearity, setNonlinearity] = useState(55);

    const divergence = useMemo(() => Math.max(0, Math.min(100, Math.round(initialOffset * 0.5 + nonlinearity * 0.7))), [initialOffset, nonlinearity]);

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

        const cx = W * 0.5;
        const cy = H * 0.5;
        const nl = nonlinearity / 100;
        const offset = initialOffset / 100;

        // Two trajectories starting close together
        const r = Math.min(W, H) * 0.32;
        const freq = 1.2 + nl * 2.5;
        const chaos = nl * 0.8;

        // Trajectory A (reference)
        const ax = cx + r * Math.sin(t * freq) * Math.cos(t * 0.7);
        const ay = cy + r * Math.cos(t * freq * 0.8) * Math.sin(t * 0.5 + chaos);

        // Trajectory B (offset start, diverges)
        const bx = cx + r * Math.sin(t * freq + offset * 0.3) * Math.cos(t * 0.7 + offset * nl * 0.5);
        const by = cy + r * Math.cos(t * freq * 0.8 + offset * 0.2) * Math.sin(t * 0.5 + chaos + offset * nl * 0.6);

        trailARef.current.push({ x: ax, y: ay });
        trailBRef.current.push({ x: bx, y: by });
        if (trailARef.current.length > 200) trailARef.current.shift();
        if (trailBRef.current.length > 200) trailBRef.current.shift();

        // Draw trails
        const drawTrail = (trail: { x: number; y: number }[], color: string) => {
            if (trail.length < 2) return;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(trail[0].x, trail[0].y);
            for (let i = 1; i < trail.length; i++) {
                ctx.lineTo(trail[i].x, trail[i].y);
            }
            ctx.stroke();
        };

        drawTrail(trailARef.current, 'rgba(59,130,246,0.6)');
        drawTrail(trailBRef.current, 'rgba(239,68,68,0.6)');

        // Current positions
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(ax, ay, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(bx, by, 5, 0, Math.PI * 2);
        ctx.fill();

        // Distance line between them
        ctx.strokeStyle = 'rgba(251,191,36,0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.setLineDash([]);

        // Labels
        ctx.fillStyle = '#3b82f6';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('A', ax + 8, ay - 4);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('B', bx + 8, by - 4);

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Trajectory Divergence ${divergence}%`, 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        const dist = Math.round(Math.hypot(ax - bx, ay - by));
        ctx.fillText(`current separation: ${dist}px`, 14, 38);

        animRef.current = requestAnimationFrame(draw);
    }, [initialOffset, nonlinearity, divergence]);

    useEffect(() => {
        trailARef.current = [];
        trailBRef.current = [];
    }, [initialOffset, nonlinearity]);

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
                <label className="text-[10px] text-slate-600">Initial Offset: {initialOffset}</label>
                <input className="w-full accent-amber-500 mb-0.5" type="range" min={0} max={100} value={initialOffset}
                    onChange={e => { const v = Number(e.target.value); setInitialOffset(v); onStateChange('initialOffset', v); }} />
                <label className="text-[10px] text-slate-600">Nonlinearity: {nonlinearity}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={nonlinearity}
                    onChange={e => { const v = Number(e.target.value); setNonlinearity(v); onStateChange('nonlinearity', v); }} />
            </div>
        </div>
    );
};
