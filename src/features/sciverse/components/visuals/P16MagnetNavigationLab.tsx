import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P16MagnetNavigationLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P16MagnetNavigationLab = ({ state, onStateChange }: P16MagnetNavigationLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [fieldStrength, setFieldStrength] = useState(60);
    const [disturbance, setDisturbance] = useState(20);

    const phase = (state.phase as string) || 'intro';
    const needleAngle = useMemo(() => {
        const drift = (disturbance - 50) * 0.8;
        return Math.max(-75, Math.min(75, drift));
    }, [disturbance]);

    const alignment = Math.max(0, Math.round(100 - Math.abs(needleAngle) - (100 - fieldStrength) * 0.35));

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
        ctx.fillText('Magnet Navigation Lab', W / 2, 26);

        const cx = W * 0.5;
        const cy = H * 0.40;
        const r = Math.min(W, H) * 0.25;

        // Compass ring
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Cardinal directions
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('N', cx, cy - r - 10);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText('S', cx, cy + r + 16);
        ctx.fillText('E', cx + r + 14, cy + 4);
        ctx.fillText('W', cx - r - 14, cy + 4);

        // Tick marks
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        for (let i = 0; i < 36; i++) {
            const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
            const inner = i % 9 === 0 ? r - 12 : r - 6;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
            ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
            ctx.stroke();
        }

        // Field particles orbiting
        for (let i = 0; i < 12; i++) {
            const a = (i / 12) * Math.PI * 2 + tRef.current * 0.35;
            const band = r + 14 + (i % 2) * 8;
            const x = cx + Math.cos(a) * band;
            const y = cy + Math.sin(a) * band;
            const size = 2 + (fieldStrength / 100) * 2.5;
            ctx.fillStyle = `rgba(34, 211, 238, ${0.3 + (fieldStrength / 100) * 0.4})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Cyan north reference line
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy - (r - 14));
        ctx.stroke();

        // Red needle with wobble
        const wobble = Math.sin(tRef.current * 4) * (disturbance / 100) * 8;
        const angle = ((needleAngle + wobble - 90) * Math.PI) / 180;
        const nx = cx + Math.cos(angle) * (r - 14);
        const ny = cy + Math.sin(angle) * (r - 14);

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Center dot
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();

        // Stats
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Alignment: ${alignment}%`, cx, H * 0.74);
        ctx.fillStyle = '#475569';
        ctx.font = '11px monospace';
        ctx.fillText(`Needle drift: ${Math.round(Math.abs(needleAngle))}°`, cx, H * 0.78);

        // Info bar
        const by = H * 0.82;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(12, by, W - 24, H - by - 8);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(12, by, W - 24, H - by - 8);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Field Strength: ${fieldStrength}`, 20, by + 14);
        ctx.fillText(`Disturbance: ${disturbance}`, 20, by + 26);
        ctx.textAlign = 'right';
        ctx.fillText('Stronger field → more reliable heading', W - 20, by + 14);
        ctx.fillText('More disturbance → greater needle drift', W - 20, by + 26);

        animRef.current = requestAnimationFrame(draw);
    }, [alignment, disturbance, fieldStrength, needleAngle, phase]);

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
                <label className="text-slate-300 text-xs">Field Strength: <span className="text-cyan-300">{fieldStrength}</span></label>
                <input type="range" min={10} max={100} value={fieldStrength}
                    onChange={e => { const v = Number(e.target.value); setFieldStrength(v); onStateChange('fieldStrength', v); }}
                    className="w-full accent-cyan-500" />
                <label className="text-slate-300 text-xs">Disturbance: <span className="text-rose-300">{disturbance}</span></label>
                <input type="range" min={0} max={100} value={disturbance}
                    onChange={e => { const v = Number(e.target.value); setDisturbance(v); onStateChange('disturbance', v); }}
                    className="w-full accent-rose-500" />
            </div>
        </div>
    );
};