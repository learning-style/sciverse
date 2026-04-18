import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P27DigestionPhysicsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P27DigestionPhysicsLab = ({ state, onStateChange }: P27DigestionPhysicsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [grinding, setGrinding] = useState(50);
    const [churning, setChurning] = useState(50);
    const [peristalsis, setPeristalsis] = useState(50);
    const phase = (state.phase as string) || 'intro';

    const surfaceArea = useMemo(() => Math.round(10 + (grinding / 100) * 90), [grinding]);
    const transitSpeed = useMemo(() => Math.round(2 + (peristalsis / 100) * 23), [peristalsis]);
    const summary = useMemo(() => {
        if (grinding > 70 && churning > 70 && peristalsis > 70) return 'Maximum mechanical digestion!';
        if (grinding > 70) return 'Excellent grinding — high surface area.';
        if (churning > 70) return 'Strong stomach churning.';
        if (peristalsis > 70) return 'Fast peristaltic transport.';
        return 'Moderate mechanical processing.';
    }, [grinding, churning, peristalsis]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#fef3c7';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Variable readouts
        ctx.textAlign = 'center';
        const labelY = H * 0.08;
        const valueY = H * 0.14;
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#d97706';
        ctx.fillText('GRINDING', col1, labelY);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#92400e';
        ctx.fillText(grinding.toString(), col1, valueY);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#ea580c';
        ctx.fillText('CHURNING', col2, labelY);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#9a3412';
        ctx.fillText(churning.toString(), col2, valueY);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#65a30d';
        ctx.fillText('PERISTALSIS', col3, labelY);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#3f6212';
        ctx.fillText(transitSpeed + ' cm/s', col3, valueY);

        // === Teeth / Grinding visual (left) ===
        const teethX = safeRight * 0.2;
        const teethY = H * 0.4;
        const gScale = 0.4 + (grinding / 100) * 0.6;
        const gAlpha = 0.4 + (grinding / 100) * 0.5;
        ctx.save();
        ctx.globalAlpha = gAlpha;
        // Upper teeth
        const jawGap = 8 + (1 - grinding / 100) * 16;
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = '#fefce8';
            ctx.strokeStyle = '#a16207';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(teethX - 24 * gScale + i * 13 * gScale, teethY - jawGap - 14 * gScale, 11 * gScale, 14 * gScale, 2);
            ctx.fill();
            ctx.stroke();
        }
        // Lower teeth
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = '#fefce8';
            ctx.strokeStyle = '#a16207';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(teethX - 24 * gScale + i * 13 * gScale, teethY + jawGap, 11 * gScale, 14 * gScale, 2);
            ctx.fill();
            ctx.stroke();
        }
        // Food particles between teeth
        const particleCount = Math.round(3 + (grinding / 100) * 12);
        const particleSize = Math.max(2, 8 - (grinding / 100) * 6);
        for (let i = 0; i < particleCount; i++) {
            const px = teethX + (Math.sin(i * 2.7 + t) * 18 * gScale);
            const py = teethY + (Math.cos(i * 3.1) * 6);
            ctx.beginPath();
            ctx.arc(px, py, particleSize * gScale, 0, Math.PI * 2);
            ctx.fillStyle = '#f59e0b';
            ctx.fill();
        }
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Grinding', teethX, teethY + 40 * gScale);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText(`SA: ${surfaceArea}%`, teethX, teethY + 54 * gScale);
        ctx.restore();

        // === Stomach / Churning visual (center) ===
        const stomX = safeRight * 0.5;
        const stomY = H * 0.4;
        const cScale = 0.4 + (churning / 100) * 0.6;
        const cAlpha = 0.4 + (churning / 100) * 0.5;
        ctx.save();
        ctx.globalAlpha = cAlpha;
        // Stomach shape
        const wobble = Math.sin(t * 3 * (churning / 100)) * 4 * cScale;
        ctx.beginPath();
        ctx.ellipse(stomX + wobble, stomY, 35 * cScale, 28 * cScale, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fecaca';
        ctx.fill();
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // Churning arrows inside
        for (let i = 0; i < 3; i++) {
            const angle = (t * 2 * (churning / 100) + i * Math.PI * 2 / 3);
            const ax = stomX + Math.cos(angle) * 16 * cScale;
            const ay = stomY + Math.sin(angle) * 12 * cScale;
            ctx.beginPath();
            ctx.arc(ax, ay, 3 * cScale, 0, Math.PI * 2);
            ctx.fillStyle = '#f97316';
            ctx.fill();
        }
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Churning', stomX, stomY + 42 * cScale);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText('~3 contractions/min', stomX, stomY + 56 * cScale);
        ctx.restore();

        // === Peristalsis visual (right) ===
        const periX = safeRight * 0.8;
        const periY = H * 0.4;
        const pScale = 0.4 + (peristalsis / 100) * 0.6;
        const pAlpha = 0.4 + (peristalsis / 100) * 0.5;
        ctx.save();
        ctx.globalAlpha = pAlpha;
        // Tube
        const tubeLen = 60 * pScale;
        const tubeW = 14 * pScale;
        ctx.fillStyle = '#fde68a';
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(periX - tubeLen / 2, periY - tubeW, tubeLen, tubeW * 2, 8);
        ctx.fill();
        ctx.stroke();
        // Peristaltic wave
        const wavePos = ((t * 0.8 * (peristalsis / 100)) % 1);
        const bulgeX = periX - tubeLen / 2 + wavePos * tubeLen;
        ctx.beginPath();
        ctx.ellipse(bulgeX, periY, 6 * pScale, tubeW + 4 * pScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#f97316';
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = pAlpha;
        // Moving food dot
        ctx.beginPath();
        ctx.arc(bulgeX, periY, 4 * pScale, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.fill();
        // Direction arrow
        ctx.beginPath();
        ctx.moveTo(periX + tubeLen / 2 + 4, periY - 6);
        ctx.lineTo(periX + tubeLen / 2 + 14, periY);
        ctx.lineTo(periX + tubeLen / 2 + 4, periY + 6);
        ctx.fillStyle = '#65a30d';
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Peristalsis', periX, periY + 30 * pScale + 12);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText(`${transitSpeed} cm/s`, periX, periY + 30 * pScale + 26);
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
        ctx.fillText('Step 1: ↓ Grinding increases surface area', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Churning mixes →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Enzymes access surface', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Peristalsis moves forward', cycleX, cycleY + rY + 16);
        ctx.restore();

        // Animated particles
        const loopParticles = 10;
        const avgVal = (grinding + churning + peristalsis) / 300;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#f59e0b' : '#dc2626';
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
        ctx.fillText('Mechanical Pipeline', cycleX, cycleY + 3);
        ctx.restore();

        // Summary
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = '#334155';
        ctx.fillText(summary, safeRight / 2, H * 0.58);

        // Phase label
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 27 — P27 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Does Food Become Usable Energy?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [grinding, churning, peristalsis, summary, surfaceArea, transitSpeed, phase]);

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
                <label className="text-[13px] font-bold text-amber-600">Grinding Force: {grinding}</label>
                <input className="w-full accent-amber-500 mb-1" type="range" min={0} max={100} value={grinding}
                    onChange={e => { const v = Number(e.target.value); setGrinding(v); onStateChange('grinding', v); }} />
                <label className="text-[13px] font-bold text-orange-600">Churning Strength: {churning}</label>
                <input className="w-full accent-orange-500 mb-1" type="range" min={0} max={100} value={churning}
                    onChange={e => { const v = Number(e.target.value); setChurning(v); onStateChange('churning', v); }} />
                <label className="text-[13px] font-bold text-lime-600">Peristalsis Speed: {peristalsis}</label>
                <input className="w-full accent-lime-500" type="range" min={0} max={100} value={peristalsis}
                    onChange={e => { const v = Number(e.target.value); setPeristalsis(v); onStateChange('peristalsis', v); }} />
            </div>
        </div>
    );
};
