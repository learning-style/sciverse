import { useRef, useEffect, useCallback, useState } from 'react';

interface P12GravityLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P12GravityLab = ({ state, onStateChange }: P12GravityLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const orbitAngleRef = useRef(0);
    const [orbitSpeed, setOrbitSpeed] = useState(1);
    const [showSecondMass, setShowSecondMass] = useState(false);

    const phase = (state.phase as string) || 'intro';
    const showGravityArrow = (state.showGravityArrow as boolean) || false;
    const showTwoMasses = (state.showTwoMasses as boolean) || false;

    const secondAngleRef = useRef(Math.PI); // offset by 180°

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;

        const speed = orbitSpeed * 0.012;
        orbitAngleRef.current += speed;
        secondAngleRef.current += speed;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Stars background
        ctx.fillStyle = 'rgba(15,23,42,0.5)';
        for (let i = 0; i < 60; i++) {
            const sx = ((i * 137.5) % 1) * W;
            const sy = ((i * 97.3) % 1) * H;
            const sr = 0.5 + (i % 3) * 0.5;
            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Orbital Mechanics Lab', W / 2, 26);

        const cx = W / 2, cy = H * 0.48;
        const orbitR = Math.min(W, H) * 0.3;

        // Orbit path
        ctx.strokeStyle = 'rgba(148,163,184,0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Sun
        const sunR = 24;
        const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR);
        sunGrad.addColorStop(0, '#fef9c3');
        sunGrad.addColorStop(0.4, '#fbbf24');
        sunGrad.addColorStop(1, '#d97706');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
        ctx.fill();

        // Sun glow
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Planet position
        const px = cx + Math.cos(orbitAngleRef.current) * orbitR;
        const py = cy + Math.sin(orbitAngleRef.current) * orbitR;

        // Gravity arrow (points from planet toward sun)
        if (showGravityArrow || phase === 'interactive') {
            const dx = cx - px, dy = cy - py;
            const len = Math.hypot(dx, dy);
            const nx = dx / len, ny = dy / len;
            const arrowLen = 40;
            ctx.strokeStyle = '#f97316';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + nx * arrowLen, py + ny * arrowLen);
            ctx.stroke();
            // Arrowhead
            const ah = 8;
            const ax = px + nx * arrowLen;
            const ay = py + ny * arrowLen;
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax - nx * ah + ny * ah / 2, ay - ny * ah - nx * ah / 2);
            ctx.lineTo(ax - nx * ah - ny * ah / 2, ay - ny * ah + nx * ah / 2);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#9a3412';
            ctx.font = 'bold 13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Gravity', px + nx * 20, py + ny * 20 - 8);
        }

        // Velocity arrow (tangent to orbit)
        const angle = orbitAngleRef.current;
        const tvx = -Math.sin(angle), tvy = Math.cos(angle);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + tvx * 30 * orbitSpeed, py + tvy * 30 * orbitSpeed);
        ctx.stroke();
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('velocity', px + tvx * 20, py + tvy * 20 - 6);

        // Planet (Earth-like)
        const earthGrad = ctx.createRadialGradient(px, py, 0, px, py, 18);
        earthGrad.addColorStop(0, '#93c5fd');
        earthGrad.addColorStop(0.5, '#3b82f6');
        earthGrad.addColorStop(1, '#1e40af');
        ctx.fillStyle = earthGrad;
        ctx.beginPath();
        ctx.arc(px, py, 18, 0, Math.PI * 2);
        ctx.fill();

        // Second mass (same orbit, different mass)
        if (showTwoMasses || state.showTwoMasses) {
            secondAngleRef.current = orbitAngleRef.current + Math.PI * 0.3;
            const p2x = cx + Math.cos(secondAngleRef.current) * orbitR;
            const p2y = cy + Math.sin(secondAngleRef.current) * orbitR;
            const smallGrad = ctx.createRadialGradient(p2x, p2y, 0, p2x, p2y, 14);
            smallGrad.addColorStop(0, '#e879f9');
            smallGrad.addColorStop(0.5, '#a21caf');
            smallGrad.addColorStop(1, '#701a75');
            ctx.fillStyle = smallGrad;
            ctx.beginPath();
            ctx.arc(p2x, p2y, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('1 kg', p2x, p2y + 26);
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 13px monospace';
            ctx.fillText('1000 kg', px, py + 26);
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 13px monospace';
            ctx.fillText('← Same orbital speed! Mass doesn\'t matter', W / 2, H * 0.88);
        }

        // Info panel
        const statusY = H * 0.88;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        if (!showTwoMasses && !state.showTwoMasses) {
            const period = (2 * Math.PI / speed / 60).toFixed(1);
            ctx.fillText(`Speed: ${orbitSpeed.toFixed(1)}×   Period: ${period}s`, W / 2, statusY);
        }

        animRef.current = requestAnimationFrame(animate);
    }, [orbitSpeed, phase, showGravityArrow, showTwoMasses, state.showTwoMasses]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        });
        obs.observe(container);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div data-lab-controls="true" className="absolute left-3 bottom-3 flex flex-col gap-2 bg-slate-800/90 border border-slate-600 rounded-xl p-3 min-w-[180px]">
                <div className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">Lab Controls</div>
                <label className="text-slate-300 text-xs font-semibold">
                    Orbital Speed: <span className="text-blue-400">{orbitSpeed.toFixed(1)}×</span>
                </label>
                <input type="range" min={0.1} max={3} step={0.1} value={orbitSpeed}
                    onChange={e => { setOrbitSpeed(Number(e.target.value)); onStateChange('orbitSpeed', Number(e.target.value)); }}
                    className="w-full accent-blue-500" />
                {orbitSpeed < 0.4 && <div className="text-red-400 text-xs">⚠ Too slow — spiraling in!</div>}
                {orbitSpeed > 2.5 && <div className="text-yellow-400 text-xs">⚠ Too fast — escaping!</div>}

                <button
                    onClick={() => setShowSecondMass(v => !v)}
                    className="text-xs bg-purple-700 hover:bg-purple-600 text-white rounded px-2 py-1 mt-1">
                    {showSecondMass ? 'Hide Second Mass' : 'Show Mass Comparison'}
                </button>
            </div>
        </div>
    );
};
