import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B29DiseaseSpreadBiologyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B29DiseaseSpreadBiologyLab = ({ state, onStateChange }: B29DiseaseSpreadBiologyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [immuneStrength, setImmuneStrength] = useState(50);
    const [vaccinationRate, setVaccinationRate] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Herd immunity derived — formula: threshold = 1 - 1/R0, here R0 assumed ~3
    const herdImmunity = useMemo(() => {
        const im = immuneStrength / 100;
        const vr = vaccinationRate / 100;
        return Math.round(Math.min(100, (im * 0.3 + vr * 0.7) * 100));
    }, [immuneStrength, vaccinationRate]);

    const isProtected = herdImmunity >= 67; // ~1 - 1/3 for R0=3

    const summary = useMemo(() => {
        if (herdImmunity >= 80) return 'Strong herd immunity achieved!';
        if (herdImmunity >= 67) return 'Herd immunity threshold reached.';
        if (herdImmunity >= 40) return 'Partial protection — outbreak still possible.';
        return 'Low immunity — population vulnerable.';
    }, [herdImmunity]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#f0fdf4'; // light green biology bg
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Header readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#0891b2';
        ctx.fillText('IMMUNE', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#155e75';
        ctx.fillText(immuneStrength + '%', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#2563eb';
        ctx.fillText('VACCINATED', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText(vaccinationRate + '%', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = isProtected ? '#16a34a' : '#dc2626';
        ctx.fillText('HERD IMMUNITY', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = isProtected ? '#166534' : '#991b1b';
        ctx.fillText(herdImmunity + '%', col3, H * 0.14);

        // Herd immunity bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Population Protection: ' + herdImmunity + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = herdImmunity > 67 ? '#22c55e' : herdImmunity > 40 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * herdImmunity / 100, 14);
        // Threshold marker at 67%
        const threshX = barX + barW * 0.67;
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(threshX, H * 0.23 - 3);
        ctx.lineTo(threshX, H * 0.23 + 17);
        ctx.stroke();
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.fillText('67% threshold', threshX, H * 0.23 + 28);

        // === Population grid visualization ===
        const gridCX = safeRight * 0.45;
        const gridCY = H * 0.42;
        const gridSize = 5; // 5x5 grid = 25 people
        const cellSize = Math.min(22, safeRight * 0.05, H * 0.04);
        const gap = cellSize * 1.6;
        const gridW = gridSize * gap;
        const startX = gridCX - gridW / 2;
        const startY = gridCY - gridW / 2;

        const vaccinatedCount = Math.round(vaccinationRate / 100 * 25);
        const immuneCount = Math.round(immuneStrength / 100 * (25 - vaccinatedCount));

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const idx = row * gridSize + col;
                const px = startX + col * gap + gap / 2;
                const py = startY + row * gap + gap / 2;

                let color: string;
                let label: string;
                if (idx < vaccinatedCount) {
                    color = '#d97706'; // vaccinated (amber)
                    label = '💉';
                } else if (idx < vaccinatedCount + immuneCount) {
                    color = '#22c55e'; // naturally immune
                    label = '🛡️';
                } else {
                    color = '#94a3b8'; // vulnerable
                    label = '🧑';
                }

                // Person circle
                ctx.beginPath();
                ctx.arc(px, py, cellSize * 0.55, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.25;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Shield effect for protected individuals
                if (idx < vaccinatedCount + immuneCount) {
                    ctx.save();
                    ctx.globalAlpha = 0.15 + Math.sin(t * 2 + idx * 0.3) * 0.1;
                    ctx.beginPath();
                    ctx.arc(px, py, cellSize * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.restore();
                }

                // Icon inside circle
                if (idx < vaccinatedCount) {
                    // Bold syringe cross for vaccinated
                    ctx.font = `bold ${cellSize * 0.7}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#7c2d12';
                    ctx.fillText('+', px, py + cellSize * 0.25);
                } else {
                    ctx.font = `${cellSize * 0.6}px serif`;
                    ctx.textAlign = 'center';
                    ctx.fillText(label, px, py + cellSize * 0.2);
                }
            }
        }

        // Pathogen trying to penetrate — bouncing off if herd immunity reached
        if (isProtected) {
            // Shield dome effect
            ctx.save();
            ctx.globalAlpha = 0.12 + Math.sin(t * 1.5) * 0.06;
            ctx.beginPath();
            ctx.arc(gridCX, gridCY, gridW * 0.65, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e';
            ctx.fill();
            ctx.restore();
        }

        // Animated pathogen
        const pathAngle = t * 0.8;
        const pathDist = gridW * 0.6 + Math.sin(t * 2) * 10;
        const pathX = gridCX + Math.cos(pathAngle) * pathDist;
        const pathY = gridCY + Math.sin(pathAngle) * pathDist;
        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = isProtected ? 0.3 : 0.8;
        ctx.beginPath();
        const spikes = 8;
        for (let s = 0; s < spikes; s++) {
            const a = (s / spikes) * Math.PI * 2 + t * 2;
            const outerR = 8;
            const innerR = 4;
            ctx.lineTo(pathX + Math.cos(a) * outerR, pathY + Math.sin(a) * outerR);
            ctx.lineTo(pathX + Math.cos(a + Math.PI / spikes) * innerR, pathY + Math.sin(a + Math.PI / spikes) * innerR);
        }
        ctx.closePath();
        ctx.fill();
        if (isProtected) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pathX - 6, pathY - 6);
            ctx.lineTo(pathX + 6, pathY + 6);
            ctx.moveTo(pathX + 6, pathY - 6);
            ctx.lineTo(pathX - 6, pathY + 6);
            ctx.stroke();
        }
        ctx.restore();

        // Legend — vertical column on right
        const legendX = safeRight * 0.82;
        const legendTopY = H * 0.32;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        // Vaccinated
        ctx.beginPath(); ctx.arc(legendX, legendTopY, 6, 0, Math.PI * 2); ctx.fillStyle = '#d97706'; ctx.fill();
        ctx.fillStyle = '#7c2d12'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', legendX, legendTopY + 3);
        ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#334155';
        ctx.fillText('Vaccinated', legendX + 12, legendTopY + 4);
        // Naturally immune
        ctx.beginPath(); ctx.arc(legendX, legendTopY + 22, 6, 0, Math.PI * 2); ctx.fillStyle = '#22c55e'; ctx.fill();
        ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#334155';
        ctx.fillText('Immune', legendX + 12, legendTopY + 26);
        // Vulnerable
        ctx.beginPath(); ctx.arc(legendX, legendTopY + 44, 6, 0, Math.PI * 2); ctx.fillStyle = '#94a3b8'; ctx.fill();
        ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#334155';
        ctx.fillText('Vulnerable', legendX + 12, legendTopY + 48);
        // Pathogen
        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        for (let s = 0; s < 8; s++) {
            const a = (s / 8) * Math.PI * 2;
            ctx.lineTo(legendX + Math.cos(a) * 6, legendTopY + 66 + Math.sin(a) * 6);
            ctx.lineTo(legendX + Math.cos(a + Math.PI / 8) * 3, legendTopY + 66 + Math.sin(a + Math.PI / 8) * 3);
        }
        ctx.closePath(); ctx.fill();
        ctx.restore();
        ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = '#334155';
        ctx.fillText('Pathogen', legendX + 12, legendTopY + 70);
        // Watch hint
        ctx.font = 'italic 11px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('Watch: pathogen fades', legendX - 6, legendTopY + 90);
        ctx.fillText('when herd immunity is', legendX - 6, legendTopY + 104);
        ctx.fillText('reached (≥67%)', legendX - 6, legendTopY + 118);

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.45, H * 0.60);

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
        ctx.fillText('Step 1: ↓ Vaccination builds antibodies', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Immune memory forms →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Disease can\'t spread', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Herd immunity protects all', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = herdImmunity / 100;
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
        ctx.fillText('Immunity Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 29 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Diseases Spread and Stop?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P29 Contact Networks', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C29 Disinfection Kinetics', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B29 Immunity & Vaccination', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Contact, chemistry, and immunity — three defenses against disease.', W / 2, H * 0.65);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [immuneStrength, vaccinationRate, herdImmunity, isProtected, summary, phase]);

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
                <label className="text-[13px] font-bold text-cyan-600">Immune Strength: {immuneStrength}%</label>
                <input className="w-full accent-cyan-500 mb-1" type="range" min={0} max={100} value={immuneStrength}
                    onChange={e => { const v = Number(e.target.value); setImmuneStrength(v); onStateChange('immuneStrength', v); }} />
                <label className="text-[13px] font-bold text-blue-600">Vaccination Rate: {vaccinationRate}%</label>
                <input className="w-full accent-blue-500 mb-1" type="range" min={0} max={100} value={vaccinationRate}
                    onChange={e => { const v = Number(e.target.value); setVaccinationRate(v); onStateChange('vaccinationRate', v); }} />
                <p className="text-[11px] mt-1 font-semibold" style={{ color: isProtected ? '#16a34a' : '#dc2626' }}>Herd Immunity (derived): {herdImmunity}% {isProtected ? '✓ protected' : '⚠️ vulnerable'}</p>
            </div>
        </div>
    );
};
