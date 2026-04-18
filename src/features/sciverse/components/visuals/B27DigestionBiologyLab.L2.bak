import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface B27DigestionBiologyLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const B27DigestionBiologyLab = ({ state, onStateChange }: B27DigestionBiologyLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [mechanical, setMechanical] = useState(50);
    const [enzymeLevel, setEnzymeLevel] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Absorption is derived: good upstream processing → better absorption
    const absorption = useMemo(() => Math.round((mechanical * 0.4 + enzymeLevel * 0.6)), [mechanical, enzymeLevel]);

    const nutrientExtraction = useMemo(() => {
        const m = mechanical / 100;
        const e = enzymeLevel / 100;
        const a = absorption / 100;
        return Math.round(Math.min(m, e, a) * 60 + (m + e + a) / 3 * 40);
    }, [mechanical, enzymeLevel, absorption]);

    const summary = useMemo(() => {
        if (nutrientExtraction > 85) return 'Excellent nutrient extraction!';
        if (nutrientExtraction > 60) return 'Good digestive efficiency.';
        const weakest = Math.min(mechanical, enzymeLevel, absorption);
        if (weakest === mechanical) return 'Bottleneck: poor mechanical processing.';
        if (weakest === enzymeLevel) return 'Bottleneck: low enzyme levels.';
        return 'Bottleneck: low absorption capacity.';
    }, [nutrientExtraction, mechanical, enzymeLevel, absorption]);

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
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#d97706';
        ctx.fillText('MECHANICAL', safeRight * 0.2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#92400e';
        ctx.fillText(mechanical.toString(), safeRight * 0.2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#16a34a';
        ctx.fillText('ENZYMES', safeRight * 0.5, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#166534';
        ctx.fillText(enzymeLevel.toString(), safeRight * 0.5, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#e11d48';
        ctx.fillText('ABSORPTION', safeRight * 0.8, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#9f1239';
        ctx.fillText(absorption.toString(), safeRight * 0.8, H * 0.14);

        // Nutrient extraction bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Nutrient Extraction: ' + nutrientExtraction + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = nutrientExtraction > 70 ? '#22c55e' : nutrientExtraction > 40 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * nutrientExtraction / 100, 14);

        // === Organ pipeline diagram ===
        // Draw a simplified digestive tract as connected organ nodes
        const organs = [
            { name: 'Mouth', x: safeRight * 0.1, y: H * 0.42, color: '#f59e0b', factor: mechanical },
            { name: 'Stomach', x: safeRight * 0.3, y: H * 0.42, color: '#dc2626', factor: (mechanical + enzymeLevel) / 2 },
            { name: 'Sm. Intestine', x: safeRight * 0.55, y: H * 0.42, color: '#16a34a', factor: enzymeLevel },
            { name: 'Absorption', x: safeRight * 0.8, y: H * 0.42, color: '#e11d48', factor: absorption },
        ];

        // Connection arrows
        ctx.save();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        for (let i = 0; i < organs.length - 1; i++) {
            const from = organs[i];
            const to = organs[i + 1];
            ctx.beginPath();
            ctx.moveTo(from.x + 22, from.y);
            ctx.lineTo(to.x - 22, to.y);
            ctx.stroke();
            // Arrow head
            ctx.beginPath();
            ctx.moveTo(to.x - 22, to.y - 5);
            ctx.lineTo(to.x - 14, to.y);
            ctx.lineTo(to.x - 22, to.y + 5);
            ctx.fillStyle = '#94a3b8';
            ctx.fill();
        }
        ctx.restore();

        // Organ circles
        for (const organ of organs) {
            const scale = 0.5 + (organ.factor / 100) * 0.5;
            const alpha = 0.4 + (organ.factor / 100) * 0.5;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(organ.x, organ.y, 20 * scale, 0, Math.PI * 2);
            ctx.fillStyle = organ.color;
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(organ.name, organ.x, organ.y + 30 * scale + 6);
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText(Math.round(organ.factor) + '%', organ.x, organ.y + 30 * scale + 18);
            ctx.restore();
        }

        // Animated food particles flowing through the pipeline
        const pCount = 6;
        const flowSpeed = 0.15 + (nutrientExtraction / 100) * 0.3;
        ctx.save();
        for (let i = 0; i < pCount; i++) {
            const progress = ((t * flowSpeed + i / pCount) % 1);
            const totalLen = organs.length - 1;
            const seg = Math.floor(progress * totalLen);
            const segFrac = (progress * totalLen) - seg;
            const from = organs[Math.min(seg, organs.length - 1)];
            const to = organs[Math.min(seg + 1, organs.length - 1)];
            const px = from.x + (to.x - from.x) * segFrac;
            const py = from.y + (to.y - from.y) * segFrac;
            // Particle shrinks as it progresses (food breaks down)
            const sz = 6 - progress * 4;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(px, py, Math.max(2, sz), 0, Math.PI * 2);
            ctx.fillStyle = progress < 0.33 ? '#f59e0b' : progress < 0.66 ? '#86efac' : '#fb7185';
            ctx.fill();
        }
        ctx.restore();

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight * 0.45, H * 0.58);

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
        ctx.fillText('Step 1: ↓ Mechanical prep', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Chemical breakdown →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Hormones coordinate', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Absorption completes', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = nutrientExtraction / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#fb7185' : '#f59e0b';
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
        ctx.fillText('Integration Pipeline', cycleX, cycleY + 3);
        ctx.restore();

        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 27 Complete!', W / 2, H * 0.30);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Does Food Become Usable Energy?', W / 2, H * 0.38);
            ctx.font = '12px monospace';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText('P27 Mechanical Digestion', W / 2, H * 0.46);
            ctx.fillStyle = '#86efac';
            ctx.fillText('C27 Enzyme Chemistry', W / 2, H * 0.52);
            ctx.fillStyle = '#fca5a5';
            ctx.fillText('B27 Digestive Integration', W / 2, H * 0.58);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px monospace';
            ctx.fillText('From bite to cellular fuel — physics, chemistry, biology united.', W / 2, H * 0.65);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [mechanical, enzymeLevel, absorption, nutrientExtraction, summary, phase]); // absorption is derived

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
                <label className="text-[13px] font-bold text-amber-600">Mechanical Efficiency: {mechanical}</label>
                <input className="w-full accent-amber-500 mb-1" type="range" min={0} max={100} value={mechanical}
                    onChange={e => { const v = Number(e.target.value); setMechanical(v); onStateChange('mechanical', v); }} />
                <label className="text-[13px] font-bold text-green-600">Enzyme Level: {enzymeLevel}</label>
                <input className="w-full accent-green-500 mb-1" type="range" min={0} max={100} value={enzymeLevel}
                    onChange={e => { const v = Number(e.target.value); setEnzymeLevel(v); onStateChange('enzymeLevel', v); }} />
                <p className="text-[11px] text-rose-500 mt-1 font-semibold">Absorption (derived): {absorption}%</p>
            </div>
        </div>
    );
};
