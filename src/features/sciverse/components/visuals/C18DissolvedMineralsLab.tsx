import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C18DissolvedMineralsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C18DissolvedMineralsLab = ({ state, onStateChange }: C18DissolvedMineralsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [mineralLevel, setMineralLevel] = useState(40);
    const [ph, setPh] = useState(7);
    const phase = (state.phase as string) || 'intro';

    const conductivity = useMemo(() => {
        const neutralBonus = 12 - Math.abs(7 - ph) * 3;
        return Math.max(0, Math.min(100, Math.round(mineralLevel * 0.8 + neutralBonus)));
    }, [mineralLevel, ph]);

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

        // Beaker
        const bx = W * 0.25;
        const bw = W * 0.5;
        const by = H * 0.22;
        const bh = H * 0.58;

        // Solution color based on pH
        const phNorm = (ph - 4) / 5;
        const r = Math.round(200 - phNorm * 150);
        const g = Math.round(100 + phNorm * 80);
        const b = Math.round(150 + phNorm * 100);
        ctx.fillStyle = `rgba(${r},${g},${b},0.35)`;
        ctx.fillRect(bx, by, bw, bh);

        // Beaker outline
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by);
        ctx.stroke();

        // Dissolved ions floating
        const minFrac = mineralLevel / 100;
        const ionCount = Math.round(minFrac * 20);
        for (let i = 0; i < ionCount; i++) {
            const ix = bx + 12 + ((i * 43 + t * 20) % (bw - 24));
            const iy = by + 12 + ((i * 37 + Math.sin(t * 1.5 + i) * 8) % (bh - 24));
            const charge = i % 3 === 0 ? '+' : i % 3 === 1 ? '−' : '·';
            const color = i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#22c55e' : '#f59e0b';
            ctx.fillStyle = color;
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(charge, ix, iy);
        }

        // pH scale on right
        const scaleX = W * 0.82;
        const scaleY = H * 0.15;
        const scaleH = H * 0.7;
        const grad = ctx.createLinearGradient(0, scaleY, 0, scaleY + scaleH);
        grad.addColorStop(0, '#ef4444');
        grad.addColorStop(0.5, '#22c55e');
        grad.addColorStop(1, '#6366f1');
        ctx.fillStyle = grad;
        ctx.fillRect(scaleX, scaleY, 14, scaleH);
        ctx.strokeStyle = '#64748b';
        ctx.strokeRect(scaleX, scaleY, 14, scaleH);

        // pH marker
        const markerY = scaleY + ((ph - 4) / 5) * scaleH;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(scaleX - 6, markerY);
        ctx.lineTo(scaleX, markerY - 4);
        ctx.lineTo(scaleX, markerY + 4);
        ctx.closePath();
        ctx.fill();
        ctx.font = '10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`pH ${ph.toFixed(1)}`, scaleX - 10, markerY + 4);

        // Conductivity bar at bottom
        const cbY = H * 0.88;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx, cbY, bw, 10);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(bx, cbY, bw * (conductivity / 100), 10);
        // Conductivity bar label
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`⚡ Conductivity ${conductivity}%`, bx, cbY - 4);

        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Conductivity ${conductivity}%`, 14, 18);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`pH ${ph.toFixed(1)}`, 14, 34);

        animRef.current = requestAnimationFrame(draw);
    }, [mineralLevel, ph, conductivity]);

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
                <label className="text-[10px] text-slate-600">Dissolved Minerals: {mineralLevel}</label>
                <input className="w-full accent-emerald-500" type="range" min={0} max={100} value={mineralLevel}
                    onChange={e => { const v = Number(e.target.value); setMineralLevel(v); onStateChange('mineralLevel', v); }} />
                <label className="text-[10px] text-slate-600">pH: {ph.toFixed(1)}</label>
                <input className="w-full accent-cyan-500" type="range" min={4} max={9} step={0.1} value={ph}
                    onChange={e => { const v = Number(e.target.value); setPh(v); onStateChange('ph', v); }} />
            </div>
        </div>
    );
};