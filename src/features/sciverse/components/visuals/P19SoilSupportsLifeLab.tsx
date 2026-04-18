import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P19SoilSupportsLifeLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P19SoilSupportsLifeLab = ({ state, onStateChange }: P19SoilSupportsLifeLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [compaction, setCompaction] = useState(35);
    const [moisture, setMoisture] = useState(55);
    const [organicMatter, setOrganicMatter] = useState(45);
    const phase = (state.phase as string) || 'intro';

    const rootSupport = useMemo(() => {
        const moistureWindow = Math.max(0, 100 - Math.abs(moisture - 55) * 2.2);
        const porosityFactor = Math.max(0, 100 - compaction * 1.05);
        const raw = organicMatter * 0.42 + moistureWindow * 0.28 + porosityFactor * 0.34 - compaction * 0.35;
        return Math.max(0, Math.min(100, Math.round(raw)));
    }, [compaction, moisture, organicMatter]);

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

        // Sky
        ctx.fillStyle = '#ecfdf5';
        ctx.fillRect(0, 0, W, H * 0.2);

        // Surface
        const surfY = H * 0.2;

        // Compacted layer
        const compFrac = compaction / 100;
        const compLayerH = 6 + compFrac * 18;
        ctx.fillStyle = `rgba(127,29,29,${0.15 + compFrac * 0.45})`;
        ctx.fillRect(0, surfY, W, compLayerH);

        // Topsoil
        ctx.fillStyle = '#78350f';
        ctx.fillRect(0, surfY + compLayerH, W, H * 0.25);

        // Subsoil
        ctx.fillStyle = '#92400e';
        ctx.fillRect(0, surfY + compLayerH + H * 0.25, W, H * 0.25);

        // Deep layer
        ctx.fillStyle = '#a16207';
        ctx.fillRect(0, surfY + compLayerH + H * 0.5, W, H);

        // Pore tunnels - narrower with more compaction
        const poreW = Math.max(1, (1 - compFrac) * 6);
        const poreCount = 8;
        for (let i = 0; i < poreCount; i++) {
            const px = W * 0.1 + (W * 0.8 / poreCount) * i;
            const depth = surfY + compLayerH + 10;
            const poreH = H * 0.35 * (1 - compFrac * 0.6);
            ctx.strokeStyle = `rgba(180,140,100,${0.3 + (1 - compFrac) * 0.4})`;
            ctx.lineWidth = poreW;
            ctx.beginPath();
            ctx.moveTo(px, depth);
            ctx.lineTo(px + Math.sin(i * 1.3) * 8, depth + poreH);
            ctx.stroke();
        }

        // Moisture - cyan highlights in pores
        const moistFrac = moisture / 100;
        for (let i = 0; i < Math.round(moistFrac * 15); i++) {
            const mx = 20 + ((i * 53) % (W - 40));
            const my = surfY + compLayerH + 15 + ((i * 31) % (H * 0.4));
            ctx.fillStyle = `rgba(34,211,238,${0.2 + moistFrac * 0.4})`;
            ctx.beginPath();
            ctx.arc(mx, my, 2 + moistFrac * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Organic matter - amber aggregates
        const orgFrac = organicMatter / 100;
        for (let i = 0; i < Math.round(orgFrac * 12); i++) {
            const ox = 30 + ((i * 67) % (W - 60));
            const oy = surfY + compLayerH + 8 + ((i * 43) % (H * 0.35));
            ctx.fillStyle = `rgba(245,158,11,${0.3 + orgFrac * 0.5})`;
            ctx.beginPath();
            ctx.arc(ox, oy, 3 + orgFrac * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Roots - green curved strands, length depends on rootSupport
        const rootFrac = rootSupport / 100;
        const rootCount = 3 + Math.round(rootFrac * 5);
        for (let i = 0; i < rootCount; i++) {
            const rx = W * 0.15 + (W * 0.7 / rootCount) * i;
            const rootLength = H * 0.1 + rootFrac * H * 0.3;
            ctx.strokeStyle = `rgba(34,197,94,${0.4 + rootFrac * 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(rx, surfY + compLayerH);
            ctx.quadraticCurveTo(
                rx + Math.sin(t * 0.5 + i) * 12,
                surfY + compLayerH + rootLength * 0.5,
                rx + Math.sin(i * 2) * 15,
                surfY + compLayerH + rootLength
            );
            ctx.stroke();
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Root Support ${rootSupport}%`, 14, 18);

        animRef.current = requestAnimationFrame(draw);
    }, [compaction, moisture, organicMatter, rootSupport]);

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
                <label className="text-[10px] text-slate-600">Compaction: {compaction}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={compaction}
                    onChange={e => { const v = Number(e.target.value); setCompaction(v); onStateChange('compaction', v); }} />
                <label className="text-[10px] text-slate-600">Moisture: {moisture}</label>
                <input className="w-full accent-cyan-500" type="range" min={0} max={100} value={moisture}
                    onChange={e => { const v = Number(e.target.value); setMoisture(v); onStateChange('moisture', v); }} />
                <label className="text-[10px] text-slate-600">Organic Matter: {organicMatter}</label>
                <input className="w-full accent-amber-500" type="range" min={0} max={100} value={organicMatter}
                    onChange={e => { const v = Number(e.target.value); setOrganicMatter(v); onStateChange('organicMatter', v); }} />
            </div>
        </div>
    );
};