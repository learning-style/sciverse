import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B21RespirationCycleLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B21RespirationCycleLab = ({ state, onStateChange }: B21RespirationCycleLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [oxygen, setOxygen] = useState(70);
    const [demand, setDemand] = useState(55);
    const phase = (state.phase as string) || 'intro';

    const atpOutput = useMemo(() => Math.max(0, Math.min(100, Math.round(oxygen * 0.7 - demand * 0.25 + 30))), [oxygen, demand]);
    const metabolicReserve = useMemo(() => Math.max(0, oxygen - demand), [oxygen, demand]);

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
        const cy = H * 0.48;
        const atpFrac = atpOutput / 100;
        const demandFrac = demand / 100;

        // Mitochondria outer membrane
        const outerR = Math.min(W, H) * 0.3;
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(cx, cy, outerR, outerR * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Inner membrane folds (cristae)
        const folds = 4 + Math.round(atpFrac * 4);
        for (let i = 0; i < folds; i++) {
            const fAngle = (i / folds) * Math.PI * 2;
            const foldR = outerR * 0.5;
            const fx = cx + Math.cos(fAngle) * outerR * 0.3;
            const fy = cy + Math.sin(fAngle) * outerR * 0.3;
            ctx.strokeStyle = `rgba(139,92,246,${0.2 + atpFrac * 0.4})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(fx, fy, foldR * 0.3 + atpFrac * 6, fAngle - 0.8, fAngle + 0.8);
            ctx.stroke();
        }

        // ATP production particles (spinning around)
        const atpCount = Math.round(atpFrac * 10);
        for (let i = 0; i < atpCount; i++) {
            const angle = (i / atpCount) * Math.PI * 2 + t * (0.5 + atpFrac * 1.5);
            const r = outerR * 0.55;
            const ax = cx + Math.cos(angle) * r;
            const ay = cy + Math.sin(angle) * r * 0.65;
            ctx.fillStyle = `rgba(234,179,8,${0.4 + atpFrac * 0.4})`;
            ctx.beginPath();
            ctx.arc(ax, ay, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Demand stress overlay
        if (demandFrac > 0.5) {
            const stressAlpha = (demandFrac - 0.5) * 0.2 + Math.sin(t * 4) * 0.03;
            ctx.strokeStyle = `rgba(239,68,68,${stressAlpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(cx, cy, outerR + 6, outerR * 0.65 + 6, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Reserve indicator (purple pulse)
        const reserveR = outerR * 0.15 + (metabolicReserve / 100) * outerR * 0.15;
        const reservePulse = Math.sin(t * 2) * 2;
        ctx.fillStyle = `rgba(139,92,246,${0.15 + (metabolicReserve / 100) * 0.3})`;
        ctx.beginPath();
        ctx.arc(cx, cy, reserveR + reservePulse, 0, Math.PI * 2);
        ctx.fill();

        // Oxygen input arrows on left
        const o2Frac = oxygen / 100;
        ctx.fillStyle = `rgba(56,189,248,${0.3 + o2Frac * 0.5})`;
        for (let i = 0; i < 3; i++) {
            const ay = cy - 15 + i * 15;
            const ax = cx - outerR - 20 + Math.sin(t * 2 + i) * 5;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax + 10, ay - 3);
            ctx.lineTo(ax + 10, ay + 3);
            ctx.closePath();
            ctx.fill();
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`ATP Throughput ${atpOutput}%`, 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`reserve: ${metabolicReserve}`, 14, 38);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 21 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Cycles Keep Systems Alive?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P21 Tidal Cycles', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C21 Carbon Cycle Chemistry', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B21 Respiration Cycles', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Cycles sustain life at every level!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [oxygen, demand, atpOutput, metabolicReserve, phase]);

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
                <label className="text-[10px] text-slate-600">Oxygen: {oxygen}</label>
                <input className="w-full accent-cyan-500 mb-0.5" type="range" min={0} max={100} value={oxygen}
                    onChange={e => { const v = Number(e.target.value); setOxygen(v); onStateChange('oxygen', v); }} />
                <label className="text-[10px] text-slate-600">Energy Demand: {demand}</label>
                <input className="w-full accent-amber-500" type="range" min={0} max={100} value={demand}
                    onChange={e => { const v = Number(e.target.value); setDemand(v); onStateChange('demand', v); }} />
            </div>
        </div>
    );
};
