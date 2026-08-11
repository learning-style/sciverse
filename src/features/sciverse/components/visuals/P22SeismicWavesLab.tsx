import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P22SeismicWavesLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P22SeismicWavesLab = ({ onStateChange }: P22SeismicWavesLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [match, setMatch] = useState(55);

    const clarity = useMemo(
        () => Math.max(0, Math.min(100, Math.round(match * 0.72 + 28))),
        [match]
    );
    const likelyMap = clarity >= 60;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        const align = match / 100;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        const layers = [H * 0.32, H * 0.5, H * 0.68];
        let top = 28;
        const fills = ['#1e293b', '#1f2937', '#172554', '#111827'];
        for (let i = 0; i < 4; i += 1) {
            const bottom = i < 3 ? layers[i] : H - 16;
            ctx.fillStyle = fills[i];
            ctx.fillRect(12, top, W - 24, bottom - top);
            if (i < 3) {
                ctx.strokeStyle = 'rgba(245,158,11,0.45)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(12, bottom);
                ctx.lineTo(W - 12, bottom);
                ctx.stroke();
                // Label each layer boundary
                ctx.font = 'bold 10px monospace';
                ctx.fillStyle = '#f59e0b';
                ctx.textAlign = 'right';
                ctx.fillText(`Layer ${i + 1} boundary`, W - 18, bottom - 4);
            }
            top = bottom;
        }

        const source = { x: 72, y: 44 };
        const receivers = [
            { x: W * 0.56, y: 44 },
            { x: W * 0.7, y: 44 },
            { x: W * 0.84, y: 44 }
        ];

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(source.x, source.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#fcd34d';
        ctx.fillText('Seismic source', source.x + 10, source.y + 4);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText('P-wave (compression)', source.x + 10, source.y + 18);

        const shift = (1 - align) * 48;
        const picks = [
            { x: W * 0.42 + shift, y: layers[0] },
            { x: W * 0.56 + shift * 0.7, y: layers[1] },
            { x: W * 0.7 + shift * 0.45, y: layers[2] }
        ];

        picks.forEach((p, i) => {
            const r = receivers[i];
            ctx.strokeStyle = 'rgba(244,114,182,0.78)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(p.x, p.y);
            ctx.lineTo(r.x, r.y);
            ctx.stroke();

            // Reflection and refraction annotation
            ctx.font = '10px monospace';
            ctx.fillStyle = '#f472b6';
            ctx.textAlign = 'center';
            if (i === 0) {
                ctx.fillText('reflection', p.x - 18, p.y - 10);
                ctx.fillText('refraction', (source.x + p.x) / 2, (source.y + p.y) / 2 + 16);
            }

            const pulse = ((t * 0.9 + i * 0.2) % 1 + 1) % 1;
            const x = source.x + (r.x - source.x) * pulse;
            const y = source.y + (p.y - source.y) * Math.min(1, pulse * 1.5);
            ctx.fillStyle = '#f9a8d4';
            ctx.beginPath();
            ctx.arc(x, y, 2.4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#f472b6';
            ctx.fillRect(r.x - 4, r.y - 4, 8, 8);
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(`Receiver R${i + 1}`, r.x + 18, r.y + 4);
        });

        // Label the first return path so users can see what it is
        const labelPick = picks[0];
        const labelRx = receivers[0];
        const lmx = (labelPick.x + labelRx.x) / 2;
        const lmy = (labelPick.y + labelRx.y) / 2 - 10;
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = 'rgba(244,114,182,0.95)';
        ctx.textAlign = 'center';
        ctx.fillText('↑ return path (P-wave)', lmx, lmy);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Map Clarity ${clarity}%`, 14, 28); // Move down from 18 to 28 for visibility
        ctx.font = '10px monospace';
        ctx.fillStyle = likelyMap ? '#15803d' : '#dc2626';
        ctx.fillText(likelyMap ? 'likely map: clear' : 'likely map: unclear', 14, H - 12);

        animRef.current = requestAnimationFrame(draw);
    }, [match, clarity, likelyMap]);

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
        <div className="w-full h-full bg-white flex flex-col items-center justify-center">
            {/* Visual area fills width, no extra white space */}
            <div ref={containerRef} className="relative w-full h-full max-w-5xl min-h-[500px]" style={{margin: '0 auto'}}>
                <canvas ref={canvasRef} className="w-full h-full" />
                {/* Control box stays bottom left */}
                <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[180px] shadow-md">
                    <label className="text-[10px] text-slate-600">Match: {match}</label>
                    <input className="w-full accent-amber-500 mb-0.5" type="range" min={0} max={100} value={match}
                        onChange={e => { const v = Number(e.target.value); setMatch(v); onStateChange('match', v); }} />
                </div>
                {/* Legend at bottom right, always visible, with text */}
                <div className="absolute right-2 bottom-2 bg-white/90 border border-slate-300 rounded-lg p-2 w-[240px] shadow-md text-xs">
                    <div className="flex items-center mb-1"><span className="inline-block w-3 h-3 rounded-full mr-2" style={{background:'#f59e0b',border:'2px solid #eab308'}}></span> <span className="text-slate-700">Seismic source</span></div>
                    <div className="flex items-center mb-1"><span className="inline-block w-3 h-3 rounded-full mr-2" style={{background:'#f9a8d4'}}></span> <span className="text-slate-700">P-wave pulse (flying dot)</span></div>
                    <div className="flex items-center mb-1"><span className="inline-block w-4 h-1 mr-2" style={{background:'#f472b6'}}></span> <span className="text-slate-700">Wave path (return path)</span></div>
                    <div className="flex items-center mb-1"><span className="inline-block w-3 h-3 mr-2" style={{background:'#f472b6',borderRadius:'2px'}}></span> <span className="text-slate-700">Receiver (R1, R2, R3)</span></div>
                    <div className="flex items-center mb-1"><span className="inline-block w-3 h-3 rounded-full mr-2" style={{background:'#f59e0b'}}></span> <span className="text-slate-700">Layer boundary</span></div>
                    <div className="ml-1 mt-1 text-slate-700">The flying dots are <b>P-wave pulses</b> traveling from the source, reflecting and refracting through layers, and arriving at receivers. Their motion shows the <b>timing</b> and <b>path</b> of each seismic wave.</div>
                </div>
            </div>
        </div>
    );
};
