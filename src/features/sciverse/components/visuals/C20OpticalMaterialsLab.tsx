import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C20OpticalMaterialsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const REFRACTIVE_INDEX: Record<string, number> = {
    air: 1.0,
    water: 1.33,
    glass: 1.5,
    acrylic: 1.49,
};

export const C20OpticalMaterialsLab = ({ onStateChange }: C20OpticalMaterialsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [material, setMaterial] = useState<'air' | 'water' | 'glass' | 'acrylic'>('glass');
    const [incidentAngle, setIncidentAngle] = useState(35);

    const refractedAngle = useMemo(() => {
        const n2 = REFRACTIVE_INDEX[material];
        const sinTheta2 = Math.sin((incidentAngle * Math.PI) / 180) / n2;
        const bounded = Math.max(-1, Math.min(1, sinTheta2));
        return (Math.asin(bounded) * 180) / Math.PI;
    }, [material, incidentAngle]);

    const transmittance = material === 'glass' ? 92 : material === 'acrylic' ? 90 : material === 'water' ? 88 : 98;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        const cx = W * 0.5;
        const cy = H * 0.52;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, cy, W, H - cy);

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(W, cy);
        ctx.stroke();

        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, H);
        ctx.stroke();
        ctx.setLineDash([]);

        const inc = (incidentAngle * Math.PI) / 180;
        const ref = (refractedAngle * Math.PI) / 180;

        const sourceX = cx - Math.sin(inc) * 150;
        const sourceY = cy - Math.cos(inc) * 150;

        const glow = 0.6 + 0.4 * Math.sin(t * 6);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.55 + glow * 0.25})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(sourceX, sourceY);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        const outLen = 170;
        const outX = cx + Math.sin(ref) * outLen;
        const outY = cy + Math.cos(ref) * outLen;
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(outX, outY);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(248, 250, 252, 0.55)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.sin(inc) * 120, cy - Math.cos(inc) * 120);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`n1 air=1.00`, 12, 20);
        ctx.fillText(`n2 ${material}=${REFRACTIVE_INDEX[material].toFixed(2)}`, 12, 36);
        ctx.fillText(`incident=${incidentAngle.toFixed(1)} deg`, 12, H - 28);
        ctx.fillText(`refracted=${refractedAngle.toFixed(1)} deg`, 12, H - 12);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#86efac';
        ctx.fillText(`Transmittance ${transmittance}%`, W - 12, 20);

        animRef.current = requestAnimationFrame(draw);
    }, [incidentAngle, material, refractedAngle, transmittance]);

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
                <select className="w-full bg-slate-100 border border-slate-300 rounded p-1 text-[10px] text-slate-700" value={material}
                    onChange={e => { const v = e.target.value as 'air' | 'water' | 'glass' | 'acrylic'; setMaterial(v); onStateChange('material', v); }}>
                    <option value="air">Air</option>
                    <option value="water">Water</option>
                    <option value="glass">Glass</option>
                    <option value="acrylic">Acrylic</option>
                </select>
                <label className="text-[10px] text-slate-600 mt-1">Incident Angle: {incidentAngle} deg</label>
                <input className="w-full accent-cyan-500" type="range" min={5} max={75} value={incidentAngle}
                    onChange={e => { const v = Number(e.target.value); setIncidentAngle(v); onStateChange('incidentAngle', v); }} />
            </div>
        </div>
    );
};