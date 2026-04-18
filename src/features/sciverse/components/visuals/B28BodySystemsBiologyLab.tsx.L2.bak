import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B28BodySystemsBiologyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B28BodySystemsBiologyLab = ({ state, onStateChange }: B28BodySystemsBiologyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [respiratoryRate, setRespiratoryRate] = useState(50);
    const [heartRateB, setHeartRateB] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Coordination derived: balanced rates = best coordination
    const coordination = useMemo(() => {
        const diff = Math.abs(respiratoryRate - heartRateB);
        const avg = (respiratoryRate + heartRateB) / 2;
        const balance = Math.max(0, 100 - diff * 1.2);
        return Math.round(balance * 0.6 + (avg / 100) * 40);
    }, [respiratoryRate, heartRateB]);

    const o2Delivery = useMemo(() => {
        const breathFactor = respiratoryRate / 100;
        const pumpFactor = heartRateB / 100;
        return Math.round(Math.min(breathFactor, pumpFactor) * 60 + (breathFactor + pumpFactor) / 2 * 40);
    }, [respiratoryRate, heartRateB]);

    const summary = useMemo(() => {
        if (coordination > 80 && o2Delivery > 70) return 'Excellent organ coordination!';
        if (coordination > 60) return 'Good system balance.';
        const diff = Math.abs(respiratoryRate - heartRateB);
        if (diff > 40) return 'Systems out of sync — bottleneck!';
        if (respiratoryRate < 30 && heartRateB < 30) return 'Both systems underactive.';
        return 'Moderate coordination.';
    }, [coordination, o2Delivery, respiratoryRate, heartRateB]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#fdf2f8';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Variable readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#0891b2';
        ctx.fillText('BREATHING', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#164e63';
        ctx.fillText(Math.round(8 + respiratoryRate * 0.32) + '/min', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('HEART RATE', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#991b1b';
        ctx.fillText(Math.round(50 + heartRateB * 1.3) + ' bpm', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#16a34a';
        ctx.fillText('COORDINATION', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#166534';
        ctx.fillText(coordination + '%', col3, H * 0.14);

        // O2 delivery bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('O₂ Delivery: ' + o2Delivery + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = o2Delivery > 70 ? '#22c55e' : o2Delivery > 40 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * o2Delivery / 100, 14);

        // === Organ system nodes ===
        const organs = [
            { name: 'Lungs', x: safeRight * 0.1, y: H * 0.42, color: '#06b6d4', factor: respiratoryRate, icon: 'lung' },
            { name: 'Heart', x: safeRight * 0.33, y: H * 0.42, color: '#ef4444', factor: heartRateB, icon: 'heart' },
            { name: 'Brain', x: safeRight * 0.56, y: H * 0.35, color: '#a855f7', factor: coordination, icon: 'brain' },
            { name: 'Muscles', x: safeRight * 0.8, y: H * 0.42, color: '#f97316', factor: o2Delivery, icon: 'muscle' },
        ];

        // Connection arrows
        ctx.save();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        // Lungs → Heart
        ctx.beginPath();
        ctx.moveTo(organs[0].x + 24, organs[0].y);
        ctx.lineTo(organs[1].x - 24, organs[1].y);
        ctx.stroke();
        // Heart → Muscles
        ctx.beginPath();
        ctx.moveTo(organs[1].x + 24, organs[1].y);
        ctx.lineTo(organs[3].x - 24, organs[3].y);
        ctx.stroke();
        // Brain → Lungs (control signal)
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = '#a855f7';
        ctx.beginPath();
        ctx.moveTo(organs[2].x - 20, organs[2].y + 12);
        ctx.lineTo(organs[0].x + 10, organs[0].y - 18);
        ctx.stroke();
        // Brain → Heart (control signal)
        ctx.beginPath();
        ctx.moveTo(organs[2].x - 5, organs[2].y + 18);
        ctx.lineTo(organs[1].x + 5, organs[1].y - 18);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Arrow heads
        ctx.fillStyle = '#94a3b8';
        // Lungs → Heart
        ctx.beginPath();
        ctx.moveTo(organs[1].x - 24, organs[1].y - 5);
        ctx.lineTo(organs[1].x - 16, organs[1].y);
        ctx.lineTo(organs[1].x - 24, organs[1].y + 5);
        ctx.fill();
        // Heart → Muscles
        ctx.beginPath();
        ctx.moveTo(organs[3].x - 24, organs[3].y - 5);
        ctx.lineTo(organs[3].x - 16, organs[3].y);
        ctx.lineTo(organs[3].x - 24, organs[3].y + 5);
        ctx.fill();

        // Organ circles with icons
        for (const organ of organs) {
            const scale = 0.5 + (organ.factor / 100) * 0.5;
            const alpha = 0.4 + (organ.factor / 100) * 0.5;
            const r = 20 * scale;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(organ.x, organ.y, r, 0, Math.PI * 2);
            ctx.fillStyle = organ.color;
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Animated pulse for active organs
            if (organ.factor > 40) {
                const pulse = Math.sin(t * 3) * 0.15;
                ctx.globalAlpha = 0.2 + pulse;
                ctx.beginPath();
                ctx.arc(organ.x, organ.y, r + 6, 0, Math.PI * 2);
                ctx.strokeStyle = organ.color;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(organ.name, organ.x, organ.y + r + 14);
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText(Math.round(organ.factor) + '%', organ.x, organ.y + r + 26);
            ctx.restore();
        }

        // === Animated O2 particles flowing Lungs → Heart → Muscles ===
        const flowNodes = [organs[0], organs[1], organs[3]];
        const pCount = 8;
        const flowSpeed = 0.12 + (o2Delivery / 100) * 0.35;
        ctx.save();
        for (let i = 0; i < pCount; i++) {
            const progress = ((t * flowSpeed + i / pCount) % 1);
            const totalSegs = flowNodes.length - 1;
            const seg = Math.floor(progress * totalSegs);
            const segFrac = (progress * totalSegs) - seg;
            const from = flowNodes[Math.min(seg, flowNodes.length - 1)];
            const to = flowNodes[Math.min(seg + 1, flowNodes.length - 1)];
            const px = from.x + (to.x - from.x) * segFrac;
            const py = from.y + (to.y - from.y) * segFrac + Math.sin(t + i) * 4;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            // Color transitions: blue O2 → red oxygenated blood → orange to muscles
            ctx.fillStyle = progress < 0.33 ? '#06b6d4' : progress < 0.66 ? '#ef4444' : '#f97316';
            ctx.fill();
        }
        ctx.restore();

        // CO2 return (faint, bottom path)
        ctx.save();
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 4; i++) {
            const progress = ((t * flowSpeed * 0.7 + i / 4) % 1);
            const px = organs[3].x - (organs[3].x - organs[0].x) * progress;
            const py = H * 0.52 + Math.sin(t + i * 2) * 3;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#9ca3af';
            ctx.fill();
        }
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#9ca3af';
        ctx.textAlign = 'center';
        ctx.fillText('CO₂ return →', safeRight * 0.45, H * 0.56);
        ctx.restore();

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.45, H * 0.63);

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
        ctx.fillText('Step 1: ↓ Muscles demand O₂', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Brain raises heart rate →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← CO₂ signals the brain', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Lungs increase breathing', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = coordination / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#06b6d4' : '#ef4444';
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
        ctx.fillText('Coordination Loop', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 28 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Body Systems Work Together?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P28 Flow & Pressure', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C28 Chemical Signaling', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B28 Organ Coordination', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('Heart, lungs, brain, and muscles — one integrated system.', W / 2, H * 0.65);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [respiratoryRate, heartRateB, coordination, o2Delivery, summary, phase]);

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
                <label className="text-[13px] font-bold text-cyan-600">Respiratory Rate: {Math.round(8 + respiratoryRate * 0.32)}/min</label>
                <input className="w-full accent-cyan-500 mb-1" type="range" min={0} max={100} value={respiratoryRate}
                    onChange={e => { const v = Number(e.target.value); setRespiratoryRate(v); onStateChange('respiratoryRate', v); }} />
                <label className="text-[13px] font-bold text-red-600">Heart Rate: {Math.round(50 + heartRateB * 1.3)} bpm</label>
                <input className="w-full accent-red-500 mb-1" type="range" min={0} max={100} value={heartRateB}
                    onChange={e => { const v = Number(e.target.value); setHeartRateB(v); onStateChange('heartRateB', v); }} />
                <p className="text-[11px] text-green-500 mt-1 font-semibold">Coordination (derived): {coordination}%</p>
            </div>
        </div>
    );
};
