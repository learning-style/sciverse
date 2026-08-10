import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P21TidalCyclesLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P21TidalCyclesLab = ({ state, onStateChange }: P21TidalCyclesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [moonAlignment, setMoonAlignment] = useState(70);
    const [rotationRate, setRotationRate] = useState(50);
    const phase = (state.phase as string) || 'intro';

    const tidalRange = useMemo(() => Math.max(0, Math.min(100, Math.round(moonAlignment * 0.7 + rotationRate * 0.3))), [moonAlignment, rotationRate]);

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

        const cx = W * 0.38;
        const cy = H * 0.5;
        const earthR = Math.min(W, H) * 0.18;

        // Earth
        ctx.fillStyle = '#1e40af';
        ctx.beginPath();
        ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(cx - earthR * 0.2, cy - earthR * 0.1, earthR * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Tidal bulges
        const bulgeSize = (tidalRange / 100) * earthR * 0.45;
        const moonAngle = (moonAlignment / 100) * Math.PI * 0.4;
        ctx.fillStyle = 'rgba(56,189,248,0.4)';
        ctx.beginPath();
        ctx.ellipse(cx + (earthR + bulgeSize * 0.5) * Math.cos(moonAngle), cy - (earthR + bulgeSize * 0.5) * Math.sin(moonAngle), bulgeSize, earthR * 0.6, -moonAngle, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx - (earthR + bulgeSize * 0.5) * Math.cos(moonAngle), cy + (earthR + bulgeSize * 0.5) * Math.sin(moonAngle), bulgeSize, earthR * 0.6, -moonAngle, 0, Math.PI * 2);
        ctx.fill();

        // Moon
        const moonDist = W * 0.28;
        const moonX = cx + moonDist * Math.cos(moonAngle);
        const moonY = cy - moonDist * Math.sin(moonAngle);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(moonX, moonY, earthR * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#64748b';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Moon', moonX, moonY + earthR * 0.28 + 14);

        // Gravitational pull line
        ctx.strokeStyle = 'rgba(250,204,21,0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(moonX, moonY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Rotation indicator
        const rotAngle = t * (rotationRate / 100) * 2;
        const markerX = cx + earthR * 0.85 * Math.cos(rotAngle);
        const markerY = cy + earthR * 0.85 * Math.sin(rotAngle);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(markerX, markerY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Tide height chart on right side
        const chartX = W * 0.68;
        const chartW = W * 0.28;
        const chartY = H * 0.2;
        const chartH = H * 0.6;
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(chartX, chartY);
        ctx.lineTo(chartX, chartY + chartH);
        ctx.lineTo(chartX + chartW, chartY + chartH);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('time →', chartX + chartW / 2, chartY + chartH + 14);

        // Sine wave representing tidal pattern
        const amp = (tidalRange / 100) * chartH * 0.35;
        const freq = 0.8 + (rotationRate / 100) * 1.2;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= chartW; x += 2) {
            const y = chartY + chartH / 2 - amp * Math.sin((x / chartW) * Math.PI * 2 * freq + t * 1.5);
            if (x === 0) ctx.moveTo(chartX + x, y);
            else ctx.lineTo(chartX + x, y);
        }
        ctx.stroke();

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Tidal Range ${tidalRange}%`, 14, 22);

        animRef.current = requestAnimationFrame(draw);
    }, [moonAlignment, rotationRate, tidalRange]);

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

    // Only animate if phase is 'cycle' or 'animate'
    useEffect(() => {
        if (phase === 'cycle' || phase === 'animate') {
            cancelAnimationFrame(animRef.current);
            animRef.current = requestAnimationFrame(draw);
            return () => cancelAnimationFrame(animRef.current);
        } else {
            // Draw a single static frame
            cancelAnimationFrame(animRef.current);
            draw();
            return () => cancelAnimationFrame(animRef.current);
        }
    }, [draw, phase]);

    return (
        <div className="w-full h-full min-h-[500px] bg-white flex flex-col items-center justify-center">
            {/* Static diagrams above, centered */}
            <div className="w-full flex gap-6 mb-4 justify-center">
                <div className="flex flex-col items-center">
                    <img src={"/src/features/sciverse/components/visuals/assets/spring-tide.svg"} alt="Spring Tide Diagram" style={{width: 120}} />
                    <span className="text-xs mt-2">Spring Tide: Sun, Earth, and Moon aligned</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src={"/src/features/sciverse/components/visuals/assets/neap-tide.svg"} alt="Neap Tide Diagram" style={{width: 120}} />
                    <span className="text-xs mt-2">Neap Tide: Sun and Moon are at right angles <b>to Earth</b></span>
                </div>
            </div>
            {/* Visual area below, fills width */}
            <div ref={containerRef} className="relative w-full max-w-4xl min-h-[400px] bg-white">
                <canvas ref={canvasRef} className="w-full h-full" />
                <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[180px] shadow-md">
                    <label className="text-[10px] text-slate-600">Moon Alignment: {moonAlignment}</label>
                    <input className="w-full accent-cyan-500 mb-0.5" type="range" min={0} max={100} value={moonAlignment}
                        onChange={e => { const v = Number(e.target.value); setMoonAlignment(v); onStateChange('moonAlignment', v); }} />
                    <label className="text-[10px] text-slate-600">Rotation Effect: {rotationRate}</label>
                    <input className="w-full accent-indigo-500" type="range" min={0} max={100} value={rotationRate}
                        onChange={e => { const v = Number(e.target.value); setRotationRate(v); onStateChange('rotationRate', v); }} />
                </div>
            </div>
        </div>
    );
};
