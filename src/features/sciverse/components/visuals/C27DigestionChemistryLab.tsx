import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C27DigestionChemistryLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C27DigestionChemistryLab = ({ state, onStateChange }: C27DigestionChemistryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [temperature, setTemperature] = useState(37);
    const [ph, setPh] = useState(7);
    const phase = (state.phase as string) || 'intro';

    // Enzyme activity: bell curve around optimal temp (37) and context-dependent pH
    const enzymeActivity = useMemo(() => {
        const tempFactor = Math.max(0, 1 - Math.pow((temperature - 37) / 15, 2));
        const phFactor = Math.max(0, 1 - Math.pow((ph - 7) / 5, 2));
        return Math.round(tempFactor * phFactor * 100);
    }, [temperature, ph]);

    const summary = useMemo(() => {
        if (enzymeActivity > 80) return 'Optimal enzyme activity!';
        if (enzymeActivity > 50) return 'Good enzyme conditions.';
        if (temperature > 50) return 'Enzymes denaturing — too hot!';
        if (temperature < 20) return 'Enzymes sluggish — too cold.';
        if (ph < 3) return 'Very acidic — pepsin thrives here.';
        if (ph > 10) return 'Too alkaline — most enzymes fail.';
        return 'Suboptimal conditions.';
    }, [enzymeActivity, temperature, ph]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#ecfdf5';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Variable readouts
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('TEMPERATURE', safeRight * 0.3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#991b1b';
        ctx.fillText(temperature + '°C', safeRight * 0.3, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('pH', safeRight * 0.7, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#5b21b6';
        ctx.fillText(ph.toFixed(1), safeRight * 0.7, H * 0.14);

        // Enzyme activity meter
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Enzyme Activity: ' + enzymeActivity + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(200, safeRight * 0.4);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 12);
        ctx.fillStyle = enzymeActivity > 70 ? '#22c55e' : enzymeActivity > 40 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * enzymeActivity / 100, 12);

        // === Lock-and-key enzyme visual (left) ===
        const eX = safeRight * 0.25;
        const eY = H * 0.45;
        const eScale = 0.5 + (enzymeActivity / 100) * 0.5;
        const eAlpha = 0.4 + (enzymeActivity / 100) * 0.5;
        ctx.save();
        ctx.globalAlpha = eAlpha;
        // Enzyme body (rounded shape with notch)
        ctx.fillStyle = '#86efac';
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(eX - 14 * eScale, eY, 22 * eScale, Math.PI * 0.5, Math.PI * 1.5);
        ctx.lineTo(eX + 6 * eScale, eY - 22 * eScale);
        ctx.arc(eX + 6 * eScale, eY - 10 * eScale, 12 * eScale, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.arc(eX + 6 * eScale, eY + 10 * eScale, 12 * eScale, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Substrate (key shape) — moves in when activity is high
        const subOffset = (1 - enzymeActivity / 100) * 30 * eScale;
        ctx.fillStyle = '#fbbf24';
        ctx.strokeStyle = '#b45309';
        ctx.beginPath();
        ctx.roundRect(eX + 20 * eScale + subOffset, eY - 8 * eScale, 24 * eScale, 16 * eScale, 3);
        ctx.fill();
        ctx.stroke();
        // Notch on substrate
        ctx.fillStyle = '#ecfdf5';
        ctx.beginPath();
        ctx.arc(eX + 20 * eScale + subOffset, eY, 5 * eScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Enzyme + Substrate', eX + 10, eY + 36 * eScale);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText('(lock & key)', eX + 10, eY + 50 * eScale);
        ctx.restore();

        // === Temperature gauge (center) ===
        const tgX = safeRight * 0.5;
        const tgY = H * 0.45;
        ctx.save();
        // Thermometer tube
        const tubeH = 60;
        ctx.fillStyle = '#e2e8f0';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(tgX - 8, tgY - tubeH / 2, 16, tubeH, 8);
        ctx.fill();
        ctx.stroke();
        // Fill level
        const tempFrac = Math.min(1, Math.max(0, (temperature - 10) / 50));
        const fillH = tempFrac * (tubeH - 8);
        ctx.fillStyle = temperature > 45 ? '#ef4444' : temperature > 30 ? '#f59e0b' : '#3b82f6';
        ctx.beginPath();
        ctx.roundRect(tgX - 5, tgY + tubeH / 2 - 4 - fillH, 10, fillH, 4);
        ctx.fill();
        // Bulb
        ctx.beginPath();
        ctx.arc(tgX, tgY + tubeH / 2 + 6, 10, 0, Math.PI * 2);
        ctx.fillStyle = temperature > 45 ? '#ef4444' : '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.stroke();
        // Optimal zone marker
        const optY = tgY + tubeH / 2 - 4 - ((37 - 10) / 50) * (tubeH - 8);
        ctx.beginPath();
        ctx.moveTo(tgX + 12, optY);
        ctx.lineTo(tgX + 22, optY);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#22c55e';
        ctx.textAlign = 'left';
        ctx.fillText('37°C', tgX + 24, optY + 4);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Temperature', tgX, tgY + tubeH / 2 + 28);
        ctx.restore();

        // === pH scale (right of center) ===
        const phX = safeRight * 0.75;
        const phY = H * 0.42;
        const phBarW = 80;
        const phBarH = 14;
        ctx.save();
        // pH gradient bar
        const grad = ctx.createLinearGradient(phX - phBarW / 2, 0, phX + phBarW / 2, 0);
        grad.addColorStop(0, '#ef4444');
        grad.addColorStop(0.35, '#f59e0b');
        grad.addColorStop(0.5, '#22c55e');
        grad.addColorStop(0.65, '#3b82f6');
        grad.addColorStop(1, '#7c3aed');
        ctx.fillStyle = grad;
        ctx.fillRect(phX - phBarW / 2, phY, phBarW, phBarH);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.strokeRect(phX - phBarW / 2, phY, phBarW, phBarH);
        // Current pH indicator
        const phPos = phX - phBarW / 2 + (ph / 14) * phBarW;
        ctx.beginPath();
        ctx.moveTo(phPos, phY + phBarH + 2);
        ctx.lineTo(phPos - 5, phY + phBarH + 10);
        ctx.lineTo(phPos + 5, phY + phBarH + 10);
        ctx.closePath();
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        // Labels
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'left';
        ctx.fillText('0', phX - phBarW / 2, phY - 4);
        ctx.textAlign = 'right';
        ctx.fillText('14', phX + phBarW / 2, phY - 4);
        ctx.textAlign = 'center';
        ctx.fillText('7', phX, phY - 4);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('pH Scale', phX, phY + phBarH + 26);
        // Enzyme type labels
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Pepsin (pH 2)', phX - 18, phY + phBarH + 40);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('Trypsin (pH 8)', phX + 18, phY + phBarH + 52);
        ctx.restore();

        // === Animated feedback cycle (right-bottom) ===
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
        ctx.fillText('Step 1: ↓ Enzyme binds substrate', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Hydrolysis breaks bonds →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Products released', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Enzyme recycled for next', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const speed = 0.25 + (enzymeActivity / 100) * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + (enzymeActivity / 100) * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#86efac' : '#fbbf24';
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
        ctx.fillText('Catalytic Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.5, H * 0.60);

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 27 — C27 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Does Food Become Usable Energy?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [temperature, ph, enzymeActivity, summary, phase]);

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
                <label className="text-[13px] font-bold text-red-600">Temperature: {temperature}°C</label>
                <input className="w-full accent-red-500 mb-1" type="range" min={10} max={60} value={temperature}
                    onChange={e => { const v = Number(e.target.value); setTemperature(v); onStateChange('temperature', v); }} />
                <label className="text-[13px] font-bold text-violet-600">pH: {ph.toFixed(1)}</label>
                <input className="w-full accent-violet-500" type="range" min={0} max={14} step={0.5} value={ph}
                    onChange={e => { const v = Number(e.target.value); setPh(v); onStateChange('ph', v); }} />
            </div>
        </div>
    );
};
