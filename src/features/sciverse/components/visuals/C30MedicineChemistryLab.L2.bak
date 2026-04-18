import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C30MedicineChemistryLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C30MedicineChemistryLab = ({ state, onStateChange }: C30MedicineChemistryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [solubility, setSolubility] = useState(50);
    const [coatingThickness, setCoatingThickness] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Release rate derived
    const releaseRate = useMemo(() => {
        const sol = solubility / 100;
        const coat = 1 - coatingThickness / 100; // thicker coating = slower
        return Math.round(Math.min(100, (sol * 0.6 + coat * 0.4) * 100));
    }, [solubility, coatingThickness]);

    const summary = useMemo(() => {
        if (releaseRate > 80) return 'Immediate release — fast peak!';
        if (releaseRate > 50) return 'Moderate release — steady levels.';
        if (releaseRate > 25) return 'Extended release — slow and steady.';
        return 'Very slow release — hours to effect.';
    }, [releaseRate]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#fefce8'; // chemistry yellow bg
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Header readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('SOLUBILITY', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#5b21b6';
        ctx.fillText(solubility + '%', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#ea580c';
        ctx.fillText('COATING', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#9a3412';
        ctx.fillText(coatingThickness + '%', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = releaseRate > 50 ? '#16a34a' : '#dc2626';
        ctx.fillText('RELEASE RATE', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = releaseRate > 50 ? '#166534' : '#991b1b';
        ctx.fillText(releaseRate + '%', col3, H * 0.14);

        // Release bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Drug Release: ' + releaseRate + '%/hr', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = releaseRate > 60 ? '#22c55e' : releaseRate > 30 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * releaseRate / 100, 14);

        // === Pill cross-section visualization ===
        const pillCX = safeRight * 0.35;
        const pillCY = H * 0.42;
        const pillR = Math.min(safeRight * 0.15, H * 0.12);

        // Coating layer (outer ring)
        const coatWidth = 4 + (coatingThickness / 100) * 18;
        ctx.beginPath();
        ctx.arc(pillCX, pillCY, pillR, 0, Math.PI * 2);
        ctx.fillStyle = '#f97316';
        ctx.fill();
        ctx.strokeStyle = '#9a3412';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Drug core (inner)
        ctx.beginPath();
        ctx.arc(pillCX, pillCY, pillR - coatWidth, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.fill();

        // Water penetration arrows (animated)
        const waterProgress = ((t * (0.1 + (1 - coatingThickness / 100) * 0.4)) % 1);
        ctx.save();
        const waterAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI / 4, Math.PI * 3 / 4, Math.PI * 5 / 4, Math.PI * 7 / 4];
        for (const wa of waterAngles) {
            const startR = pillR + 5;
            const endR = pillR - coatWidth;
            const currentR = startR - waterProgress * (startR - endR);
            const wx = pillCX + Math.cos(wa) * currentR;
            const wy = pillCY + Math.sin(wa) * currentR;
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(wx, wy, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Drug molecules escaping (if releasing)
        ctx.save();
        const escapeCount = Math.round(releaseRate / 10);
        for (let i = 0; i < escapeCount; i++) {
            const ea = (i / escapeCount) * Math.PI * 2 + t * 0.5;
            const escapeR = pillR + 10 + ((t * 0.5 + i * 0.3) % 1) * 40;
            const ex = pillCX + Math.cos(ea) * escapeR;
            const ey = pillCY + Math.sin(ea) * escapeR;
            ctx.globalAlpha = Math.max(0, 0.8 - (escapeR - pillR) / 60);
            ctx.fillStyle = '#7c3aed';
            ctx.beginPath();
            ctx.arc(ex, ey, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Pill labels
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('DRUG', pillCX, pillCY - 4);
        ctx.fillText('CORE', pillCX, pillCY + 8);
        ctx.fillStyle = '#7c2d12';
        ctx.fillText('COATING', pillCX, pillCY + pillR - coatWidth / 2 + 4);

        // Concentration-time curve (right side)
        const curveX = safeRight * 0.58;
        const curveY = H * 0.32;
        const curveW = safeRight * 0.30;
        const curveH = H * 0.18;

        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(curveX, curveY);
        ctx.lineTo(curveX, curveY + curveH);
        ctx.lineTo(curveX + curveW, curveY + curveH);
        ctx.stroke();
        ctx.font = '9px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'center';
        ctx.fillText('Time →', curveX + curveW / 2, curveY + curveH + 12);
        ctx.save();
        ctx.translate(curveX - 10, curveY + curveH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Blood Level', 0, 0);
        ctx.restore();

        // Therapeutic window band
        const winTop = curveY + curveH * 0.3;
        const winBot = curveY + curveH * 0.65;
        ctx.fillStyle = 'rgba(34,197,94,0.12)';
        ctx.fillRect(curveX, winTop, curveW, winBot - winTop);
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(curveX, winTop); ctx.lineTo(curveX + curveW, winTop); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(curveX, winBot); ctx.lineTo(curveX + curveW, winBot); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = '8px sans-serif';
        ctx.fillStyle = '#16a34a';
        ctx.textAlign = 'left';
        ctx.fillText('Therapeutic window', curveX + 3, winTop - 3);

        // Drug curve based on release rate
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const rr = releaseRate / 100;
        for (let i = 0; i <= 40; i++) {
            const xFrac = i / 40;
            const cx = curveX + xFrac * curveW;
            // Fast release: sharp peak then decay. Slow release: gradual rise and plateau.
            let yFrac: number;
            if (rr > 0.6) {
                // Fast: spike then decay
                yFrac = Math.exp(-((xFrac - 0.15) ** 2) / (0.02 + (1 - rr) * 0.1));
            } else {
                // Slow: gradual plateau
                yFrac = (1 - Math.exp(-xFrac * (1 + rr * 4))) * (0.4 + rr * 0.5);
            }
            const cy = curveY + curveH - yFrac * curveH * 0.9;
            if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
        }
        ctx.stroke();

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.45, H * 0.58);

        // === Animated feedback cycle ===
        const cycleX = safeRight * 0.7;
        const cycleY2 = H * 0.78;
        const rXc = Math.min(130, safeRight * 0.2);
        const rYc = Math.min(60, H * 0.1);

        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cycleX, cycleY2, rXc, rYc, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        ctx.save();
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 1: ↓ Water penetrates coating', cycleX, cycleY2 - rYc - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Drug dissolves →', cycleX + rXc + 8, cycleY2 - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Blood level rises', cycleX - rXc - 8, cycleY2 - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Molecules diffuse out', cycleX, cycleY2 + rYc + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = releaseRate / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rXc * Math.cos(angle);
            const py = cycleY2 + rYc * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#7c3aed' : '#f97316';
            ctx.beginPath();
            ctx.arc(px, py, sz, 0, Math.PI * 2);
            ctx.fill();
            const na = angle + 0.15;
            const dx = -rXc * Math.sin(na);
            const dy = rYc * Math.cos(na);
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
        ctx.fillText('Dissolution Cycle', cycleX, cycleY2 + 3);
        ctx.restore();

        // Phase complete
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 30 — C30 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Medicines Reach the Right Place?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [solubility, coatingThickness, releaseRate, summary, phase]);

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
                <label className="text-[13px] font-bold text-purple-600">Drug Solubility: {solubility}%</label>
                <input className="w-full accent-purple-500 mb-1" type="range" min={0} max={100} value={solubility}
                    onChange={e => { const v = Number(e.target.value); setSolubility(v); onStateChange('solubility', v); }} />
                <label className="text-[13px] font-bold text-orange-600">Coating Thickness: {coatingThickness}%</label>
                <input className="w-full accent-orange-500 mb-1" type="range" min={0} max={100} value={coatingThickness}
                    onChange={e => { const v = Number(e.target.value); setCoatingThickness(v); onStateChange('coatingThickness', v); }} />
                <p className="text-[11px] mt-1 font-semibold" style={{ color: releaseRate > 50 ? '#16a34a' : '#dc2626' }}>Release Rate (derived): {releaseRate}%/hr {releaseRate > 80 ? '⚡ burst' : ''}</p>
            </div>
        </div>
    );
};
