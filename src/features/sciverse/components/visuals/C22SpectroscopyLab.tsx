import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C22SpectroscopyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C22SpectroscopyLab = ({ onStateChange }: C22SpectroscopyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [matchLevel, setMatchLevel] = useState(55);

    const identificationScore = useMemo(
        () => Math.max(0, Math.min(100, Math.round(matchLevel * 0.72 + 28))),
        [matchLevel]
    );
    const likelyMatch = identificationScore >= 60;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;

        const align = matchLevel / 100;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        const left = 44;
        const right = W - 16;
        const topRef = H * 0.26;
        const topUnknown = H * 0.62;
        const axisW = right - left;

        ctx.strokeStyle = '#1e293b'; // much darker axis
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(left, topRef + 34);
        ctx.lineTo(right, topRef + 34);
        ctx.moveTo(left, topUnknown + 34);
        ctx.lineTo(right, topUnknown + 34);
        ctx.stroke();

        ctx.fillStyle = '#111827'; // darkest readable
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Reference Spectrum', left, topRef - 16);
        ctx.fillText('Unknown Spectrum', left, topUnknown - 16);

        const baseCenters = [0.2, 0.4, 0.62, 0.8];
        const shift = (1 - align) * 0.08;
        const unknownCenters = baseCenters.map((c, i) => c + (i % 2 === 0 ? shift : -shift));
        const peakH = 56;
        const width = 3;

        const drawPeakSet = (centers: number[], yBase: number, color: string) => {
            centers.forEach((c, i) => {
                const x = left + c * axisW;
                ctx.strokeStyle = color;
                ctx.lineWidth = width;
                ctx.beginPath();
                ctx.moveTo(x, yBase + 34);
                ctx.lineTo(x, yBase + 34 - peakH + i * 4);
                ctx.stroke();
            });
        };

        drawPeakSet(baseCenters, topRef, '#f59e0b');
        drawPeakSet(unknownCenters, topUnknown, '#f472b6');

        let aligned = 0;
        for (let i = 0; i < baseCenters.length; i += 1) {
            const refX = left + baseCenters[i] * axisW;
            const unkX = left + unknownCenters[i] * axisW;
            const delta = Math.abs(refX - unkX);
            if (delta < 14) aligned += 1;
            ctx.strokeStyle = 'rgba(100,116,139,0.35)';
            ctx.beginPath();
            ctx.moveTo(refX, topRef + 40);
            ctx.lineTo(unkX, topUnknown - 18);
            ctx.stroke();
        }

        ctx.fillStyle = '#111827';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`ID Confidence ${identificationScore}%`, 14, 32);
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#b45309';
        ctx.fillText(`Line matches ${aligned}/${baseCenters.length}`, 14, H - 38);
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = likelyMatch ? '#15803d' : '#dc2626';
        ctx.fillText(likelyMatch ? 'Likely match: YES' : 'Likely match: NOT YET', 14, H - 16);

        animRef.current = requestAnimationFrame(draw);
    }, [matchLevel, identificationScore, likelyMatch]);

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
                <label className="text-[12px] font-bold text-[#111827]">Match: {matchLevel}</label>
                <input className="w-full accent-amber-500 mb-0.5" type="range" min={0} max={100} value={matchLevel}
                    onChange={e => { const v = Number(e.target.value); setMatchLevel(v); onStateChange('matchLevel', v); }} />
            </div>
        </div>
    );
};
