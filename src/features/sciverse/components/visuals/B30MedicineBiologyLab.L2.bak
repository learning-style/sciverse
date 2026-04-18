import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B30MedicineBiologyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B30MedicineBiologyLab = ({ state, onStateChange }: B30MedicineBiologyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [receptorDensity, setReceptorDensity] = useState(50);
    const [drugAffinity, setDrugAffinity] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Treatment response derived
    const treatmentResponse = useMemo(() => {
        const rd = receptorDensity / 100;
        const da = drugAffinity / 100;
        return Math.round(Math.min(100, (rd * 0.5 + da * 0.5) * 100));
    }, [receptorDensity, drugAffinity]);

    const summary = useMemo(() => {
        if (treatmentResponse > 80) return 'Strong therapeutic effect!';
        if (treatmentResponse > 50) return 'Moderate response — effective.';
        if (treatmentResponse > 25) return 'Weak response — may need higher dose.';
        return 'Minimal effect — poor targeting.';
    }, [treatmentResponse]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#f0fdf4'; // biology green bg
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Header readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#0891b2';
        ctx.fillText('RECEPTORS', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#155e75';
        ctx.fillText(receptorDensity + '%', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('DRUG AFFINITY', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#5b21b6';
        ctx.fillText(drugAffinity + '%', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = treatmentResponse > 50 ? '#16a34a' : '#dc2626';
        ctx.fillText('RESPONSE', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = treatmentResponse > 50 ? '#166534' : '#991b1b';
        ctx.fillText(treatmentResponse + '%', col3, H * 0.14);

        // Response bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Treatment Effectiveness: ' + treatmentResponse + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = treatmentResponse > 60 ? '#22c55e' : treatmentResponse > 30 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * treatmentResponse / 100, 14);

        // === Cell grid with receptors ===
        const gridCX = safeRight * 0.35;
        const gridCY = H * 0.42;
        const cellR = Math.min(safeRight * 0.06, H * 0.05);
        const cols = 4;
        const rows = 3;
        const gap = cellR * 3;
        const startX = gridCX - (cols - 1) * gap / 2;
        const startY = gridCY - (rows - 1) * gap / 2;

        const totalCells = cols * rows;
        const receptorCount = Math.round(receptorDensity / 100 * totalCells);
        const boundCount = Math.round(treatmentResponse / 100 * receptorCount);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                const cx = startX + c * gap;
                const cy = startY + r * gap;
                const hasReceptor = idx < receptorCount;
                const isBound = idx < boundCount;

                // Cell body
                ctx.beginPath();
                ctx.arc(cx, cy, cellR, 0, Math.PI * 2);
                ctx.fillStyle = isBound ? '#bbf7d0' : hasReceptor ? '#fef9c3' : '#f1f5f9';
                ctx.fill();
                ctx.strokeStyle = isBound ? '#16a34a' : hasReceptor ? '#d97706' : '#94a3b8';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Receptor bumps on surface
                if (hasReceptor) {
                    const recCount = 3 + Math.round(receptorDensity / 100 * 3);
                    for (let ri = 0; ri < recCount; ri++) {
                        const ra = (ri / recCount) * Math.PI * 2 + 0.3;
                        const rx = cx + Math.cos(ra) * cellR;
                        const ry = cy + Math.sin(ra) * cellR;
                        ctx.beginPath();
                        ctx.arc(rx, ry, 3, 0, Math.PI * 2);
                        ctx.fillStyle = '#d97706';
                        ctx.fill();
                    }
                }

                // Drug molecule bound to receptor
                if (isBound) {
                    const bindAngle = Math.PI * 0.3;
                    const bx = cx + Math.cos(bindAngle) * (cellR + 6);
                    const by = cy + Math.sin(bindAngle) * (cellR + 6);
                    ctx.save();
                    ctx.globalAlpha = 0.8 + Math.sin(t * 3 + idx) * 0.2;
                    ctx.fillStyle = '#7c3aed';
                    // Diamond shape for drug
                    ctx.beginPath();
                    ctx.moveTo(bx, by - 5);
                    ctx.lineTo(bx + 4, by);
                    ctx.lineTo(bx, by + 5);
                    ctx.lineTo(bx - 4, by);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();

                    // Glow effect on bound cell
                    ctx.save();
                    ctx.globalAlpha = 0.1 + Math.sin(t * 2 + idx * 0.5) * 0.05;
                    ctx.beginPath();
                    ctx.arc(cx, cy, cellR * 1.4, 0, Math.PI * 2);
                    ctx.fillStyle = '#22c55e';
                    ctx.fill();
                    ctx.restore();
                }

                // Cell label
                ctx.font = '8px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#334155';
                ctx.fillText(isBound ? '✓' : hasReceptor ? '⚬' : '—', cx, cy + 3);
            }
        }

        // Floating unbound drug molecules
        ctx.save();
        const floatCount = Math.round((1 - treatmentResponse / 100) * 8);
        for (let i = 0; i < floatCount; i++) {
            const fx = safeRight * 0.1 + ((t * 15 + i * 50) % (safeRight * 0.55));
            const fy = H * 0.30 + Math.sin(t * 1.5 + i * 2) * H * 0.12;
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = '#7c3aed';
            ctx.beginPath();
            ctx.moveTo(fx, fy - 4);
            ctx.lineTo(fx + 3, fy);
            ctx.lineTo(fx, fy + 4);
            ctx.lineTo(fx - 3, fy);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        // Legend on right
        const legendX = safeRight * 0.75;
        const legendTopY = H * 0.32;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        // Target cell
        ctx.beginPath(); ctx.arc(legendX, legendTopY, 6, 0, Math.PI * 2); ctx.fillStyle = '#fef9c3'; ctx.fill();
        ctx.strokeStyle = '#d97706'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#334155'; ctx.fillText('Target cell', legendX + 12, legendTopY + 4);
        // Bound cell
        ctx.beginPath(); ctx.arc(legendX, legendTopY + 22, 6, 0, Math.PI * 2); ctx.fillStyle = '#bbf7d0'; ctx.fill();
        ctx.strokeStyle = '#16a34a'; ctx.stroke();
        ctx.fillStyle = '#334155'; ctx.fillText('Bound (responding)', legendX + 12, legendTopY + 26);
        // Drug molecule
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.moveTo(legendX, legendTopY + 44 - 5);
        ctx.lineTo(legendX + 4, legendTopY + 44);
        ctx.lineTo(legendX, legendTopY + 44 + 5);
        ctx.lineTo(legendX - 4, legendTopY + 44);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillText('Drug molecule', legendX + 12, legendTopY + 48);
        // Receptor
        ctx.beginPath(); ctx.arc(legendX, legendTopY + 66, 3, 0, Math.PI * 2); ctx.fillStyle = '#d97706'; ctx.fill();
        ctx.fillStyle = '#334155'; ctx.fillText('Receptor', legendX + 12, legendTopY + 70);
        // Watch hint
        ctx.font = 'italic 11px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('Watch: cells glow green', legendX - 6, legendTopY + 90);
        ctx.fillText('when drug binds receptor', legendX - 6, legendTopY + 104);

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.45, H * 0.58);

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
        ctx.fillText('Step 1: ↓ Drug reaches target tissue', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Binds to receptors →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Symptoms resolve', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Cell signals cascade', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = treatmentResponse / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#7c3aed' : '#22c55e';
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
        ctx.fillText('Receptor Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 30 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Medicines Reach the Right Place?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P30 Diffusion Transport', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C30 Drug Solubility & Release', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B30 Target Cells & Response', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Diffusion, chemistry, and receptors — three keys to medicine delivery.', W / 2, H * 0.65);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [receptorDensity, drugAffinity, treatmentResponse, summary, phase]);

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
                <label className="text-[13px] font-bold text-cyan-600">Receptor Density: {receptorDensity}%</label>
                <input className="w-full accent-cyan-500 mb-1" type="range" min={0} max={100} value={receptorDensity}
                    onChange={e => { const v = Number(e.target.value); setReceptorDensity(v); onStateChange('receptorDensity', v); }} />
                <label className="text-[13px] font-bold text-purple-600">Drug Affinity: {drugAffinity}%</label>
                <input className="w-full accent-purple-500 mb-1" type="range" min={0} max={100} value={drugAffinity}
                    onChange={e => { const v = Number(e.target.value); setDrugAffinity(v); onStateChange('drugAffinity', v); }} />
                <p className="text-[11px] mt-1 font-semibold" style={{ color: treatmentResponse > 50 ? '#16a34a' : '#dc2626' }}>Treatment Response (derived): {treatmentResponse}% {treatmentResponse > 80 ? '✓ effective' : ''}</p>
            </div>
        </div>
    );
};
