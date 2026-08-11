import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C19SoilChemistryLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C19SoilChemistryLab = ({ onStateChange }: C19SoilChemistryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [ph, setPh] = useState(6.8);
    const [nitrogen, setNitrogen] = useState(55);
    const [salinity, setSalinity] = useState(20);

    const nutrientAvailability = useMemo(() => {
        const phPenalty = Math.abs(6.8 - ph) * 30;
        const raw = nitrogen * 0.82 + 20 - salinity * 0.62 - phPenalty;
        return Math.max(0, Math.min(100, Math.round(raw)));
    }, [ph, nitrogen, salinity]);

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

        // Flask outline
        const cx = W * 0.45;
        const flaskTop = H * 0.14;
        const flaskBottom = H * 0.78;
        const neckW = W * 0.06;
        const bodyW = W * 0.32;
        const neckH = H * 0.18;

        // Flask neck
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - neckW, flaskTop);
        ctx.lineTo(cx - neckW, flaskTop + neckH);
        ctx.lineTo(cx - bodyW / 2, flaskBottom - H * 0.12);
        ctx.lineTo(cx - bodyW / 2, flaskBottom);
        ctx.lineTo(cx + bodyW / 2, flaskBottom);
        ctx.lineTo(cx + bodyW / 2, flaskBottom - H * 0.12);
        ctx.lineTo(cx + neckW, flaskTop + neckH);
        ctx.lineTo(cx + neckW, flaskTop);
        ctx.stroke();

        // Solution fill - color based on pH
        const phDist = Math.abs(6.8 - ph);
        const healthy = Math.max(0, 1 - phDist * 0.5);
        ctx.fillStyle = `rgba(${Math.round(50 + (1 - healthy) * 180)},${Math.round(180 * healthy)},${Math.round(100 + healthy * 80)},0.3)`;
        ctx.beginPath();
        ctx.moveTo(cx - neckW, flaskTop + neckH * 0.6);
        ctx.lineTo(cx - neckW, flaskTop + neckH);
        ctx.lineTo(cx - bodyW / 2, flaskBottom - H * 0.12);
        ctx.lineTo(cx - bodyW / 2, flaskBottom);
        ctx.lineTo(cx + bodyW / 2, flaskBottom);
        ctx.lineTo(cx + bodyW / 2, flaskBottom - H * 0.12);
        ctx.lineTo(cx + neckW, flaskTop + neckH);
        ctx.lineTo(cx + neckW, flaskTop + neckH * 0.6);
        ctx.closePath();
        ctx.fill();

        // ── Nitrogen nutrient particles (bright green diamonds with "N") ──
        const nFrac = nitrogen / 100;
        const nCount = Math.round(nFrac * 15);
        for (let i = 0; i < nCount; i++) {
            const nx = cx - bodyW * 0.35 + ((i * 41 + t * 15) % (bodyW * 0.7));
            const ny = flaskTop + neckH + 10 + ((i * 31) % (flaskBottom - flaskTop - neckH - 20));
            const sz = 5 + nFrac * 2;
            // Green diamond
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.moveTo(nx, ny - sz);
            ctx.lineTo(nx + sz, ny);
            ctx.lineTo(nx, ny + sz);
            ctx.lineTo(nx - sz, ny);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#052e16';
            ctx.lineWidth = 1;
            ctx.stroke();
            // "N" label
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.round(sz)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('N', nx, ny);
        }

        // ── Salinity stress particles (bold orange-red hexagons with "S") ──
        const sFrac = salinity / 100;
        const sCount = Math.round(sFrac * 10);
        for (let i = 0; i < sCount; i++) {
            const sx = cx - bodyW * 0.3 + ((i * 53) % (bodyW * 0.6));
            const sy = flaskBottom - 30 - ((i * 29) % (H * 0.25));
            const sr = 6 + sFrac * 4;
            // Orange-red circle with thick border
            ctx.fillStyle = '#ea580c';
            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#7c2d12';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // "S" label
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.round(sr)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('S', sx, sy);
        }

        // ── Legend box (top-right) ──
        const lgX = W * 0.66;
        const lgY = H * 0.04;
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.fillRect(lgX, lgY, W * 0.32, 50);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.strokeRect(lgX, lgY, W * 0.32, 50);
        ctx.textBaseline = 'alphabetic';
        // Green diamond legend
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        const dlx = lgX + 10, dly = lgY + 14;
        ctx.moveTo(dlx, dly - 5); ctx.lineTo(dlx + 5, dly); ctx.lineTo(dlx, dly + 5); ctx.lineTo(dlx - 5, dly); ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('= Nitrogen (nutrients)', lgX + 20, lgY + 18);
        // Orange circle legend
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(lgX + 10, lgY + 36, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1e293b';
        ctx.fillText('= Salt ions (salinity stress)', lgX + 20, lgY + 40);

        // pH scale bar
        const scaleX = W * 0.82;
        const scaleY = H * 0.15;
        const scaleH = H * 0.65;
        const grad = ctx.createLinearGradient(0, scaleY, 0, scaleY + scaleH);
        grad.addColorStop(0, '#ef4444');
        grad.addColorStop(0.5, '#22c55e');
        grad.addColorStop(1, '#6366f1');
        ctx.fillStyle = grad;
        ctx.fillRect(scaleX, scaleY, 12, scaleH);
        const phY = scaleY + ((ph - 4.5) / 4) * scaleH;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(scaleX - 5, phY);
        ctx.lineTo(scaleX, phY - 4);
        ctx.lineTo(scaleX, phY + 4);
        ctx.closePath();
        ctx.fill();

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Nutrient Availability ${nutrientAvailability}%`, 14, 20);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`pH ${ph.toFixed(1)}`, 14, 36);

        animRef.current = requestAnimationFrame(draw);
    }, [ph, nitrogen, salinity, nutrientAvailability]);

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
                <label className="text-[10px] text-slate-600">Soil pH: {ph.toFixed(1)}</label>
                <input className="w-full accent-cyan-500" type="range" min={4.5} max={8.5} step={0.1} value={ph}
                    onChange={e => { const v = Number(e.target.value); setPh(v); onStateChange('ph', v); }} />
                <label className="text-[10px] text-slate-600">Nitrogen Level: {nitrogen}</label>
                <input className="w-full accent-emerald-500" type="range" min={0} max={100} value={nitrogen}
                    onChange={e => { const v = Number(e.target.value); setNitrogen(v); onStateChange('nitrogen', v); }} />
                <label className="text-[10px] text-slate-600">Salinity: {salinity}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={salinity}
                    onChange={e => { const v = Number(e.target.value); setSalinity(v); onStateChange('salinity', v); }} />
            </div>
        </div>
    );
};