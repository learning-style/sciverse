import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C23CorrosionLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C23CorrosionLab = ({ onStateChange }: C23CorrosionLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [humidity, setHumidity] = useState(60);
    const [salinity, setSalinity] = useState(45);

    const oxidationRate = useMemo(() => Math.max(0, Math.min(100, Math.round(humidity * 0.5 + salinity * 0.45))), [humidity, salinity]);

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

        // Metal surface
        const surfX = W * 0.15;
        const surfW = W * 0.7;
        const surfY = H * 0.3;
        const surfH = H * 0.4;
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(surfX, surfY, surfW, surfH);

        // Rust patches based on oxidation rate
        const oxFrac = oxidationRate / 100;
        const rustCount = Math.round(oxFrac * 12);
        for (let i = 0; i < rustCount; i++) {
            const rx = surfX + 8 + ((i * 59) % (surfW - 16));
            const ry = surfY + 8 + ((i * 43) % (surfH - 16));
            const rr = 4 + oxFrac * 12 + Math.sin(t * 0.5 + i) * 2;
            ctx.fillStyle = `rgba(180,83,9,${0.2 + oxFrac * 0.5})`;
            ctx.beginPath();
            ctx.arc(rx, ry, rr, 0, Math.PI * 2);
            ctx.fill();
            if (oxFrac > 0.5) {
                ctx.fillStyle = `rgba(127,29,29,${(oxFrac - 0.5) * 0.6})`;
                ctx.beginPath();
                ctx.arc(rx, ry, rr * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Moisture droplets above surface
        const humFrac = humidity / 100;
        // Exaggerated, bold blue droplets for humidity
        for (let i = 0; i < Math.round(humFrac * 12); i++) {
            const dx = surfX + ((i * 47) % surfW);
            const dy = surfY - 14 - Math.sin(t * 2 + i) * 8 - (i % 3) * 10;
            // Outer glow
            ctx.save();
            ctx.shadowColor = 'rgba(56,189,248,0.7)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(dx, dy, 7, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56,189,248,0.55)';
            ctx.fill();
            ctx.restore();
            // Inner highlight
            ctx.beginPath();
            ctx.arc(dx, dy, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56,189,248,0.95)';
            ctx.fill();
            // White highlight
            ctx.beginPath();
            ctx.arc(dx + 2, dy - 2, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fill();
        }

        // Salt crystals on surface
        const salFrac = salinity / 100;
        for (let i = 0; i < Math.round(salFrac * 8); i++) {
            const sx = surfX + 10 + ((i * 67) % (surfW - 20));
            const sy = surfY + surfH + 6 + (i % 2) * 4;
            ctx.fillStyle = `rgba(239,68,68,${0.3 + salFrac * 0.4})`;
            ctx.fillRect(sx - 2, sy - 2, 4, 4);
        }

        // Surface border
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.strokeRect(surfX, surfY, surfW, surfH);

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Oxidation Rate ${oxidationRate}%`, 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = oxidationRate >= 60 ? '#dc2626' : '#15803d';
        ctx.fillText(oxidationRate >= 60 ? 'corrosion: active' : 'corrosion: low', 14, 38);

        animRef.current = requestAnimationFrame(draw);
    }, [humidity, salinity, oxidationRate]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[200px] shadow-md">
                <label className="text-[13px] font-extrabold text-[#b91c1c] drop-shadow">Humidity: <span className="font-extrabold">{humidity}</span></label>
                <input className="w-full accent-cyan-500 mb-0.5" type="range" min={0} max={100} value={humidity}
                    onChange={e => { const v = Number(e.target.value); setHumidity(v); onStateChange('humidity', v); }} />
                <label className="text-[13px] font-extrabold text-[#b91c1c] drop-shadow">Salinity: <span className="font-extrabold">{salinity}</span></label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={salinity}
                    onChange={e => { const v = Number(e.target.value); setSalinity(v); onStateChange('salinity', v); }} />
            </div>
        </div>
    );
};
