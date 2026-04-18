import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface P28BodySystemsPhysicsLabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

export const P28BodySystemsPhysicsLab = ({ state, onStateChange }: P28BodySystemsPhysicsLabProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const tRef = useRef(0);

    const [heartRate, setHeartRate] = useState(50);
    const [vesselDiameter, setVesselDiameter] = useState(50);
    const phase = (state.phase as string) || 'intro';

    // Blood pressure derived: higher heart rate + narrower vessels = higher pressure
    const bloodPressure = useMemo(() => {
        const hrFactor = heartRate / 100;
        const resistanceFactor = 1 - vesselDiameter / 100; // narrow = high resistance
        return Math.round(60 + hrFactor * 80 + resistanceFactor * 60);
    }, [heartRate, vesselDiameter]);

    const flowRate = useMemo(() => {
        const hrFactor = heartRate / 100;
        const diamFactor = vesselDiameter / 100;
        return Math.round((hrFactor * 0.4 + diamFactor * 0.6) * 100);
    }, [heartRate, vesselDiameter]);

    const summary = useMemo(() => {
        if (bloodPressure > 160) return 'Dangerously high blood pressure!';
        if (bloodPressure > 130) return 'Elevated blood pressure.';
        if (flowRate > 75 && bloodPressure < 140) return 'Strong, healthy flow!';
        if (flowRate < 30) return 'Very low flow — organs undersupplied.';
        return 'Moderate circulatory performance.';
    }, [bloodPressure, flowRate]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width;
        const H = canvas.height;
        tRef.current += 0.016;
        const t = tRef.current;

        ctx.fillStyle = '#eff6ff';
        ctx.fillRect(0, 0, W, H);

        const safeRight = W - 285;

        // Variable readouts
        ctx.textAlign = 'center';
        const col1 = safeRight * 0.2;
        const col2 = safeRight * 0.5;
        const col3 = safeRight * 0.8;

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('HEART RATE', col1, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#991b1b';
        ctx.fillText(Math.round(50 + heartRate * 1.3) + ' bpm', col1, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#2563eb';
        ctx.fillText('VESSEL Ø', col2, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText(vesselDiameter + '%', col2, H * 0.14);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#9333ea';
        ctx.fillText('PRESSURE', col3, H * 0.08);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#581c87';
        ctx.fillText(bloodPressure + ' mmHg', col3, H * 0.14);

        // Flow rate bar
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.fillText('Flow Rate: ' + flowRate + '%', safeRight * 0.5, H * 0.21);
        const barW = Math.min(220, safeRight * 0.45);
        const barX = safeRight * 0.5 - barW / 2;
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(barX, H * 0.23, barW, 14);
        ctx.fillStyle = flowRate > 70 ? '#22c55e' : flowRate > 40 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, H * 0.23, barW * flowRate / 100, 14);

        // === Heart pump (left) ===
        const heartX = safeRight * 0.18;
        const heartY = H * 0.42;
        const hrNorm = heartRate / 100;
        const beatPhase = Math.sin(t * (2 + hrNorm * 6)); // faster beat at higher HR
        const heartScale = 0.85 + beatPhase * 0.15;
        const heartAlpha = 0.5 + hrNorm * 0.4;

        ctx.save();
        ctx.globalAlpha = heartAlpha;
        ctx.translate(heartX, heartY);
        ctx.scale(heartScale, heartScale);
        // Simple heart shape
        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.bezierCurveTo(-20, -10, -30, -25, -15, -30);
        ctx.bezierCurveTo(-5, -35, 0, -25, 0, -18);
        ctx.bezierCurveTo(0, -25, 5, -35, 15, -30);
        ctx.bezierCurveTo(30, -25, 20, -10, 0, 8);
        ctx.closePath();
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Heart Pump', heartX, heartY + 38);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText(Math.round(50 + heartRate * 1.3) + ' bpm', heartX, heartY + 52);

        // === Blood vessel (center) ===
        const vesselX = safeRight * 0.5;
        const vesselY = H * 0.42;
        const dNorm = vesselDiameter / 100;
        const tubeLen = Math.min(120, safeRight * 0.25);
        const tubeH = 8 + dNorm * 22; // wider diameter = taller tube

        ctx.save();
        ctx.globalAlpha = 0.5 + dNorm * 0.4;
        // Outer vessel wall
        ctx.fillStyle = '#dbeafe';
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(vesselX - tubeLen / 2, vesselY - tubeH / 2, tubeLen, tubeH, 10);
        ctx.fill();
        ctx.stroke();
        // Inner blood
        const innerH = tubeH * 0.65;
        ctx.fillStyle = '#fca5a5';
        ctx.beginPath();
        ctx.roundRect(vesselX - tubeLen / 2 + 4, vesselY - innerH / 2, tubeLen - 8, innerH, 6);
        ctx.fill();
        ctx.restore();

        // Flowing blood cells
        const cellCount = 8;
        const cellSpeed = 0.15 + flowRate / 100 * 0.5;
        ctx.save();
        for (let i = 0; i < cellCount; i++) {
            const progress = ((t * cellSpeed + i / cellCount) % 1);
            const cx = vesselX - tubeLen / 2 + 8 + progress * (tubeLen - 16);
            const cy = vesselY + Math.sin(i * 2.3 + t) * (innerH * 0.3);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            // Red blood cell shape (biconcave disc approximation)
            ctx.ellipse(cx, cy, 5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Direction arrows
        ctx.fillStyle = '#2563eb';
        const arrowX = vesselX + tubeLen / 2 + 6;
        ctx.beginPath();
        ctx.moveTo(arrowX, vesselY - 7);
        ctx.lineTo(arrowX + 12, vesselY);
        ctx.lineTo(arrowX, vesselY + 7);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Blood Vessel', vesselX, vesselY + tubeH / 2 + 16);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText('Ø ' + vesselDiameter + '%', vesselX, vesselY + tubeH / 2 + 30);

        // === Pressure gauge (right) ===
        const gaugeX = safeRight * 0.82;
        const gaugeY = H * 0.42;
        const gaugeR = 28;
        const pressNorm = Math.min(1, (bloodPressure - 60) / 140);

        ctx.save();
        ctx.globalAlpha = 0.5 + pressNorm * 0.4;
        // Gauge background
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI * 2);
        ctx.fillStyle = '#f3e8ff';
        ctx.fill();
        ctx.strokeStyle = '#9333ea';
        ctx.lineWidth = 3;
        ctx.stroke();
        // Gauge arc (colored by pressure)
        const startAngle = Math.PI * 0.75;
        const endAngle = startAngle + pressNorm * Math.PI * 1.5;
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeR - 4, startAngle, endAngle);
        ctx.strokeStyle = pressNorm > 0.75 ? '#ef4444' : pressNorm > 0.5 ? '#f59e0b' : '#22c55e';
        ctx.lineWidth = 5;
        ctx.stroke();
        // Needle
        const needleAngle = startAngle + pressNorm * Math.PI * 1.5;
        ctx.beginPath();
        ctx.moveTo(gaugeX, gaugeY);
        ctx.lineTo(gaugeX + Math.cos(needleAngle) * (gaugeR - 8), gaugeY + Math.sin(needleAngle) * (gaugeR - 8));
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Center dot
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Pressure', gaugeX, gaugeY + gaugeR + 16);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#78716c';
        ctx.fillText(bloodPressure + ' mmHg', gaugeX, gaugeY + gaugeR + 30);

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
        ctx.fillText('Step 1: ↓ Heart pumps blood', cycleX, cycleY - rY - 10);
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'left';
        ctx.fillText('Step 2: Vessels set resistance →', cycleX + rX + 8, cycleY - 4);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000000';
        ctx.fillText('Step 4: ← Sensors detect pressure', cycleX - rX - 8, cycleY - 4);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('Step 3: ↑ Brain adjusts heart rate', cycleX, cycleY + rY + 16);
        ctx.restore();

        const loopParticles = 10;
        const avgVal = flowRate / 100;
        const speed = 0.25 + avgVal * 0.5;
        ctx.save();
        for (let i = 0; i < loopParticles; i++) {
            const angle = ((t * speed + i / loopParticles) % 1) * Math.PI * 2;
            const px = cycleX + rX * Math.cos(angle);
            const py = cycleY + rY * Math.sin(angle);
            const sz = 3 + avgVal * 3;
            const rising = Math.sin(angle) < 0;
            ctx.globalAlpha = 0.7 + 0.3 * Math.abs(Math.sin(angle));
            ctx.fillStyle = rising ? '#dc2626' : '#2563eb';
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
        ctx.fillText('Pressure–Flow Cycle', cycleX, cycleY + 3);
        ctx.restore();

        // Phase complete overlay
        if (phase === 'complete') {
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.fillRect(0, H * 0.18, W, H * 0.52);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('✅ Big Idea 28 — P28 Complete!', W / 2, H * 0.35);
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('How Do Body Systems Work Together?', W / 2, H * 0.44);
            ctx.textAlign = 'start';
        }

        animRef.current = requestAnimationFrame(draw);
    }, [heartRate, vesselDiameter, bloodPressure, flowRate, summary, phase]);

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
                <label className="text-[13px] font-bold text-red-600">Heart Rate: {Math.round(50 + heartRate * 1.3)} bpm</label>
                <input className="w-full accent-red-500 mb-1" type="range" min={0} max={100} value={heartRate}
                    onChange={e => { const v = Number(e.target.value); setHeartRate(v); onStateChange('heartRate', v); }} />
                <label className="text-[13px] font-bold text-blue-600">Vessel Diameter: {vesselDiameter}%</label>
                <input className="w-full accent-blue-500 mb-1" type="range" min={0} max={100} value={vesselDiameter}
                    onChange={e => { const v = Number(e.target.value); setVesselDiameter(v); onStateChange('vesselDiameter', v); }} />
                <p className="text-[11px] text-purple-500 mt-1 font-semibold">Blood Pressure (derived): {bloodPressure} mmHg</p>
            </div>
        </div>
    );
};
