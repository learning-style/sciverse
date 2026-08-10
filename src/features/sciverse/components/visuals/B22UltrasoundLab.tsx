import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B22UltrasoundLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B22UltrasoundLab = ({ state, onStateChange }: B22UltrasoundLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [echo, setEcho] = useState(60);
    const [attenuation, setAttenuation] = useState(30);
    const phase = (state.phase as string) || 'intro';

    const imageQuality = useMemo(
        () => Math.max(0, Math.min(100, Math.round(echo * 0.8 - attenuation * 0.55 + 28))),
        [echo, attenuation]
    );
    const likelyClear = imageQuality >= 60;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        const e = echo / 100;
        const att = attenuation / 100;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        const left = 20;
        const right = W * 0.76;
        const top = 36;
        const bottom = H - 18;
        const h = bottom - top;

        ctx.fillStyle = '#111827';
        ctx.fillRect(left, top, right - left, h);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(left, top, right - left, h);

        const probeX = (left + right) * 0.5;
        const probeY = 20;
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(probeX - 24, probeY, 48, 10);
        ctx.fillStyle = '#64748b';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('probe', probeX, probeY - 2);

        const boundaries = [top + h * 0.24, top + h * 0.5, top + h * 0.76];
        boundaries.forEach((y) => {
            ctx.strokeStyle = 'rgba(34,197,94,0.55)';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(left, y);
            ctx.lineTo(right, y);
            ctx.stroke();
        });

        const beamTop = probeY + 10;
        ctx.strokeStyle = 'rgba(250,204,21,0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(probeX, beamTop);
        ctx.lineTo(probeX, bottom);
        ctx.stroke();

        const pulseY = beamTop + ((t * (110 + echo)) % (bottom - beamTop));
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(probeX, pulseY, 3, 0, Math.PI * 2);
        ctx.fill();

        boundaries.forEach((y, i) => {
            const depth = (y - top) / h;
            const amp = Math.max(0.08, e * (1 - depth * att * 1.2));
            const back = ((t * 1.3 + i * 0.2) % 1 + 1) % 1;
            const ey = y - back * (y - beamTop);
            ctx.strokeStyle = `rgba(244,114,182,${0.25 + amp * 0.7})`;
            ctx.beginPath();
            ctx.moveTo(probeX, y);
            ctx.lineTo(probeX, beamTop);
            ctx.stroke();
            ctx.fillStyle = `rgba(244,114,182,${0.28 + amp * 0.6})`;
            ctx.beginPath();
            ctx.arc(probeX + Math.sin(back * Math.PI * 2) * 10, ey, 2 + amp * 2, 0, Math.PI * 2);
            ctx.fill();
        });

        const traceX = W * 0.79;
        const traceW = W * 0.18;
        ctx.fillStyle = 'rgba(15,23,42,0.85)';
        ctx.fillRect(traceX, top, traceW, h);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(traceX, top, traceW, h);
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'left';
        ctx.fillText('echo trace', traceX + 6, top + 12);

        boundaries.forEach((y) => {
            const depth = (y - top) / h;
            const amp = Math.max(0.08, e * (1 - depth * att * 1.2));
            const spikeW = 10 + amp * (traceW - 18);
            ctx.fillStyle = 'rgba(244,114,182,0.8)';
            ctx.fillRect(traceX + 4, y - 2, spikeW, 4);
        });

        const speckles = Math.round(att * 30);
        for (let i = 0; i < speckles; i += 1) {
            const nx = traceX + 6 + ((i * 17 + t * 90) % (traceW - 12));
            const ny = top + 18 + ((i * 29 + t * 60) % (h - 24));
            ctx.fillStyle = 'rgba(248,113,113,0.2)';
            ctx.fillRect(nx, ny, 1.2, 1.2);
        }

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`Image Quality ${imageQuality}%`, 14, 18);
        ctx.font = '10px monospace';
        ctx.fillStyle = likelyClear ? '#86efac' : '#fca5a5';
        ctx.fillText(likelyClear ? 'likely image: clear' : 'likely image: blurry', 14, H - 12);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 22 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Waves Help Us See the Invisible?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P22 Seismic Wave Mapping', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C22 Spectroscopy Fingerprints', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B22 Ultrasound Imaging', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Waves reveal what eyes cannot see!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [echo, attenuation, imageQuality, likelyClear, phase]);

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
                <label className="text-[12px] font-bold text-[#111827]">Echo: {echo}</label>
                <input className="w-full accent-amber-500 mb-0.5" type="range" min={0} max={100} value={echo}
                    onChange={e => { const v = Number(e.target.value); setEcho(v); onStateChange('echo', v); }} />
                <label className="text-[12px] font-bold text-[#111827]">Attenuation: {attenuation}</label>
                <input className="w-full accent-rose-500" type="range" min={0} max={100} value={attenuation}
                    onChange={e => { const v = Number(e.target.value); setAttenuation(v); onStateChange('attenuation', v); }} />
            </div>
        </div>
    );
};
