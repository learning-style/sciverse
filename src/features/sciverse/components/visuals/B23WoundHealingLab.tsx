import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B23WoundHealingLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B23WoundHealingLab = ({ state, onStateChange }: B23WoundHealingLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [inflammation, setInflammation] = useState(50);
    const [oxygenation, setOxygenation] = useState(60);
    const phase = (state.phase as string) || 'intro';

    const healingProgress = useMemo(() => Math.max(0, Math.min(100, Math.round(oxygenation * 0.65 - inflammation * 0.3 + 25))), [inflammation, oxygenation]);

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

        const cx = W * 0.5;
        const healFrac = healingProgress / 100;
        const infFrac = inflammation / 100;
        const o2Frac = oxygenation / 100;

        // Tissue layers (top and bottom)
        ctx.fillStyle = '#fecdd3';
        ctx.fillRect(0, H * 0.25, W, H * 0.2);
        ctx.fillRect(0, H * 0.6, W, H * 0.2);

        // Wound gap in the middle
        const gapW = W * 0.35 * (1 - healFrac * 0.7);
        ctx.fillStyle = '#fef2f2';
        ctx.fillRect(cx - gapW / 2, H * 0.25, gapW, H * 0.55);

        // New tissue filling in (granulation)
        if (healFrac > 0.2) {
            const fillH = (healFrac - 0.2) * H * 0.5;
            ctx.fillStyle = `rgba(251,146,160,${0.3 + healFrac * 0.4})`;
            ctx.fillRect(cx - gapW / 2, H * 0.6 - fillH * 0.2, gapW, fillH * 0.6);
        }

        // Inflammation border (exaggerated red glow around wound edges)
        if (infFrac > 0.2) {
            const glowW = 12 + infFrac * 22;
            ctx.save();
            ctx.shadowColor = 'rgba(239,68,68,0.85)';
            ctx.shadowBlur = 24;
            ctx.fillStyle = `rgba(239,68,68,${0.22 + infFrac * 0.25 + Math.sin(t * 3) * 0.03})`;
            ctx.fillRect(cx - gapW / 2 - glowW, H * 0.25, glowW, H * 0.55);
            ctx.fillRect(cx + gapW / 2, H * 0.25, glowW, H * 0.55);
            ctx.restore();
            // Label the red glow
            ctx.save();
            ctx.font = 'bold 14px monospace';
            ctx.fillStyle = '#b91c1c';
            ctx.textAlign = 'right';
            ctx.fillText('Red glow: Inflammation', cx - gapW / 2 - glowW - 10, H * 0.25 + 18);
            ctx.textAlign = 'left';
            ctx.fillText('Red glow: Inflammation', cx + gapW / 2 + glowW + 10, H * 0.25 + 18);
            ctx.restore();
        }

        // Exaggerated oxygen supply dots flowing to wound (blue)
        for (let i = 0; i < Math.round(o2Frac * 10); i++) {
            const ox = cx - gapW / 2 - 30 - ((t * 25 + i * 20) % 50);
            const oy = H * 0.35 + ((i * 23) % (H * 0.3));
            // Outer glow
            ctx.save();
            ctx.shadowColor = 'rgba(56,189,248,0.8)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(ox, oy, 7, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56,189,248,0.45)';
            ctx.fill();
            ctx.restore();
            // Inner dot
            ctx.beginPath();
            ctx.arc(ox, oy, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56,189,248,0.95)';
            ctx.fill();
            // White highlight
            ctx.beginPath();
            ctx.arc(ox + 2, oy - 2, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fill();
            // Right side too
            ctx.save();
            ctx.shadowColor = 'rgba(56,189,248,0.8)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(W - ox + cx, oy, 7, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56,189,248,0.45)';
            ctx.fill();
            ctx.restore();
            ctx.beginPath();
            ctx.arc(W - ox + cx, oy, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56,189,248,0.95)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(W - ox + cx + 2, oy - 2, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fill();
        }

        // Exaggerated cell migration dots (green, moving into gap)
        if (healFrac > 0.1) {
            for (let i = 0; i < Math.round(healFrac * 10); i++) {
                const mx = cx - gapW / 2 + ((i * 37 + t * 12) % gapW);
                const my = H * 0.38 + ((i * 29) % (H * 0.25));
                // Outer glow
                ctx.save();
                ctx.shadowColor = 'rgba(34,197,94,0.7)';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(mx, my, 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(34,197,94,0.35)';
                ctx.fill();
                ctx.restore();
                // Inner dot
                ctx.beginPath();
                ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(34,197,94,0.95)';
                ctx.fill();
            }
        }
    // Label the gap (wound)
    ctx.save();
    ctx.font = 'bold 15px monospace';
    ctx.fillStyle = '#0ea5e9';
    ctx.textAlign = 'center';
    ctx.fillText('Wound gap (horizontal)', cx, H * 0.23);
    ctx.restore();

        // Progress bar at top under Healing Progress text
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(W * 0.15, 32, W * 0.7, 8);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(W * 0.15, 32, W * 0.7 * healFrac, 8);

        // Metrics
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Healing Progress ${healingProgress}%`, 14, 20);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 23 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Materials Break & Recover?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P23 Stress & Fracture', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C23 Corrosion & Protection', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B23 Wound Healing', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Break → repair → stronger than before!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [inflammation, oxygenation, healingProgress, phase]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white/95 border border-slate-300 rounded-lg p-2 w-[200px] shadow-md">
                <label className="text-[13px] font-extrabold text-[#b91c1c] drop-shadow">Inflammation: <span className="font-extrabold">{inflammation}</span></label>
                <input className="w-full accent-rose-500 mb-0.5" type="range" min={0} max={100} value={inflammation}
                    onChange={e => { const v = Number(e.target.value); setInflammation(v); onStateChange('inflammation', v); }} />
                <label className="text-[13px] font-extrabold text-[#0e7490] drop-shadow">Oxygenation: <span className="font-extrabold">{oxygenation}</span></label>
                <input className="w-full accent-cyan-500" type="range" min={0} max={100} value={oxygenation}
                    onChange={e => { const v = Number(e.target.value); setOxygenation(v); onStateChange('oxygenation', v); }} />
            </div>
        </div>
    );
};
