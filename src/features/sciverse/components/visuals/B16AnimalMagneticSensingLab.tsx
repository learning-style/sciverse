import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B16AnimalMagneticSensingLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B16AnimalMagneticSensingLab = ({ state, onStateChange }: B16AnimalMagneticSensingLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [signalStrength, setSignalStrength] = useState(75);
    const [solarStorm, setSolarStorm] = useState(10);
    const phase = (state.phase as string) || 'intro';

    const navigationAccuracy = useMemo(() => {
        return Math.max(0, Math.min(100, Math.round(signalStrength - solarStorm * 0.9)));
    }, [signalStrength, solarStorm]);

    // Bird flock positions
    const birdsRef = useRef<Array<{ x: number; y: number; vx: number }>>([]);
    useEffect(() => {
        const birds: typeof birdsRef.current = [];
        for (let i = 0; i < 8; i++) {
            birds.push({ x: 0.3 + Math.random() * 0.4, y: 0.3 + Math.random() * 0.3, vx: 0 });
        }
        birdsRef.current = birds;
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;

        // Sky gradient
        const sky = ctx.createLinearGradient(0, 0, 0, H * 0.75);
        sky.addColorStop(0, '#1e3a5f');
        sky.addColorStop(1, '#60a5fa');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H * 0.75);

        // Ground
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(0, H * 0.75, W, H * 0.25);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(0, H * 0.75, W, 4);

        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Animal Magnetic Sensing Lab', W / 2, 26);

        // Magnetic field lines (curved arcs)
        const fieldAlpha = 0.15 + (signalStrength / 100) * 0.35;
        ctx.strokeStyle = `rgba(56, 189, 248, ${fieldAlpha})`;
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 6; i++) {
            const y0 = H * 0.15 + i * H * 0.1;
            ctx.beginPath();
            ctx.moveTo(0, y0);
            ctx.quadraticCurveTo(W / 2, y0 - 20 + Math.sin(tRef.current + i) * 8, W, y0);
            ctx.stroke();
        }

        // Storm interference sparks
        if (solarStorm > 20) {
            const sparkCount = Math.round(solarStorm / 10);
            for (let i = 0; i < sparkCount; i++) {
                const sx = Math.random() * W;
                const sy = Math.random() * H * 0.7;
                ctx.fillStyle = `rgba(251, 191, 36, ${0.3 + Math.random() * 0.4})`;
                ctx.beginPath();
                ctx.arc(sx, sy, 2 + Math.random() * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Compass arrow showing "north" direction with accuracy
        const compassX = W * 0.85;
        const compassY = H * 0.18;
        const compassR = 22;
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(compassX, compassY, compassR, 0, Math.PI * 2);
        ctx.stroke();
        const drift = ((100 - navigationAccuracy) / 100) * 0.8;
        const needleAngle = -Math.PI / 2 + Math.sin(tRef.current * 3) * drift;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(compassX, compassY);
        ctx.lineTo(compassX + Math.cos(needleAngle) * (compassR - 4), compassY + Math.sin(needleAngle) * (compassR - 4));
        ctx.stroke();
        ctx.fillStyle = '#f1f5f9';
        ctx.font = '8px monospace';
        ctx.fillText('N', compassX, compassY - compassR - 4);

        // Draw birds migrating
        const error = (100 - navigationAccuracy) / 100;
        for (const bird of birdsRef.current) {
            bird.vx = -0.001 + Math.sin(tRef.current * 2 + bird.y * 10) * error * 0.003;
            bird.x += bird.vx;
            bird.y -= 0.0004;
            if (bird.y < 0.05) { bird.y = 0.65; bird.x = 0.3 + Math.random() * 0.4; }
            if (bird.x < 0.05 || bird.x > 0.95) bird.x = 0.5;

            const bx = bird.x * W;
            const by = bird.y * H * 0.72;
            // Simple bird shape (V)
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(bx - 10, by + 4);
            ctx.lineTo(bx, by - 3);
            ctx.lineTo(bx + 10, by + 4);
            ctx.stroke();
        }

        // Target (north) marker
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(W / 2, H * 0.08);
        ctx.lineTo(W / 2 - 8, H * 0.12);
        ctx.lineTo(W / 2 + 8, H * 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#f1f5f9';
        ctx.font = '9px monospace';
        ctx.fillText('NORTH', W / 2, H * 0.07);

        // Stats
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Navigation Accuracy: ${navigationAccuracy}%`, W / 2, H * 0.80);
        ctx.fillStyle = '#475569';
        ctx.font = '11px monospace';
        ctx.fillText(navigationAccuracy > 70 ? 'Flock on course!' : navigationAccuracy > 40 ? 'Some drift — storm interference' : 'Severe disorientation!', W / 2, H * 0.84);

        // Info bar
        const by2 = H * 0.87;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(12, by2, W - 24, H - by2 - 8);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(12, by2, W - 24, H - by2 - 8);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Signal: ${signalStrength}`, 20, by2 + 14);
        ctx.fillText(`Storm: ${solarStorm}`, 20, by2 + 26);
        ctx.textAlign = 'right';
        ctx.fillText('Stronger signal → better navigation', W - 20, by2 + 14);
        ctx.fillText('Storm noise → disorientation', W - 20, by2 + 26);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 16 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Magnets Help Us Navigate?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P16 Magnets & Navigation', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C16 Magnetic Materials', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B16 Migration Sensing', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Magnetic fields → animal navigation worldwide!', W / 2, H * 0.65);
        }

        animRef.current = requestAnimationFrame(draw);
    }, [signalStrength, solarStorm, navigationAccuracy, phase]);

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
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[220px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <label className="text-slate-300 text-xs">Magnetic Signal: <span className="text-rose-300">{signalStrength}</span></label>
                <input type="range" min={10} max={100} value={signalStrength}
                    onChange={e => { const v = Number(e.target.value); setSignalStrength(v); onStateChange('signalStrength', v); }}
                    className="w-full accent-rose-500" />
                <label className="text-slate-300 text-xs">Solar Storm Noise: <span className="text-amber-300">{solarStorm}</span></label>
                <input type="range" min={0} max={100} value={solarStorm}
                    onChange={e => { const v = Number(e.target.value); setSolarStorm(v); onStateChange('solarStorm', v); }}
                    className="w-full accent-amber-500" />
            </div>
        </div>
    );
};