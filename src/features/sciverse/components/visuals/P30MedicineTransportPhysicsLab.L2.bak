import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P30MedicineTransportPhysicsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P30MedicineTransportPhysicsLab = ({ state, onStateChange }: P30MedicineTransportPhysicsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [diffusionRate, setDiffusionRate] = useState(50);
    const [permeability, setPermeability] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Delivery time derived — lower is faster
    const deliveryTime = useMemo(() => {
        const dr = diffusionRate / 100;
        const pm = permeability / 100;
        const raw = 120 - (dr * 50 + pm * 50);
        return Math.max(5, Math.round(raw));
    }, [diffusionRate, permeability]);

    const deliveryPct = useMemo(() => Math.min(100, Math.round((1 - deliveryTime / 120) * 100)), [deliveryTime]);

    const summary = useMemo(() => {
        if (deliveryTime < 20) return 'Rapid delivery — minutes to target!';
        if (deliveryTime < 50) return 'Moderate delivery — about 30 min.';
        if (deliveryTime < 80) return 'Slow delivery — over an hour.';
        return 'Very slow — hours to reach target.';
    }, [deliveryTime]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Header readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#2563eb';
        ctx.fillText('DIFFUSION RATE', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText(diffusionRate + '%', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('PERMEABILITY', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#5b21b6';
        ctx.fillText(permeability + '%', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = deliveryTime < 40 ? '#16a34a' : '#dc2626';
        ctx.fillText('DELIVERY TIME', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = deliveryTime < 40 ? '#166534' : '#991b1b';
        ctx.fillText(deliveryTime + ' min', col3, H * 0.14);

        // Delivery bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Delivery Speed: ' + deliveryPct + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = deliveryPct > 70 ? '#22c55e' : deliveryPct > 40 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * deliveryPct / 100, 14);

        // === Diffusion gradient visualization ===
        const gradX = safeRight * 0.08;
        const gradY = H * 0.30;
        const gradW = safeRight * 0.65;
        const gradH = H * 0.18;

        // Gradient background — high concentration (left) to low (right)
        const grd = ctx.createLinearGradient(gradX, 0, gradX + gradW, 0);
        grd.addColorStop(0, '#3b82f6');
        grd.addColorStop(1, '#f0f9ff');
        ctx.fillStyle = grd;
        ctx.fillRect(gradX, gradY, gradW, gradH);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(gradX, gradY, gradW, gradH);

        // Labels
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#f0f9ff';
        ctx.fillText('INTAKE SITE', gradX + 50, gradY + gradH / 2 + 4);
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText('TARGET TISSUE', gradX + gradW - 60, gradY + gradH / 2 + 4);

        // Barrier line (permeability)
        const barrierX = gradX + gradW * 0.5;
        ctx.save();
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2 + (1 - permeability / 100) * 4;
        ctx.beginPath();
        ctx.moveTo(barrierX, gradY - 4);
        ctx.lineTo(barrierX, gradY + gradH + 4);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'center';
        ctx.fillText('BARRIER', barrierX, gradY - 8);

        // Animated medicine particles diffusing
        const particleCount = 15;
        const dr = diffusionRate / 100;
        const pm = permeability / 100;
        ctx.save();
        for (let i = 0; i < particleCount; i++) {
            const baseProgress = ((t * (0.1 + dr * 0.3) + i * 0.12) % 1);
            // Particles slow down at barrier unless permeability is high
            let progress = baseProgress;
            if (baseProgress > 0.45 && baseProgress < 0.55) {
                progress = 0.45 + (baseProgress - 0.45) * pm;
            }
            const px = gradX + 10 + progress * (gradW - 20);
            const py = gradY + 8 + (i / particleCount) * (gradH - 16) + Math.sin(t * 3 + i * 2) * 4;

            ctx.globalAlpha = 0.8;
            ctx.fillStyle = progress > 0.5 ? '#22c55e' : '#3b82f6';
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
            // Arrow direction
            ctx.beginPath();
            ctx.moveTo(px + 5, py);
            ctx.lineTo(px + 2, py - 2);
            ctx.lineTo(px + 2, py + 2);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.45, H * 0.56);

        // Legend on right
        const legendX = safeRight * 0.80;
        const legendTopY = H * 0.32;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.beginPath(); ctx.arc(legendX, legendTopY, 5, 0, Math.PI * 2); ctx.fillStyle = '#3b82f6'; ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillText('Drug molecule', legendX + 10, legendTopY + 4);
        ctx.beginPath(); ctx.arc(legendX, legendTopY + 20, 5, 0, Math.PI * 2); ctx.fillStyle = '#22c55e'; ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillText('Past barrier', legendX + 10, legendTopY + 24);
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(legendX - 5, legendTopY + 40); ctx.lineTo(legendX + 5, legendTopY + 40); ctx.stroke();
        ctx.fillStyle = '#334155'; ctx.fillText('Tissue barrier', legendX + 10, legendTopY + 44);

        // === Animated feedback cycle ===
        const cycleX = safeRight * 0.7;
        const cycleY = H * 0.78;
        const rX = Math.min(130, safeRight * 0.2);
        const rY = Math.min(60, H * 0.1);

        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cycleX, cycleY, rX, rY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        ctx.save();
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 1: ↓ Medicine enters bloodstream', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Diffuses toward target →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Concentration equalizes', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Crosses tissue barriers', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = deliveryPct / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#3b82f6' : '#22c55e';
            ctx.beginPath();
            ctx.arc(px, py, sz, 0, Math.PI * 2);
            ctx.fill();
            const na = angle + 0.15;
            const dx = -rX * Math.sin(na);
            const dy = rY * Math.cos(na);
            const mag = Math.sqrt(dx * dx + dy * dy) || 1;
            ctx.beginPath();
            ctx.moveTo(px + (dx / mag) * 6, py + (dy / mag) * 6);
            ctx.lineTo(px - (dy / mag) * 2.5, py + (dx / mag) * 2.5);
            ctx.lineTo(px + (dy / mag) * 2.5, py - (dx / mag) * 2.5);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('Transport Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 30 — P30 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Medicines Reach the Right Place?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [diffusionRate, permeability, deliveryTime, deliveryPct, summary, phase]);

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
            <div data-lab-controls="true" className="absolute left-2 bottom-2 bg-white border border-slate-300 rounded-lg p-2 w-[240px] shadow-md z-10">
                <label className="text-[13px] font-bold text-blue-600">Diffusion Rate: {diffusionRate}%</label>
                <input className="w-full accent-blue-500 mb-1" type="range" min={0} max={100} value={diffusionRate}
                    onChange={e => { const v = Number(e.target.value); setDiffusionRate(v); onStateChange('diffusionRate', v); }} />
                <label className="text-[13px] font-bold text-purple-600">Tissue Permeability: {permeability}%</label>
                <input className="w-full accent-purple-500 mb-1" type="range" min={0} max={100} value={permeability}
                    onChange={e => { const v = Number(e.target.value); setPermeability(v); onStateChange('permeability', v); }} />
                <p className="text-[11px] mt-1 font-semibold" style={{ color: deliveryTime < 40 ? '#16a34a' : '#dc2626' }}>Delivery Time (derived): {deliveryTime} min {deliveryTime < 20 ? '✓ fast' : ''}</p>
            </div>
        </div>
    );
};
