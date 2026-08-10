import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B18RiverHabitatsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B18RiverHabitatsLab = ({ state, onStateChange }: B18RiverHabitatsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [oxygen, setOxygen] = useState(70);
    const [temperature, setTemperature] = useState(18);
    const [flow, setFlow] = useState(50);
    const phase = (state.phase as string) || 'intro';

    const habitatHealth = useMemo(() => {
        const tempPenalty = Math.max(0, (temperature - 20) * 2);
        return Math.max(0, Math.min(100, Math.round(oxygen * 0.5 + flow * 0.3 + 25 - tempPenalty)));
    }, [oxygen, temperature, flow]);

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

        // River water
        ctx.fillStyle = '#dbeafe';
        ctx.fillRect(0, H * 0.25, W, H * 0.55);

        // Riverbed
        ctx.fillStyle = '#92400e';
        ctx.fillRect(0, H * 0.8, W, H * 0.2);

        // Flow current lines
        const flowFrac = flow / 100;
        for (let i = 0; i < 6; i++) {
            const ly = H * 0.3 + (H * 0.45 / 6) * i;
            const offset = ((t * (0.3 + flowFrac * 0.7) * 60 + i * 50) % W);
            ctx.strokeStyle = `rgba(59,130,246,${0.2 + flowFrac * 0.3})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(offset - 30, ly);
            ctx.quadraticCurveTo(offset, ly - 4, offset + 30, ly);
            ctx.stroke();
        }
        // Flow current label
        ctx.fillStyle = `rgba(37,99,235,${0.35 + flowFrac * 0.45})`;
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`Flow ${flow}% →`, W - 10, H * 0.27);

        // Fish icons
        const healthFrac = habitatHealth / 100;
        const fishCount = Math.max(1, Math.round(healthFrac * 6));
        for (let i = 0; i < fishCount; i++) {
            const fx = ((i * 127 + t * 30 * flowFrac) % (W - 40)) + 20;
            const fy = H * 0.32 + ((i * 43) % (H * 0.4));
            const size = 6 + healthFrac * 4;
            ctx.fillStyle = `rgba(59,130,246,${0.4 + healthFrac * 0.4})`;
            ctx.beginPath();
            ctx.ellipse(fx, fy, size, size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Tail
            ctx.beginPath();
            ctx.moveTo(fx - size, fy);
            ctx.lineTo(fx - size - 4, fy - 3);
            ctx.lineTo(fx - size - 4, fy + 3);
            ctx.closePath();
            ctx.fill();
        }

        // Aquatic plants on bed
        for (let i = 0; i < 5; i++) {
            const px = W * 0.1 + (W * 0.8 / 5) * i;
            const plantH = 15 + healthFrac * 25;
            ctx.strokeStyle = `rgba(34,197,94,${0.3 + healthFrac * 0.4})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, H * 0.8);
            ctx.quadraticCurveTo(px + Math.sin(t + i) * 8, H * 0.8 - plantH * 0.5, px + Math.sin(t * 0.7 + i) * 5, H * 0.8 - plantH);
            ctx.stroke();
        }

        // Oxygen bubbles
        const o2Frac = oxygen / 100;
        for (let i = 0; i < Math.round(o2Frac * 8); i++) {
            const bx = W * 0.1 + ((i * 73) % (W * 0.8));
            const by = H * 0.75 - ((t * 20 + i * 30) % (H * 0.45));
            ctx.strokeStyle = `rgba(56,189,248,${0.3 + o2Frac * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(bx, by, 2 + o2Frac * 1.5, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Temperature stress overlay
        if (temperature > 22) {
            const heatAlpha = Math.min(0.2, (temperature - 22) * 0.015);
            ctx.fillStyle = `rgba(239,68,68,${heatAlpha})`;
            ctx.fillRect(0, H * 0.25, W, H * 0.55);
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Habitat Health ${habitatHealth}%`, 14, 20);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 18 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Rivers Shape the Land?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P18 River Flow & Erosion', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C18 Dissolved River Chemistry', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B18 River Habitat Webs', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Rivers shape landscapes and ecosystems!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [oxygen, temperature, flow, habitatHealth, phase]);

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
                <label className="text-[10px] text-slate-600">Dissolved Oxygen: {oxygen}</label>
                <input className="w-full accent-cyan-500" type="range" min={0} max={100} value={oxygen}
                    onChange={e => { const v = Number(e.target.value); setOxygen(v); onStateChange('oxygen', v); }} />
                <label className="text-[10px] text-slate-600">Water Temp: {temperature} C</label>
                <input className="w-full accent-orange-500" type="range" min={2} max={34} value={temperature}
                    onChange={e => { const v = Number(e.target.value); setTemperature(v); onStateChange('temperature', v); }} />
                <label className="text-[10px] text-slate-600">Flow Stability: {flow}</label>
                <input className="w-full accent-emerald-500" type="range" min={0} max={100} value={flow}
                    onChange={e => { const v = Number(e.target.value); setFlow(v); onStateChange('flow', v); }} />
            </div>
        </div>
    );
};