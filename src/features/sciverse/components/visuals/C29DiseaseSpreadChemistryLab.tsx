import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface C29DiseaseSpreadChemistryLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const C29DiseaseSpreadChemistryLab = ({ state, onStateChange }: C29DiseaseSpreadChemistryLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [concentration, setConcentration] = useState(50);
    const [contactTime, setContactTime] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Kill rate derived from concentration and contact time
    const killRate = useMemo(() => {
        const c = concentration / 100;
        const ct = contactTime / 100;
        return Math.round(Math.min(100, (1 - Math.exp(-3 * c * ct)) * 100));
    }, [concentration, contactTime]);

    const summary = useMemo(() => {
        if (killRate > 90) return 'Near-total disinfection!';
        if (killRate > 60) return 'Most pathogens destroyed.';
        if (killRate > 30) return 'Partial disinfection — some survive.';
        return 'Low kill rate — pathogens persist.';
    }, [killRate]);

    // Pathogen positions (stable)
    const pathogensRef = useRef<{ x: number; y: number; alive: boolean }[]>([]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#fefce8'; // light yellow chemistry bg
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Header readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('CONCENTRATION', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#5b21b6';
        ctx.fillText(concentration + '%', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#0891b2';
        ctx.fillText('CONTACT TIME', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#155e75';
        ctx.fillText(contactTime + 's', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = killRate > 60 ? '#16a34a' : '#dc2626';
        ctx.fillText('KILL RATE', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = killRate > 60 ? '#166534' : '#991b1b';
        ctx.fillText(killRate + '%', col3, H * 0.14);

        // Kill rate bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Pathogen Destruction: ' + killRate + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = killRate > 70 ? '#22c55e' : killRate > 40 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * killRate / 100, 14);

        // === Petri dish visualization ===
        const dishCX = safeRight * 0.45;
        const dishCY = H * 0.42;
        const dishR = Math.min(safeRight * 0.25, H * 0.15);

        // Dish outline
        ctx.save();
        ctx.beginPath();
        ctx.arc(dishCX, dishCY, dishR, 0, Math.PI * 2);
        ctx.fillStyle = '#fef9c3';
        ctx.fill();
        ctx.strokeStyle = '#a8a29e';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // Generate pathogens
        const pathogenCount = 24;
        if (pathogensRef.current.length !== pathogenCount) {
            pathogensRef.current = [];
            for (let i = 0; i < pathogenCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * dishR * 0.85;
                pathogensRef.current.push({
                    x: dishCX + Math.cos(angle) * r,
                    y: dishCY + Math.sin(angle) * r,
                    alive: true
                });
            }
        }

        // Disinfectant wave — sweeps across dish
        const wavePhase = (t * 0.4 * (concentration / 50)) % 1;
        const waveX = dishCX - dishR + wavePhase * dishR * 2;

        // Draw wave
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.arc(dishCX, dishCY, dishR, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillRect(dishCX - dishR, dishCY - dishR, waveX - (dishCX - dishR), dishR * 2);
        ctx.restore();

        // Draw pathogens
        const killThreshold = killRate / 100;
        for (let i = 0; i < pathogensRef.current.length; i++) {
            const p = pathogensRef.current[i];
            const fractionIdx = i / pathogenCount;
            const isKilled = fractionIdx < killThreshold && p.x < waveX;

            ctx.save();
            if (isKilled) {
                // Dead pathogen — faded X
                ctx.globalAlpha = 0.25;
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(p.x - 4, p.y - 4); ctx.lineTo(p.x + 4, p.y + 4);
                ctx.moveTo(p.x + 4, p.y - 4); ctx.lineTo(p.x - 4, p.y + 4);
                ctx.stroke();
            } else {
                // Alive pathogen — spiky circle
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                const spikes = 6;
                for (let s = 0; s < spikes; s++) {
                    const a = (s / spikes) * Math.PI * 2 + t * 0.5;
                    const outerR = 5 + Math.sin(t * 3 + i) * 1;
                    const innerR = 3;
                    ctx.lineTo(p.x + Math.cos(a) * outerR, p.y + Math.sin(a) * outerR);
                    ctx.lineTo(p.x + Math.cos(a + Math.PI / spikes) * innerR, p.y + Math.sin(a + Math.PI / spikes) * innerR);
                }
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }

        // Disinfectant molecule particles in wave zone
        ctx.save();
        for (let i = 0; i < 8; i++) {
            const mx = dishCX - dishR + ((t * 30 + i * 40) % (dishR * 2));
            const my = dishCY + Math.sin(t * 2 + i * 1.3) * dishR * 0.5;
            const dx = mx - dishCX;
            const dy = my - dishCY;
            if (dx * dx + dy * dy > dishR * dishR) continue;
            if (mx > waveX) continue;
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = '#7c3aed';
            ctx.beginPath();
            ctx.arc(mx, my, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Legend
        const legendY = H * 0.54;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#16a34a';
        ctx.fillText('● Live pathogen', safeRight * 0.15, legendY + 4);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('✕ Destroyed', safeRight * 0.40, legendY + 4);
        ctx.fillStyle = '#7c3aed';
        ctx.fillText('● Disinfectant', safeRight * 0.62, legendY + 4);

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
        ctx.fillText('Step 1: ↓ Disinfectant contacts pathogen', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Proteins denature →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← More surface exposed', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Cell membrane breaks down', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = killRate / 100;
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
        ctx.fillText('Disinfection Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 29 — C29 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Diseases Spread and Stop?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [concentration, contactTime, killRate, summary, phase]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        const obs = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = node.clientWidth;
            canvas.height = node.clientHeight;
            pathogensRef.current = [];
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
                <label className="text-[13px] font-bold text-purple-600">Concentration: {concentration}%</label>
                <input className="w-full accent-purple-500 mb-1" type="range" min={0} max={100} value={concentration}
                    onChange={e => { const v = Number(e.target.value); setConcentration(v); onStateChange('concentration', v); }} />
                <label className="text-[13px] font-bold text-cyan-600">Contact Time: {contactTime}s</label>
                <input className="w-full accent-cyan-500 mb-1" type="range" min={0} max={100} value={contactTime}
                    onChange={e => { const v = Number(e.target.value); setContactTime(v); onStateChange('contactTime', v); }} />
                <p className="text-[11px] mt-1 font-semibold" style={{ color: killRate > 60 ? '#16a34a' : '#dc2626' }}>Kill Rate (derived): {killRate}% {killRate > 90 ? '✓ sterilized' : ''}</p>
            </div>
        </div>
    );
};
