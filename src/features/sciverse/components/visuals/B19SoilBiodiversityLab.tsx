import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B19SoilBiodiversityLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B19SoilBiodiversityLab = ({ state, onStateChange }: B19SoilBiodiversityLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [organicInput, setOrganicInput] = useState(50);
    const [pesticide, setPesticide] = useState(25);
    const [moisture, setMoisture] = useState(55);
    const phase = (state.phase as string) || 'intro';

    const biodiversity = useMemo(() => {
        const moistureBonus = Math.max(0, 100 - Math.abs(moisture - 55) * 2.1);
        const raw = organicInput * 0.58 - pesticide * 0.62 + moistureBonus * 0.32 + 18;
        return Math.max(0, Math.min(100, Math.round(raw)));
    }, [organicInput, pesticide, moisture]);

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

        const bioFrac = biodiversity / 100;
        const pestFrac = pesticide / 100;
        const orgFrac = organicInput / 100;
        const moistFrac = moisture / 100;

        // Food web nodes
        const nodeCount = 4 + Math.round(bioFrac * 8);
        const nodes: { x: number; y: number }[] = [];
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            const r = Math.min(W, H) * 0.28 * (0.5 + bioFrac * 0.5);
            nodes.push({
                x: W * 0.5 + Math.cos(angle + t * 0.1) * r,
                y: H * 0.48 + Math.sin(angle + t * 0.1) * r * 0.7,
            });
        }

        // Web links
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if ((i + j) % 3 !== 0) continue;
                const fade = pestFrac > 0.5 && (i + j) % 5 === 0 ? 0.08 : 0.12 + bioFrac * 0.2;
                ctx.strokeStyle = `rgba(245,158,11,${fade})`;
                ctx.lineWidth = 1 + orgFrac * 1.5;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }

        // Organism nodes
        nodes.forEach((n, i) => {
            const glow = 0.3 + moistFrac * 0.4 + Math.sin(t * 1.5 + i) * 0.1;
            ctx.fillStyle = `rgba(139,92,246,${glow})`;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 4 + bioFrac * 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Pesticide stress overlay
        if (pestFrac > 0.2) {
            for (let i = 0; i < Math.round(pestFrac * 6); i++) {
                const sx = W * 0.15 + ((i * 89) % (W * 0.7));
                const sy = H * 0.2 + ((i * 67) % (H * 0.6));
                ctx.fillStyle = `rgba(239,68,68,${0.05 + pestFrac * 0.08})`;
                ctx.beginPath();
                ctx.arc(sx, sy, 15 + pestFrac * 20, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Biodiversity ${biodiversity}%`, 14, 22);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 19 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Does Soil Support Life?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P19 Soil Physics', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C19 Soil Chemistry', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B19 Soil Biodiversity', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Healthy soil → thriving ecosystems!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [organicInput, pesticide, moisture, biodiversity, phase]);

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
                <label className="text-[10px] text-slate-600">Organic Input: {organicInput}</label>
                <input className="w-full accent-amber-500" type="range" min={0} max={100} value={organicInput}
                    onChange={e => { const v = Number(e.target.value); setOrganicInput(v); onStateChange('organicInput', v); }} />
                <label className="text-[10px] text-slate-600">Pesticide Pressure: {pesticide}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={pesticide}
                    onChange={e => { const v = Number(e.target.value); setPesticide(v); onStateChange('pesticide', v); }} />
                <label className="text-[10px] text-slate-600">Moisture: {moisture}</label>
                <input className="w-full accent-violet-500" type="range" min={0} max={100} value={moisture}
                    onChange={e => { const v = Number(e.target.value); setMoisture(v); onStateChange('moisture', v); }} />
            </div>
        </div>
    );
};