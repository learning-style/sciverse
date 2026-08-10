import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C21CarbonCycleLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C21CarbonCycleLab = ({ state, onStateChange }: C21CarbonCycleLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [photosynthesis, setPhotosynthesis] = useState(55);
    const [combustion, setCombustion] = useState(45);
    const [oceanUptake, setOceanUptake] = useState(50);
    const phase = (state.phase as string) || 'intro';

    const plantUptake = useMemo(() => Math.round(photosynthesis * 0.8), [photosynthesis]);
    const emissionFlux = useMemo(() => Math.round(combustion * 0.9), [combustion]);
    const oceanSink = useMemo(() => Math.round(oceanUptake * 0.75), [oceanUptake]);
    // Ocean uptake responds to atmospheric CO2 pressure (Henry's Law) — higher combustion / lower photosynthesis → more CO2 → ocean absorbs more
    const effectiveOceanIntensity = useMemo(
        () => Math.max(5, Math.min(100, Math.round(oceanUptake + (emissionFlux - plantUptake * 0.55) * 0.65))),
        [oceanUptake, emissionFlux, plantUptake]
    );
    const netAtmosphericChange = useMemo(
        () => Math.round(emissionFlux - (plantUptake * 0.55 + oceanSink * 0.45)),
        [emissionFlux, plantUptake, oceanSink]
    );
    const balance = useMemo(
        () => Math.max(0, Math.min(100, Math.round(100 - Math.abs(netAtmosphericChange) * 1.5))),
        [netAtmosphericChange]
    );
    const cycleHealth = useMemo(
        () => Math.max(0, Math.min(100, Math.round(55 + (photosynthesis - combustion) * 0.35 + (oceanUptake - 50) * 0.25))),
        [photosynthesis, combustion, oceanUptake]
    );

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

        const atmosphere = { x: W * 0.5, y: H * 0.45, w: 170, h: 44 };
        const plants = { x: W * 0.15, y: H * 0.45, w: 146, h: 42 };
        const ocean = { x: W * 0.5, y: H * 0.12, w: 190, h: 44 };
        const soil = { x: W * 0.5, y: H * 0.82, w: 170, h: 42 };

        const drawNode = (node: { x: number; y: number; w: number; h: number }, label: string, color: string) => {
            ctx.fillStyle = color + '22';
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.roundRect(node.x - node.w / 2, node.y - node.h / 2, node.w, node.h, 10);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(label, node.x, node.y + 5);
        };

        const drawFlow = (
            fromX: number,
            fromY: number,
            toX: number,
            toY: number,
            color: string,
            intensity: number,
            label: string
        ) => {
            const dots = Math.max(3, Math.round(intensity / 10));
            const speed = 0.25 + intensity / 170;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2 + intensity / 50;
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();

            const dx = toX - fromX;
            const dy = toY - fromY;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const ax = toX - ux * 10;
            const ay = toY - uy * 10;
            ctx.beginPath();
            ctx.moveTo(toX, toY);
            ctx.lineTo(ax - uy * 5, ay + ux * 5);
            ctx.lineTo(ax + uy * 5, ay - ux * 5);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            for (let i = 0; i < dots; i += 1) {
                const p = ((t * speed + i / dots) % 1 + 1) % 1;
                const x = fromX + dx * p;
                const y = fromY + dy * p;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, 3 + intensity / 100, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(label, (fromX + toX) / 2, (fromY + toY) / 2 - 10);
        };

        drawNode(atmosphere, 'Atmosphere CO2', '#93c5fd');
        drawNode(plants, 'Plants/Biomass', '#34d399');
        drawNode(soil, 'Soil + Fuel Carbon', '#f97316');
        drawNode(ocean, 'Ocean Dissolved Carbon', '#38bdf8');

        // Step 1: LEFT — Atmosphere → Plants (photosynthesis)
        drawFlow(atmosphere.x - atmosphere.w / 2, atmosphere.y, plants.x + plants.w / 2, plants.y, '#34d399', photosynthesis, '');
        ctx.fillStyle = '#059669';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Step 1: photosynthesis', (atmosphere.x + plants.x) / 2, atmosphere.y - 18);
        ctx.fillText('(+ sink)', (atmosphere.x + plants.x) / 2, atmosphere.y - 5);

        // Step 2: BOTTOM — Soil → Atmosphere (combustion / source)
        drawFlow(soil.x, soil.y - soil.h / 2, atmosphere.x + 30, atmosphere.y + atmosphere.h / 2, '#ef4444', combustion, '');
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: combustion', atmosphere.x + atmosphere.w / 2 + 8, (atmosphere.y + soil.y) / 2 - 6);
        ctx.fillText('(+ source)', atmosphere.x + atmosphere.w / 2 + 8, (atmosphere.y + soil.y) / 2 + 8);

        // Step 3: Plants → Soil (respiration/decomposition) — diagonal
        drawFlow(plants.x + 30, plants.y + plants.h / 2, soil.x - 30, soil.y - soil.h / 2, '#eab308', Math.round((photosynthesis + combustion) * 0.45), '');
        ctx.fillStyle = '#a16207';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Step 3: respiration/', plants.x - 10, (plants.y + soil.y) / 2 - 6);
        ctx.fillText('decomposition', plants.x - 10, (plants.y + soil.y) / 2 + 8);

        // Step 4: TOP — Atmosphere → Ocean (ocean uptake)
        drawFlow(atmosphere.x, atmosphere.y - atmosphere.h / 2, ocean.x, ocean.y + ocean.h / 2, '#38bdf8', effectiveOceanIntensity, '');
        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Step 4: ocean uptake', atmosphere.x + atmosphere.w / 2 + 8, (atmosphere.y + ocean.y) / 2 - 6);
        ctx.fillText('(+ sink)', atmosphere.x + atmosphere.w / 2 + 8, (atmosphere.y + ocean.y) / 2 + 8);

        const atmoBarX = W - 234;
        const atmoBarY = H - 48;
        const atmoBarW = Math.max(0, Math.min(220, 90 + netAtmosphericChange * 1.6));
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(atmoBarX, atmoBarY, 220, 12);
        ctx.fillStyle = netAtmosphericChange > 0 ? '#ef4444' : '#34d399';
        ctx.fillRect(atmoBarX, atmoBarY, atmoBarW, 12);
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`atmospheric change ${netAtmosphericChange >= 0 ? '+' : ''}${netAtmosphericChange}`, W - 14, atmoBarY - 6);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Cycle Balance ${balance}% | Cycle Health ${cycleHealth}%`, 14, 22);

        animRef.current = requestAnimationFrame(draw);
    }, [balance, cycleHealth, netAtmosphericChange, photosynthesis, combustion, oceanUptake, effectiveOceanIntensity]);

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
                <label className="text-[10px] text-slate-600">Photosynthesis: {photosynthesis}</label>
                <input className="w-full accent-emerald-500 mb-0.5" type="range" min={0} max={100} value={photosynthesis}
                    onChange={e => { const v = Number(e.target.value); setPhotosynthesis(v); onStateChange('photosynthesis', v); }} />
                <label className="text-[10px] text-slate-600">Combustion: {combustion}</label>
                <input className="w-full accent-rose-500 mb-0.5" type="range" min={0} max={100} value={combustion}
                    onChange={e => { const v = Number(e.target.value); setCombustion(v); onStateChange('combustion', v); }} />
                <label className="text-[10px] text-slate-600">Ocean Uptake: {oceanUptake}</label>
                <input className="w-full accent-cyan-500" type="range" min={0} max={100} value={oceanUptake}
                    onChange={e => { const v = Number(e.target.value); setOceanUptake(v); onStateChange('oceanUptake', v); }} />
            </div>
        </div>
    );
};
