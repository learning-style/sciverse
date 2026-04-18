import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C25ChainReactionLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C25ChainReactionLab = ({ state, onStateChange }: C25ChainReactionLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [initiator, setInitiator] = useState(20);
    const [inhibitor, setInhibitor] = useState(30);
    const phase = (state.phase as string) || 'intro';

    const amplification = useMemo(() => Math.max(0, Math.min(100, Math.round(initiator * 0.8 - inhibitor * 0.6 + 25))), [initiator, inhibitor]);

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

        const initFrac = initiator / 100;
        const inhFrac = inhibitor / 100;
        const ampFrac = amplification / 100;

        const startX = W * 0.08;
        const startY = H * 0.5;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(startX, startY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Cascade generations
        const gens = 5;
        const maxPerGen = [1, 2, 4, 6, 8];
        for (let g = 0; g < gens; g++) {
            const gx = W * 0.08 + (W * 0.82 / gens) * (g + 1);
            const activeCount = Math.max(1, Math.round(maxPerGen[g] * ampFrac));
            const totalSlots = maxPerGen[g];

            for (let i = 0; i < totalSlots; i++) {
                const gy = H * 0.15 + (H * 0.7 / (totalSlots + 1)) * (i + 1);
                const isActive = i < activeCount;

                // Connection from parent
                const parentG = g === 0 ? 0 : g;
                const parentX = g === 0 ? startX : gx - (W * 0.82 / gens);
                const parentY = g === 0 ? startY : H * 0.15 + (H * 0.7 / (Math.max(1, maxPerGen[g - 1]) + 1)) * (Math.floor(i / 2) + 1);

                ctx.strokeStyle = isActive ? `rgba(34,197,94,${0.3 + ampFrac * 0.4})` : 'rgba(148,163,184,0.2)';
                ctx.lineWidth = isActive ? 1.5 : 0.8;
                ctx.beginPath();
                ctx.moveTo(parentX, parentY);
                ctx.lineTo(gx, gy);
                ctx.stroke();

                // Particle
                ctx.fillStyle = isActive ? '#22c55e' : '#cbd5e1';
                const r = isActive ? 5 + ampFrac * 3 : 3;
                ctx.beginPath();
                ctx.arc(gx, gy, r, 0, Math.PI * 2);
                ctx.fill();

                // Inhibitor X marks on suppressed
                if (!isActive && inhFrac > 0.2) {
                    ctx.strokeStyle = `rgba(99,102,241,${inhFrac * 0.6})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(gx - 4, gy - 4);
                    ctx.lineTo(gx + 4, gy + 4);
                    ctx.moveTo(gx + 4, gy - 4);
                    ctx.lineTo(gx - 4, gy + 4);
                    ctx.stroke();
                }

                // Propagation pulse on active
                if (isActive) {
                    const pulse = (t * 0.8 + g * 0.15 + i * 0.1) % 1;
                    const px = parentX + (gx - parentX) * pulse;
                    const py = parentY + (gy - parentY) * pulse;
                    ctx.fillStyle = `rgba(34,197,94,${0.3 + ampFrac * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(px, py, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Label first gen and last gen
                if (g === 0 && i === 0) {
                    ctx.font = 'bold 12px monospace';
                    ctx.fillStyle = '#22c55e';
                    ctx.textAlign = 'center';
                    ctx.fillText('First Gen', gx, gy - 16);
                }
                if (g === gens - 1 && i === 0) {
                    ctx.font = 'bold 12px monospace';
                    ctx.fillStyle = '#22c55e';
                    ctx.textAlign = 'center';
                    ctx.fillText('Cascade', gx, gy - 16);
                }
            }
        }

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Amplification ${amplification}%`, 14, 22);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText('More amplification = bigger cascade', 14, 38);

        animRef.current = requestAnimationFrame(draw);
    }, [initiator, inhibitor, amplification]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[210px] shadow-md z-10">
                <label className="text-[13px] font-extrabold text-[#f59e0b] drop-shadow">Initiator: <span className="font-extrabold">{initiator}</span></label>
                <input className="w-full accent-amber-500 mb-0.5" type="range" min={0} max={100} value={initiator}
                    onChange={e => { const v = Number(e.target.value); setInitiator(v); onStateChange('initiator', v); }} />
                <label className="text-[13px] font-extrabold text-[#6366f1] drop-shadow">Inhibitor: <span className="font-extrabold">{inhibitor}</span></label>
                <input className="w-full accent-indigo-500" type="range" min={0} max={100} value={inhibitor}
                    onChange={e => { const v = Number(e.target.value); setInhibitor(v); onStateChange('inhibitor', v); }} />
            </div>
        </div>
    );
};
