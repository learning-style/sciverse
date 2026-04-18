import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P23StressFractureLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P23StressFractureLab = ({ state, onStateChange }: P23StressFractureLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [load, setLoad] = useState(55);
    const [notch, setNotch] = useState(35);
    const phase = (state.phase as string) || 'intro';

    const failureRisk = useMemo(() => Math.max(0, Math.min(100, Math.round(load * 0.65 + notch * 0.45))), [load, notch]);

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

        const barX = W * 0.2;
        const barW = W * 0.6;
        const barY = H * 0.35;
        const barH = H * 0.3;

        // Metal bar
        ctx.fillStyle = '#64748b';
        ctx.fillRect(barX, barY, barW, barH);

        // Notch on top
        const notchFrac = notch / 100;
        const notchDepth = notchFrac * barH * 0.45;
        const notchW = 8 + notchFrac * 20;
        const notchX = barX + barW * 0.5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(notchX - notchW / 2, barY);
        ctx.lineTo(notchX, barY + notchDepth);
        ctx.lineTo(notchX + notchW / 2, barY);
        ctx.closePath();
        ctx.fill();

        // Stress concentration lines around notch
        const stressRadius = 10 + failureRisk * 0.5;
        const stressAlpha = failureRisk / 100;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI + Math.PI;
            const r1 = notchDepth + 4;
            const r2 = r1 + stressRadius;
            ctx.save();
            ctx.shadowColor = 'rgba(239,68,68,0.7)';
            ctx.shadowBlur = 7;
            ctx.strokeStyle = `rgba(239,68,68,0.98)`;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(notchX + Math.cos(angle) * r1, barY + notchDepth + Math.sin(angle) * r1 * 0.5);
            ctx.lineTo(notchX + Math.cos(angle) * r2, barY + notchDepth + Math.sin(angle) * r2 * 0.5);
            ctx.stroke();
            ctx.restore();
        }

        // Crack propagation if high risk
        if (failureRisk > 50) {
            const crackLen = ((failureRisk - 50) / 50) * barH * 0.6;
            ctx.strokeStyle = `rgba(220,38,38,${0.5 + Math.sin(t * 5) * 0.2})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(notchX, barY + notchDepth);
            for (let d = 0; d < crackLen; d += 4) {
                ctx.lineTo(notchX + Math.sin(d * 0.8) * 3, barY + notchDepth + d);
            }
            ctx.stroke();
        }

        // Load arrows from top
        const loadFrac = load / 100;
        for (let i = 0; i < 4; i++) {
            const ax = barX + barW * 0.15 + (barW * 0.7 / 3) * i;
            const aLen = 10 + loadFrac * 22;
            const ay = barY - 20 - Math.sin(t * 3 + i) * 2;
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax, ay + aLen);
            ctx.lineTo(ax - 4, ay + aLen - 6);
            ctx.moveTo(ax, ay + aLen);
            ctx.lineTo(ax + 4, ay + aLen - 6);
            ctx.stroke();
        }

        // Support triangles at bottom
        ctx.fillStyle = '#334155';
        [barX + barW * 0.15, barX + barW * 0.85].forEach(sx => {
            ctx.beginPath();
            ctx.moveTo(sx, barY + barH);
            ctx.lineTo(sx - 8, barY + barH + 14);
            ctx.lineTo(sx + 8, barY + barH + 14);
            ctx.closePath();
            ctx.fill();
        });

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Failure Risk ${failureRisk}%`, 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = failureRisk >= 60 ? '#dc2626' : '#15803d';
        ctx.fillText(failureRisk >= 60 ? 'status: high risk' : 'status: within margin', 14, 38);

        animRef.current = requestAnimationFrame(draw);
    }, [load, notch, failureRisk]);

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
                <label className="text-[13px] font-bold text-[#b91c1c]">Load: {load}</label>
                <input className="w-full accent-amber-500 mb-0.5" type="range" min={0} max={100} value={load}
                    onChange={e => { const v = Number(e.target.value); setLoad(v); onStateChange('load', v); }} />
                <label className="text-[13px] font-bold text-[#b91c1c]">Notch Severity: {notch}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={notch}
                    onChange={e => { const v = Number(e.target.value); setNotch(v); onStateChange('notch', v); }} />
            </div>
        </div>
    );
};
