import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C16MagneticMaterialsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C16MagneticMaterialsLab = ({ state, onStateChange }: C16MagneticMaterialsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [ironFraction, setIronFraction] = useState(70);
    const [temperature, setTemperature] = useState(25);
    const phase = (state.phase as string) || 'intro';

    const magnetResponse = useMemo(() => {
        const thermalPenalty = Math.max(0, (temperature - 25) * 0.7);
        return Math.max(0, Math.min(100, Math.round(ironFraction - thermalPenalty)));
    }, [ironFraction, temperature]);

    // Generate stable domain grid
    const domainsRef = useRef<Array<{ x: number; y: number; baseAngle: number }>>([]);
    useEffect(() => {
        const domains: typeof domainsRef.current = [];
        const cols = 8, rows = 6;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                domains.push({
                    x: (c + 0.5) / cols,
                    y: (r + 0.5) / rows,
                    baseAngle: Math.random() * Math.PI * 2,
                });
            }
        }
        domainsRef.current = domains;
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Magnetic Materials Lab', W / 2, 26);

        // Domain visualization area
        const dx = W * 0.08, dy = H * 0.08, dw = W * 0.84, dh = H * 0.6;
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(dx, dy + 20, dw, dh);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.strokeRect(dx, dy + 20, dw, dh);

        // Draw magnetic domains as arrows
        const alignFactor = magnetResponse / 100; // 0 = random, 1 = all point up
        const thermalWobble = (temperature / 120) * 1.2;

        for (const d of domainsRef.current) {
            const px = dx + d.x * dw;
            const py = dy + 20 + d.y * dh;

            // Interpolate angle: random baseAngle → aligned (up = -PI/2)
            const targetAngle = -Math.PI / 2; // pointing up = aligned
            const wobble = Math.sin(tRef.current * 3 + d.baseAngle * 5) * thermalWobble;
            const angle = d.baseAngle * (1 - alignFactor) + targetAngle * alignFactor + wobble;

            const arrowLen = 16;
            const ex = px + Math.cos(angle) * arrowLen;
            const ey = py + Math.sin(angle) * arrowLen;

            // Color: blue if aligned, gray if random
            const aligned = Math.abs(((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) - (Math.PI * 1.5)) < 0.6;
            ctx.strokeStyle = aligned ? '#2563eb' : '#94a3b8';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(ex, ey);
            ctx.stroke();

            // Arrowhead
            const headLen = 5;
            const headAngle = 0.5;
            ctx.beginPath();
            ctx.moveTo(ex, ey);
            ctx.lineTo(ex - Math.cos(angle - headAngle) * headLen, ey - Math.sin(angle - headAngle) * headLen);
            ctx.moveTo(ex, ey);
            ctx.lineTo(ex - Math.cos(angle + headAngle) * headLen, ey - Math.sin(angle + headAngle) * headLen);
            ctx.stroke();
        }

        // Magnetization bar
        const barY = dy + dh + 36;
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Magnetization: ${magnetResponse}%`, W / 2, barY);

        const bx = W * 0.15, bw = W * 0.7, bh = 14;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx, barY + 6, bw, bh);
        ctx.fillStyle = magnetResponse > 60 ? '#2563eb' : magnetResponse > 30 ? '#f59e0b' : '#94a3b8';
        ctx.fillRect(bx, barY + 6, bw * (magnetResponse / 100), bh);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, barY + 6, bw, bh);

        // Info
        const infoY = barY + 34;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(12, infoY, W - 24, H - infoY - 8);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(12, infoY, W - 24, H - infoY - 8);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Iron Fraction: ${ironFraction}%`, 20, infoY + 14);
        ctx.fillText(`Temperature: ${temperature}°C`, 20, infoY + 26);
        ctx.textAlign = 'right';
        ctx.fillText('More iron → stronger domain alignment', W - 20, infoY + 14);
        ctx.fillText('Higher temp → domains randomize', W - 20, infoY + 26);

        animRef.current = requestAnimationFrame(draw);
    }, [ironFraction, temperature, magnetResponse, phase]);

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
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[220px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <label className="text-slate-300 text-xs">Iron Fraction: <span className="text-emerald-300">{ironFraction}%</span></label>
                <input type="range" min={0} max={100} value={ironFraction}
                    onChange={e => { const v = Number(e.target.value); setIronFraction(v); onStateChange('ironFraction', v); }}
                    className="w-full accent-emerald-500" />
                <label className="text-slate-300 text-xs">Temperature: <span className="text-amber-300">{temperature}°C</span></label>
                <input type="range" min={0} max={120} value={temperature}
                    onChange={e => { const v = Number(e.target.value); setTemperature(v); onStateChange('temperature', v); }}
                    className="w-full accent-amber-500" />
            </div>
        </div>
    );
};