import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C17ConstructionMaterialsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MATERIAL_BASE: Record<string, number> = {
    concrete: 78,
    steel: 88,
    wood: 62,
};

export const C17ConstructionMaterialsLab = ({ state, onStateChange }: C17ConstructionMaterialsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [material, setMaterial] = useState<'concrete' | 'steel' | 'wood'>('concrete');
    const [moisture, setMoisture] = useState(25);
    const [temperature, setTemperature] = useState(20);
    const phase = (state.phase as string) || 'intro';

    const strength = useMemo(() => {
        const base = MATERIAL_BASE[material];
        const moisturePenalty = material === 'wood' ? moisture * 0.3 : moisture * 0.12;
        const tempPenalty = material === 'steel' ? Math.max(0, temperature - 35) * 0.25 : Math.max(0, temperature - 45) * 0.1;
        return Math.max(0, Math.min(100, Math.round(base - moisturePenalty - tempPenalty)));
    }, [material, moisture, temperature]);

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

        const barX = W * 0.25;
        const barW = W * 0.5;
        const barBottom = H * 0.75;
        const maxBarH = H * 0.5;
        const barH = (strength / 100) * maxBarH;

        // Material color
        const colors: Record<string, string> = { concrete: '#94a3b8', steel: '#6366f1', wood: '#a16207' };
        const fillColor = colors[material] || '#94a3b8';

        // Bar
        ctx.fillStyle = fillColor;
        ctx.fillRect(barX, barBottom - barH, barW, barH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barBottom - barH, barW, barH);

        // Material texture hints
        if (material === 'wood') {
            for (let i = 0; i < 5; i++) {
                const gy = barBottom - barH + (barH / 5) * i + 8;
                ctx.strokeStyle = 'rgba(120,53,15,0.25)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(barX + 4, gy);
                ctx.bezierCurveTo(barX + barW * 0.3, gy - 3, barX + barW * 0.7, gy + 3, barX + barW - 4, gy);
                ctx.stroke();
            }
        } else if (material === 'steel') {
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(barX + 6, barBottom - barH + 6, barW * 0.3, barH - 12);
        }

        // Moisture droplets – bright blue water drops above the block
        const moistFrac = moisture / 100;
        const dropCount = Math.round(moistFrac * 10);
        for (let i = 0; i < dropCount; i++) {
            const dx = barX + 8 + ((i * 47) % (barW - 16));
            const dy = barBottom - barH - 10 - Math.sin(t * 2 + i) * 5;
            const r = 3.5 + moistFrac * 2;
            // Drop body
            ctx.fillStyle = '#0ea5e9';
            ctx.beginPath();
            ctx.arc(dx, dy, r, 0, Math.PI * 2);
            ctx.fill();
            // Highlight
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(dx - r * 0.25, dy - r * 0.3, r * 0.35, 0, Math.PI * 2);
            ctx.fill();
        }
        if (dropCount > 0) {
            ctx.fillStyle = '#0284c7';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`💧 Moisture ${moisture}%`, barX + barW, barBottom - barH - 22);
        }

        // Temperature heat waves – bright red rising waves above the block
        if (temperature > 35) {
            const heatFrac = Math.min(1, (temperature - 35) / 55);
            for (let i = 0; i < 5; i++) {
                const hx = barX + (barW / 5) * i + barW / 10;
                const amp = 5 + heatFrac * 8;
                ctx.strokeStyle = `rgba(220,38,38,${0.5 + heatFrac * 0.4})`;
                ctx.lineWidth = 2 + heatFrac;
                ctx.beginPath();
                for (let y = 0; y < 28; y += 2) {
                    ctx.lineTo(hx + Math.sin((y + t * 40) * 0.3) * amp, barBottom - barH - 14 - y);
                }
                ctx.stroke();
            }
            ctx.fillStyle = '#dc2626';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`🔥 Heat ${temperature}°C`, barX, barBottom - barH - 22 - (dropCount > 0 ? 14 : 0));
        }

        // Strength gauge – right of the block
        const gaugeX = barX + barW + W * 0.06;
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(gaugeX, H * 0.2, 14, maxBarH);
        ctx.fillStyle = strength >= 60 ? '#22c55e' : '#ef4444';
        ctx.fillRect(gaugeX, barBottom - barH, 14, barH);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(gaugeX, H * 0.2, 14, maxBarH);

        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${material.charAt(0).toUpperCase() + material.slice(1)} Strength ${strength}%`, gaugeX - 4, H * 0.16);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'center';
        ctx.fillText(material, barX + barW / 2, barBottom + 18);

        animRef.current = requestAnimationFrame(draw);
    }, [material, moisture, temperature, strength]);

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
                <label className="text-[10px] text-slate-600">Material</label>
                <select className="w-full bg-slate-100 border border-slate-300 rounded p-1 text-[10px] text-slate-700 mb-1"
                    value={material}
                    onChange={e => { const v = e.target.value as 'concrete' | 'steel' | 'wood'; setMaterial(v); onStateChange('material', v); }}>
                    <option value="concrete">Concrete</option>
                    <option value="steel">Steel</option>
                    <option value="wood">Wood</option>
                </select>
                <label className="text-[10px] text-slate-600">Moisture: {moisture}%</label>
                <input className="w-full accent-cyan-500" type="range" min={0} max={100} value={moisture}
                    onChange={e => { const v = Number(e.target.value); setMoisture(v); onStateChange('moisture', v); }} />
                <label className="text-[10px] text-slate-600">Temperature: {temperature} C</label>
                <input className="w-full accent-orange-500" type="range" min={-10} max={90} value={temperature}
                    onChange={e => { const v = Number(e.target.value); setTemperature(v); onStateChange('temperature', v); }} />
            </div>
        </div>
    );
};